var gMap = (function() {
    var map;
    var filters = {

    };
    var kmlLayers = [];
    var filterClickCallback;

    /**
     * Initializes the map and calls the function that creates poly lines.
     */
    function loadAll() {
        $.each( filters, function( key, value ) {
            addKmlLayer($(value).data('layerUrl'));
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

    function clearPreviousLayers() {
        $.each(kmlLayers, function(key, value) {
            value.layerInstance.setMap(null);
        });
        kmlLayers = [];
    }

    /**
     * Adds a KMLLayer based on the URL passed. Clicking on a marker
     * results in the balloon content being loaded into the right-hand div.
     * @param {string} src A URL for a KML file.
     */
    function addKmlLayer(src) {
        var kmlLayer = loadLayerOnMap(src);

//        google.maps.event.addListener(kmlLayer, 'click', function(event) {
//            var content = event.featureData.infoWindowHtml;
//            var testimonial = document.getElementById('capture');
//            testimonial.innerHTML = content;
//        });
    }

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

    function getLayers() {
        return kmlLayers;
    }

    function loadSingleLayer(src) {
        clearPreviousLayers();
        loadLayerOnMap(src);
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

    return constructor;
})();