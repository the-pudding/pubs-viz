let categoryData = null;
const $firstDropdown = d3.selectAll('.first-select')
const $secondDropdown = d3.selectAll('.second-select')

// helper functions
function buildDropDown(data) {
	data = data.sort(function(a,b) { return d3.descending(b.pub, a.pub) })

	$firstDropdown.selectAll('option')
		.data(data)
		.enter()
		.append('option')
		.text(d => d.pub)
		.attr('value', d => d.pub)
}

function organizeData(data) {
	let $nav = d3.selectAll('.nav__choices')
	let $selectedNav = $nav.selectAll('.is-selected')
	let navClass = $selectedNav.node().className
	navClass = navClass.split(' ')[0]
	navClass = navClass.slice(5)
	categoryData = data.filter(d => d.category == navClass)

	buildDropDown(categoryData)
}


function init(data) {
	organizeData(data)
}

export default { init };
