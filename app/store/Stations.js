Ext.define('SunApp.store.Stations', {
  extend: 'Ext.data.Store',
  requires: ['SunApp.store.StationReader'],

  config: {
    model: 'SunApp.model.Station',
    autoLoad: false, // 'load' called manually
    sorters: [
      {
        property: 'arrival',
        direction: 'ASC'
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
    var tmpStationsArray = [],
      places = [],
      sunLevelToRecordsMap = this.buildSunLevelToRecordsMap(records),
      transportApi = Ext.create('SunApp.TransportApi');

    if (sunLevelToRecordsMap[4].length >= 3) {
      console.log('there are at least 3 level-4 records - excellent');
      tmpStationsArray = sunLevelToRecordsMap[4].slice(0, 5); // get items 0-4
      places = this.extractNames(tmpStationsArray);

      transportApi.getConnectionsTo(places, function (connections) {
        for (var k = 0; k < tmpStationsArray.length; k++) {
          console.log('departure: ' + connections[k].from.station.name + ' at ' + connections[k].from.departure);
          console.log('arrival: ' + connections[k].to.station.name + ' at ' + connections[k].to.arrival);
          tmpStationsArray[k].data.arrival = connections[k].to.arrival;
          tmpStationsArray[k].data.departure = connections[k].from.departure;
        }
        store.setData(tmpStationsArray);
        store.fireEvent('storeFiltered');
      }, function () {
        console.log('Bummer...');
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
  },

  extractNames: function (stations) {
    var names = [];
    for (var i = 0; i < stations.length; i++) {
      names[i] = stations[i].data.name;
    }
    return names;
  }
});
