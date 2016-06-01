# KML loader
Library that helps you load your Points Of Interests in kml format on your google map.
I decided to test my knowledge of javascript and I've tried to make a library with some basic options.

For the demo you can visit [Demo Page](http://simkesd.github.io/kml-loader/demo.html).
### Usage

The important file here is `dist/kml-loader.js`. After you include it you can then create an instance of `kmlLoader` object. `kmlLoader` has 3 parameters.

1. google map object (instance of `google.maps.Map(elem)`);
2. array of elements containing `data-layer-url` attribute based on which `kmlLoader` will generate pins on google map.
3. object containing additional, non-required options

##### HTML structure

``` HTML
<ul class="filters">
    <li data-layer-url="http://happyfist.co/pois/pois/POI/gyms.kml"><a>Gyms</a></li>
    <li data-layer-url="http://happyfist.co/pois/pois/POI/hotels.kml"><a>Hotels</a></li>
</ul>

<div id="map-canvas"></div>

<script type="text/javascript" src="https://maps.googleapis.com/maps/api/js></script>
<script type="text/javascript" src="../dist/kml-loader.js"></script>
```

Library uses data-layer-uri to get the location of your KML files.
=> NOTE: Location of your KML files must be on server with public address, as google needs to read data from them so it could show them on the map.

##### Javascript

You must initialize map by yourself, and pass reference to the map into constructor of library. So for an example you can do this:

``` javascript
var map;
var kl;
function initialize() {
    map = new google.maps.Map(document.getElementById('map-canvas'), {
        center: new google.maps.LatLng(40.751077, -73.945135),
        zoom: 13,
        mapTypeId: google.maps.MapTypeId.TERRAIN
    });

    kl = new kmlLoader(map, document.querySelectorAll('ul.filters li'), {
        filterClickCallback: function() {
            console.info('filterClickCallback called!');
        },
        setEvents: true,
        showOnLoad: true,
        onLayerChangeKeepState: true
    });
}


google.maps.event.addDomListener(window, 'load', initialize);
```

This portion of code will create initialize a google map for you (and set some options also, so you can actually see POIs)
Part of this code that we are particularly interested is next one:

``` javascript
kl = new kmlLoader(map, document.querySelectorAll('ul.filters li'), {
        filterClickCallback: function() {
            console.info('filterClickCallback called!');
        },
        setEvents: true,
        showOnLoad: true,
        onLayerChangeKeepState: true
    });
```

This code is initializing our library by sending required parameters to constructor. So, required parameters are
    * Instance of google map object and
    * Array of DOM elements containing data-layer-url attribute. Its content should be exact location of your KML file.
Third param is non required options object. 

### Additional info

##### kmlLoader(googleMap, domElements, {})
Initializes the library by setting some internals and setting events on provided DOM elements. This allows you to click
provided DOM elements and to load only clicked kml layer to your map.

##### loadAll(customOptions)
Loads all kml layers from DOM elements you passed through data-layer-url to constructor,

##### getLayers()
Returns all kml layers currently loaded to map

##### addLayer(src, customOptions)
Loads single layer to google map while keeping previously set layers.

##### loadSingleLayer(src, customOptions)
Loads single layer to google map, and deletes all previously set layers.

##### clearPreviousLayers()
Clears your google map from previously set layers.
