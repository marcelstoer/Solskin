Ext.define('Solskin.view.Disclaimer', {
  extend: 'Ext.Panel',
  xtype: 'disclaimer',

  config: {
    html: ['Solskin Version 0.1.<br>',
      'Developed by MM6.<br>',
      'Weather data provided by <a href="http://www.meteotest.ch">Meteotest</a>.<br>',
      'Thanks to <a href="http://netcetera.com">Netcetera</a>\'s Code Camps.<br>',
      'For questions and feedback go to <a href="http://www.solskinapp.ch">http://www.solskinapp.ch</a>.<br>',
      'The publisher of this app will not be liable for any consequences arising from the use of, or reliance on, the contents of this app.'].join(''),
    styleHtmlContent: true,
    scrollable: 'vertical'
  }
});