Ext.define('SunApp.view.StationDetail', {
  extend: 'Ext.Container',
  xtype: 'stationDetail',

  requires: [
    'Ext.Map'
  ],

  config: {
    baseCls: 'x-show-contact',
    layout: 'vbox',

    items: [
      {
        id: 'content',
        tpl: [
          '<div class="top">',
          '<div class="headshot" style="background-image:url(resources/images/sun/level{sunlevel}.svg);"></div>',
          '<div class="name">{name}</div>',
          '</div>'
        ].join('')
      }
    ],

    record: null
  },

  updateRecord: function (newRecord) {
    if (newRecord) {
      this.down('#content').setData(newRecord.data);
    }
  }
});