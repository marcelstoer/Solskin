Ext.define('SunApp.controller.Application', {
  extend: 'Ext.app.Controller',

  config: {
    refs: {
      main: 'mainview',
      stations: 'stations',
      stationDetail: 'stationDetail'
    },

    control: {
      main: {
        push: 'onMainPush',
        pop: 'onMainPop'
      },
      stations: {
        itemsingletap: 'onStationSelect'
      }
    }
  },

  onMainPush: function (view, item) {
  },

  onMainPop: function (view, item) {
    this.getMain().getNavigationBar().setTitle(SunApp.app.getCurrentLocation().getClosestStation());
    this.stationDetail.destroy();
  },

  onStationSelect: function (list, index, node, record) {
    this.stationDetail = Ext.create('SunApp.view.station.Show', { title: record.data.name });
    this.stationDetail.setRecord(record);
    this.getMain().push(this.stationDetail);
  }
});
