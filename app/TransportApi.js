Ext.define('SunApp.TransportApi', {
  baseUrl: 'http://transport.opendata.ch/v1',

  config: {},

  constructor: function (config) {
    this.initConfig(config);
    // Required because Transport API got CORS wrong: http://bit.ly/18k4O6H
    Ext.Ajax.setUseDefaultXhrHeader(false);
  },

  getClosestStation: function (lat, long, successFunc, failureFunc) {
    Ext.Ajax.request({
      url: this.baseUrl + '/locations',
      method: 'GET',
      params: {
        x: lat,
        y: long
      },
      success: function (response) {
        var station = Ext.JSON.decode(response.responseText).stations[0];
        successFunc(station);
      },
      failure: failureFunc
    });
  },

  getConnectionTo: function (place, successFunc, failureFunc) {
    Ext.Ajax.request({
      url: this.baseUrl + '/connections',
      method: 'GET',
      params: {
        from: SunApp.app.getCurrentLocation().getClosestStation(),
        to: place
      },
      success: function (response) {
        var connection = Ext.JSON.decode(response.responseText).connections[0];
        successFunc(connection);
      },
      failure: failureFunc
    });
  }
})