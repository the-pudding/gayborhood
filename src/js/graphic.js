import mapboxgl from 'mapbox-gl';
import 'intersection-observer'
import scrollama from 'scrollama';
// D3 is included by globally by default

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

		//Initializes mapbox mapbox
		mapboxgl.accessToken = 'pk.eyJ1IjoiamFkaWVobSIsImEiOiIzTjRUSFZjIn0.sed_QtqpB7m5yFLmK2VV9g';

		var openerMap = new mapboxgl.Map({
			container: 'scrollMap', //container id
			style: 'mapbox://styles/jadiehm/cji3f7z4n13s52rmz42onwmkx', //style URL
			center: [-73.980539,40.711444],
			maxZoom: 18,
			//maxBounds: [[-122.963019,47.303616], [-121.782112, 47.983433]],
			zoom: 12
		})

		openerMap.scrollZoom.disable();

		openerMap.on('load', function() {
			// the rest of the map code will go in here
		});
}

export default { init, resize };
