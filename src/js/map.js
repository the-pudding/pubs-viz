let pubsMap;
let coordinates = [];
const polyline = require('@mapbox/polyline');

const $madlibMiles = d3.select('#madlib-miles')
const $madlibKilometers = d3.select('#madlib-kilometers')
const formatComma = d3.format(",")

//MAPBOX BUILDS INITIAL MAP
function buildMap() {
	// Initializes mapbox mapbox
	mapboxgl.accessToken =
		'pk.eyJ1IjoiZG9jazQyNDIiLCJhIjoiY2pjazE5eTM2NDl2aDJ3cDUyeDlsb292NiJ9.Jr__XbmAolbLyzPDj7-8kQ';

	pubsMap = new mapboxgl.Map({
		container: 'pubsMap', // container id
		style: 'mapbox://styles/dock4242/cjz1lxn1i17571cpdemlrh3e5', // style URL
		center: [-4.503, 54.385],
		// maxZoom: 18,
		// maxBounds: [[-122.963019,47.303616], [-121.782112, 47.983433]],
		zoom: 6,
		interactive: true
	});

	pubsMap.scrollZoom.disable();
	pubsMap.addControl(new mapboxgl.NavigationControl());
}

//DIRECTIONS API INTO GEOJSON
function directionsToGeoJSON(directions) {
  return {
    type: 'FeatureCollection',
    features: directions.routes.map(route => {
      return {
        type: 'Feature',
        properties: {},
        geometry: typeof route.geometry === 'string' ? polyline.toGeoJSON(route.geometry) : route.geometry,
				distance: route.distance,
				duration: route.duration
      };
    })
  };
}

function updateDistance(geoJSONdirections) {
	let distance = geoJSONdirections.features[0].distance
	let distanceInKilometers = Math.round(distance/1000)
	let distanceInMiles = Math.round(distanceInKilometers*0.62137119223)

	let duration = geoJSONdirections.features[0].duration
	let durationInMins = duration/60
	let durationInHours = durationInMins/60

	$madlibMiles.text(formatComma(distanceInMiles))
	$madlibKilometers.text(formatComma(distanceInKilometers))
}

//LOADS CORRECT FILE
function loadRoute(file) {
  //Creates ID name for map
  let fileSplit = file.split('-')[2]
  fileSplit = fileSplit.split('.')[0]

  //Loads data for route
  return new Promise((resolve, reject) => {
    d3.json(`assets/data/routes/${file}`)
      .then(result => {
        //Gets the ID of the last layer to remove on change
        let lastLayer = pubsMap.getStyle().layers
        lastLayer = lastLayer[lastLayer.length-1].id

        //TODO change to red lion
        if (pubsMap.getLayer('adameve') || pubsMap.getLayer(lastLayer)) {
					console.log(lastLayer)
          pubsMap.removeLayer(lastLayer)
        }

        //Formats directions into geoJSON
        let geoJSONdirections = directionsToGeoJSON(result)

				updateDistance(geoJSONdirections)
        addRoute(geoJSONdirections, fileSplit)
        resolve(result)
      })
      .catch(reject)
  })
}

//TODO FOR ADDING PUB POINTS
function addPubPoints(coordinates) {
	pubsMap.addLayer({
		'id': 'pubs',
		'type': 'circle',
		'source': {
			'type': 'geojson',
			'data': {
				'type': 'FeatureCollection',
				'features': [{
					'geometry': {
						'type': 'Point',
						'coordinates': coordinates[0]
					},
					'properties': {
						'title': 'Mapbox DC'
					}
				}]
			}
		},
		'paint': {
			'circle-radius': 6,
			'circle-color': '#C80E0E',
			'circle-stroke-width': 1,
    	'circle-stroke-color': '#000'
		}
	})
}

//ADDS ROUTE TO MAP
function addRoute(geoJSONdirections, id){

	pubsMap.addLayer({
		'id': id,
		'type': 'line',
		'source': {
			'type': 'geojson',
			'data': geoJSONdirections
		},
		'layout': {
			'line-join': 'round',
			'line-cap': 'round'
		},
		'paint': {
			'line-color': '#C80E0E',
			'line-width': 5
		}
	})
}

function init() {
  buildMap()
  //TODO change to red lion
  loadRoute('result-coordinates-adameve.txt')
}

export default { init, loadRoute };
