var gMap = (function() {
    var map;
    var filters = {

    };
    var gyms = 'http://happyfist.co/pois/pois/POI/gyms.kml';
    var hotels = 'http://happyfist.co/pois/pois/POI/hotels.kml';
    var artMuseums = 'http://happyfist.co/pois/pois/POI/artMuseums.kml';
    var nightlife = 'http://happyfist.co/pois/pois/POI/nightlife.kml';
    var restaurants = 'http://happyfist.co/pois/pois/POI/restaurants.kml';
    var schools = 'http://happyfist.co/pois/pois/POI/schools.kml';
    var shopAndSpecialities = 'http://happyfist.co/pois/pois/POI/shop-and-specialities.kml';
    var transit = 'http://happyfist.co/pois/pois/POI/transit.kml';

    /**
     * Initializes the map and calls the function that creates polylines.
     */
    function initialize() {
        map = new google.maps.Map(document.getElementById('map'), {
            center: new google.maps.LatLng(40.751077, -73.945135),
            zoom: 13,
            mapTypeId: google.maps.MapTypeId.TERRAIN
        });

        loadKmlLayer(gyms, map);
        loadKmlLayer(hotels, map);
        loadKmlLayer(artMuseums, map);
        loadKmlLayer(nightlife, map);
        loadKmlLayer(restaurants, map);
        loadKmlLayer(schools, map);
    }

    /**
     * Adds a KMLLayer based on the URL passed. Clicking on a marker
     * results in the balloon content being loaded into the right-hand div.
     * @param {string} src A URL for a KML file.
     */
    function loadKmlLayer(src, map) {
        var kmlLayer = new google.maps.KmlLayer(src, {
//            suppressInfoWindows: true,
            preserveViewport: true,
            map: map
        });
//        google.maps.event.addListener(kmlLayer, 'click', function(event) {
//            var content = event.featureData.infoWindowHtml;
//            var testimonial = document.getElementById('capture');
//            testimonial.innerHTML = content;
//        });
    }

    return {
        init: initialize
    };
})();