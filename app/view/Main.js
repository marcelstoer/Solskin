Ext.define('SunApp.view.Main', {
  extend: 'Ext.navigation.View',
  xtype: 'mainview',

  requires: [
    'Ext.Img',
    'SunApp.view.Stations',
    'SunApp.view.StationDetail'
  ],

  config: {
    autoDestroy: false,
    navigationBar: {
      items: [
        {
          id: 'back',
          xtype: 'image',
          src: 'resources/images/shades.svg',
          cls: 'appImg',
          align: 'left'
        },
        {
          xtype: 'image',
          src: 'resources/images/menu.svg',
          cls: 'menuImg',
          align: 'right'
        }
      ]
    },

    items: [
      { xtype: 'stations' }
    ]
  }
});
