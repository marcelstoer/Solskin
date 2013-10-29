Ext.define('SunApp.view.Disclaimer', {
  extend: 'Ext.Panel',
  xtype: 'disclaimer',

    config: {
        html: 'SunApp Version 0.1.<br>Developed by MM6.<br>Weather data provided by <a href="http://www.meteotest.ch">Meteotest</a>.<br>Thanks to <a href="http://netcetera.com">Netcetera</a>\'s codecamps.<br>For questions and feedback contact <a href="mailto:mm6@gmail.com">mm6@gmail.com</a>.<br>The publisher of this app will not be liable for any consequences arising from the use of, or reliance on, the contents of this app.',
        styleHtmlContent: true,
        scrollable: 'vertical'
    }
});