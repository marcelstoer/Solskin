Ext.define('SunApp.store.Stations', {
  extend: 'Ext.data.Store',
  requires: ['SunApp.store.StationReader'],

  config: {
    model: 'SunApp.model.Station',
    autoLoad: false, // 'load' called manually
    sorters: [
      {property: 'arrival', direction: 'ASC'}
    ],
    listeners: {
      load: function (store, records, success, eOpts) {
        store.fireEvent('storeLoaded', records.length);
        if (records.length > 0) {
          this.reduceToRelevant(store, records);
        }
      }
    },
    proxy: {
      type: 'ajax',
      url: 'http://mdx.meteotest.ch/api_v1?key=0C700754FE957E01393621C4756DC4BA&service=prod2data&action=dreamweb_combined&format=json',
      reader: {
        type: 'stationReader'
      }
    }
  },

  reduceToRelevant: function (store, records) {
    var tmpStationsArray = [],
      places = [],
      getConnectionsSuccessFunc,
      getConnectionsFailureFunc,
      sunLevelToRecordsMap = this.buildSunLevelToRecordsMap(records),
      transportApi = Ext.create('SunApp.TransportApi');

    if (sunLevelToRecordsMap[4].length >= 3) {
      console.log('there are at least 3 level-4 records - excellent');
      tmpStationsArray = sunLevelToRecordsMap[4].slice(0, 5); // get items 0-4
      places = this.extractNames(tmpStationsArray);

      getConnectionsSuccessFunc = function (connections) {
        for (var k = 0; k < tmpStationsArray.length; k++) {
          tmpStationsArray[k].data.arrival = Date.parseIso8601(connections[k].to.arrival);
          tmpStationsArray[k].data.departure = Date.parseIso8601(connections[k].from.departure);
        }
        store.setData(tmpStationsArray);
        store.fireEvent('storeFiltered');
      };
      getConnectionsFailureFunc  = function (connections, failedConnectionIndexes) {
        var successfulStations = [];
        console.log("Failed to get connection to '" + places[failedConnectionIndexes] + "'.");
        //for (var k = 0; k < connections.length; k++) {
          //if (connections[k] !== undefined) {
            tmpStationsArray[0].data.arrival = Date.parseIso8601("2013-10-09 12.23.23");
            tmpStationsArray[0].data.departure = Date.parseIso8601("2013-10-09 11.54.21");
            successfulStations.push(tmpStationsArray[0]);
          //}
        //}
        store.setData(successfulStations);
        store.fireEvent('storeFiltered');
      };
      transportApi.getConnectionsTo(places, getConnectionsSuccessFunc, getConnectionsFailureFunc);
    } else {
      store.setData([]);
      store.fireEvent('storeFiltered');
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
