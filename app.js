/*
    This file is generated and updated by Sencha Cmd. You can edit this file as
    needed for your application, but these edits will have to be merged by
    Sencha Cmd when it performs code generation tasks such as generating new
    models, controllers or views and when running "sencha app upgrade".

    Ideally changes to this file would be limited and most work would be done
    in other places (such as Controllers). If Sencha Cmd cannot merge your
    changes and its generated code, it will produce a "merge conflict" that you
    will need to resolve manually.
*/

// DO NOT DELETE - this directive is required for Sencha Cmd packages to work.
//@require @packageOverrides

//<debug>
Ext.Loader.setPath({
  'Ext': 'touch/src',
  'SunApp': 'app'
});
//</debug>

var allStationData;
var tabPanel;

// http://www.movable-type.co.uk/scripts/latlong.html
if (typeof(Number.prototype.toRad) === "undefined") {
  Number.prototype.toRad = function () {
    return this * Math.PI / 180;
  }
}
var coordinate = function (lat, lon) {
  var R = 6371; // km
  return {
    distanceTo: function (other) {
      var dLat = (other.lat - lat).toRad();
      var dLon = (other.lon - lon).toRad();
      var lat1 = lat.toRad();
      var lat2 = other.lat.toRad();

      var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      return Math.round(R * c * 1000) / 1000; // distance
    },
    lat: lat,
    lon: lon
  };
};

Ext.define('StationData', {
  extend: 'Ext.data.Model',
  config: {
    fields: [
      {name: 'wmo', type: 'int'},
      {name: 'name', type: 'string'},
      {name: 'lat', type: 'float'} ,
      {name: 'lon', type: 'float'},
      {name: 'ss', type: 'int'},
      {name: 'sunLevel', type: 'int'},
      {name: 'distance', type: 'float', defaultValue: '0.0'}
    ]
  }
});

allStationData = new Array();

tabPanel = Ext.create("Ext.tab.Panel", {
  requires: [
             'Ext.TitleBar'
           ],
  fullscreen: true,
  tabBarPosition: 'bottom',
  items: [
     {
       docked: 'top',
       xtype: 'titlebar',
       title: 'SunApp'
     },
    {
      title: 'Home',
      iconCls: 'brightness1',
      cls: 'home',
      html: [
        '<img src="http://docs.sencha.com/ext-js/4-1/resources/images/loading.gif" />',     
        "<h1>Wait, there's more....</h1>",
        '<p>Stay tuned while we do some number crunching in the ',
        'background for you.</p>'
      ].join("")
    }
  ]
});

Ext.application({
  name: 'SunApp',

//  icon: {
//    57: 'resources/images/glasses.svg'
//  },
  launch: function () {
    var stationStore = Ext.create('Ext.data.Store', {
      model: 'StationData',
      autoLoad: true,
      proxy: {
        type: 'ajax',
        url: 'data.json',
        reader: {
          type: 'json'
        }
      }
    });
    stationStore.on('load', function (storeRef, records, successful) {
      allStationData = records;
    }, this);
    var stationItemTemplate = new Ext.XTemplate(
      '<tpl for=".">',
      '<div class="stationList sunLevel{sunLevel}">{name}: <span class="distance">{distance}km</span></div>',
      '</tpl>'
    );

    Ext.create('Ext.util.Geolocation', {
      requires: [
                 'Ext.TitleBar'
               ],
      autoUpdate: false,
      listeners: {
        locationupdate: function (geo) {
          var stationList;
          var geoLat = geo.getLatitude();
          var geoLon = geo.getLongitude()

//          Ext.Ajax.request({
//            url: 'http://transport.opendata.ch/v1/locations',
//            params: {
//              x: geoLat,
//              y: geoLon
//            },
//            success: function (response) {
//              var text = response.responseText;
//              alert(text.stations[0].name);
//            }
//          });

          stationStore.filterBy(function (record, id) {
            var sunLevel;
            var sunshineMinutes = record.get('ss');

            if (sunshineMinutes < 5) {         // 0-4
              sunLevel = 0;
            } else if (sunshineMinutes < 50) { // 5 - 49
              sunLevel = 1;
            } else if (sunshineMinutes < 60) { // 50 - 59
              sunLevel = 2;
            } else {                          // 60
              sunLevel = 3;
            }

            record.data.sunLevel = sunLevel;

            if (sunLevel >= 2) {
              if (record.get('distance') === 0.0) {
                var recordCoordinate = coordinate(record.get('lat'), record.get('lon'));
                var geoCoordinate = coordinate(geoLat, geoLon);
                record.data.distance = recordCoordinate.distanceTo(geoCoordinate);
              }
              return true;
            } else {
              return false;
            }
          });
          stationStore.sort([
            {
              property: 'distance',
              direction: 'ASC'
            }
          ]);
          stationList = Ext.create('Ext.dataview.List', {
            title: 'Station List',
            iconCls: 'brightness1',
            store: stationStore,
            itemTpl: stationItemTemplate
          });
          tabPanel.setItems([
              {
                docked: 'top',
                xtype: 'titlebar',
                title: 'Bern'
              },
             stationList
             ]
          );
        },
        locationerror: function (geo, bTimeout, bPermissionDenied, bLocationUnavailable, message) {
          tabPanel.setItems([
            {
              docked: 'top',
              xtype: 'titlebar',
              title: 'Sorry'
            },
            {
              title: 'Home',
              iconCls: 'brightness1',
              cls: 'home',
              html: [
                '<img width="12.5%" src="http://staging.sencha.com/img/sencha.png" />',
                "<h1>Ouchh!</h1>",
                "<p>We're really sorry but your device didn't ",
                'allow us to detect your location or it failed ',
                'to do so. Pity.</p>'
              ].join("")
            }
          ]);
        }
      }
    }).updateLocation();
    tabPanel.show();
  }
});
