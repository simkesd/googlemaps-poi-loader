var kmlLoader = (function() {
    var map,
        filters = {},
        kmlLayers = [],
        filterClickCallback,
        onLayerChangeKeepState = false,
        showOnLoad = false,
        callbackReturnValue = null;

    /**
     * Returns all currently loaded KML layers.
     *
     * @returns {Array}
     */
    function getLayers() {
        return kmlLayers;
    }

    /**
     * Uses DOM data passed to constructor to load all KMLs to the map
     */
    function loadAll(customOptions) {
        $.each(filters, function(key, value) {
            addKmlLayer($(value).data('layerUrl'), customOptions);
        });
    }

    /**
     * Sets events for clicking on kml layer element. If onLayerChangeKeepState is true, then
     * all layers will be cleared on kml layer element click. The function also check if kml
     * layer is already loaded. If it is, then it will remove it, if it's not, it will load it.
     * If you passed filterClickCallback as param, it will execute before the function exits.
     */
    function setEvents() {
        console.log(2);
        $(filters).on('click', function() {
            if(!onLayerChangeKeepState) {
                clearPreviousLayers();
            }else {
                var layerLoaded = false;
                for(var i = 0; i < kmlLayers.length; i++) {
                    if(kmlLayers[i].src === $(this).data('layerUrl')) {
                        layerLoaded = true;
                        removeLayer(i);
                    }
                }
            }
            if(!layerLoaded) {
                addKmlLayer($(this).data('layerUrl'));
            }
            if(filterClickCallback !== undefined) {
                console.log(3);
                constructor.prototype.callbackReturnValue = filterClickCallback();
                console.log(4);
            }
        });
    }

    /**
     * Removes single layer from map and removes it from kmlLayers array
     */
    function removeLayer(index) {
        kmlLayers[index].layerInstance.setMap(null);
        kmlLayers.splice(index, 1);
    }

    /**
     * Removes all previous layers from map and clears all layers from kmlLayer array
     */
    function clearPreviousLayers() {
        $.each(kmlLayers, function(key, value) {
            value.layerInstance.setMap(null);
        });
        constructor.prototype.kmlLayers = [];
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
            url: src,
            preserveViewport: true,
            map: map
        };

        var finalOptions = {};
        $.extend(true, finalOptions, defaultOptions, customOptions);

        var kmlLayer = new google.maps.KmlLayer(finalOptions);

        kmlLayers.push({
            layerInstance: kmlLayer,
            src: src
        });

        return kmlLayer;
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

    var constructor = function PoiLoader(data) {
        if(data == undefined) {
            throw new Error('You must pass parameters to kmlLoader object.');
        }

        if(data.map === undefined) {
            throw new Error('Google map object must be passed as property of data parameter.')
        }
        if(data.filters === undefined) {
            throw new Error('Array of DOM elements containing data-layer-url attribute must be passed as property of data parameter.')
        }

        map = data.map;
        filters = data.filters;
        filterClickCallback = data.filterClickCallback;
        onLayerChangeKeepState = data.onLayerChangeKeepState || onLayerChangeKeepState;
        showOnLoad = data.showOnLoad;

        if(data.setEvents === true) {
            console.log(1);
            setEvents();
        }

        if(showOnLoad) {
            loadAll();
        }
        //removeIf(onlyForTesting)
        constructor.prototype.map = map;
        constructor.prototype.filters = filters;
        constructor.prototype.callbackReturnValue = callbackReturnValue;
        constructor.prototype.kmlLayers = kmlLayers;
        //endRemoveIf(onlyForTesting)
    };

    constructor.prototype.loadAll = loadAll;
    constructor.prototype.addLayer = addKmlLayer;
    constructor.prototype.getLayers = getLayers;
    constructor.prototype.loadSingleLayer = loadSingleLayer;
    constructor.prototype.setEvents = setEvents;
    constructor.prototype.clearPreviousLayers = clearPreviousLayers;

    return constructor;
})();