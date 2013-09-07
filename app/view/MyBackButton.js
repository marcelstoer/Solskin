Ext.define('SunApp.view.MyBackButton', {
  extend: 'Ext.Img',
  xtype: 'myBackButton',
  id: 'myBackButton',

  config: {
          src: 'resources/images/shades.svg',
          text: '', // none, just needed so that there is no error
          cls: 'appImg'
  }
});
