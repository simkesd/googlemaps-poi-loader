# googlemaps-poi-loader
Small and simple Library that helps you load your Points Of Interests in kml format on your google map.
I decided to test my knowledge of javascript and I've tried to make a library with some basic options.
Google maps poi loader may be of use for you if you have a list of POIs you want to load to your map, 
and add some functionalities to that list such as loading only POIs of clicked element.
### Usage

You must load jquery, in my example I am using version 2.1.3.

##### HTML structure

``` HTML
<ul class="filters">
    <li data-layer-url="http://happyfist.co/pois/pois/POI/gyms.kml"><a>Gyms</a></li>
    <li data-layer-url="http://happyfist.co/pois/pois/POI/hotels.kml"><a>Hotels</a></li>
</ul>

<div id="map-canvas"></div>

```

Library uses data-layer-uri to get the location of your KML files.
=> NOTE: Location of your KML files must be public, as google needs to read data from them so it could show them on the map.

##### Javascript

You must initialize map by yourself, and pass reference to the map to constructor of library. So for an exmaple you can do this:

``` javascript
var map;
        function initialize() {
            map = new google.maps.Map(document.getElementById('map-canvas'), {
                center: new google.maps.LatLng(40.751077, -73.945135),
                zoom: 13,
                mapTypeId: google.maps.MapTypeId.TERRAIN
            });

            var gm = new gMap({
                map: map,
                filters: $('ul.filters li'),
                filterClickCallback: function() {
                    console.log('filterClickCallback');
                }
            });

            gm.loadAll();
        }

        google.maps.event.addDomListener(window, 'load', initialize);
```

This portion of code will create initialize a google map for you (and set some options also, so you can actually see POIs)
Part of this code that we are particularly interested is next one: 

``` javascript
var gm = new gMap({
                map: map,
                filters: $('ul.filters li'),
                filterClickCallback: function() {
                    console.log('filterClickCallback');
                }
            });

            gm.loadAll();
```

This code is initializing our library by sending required parameters to constructor. So, required parameters are
    * Instance of google map object and
    * Array of DOM elements containing data-layer-url attribute. Its content should be exact location of your KML file.