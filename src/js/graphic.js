/* global d3 */
import loadData from './load-data'
import './pudding-chart/count-table'

let pubsMap;
let pubCountsData = null;
let pubCountsTable = null;

const $seeMoreButtonColor = d3.select('#color-noun button')
const $seeMoreButtonRoyalty = d3.select('#royalty-noun button')
const $seeMoreButtonInn = d3.select('#noun-inn button')
const $seeMoreButtonNoun = d3.select('#noun-noun button')
const $allButtons = d3.selectAll('.combo-block button')
const $allFades= d3.selectAll('.combo-block fade')
const $pattern = d3.selectAll('.nav__choices p')

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
	}

	//$allButtons.classed('is-visible', true)
	//$allButtons.text('See all')
	//
	//d3.select(`#${category} .fade`).classed('is-visible', false)

	// const categoryTable = d3.select(`#${category} .pub-counts`)
	// //d3.selectAll('.pub-counts').classed('is-visible', false)
	// categoryTable.classed('is-visible', true)
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
function resize() {}

function init() {

	loadData().then(result => {
		// organize data
		pubCountsData = result[0]

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
