Ext.define('SunApp.controller.Application', {
  extend: 'Ext.app.Controller',

  requires: [
    'SunApp.Location', 'SunApp.TransportApi'
  ],

  config: {
    refs: {
      main: 'mainview',
      overview: 'overview',
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
    this.getMain().getNavigationBar().down('#back').setHidden(true);
  },

  onMainPop: function (view, item) {
    this.getMain().getNavigationBar().down('#back').setHidden(false);
    this.getMain().getNavigationBar().setTitle(SunApp.app.getCurrentLocation().getClosestPublicTransportStation().name);
    this.stationDetail.destroy();
  },

  onStationSelect: function (list, index, node, record) {
    this.stationDetail = Ext.create('SunApp.view.StationDetail', { title: record.get('name') });
    this.stationDetail.setRecord(record);
    this.getMain().push(this.stationDetail);
  },

  onLaunching: function () {
    Ext.fly('appLoadingIndicator').destroy();
    Ext.Viewport.add(Ext.create('SunApp.view.Launching'));

//    Ext.create('Ext.util.Geolocation', {
//      autoUpdate: false,
//      maximumAge: 0,
//      listeners: {
//        locationupdate: function (geo) {
//          var lat = geo.getLatitude();
//          var long = geo.getLongitude();
    var lat = 47.46342478;
    var long = 8.95429439;
    SunApp.app.getController('Application').onGeoLocationDetermined(lat, long);
//        },
//        locationerror: function () {
//            var noGeoMsg = [
//              'Error detecting your geo location, no more details, sorry. ',
//              'The option to select your location manually is still missing. Again, sorry.'
//            ].join('');
//            SunApp.app.getController('Application').displayError(noGeoMsg);
//          }
//      }
//    }).updateLocation();
  },

  onGeoLocationDetermined: function (lat, long) {
    var launchingView, transportApi, transportApiErrorFunc;

    launchingView = Ext.Viewport.getComponent(0);
    launchingView.updateMessageForGeoLocationFound(lat, long);
    launchingView.updateMessageForClosestStationStart();

    transportApi = Ext.create('SunApp.TransportApi');
    transportApiErrorFunc = function (response, opts) {
      var transportApiErrorMsg = [
        '<p>Error finding the closest public transport station: ',
        response.statusText,
        ' (',
        response.status,
        ').</p>',
        'The option to select the closest station manually is still missing. Again, sorry.'
      ].join('');
      SunApp.app.getController('Application').displayError(transportApiErrorMsg);
    };

    SunApp.app.setCurrentLocation(Ext.create('SunApp.Location', { lat: lat, long: long }));
    transportApi.getClosestStation(lat, long, this.onClosestStationDetermined, transportApiErrorFunc);
  },

  onClosestStationDetermined: function (station) {
    var launchingView;

    launchingView = Ext.Viewport.getComponent(0);
    launchingView.updateMessageForClosestStationFound(station.name);

    SunApp.app.getCurrentLocation().setClosestPublicTransportStation({"name": station.name, "id": station.id});
    launchingView.updateMessageForLoadingAllStations();
    Ext.getStore('Stations').load();
  },

  onStoreLoaded: function (numberOfRecords) {
    if (numberOfRecords > 0) {
      Ext.Viewport.getComponent(0).updateMessageForLoadingAllStationsDone(numberOfRecords);
    } else {
      SunApp.app.getController('Application').displayError('No data weather data available due to technical errors, sorry.');
    }
  },

  onStoreFiltered: function () {
    var mainView, containerView;
    var storeSize = Ext.getStore('Stations').getData().length;

    if (storeSize > 0) {
      mainView = Ext.create('SunApp.view.Main');
      mainView.getNavigationBar().setTitle(SunApp.app.getCurrentLocation().getClosestPublicTransportStation().name);
      Ext.Viewport.removeAll(true, true);
      Ext.Viewport.add(mainView);
    } else {
      this.displayError('Sorry, according to our data there really isn\'t any sun at the moment in Switzerland.');
    }
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
