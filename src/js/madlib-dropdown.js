const _ = require('lodash');
import loadData from './load-data'
import graphic from './graphic'
import mapbox from './map'

let pubAddressData = null;
let categoryData = null;
const $firstDropdown = d3.selectAll('.first-select')
const $secondDropdown = d3.selectAll('.second-select')

const $nav = d3.selectAll('.nav__choices')
const $selectedNav = $nav.selectAll('.is-selected')
let navClass = $selectedNav.node().className
const $madlibCount = d3.select('#madlib-count')
const $madlibName = d3.select('#madlib-name')
const $madlibBlurb = d3.select('#madlib-blurb')

const sentences = [
	'Bloody good!',
	'Better eat a full English Breakfast!',
	'One pint, two pints, three pints, floor!',
	'You’re going to get pissed!',
	'There goes your liver!'
]

// helper functions
function setStartingDropdown(category) {
	if (category === 'color-noun') {
		$firstDropdown.node().options[27].selected = true
	}
	else if (category === 'royalty-noun') {
		$firstDropdown.node().options[31].selected = true
	}
	else if (category === 'noun-inn') {
		$firstDropdown.node().options[35].selected = true
	}
	else if (category === 'noun-noun') {
		$firstDropdown.node().options[9].selected = true
	}
}

function handleDropdownChange() {
	const dropdownVal = this.value
	const individPubData = categoryData.filter(d => d.pub == dropdownVal)
	buildSentence(individPubData[0])

	const pubName = dropdownVal.toLowerCase()

	graphic.setupItineraryTable(pubAddressData, pubName)
	let strippedName = pubName.replace(/\s/g, '')
	mapbox.loadRoute(`result-coordinates-${strippedName}.txt`)
	mapbox.removeSource()
}

function buildSentence(data) {
	$madlibCount.text(data.count)
	$madlibName.text(data.pub)
	$madlibBlurb.text(function() {
		if (data.count == 10) { return sentences[0] }
		else if (data.count > 10 && data.count < 20) { return sentences[1] }
		else if (data.count > 20 && data.count < 50) { return sentences[2] }
		else if (data.count > 50 && data.count < 100) { return sentences[3] }
		else if (data.count > 100) { return sentences[4] }
	})
}

function buildDropDown(data, category) {


	let sortedData = data.sort(function(a,b) { return d3.descending(b.pub1, a.pub1) })
	sortedData = sortedData.filter(d => d.pub != 'Navigation Inn')
	sortedData = sortedData.filter(d => d.pub != 'Royal Exchange')
	let pushedData = [];
	pushedData.push(sortedData.map(function(obj) { return obj.pub; }).sort())

	pushedData[0].unshift('Pick a pub')

	$firstDropdown.selectAll('option').remove()

	$firstDropdown.selectAll('option')
		.data(pushedData[0])
		.enter()
		.append('option')
		.text(d => d)
		.attr('value', d => d)

	setStartingDropdown(category)
}

function organizeData(data, category) {
	categoryData = data
	buildDropDown(categoryData, category)

	$firstDropdown.on('change', handleDropdownChange)
}


function init(data, category) {
	loadData().then(result => {
		pubAddressData = result[1]
		organizeData(data, category)
	}).catch(console.error)
}

export default { init, buildSentence, setStartingDropdown };
