Ext.define('SunApp.store.Stations', {
  extend: 'Ext.data.Store',
  requires: ['SunApp.store.StationReader'],

  config: {
    model: 'SunApp.model.Station',
    autoLoad: false, // 'load' called manually from app.js
    sorters: [
      {
        property: 'sunlevel',
        direction: 'DESC'
      },
      {
        property: 'linearDistance'
      }
    ],
    listeners: {
      load: function (store, records, success, eOpts) {
        var filteredRecords = this.reduceToRelevant(records);
        store.setData(filteredRecords);
      }
    },
    proxy: {
      type: 'ajax',
      url: 'data.json',
      reader: {
        type: 'stationReader'
      }
    }
  },

  reduceToRelevant: function (records) {
    var tmpArray;
    var sunlevelToRecordsMap = this.buildSunlevelToRecordsMap(records);
    var transportApi = Ext.create('SunApp.TransportApi');
    if (sunlevelToRecordsMap[4].length >= 3) {
      console.log('there are at least 3 level-4 records - excellent');
      tmpArray = sunlevelToRecordsMap[4].slice(0, 5); // get items 0-4
      console.log(tmpArray);
      transportApi.getConnectionTo(tmpArray[0].data.name, function (connection) {
        console.log('departure: ' + connection.from.station.name + ' at ' + connection.from.departure);
        console.log('arrival: ' + connection.to.station.name + ' at ' + connection.to.arrival);
      });
    }
    return records;
  },

  buildSunlevelToRecordsMap: function (records, level) {
    var i, map, record, recordsForLevel;
    map = [];
    for (i = 0; i < records.length; i++) {
      record = records[i];
      recordsForLevel = map[record.data.sunlevel];
      if (recordsForLevel === undefined) {
        recordsForLevel = [];
        map[record.data.sunlevel] = recordsForLevel;
      }
      recordsForLevel.push(record);
    }
    for (i = 0; i < map.length; i++) {
      map[i] = this.sortByDistanceAsc(map[i]);
    }
    return map;
  },

  sortByDistanceAsc: function (records) {
    return records.sort(function (a, b) {
      return a.data.linearDistance - b.data.linearDistance
    });
  }
});
