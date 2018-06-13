import mapboxgl from 'mapbox-gl';
import 'intersection-observer'
import scrollama from 'scrollama';
// D3 is included by globally by default

var openerMap;

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
	step.style('height', stepHeight + 'px');
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
function handleStepEnter(response) {
	// response = { element, direction, index }
	// add color to current step only
	step.classed('is-active', function (d, i) {
		return i === response.index;
	})
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
		center: [-73.980539,40.711444],
		maxZoom: 18,
		//maxBounds: [[-122.963019,47.303616], [-121.782112, 47.983433]],
		zoom: 11,
		//interactive: false
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
				'filter': ['has', 'ZIPS_Ind_9'],
				'paint': {
						'fill-color': [
								'interpolate',
								['linear'],
								['get', 'ZIPS_Ind_9'],
								0, '#f6f6f6',
								4, '#b7d5ac',
								10, '#6eaa5e',
								20, '#008000'
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
            'visibility': 'none'
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
								4, '#cfb2ff',
								10, '#9266ff',
								20, '#0000ff'
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
            'visibility': 'none'
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
								4, '#ff9475',
								10, '#ff6544',
								20, '#ff0000'
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
	        'url': 'mapbox://jadiehm.4clcru2x'
				},
        'layout': {
            'visibility': 'visible'
        },
        'paint': {
            'circle-radius': 3,
            'circle-color': 'rgba(1,1,1,1)'
        },
				'source-layer': 'YelpPoints-15loj8'
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
	});
}

function resize() {}

function init() {
	//console.log('Make something awesome!');

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
}

export default { init, resize };
