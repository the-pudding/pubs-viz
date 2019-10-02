let pubsMap;
let coordinates = [];
const polyline = require('@mapbox/polyline');

const $madlibMiles = d3.select('#madlib-miles')
const $madlibKilometers = d3.select('#madlib-kilometers')
const formatComma = d3.format(",")
let popup = new mapboxgl.Popup({
	closeButton: false,
	closeOnClick: false
})

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

function removeSource() {
	let lastRouteLayer = pubsMap.getStyle().layers
	lastRouteLayer = lastRouteLayer[lastRouteLayer.length-2].id

	let lastDotLayer = pubsMap.getStyle().layers
	lastDotLayer = lastDotLayer[lastDotLayer.length-1].id

	if (lastRouteLayer.includes('route')) {
		pubsMap.removeLayer(lastRouteLayer)
		pubsMap.removeSource(lastRouteLayer)
	}
	if (lastDotLayer.includes('dots')) {
		pubsMap.removeLayer(lastDotLayer)
		pubsMap.removeSource(lastDotLayer)
	}
}

//LOADS CORRECT FILE
function loadRoute(file) {
  //Creates ID name for map
  let fileSplit = file.split('-')[2]
  fileSplit = fileSplit.split('.')[0]
	let routeID = `${fileSplit}-route`
	let dotID = `${fileSplit}-dots`

  //Loads data for route
  return new Promise((resolve, reject) => {
    d3.json(`assets/data/routes/${file}`)
      .then(result => {

        //Formats directions into geoJSON
        let geoJSONdirections = directionsToGeoJSON(result)

				updateDistance(geoJSONdirections)
        addRoute(geoJSONdirections, routeID)
				addPubPoints(fileSplit, dotID)

				pubsMap.on('mouseenter', dotID, function(e) {
					pubsMap.getCanvas().style.cursor = 'pointer'

					let coordinates = e.features[0].geometry.coordinates.slice();
					let title = e.features[0].properties.title;

					// Ensure that if the map is zoomed out such that multiple
					// copies of the feature are visible, the popup appears
					// over the copy being pointed to.
					while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
						coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
					}

					// Populate the popup and set its coordinates
					// based on the feature found.
					popup.setLngLat(coordinates)
						.setHTML(title)
						.addTo(pubsMap);
				})

				pubsMap.on('mouseleave', dotID, function() {
					pubsMap.getCanvas().style.cursor = '';
					popup.remove();
				})

        resolve(result)
      })
      .catch(reject)
  })
}

function addPubPoints(fileSplit, dotID) {
	return new Promise((resolve, reject) => {
		d3.json(`assets/data/dots/${fileSplit}.json`)
			.then(result => {

				pubsMap.addLayer({
					'id': dotID,
					'type': 'circle',
					'source': {
						'type': 'geojson',
						'data': {
							'type': 'FeatureCollection',
							'features': result
						}
					},
					'paint': {
						'circle-radius': 4,
						'circle-color': '#252322',
						'circle-stroke-width': 2,
						'circle-stroke-color': '#D4BCAF'
					}
				})

				resolve(result)
			})
			.catch(reject)
	})
}

//ADDS ROUTE TO MAP
function addRoute(geoJSONdirections, routeID){

	pubsMap.addLayer({
		'id': routeID,
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
			'line-opacity': 0.8,
			'line-width': 3
		}
	})
}

function init() {
  buildMap()
  loadRoute('result-coordinates-redlion.txt')
}

export default { init, loadRoute, removeSource };
