# googlemaps-poi-loader
Small and simple Library that helps you load your Points Of Interests in kml format on your google map.

### Usage

You must load jquery, in my example I am using version 2.1.3.

HTML structure

``` HTML
<ul class="filters">
    <li data-layer-url="http://happyfist.co/pois/pois/POI/gyms.kml"><a>Gyms</a></li>
    <li data-layer-url="http://happyfist.co/pois/pois/POI/hotels.kml"><a>Hotels</a></li>
</ul>
```
Javascript

You must initialize map by yourself, and pass reference to the map to constructor of library

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
            gm.addLayer('http://happyfist.co/pois/pois/POI/hotels.kml');
            gm.addLayer('http://happyfist.co/pois/pois/POI/gyms.kml');

            console.log(gm.getLayers());

            gm.loadSingleLayer('http://happyfist.co/pois/pois/POI/hotels.kml');

            console.log(gm.getLayers());
        }

        google.maps.event.addDomListener(window, 'load', initialize);
```
