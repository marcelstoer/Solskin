Ext.define('Solskin.view.BackButtonOverride', {
  extend: 'Ext.Img',
  xtype: 'backButtonOverride',
  id: 'backButtonOverride',

  config: {
          src: 'resources/images/back.svg',
          text: '', // none, just needed so that there is no error
          cls: 'appImg'

  }
});
