// import mapboxgl from 'mapbox-gl';
import 'intersection-observer';
import scrollama from 'scrollama';
import debounce from 'debounce';
// D3 is included by globally by default

let openerMap;

const $content = d3.select('#content');
// SCROLLAMA
const container = d3.select('#scroll');
const graphic = container.select('.scroll__graphic');
const map = graphic.select('#scrollMap');
const text = container.select('.scroll__text');
const step = text.selectAll('.step');
// initialize the scrollama
const scroller = scrollama();

const scrollerCity = scrollama();

// DIST CHART
const chartContainer = d3.select('#dist-chart');
const chartSvg = d3.select('.dist-chart-svg');

function resizeCharts() {
	// Margins and dimensions
	const margin = { top: 20, right: 0, bottom: 20, left: 0 };

	const containerWidth = d3.select('#dist-chart').node().offsetWidth;
	const width = containerWidth - margin.left - margin.right;
	const height = 90 - margin.top - margin.bottom;

	// Creates the scales
	const xScale = d3
		.scaleLinear()
		.range([0, width])
		.domain([0, 50]);
	// Axes
	const xAxis = d3
		.axisBottom()
		.scale(xScale)
		.tickPadding(0)
		.ticks(5);

	d3.selectAll('.dist-chart-svg')
		.at('width', width + margin.left + margin.right)
		.at('height', height + margin.top + margin.bottom);

	const g = d3.selectAll('.g-vis');
	g.at('transform', `translate(${margin.left}, ${margin.top})`);

	g.selectAll('.bgRect')
		.at('width', width)
		.at('height', height);

	// .label.less
	g.selectAll('.label.less')
		.at('x', 0)
		.at('y', height + margin.bottom - 5);

	g.selectAll('.label.more')
		.at('x', width)
		.at('y', height + margin.bottom - 5);

	g.selectAll('.top-zips')
		.at('x', width - 5)
		.at('y', -5);

	g.selectAll('.top-zips-f')
		.at('x', width/4)
		.at('y', height + margin.bottom - 5);

	g.selectAll('.axis.x')
		.at('transform', `translate(0,${height})`)
		.call(xAxis);

	g.selectAll('.percentline')
		.at('x1', d => xScale(d.index))
		.at('x2', d => xScale(d.index));
}

// generic window resize listener event
function handleResize() {
	// 1. update height of step elements
	const stepHeight = Math.floor(window.innerHeight * 0.85);
	step.style('height', `${stepHeight}px`);

	step
		.filter((d, i) => i === 0)
		.style('margin-top', `-${window.innerHeight}px`);
	// 2. update width/height of graphic element
	const bodyWidth = d3.select('body').node().offsetWidth;
	const textWidth = text.node().offsetWidth;
	const graphicWidth = bodyWidth;
	graphic
		.style('width', `${graphicWidth}px`)
		.style('height', `${window.innerHeight}px`);
	// var mapMargin = 32;
	const mapWidth = graphic.node().offsetWidth;
	map
		.style('width', `${mapWidth}px`)
		.style('height', `${window.innerHeight}px`);
	// 3. tell scrollama to update new element dimensions

	resizeCharts();

	scroller.resize();
}
// scrollama event handlers
function renderStep(index) {
	if (index === 0) {
		openerMap.setPaintProperty('gayborhood-index', 'fill-opacity', 0);
		openerMap.setPaintProperty('gayborhood-index-MM', 'fill-opacity', 0);
		openerMap.setPaintProperty('gayborhood-index-FF', 'fill-opacity', 0);
		openerMap.setPaintProperty('paradeRoute', 'line-opacity', 1);
		openerMap.setPaintProperty('gay-bars', 'circle-opacity', 0);
		openerMap.setPaintProperty('gay-bars', 'circle-stroke-opacity', 0);
	}

	if (index === 1) {
		openerMap.setPaintProperty('gayborhood-index', 'fill-opacity', 0);
		openerMap.setPaintProperty('gayborhood-index-MM', 'fill-opacity', 0);
		openerMap.setPaintProperty('gayborhood-index-FF', 'fill-opacity', 0);
		openerMap.setPaintProperty('paradeRoute', 'line-opacity', 1);
		openerMap.setPaintProperty('gay-bars', 'circle-opacity', 0.7);
		openerMap.setPaintProperty('gay-bars', 'circle-stroke-opacity', 0.7);
	}

	if (index === 2) {
		openerMap.setPaintProperty('gayborhood-index', 'fill-opacity', 0.5);
		openerMap.setPaintProperty('gayborhood-index-MM', 'fill-opacity', 0);
		openerMap.setPaintProperty('gayborhood-index-FF', 'fill-opacity', 0);
		openerMap.setPaintProperty('paradeRoute', 'line-opacity', 1);
		openerMap.setPaintProperty('gay-bars', 'circle-opacity', 0.7);
		openerMap.setPaintProperty('gay-bars', 'circle-stroke-opacity', 0.7);
	}

	if (index === 3) {
		openerMap.setPaintProperty('gayborhood-index', 'fill-opacity', 0);
		openerMap.setPaintProperty('gayborhood-index-MM', 'fill-opacity', 0.5);
		openerMap.setPaintProperty('gayborhood-index-FF', 'fill-opacity', 0);
		openerMap.setPaintProperty('paradeRoute', 'line-opacity', 1);
		openerMap.setPaintProperty('gay-bars', 'circle-opacity', 0.7);
		openerMap.setPaintProperty('gay-bars', 'circle-stroke-opacity', 0.7);
	}

	if (index === 4) {
		openerMap.setPaintProperty('gayborhood-index', 'fill-opacity', 0);
		openerMap.setPaintProperty('gayborhood-index-MM', 'fill-opacity', 0);
		openerMap.setPaintProperty('gayborhood-index-FF', 'fill-opacity', 0.5);
		openerMap.setPaintProperty('paradeRoute', 'line-opacity', 1);
		openerMap.setPaintProperty('gay-bars', 'circle-opacity', 0.7);
		openerMap.setPaintProperty('gay-bars', 'circle-stroke-opacity', 0.7);
	}
}

function handleStepEnterCity({ index, element }) {
	const city = d3
		.select(element)
		.select('.city-hed')
		.text()
		.trim();
	d3.select('#city-select')
		.selectAll('option')
		.prop('selected', (d, i, n) => {
			const option = d3.select(n[i]);
			const text = option.text().trim();
			return city === text;
		});
}

function handleStepExitCity({ index, element, direction }) {
	if (index === 0 && direction === 'up')
		d3.select('#city-select')
			.selectAll('option')
			.prop('selected', (d, i) => i === 0);
}

function handleStepEnter(response) {
	// response = { element, direction, index }
	step.classed('is-active', (d, i) => i === response.index);

	renderStep(response.index);

	// update graphic based on step
	map.select('p').text(response.index + 1);
}

function setupStickyfill() {
	d3.selectAll('.sticky').each(function() {
		Stickyfill.add(this);
	});
}

// MAPBOX
function buildMap() {
	// Initializes mapbox mapbox
	mapboxgl.accessToken =
		'pk.eyJ1IjoiamFkaWVobSIsImEiOiIzTjRUSFZjIn0.sed_QtqpB7m5yFLmK2VV9g';

	openerMap = new mapboxgl.Map({
		container: 'scrollMap', // container id
		style: 'mapbox://styles/jadiehm/cji3f7z4n13s52rmz42onwmkx', // style URL
		center: [-73.980539, 40.715444],
		// maxZoom: 18,
		// maxBounds: [[-122.963019,47.303616], [-121.782112, 47.983433]],
		zoom: 11,
		interactive: false
	});

	openerMap.scrollZoom.disable();

	openerMap.on('load', () => {
		// Adds layers below labels
		const layers = openerMap.getStyle().layers;
		// Find the index of the first symbol layer in the map style
		let firstSymbolId;
		for (let i = 0; i < layers.length; i++) {
			if (layers[i].type === 'symbol') {
				firstSymbolId = layers[i].id;
				break;
			}
		}
		// Adds overall gayborhood index
		openerMap.addLayer(
			{
				id: 'gayborhood-index',
				source: {
					type: 'vector',
					url: 'mapbox://jadiehm.indexJoined'
				},
				layout: {
					visibility: 'visible'
				},
				'source-layer': 'original',
				type: 'fill',
				filter: ['has', 'ZIPS_Ind_8'],
				paint: {
					'fill-color': [
						'interpolate',
						['linear'],
						['get', 'ZIPS_Ind_8'],
						0,
						'#f6f6f6',
						4,
						'#ffb993',
						10,
						'#ff9f6e',
						20,
						'#fb8548',
						30,
						'#f36c21'
					],
					'fill-opacity': 0.5
				}
			},
			firstSymbolId
		);
		// Adds MM gayborhood index
		openerMap.addLayer(
			{
				id: 'gayborhood-index-MM',
				source: {
					type: 'vector',
					url: 'mapbox://jadiehm.indexJoined'
				},
				layout: {
					visibility: 'visible'
				},
				'source-layer': 'original',
				type: 'fill',
				filter: ['has', 'ZIPS_Ind_7'],
				paint: {
					'fill-color': [
						'interpolate',
						['linear'],
						['get', 'ZIPS_Ind_7'],
						0,
						'#f6f6f6',
						4,
						'#dcc4ff',
						10,
						'#7776b6',
						20,
						'#5457a4',
						30,
						'#273a92'
					],
					'fill-opacity': 0.5
				}
			},
			firstSymbolId
		);
		// Adds FF gayborhood index
		openerMap.addLayer(
			{
				id: 'gayborhood-index-FF',
				source: {
					type: 'vector',
					url: 'mapbox://jadiehm.indexJoined'
				},
				layout: {
					visibility: 'visible'
				},
				'source-layer': 'original',
				type: 'fill',
				filter: ['has', 'ZIPS_Ind_6'],
				paint: {
					'fill-color': [
						'interpolate',
						['linear'],
						['get', 'ZIPS_Ind_6'],
						0,
						'#f6f6f6',
						4,
						'#dcc4ff',
						10,
						'#7776b6',
						20,
						'#5457a4',
						30,
						'#273a92'
					],
					'fill-opacity': 0.5
				}
			},
			firstSymbolId
		);
		// Adds gay bar points
		openerMap.addLayer(
			{
				id: 'gay-bars',
				type: 'circle',
				source: {
					type: 'vector',
					url: 'mapbox://jadiehm.2zsul8ff'
				},
				layout: {
					visibility: 'visible'
				},
				paint: {
					'circle-radius': 3,
					'circle-color': 'rgba(1,1,1, 0.7)',
					'circle-stroke-color': '#ffffff',
					'circle-stroke-width': 1
				},
				'source-layer': 'gaybarsMOD-575puu'
			},
			firstSymbolId
		);
		// Adds parade route
		openerMap.addLayer(
			{
				id: 'paradeRoute',
				type: 'line',
				source: {
					type: 'vector',
					url: 'mapbox://jadiehm.b4vpcbja'
				},
				layout: {
					visibility: 'visible',
					'line-join': 'round',
					'line-cap': 'round'
				},
				paint: {
					'line-color': '#262626',
					'line-width': 2,
					'line-opacity': 1
				},
				'source-layer': 'Parade_routes'
			},
			firstSymbolId
		);

		truncatePage(false);
	});
}

// DROPDOWN SCROLL
function scrollTo(element) {
	window.scroll({
		behavior: 'smooth',
		left: 0,
		top: element.offsetTop - 50
	});
}

function citySelection() {
    const { value } = this;
    const el = d3.select(`#${value}-link`).node();
    scrollTo(el);
}

function renderChart({ indexType, chartIndex, data }) {
	// console.log({ indexType, chartIndex, data });
	const individualChart = chartContainer.append('div.g-chart-container');

	// Finds the data associated with each index
	const currentIndex = indexType;
	const filteredDataZero = data.filter(d => d.index > 0);
	const currentIndexData = filteredDataZero.filter(d => d.indexType === currentIndex);
	// Appends the property name to the individual chart container
	const chartName = individualChart
		.append('h5')
		.attr('class', 'g-name')
		.text(currentIndex);
	// Appends the index chart to the individual chart container
	const chart = individualChart.append('div').attr('class', 'g-chart');
	// Appends the svg to the chart-container div
	const g = chart.append('svg.dist-chart-svg').append('g.g-vis');

	// background
	const bgRect = g
		.append('rect.bgRect')
		.attr('x', 0)
		.attr('y', 0);

	// Add annotations
	if (chartIndex === 1) {
		g.append('text')
			.text('Less certain')
			.attr('class', 'label less');

		g.append('text')
			.text('More certain')
			.attr('class', 'label more');

		g.append('text')
			.text('Castro (CA), 94114')
			.attr('class', 'top-zips');
	}
	if(chartIndex === 0) {
		g.append('text')
			.text('Jamaica Plain (MA), 02130')
			.attr('class', 'top-zips-f');
	}
	// Draw Axes
	const xAxisGroup = g.append('g').attr('class', 'x axis');

	// Strips
	const strips = g
		.selectAll('line.percentline')
		.data(currentIndexData)
		.enter()
		.append('line')
		.attr('class', 'percentline')
		.classed('top-value-m', function(d) { return d.zipcode == '94114' && d.indexType == 'Same-sex male' })
		.classed('top-value-f', function(d) { return d.zipcode == '02130' && d.indexType == 'Same-sex female' })
		.attr('y1', 0)
		.attr('y2', 50);
}

function buildDistChart(err, data) {
	if (err) throw 'error loading data';
	data.forEach(d => {
		d.index = +d.index;
	});
	let indexType = ['Same-sex female', 'Same-sex male'];
	indexType = d3.set(data.map(d => d.indexType)).values();

	indexType.forEach((indexType, i) =>
		renderChart({ indexType, chartIndex: i, data })
	);

	resizeCharts();
	// d3.selectAll('.g-chart-container').data(indexType).enter().append('div.g-chart-container')
}

function resize() {
	handleResize();
	resizeCharts();
}

function truncatePage(truncate) {
	const heightContent = truncate
		? $content.select('.intro').node().offsetHeight
		: 'auto';
	d3.selectAll('.loading-wrapper').classed('is-truncated', truncate);
	d3.selectAll('.arrow').classed('is-truncated', truncate);
	$content.st('height', heightContent).classed('is-truncated', truncate);
	d3.selectAll('.loading-text').classed('is-truncated', truncate);

	if (!truncate) {
		openerMap.setPaintProperty('gayborhood-index', 'fill-opacity', 0);
		openerMap.setPaintProperty('gayborhood-index-MM', 'fill-opacity', 0);
		openerMap.setPaintProperty('gayborhood-index-FF', 'fill-opacity', 0);
		openerMap.setPaintProperty('paradeRoute', 'line-opacity', 0);
		openerMap.setPaintProperty('gay-bars', 'circle-opacity', 0);
		openerMap.setPaintProperty('gay-bars', 'circle-stroke-opacity', 0);
	}
}

function init() {
	d3.csv('assets/data/IndexCitiesCSV.csv', buildDistChart);

	truncatePage(true);
	// 1. force a resize on load to ensure proper dimensions are sent to scrollama
	handleResize();
	// 2. setup the scroller passing options
	// this will also initialize trigger observations
	// 3. bind scrollama event handlers (this can be chained like below)
	scroller
		.setup({
			step: '.scroll__text .step',
			debug: false
		})
		.onStepEnter(handleStepEnter);

	scrollerCity
		.setup({
			step: '.city-wrapper',
			offset: 0.1
		})
		.onStepEnter(handleStepEnterCity)
		.onStepExit(handleStepExitCity);

	buildMap();
	d3.select('#city-select').on('change', citySelection);
}

export default { init, resize };
