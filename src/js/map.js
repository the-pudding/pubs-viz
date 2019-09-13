let pubsMap;
let coordinates = [];

function loadRoute(file) {
  let fileSplit = file.split('-')[2]
  fileSplit = fileSplit.split('.')[0]
  return new Promise((resolve, reject) => {
    d3.json(`assets/data/routes/${file}`)
      .then(result => {
        let cleanRoute = result.routes[0].geometry.coordinates

        let lastLayer = pubsMap.getStyle().layers
        lastLayer = lastLayer[lastLayer.length-1].id

        if (pubsMap.getLayer('adameve') || pubsMap.getLayer(lastLayer)) {
          pubsMap.removeLayer(lastLayer)
        }

        let geojson = {
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'LineString',
            coordinates: cleanRoute
          }
        }

        addRoute(cleanRoute, fileSplit)
        resolve(cleanRoute)
      })
      .catch(reject)
  })
}

//MAPBOX
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

function addRoute(coordinates, id){

	pubsMap.addLayer({
		'id': id,
		'type': 'line',
		'source': {
			'type': 'geojson',
			'data': {
				'type': 'Feature',
				'properties':{},
				'geometry': {
					'type': 'LineString',
					'coordinates': coordinates
				}
			}
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
  //   .then(result => {
  //     console.log(result)
  //     let cleanRoute = result.routes[0].geometry.coordinates
  //     console.log(cleanRoute)
  //     pubsMap.on('load', function(){
  //       addRoute(cleanRoute)
  //       //addPubPoints(coordinates)
  //   })
  // })
}

export default { init, loadRoute };
