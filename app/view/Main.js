Ext.define('SunApp.view.Main', {
  extend: 'Ext.navigation.View',
  xtype: 'mainview',

  requires: [
    'Ext.Img',
    'SunApp.view.BackButtonOverride',
    'SunApp.view.Overview',
    'SunApp.view.Stations',
    'SunApp.view.StationDetail',
    'SunApp.view.Meteotest',
  ],

  config: {
    autoDestroy: false,
    navigationBar: {
      backButton: {
        xtype: 'backButtonOverride'
      },
      items: [
//        {
//          id: 'back',
//          xtype: 'backButton',
////          src: 'resources/images/shades.svg',
////          cls: 'appImg',
//          align: 'left'
//        },
        {
          xtype: 'image',
          id: 'menu',
          src: 'resources/images/shades.svg',
          cls: 'menuImg',
          align: 'right',
        }
      ]
    },

    items: [
      { xtype: 'overview' }
    ]
  }
});
