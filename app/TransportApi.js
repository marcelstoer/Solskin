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
      failure: function (response) {
        failureFunc(response);
      }
    });
  },

  getConnectionsTo: function (places, successFunc, failureFunc) {
    var connections = [],
      requestComplete = 0,
      failedConnectionIndexes = [],
      onAjaxResponse = function (requestIndex, connection, response) {
        requestComplete++;
        if (connection) {
          connections[requestIndex] = connection;
        } else {
          console.log("Failed to get connection to '" + places[requestIndex] + "': " + response);
          failedConnectionIndexes.push(requestIndex);
        }

        if (requestComplete >= places.length) {
          if (failedConnectionIndexes.length === 0) {
            successFunc(connections);
          } else {
            failureFunc(connections, failedConnectionIndexes);
          }
        }
      },
      createSuccessFunction = function (index) {
        return function (connection) {
          onAjaxResponse(index, connection, null)
        };
      },
      createFailureFunction = function (index) {
        return function (response) {
          onAjaxResponse(index, null, response)
        }
      };

    for (var i = 0; i < places.length; i++) {
      // cannot create function directly...i.e. need to invoke function to create function
      // because of function scope each closure would have the same 'i' value
      this.getConnectionTo(places[i], createSuccessFunction(i), createFailureFunction(i));
    }
  }
})