Ext.define('SunApp.store.Stations', {
  extend: 'Ext.data.Store',
  requires: ['SunApp.store.StationReader'],

  config: {
    model: 'SunApp.model.Station',
    autoLoad: false, // 'load' called manually
    sorters: [
      // will be applied after reduceToRelevant returns
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
//      url: 'meteotest-data-2013-09-20-morning.json',    // for debug @ night, use this
      reader: {
        type: 'stationReader'
      }
    }
  },

  atLeast3RecordsForLevel: function (sunLevelToRecordsMap, sunLevel) {
    return sunLevelToRecordsMap[sunLevel] !== undefined && sunLevelToRecordsMap[sunLevel].length >= 3;
  },

  reduceToRelevant: function (store, records) {
    var sunLevel,
      filteredAwayEverything = true,
      tmpRecordsArray = [],
      publicTransportIds = [],
      getConnectionsSuccessFunc,
      getConnectionsFailureFunc,
      sunLevelToRecordsMap = this.buildSunLevelToRecordsMap(records),
      transportApi = Ext.create('SunApp.TransportApi');

    for (sunLevel = 4; sunLevel >= 1; sunLevel--) {
      if (this.atLeast3RecordsForLevel(sunLevelToRecordsMap, sunLevel)) {
        filteredAwayEverything = false;
        console.log('there are at least 3 level-' + sunLevel + ' records - excellent');
        tmpRecordsArray = sunLevelToRecordsMap[sunLevel].slice(0, 5); // get items 0-4
        publicTransportIds = this.extractPublicTransportIds(tmpRecordsArray);

        getConnectionsSuccessFunc = function (connections) {
          for (var k = 0; k < tmpRecordsArray.length; k++) {
            tmpRecordsArray[k].set('arrival', Date.parseIso8601(connections[k].to.arrival));
            tmpRecordsArray[k].set('departure', Date.parseIso8601(connections[k].from.departure));
          }
          store.setData(tmpRecordsArray);
          store.fireEvent('storeFiltered');
        };
        getConnectionsFailureFunc  = function (connections, failedConnectionIndexes) {
          var successfulStations = [];
          console.log("Failed to get connection to '" + publicTransportIds[failedConnectionIndexes] + "'.");
          for (var k = 0; k < connections.length; k++) {
            if (connections[k] !== undefined) {
              tmpRecordsArray[k].set('arrival', Date.parseIso8601(connections[k].to.arrival));
              tmpRecordsArray[k].set('departure', Date.parseIso8601(connections[k].from.departure));
              successfulStations.push(tmpRecordsArray[k]);
            }
          }
          store.setData(successfulStations);
          store.fireEvent('storeFiltered');
        };
        transportApi.getConnectionsTo(publicTransportIds, getConnectionsSuccessFunc, getConnectionsFailureFunc);
        // TODO msr: for now (i.e. until algorithm is further enhanced) the loop has to be interrupted
        break;
      }
    }
    if (filteredAwayEverything) {
      store.setData([]);
      store.fireEvent('storeFiltered');
    }
  },

  buildSunLevelToRecordsMap: function (records) {
    var i, map, record, recordsForLevel;
    map = [];
    for (i = 0; i < records.length; i++) {
      record = records[i];
      recordsForLevel = map[record.get('sunLevel')];
      if (recordsForLevel === undefined) {
        recordsForLevel = [];
        map[record.get('sunLevel')] = recordsForLevel;
      }
      recordsForLevel.push(record);
    }
    for (i = 0; i < map.length; i++) {
      map[i] = map[i] === undefined ? undefined: this.sortByDistanceAsc(map[i]);
    }
    return map;
  },

  sortByDistanceAsc: function (records) {
    return records.sort(function (a, b) {
      return a.get('linearDistance') - b.get('linearDistance');
    });
  },

  extractPublicTransportIds: function (stations) {
    var ids = [];
    for (var i = 0; i < stations.length; i++) {
      ids[i] = stations[i].get('publicTransportId');
    }
    return ids;
  }
});
