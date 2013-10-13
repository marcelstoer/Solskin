/*
    This file is generated and updated by Sencha Cmd. You can edit this file as
    needed for your application, but these edits will have to be merged by
    Sencha Cmd when it performs code generation tasks such as generating new
    models, controllers or views and when running "sencha app upgrade".

    Ideally changes to this file would be limited and most work would be done
    in other places (such as Controllers). If Sencha Cmd cannot merge your
    changes and its generated code, it will produce a "merge conflict" that you
    will need to resolve manually.
*/

// DO NOT DELETE - this directive is required for Sencha Cmd packages to work.
//@require @packageOverrides

// Support for new Date(iso8601) was only added in ES5. Even browsers that support it
// may interpret it differently. This here, however, is well defined.
// http://stackoverflow.com/questions/6228302/javascript-date-iso8601
// http://dev.enekoalonso.com/2010/09/21/date-from-iso-8601-string/
// http://en.wikipedia.org/wiki/ISO_8601#Time_offsets_from_UTC
if (Date.parseIso8601 === undefined) {
  Date.parseIso8601 = function (isoString) {
    var parts = isoString.match(/\d+/g);
    return new Date(parts[0], parts[1] - 1, parts[2], parts[3], parts[4], parts[5]);
  };
}

// Meteotest delivers 'YYYY-MM-DD hh:mm:ss' which has to be interpreted as UTC!
if (Date.parseMeteotest === undefined) {
  Date.parseMeteotest = function (meteotestString) {
    var utcString = meteotestString.replace(' ', 'T') + 'Z';
    return new Date(utcString);
  };
}

var wmo2sbb = {
  "66000": {"name": "Bettingen, St. Chrischona", "stationId": "8589391", "lat": 47.5716, "long": 7.68715},
  "66010": {"name": "Basel SBB", "stationId": "8500010", "lat": 47.5412, "long": 7.58275},
  "66020": {"name": "Delémont", "stationId": "8500109", "lat": 47.3643, "long": 7.33062},
  "66040": {"name": "Neuchâtel", "stationId": "8504221", "lat": 47.0004, "long": 6.95412},
  "66050": {"name": "Chasseral, Hôtel", "stationId": "8504951", "lat": 47.1317, "long": 7.05432},
  "66060": {"name": "Le Landeron", "stationId": "8504225", "lat": 47.0476, "long": 7.05911},
  "66090": {"name": "Le Moléson", "stationId": "8504748", "lat": 46.5471, "long": 7.01803},
  "66100": {"name": "Payerne", "stationId": "8504134", "lat": 46.8116, "long": 6.94242},
  "66120": {"name": "La Chaux-de-Fonds", "stationId": "8504314", "lat": 47.0832, "long": 6.79236},
  "66160": {"name": "Fahy", "stationId": "8572051", "lat": 47.4238, "long": 6.9411},
  "66170": {"name": "La Brévine", "stationId": "8504750", "lat": 46.9818, "long": 6.60847},
  "66180": {"name": "Yverdon-les-Bains", "stationId": "8504200", "lat": 46.7506, "long": 6.58625},
  "66190": {"name": "Mauborget", "stationId": "8570269", "lat": 46.8406, "long": 6.57631},
  "66200": {"name": "Schaffhausen", "stationId": "8503424", "lat": 47.6898, "long": 8.62009},
  "66210": {"name": "Romanshorn", "stationId": "8506121", "lat": 47.6017, "long": 9.27939},
  "66260": {"name": "Schönenwerd", "stationId": "8502112", "lat": 47.363, "long": 7.97366},
  "66280": {"name": "Plaffeien", "stationId": "8504868", "lat": 46.7477, "long": 7.266},
  "66290": {"name": "Rosshäusern", "stationId": "8504487", "lat": 46.9521, "long": 7.28297},
  "66310": {"name": "Zollikofen", "stationId": "8504410", "lat": 46.9907, "long": 7.464},
  "66320": {"name": "Grenchen", "stationId": "0000985", "lat": 47.1791, "long": 7.41423},
  "66330": {"name": "Suhr", "stationId": "8502103", "lat": 47.3843, "long": 8.07945},
  "66340": {"name": "Bolligen", "stationId": "8507068", "lat": 46.9778, "long": 7.52866},
  "66360": {"name": "Fuchsenried, Mühlebergwerk", "stationId": "8571459", "lat": 46.9733, "long": 7.27815},
  "66390": {"name": "Luthern Bad", "stationId": "8508660", "lat": 47.0047, "long": 7.94006},
  "66410": {"name": "Möhlin", "stationId": "8500302", "lat": 47.5722, "long": 7.87786},
  "66430": {"name": "Langenthal", "stationId": "8508100", "lat": 47.255, "long": 7.7874},
  "66440": {"name": "Ermensee", "stationId": "8502019", "lat": 47.2447, "long": 8.23445},
  "66450": {"name": "Gelterkinden", "stationId": "8500027", "lat": 47.4346, "long": 7.87932},
  "66460": {"name": "Döttingen", "stationId": "8503501", "lat": 47.5572, "long": 8.23325},
  "66470": {"name": "Siggenthal-Würenlingen", "stationId": "8503502", "lat": 47.5384, "long": 8.22941},
  "66480": {"name": "Wauwil", "stationId": "8502006", "lat": 47.1795, "long": 8.00459},
  "66500": {"name": "Luzern", "stationId": "8505000", "lat": 47.0364, "long": 8.30096},
  "66510": {"name": "Schüpfheim", "stationId": "8508211", "lat": 46.9471, "long": 8.01291},
  "66550": {"name": "Engelberg", "stationId": "8508399", "lat": 46.8219, "long": 8.41046},
  "66560": {"name": "Brienz", "stationId": "8508305", "lat": 46.743, "long": 8.06007},
  "66590": {"name": "Pilatus Kulm", "stationId": "8508456", "lat": 46.9789, "long": 8.25233},
  "66600": {"name": "Zürich, Zoo", "stationId": "8591442", "lat": 47.3779, "long": 8.56573},
  "66640": {"name": "Zürich Affoltern", "stationId": "8503008", "lat": 47.4277, "long": 8.51789},
  "66660": {"name": "Koblenz", "stationId": "8500329", "lat": 47.5973, "long": 8.18826},
  "66690": {"name": "Dielsdorf", "stationId": "8503315", "lat": 47.4819, "long": 8.39721},
  "66700": {"name": "Zürich Flughafen", "stationId": "8503016", "lat": 47.4796, "long": 8.53608},
  "66710": {"name": "Steckborn", "stationId": "8506136", "lat": 47.6687, "long": 8.98148},
  "66720": {"name": "Altdorf", "stationId": "8505113", "lat": 46.8702, "long": 8.63175},
  "66730": {"name": "Wädenswil", "stationId": "8503206", "lat": 47.2213, "long": 8.67668},
  "66740": {"name": "Zug", "stationId": "8502204", "lat": 47.1883, "long": 8.46551},
  "66760": {"name": "Oberägeri, Station", "stationId": "8502287", "lat": 47.1336, "long": 8.60808},
  "66770": {"name": "Uetliberg", "stationId": "8503057", "lat": 47.3515, "long": 8.49016},
  "66790": {"name": "Aadorf", "stationId": "8506013", "lat": 47.4799, "long": 8.90488},
  "66800": {"name": "Säntis", "stationId": "8506269", "lat": 47.2494, "long": 9.34363},
  "66810": {"name": "St. Gallen", "stationId": "8506302", "lat": 47.4255, "long": 9.39846},
  "66830": {"name": "Schmerikon", "stationId": "8503115", "lat": 47.2246, "long": 8.94021},
  "66850": {"name": "Glarus", "stationId": "8503230", "lat": 47.0346, "long": 9.0669},
  "66870": {"name": "Walenstadt", "stationId": "8509414", "lat": 47.1288, "long": 9.21607},
  "66900": {"name": "Rorschach", "stationId": "8506311", "lat": 47.4836, "long": 9.56636},
  "67000": {"name": "Genève", "stationId": "8501008", "lat": 46.2447, "long": 6.1236},
  "67010": {"name": "Chez-le-Maître", "stationId": "8501158", "lat": 46.5941, "long": 6.22017},
  "67040": {"name": "Bière", "stationId": "8501096", "lat": 46.525, "long": 6.34222},
  "67050": {"name": "Nyon", "stationId": "8501030", "lat": 46.4011, "long": 6.22775},
  "67060": {"name": "St-Prex", "stationId": "8501036", "lat": 46.4837, "long": 6.44302},
  "67080": {"name": "Palézieux", "stationId": "8504014", "lat": 46.5722, "long": 6.85817},
  "67090": {"name": "Montreux", "stationId": "8501300", "lat": 46.3934, "long": 6.85696},
  "67110": {"name": "Lausanne", "stationId": "8501120", "lat": 46.5123, "long": 6.66741},
  "67120": {"name": "Aigle", "stationId": "8501400", "lat": 46.3266, "long": 6.92443},
  "67140": {"name": "Glacier-des-Diablerets", "stationId": "8501354", "lat": 46.3268, "long": 7.20386},
  "67150": {"name": "Martigny", "stationId": "8501500", "lat": 46.183, "long": 7.02667},
  "67170": {"name": "Le Grand-St-Bernard, Hospice", "stationId": "8501885", "lat": 45.8688, "long": 7.1708},
  "67200": {"name": "Sion", "stationId": "8501506", "lat": 46.2186, "long": 7.33017},
  "67220": {"name": "Evolène, Village", "stationId": "8582967", "lat": 46.1121, "long": 7.50868},
  "67240": {"name": "Montana Gare", "stationId": "8501596", "lat": 46.3138, "long": 7.48537},
  "67270": {"name": "Visp", "stationId": "8501605", "lat": 46.3029, "long": 7.84295},
  "67300": {"name": "Jungfraujoch", "stationId": "8507364", "lat": 46.5474, "long": 7.98533},
  "67330": {"name": "Boltigen", "stationId": "8507292", "lat": 46.6235, "long": 7.38419},
  "67340": {"name": "Interlaken", "stationId": "8507492", "lat": 46.6722, "long": 7.87014},
  "67350": {"name": "Adelboden, Post", "stationId": "8507851", "lat": 46.492, "long": 7.56107},
  "67360": {"name": "Männlichen LWM", "stationId": "8507357", "lat": 46.6131, "long": 7.94096},
  "67400": {"name": "Kleintitlis", "stationId": "8508493", "lat": 46.7705, "long": 8.42581},
  "67440": {"name": "Grimsel Passhöhe", "stationId": "8508762", "lat": 46.5716, "long": 8.33321},
  "67450": {"name": "Ulrichen", "stationId": "8501663", "lat": 46.5048, "long": 8.30814},
  "67480": {"name": "Zermatt", "stationId": "8501689", "lat": 46.0292, "long": 7.75311},
  "67490": {"name": "Gornergrat", "stationId": "8501694", "lat": 45.9832, "long": 7.78446},
  "67500": {"name": "Andermatt Nätschen", "stationId": "8505170", "lat": 46.6535, "long": 8.61624},
  "67510": {"name": "Robiei", "stationId": "8530458", "lat": 46.4431, "long": 8.51339},
  "67520": {"name": "Cevio, centro scolastico", "stationId": "8578904", "lat": 46.3204, "long": 8.60332},
  "67530": {"name": "Ambrì-Piotta", "stationId": "8505202", "lat": 46.5171, "long": 8.6757},
  "67540": {"name": "Sobrio, Paese", "stationId": "8575742", "lat": 46.4101, "long": 8.92469},
  "67560": {"name": "Acquarossa-Comprovasco", "stationId": "8505257", "lat": 46.4594, "long": 8.93565},
  "67570": {"name": "Bellinzona", "stationId": "8505213", "lat": 46.2973, "long": 8.98768},
  "67590": {"name": "Cimetta", "stationId": "8530454", "lat": 46.201, "long": 8.79084},
  "67600": {"name": "Locarno", "stationId": "8505400", "lat": 46.1726, "long": 8.78742},
  "67620": {"name": "Cadenazzo", "stationId": "8505404", "lat": 46.16, "long": 8.9336},
  "67700": {"name": "Lugano", "stationId": "8505300", "lat": 46.0042, "long": 8.96032},
  "67710": {"name": "Mendrisio", "stationId": "8505305", "lat": 45.8434, "long": 8.93225},
  "67720": {"name": "Generoso Vetta", "stationId": "8505374", "lat": 45.9262, "long": 9.01457},
  "67780": {"name": "Buffalora P10", "stationId": "8509759", "lat": 46.6484, "long": 10.2673},
  "67800": {"name": "Weissfluhjoch DKB", "stationId": "8509085", "lat": 46.8333, "long": 9.80639},
  "67820": {"name": "Sedrun", "stationId": "8505176", "lat": 46.7065, "long": 8.85345},
  "67830": {"name": "S. Bernardino, Posta", "stationId": "8509867", "lat": 46.4636, "long": 9.18464},
  "67840": {"name": "Davos Dorf, Bahnhof", "stationId": "8574848", "lat": 46.813, "long": 9.84349},
  "67860": {"name": "Chur", "stationId": "8509000", "lat": 46.8704, "long": 9.53057},
  "67870": {"name": "Andeer, posta", "stationId": "8509752", "lat": 46.6101, "long": 9.43191},
  "67910": {"name": "Corvatsch", "stationId": "8509382", "lat": 46.418, "long": 9.82136},
  "67920": {"name": "Samedan", "stationId": "8509251", "lat": 46.5264, "long": 9.87894},
  "67930": {"name": "Valbella, Post", "stationId": "8509950", "lat": 46.7556, "long": 9.55399},
  "67940": {"name": "Poschiavo", "stationId": "8509361", "lat": 46.3466, "long": 10.0611},
  "67980": {"name": "Scuol-Tarasp", "stationId": "8509268", "lat": 46.7933, "long": 10.2832},
  "67990": {"name": "Motta Naluns", "stationId": "8509281", "lat": 46.8175, "long": 10.2615},
  "69570": {"name": "Giswil", "stationId": "8508312", "lat": 46.8495, "long": 8.19019},
  "69900": {"name": "Vaduz, Post", "stationId": "8509985", "lat": 47.1275, "long": 9.51752},
  "66780": {"name": "Bischofszell Stadt", "stationId": "8506213", "lat": 47.497, "long": 9.23416},
  "66930": {"name": "Ebnat-Kappel", "stationId": "8506297", "lat": 47.2735, "long": 9.10833},
  "66230": {"name": "Berlingen", "stationId": "8506135", "lat": 47.6498, "long": 9.02117},
  "66380": {"name": "Langnau i.E.", "stationId": "8508207", "lat": 46.94, "long": 7.80729},
  "66820": {"name": "Schwanden GL", "stationId": "8503233", "lat": 46.9236, "long": 9.17533},
  "66860": {"name": "Bad Ragaz", "stationId": "8509004", "lat": 47.0165, "long": 9.5025},
  "66370": {"name": "Meiringen", "stationId": "8508308", "lat": 46.7322, "long": 8.16916},
  "66750": {"name": "Einsiedeln", "stationId": "8503283", "lat": 47.133, "long": 8.7565},
  "66250": {"name": "Fribourg", "stationId": "8504100", "lat": 46.7713, "long": 7.11367},
  "66350": {"name": "Kirchberg-Alchenflüh", "stationId": "8508084", "lat": 47.1188, "long": 7.6055},
  "66240": {"name": "Wilchingen-Hallau", "stationId": "8014482", "lat": 47.6973, "long": 8.4705},
  "66270": {"name": "Château-d'Oex", "stationId": "8501394", "lat": 46.4797, "long": 7.13967},
  "67580": {"name": "Bellinzona", "stationId": "8505213", "lat": 46.255, "long": 9.16372},
  "67310": {"name": "Thun", "stationId": "8507100", "lat": 46.7498, "long": 7.58525},
  "67880": {"name": "Vicosoprano", "stationId": "8581576", "lat": 46.3538, "long": 9.62606}
};

//<debug>
Ext.Loader.setPath({
  'Ext': 'touch/src',
  'SunApp': 'app'
});
//</debug>

Ext.Loader.setConfig({
  // avoids '_dc' cache-busting query string param for all the .js files (model, store, etc.) if false
  disableCaching: true
});

Ext.application({
  name: 'SunApp',
  currentLocation: null,

  models: ['Station'],
  stores: ['Stations'],
  views: ['Launching', 'Main', 'Error', 'Disclaimer', 'Overview', 'Meteotest', 'Stations', 'StationDetail'],
  controllers: ['Application'],

  icon: {
    '57': 'resources/icons/iOS/Icon.png',
    '72': 'resources/icons/iOS/Icon-72.png',
    '114': 'resources/icons/iOS/Icon@2x.png',
    '144': 'resources/icons/iOS/Icon-72@2x.png'
  },

  isIconPrecomposed: true,

  startupImage: {
    '320x460': 'resources/startup/320x460.jpg',
    '640x920': 'resources/startup/640x920.png',
    '768x1004': 'resources/startup/768x1004.png',
    '748x1024': 'resources/startup/748x1024.png',
    '1536x2008': 'resources/startup/1536x2008.png',
    '1496x2048': 'resources/startup/1496x2048.png'
  },

  launch: function () {
    SunApp.app.fireEvent('launching');
  },

  setCurrentLocation: function (currentLocation) {
    console.log('setting current location: ' + currentLocation.getLat() + '/' + currentLocation.getLong());
    this.currentLocation = currentLocation
  },
  getCurrentLocation: function () {
    return this.currentLocation;
  },

  onUpdated: function () {
    Ext.Msg.confirm(
      "Application Update",
      "This application has just successfully been updated to the latest version. Reload now?",
      function (buttonId) {
        if (buttonId === 'yes') {
          window.location.reload();
        }
      }
    );
  }
});
