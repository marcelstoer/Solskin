Ext.define('SunApp.controller.Application', {
  extend: 'Ext.app.Controller',

  requires: [
    'SunApp.Location', 'SunApp.TransportApi'
  ],

  config: {
    refs: {
      main: 'mainview',
      stations: 'stations',
      stationDetail: 'stationDetail'
    },

    control: {
      main: {
        push: 'onMainPush',
        pop: 'onMainPop'
      },
      stations: {
        itemsingletap: 'onStationSelect'
      }
    }
  },

  init: function () {
    Ext.getStore('Stations').on({ storeFiltered: this.onStoreFiltered, scope: this });
    Ext.getStore('Stations').on({ storeLoaded: this.onStoreLoaded, scope: this });
    SunApp.app.on({launching: this.onLaunching, scope: this});
  },

  onMainPush: function (view, item) {
  },

  onMainPop: function (view, item) {
    this.getMain().getNavigationBar().setTitle(SunApp.app.getCurrentLocation().getClosestStation());
    this.stationDetail.destroy();
  },

  onStationSelect: function (list, index, node, record) {
    this.stationDetail = Ext.create('SunApp.view.StationDetail', { title: record.data.name });
    this.stationDetail.setRecord(record);
    this.getMain().push(this.stationDetail);
  },

  onLaunching: function () {
    Ext.fly('appLoadingIndicator').destroy();
    Ext.Viewport.add(Ext.create('SunApp.view.Launching'));
    Ext.create('Ext.util.Geolocation', {
      autoUpdate: false,
      maximumAge: 0,
      listeners: {
        locationupdate: function (geo) {
          var lat = geo.getLatitude();
          var long = geo.getLongitude();
//    var lat = 47.46342478;
//    var long = 8.95429439;
          SunApp.app.getController('Application').onGeoLocationDetermined(lat, long);
        },
        locationerror: function (geo, timeout, permissionDenied, locationUnavailable, message) {
          SunApp.app.getController('Application').displayError("Error determining geo location: " + message);
        }
      }
    }).updateLocation();
  },

  onGeoLocationDetermined: function (lat, long) {
    var launchingView, transportApi, transportApiError;

    launchingView = Ext.Viewport.getComponent(0);
    launchingView.updateMessageForGeoLocationFound(lat, long);
    launchingView.updateMessageForClosestStationStart();

    transportApi = Ext.create('SunApp.TransportApi');
    transportApiError = function (response, opts) {
      this.displayError('Error finding the closest public transport station: ' + response.status);
    };

    SunApp.app.setCurrentLocation(Ext.create('SunApp.Location', { lat: lat, long: long }));
    transportApi.getClosestStation(lat, long, this.onClosestStationDetermined, transportApiError);
  },

  onClosestStationDetermined: function (station) {
    var launchingView;

    launchingView = Ext.Viewport.getComponent(0);
    launchingView.updateMessageForClosestStationFound(station.name);

    SunApp.app.getCurrentLocation().setClosestStation(station.name);
    launchingView.updateMessageForLoadingAllStations();
    Ext.getStore('Stations').load();
  },

  onStoreLoaded: function (numberOfRecords) {
    Ext.Viewport.getComponent(0).updateMessageForLoadingAllStationsDone(numberOfRecords);
  },

  onStoreFiltered: function () {
    var mainView = Ext.create('SunApp.view.Main');
    mainView.getNavigationBar().setTitle(SunApp.app.getCurrentLocation().getClosestStation());
    Ext.Viewport.removeAll(true, true);
    Ext.Viewport.add(mainView);
  },

  displayError: function (htmlMsg) {
    var appLoadingIndicator = Ext.fly('appLoadingIndicator');
    if (appLoadingIndicator !== null) {
      appLoadingIndicator.destroy();
    }
    Ext.Viewport.removeAll(true, true);
    Ext.Viewport.add(Ext.create('SunApp.view.Error', {html: htmlMsg}));
  }
});
