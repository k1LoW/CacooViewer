var win = Titanium.UI.currentWindow;

var image = Titanium.UI.createImageView({
                                            image:'images/cacoo_back.png'
                                        });
win.add(image);

// button
var btnReload = Ti.UI.createButton({
                                       systemButton:Titanium.UI.iPhone.SystemButton.REFRESH
                           });

btnReload.addEventListener('click', function() {
                               win.fireEvent('focus');
                   });

win.leftNavButton = btnReload;

var apiKey = '';


var a = Titanium.UI.createAlertDialog({
                                          title:'CacooViewer',
                                          message:'Please set API Key'
                                      });

win.addEventListener('focus', function(e) {
                                               if (Titanium.App.Properties.hasProperty('apiKey')) {
                                                   apiKey = Titanium.App.Properties.getString('apiKey');
                                               }

                                               //Titanium.API.debug('apiKey:' + apiKey);

                                               if (apiKey === '') {
                                                   a.buttonNames = null; // unset in case you did 2/3rd and then back to 1st
                                                   a.show();
                                               } else {

                                                   var xhr = Titanium.Network.createHTTPClient();

                                                   xhr.open('GET', 'https://cacoo.com/api/v1/diagrams.json?apiKey=' + apiKey);
                                                   xhr.onload = function () {
                                                       Titanium.API.debug(this.responseText);
                                                       var data = JSON.parse(this.responseText);

                                                       for (var i in data.result) {
                                                           data.result[i].hasChild = true;

                                                           if (data.result[i].security === 'private') {
                                                               data.result[i].leftImage = 'images/table_sheets_private.png';
                                                           } else {
                                                               data.result[i].leftImage = 'images/table_sheets.png';
                                                           }

                                                       }

                                                       var search = Titanium.UI.createSearchBar({
                                                                                                    showCancel:false
                                                                                                });

                                                       var tv = Titanium.UI.createTableView({ data : data.result,
                                                                                              search: search,
                                                                                              filterAttribute: 'title'
                                                                                            });

                                                       tv.addEventListener('click', function(e) {
                                                                               var row = e.rowData;
                                                                               var diagrams = Ti.UI.createWindow({
                                                                                                                     title:row.title,
                                                                                                                     backgroundColor:'#fff',
                                                                                                                     url:'diagrams.js',
                                                                                                                     diagramId:row.diagramId
                                                                                                                 });
                                                                               win.tab.open(diagrams);
                                                                           });

                                                       win.add(tv);
                                                   };
                                                   xhr.send();
                                               }
                                           });