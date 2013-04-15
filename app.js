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

(function () {
  "use strict";

//<debug>
  Ext.Loader.setPath({
    'Ext': 'touch/src',
    'SunApp': 'app'
  });
//</debug>

  var allStationData, tabPanel, myPlace, place;

  // http://www.movable-type.co.uk/scripts/latlong.html
  if (Number.prototype.toRad === undefined) {
    Number.prototype.toRad = function () {
      return this * Math.PI / 180;
    };
  }
  place = function (lat, lon, name) {
    var R = 6371; // km
    return {
      distanceTo: function (other) {
        var dLat, dLon, lat1, lat2, a, c;
        dLat = (other.lat - lat).toRad();
        dLon = (other.lon - lon).toRad();
        lat1 = lat.toRad();
        lat2 = other.lat.toRad();

        a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
        c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return Math.round(R * c * 10) / 10; // distance
      },
      setName: function (newname) {
        this.name = newname;
      },
      lat: lat,
      lon: lon,
      name: name
    };
  };

  Ext.define('StationData', {
    extend: 'Ext.data.Model',
    config: {
      fields: [
        {name: 'wmo', type: 'int'},
        {name: 'name', type: 'string'},
        {name: 'lat', type: 'float'},
        {name: 'lon', type: 'float'},
        {name: 'ss', type: 'int'},
        {name: 'sunLevel', type: 'int'},
        {name: 'distance', type: 'float', defaultValue: '0.0'}
      ]
    }
  });

  allStationData = [];

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
          "<h1>Wait, there's more....</h1>",
          '<p>Stay tuned while we do some number crunching in the ',
          'background for you.</p>'
        ].join("")
      }
    ]
  });

  Ext.application({
    name: 'SunApp',

    requires: [
      'Ext.MessageBox'
    ],

    icon: {
      57: 'resources/images/glasses.svg'
    },
    launch: function () {
      var stationStore, stationItemTemplate;
      stationStore = Ext.create('Ext.data.Store', {
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
      stationItemTemplate = new Ext.XTemplate(
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
            myPlace = place(geo.getLatitude(), geo.getLongitude());

            Ext.Ajax.request({
              url: '../transport/api.php/v1/locations',
              method: 'GET',
              params: {
                x: myPlace.lat,
                y: myPlace.lon
              },
              success: function (response) {
                var station = Ext.JSON.decode(response.responseText).stations[0];
                myPlace.setName(station.name);
                Ext.Msg.show({
                  title: myPlace.name,
                  msg: 'We believe your nearest station is ' + myPlace.name,
                  buttons: Ext.Msg.OK,
                  icon: Ext.Msg.INFO
                });
              }
            });

            stationStore.filterBy(function (record, id) {
              var sunLevel, sunshineMinutes, recordPlace;
              sunshineMinutes = record.get('ss');

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
                  recordPlace = place(record.get('lat'), record.get('lon'));
                  record.data.distance = recordPlace.distanceTo(myPlace);
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
            ]);
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
}());
