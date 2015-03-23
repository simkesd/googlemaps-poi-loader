var gMap = (function() {
    var map;
    var filters = {

    };
    var kmlLayers = [];

    /**
     * Initializes the map and calls the function that creates polylines.
     */
    function loadAll() {
        $.each( filters, function( key, value ) {
            console.log($(value).data('layerUrl'));
            loadKmlLayer($(value).data('layerUrl'), map);
        });
    }

    function setEvents() {
        $(filters).on('click', function() {
            clearPreviousLayers();
            loadKmlLayer($(this).data('layerUrl'), map);
        });
    }

    function clearPreviousLayers() {
        $.each( kmlLayers, function( key, value ) {
            value.layerInstance.setMap(null);
        });
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

        kmlLayers.push({
            layerInstance: kmlLayer,
            src: src
        });
//        google.maps.event.addListener(kmlLayer, 'click', function(event) {
//            var content = event.featureData.infoWindowHtml;
//            var testimonial = document.getElementById('capture');
//            testimonial.innerHTML = content;
//        });
    }


    var constructor = function Podcast(data) {
        map = data.map;
        filters = data.filters;
        setEvents();
    };

    constructor.prototype.loadAll = loadAll;

    return constructor;
})();