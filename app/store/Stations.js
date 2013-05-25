Ext.define('SunApp.store.Stations', {
  extend: 'Ext.data.Store',
  requires: ['SunApp.store.StationReader'],

  config: {
    model: 'SunApp.model.Station',
    autoLoad: false, // 'load' called manually from app.js
    sorters: [
      {
        property: 'sunLevel',
        direction: 'DESC'
      },
      {
        property: 'linearDistance'
      }
    ],
    listeners: {
      load: function (store, records, success, eOpts) {
        store.fireEvent('storeLoaded', records.length);
        this.reduceToRelevant(store, records);
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

  reduceToRelevant: function (store, records) {
    var tmpArray;
    var sunLevelToRecordsMap = this.buildSunLevelToRecordsMap(records);
    var transportApi = Ext.create('SunApp.TransportApi');
    if (sunLevelToRecordsMap[4].length >= 3) {
      console.log('there are at least 3 level-4 records - excellent');
      tmpArray = sunLevelToRecordsMap[4].slice(0, 5); // get items 0-4
      console.log(tmpArray);
      transportApi.getConnectionTo(tmpArray[0].data.name, function (connection) {
        console.log('departure: ' + connection.from.station.name + ' at ' + connection.from.departure);
        console.log('arrival: ' + connection.to.station.name + ' at ' + connection.to.arrival);
        tmpArray[0].data.departure = connection.from.departure;
        tmpArray[0].data.arrival = connection.to.arrival;
        store.setData(tmpArray[0]);
        store.fireEvent('storeFiltered');
      });
    }
  },

  buildSunLevelToRecordsMap: function (records) {
    var i, map, record, recordsForLevel;
    map = [];
    for (i = 0; i < records.length; i++) {
      record = records[i];
      recordsForLevel = map[record.data.sunLevel];
      if (recordsForLevel === undefined) {
        recordsForLevel = [];
        map[record.data.sunLevel] = recordsForLevel;
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
