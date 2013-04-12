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

Ext.application({
  name: 'SunApp',

  launch: function () {
    Ext.define('StationData', {
      extend: 'Ext.data.Model',
      config: {
        fields: [
          {name: 'name', type: 'string'},
          {name: 'lat', type: 'string'} ,
          {name: 'lon', type: 'string'},
          {name: 'ss', type: 'int'}
        ]
      }
    });
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
    var stationItemTemplate = new Ext.XTemplate(
      '<tpl for=".">',
      '{name}: {lat}/{lon}, {ss}min',
      '</tpl>'
    );
    var stationList = Ext.create('Ext.dataview.List', {
      title: 'Station List',
      iconCls: 'home',
      store: stationStore,
      itemTpl: stationItemTemplate
    });

    Ext.create('Ext.util.Geolocation', {
      autoUpdate: false,
      listeners: {
        locationupdate: function (geo) {
          var geoLat = geo.getLatitude();
          var geoLong = geo.getLongitude();
          stationStore.filterBy(function(record, id){
            return record.data.ss >= 55;
          });
          stationStore..sort([{
            direction: 'DESC',
            sorterFn: function(station1, station2) {
              var value1 = o1.getAddress().get('street'));
              var value2 = o2.getAddress().get('street'));
              return value1 > value2 ? 1 : (value1 < value2 ? -1 : 0);
            }
          }]);
          Ext.create("Ext.tab.Panel", {
            fullscreen: true,
            tabBarPosition: 'bottom',
            items: [stationList]
          });
        },
        locationerror: function (geo, bTimeout, bPermissionDenied, bLocationUnavailable, message) {
          if (bTimeout) {
            alert('Timeout occurred.');
          } else {
            alert('Error occurred.');
          }
        }
      }
    }).updateLocation();
  }
});
