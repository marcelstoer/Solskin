Ext.define('SunApp.store.StationReader', {
  extend: 'Ext.data.reader.Json',
  alias: 'reader.stationReader',

  getResponseData: function (response) {
    var data = this.callParent([response]);
    return this.filter(data);
  },

  filter: function (data) {
    var forcast = data.payload.mos;
    var forecastKeys = Object.keys(forcast);
    var dbklima = data.payload.dbklima;

    var filteredData = [];
    for (var i = 0; i < forecastKeys.length; i++) {
      var wmo = forecastKeys[i];
      var wmoData = dbklima[wmo];
      // must have WMO data and station must be in our mapping file
      if (wmoData !== undefined && wmo2sbb[wmo] !== undefined) {
        filteredData.push(this.newStation(wmo, wmoData));
      }
    }
    return filteredData;
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
    this.addSunlevelTo(station);
    this.addDistanceTo(station);
    return station;
  },

  createStationObject: function (wmo, wmoStationData) {
    return {
      name: wmo2sbb[wmo]['name'],
      sunshine: this.resetTo0IfNullOrEmpty(parseFloat(wmoStationData.ss)),
      temperature: this.resetTo0IfNullOrEmpty(parseFloat(wmoStationData.tt10)),
      lat: parseFloat(wmo2sbb[wmo]['lat']),
      long: parseFloat(wmo2sbb[wmo]['long']),
      publicTransportId: parseInt(wmo2sbb[wmo]['stationId'])
    };
  },

  resetTo0IfNullOrEmpty: function (someValue) {
    if (someValue === '' || someValue === null || someValue === undefined) {
      return 0;
    } else {
      return someValue;
    }
  },

  addSunlevelTo: function (station) {
    var sunLevel, sunshine;
    sunshine = station['sunshine'];

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
    station['sunLevel'] = sunLevel;
  },

  addDistanceTo: function (station) {
    var stationLocation, currentLocation;
    stationLocation = Ext.create('SunApp.Location', {
        lat: parseFloat(station['lat']),
        long: parseFloat(station['long'])
      }
    );
    currentLocation = SunApp.app.getCurrentLocation();
    station['linearDistance'] = currentLocation.distanceTo(stationLocation);
  }
});