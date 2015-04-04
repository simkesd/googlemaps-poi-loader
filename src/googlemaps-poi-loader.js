var gMap = (function() {
    var map;
    var filters = {

    };
    var kmlLayers = [];
    var filterClickCallback;

    /**
     * Uses DOM data passed to constructor to load all POIs to the map
     */
    function loadAll(customOptions) {
        $.each( filters, function( key, value ) {
            addKmlLayer($(value).data('layerUrl'), customOptions);
        });
    }

    function setEvents() {
        $(filters).on('click', function() {
            if(!onLayerChangeKeepState) {
                clearPreviousLayers();
            }
            addKmlLayer($(this).data('layerUrl'), map);
            if(filterClickCallback !== undefined) {
                filterClickCallback();
            }
        });
    }

    /**
     * Removes all previous layers from map and clears all layers from kmlLayer array
     */
    function clearPreviousLayers() {
        $.each(kmlLayers, function(key, value) {
            value.layerInstance.setMap(null);
        });
        kmlLayers = [];
    }

    /**
     * Adds a KMLLayer based on the URL and options passed
     * @param {string} src A URL for a KML file.
     * @param {object} object with layer options (further reading https://developers.google.com/maps/documentation/javascript/examples/layer-kml)
     */
    function addKmlLayer(src, customOptions) {
        var kmlLayer = loadLayerOnMap(src, customOptions);

//        google.maps.event.addListener(kmlLayer, 'click', function(event) {
//            var content = event.featureData.infoWindowHtml;
//            var testimonial = document.getElementById('capture');
//            testimonial.innerHTML = content;
//        });
    }

    /**
     * Loads single layer to map while preserving others
     *
     * @param src {string}
     * @param {object} customOptions (further reading https://developers.google.com/maps/documentation/javascript/examples/layer-kml)
     * @returns {google.maps.KmlLayer}
     */
    function loadLayerOnMap(src, customOptions) {

        var defaultOptions = {
//            suppressInfoWindows: true,
            preserveViewport: true,
            map: map
        };

        var finalOptions = {};
        $.extend(true, finalOptions, defaultOptions, customOptions);

        var kmlLayer = new google.maps.KmlLayer(src, finalOptions);

        kmlLayers.push({
            layerInstance: kmlLayer,
            src: src
        });

        return kmlLayer;
    }

    /**
     * Returns all currently loaded layers.
     *
     * @returns {Array}
     */
    function getLayers() {
        return kmlLayers;
    }

    /**
     * Loads single layer to map while clearing all previously loaded layers
     *
     * @param src
     * @param customOptions
     */
    function loadSingleLayer(src, customOptions) {
        clearPreviousLayers();
        loadLayerOnMap(src, customOptions);
    }

    var constructor = function Constructor(data) {
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
    constructor.prototype.addLayer = addKmlLayer;
    constructor.prototype.getLayers = getLayers;
    constructor.prototype.loadSingleLayer = loadSingleLayer;
    constructor.prototype.clearPreviousLayers = clearPreviousLayers;

    return constructor;
})();