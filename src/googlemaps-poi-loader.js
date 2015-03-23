var gMap = (function() {
    var map;
    var filters = {

    };
    var kmlLayers = [];
    var filterClickCallback;

    /**
     * Initializes the map and calls the function that creates polylines.
     */
    function loadAll() {
        $.each( filters, function( key, value ) {
            loadKmlLayer($(value).data('layerUrl'), map);
        });
    }

    function setEvents() {
        $(filters).on('click', function() {
            if(!onLayerChangeKeepState) {
                clearPreviousLayers();
            }
            loadKmlLayer($(this).data('layerUrl'), map);
            if(filterClickCallback !== undefined) {
                filterClickCallback();
            }
        });
    }

    function clearPreviousLayers() {
        $.each(kmlLayers, function(key, value) {
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
        if(data.map === undefined) {
            throw new Error('Google map object must be passed as property of data parameter.')
        }
        if(data.filters === undefined) {
            throw new Error('Array of DOM elements containing data-layer-url attribute must be passed as property of data parameter.')
        }
        map = data.map;
        filters = data.filters;
        filterClickCallback = data.filterClickCallback
        onLayerChangeKeepState = data.onLayerChangeKeepState || false;
        setEvents();
    };

    constructor.prototype.loadAll = loadAll;

    return constructor;
})();