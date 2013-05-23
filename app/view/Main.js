Ext.define('SunApp.view.Main', {
  extend: 'Ext.navigation.View',
  xtype: 'mainview',

  requires: [
    'Ext.Img',
    'SunApp.view.StationsPanel',
    'SunApp.view.Stations',
    'SunApp.view.station.Show'
  ],

  config: {
    autoDestroy: false,
    navigationBar: {
      items: [
        {
          xtype: 'image',
          src: 'resources/images/shades.svg',
          cls: 'appImg',
          align: 'left'
        },
        {
          xtype: 'button',
          text: 'foo',
          align: 'right'
        }
      ]
    },

    items: [
      { xtype: 'stations' }
    ]
  }
});
