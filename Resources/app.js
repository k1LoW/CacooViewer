// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#000');

// create tab group
var tabGroup = Titanium.UI.createTabGroup({barColor:'#106ACD'});

var apiKey = '';

if (Titanium.App.Properties.hasProperty('apiKey')) {
    apiKey = Titanium.App.Properties.getString('apiKey');
}

//
// create base UI tab and root window
//
var sheets = Titanium.UI.createWindow({
                                        title:'Sheets',
                                        backgroundColor:'#fff',
                                        url:'sheets.js'
                                    });

var tab1 = Titanium.UI.createTab({
                                     icon:'sheets.png',
                                     title:'Sheets',
                                     window:sheets
                                 });

//
// create controls tab and root window
//
var setting = Titanium.UI.createWindow({
                                        title:'Setting',
                                        backgroundColor:'#fff',
                                        url: 'setting.js'
                                    });
var tab2 = Titanium.UI.createTab({
                                     icon:'setting.png',
                                     title:'Setting',
                                     window:setting
                                 });


//
//  add tabs
//
tabGroup.addTab(tab1);
tabGroup.addTab(tab2);


// open tab group
setTimeout(function() {
               tabGroup.open();
           }, 2000);
