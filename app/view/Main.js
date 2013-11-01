Ext.define('Solskin.view.Main', {
  extend: 'Ext.navigation.View',
  xtype: 'mainview',

  requires: [
    'Ext.Img',
    'Solskin.view.BackButtonOverride',
    'Solskin.view.MenuButton',
    'Solskin.view.Overview',
    'Solskin.view.Stations',
    'Solskin.view.StationDetail',
    'Solskin.view.Meteotest',
    'Solskin.view.Disclaimer'
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
