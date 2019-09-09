const _ = require('lodash');

let categoryData = null;
const $firstDropdown = d3.selectAll('.first-select')
const $secondDropdown = d3.selectAll('.second-select')

const $nav = d3.selectAll('.nav__choices')
const $selectedNav = $nav.selectAll('.is-selected')
let navClass = $selectedNav.node().className

// helper functions
function splitNames1(str) {
	let splt = str.substr(0,str.indexOf(' '))
	return splt
}

function splitNames2(str) {
	let splt = str.substr(str.indexOf(' '), str.length)
	return splt
}

function setStartingDropdown() {
	$firstDropdown.node().options[8].selected = true
	$secondDropdown.node().options[21].selected = true
}

function handleDropdownChange() {
	const $dropdownClass = this.className
	if ($dropdownClass === 'first-select') {
		const firstVal = this.value
		const secondVal = ($secondDropdown.node()).options[($secondDropdown.node()).selectedIndex].value
		$secondDropdown.node().options[0].selected = true
		$secondDropdown.classed('needSelect', true)
	}
	if ($dropdownClass === 'second-select') {
		const firstVal = ($firstDropdown.node()).options[($firstDropdown.node()).selectedIndex].value
		const secondVal = this.value
		console.log(firstVal, secondVal)
		$firstDropdown.node().options[0].selected = true
		$firstDropdown.classed('needSelect', true)
	}
}

function buildDropDown(data, category) {

	let splitData = data.map(d => ({
		...d,
		pub1: splitNames1(d.pub),
		pub2: splitNames2(d.pub),
	}))

	let splitData1 = splitData.sort(function(a,b) { return d3.descending(b.pub1, a.pub1) })
	let splitData2 = splitData.sort(function(a,b) { return d3.descending(b.pub2, a.pub2) })
	let uniqSplit1 = _.uniqBy(splitData1, 'pub1')
	let uniqSplit2 = _.uniqBy(splitData2, 'pub2')
	let uniqData1 = [];
	uniqData1.push(uniqSplit1.map(function(obj) { return obj.pub1; }).sort())
	//uniqData1 = uniqData1[0].unshift('Color')
	let uniqData2 = [];
	uniqData2.push(uniqSplit2.map(function(obj) { return (obj.pub2).trim(); }).sort())

	let cat1 = category.split('-')[0]
	let cat2 = category.split('-')[1]

	uniqData1[0].unshift(cat1)
	uniqData2[0].unshift(cat2)

	$firstDropdown.selectAll('option')
		.data(uniqData1[0])
		.enter()
		.append('option')
		.text(d => d)
		.attr('value', d => d)

	$secondDropdown.selectAll('option')
		.data(uniqData2[0])
		.enter()
		.append('option')
		.text(d => d)
		.attr('value', d => d)

	setStartingDropdown()
}

function organizeData(data) {
	navClass = navClass.split(' ')[0]
	navClass = navClass.slice(5)
	categoryData = data.filter(d => d.category == navClass)

	buildDropDown(categoryData, navClass)

	$firstDropdown.on('change', handleDropdownChange)
	$secondDropdown.on('change', handleDropdownChange)
}


function init(data) {
	organizeData(data)
}

export default { init };
