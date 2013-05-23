Ext.define('SunApp.store.StationReader', {
  extend: 'Ext.data.reader.Json',
  alias: 'reader.stationReader',

  getResponseData: function (response) {
    var data = this.callParent([response]);
    return this.filter(data);
  },

  filter: function (data) {
    var i;
    var record;
    for (i = 0; i < data.length; i++) {
      record = data[i];
      this.cleanSSPropertyIn(record);
      this.addSunlevelTo(record);
      this.addDistanceTo(record);
    }
    return data;
  },

  cleanSSPropertyIn: function (record) {
    var sunshine = record['ss'];
    if (sunshine === '' || sunshine === null) {
      record['ss'] = '0';
    }
  },

  addSunlevelTo: function (record) {
    var sunlevel, sunshine;
    sunshine = record['ss'];

    if (sunshine < 5) {         // 0-4
      sunlevel = 0;
    } else if (sunshine < 30) { // 5 - 29
      sunlevel = 1;
    } else if (sunshine < 50) { // 30 - 49
      sunlevel = 2;
    } else if (sunshine < 60) { // 50 - 59
      sunlevel = 3;
    } else {                    // 60
      sunlevel = 4;
    }
    record['sunlevel'] = sunlevel;
  },

  addDistanceTo: function (record) {
    var stationLocation, currentLocation;
    stationLocation = Ext.create('SunApp.Location', {
        lat: parseFloat(record.lat),
        long: parseFloat(record.lon)
      }
    );
    currentLocation = SunApp.app.getCurrentLocation();
    record['linearDistance'] = currentLocation.distanceTo(stationLocation);
  }
});