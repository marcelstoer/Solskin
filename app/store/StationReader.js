Ext.define('SunApp.store.StationReader', {
  extend: 'Ext.data.reader.Json',
  alias: 'reader.stationReader',

  getResponseData: function (response) {
    var data = this.callParent([response]);
    return this.filter(data);
  },

  filter: function (data) {
    var forecast = data.payload.mos;
    var forecastKeys = Object.keys(forecast);
    var dbklima = data.payload.dbklima;

    var filteredData = [];
    for (var i = 0; i < forecastKeys.length; i++) {
      var wmo = forecastKeys[i];
      var wmoData = dbklima[wmo];
      // must have WMO data and station must be in our mapping file
      if (wmoData !== undefined && wmo2sbb[wmo] !== undefined) {
        var station = this.newStation(wmo, wmoData);
        station['forecast'] = this.newForecast(wmo, forecast);
        filteredData.push(station);
      }
    }
    return filteredData;
  },

  newForecast: function (wmo, forecastData) {
    var that = this;
    var forecast = [];
    var forecastForWmo = forecastData[wmo];
    var forecastDates = Object.keys(forecastForWmo);
    Ext.each(forecastDates, function (date) {
      var sunshine = that.resetTo0IfFalsy(forecastForWmo[date]['ss']);
      var sunLevel = that.calculateSunLevel(sunshine);
      var temperature = forecastForWmo[date]['tt'];
      var obj = {"date": date, "sunshine": sunshine, "sunLevel": sunLevel, "temperature": temperature};
      forecast.push(obj);
    });
    return forecast;
  },

  newStation: function (wmo, wmoData) {
    var wmoDataKeys = Object.keys(wmoData);
    wmoDataKeys.sort(function (dateString1, dateString2) {
      var time1 = new Date(dateString1).getTime();
      var time2 = new Date(dateString2).getTime();
      // sort descending, most recent date first
      return -1 * (time1 > time2 ? 1 : time1 < time2 ? -1 : 0);
    });
    var station = this.createStationObject(wmo, wmoData[wmoDataKeys[0]]);
    station['sunLevel'] = this.calculateSunLevel(station['sunshine']);
    station['linearDistance'] = this.calculateDistanceToCurrentLocation(station);
    return station;
  },

  createStationObject: function (wmo, wmoStationData) {
    return {
      name: wmo2sbb[wmo]['name'],
      sunshine: this.resetTo0IfFalsy(parseFloat(wmoStationData.ss)),
      temperature: wmoStationData.tt10, // resetting to 0 wouldn't be cool...
      lat: wmo2sbb[wmo]['lat'],
      long: wmo2sbb[wmo]['long'],
      publicTransportId: wmo2sbb[wmo]['stationId']
    };
  },

  resetTo0IfFalsy: function (someValue) {
    return someValue ? someValue : 0;
  },

  calculateSunLevel: function (sunshine) {
    var sunLevel;

    if (sunshine < 5) {         // 0-4
      sunLevel = 0;
    } else if (sunshine < 30) { // 5 - 29
      sunLevel = 1;
    } else if (sunshine < 50) { // 30 - 49
      sunLevel = 2;
    } else if (sunshine < 60) { // 50 - 59
      sunLevel = 3;
    } else {                    // 60
      sunLevel = 4;
    }
    return sunLevel;
  },

  calculateDistanceToCurrentLocation: function (station) {
    var stationLocation, currentLocation;
    stationLocation = Ext.create('SunApp.Location', {
        lat: parseFloat(station['lat']),
        long: parseFloat(station['long'])
      }
    );
    currentLocation = SunApp.app.getCurrentLocation();
    return currentLocation.distanceTo(stationLocation);
  }
});