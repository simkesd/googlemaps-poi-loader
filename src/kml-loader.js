var kmlLoader = (function() {
    var self = { map: null,
        filters : {},
        kmlLayers : [],
        filterClickCallback: null,
        onLayerChangeKeepState: false,
        showOnLoad: false,
        callbackReturnValue: null
      };

    /**
     * Returns all currently loaded KML layers.
     *
     * @returns {Array}
     */
    function getLayers() {
        return self.kmlLayers;
    }

    /**
     * Uses DOM data passed to constructor to load all KMLs to the map
     */
    function loadAll(customOptions) {
      for(var i = 0; i < self.filters.length; i++) {
        addLayer(self.filters[i].dataset.layerUrl, customOptions);
      }
    }

    /**
     * Sets events for clicking on kml layer element. If onLayerChangeKeepState is true, then
     * all layers will be cleared on kml layer element click. The function also check if kml
     * layer is already loaded. If it is, then it will remove it, if it's not, it will load it.
     * If you passed filterClickCallback as param, it will execute before the function exits.
     */
    function setEvents() {
      for(var i = 0; i < self.filters.length; i++) {
        self.filters[i].onclick = function(e) {
          var layerLoaded = false;
          var layerUrl = this.dataset.layerUrl;
          if(!self.onLayerChangeKeepState) {
              clearPreviousLayers();
          }else {
              for(var i = 0; i < self.kmlLayers.length; i++) {
                  if(self.kmlLayers[i].src === layerUrl) {
                      layerLoaded = true;
                      removeLayer(i);
                  }
              }
          }
          if(!layerLoaded) {
              addLayer(layerUrl);
          }
          if(self.filterClickCallback !== undefined) {
              constructor.prototype.callbackReturnValue = self.filterClickCallback();
          }
        }
      }
    }

    /**
     * Removes single layer from map and removes it from kmlLayers array
     */
    function removeLayer(index) {
        self.kmlLayers[index].layerInstance.setMap(null);
        self.kmlLayers.splice(index, 1);
    }

    /**
     * Removes all previous layers from map and clears all layers from kmlLayer array
     */
    function clearPreviousLayers() {
      for(var i = 0; i < self.kmlLayers.length; i++) {
          kmlLayers[i].layerInstance.setMap(null);
      }
        constructor.prototype.kmlLayers = [];
    }

    /**
     * Adds a KMLLayer based on the URL and options passed
     * @param {string} src A URL for a KML file.
     * @param {object} object with layer options (further reading https://developers.google.com/maps/documentation/javascript/examples/layer-kml)
     */
    function addLayer(src, customOptions) {
        var kmlLayer = loadLayerOnMap(src, customOptions);
       // google.maps.event.addListener(kmlLayer, 'click', function(event) {
       //     var content = event.featureData.infoWindowHtml;
       //     var testimonial = document.getElementById('capture');
       //     testimonial.innerHTML = content;
       // });
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

        for(var key in customOptions) {
          if (customOptions.hasOwnProperty(key)) {
              defaultOptions[key] = customOptions[key];
          }
        }

        var kmlLayer = new google.maps.KmlLayer(defaultOptions);

        self.kmlLayers.push({
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

    var constructor = function PoiLoader(map, filters, options) {
        if(map === undefined) {
            throw new Error('Google map object must be passed as first parameter.')
        }
        if(filters === undefined) {
            throw new Error('Array of DOM elements containing data-layer-url attribute must be passed as second parameter.')
        }

        self.map = map;
        self.filters = filters;
        self.filterClickCallback = options.filterClickCallback;
        self.onLayerChangeKeepState = options.onLayerChangeKeepState || onLayerChangeKeepState;
        self.showOnLoad = options.showOnLoad || showOnLoad;

        if(options.setEvents === true) {
            setEvents();
        }

        if(self.showOnLoad) {
            loadAll();
        }
    };

    constructor.prototype.loadAll = loadAll;
    constructor.prototype.addLayer = addLayer;
    constructor.prototype.getLayers = getLayers;
    constructor.prototype.loadSingleLayer = loadSingleLayer;
    constructor.prototype.setEvents = setEvents;
    constructor.prototype.removeLayer = removeLayer;
    constructor.prototype.clearPreviousLayers = clearPreviousLayers;

    return constructor;
})();
