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

Ext.Loader.setConfig({
  // avoids '_dc' cache-busting query string param for all the .js files (model, store, etc.) if false
  disableCaching: true
});

Ext.application({
  name: 'SunApp',
  currentLocation: null,

  requires: [
    'Ext.MessageBox', 'SunApp.Location', 'SunApp.TransportApi'
  ],

  models: ['Station'],
  stores: ['Stations'],
  views: ['Main'],
  controllers: ['Application'],

  icon: {
    '57': 'resources/icons/Icon.png',
    '72': 'resources/icons/Icon~ipad.png',
    '114': 'resources/icons/Icon@2x.png',
    '144': 'resources/icons/Icon~ipad@2x.png'
  },

  isIconPrecomposed: true,

  startupImage: {
    '320x460': 'resources/startup/320x460.jpg',
    '640x920': 'resources/startup/640x920.png',
    '768x1004': 'resources/startup/768x1004.png',
    '748x1024': 'resources/startup/748x1024.png',
    '1536x2008': 'resources/startup/1536x2008.png',
    '1496x2048': 'resources/startup/1496x2048.png'
  },

  launch: function () {
//    Ext.create('Ext.util.Geolocation', {
//      autoUpdate: false,
//      maximumAge: 0,
//      listeners: {
//        locationupdate: function (geo) {
//          var lat = geo.getLatitude();
//          var long = geo.getLongitude();
          var lat = 47.46342478;
          var long = 8.95429439;
          var transportApi = Ext.create('SunApp.TransportApi');
          var transportApiError = function (response, opts) {
            SunApp.app.displayError('Error finding the closest public transport station: ' + response.status);
          };
          SunApp.app.setCurrentLocation(Ext.create('SunApp.Location', { lat: lat, long: long }));
          transportApi.getClosestStation(lat, long, SunApp.app.initAfterStationIsDetermined, transportApiError);
//        },
//        locationerror: function (geo, timeout, permissionDenied, locationUnavailable, message) {
//          SunApp.app.displayError("Error determining geo location: " + message);
//        }
//      }
//    }).updateLocation();
  },

  initAfterStationIsDetermined: function (station) {
    var mainView;
    SunApp.app.getCurrentLocation().setClosestStation(station.name);
    Ext.getStore('Stations').load();
    Ext.fly('appLoadingIndicator').destroy();
    mainView = Ext.create('SunApp.view.Main');
    mainView.getNavigationBar().setTitle(station.name);
    Ext.Viewport.add(mainView);
  },

  setCurrentLocation: function (currentLocation) {
    console.log('setting current location: ' + currentLocation.getLat() + '/' + currentLocation.getLong());
    this.currentLocation = currentLocation
  },
  getCurrentLocation: function () {
    return this.currentLocation;
  },

  displayError: function (htmlMsg) {
    var appLoadingIndicator = Ext.fly('appLoadingIndicator');
    if (appLoadingIndicator !== null) {
      appLoadingIndicator.destroy();
    }
    Ext.Viewport.add(Ext.create('SunApp.view.Error', {html: htmlMsg}));
  },

  onUpdated: function () {
    Ext.Msg.confirm(
      "Application Update",
      "This application has just successfully been updated to the latest version. Reload now?",
      function (buttonId) {
        if (buttonId === 'yes') {
          window.location.reload();
        }
      }
    );
  }
});
