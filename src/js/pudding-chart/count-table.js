/*
 USAGE (example: line chart)
 1. c+p this template to a new file (line.js)
 2. change puddingChartName to puddingChartLine
 3. in graphic file: import './pudding-chart/line'
 4a. const charts = d3.selectAll('.thing').data(data).puddingChartLine();
 4b. const chart = d3.select('.thing').datum(datum).puddingChartLine();
*/

d3.selection.prototype.puddingCountTable = function init(category) {
	function createChart(el) {
		const $sel = d3.select(el);
		let data = $sel.datum();

		let categoryData = null;

		// dom elements
		let $vis = null;

		// helper functions
		function organizeData(category) {
			categoryData = data.filter(d => d.category == category)
		}

		const Chart = {
			// called once at start
			init() {

				organizeData(category)

				const totalCount = categoryData.length

				const totalSpan = d3.select(`#${category} .pattern-count`)
				totalSpan.text(totalCount)

				$vis = $sel.append('div').attr('class', 'g-vis');

				const tableRow = $vis
					.selectAll('.pub')
					.data(categoryData)
					.enter()
					.append('div')
					.attr('class', 'table-row')

				const pubName = tableRow
					.append('p')
					.text(d => d.pub)
					.attr('class', 'table-pub-name')

				const pubCount = tableRow
					.append('p')
					.text(d => d.count)
					.attr('class', 'table-pub-count')

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
