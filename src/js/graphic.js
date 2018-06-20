//import mapboxgl from 'mapbox-gl';
import 'intersection-observer'
import scrollama from 'scrollama';
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
		openerMap.setLayoutProperty('gayborhood-index', 'visibility', 'none');
		openerMap.setLayoutProperty('gayborhood-index-MM', 'visibility', 'none');
		openerMap.setLayoutProperty('gayborhood-index-FF', 'visibility', 'none');
		openerMap.setLayoutProperty('paradeRoute', 'visibility', 'visible');
		openerMap.setLayoutProperty('gay-bars', 'visibility', 'none');
	}

	if (index === 1) {
		openerMap.setLayoutProperty('gayborhood-index', 'visibility', 'none');
		openerMap.setLayoutProperty('gayborhood-index-MM', 'visibility', 'none');
		openerMap.setLayoutProperty('gayborhood-index-FF', 'visibility', 'none');
		openerMap.setLayoutProperty('paradeRoute', 'visibility', 'visible');
		openerMap.setLayoutProperty('gay-bars', 'visibility', 'visible');
	}

	if (index === 2) {
		openerMap.setLayoutProperty('gayborhood-index', 'visibility', 'visible');
		openerMap.setLayoutProperty('gayborhood-index-MM', 'visibility', 'none');
		openerMap.setLayoutProperty('gayborhood-index-FF', 'visibility', 'none');
		openerMap.setLayoutProperty('paradeRoute', 'visibility', 'visible');
		openerMap.setLayoutProperty('gay-bars', 'visibility', 'visible');
	}

	if (index === 3) {
		openerMap.setLayoutProperty('gayborhood-index', 'visibility', 'none');
		openerMap.setLayoutProperty('gayborhood-index-MM', 'visibility', 'visible');
		openerMap.setLayoutProperty('gayborhood-index-FF', 'visibility', 'none');
		openerMap.setLayoutProperty('paradeRoute', 'visibility', 'visible');
		openerMap.setLayoutProperty('gay-bars', 'visibility', 'visible');
	}

	if (index === 4) {
		openerMap.setLayoutProperty('gayborhood-index', 'visibility', 'none');
		openerMap.setLayoutProperty('gayborhood-index-MM', 'visibility', 'none');
		openerMap.setLayoutProperty('gayborhood-index-FF', 'visibility', 'visible');
		openerMap.setLayoutProperty('paradeRoute', 'visibility', 'visible');
		openerMap.setLayoutProperty('gay-bars', 'visibility', 'visible');
	}
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
function handleContainerEnter(response) {
	// response = { direction }
}
function handleContainerExit(response) {
	// response = { direction }
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
								4, '#d0eee0',
								10, '#9fdcc1',
								20, '#6acba3',
								30, '#16b886'
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
								10, '#b38cff',
								20, '#7f53ff',
								30, '#0000ff'
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
								10, '#b38cff',
								20, '#7f53ff',
								30, '#0000ff'
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
            'circle-color': 'rgba(1,1,1,1)'
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
					'line-width': 2
        },
				'source-layer': 'Parade_routes'
    }, firstSymbolId);

		var popup = new mapboxgl.Popup({
			closeButton: false,
			closeOnClick: false
		})

		//MAP INTERACTION
		//Adds hovers to bars
		openerMap.on('mouseenter', 'gay-bars', function(e) {
			var features = openerMap.queryRenderedFeatures(e.point,{ layers: ['gay-bars'] });

			popup
				.setLngLat(e.lngLat)
				.setHTML(features[0].properties.Name)
				.addTo(openerMap);
		})
		//Removes hovers to bars
		openerMap.on('mouseleave', 'gay-bars', function(e) {
			popup.remove();
		})
		//Adds hovers to zips
		// openerMap.on('mouseenter', 'gayborhood-index', function(e) {
		// 	var features = openerMap.queryRenderedFeatures(e.point,{ layers: ['gayborhood-index'] });
		//
		// 	console.log(features);
		// 	popup
		// 		.setLngLat(e.lngLat)
		// 		.setHTML(features[0].properties.ZCTA5CE10)
		// 		.addTo(openerMap);
		// })
		// //Removes hovers to zips
		// openerMap.on('mouseleave', 'gayborhood-index', function(e) {
		// 	popup.remove();
		// })

		truncatePage(false)
	});
}

//DROPDOWN SCROLL
function scrollTo(element) {
  window.scroll({
    behavior: 'smooth',
    left: 0,
    top: element.offsetTop - 55
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

//STRIP CHARTS
function distChart() {
	var indexType = ['Female gayborhood', 'Male gayborhood'];
	//Loads the data
	d3.csv('assets/data/IndexCitiesCSV.csv', ready);

	function ready(err, data) {
	  if (err) throw "error loading data";
	  //Format data
	  data.forEach(function(d) { d.index = +d.index; });
	  //Map the property names to the data
	  indexType = d3.set(data.map(function(d) { return d.indexType; })).values();
	  //Make a chart for each property
	  var charts = indexType.map(makeChart);

	  function makeChart(index, chartIndex) {
	    //Append individual chart div
	    var chartContainer = d3.select('#dist-chart').append('div')
	      .attr("class", 'g-chart-container');
	    //Margin and dimensions
	    var margin = {top: 0, right: 0, bottom: 30, left: 0};
	    var constWidth = d3.select(".g-chart-container").node().clientWidth;
	    var width = constWidth - margin.left - margin.right,
	        height = 80 - margin.top - margin.bottom;
	    //Creates the scales
	    var xScale = d3.scaleLinear()
	      .range([0, width])
	      .domain([0, 50]);
	    var yScale = d3.scaleLinear()
	      .range([height, 0])
	      .domain([0, 50]);
	    //Axes
			var xAxis = d3.axisBottom()
					.scale(xScale)
					.tickPadding(0)
					.ticks(5)
	    //Finds the data associated with each index
	    var currentIndex = index;
	    var currentIndexData = data.filter(function(d) { return d.indexType === currentIndex; });
			//Appends the property name to the individual chart container
		    var chartName = chartContainer.append('h5')
		      .attr('class', 'g-name')
					.text(currentIndex)
			//Appends the index chart to the individual chart container
	    var chart = chartContainer.append('div')
	      .attr('class', 'g-chart');

	    //Appends the svg to the chart-container div
	    var svg = chart.append('svg')
	      .attr('width', width + margin.left + margin.right)
	      .attr('height', height + margin.top + margin.bottom)
	      .append('g')
	      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

			//background
			var bgRect = svg.append("rect")
		    .attr("x", 0)
		    .attr("y", 0)
		    .attr("width", width)
		    .attr("height", height)
		    .attr("class", "bgRect");

	    //Draw Axes
			var xAxisGroup = svg.append('g')
				.attr('class', 'x axis')
				.attr('transform', 'translate(0,' + height + ')')
				.call(xAxis)
				.selectAll('g')
		    .classed('g-left', function(d) { return d == 0 })
				.classed('g-right', function(d) { return d == 50 });

			d3.selectAll('.g-left').attr('transform', 'translate(3, 0)');
			d3.selectAll('.g-right').attr('transform', 'translate('+ (width - 8) + ', 0)');
			//Strips
			var strips = svg.selectAll("line.index")
				.data(currentIndexData)
				.enter()
				.append("line")
				.attr("class", "percentline")
				.attr("x1", function(d,i) { return xScale(d.index); })
				.attr("x2", function(d) { return xScale(d.index); })
				.attr("y1", 0)
				.attr("y2", 50);
	  }
	}
}

function resize() {}

function truncatePage(truncate) {
	const height = truncate ? $content.select('.intro').node().offsetHeight : 'auto'
	$content
		.st('height', height)
		.classed('is-truncated', truncate)

	if (!truncate) renderStep(0)
}

function init() {
		truncatePage(true);
	// 1. force a resize on load to ensure proper dimensions are sent to scrollama
    handleResize();

    // 2. setup the scroller passing options
    // this will also initialize trigger observations
    // 3. bind scrollama event handlers (this can be chained like below)
    scroller.setup({
      container: '#scroll',
      graphic: '.scroll__graphic',
      text: '.scroll__text',
      step: '.scroll__text .step',
      debug: false,
    })
      .onStepEnter(handleStepEnter)
      .onContainerEnter(handleContainerEnter)
      .onContainerExit(handleContainerExit);

    // setup resize event
    window.addEventListener('resize', handleResize);

		buildMap();
		distChart();
}

export default { init, resize };
