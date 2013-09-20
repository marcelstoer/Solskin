Ext.define('SunApp.view.Main', {
  extend: 'Ext.navigation.View',
  xtype: 'mainview',

  requires: [
    'Ext.Img',
    'SunApp.view.BackButtonOverride',
    'SunApp.view.MenuButton',
    'SunApp.view.Overview',
    'SunApp.view.Stations',
    'SunApp.view.StationDetail',
    'SunApp.view.Meteotest',
    'SunApp.view.Disclaimer'
  ],

  config: {
    autoDestroy: false,
    navigationBar: {
      backButton: {
        xtype: 'backButtonOverride'
      },
      items: [
        {
          xtype: 'menuButton',

        }
      ]
    },

    items: [
      { xtype: 'overview' }
    ]
  }
});
