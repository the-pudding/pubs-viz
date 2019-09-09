/* global d3 */
import loadData from './load-data'
import madlib from './madlib-dropdown'
import './pudding-chart/count-table'

let pubsMap;
let pubCountsData = null;
let pubCountsTable = null;
let coordinates = [
	[-122.48369693756104, 37.83381888486939],
	[-122.48348236083984, 37.83317489144141],
	[-122.48339653015138, 37.83270036637107],
	[-122.48356819152832, 37.832056363179625],
	[-122.48404026031496, 37.83114119107971],
	[-122.48404026031496, 37.83049717427869],
	[-122.48348236083984, 37.829920943955045],
	[-122.48356819152832, 37.82954808664175],
	[-122.48507022857666, 37.82944639795659],
	[-122.48610019683838, 37.82880236636284],
	[-122.48695850372314, 37.82931081282506],
	[-122.48700141906738, 37.83080223556934],
	[-122.48751640319824, 37.83168351665737],
	[-122.48803138732912, 37.832158048267786],
	[-122.48888969421387, 37.83297152392784],
	[-122.48987674713133, 37.83263257682617],
	[-122.49043464660643, 37.832937629287755],
	[-122.49125003814696, 37.832429207817725],
	[-122.49163627624512, 37.832564787218985],
	[-122.49223709106445, 37.83337825839438],
	[-122.49378204345702, 37.83368330777276]
]

const $seeMoreButtonColor = d3.select('#color-noun button')
const $seeMoreButtonRoyalty = d3.select('#royalty-noun button')
const $seeMoreButtonInn = d3.select('#noun-inn button')
const $seeMoreButtonNoun = d3.select('#noun-noun button')
const $allButtons = d3.selectAll('.combo-block button')
const $allFades= d3.selectAll('.combo-block fade')
const $pattern = d3.selectAll('.nav__choices p')
const $combosSection = d3.selectAll('.combos')

function setupCountTable(data, category) {
	const $countsTableContainer = d3.selectAll(`#${category} .pub-counts`)
	pubCountsTable = $countsTableContainer
		.datum(data)
		.puddingCountTable(category)
}

function handlePickPattern() {
	let $selectedPattern = d3.select(this)
	$pattern.classed('is-selected', false)
	$selectedPattern.classed('is-selected', true)

	madlib.init(pubCountsData)
}

function jumpTo(element) {
	window.scroll({
		behavior: 'auto',
		left: 0,
		top: element.offsetTop - 48
	});
}

function handleSeeMore() {
	const category = this.parentElement.id

	const currButton = d3.select(this)
	const currButtonClass = currButton.node().className
	const categoryTable = d3.select(`#${category} .pub-counts`)

	if (currButtonClass == 'open') {
		currButton.classed('open', false)
		currButton.classed('collapse', true)
		d3.select(this).text('See fewer')
		d3.select(`#${category} .fade`).classed('is-visible', false)
		categoryTable.classed('is-visible', true)
	}

	if (currButtonClass == 'collapse') {
		currButton.classed('collapse', false)
		currButton.classed('open', true)
		d3.select(this).text('See all')
		d3.select(`#${category} .fade`).classed('is-visible', true)
		categoryTable.classed('is-visible', false)
		jumpTo($combosSection.node())
	}
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

	pubsMap.on('load', function(){
		addRoute(coordinates)
		addPubPoints(coordinates)
	})
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

function addRoute(coordinates){

	pubsMap.addLayer({
		'id': 'route',
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
			'line-width': 8
		}
	})
}

function resize() {}

function init() {

	loadData().then(result => {
		// organize data
		pubCountsData = result[0]

		madlib.init(pubCountsData)

		setupCountTable(pubCountsData, 'color-noun')
		setupCountTable(pubCountsData, 'royalty-noun')
		setupCountTable(pubCountsData, 'noun-inn')
		setupCountTable(pubCountsData, 'noun-noun')

		buildMap()

		$seeMoreButtonColor.on('click', handleSeeMore)
		$seeMoreButtonRoyalty.on('click', handleSeeMore)
		$seeMoreButtonInn.on('click', handleSeeMore)
		$seeMoreButtonNoun.on('click', handleSeeMore)
		$pattern.on('click', handlePickPattern)
	}).catch(console.error)

}

export default { init, resize };
