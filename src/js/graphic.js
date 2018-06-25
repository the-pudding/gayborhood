//import mapboxgl from 'mapbox-gl';
import 'intersection-observer'
import scrollama from 'scrollama';
import debounce from 'debounce'
// D3 is included by globally by default

var openerMap;

const $content = d3.select('#content')
//SCROLLAMA
var container = d3.select('#scroll');
var graphic = container.select('.scroll__graphic');
var map = graphic.select('#scrollMap');
var text = container.select('.scroll__text');
var step = text.selectAll('.step');
// initialize the scrollama
var scroller = scrollama();

const scrollerCity = scrollama();

// generic window resize listener event
function handleResize() {
	// 1. update height of step elements
	var stepHeight = Math.floor(window.innerHeight * 0.75);
	step.style('height', `${stepHeight}px`)

	step.filter((d,i) => i === 0)
		.style('margin-top', `-${window.innerHeight}px`)
	// 2. update width/height of graphic element
	var bodyWidth = d3.select('body').node().offsetWidth;
	var textWidth = text.node().offsetWidth;
	var graphicWidth = bodyWidth;
	graphic
		.style('width', graphicWidth + 'px')
		.style('height', window.innerHeight + 'px');
	//var mapMargin = 32;
	var mapWidth = graphic.node().offsetWidth;
	map
		.style('width', mapWidth + 'px')
		.style('height', window.innerHeight + 'px');
	// 3. tell scrollama to update new element dimensions
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

function handleStepEnterCity({index, element}) {
	const city = d3.select(element).select('.city-hed').text().trim()
	d3.select('#city-select').selectAll('option').prop('selected', (d,i,n) => {
		const option = d3.select(n[i])
		const text = option.text().trim()
		return city === text
	})
}

function handleStepExitCity({ index, element, direction }) {
	if (index === 0 && direction === 'up') d3.select('#city-select').selectAll('option').prop('selected', (d, i) => i === 0)
}

function handleStepEnter(response) {
	// response = { element, direction, index }
	step.classed('is-active', function (d, i) {
		return i === response.index;
	})

	renderStep(response.index)

	// update graphic based on step
	map.select('p').text(response.index + 1)
}

function setupStickyfill() {
	d3.selectAll('.sticky').each(function () {
		Stickyfill.add(this);
	});
}

//MAPBOX
function buildMap() {
	//Initializes mapbox mapbox
	mapboxgl.accessToken = 'pk.eyJ1IjoiamFkaWVobSIsImEiOiIzTjRUSFZjIn0.sed_QtqpB7m5yFLmK2VV9g';

	openerMap = new mapboxgl.Map({
		container: 'scrollMap', //container id
		style: 'mapbox://styles/jadiehm/cji3f7z4n13s52rmz42onwmkx', //style URL
		center: [-73.980539,40.715444],
		//maxZoom: 18,
		//maxBounds: [[-122.963019,47.303616], [-121.782112, 47.983433]],
		zoom: 11,
		interactive: false
	})

	openerMap.scrollZoom.disable();

	openerMap.on('load', function() {
		//Adds layers below labels
		var layers = openerMap.getStyle().layers;
    // Find the index of the first symbol layer in the map style
    var firstSymbolId;
    for (var i = 0; i < layers.length; i++) {
        if (layers[i].type === 'symbol') {
            firstSymbolId = layers[i].id;
            break;
        }
    }
		//Adds overall gayborhood index
		openerMap.addLayer({
				'id': 'gayborhood-index',
				'source': {
					'type': 'vector',
					'url': 'mapbox://jadiehm.indexJoined'
				},
				'layout': {
            'visibility': 'visible'
        },
				'source-layer': 'original',
				'type': 'fill',
				'filter': ['has', 'ZIPS_Ind_8'],
				'paint': {
						'fill-color': [
								'interpolate',
								['linear'],
								['get', 'ZIPS_Ind_8'],
								0, '#f6f6f6',
								4, '#ffb993',
								10, '#ff9f6e',
								20, '#fb8548',
								30, '#f36c21'
						],
						'fill-opacity': 0.5
				}
		}, firstSymbolId);
		//Adds MM gayborhood index
		openerMap.addLayer({
				'id': 'gayborhood-index-MM',
				'source': {
					'type': 'vector',
					'url': 'mapbox://jadiehm.indexJoined'
				},
				'layout': {
            'visibility': 'visible'
        },
				'source-layer': 'original',
				'type': 'fill',
				'filter': ['has', 'ZIPS_Ind_7'],
				'paint': {
						'fill-color': [
								'interpolate',
								['linear'],
								['get', 'ZIPS_Ind_7'],
								0, '#f6f6f6',
								4, '#dcc4ff',
								10, '#7776b6',
								20, '#5457a4',
								30, '#273a92'
						],
						'fill-opacity': 0.5
				}
		}, firstSymbolId);
		//Adds FF gayborhood index
		openerMap.addLayer({
				'id': 'gayborhood-index-FF',
				'source': {
					'type': 'vector',
					'url': 'mapbox://jadiehm.indexJoined'
				},
				'layout': {
            'visibility': 'visible'
        },
				'source-layer': 'original',
				'type': 'fill',
				'filter': ['has', 'ZIPS_Ind_6'],
				'paint': {
						'fill-color': [
								'interpolate',
								['linear'],
								['get', 'ZIPS_Ind_6'],
								0, '#f6f6f6',
								4, '#dcc4ff',
								10, '#7776b6',
								20, '#5457a4',
								30, '#273a92'
						],
						'fill-opacity': 0.5
				}
		}, firstSymbolId);
		//Adds gay bar points
    openerMap.addLayer({
        'id': 'gay-bars',
        'type': 'circle',
        'source': {
					'type': 'vector',
	        'url': 'mapbox://jadiehm.2zsul8ff'
				},
        'layout': {
            'visibility': 'visible'
        },
        'paint': {
            'circle-radius': 3,
            'circle-color': 'rgba(1,1,1, 0.7)',
						'circle-stroke-color': '#ffffff',
						'circle-stroke-width': 1
        },
				'source-layer': 'gaybarsMOD-575puu'
    }, firstSymbolId);
		//Adds parade route
    openerMap.addLayer({
        'id': 'paradeRoute',
        'type': 'line',
        'source': {
					'type': 'vector',
	        'url': 'mapbox://jadiehm.b4vpcbja'
				},
        'layout': {
            'visibility': 'visible',
						'line-join': 'round',
            'line-cap': 'round'
        },
        'paint': {
					'line-color': '#262626',
					'line-width': 2,
					'line-opacity': 1
        },
				'source-layer': 'Parade_routes'
    }, firstSymbolId);

		truncatePage(false)
	});
}

//DROPDOWN SCROLL
function scrollTo(element) {
  window.scroll({
    behavior: 'smooth',
    left: 0,
    top: element.offsetTop - 110
  });
}

function citySelection() {
	var citySelection = document.getElementById('city-select');
	var citySelectionValue = citySelection.options[citySelection.selectedIndex].value;
	var citySelectionLink = citySelectionValue + '-link';

	if (citySelectionValue !== 'choose') {
		var cityScroll = document.getElementById(citySelectionLink)
		scrollTo(cityScroll);
	}
}

d3.select("#city-select")
  .on("change", citySelection.bind());

//DIST CHART
const chartContainer = d3.select('#dist-chart');
const chartSvg = d3.select('.dist-chart-svg');
const containerWidth = d3.select('#dist-chart').node().offsetWidth;

function buildDistChart(err, data) {
	if (err) throw "error loading data";
	data.forEach(function(d) { d.index = +d.index; });
	var indexType = ['Female gayborhood', 'Male gayborhood'];
	indexType = d3.set(data.map(function(d) { return d.indexType; })).values();
	const charts = indexType.map(renderCharts);

	function renderCharts(indexType, chartIndex) {
		var individualChart = chartContainer.append('div').attr("class", 'g-chart-container');
		//Margins and dimensions
		const margin = {top: 0, right: 0, bottom: 20, left: 0};
		const width = containerWidth - margin.left - margin.right;
		const height = 70 - margin.top - margin.bottom;
		//Creates the scales
		const xScale = d3.scaleLinear()
			.range([0, width])
			.domain([0, 50]);
		//Axes
		const xAxis = d3.axisBottom()
				.scale(xScale)
				.tickPadding(0)
				.ticks(5)
		//Finds the data associated with each index
		const currentIndex = indexType;
		const currentIndexData = data.filter(function(d) { return d.indexType === currentIndex; });
		//Appends the property name to the individual chart container
		const chartName = individualChart.append('h5')
			.attr('class', 'g-name')
			.text(currentIndex)
		//Appends the index chart to the individual chart container
		const chart = individualChart.append('div')
			.attr('class', 'g-chart');
		//Appends the svg to the chart-container div
    const svg = chart.append('svg')
			.attr('class', 'dist-chart-svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
		//background
		const bgRect = svg.append("rect")
	    .attr("x", 0)
	    .attr("y", 0)
	    .attr("width", width)
	    .attr("height", height)
	    .attr("class", "bgRect");
		//Add annotations
		if (chartIndex === 1) {
			const lessConc = svg.append('text')
				.text('Less concentrated')
				.attr('class', 'label less')
				.attr('x', 0)
				.attr('y', height + margin.bottom)
				.attr('transform', 'translate(0,0)');

			const moreConc = svg.append('text')
				.text('More concentrated')
				.attr('class', 'label more')
				.attr('x', width)
				.attr('y', height + margin.bottom)
				.attr('transform', 'translate(0,0)');
		}
		//Draw Axes
		const xAxisGroup = svg.append('g')
			.attr('class', 'x axis')
			.attr('transform', 'translate(0,' + height + ')')
			.call(xAxis);
		//Strips
		const strips = svg.selectAll("line.index")
			.data(currentIndexData)
			.enter()
			.append('line')
			.attr('class', 'percentline')
			.attr('x1', function(d,i) { return xScale(d.index); })
			.attr('x2', function(d) { return xScale(d.index); })
			.attr('y1', 0)
			.attr('y2', 50);
	}
}

function resize() {
}

function truncatePage(truncate) {
	const heightContent = truncate ? $content.select('.intro').node().offsetHeight : 'auto'
	$content
		.st('height', heightContent)
		.classed('is-truncated', truncate)

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
		window.addEventListener('resize', debounce(resize, 2000));

		truncatePage(true);
		// 1. force a resize on load to ensure proper dimensions are sent to scrollama
    handleResize();
    // 2. setup the scroller passing options
    // this will also initialize trigger observations
    // 3. bind scrollama event handlers (this can be chained like below)
    scroller.setup({
      step: '.scroll__text .step',
      debug: false,
    }).onStepEnter(handleStepEnter)

		scrollerCity.setup({
			step: '.city-wrapper',
			offset: 0.1,
		}).onStepEnter(handleStepEnterCity)
			.onStepExit(handleStepExitCity)
    // setup resize event
    window.addEventListener('resize', handleResize);

		buildMap();
}

export default { init, resize };
