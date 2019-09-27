/* global d3 */
import loadData from './load-data'
import madlib from './madlib-dropdown'
import mapbox from './map'
import './pudding-chart/count-table'
import './pudding-chart/itinerary-table'

let pubsMap;
let pubCountsData = null;
let pubCountsTable = null;
let pubAddressData = null;
let pubItineraryTable = null;
let individPubData = [];
let coordinates = [];

const $seeMoreButtonColor = d3.select('#color-noun button')
const $seeMoreButtonRoyalty = d3.select('#royalty-noun button')
const $seeMoreButtonInn = d3.select('#noun-inn button')
const $seeMoreButtonNoun = d3.select('#noun-noun button')
const $seeMoreButtonMap = d3.select('#map-button')
const $allButtons = d3.selectAll('.combo-block button')
const $allFades= d3.selectAll('.combo-block fade')
const $pattern = d3.selectAll('.nav__choices p')
const $combosSection = d3.selectAll('.combos')
const $itineraryTableContainer = d3.selectAll('#map-table .pub-adds')
const $mapTableSection = d3.selectAll('#map-table')

function setupCountTable(data, category) {
	const $countsTableContainer = d3.selectAll(`#${category} .pub-counts`)
	pubCountsTable = $countsTableContainer
		.datum(data)
		.puddingCountTable(category)
}

function setupItineraryTable(data, pubName) {
	pubItineraryTable = $itineraryTableContainer
		.datum(data)
		.puddingItineraryTable(pubName)
}

function stripName(str) {
	let stripped = str.replace(/\s/g, '')
	stripped = stripped.toLowerCase()
	return stripped
}

function filterByPub(data, category) {
	d3.selectAll('.nav__directions img').classed('is-animate', false)
	if (category === 'color-noun') {
		let pubName = 'Red Lion'
		let strippedName = stripName(pubName)
		individPubData = data.filter(d => d.pub == pubName)
		mapbox.loadRoute(`result-coordinates-${strippedName}.txt`)
	} else if (category === 'royalty-noun'){
		let pubName = 'Royal Oak'
		let strippedName = stripName(pubName)
		individPubData = data.filter(d => d.pub == pubName)
		mapbox.loadRoute(`result-coordinates-${strippedName}.txt`)
	} else if (category === 'noun-inn'){
		let pubName = 'Crown Inn'
		let strippedName = stripName(pubName)
		individPubData = data.filter(d => d.pub == pubName)
		mapbox.loadRoute(`result-coordinates-${strippedName}.txt`)
	} else if (category === 'noun-noun'){
		let pubName = 'Fox & Hounds'
		let strippedName = stripName(pubName)
		individPubData = data.filter(d => d.pub == pubName)
		mapbox.loadRoute(`result-coordinates-${strippedName}.txt`)
	}
	madlib.buildSentence(individPubData[0])
	mapbox.removeSource()
}

function handlePickPattern() {
	let $selectedPattern = d3.select(this)
	$pattern.classed('is-selected', false)
	$selectedPattern.classed('is-selected', true)

	let category = $selectedPattern.node().className
	category = category.split('__')[1]
	category = category.split(' ')[0]

	let categoryData = pubCountsData.filter(d => d.category == category)

	filterByPub(categoryData, category)

	madlib.init(categoryData, category)

	if (category == 'color-noun') {
		setupItineraryTable(pubAddressData, 'red lion')
	} else if (category == 'royalty-noun') {
		setupItineraryTable(pubAddressData, 'royal oak')
	} else if (category == 'noun-inn') {
		setupItineraryTable(pubAddressData, 'crown inn')

	} else if (category == 'noun-noun') {
		setupItineraryTable(pubAddressData, 'fox & hounds')
	}
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

function handleMapSeeMore() {
	d3.selectAll('.table__directions img').classed('is-animate', false)
	const currButton = d3.select(this)
	const currButtonClass = currButton.node().className
	//console.log(currButtonClass)

	if (currButtonClass == 'open') {
		currButton.classed('open', false)
		currButton.classed('collapse', true)
		d3.select(this).text('See fewer')
		d3.select('.pub-adds').classed('is-visible', true)
		d3.select('.pub-adds .fade').classed('is-visible', false)
	}

	if (currButtonClass == 'collapse') {
		currButton.classed('collapse', false)
		currButton.classed('open', true)
		d3.select(this).text('See all')
		d3.select('.pub-adds').classed('is-visible', false)
		d3.select('.pub-adds .fade').classed('is-visible', true)
		jumpTo($mapTableSection.node())
	}
}

function resize() {}

function init() {

	loadData().then(result => {
		// organize data
		pubCountsData = result[0]
		pubAddressData = result[1]
		coordinates = result[2]
		let startingData = pubCountsData.filter(d => d.category == 'color-noun')

		madlib.init(startingData, 'color-noun')

		setupCountTable(pubCountsData, 'color-noun')
		setupCountTable(pubCountsData, 'royalty-noun')
		setupCountTable(pubCountsData, 'noun-inn')
		setupCountTable(pubCountsData, 'noun-noun')
		setupItineraryTable(pubAddressData, 'red lion')

		//buildMap()

		mapbox.init()

		$seeMoreButtonColor.on('click', handleSeeMore)
		$seeMoreButtonRoyalty.on('click', handleSeeMore)
		$seeMoreButtonInn.on('click', handleSeeMore)
		$seeMoreButtonNoun.on('click', handleSeeMore)
		$seeMoreButtonMap.on('click', handleMapSeeMore)
		$pattern.on('click', handlePickPattern)
	}).catch(console.error)

}

export default { init, resize, setupItineraryTable };
