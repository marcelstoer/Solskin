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
    var sunlevelToRecordsMap = this.buildSunlevelToRecordsMap(records);
    if (sunlevelToRecordsMap[4].length >= 3) {
      console.log('there are at least 3 level-4 records - excellent');
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
    for(i = 0; i < map.length; i++){
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
