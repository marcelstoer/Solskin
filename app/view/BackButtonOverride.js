Ext.define('SunApp.view.BackButtonOverride', {
  extend: 'Ext.Img',
  xtype: 'backButtonOverride',
  id: 'backButtonOverride',

  config: {
          src: 'resources/images/back-small.svg',
          text: '', // none, just needed so that there is no error
          cls: 'appImg'
// js error on down -> needs to be more like button
  }
});
