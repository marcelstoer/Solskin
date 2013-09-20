Ext.define('SunApp.view.MenuButton', {
  extend: 'Ext.Img',
  xtype: 'menuButton',
  id: 'menuButton',

  requires: [
    'SunApp.view.Disclaimer'
  ],


  config: {
          src: 'resources/images/shades.svg',
          text: '', // none, just needed so that there is no error

          cls: 'menuImg',
          align: 'right',

    refs: {
      main: 'mainview',
    },
          listeners: {
            tap: function() {
              SunApp.app.getController('Application').displayDisclaimer();
            }
          }

  }

});