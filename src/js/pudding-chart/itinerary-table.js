/*
 USAGE (example: line chart)
 1. c+p this template to a new file (line.js)
 2. change puddingChartName to puddingChartLine
 3. in graphic file: import './pudding-chart/line'
 4a. const charts = d3.selectAll('.thing').data(data).puddingChartLine();
 4b. const chart = d3.select('.thing').datum(datum).puddingChartLine();
*/

d3.selection.prototype.puddingItineraryTable = function init(pubName) {
	function createChart(el) {
		const $sel = d3.select(el);
		let data = $sel.datum();
		let individAddData = [];

		// dom elements
		let $vis = null;
		const nameSpan = d3.selectAll('#madlib-name').text().toLowerCase()

		// helper functions
		function stripSpaces(str) {
			let noSpaces = str.replace(/\s/g, '');
			noSpaces = noSpaces.replace(/&/g, '')
			return noSpaces
		}

		function splitName(str) {
			let split = str.split(',')[0]
			return split
		}

		function splitAdd(str) {
			let split = str.substring(str.indexOf(',')+1)
			return split
		}

		function linkClick(){
			const link = this.getAttribute('href')
			window.location = link
		}

		function filterData() {
			individAddData = data.filter(d => d.key == nameSpan)
		}

		const Chart = {
			// called once at start
			init() {

				filterData()

				d3.selectAll('.table-link').remove()

				$vis = $sel.append('div').attr('class', 'g-vis');

				const tableRow = $vis
					.selectAll('.pub')
					.data(individAddData[0].values)
					.enter()
					.append('a')
					.attr('xlink:href', d => `https://www.pubsgalore.co.uk/pubs/${d.pubID}/`)
					.attr('class', 'table-link')
					.on('click', linkClick)

				const tableDiv = tableRow
					.append('div')
					.attr('class', 'table-row')

				const nameDiv = tableDiv
						.append('div')
						.attr('class', 'inset-div')

				const pubNum = nameDiv
					.append('p')
					.text(function(d, i) { return i + 1 })
					.attr('class', 'table-pub-num')

				const pubName = nameDiv
					.append('p')
					.attr('class', 'table-pub-name')
					.text(d => splitName(d.pubName))

				const pubAdd = tableDiv
					.append('p')
					.text(d => splitAdd(d.address))
					.attr('class', 'table-pub-count')

				if (individAddData[0].values.length == 10) {
					d3.select('#map-button').classed('is-hidden', true)
					d3.select('#map-table .fade').classed('is-hidden', true)
				} else {
					d3.select('#map-button').classed('is-hidden', false)
					d3.select('#map-table .fade').classed('is-hidden', false)
				}

				Chart.resize();
				Chart.render();
			},
			// on resize, update new dimensions
			resize() {
				// defaults to grabbing dimensions from container element
				return Chart;
			},
			// update scales and render chart
			render() {
				return Chart;
			},
			// get / set data
			data(val) {
				if (!arguments.length) return data;
				data = val;
				$sel.datum(data);
				Chart.render();
				return Chart;
			}
		};
		Chart.init();

		return Chart;
	}

	// create charts
	const charts = this.nodes().map(createChart);
	return charts.length > 1 ? charts : charts.pop();
};
