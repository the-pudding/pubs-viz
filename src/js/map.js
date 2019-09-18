let pubsMap;
let coordinates = [];
const polyline = require('@mapbox/polyline');

// const obj = {
//   "routes": [
//     {
//       "geometry": {
//         "coordinates": [
//           [
//             -122.395435,
//             37.792328
//           ],
//           [
//             -122.395494,
//             37.792281
//           ],
//           [
//             -122.395882,
//             37.792589
//           ],
//           [
//             -122.396061,
//             37.792731
//           ],
//           [
//             -122.396234,
//             37.792898
//           ],
//           [
//             -122.396365,
//             37.793017
//           ],
//           [
//             -122.39639,
//             37.793065
//           ],
//           [
//             -122.396406,
//             37.793103
//           ],
//           [
//             -122.396402,
//             37.793153
//           ],
//           [
//             -122.396375,
//             37.793231
//           ],
//           [
//             -122.39636,
//             37.793276
//           ],
//           [
//             -122.396346,
//             37.793313
//           ],
//           [
//             -122.396319,
//             37.793387
//           ],
//           [
//             -122.396318,
//             37.793462
//           ],
//           [
//             -122.396325,
//             37.793549
//           ],
//           [
//             -122.396351,
//             37.793679
//           ],
//           [
//             -122.396351,
//             37.793682
//           ],
//           [
//             -122.396481,
//             37.793665
//           ],
//           [
//             -122.396552,
//             37.793649
//           ],
//           [
//             -122.397515,
//             37.793527
//           ],
//           [
//             -122.397627,
//             37.793513
//           ],
//           [
//             -122.397626,
//             37.793506
//           ],
//           [
//             -122.397609,
//             37.793422
//           ],
//           [
//             -122.39746,
//             37.792693
//           ],
//           [
//             -122.39745,
//             37.792645
//           ],
//           [
//             -122.397437,
//             37.792586
//           ],
//           [
//             -122.397431,
//             37.792558
//           ],
//           [
//             -122.39741,
//             37.792466
//           ],
//           [
//             -122.397404,
//             37.79244
//           ],
//           [
//             -122.397394,
//             37.792421
//           ],
//           [
//             -122.39738,
//             37.792394
//           ],
//           [
//             -122.397327,
//             37.792341
//           ],
//           [
//             -122.396783,
//             37.791926
//           ],
//           [
//             -122.396701,
//             37.79186
//           ],
//           [
//             -122.396469,
//             37.791674
//           ],
//           [
//             -122.396309,
//             37.791547
//           ],
//           [
//             -122.396198,
//             37.791458
//           ]
//         ],
//         "type": "LineString"
//       },
//       "legs": [
//         {
//           "summary": "",
//           "weight": 361.5,
//           "duration": 201.1,
//           "steps": [],
//           "distance": 582.8
//         }
//       ],
//       "weight_name": "routability",
//       "weight": 361.5,
//       "duration": 201.1,
//       "distance": 582.8
//     }
//   ],
//   "waypoints": [
//     {
//       "distance": 4.377940389715971,
//       "name": "",
//       "location": [
//         -122.395435,
//         37.792328
//       ]
//     },
//     {
//       "distance": 24.984922319971492,
//       "name": "Beale Street",
//       "location": [
//         -122.396198,
//         37.791458
//       ]
//     }
//   ],
//   "code": "Ok",
//   "uuid": "ck0o5tskj1wy23zqk80u0jwdx"
// };
// let testDirections = directionsToGeoJSON(obj)
// function loadTest(directions) {
//   console.log(directions)
//   pubsMap.addLayer({
// 		'id': 'test',
// 		'type': 'line',
// 		'source': {
// 			'type': 'geojson',
// 			'data': directions
// 		},
// 		'layout': {
// 			'line-join': 'round',
// 			'line-cap': 'round'
// 		},
// 		'paint': {
// 			'line-color': 'blue',
// 			'line-width': 5
// 		}
// 	})
// }

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
        geometry: typeof route.geometry === 'string' ? polyline.toGeoJSON(route.geometry) : route.geometry
      };
    })
  };
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
        console.log(lastLayer)

        //TODO change to red lion
        if (pubsMap.getLayer('adameve') || pubsMap.getLayer(lastLayer)) {
          pubsMap.removeLayer(lastLayer)
        }

        //Formats directions into geoJSON
        let geoJSONdirections = directionsToGeoJSON(result)

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
  pubsMap.on('load', function() {
    //loadTest(testDirections)
    //console.log(pubsMap.getLayer('test'))
    console.log(pubsMap.getLayer('adameve'))
  })
}

export default { init, loadRoute };
