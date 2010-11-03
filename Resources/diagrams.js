var win = Titanium.UI.currentWindow;

win.backgroundColor = '#FFF';

var image = Titanium.UI.createImageView({
                                            image:'images/cacoo_back.png'
                                        });

win.add(image);


Titanium.API.debug(win.diagramId);

// initialize to all modes
win.orientationModes = [
    Titanium.UI.PORTRAIT,
    Titanium.UI.LANDSCAPE_LEFT,
    Titanium.UI.LANDSCAPE_RIGHT
];

var apiKey = '';

if (Titanium.App.Properties.hasProperty('apiKey')) {
    apiKey = Titanium.App.Properties.getString('apiKey');
}

if (apiKey !== '') {

    //Titanium.API.debug('apiKey:' + apiKey);

    var xhr = Titanium.Network.createHTTPClient();

    xhr.open('GET', 'https://cacoo.com/api/v1/diagrams/' + win.diagramId + '.json?apiKey=' + apiKey);
    xhr.onload = function () {
        Titanium.API.debug(this.responseText);
        var data = JSON.parse(this.responseText);


        // orientation change listener
        //
        Ti.Gesture.addEventListener('orientationchange',function(e) {
                                        // get orienation from event object
                                        var orientation = getOrientation(e.orientation);
                                    });

        for (var i in data.sheets) {
            data.sheets[i].title = data.sheets[i].name;
            data.sheets[i].hasChild = true;
            if (data.security === 'private') {
                data.sheets[i].leftImage = 'images/table_diagram_private.png';
            } else {
                data.sheets[i].leftImage = 'images/table_diagram.png';
            }
            delete data.sheets[i].width;
            delete data.sheets[i].height;
        }

        var search = Titanium.UI.createSearchBar({
                                                     showCancel:false
                                                 });

        var tv = Titanium.UI.createTableView({ data : data.sheets,
                                               search: search,
                                               filterAttribute: 'title'
                                             });

        tv.addEventListener('click', function(e) {
                                var row = e.rowData;

                                var diagram = Ti.UI.createWebView();
                                var html = '<html><head><title>' + row.title + '</title><meta name="viewport" content="user-scalable=yes, width=device-width, initial-scale = 1.0, minimum-scale = 1.0, maximum-scale = 10.0" /> <meta name="apple-mobile-web-app-capable" content="yes" /></head><body><div><img width="300px" src="' + row.imageUrlForApi + '?apiKey=' + apiKey + '" /></div></body></html>';
                                diagram.html = html;
                                var w = Ti.UI.createWindow({title:row.title});

                                w.add(diagram);

                                w.hideTabBar();

                                win.tab.open(w);

                                //w.open();
                            });

        win.add(tv);


    };
    xhr.send();
}