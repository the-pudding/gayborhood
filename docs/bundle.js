!function(t){var e={};function n(o){if(e[o])return e[o].exports;var r=e[o]={i:o,l:!1,exports:{}};return t[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=t,n.c=e,n.d=function(t,e,o){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:o})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)n.d(o,r,function(e){return t[e]}.bind(null,r));return o},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=7)}([function(t,e){t.exports=function(t,e,n){var o,r,i,s,a;function c(){var l=Date.now()-s;l<e&&l>=0?o=setTimeout(c,e-l):(o=null,n||(a=t.apply(i,r),i=r=null))}null==e&&(e=100);var l=function(){i=this,r=arguments,s=Date.now();var l=n&&!o;return o||(o=setTimeout(c,e)),l&&(a=t.apply(i,r),i=r=null),a};return l.clear=function(){o&&(clearTimeout(o),o=null)},l.flush=function(){o&&(a=t.apply(i,r),i=r=null,clearTimeout(o),o=null)},l}},function(t,e,n){t.exports=function(){"use strict";function t(t){for(var e=t.length,n=[],o=0;o<e;o+=1)n.push(t[o]);return n}function e(t){return t instanceof Element?t:"string"==typeof t?document.querySelector(t):null}function n(t){return"scrollama__debug-step--"+t.id+"-"+t.i}function o(t){return"scrollama__debug-offset--"+t.id}function r(t){var e=t.id,r=t.offsetVal,i=t.stepEl,s=i[0].getAttribute("class");i.forEach(function(t,o){return function(t){var e=n({id:t.id,i:t.i}),o=document.createElement("div");o.setAttribute("id",e+"_above"),o.setAttribute("class","scrollama__debug-step"),o.style.position="fixed",o.style.left="0",o.style.width="100%",o.style.backgroundImage="repeating-linear-gradient(45deg, green 0, green 2px, white 0, white 40px)",o.style.border="2px solid green",o.style.opacity="0.33",o.style.zIndex="9999",o.style.display="none",document.body.appendChild(o);var r=document.createElement("div");r.setAttribute("id",e+"_below"),r.setAttribute("class","scrollama__debug-step"),r.style.position="fixed",r.style.left="0",r.style.width="100%",r.style.backgroundImage="repeating-linear-gradient(135deg, orange 0, orange 2px, white 0, white 40px)",r.style.border="2px solid orange",r.style.opacity="0.33",r.style.zIndex="9999",r.style.display="none",document.body.appendChild(r)}({id:e,i:o})}),function(t){var e=t.id,n=t.offsetVal,r=t.stepClass,i=document.createElement("div");i.setAttribute("id",o({id:e})),i.setAttribute("class","scrollama__debug-offset"),i.style.position="fixed",i.style.left="0",i.style.width="100%",i.style.height="0px",i.style.borderTop="2px dashed black",i.style.zIndex="9999";var s=document.createElement("p");s.innerText='".'+r+'" trigger: '+n,s.style.fontSize="12px",s.style.fontFamily="monospace",s.style.color="black",s.style.margin="0",s.style.padding="6px",i.appendChild(s),document.body.appendChild(i)}({id:e,offsetVal:r,stepClass:s})}function i(t){var e=t.id,r=t.stepOffsetHeight,i=t.offsetMargin;t.offsetVal,r.forEach(function(t,o){return function(t){var e=t.h,o=t.offsetMargin,r=n({id:t.id,i:t.i}),i=document.querySelector("#"+r+"_above");i.style.height=e+"px",i.style.top=o-e+"px";var s=document.querySelector("#"+r+"_below");s.style.height=e+"px",s.style.top=o+"px"}({id:e,h:t,i:o,offsetMargin:i})}),function(t){var e=t.offsetMargin,n=o({id:t.id});document.querySelector("#"+n).style.top=e+"px"}({id:e,offsetMargin:i})}function s(t){var e=t.id,o=t.index,r=t.state,i=n({id:e,i:o}),s=document.querySelector("#"+i+"_above"),a=document.querySelector("#"+i+"_below"),c="enter"===r?"block":"none";s&&(s.style.display=c),a&&(a.style.display=c)}return function(){var n=1,o={},a={},c=null,l=null,u=null,d=null,p=0,f=0,h=0,y=0,g=null,v=null,b=null,m=!1,x=!1,_=!1,w=!1,P=0,E=!1,I=!1,M=null,T=null,O=-1,R=null,A=[];function k(t){var e=0;if(t.offsetParent)do{e+=t.offsetTop,t=t.offsetParent}while(t);return e<0?0:e}function j(t){return+t.getAttribute("data-scrollama-index")}function S(){window.pageYOffset>O?R="down":window.pageYOffset<O&&(R="up"),O=window.pageYOffset}function F(){var t,e;h=window.innerHeight,t=document.body,e=document.documentElement,y=Math.max(t.scrollHeight,t.offsetHeight,e.clientHeight,e.scrollHeight,e.offsetHeight),b=l?l.getBoundingClientRect():null,f=p*h,g=u?u.map(function(t){return t.offsetHeight}):[],v=u?u.map(k):[],x&&m&&Y(),_&&i({id:d,stepOffsetHeight:g,offsetMargin:f,offsetVal:p})}function C(t){t&&!x?(m&&Y(),x=!0):t||(a.top&&a.top.disconnect(),a.bottom&&a.bottom.disconnect(),a.stepAbove&&a.stepAbove.forEach(function(t){return t.disconnect()}),a.stepBelow&&a.stepBelow.forEach(function(t){return t.disconnect()}),a.stepProgress&&a.stepProgress.forEach(function(t){return t.disconnect()}),a.viewportAbove&&a.viewportAbove.forEach(function(t){return t.disconnect()}),a.viewportBelow&&a.viewportBelow.forEach(function(t){return t.disconnect()}),x=!1)}function L(t,e){if("above"===e)for(var n=0;n<t;n++){var o=M[n];"enter"===o.state&&z(u[n]),"up"===o.direction&&(B(u[n],"down"),z(u[n]))}else if("below"===e)for(var r=M.length-1;r>t;r--){var i=M[r];"enter"===i.state&&z(u[r]),"down"===i.direction&&(B(u[r],"up"),z(u[r]))}}function B(t,e){void 0===e&&(e=!0);var n=j(t),r={element:t,index:n,direction:R};M[n].direction=R,M[n].state="enter",E&&e&&"down"===R&&L(n,"above"),E&&e&&"up"===R&&L(n,"below"),o.stepEnter&&"function"==typeof o.stepEnter&&!A[n]&&(o.stepEnter(r,M),_&&s({id:d,index:n,state:"enter"}),I&&(A[n]=!0)),w&&H(t,"down"===R?0:1)}function z(t){var e=j(t),n={element:t,index:e,direction:R};M[e].direction=R,M[e].state="exit",w&&H(t,"down"===R?1:0),o.stepExit&&"function"==typeof o.stepExit&&(o.stepExit(n,M),_&&s({id:d,index:e,state:"exit"}))}function H(t,e){var n={element:t,index:j(t),progress:e};o.stepProgress&&"function"==typeof o.stepProgress&&o.stepProgress(n)}function V(){var t={direction:R};T.direction=R,T.state="enter",o.containerEnter&&"function"==typeof o.containerEnter&&o.containerEnter(t)}function q(){var t={direction:R};T.direction=R,T.state="exit",o.containerExit&&"function"==typeof o.containerExit&&o.containerExit(t)}function N(t){S(),t.forEach(function(t){var e=t.isIntersecting,o=t.boundingClientRect,r=t.target,i=o.bottom,s=o.height,a=i-f,c=j(r),l=M[c];a>=-n&&(e&&"down"===R&&"enter"!==l.state?B(r,R):e||"up"!==R||"enter"!==l.state?!e&&a>=s&&"down"===R&&"enter"===l.state&&z(r):z(r))})}function W(t){S(),t.forEach(function(t){var e=t.isIntersecting,o=t.boundingClientRect,r=t.target,i=o.bottom,s=o.height,a=i-f,c=j(r),l=M[c];a>=-n&&a<s&&e&&"up"===R&&"enter"!==l.state?B(r,R):a<=n&&!e&&"down"===R&&"enter"===l.state&&z(r)})}function D(t){S(),t.forEach(function(t){var e=t.isIntersecting,n=t.target,o=j(n),r=M[o];e&&"down"===R&&"enter"!==r.state&&"down"!==r.direction&&(B(n,"down"),z(n))})}function Z(t){S(),t.forEach(function(t){var e=t.isIntersecting,n=t.target,o=j(n),r=M[o];e&&"up"===R&&"enter"!==r.state&&"up"!==r.direction&&(B(n,"up"),z(n))})}function U(t){S(),t.forEach(function(t){var e=t.isIntersecting,o=t.intersectionRatio,r=t.boundingClientRect,i=t.target,s=r.bottom;e&&s-f>=-n&&H(i,+o.toFixed(3))})}function J(t){S();var e=t[0],o=e.isIntersecting,r=e.boundingClientRect;(r.top,r.bottom)>-n&&(o?V():"enter"===T.state&&q())}function $(t){S();var e=t[0],o=e.isIntersecting;e.boundingClientRect.top<n&&(o?V():"enter"===T.state&&q())}function Y(){a.viewportAbove&&a.viewportAbove.forEach(function(t){return t.disconnect()}),a.viewportAbove=u.map(function(t,e){var n=v[e],o=-(h-f+g[e]),r=new IntersectionObserver(D,{root:null,rootMargin:n+"px 0px "+o+"px 0px",threshold:0});return r.observe(t),r}),a.viewportBelow&&a.viewportBelow.forEach(function(t){return t.disconnect()}),a.viewportBelow=u.map(function(t,e){var n=-(f+g[e]),o=y-v[e]-g[e]-f,r=new IntersectionObserver(Z,{root:null,rootMargin:n+"px 0px "+o+"px 0px",threshold:0});return r.observe(t),r}),a.stepAbove&&a.stepAbove.forEach(function(t){return t.disconnect()}),a.stepAbove=u.map(function(t,e){var n=g[e],o=new IntersectionObserver(N,{root:null,rootMargin:n+"px 0px "+(-h+f)+"px 0px",threshold:0});return o.observe(t),o}),a.stepBelow&&a.stepBelow.forEach(function(t){return t.disconnect()}),a.stepBelow=u.map(function(t,e){var n=-f,o=y-h+g[e]+f,r=new IntersectionObserver(W,{root:null,rootMargin:n+"px 0px "+o+"px 0px",threshold:0});return r.observe(t),r}),w&&(a.stepProgress&&a.stepProgress.forEach(function(t){return t.disconnect()}),a.stepProgress=u.map(function(t,e){var n=g[e]-f+"px 0px "+(-h+f)+"px 0px",o=function(t){for(var e=Math.ceil(t/P),n=[],o=1/e,r=0;r<e;r++)n.push(r*o);return n}(g[e]),r=new IntersectionObserver(U,{root:null,rootMargin:n,threshold:o});return r.observe(t),r})),c&&l&&(function(){a.top&&a.top.unobserve(c);var t={root:null,rootMargin:h+"px 0px -"+h+"px 0px",threshold:0};a.top=new IntersectionObserver(J,t),a.top.observe(c)}(),function(){a.bottom&&a.bottom.unobserve(c);var t={root:null,rootMargin:"-"+b.height+"px 0px "+b.height+"px 0px",threshold:0};a.bottom=new IntersectionObserver($,t),a.bottom.observe(c)}())}var K={setup:function(n){var o=n.container,i=n.graphic,s=n.step,a=n.offset;void 0===a&&(a=.5);var f=n.progress;void 0===f&&(f=!1);var h=n.threshold;void 0===h&&(h=4);var y=n.debug;void 0===y&&(y=!1);var g=n.order;void 0===g&&(g=!0);var v,b,x,O,R,A=n.once;return void 0===A&&(A=!1),b=(v="abcdefghijklmnopqrstuv").length,x=(new Date).getTime(),d=""+[0,0,0].map(function(t){return v[Math.floor(Math.random()*b)]}).join("")+x,O=s,void 0===R&&(R=document),u="string"==typeof O?t(R.querySelectorAll(O)):O instanceof NodeList?t(O):O instanceof Array?O:[],c=o?e(o):null,l=i?e(i):null,u.length?(_=y,w=f,E=g,I=A,K.offsetTrigger(a),P=Math.max(1,+h),m=!0,_&&r({id:d,stepEl:u,offsetVal:p}),u.forEach(function(t,e){return t.setAttribute("data-scrollama-index",e)}),M=u.map(function(){return{direction:null,state:null}}),T={direction:null,state:null},F(),C(!0),K):(console.error("scrollama error: no step elements"),K)},resize:function(){return F(),K},enable:function(){return C(!0),K},disable:function(){return C(!1),K},destroy:function(){C(!1),Object.keys(o).forEach(function(t){return o[t]=null}),Object.keys(a).forEach(function(t){return a[t]=null})},offsetTrigger:function(t){return t&&(isNaN(t),1)?(p=Math.min(Math.max(0,t),1),K):p},onStepEnter:function(t){return o.stepEnter=t,K},onStepExit:function(t){return o.stepExit=t,K},onStepProgress:function(t){return o.stepProgress=t,K},onContainerEnter:function(t){return o.containerEnter=t,K},onContainerExit:function(t){return o.containerExit=t,K}};return K}}()},function(t,e){!function(t,e){"use strict";if("IntersectionObserver"in t&&"IntersectionObserverEntry"in t&&"intersectionRatio"in t.IntersectionObserverEntry.prototype)"isIntersecting"in t.IntersectionObserverEntry.prototype||Object.defineProperty(t.IntersectionObserverEntry.prototype,"isIntersecting",{get:function(){return this.intersectionRatio>0}});else{var n=[];r.prototype.THROTTLE_TIMEOUT=100,r.prototype.POLL_INTERVAL=null,r.prototype.USE_MUTATION_OBSERVER=!0,r.prototype.observe=function(t){if(!this._observationTargets.some(function(e){return e.element==t})){if(!t||1!=t.nodeType)throw new Error("target must be an Element");this._registerInstance(),this._observationTargets.push({element:t,entry:null}),this._monitorIntersections(),this._checkForIntersections()}},r.prototype.unobserve=function(t){this._observationTargets=this._observationTargets.filter(function(e){return e.element!=t}),this._observationTargets.length||(this._unmonitorIntersections(),this._unregisterInstance())},r.prototype.disconnect=function(){this._observationTargets=[],this._unmonitorIntersections(),this._unregisterInstance()},r.prototype.takeRecords=function(){var t=this._queuedEntries.slice();return this._queuedEntries=[],t},r.prototype._initThresholds=function(t){var e=t||[0];return Array.isArray(e)||(e=[e]),e.sort().filter(function(t,e,n){if("number"!=typeof t||isNaN(t)||t<0||t>1)throw new Error("threshold must be a number between 0 and 1 inclusively");return t!==n[e-1]})},r.prototype._parseRootMargin=function(t){var e=(t||"0px").split(/\s+/).map(function(t){var e=/^(-?\d*\.?\d+)(px|%)$/.exec(t);if(!e)throw new Error("rootMargin must be specified in pixels or percent");return{value:parseFloat(e[1]),unit:e[2]}});return e[1]=e[1]||e[0],e[2]=e[2]||e[0],e[3]=e[3]||e[1],e},r.prototype._monitorIntersections=function(){this._monitoringIntersections||(this._monitoringIntersections=!0,this.POLL_INTERVAL?this._monitoringInterval=setInterval(this._checkForIntersections,this.POLL_INTERVAL):(i(t,"resize",this._checkForIntersections,!0),i(e,"scroll",this._checkForIntersections,!0),this.USE_MUTATION_OBSERVER&&"MutationObserver"in t&&(this._domObserver=new MutationObserver(this._checkForIntersections),this._domObserver.observe(e,{attributes:!0,childList:!0,characterData:!0,subtree:!0}))))},r.prototype._unmonitorIntersections=function(){this._monitoringIntersections&&(this._monitoringIntersections=!1,clearInterval(this._monitoringInterval),this._monitoringInterval=null,s(t,"resize",this._checkForIntersections,!0),s(e,"scroll",this._checkForIntersections,!0),this._domObserver&&(this._domObserver.disconnect(),this._domObserver=null))},r.prototype._checkForIntersections=function(){var e=this._rootIsInDom(),n=e?this._getRootRect():{top:0,bottom:0,left:0,right:0,width:0,height:0};this._observationTargets.forEach(function(r){var i=r.element,s=a(i),c=this._rootContainsTarget(i),l=r.entry,u=e&&c&&this._computeTargetAndRootIntersection(i,n),d=r.entry=new o({time:t.performance&&performance.now&&performance.now(),target:i,boundingClientRect:s,rootBounds:n,intersectionRect:u});l?e&&c?this._hasCrossedThreshold(l,d)&&this._queuedEntries.push(d):l&&l.isIntersecting&&this._queuedEntries.push(d):this._queuedEntries.push(d)},this),this._queuedEntries.length&&this._callback(this.takeRecords(),this)},r.prototype._computeTargetAndRootIntersection=function(n,o){if("none"!=t.getComputedStyle(n).display){for(var r,i,s,c,u,d,p,f,h=a(n),y=l(n),g=!1;!g;){var v=null,b=1==y.nodeType?t.getComputedStyle(y):{};if("none"==b.display)return;if(y==this.root||y==e?(g=!0,v=o):y!=e.body&&y!=e.documentElement&&"visible"!=b.overflow&&(v=a(y)),v&&(r=v,i=h,s=Math.max(r.top,i.top),c=Math.min(r.bottom,i.bottom),u=Math.max(r.left,i.left),f=c-s,!(h=(p=(d=Math.min(r.right,i.right))-u)>=0&&f>=0&&{top:s,bottom:c,left:u,right:d,width:p,height:f})))break;y=l(y)}return h}},r.prototype._getRootRect=function(){var t;if(this.root)t=a(this.root);else{var n=e.documentElement,o=e.body;t={top:0,left:0,right:n.clientWidth||o.clientWidth,width:n.clientWidth||o.clientWidth,bottom:n.clientHeight||o.clientHeight,height:n.clientHeight||o.clientHeight}}return this._expandRectByRootMargin(t)},r.prototype._expandRectByRootMargin=function(t){var e=this._rootMarginValues.map(function(e,n){return"px"==e.unit?e.value:e.value*(n%2?t.width:t.height)/100}),n={top:t.top-e[0],right:t.right+e[1],bottom:t.bottom+e[2],left:t.left-e[3]};return n.width=n.right-n.left,n.height=n.bottom-n.top,n},r.prototype._hasCrossedThreshold=function(t,e){var n=t&&t.isIntersecting?t.intersectionRatio||0:-1,o=e.isIntersecting?e.intersectionRatio||0:-1;if(n!==o)for(var r=0;r<this.thresholds.length;r++){var i=this.thresholds[r];if(i==n||i==o||i<n!=i<o)return!0}},r.prototype._rootIsInDom=function(){return!this.root||c(e,this.root)},r.prototype._rootContainsTarget=function(t){return c(this.root||e,t)},r.prototype._registerInstance=function(){n.indexOf(this)<0&&n.push(this)},r.prototype._unregisterInstance=function(){var t=n.indexOf(this);-1!=t&&n.splice(t,1)},t.IntersectionObserver=r,t.IntersectionObserverEntry=o}function o(t){this.time=t.time,this.target=t.target,this.rootBounds=t.rootBounds,this.boundingClientRect=t.boundingClientRect,this.intersectionRect=t.intersectionRect||{top:0,bottom:0,left:0,right:0,width:0,height:0},this.isIntersecting=!!t.intersectionRect;var e=this.boundingClientRect,n=e.width*e.height,o=this.intersectionRect,r=o.width*o.height;this.intersectionRatio=n?r/n:this.isIntersecting?1:0}function r(t,e){var n,o,r,i=e||{};if("function"!=typeof t)throw new Error("callback must be a function");if(i.root&&1!=i.root.nodeType)throw new Error("root must be an Element");this._checkForIntersections=(n=this._checkForIntersections.bind(this),o=this.THROTTLE_TIMEOUT,r=null,function(){r||(r=setTimeout(function(){n(),r=null},o))}),this._callback=t,this._observationTargets=[],this._queuedEntries=[],this._rootMarginValues=this._parseRootMargin(i.rootMargin),this.thresholds=this._initThresholds(i.threshold),this.root=i.root||null,this.rootMargin=this._rootMarginValues.map(function(t){return t.value+t.unit}).join(" ")}function i(t,e,n,o){"function"==typeof t.addEventListener?t.addEventListener(e,n,o||!1):"function"==typeof t.attachEvent&&t.attachEvent("on"+e,n)}function s(t,e,n,o){"function"==typeof t.removeEventListener?t.removeEventListener(e,n,o||!1):"function"==typeof t.detatchEvent&&t.detatchEvent("on"+e,n)}function a(t){var e;try{e=t.getBoundingClientRect()}catch(t){}return e?(e.width&&e.height||(e={top:e.top,right:e.right,bottom:e.bottom,left:e.left,width:e.right-e.left,height:e.bottom-e.top}),e):{top:0,bottom:0,left:0,right:0,width:0,height:0}}function c(t,e){for(var n=e;n;){if(n==t)return!0;n=l(n)}return!1}function l(t){var e=t.parentNode;return e&&11==e.nodeType&&e.host?e.host:e}}(window,document)},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),n(2);var o=r(n(1));function r(t){return t&&t.__esModule?t:{default:t}}r(n(0));var i=void 0,s=d3.select("#content"),a=d3.select("#scroll"),c=a.select(".scroll__graphic"),l=c.select("#scrollMap"),u=a.select(".scroll__text"),d=u.selectAll(".step"),p=(0,o.default)(),f=(0,o.default)(),h=d3.select("#dist-chart");function y(){var t=d3.select("#dist-chart").node().offsetWidth-0-0,e=50,n=d3.scaleLinear().range([0,t]).domain([0,50]),o=d3.axisBottom().scale(n).tickPadding(0).ticks(5);d3.selectAll(".dist-chart-svg").at("width",t+0+0).at("height",90);var r=d3.selectAll(".g-vis");r.at("transform","translate(0, 20)"),r.selectAll(".bgRect").at("width",t).at("height",e),r.selectAll(".label.less").at("x",0).at("y",65),r.selectAll(".label.more").at("x",t).at("y",65),r.selectAll(".top-zips").at("x",t-5).at("y",-5),r.selectAll(".top-zips-f").at("x",t/4).at("y",65),r.selectAll(".axis.x").at("transform","translate(0,50)").call(o),r.selectAll(".percentline").at("x1",function(t){return n(t.index)}).at("x2",function(t){return n(t.index)})}function g(){var t=Math.floor(.85*window.innerHeight);d.style("height",t+"px"),d.filter(function(t,e){return 0===e}).style("margin-top","-"+window.innerHeight+"px");var e=d3.select("body").node().offsetWidth,n=(u.node().offsetWidth,e);c.style("width",n+"px").style("height",window.innerHeight+"px");var o=c.node().offsetWidth;l.style("width",o+"px").style("height",window.innerHeight+"px"),y(),p.resize()}function v(t){t.index;var e=t.element,n=d3.select(e).select(".city-hed").text().trim();d3.select("#city-select").selectAll("option").prop("selected",function(t,e,o){var r=d3.select(o[e]).text().trim();return n===r})}function b(t){var e=t.index,n=(t.element,t.direction);0===e&&"up"===n&&d3.select("#city-select").selectAll("option").prop("selected",function(t,e){return 0===e})}function m(t){var e;d.classed("is-active",function(e,n){return n===t.index}),0===(e=t.index)&&(i.setPaintProperty("gayborhood-index","fill-opacity",0),i.setPaintProperty("gayborhood-index-MM","fill-opacity",0),i.setPaintProperty("gayborhood-index-FF","fill-opacity",0),i.setPaintProperty("paradeRoute","line-opacity",1),i.setPaintProperty("gay-bars","circle-opacity",0),i.setPaintProperty("gay-bars","circle-stroke-opacity",0)),1===e&&(i.setPaintProperty("gayborhood-index","fill-opacity",0),i.setPaintProperty("gayborhood-index-MM","fill-opacity",0),i.setPaintProperty("gayborhood-index-FF","fill-opacity",0),i.setPaintProperty("paradeRoute","line-opacity",1),i.setPaintProperty("gay-bars","circle-opacity",.7),i.setPaintProperty("gay-bars","circle-stroke-opacity",.7)),2===e&&(i.setPaintProperty("gayborhood-index","fill-opacity",.5),i.setPaintProperty("gayborhood-index-MM","fill-opacity",0),i.setPaintProperty("gayborhood-index-FF","fill-opacity",0),i.setPaintProperty("paradeRoute","line-opacity",1),i.setPaintProperty("gay-bars","circle-opacity",.7),i.setPaintProperty("gay-bars","circle-stroke-opacity",.7)),3===e&&(i.setPaintProperty("gayborhood-index","fill-opacity",0),i.setPaintProperty("gayborhood-index-MM","fill-opacity",.5),i.setPaintProperty("gayborhood-index-FF","fill-opacity",0),i.setPaintProperty("paradeRoute","line-opacity",1),i.setPaintProperty("gay-bars","circle-opacity",.7),i.setPaintProperty("gay-bars","circle-stroke-opacity",.7)),4===e&&(i.setPaintProperty("gayborhood-index","fill-opacity",0),i.setPaintProperty("gayborhood-index-MM","fill-opacity",0),i.setPaintProperty("gayborhood-index-FF","fill-opacity",.5),i.setPaintProperty("paradeRoute","line-opacity",1),i.setPaintProperty("gay-bars","circle-opacity",.7),i.setPaintProperty("gay-bars","circle-stroke-opacity",.7)),l.select("p").text(t.index+1)}function x(){var t,e=this.value;t=d3.select("#"+e+"-link").node(),window.scroll({behavior:"smooth",left:0,top:t.offsetTop-60})}function _(t,e){if(t)throw"error loading data";e.forEach(function(t){t.index=+t.index}),d3.set(e.map(function(t){return t.indexType})).values().forEach(function(t,n){return function(t){var e=t.indexType,n=t.chartIndex,o=t.data,r=h.append("div.g-chart-container"),i=e,s=o.filter(function(t){return t.index>0}).filter(function(t){return t.indexType===i}),a=(r.append("h5").attr("class","g-name").text(i),r.append("div").attr("class","g-chart").append("svg.dist-chart-svg").append("g.g-vis"));a.append("rect.bgRect").attr("x",0).attr("y",0),1===n&&(a.append("text").text("Less certain").attr("class","label less"),a.append("text").text("More certain").attr("class","label more"),a.append("text").text("Castro (CA), 94114").attr("class","top-zips")),0===n&&a.append("text").text("Jamaica Plain (MA), 02130").attr("class","top-zips-f"),a.append("g").attr("class","x axis"),a.selectAll("line.percentline").data(s).enter().append("line").attr("class","percentline").classed("top-value-m",function(t){return"94114"==t.zipcode&&"Same-sex male"==t.indexType}).classed("top-value-f",function(t){return"02130"==t.zipcode&&"Same-sex female"==t.indexType}).attr("y1",0).attr("y2",50)}({indexType:t,chartIndex:n,data:e})}),y()}function w(t){var e=t?s.select(".intro").node().offsetHeight:"auto";d3.selectAll(".loading-wrapper").classed("is-truncated",t),d3.selectAll(".arrow").classed("is-truncated",t),s.st("height",e).classed("is-truncated",t),d3.selectAll(".loading-text").classed("is-truncated",t),t||(i.setPaintProperty("gayborhood-index","fill-opacity",0),i.setPaintProperty("gayborhood-index-MM","fill-opacity",0),i.setPaintProperty("gayborhood-index-FF","fill-opacity",0),i.setPaintProperty("paradeRoute","line-opacity",0),i.setPaintProperty("gay-bars","circle-opacity",0),i.setPaintProperty("gay-bars","circle-stroke-opacity",0))}d3.select(".dist-chart-svg"),e.default={init:function(){d3.csv("assets/data/IndexCitiesCSV.csv",_),w(!0),g(),p.setup({step:".scroll__text .step",debug:!1}).onStepEnter(m),f.setup({step:".city-wrapper",offset:.1}).onStepEnter(v).onStepExit(b),mapboxgl.accessToken="pk.eyJ1IjoiamFkaWVobSIsImEiOiIzTjRUSFZjIn0.sed_QtqpB7m5yFLmK2VV9g",(i=new mapboxgl.Map({container:"scrollMap",style:"mapbox://styles/jadiehm/cji3f7z4n13s52rmz42onwmkx",center:[-73.980539,40.715444],zoom:11,interactive:!1})).scrollZoom.disable(),i.on("load",function(){for(var t,e=i.getStyle().layers,n=void 0,o=0;o<e.length;o++)if("symbol"===e[o].type){n=e[o].id;break}i.addLayer({id:"gayborhood-index",source:{type:"vector",url:"mapbox://jadiehm.indexJoined"},layout:{visibility:"visible"},"source-layer":"original",type:"fill",filter:["has","ZIPS_Ind_8"],paint:{"fill-color":["interpolate",["linear"],["get","ZIPS_Ind_8"],0,"#f6f6f6",4,"#ffb993",10,"#ff9f6e",20,"#fb8548",30,"#f36c21"],"fill-opacity":.5}},n),i.addLayer({id:"gayborhood-index-MM",source:{type:"vector",url:"mapbox://jadiehm.indexJoined"},layout:{visibility:"visible"},"source-layer":"original",type:"fill",filter:["has","ZIPS_Ind_7"],paint:{"fill-color":["interpolate",["linear"],["get","ZIPS_Ind_7"],0,"#f6f6f6",4,"#dcc4ff",10,"#7776b6",20,"#5457a4",30,"#273a92"],"fill-opacity":.5}},n),i.addLayer({id:"gayborhood-index-FF",source:{type:"vector",url:"mapbox://jadiehm.indexJoined"},layout:{visibility:"visible"},"source-layer":"original",type:"fill",filter:["has","ZIPS_Ind_6"],paint:{"fill-color":["interpolate",["linear"],["get","ZIPS_Ind_6"],0,"#f6f6f6",4,"#dcc4ff",10,"#7776b6",20,"#5457a4",30,"#273a92"],"fill-opacity":.5}},n),i.addLayer({id:"gay-bars",type:"circle",source:{type:"vector",url:"mapbox://jadiehm.2zsul8ff"},layout:{visibility:"visible"},paint:{"circle-radius":3,"circle-color":"rgba(1,1,1, 0.7)","circle-stroke-color":"#ffffff","circle-stroke-width":1},"source-layer":"gaybarsMOD-575puu"},n),i.addLayer({id:"paradeRoute",type:"line",source:{type:"vector",url:"mapbox://jadiehm.b4vpcbja"},layout:{visibility:"visible","line-join":"round","line-cap":"round"},paint:{"line-color":"#262626","line-width":2,"line-opacity":1},"source-layer":"Parade_routes"},n),w(!1),(t=document.createElement("script")).type="text/javascript",t.src="https://pudding.cool/assets/scripts/pudding-footer.js",document.head.appendChild(t)}),d3.select("#city-select").on("change",x)},resize:function(){g(),y()}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o={android:function(){return navigator.userAgent.match(/Android/i)},blackberry:function(){return navigator.userAgent.match(/BlackBerry/i)},ios:function(){return navigator.userAgent.match(/iPhone|iPad|iPod/i)},opera:function(){return navigator.userAgent.match(/Opera Mini/i)},windows:function(){return navigator.userAgent.match(/IEMobile/i)},any:function(){return o.android()||o.blackberry()||o.ios()||o.opera()||o.windows()}};e.default=o},function(t,e){var n;n=function(){return this}();try{n=n||Function("return this")()||(0,eval)("this")}catch(t){"object"==typeof window&&(n=window)}t.exports=n},function(t,e,n){(function(e){var n=NaN,o="[object Symbol]",r=/^\s+|\s+$/g,i=/^[-+]0x[0-9a-f]+$/i,s=/^0b[01]+$/i,a=/^0o[0-7]+$/i,c=parseInt,l="object"==typeof e&&e&&e.Object===Object&&e,u="object"==typeof self&&self&&self.Object===Object&&self,d=l||u||Function("return this")(),p=Object.prototype.toString,f=Math.max,h=Math.min,y=function(){return d.Date.now()};function g(t){var e=typeof t;return!!t&&("object"==e||"function"==e)}function v(t){if("number"==typeof t)return t;if(function(t){return"symbol"==typeof t||function(t){return!!t&&"object"==typeof t}(t)&&p.call(t)==o}(t))return n;if(g(t)){var e="function"==typeof t.valueOf?t.valueOf():t;t=g(e)?e+"":e}if("string"!=typeof t)return 0===t?t:+t;t=t.replace(r,"");var l=s.test(t);return l||a.test(t)?c(t.slice(2),l?2:8):i.test(t)?n:+t}t.exports=function(t,e,n){var o,r,i,s,a,c,l=0,u=!1,d=!1,p=!0;if("function"!=typeof t)throw new TypeError("Expected a function");function b(e){var n=o,i=r;return o=r=void 0,l=e,s=t.apply(i,n)}function m(t){var n=t-c;return void 0===c||n>=e||n<0||d&&t-l>=i}function x(){var t=y();if(m(t))return _(t);a=setTimeout(x,function(t){var n=e-(t-c);return d?h(n,i-(t-l)):n}(t))}function _(t){return a=void 0,p&&o?b(t):(o=r=void 0,s)}function w(){var t=y(),n=m(t);if(o=arguments,r=this,c=t,n){if(void 0===a)return function(t){return l=t,a=setTimeout(x,e),u?b(t):s}(c);if(d)return a=setTimeout(x,e),b(c)}return void 0===a&&(a=setTimeout(x,e)),s}return e=v(e)||0,g(n)&&(u=!!n.leading,i=(d="maxWait"in n)?f(v(n.maxWait)||0,e):i,p="trailing"in n?!!n.trailing:p),w.cancel=function(){void 0!==a&&clearTimeout(a),l=0,o=c=r=a=void 0},w.flush=function(){return void 0===a?s:_(y())},w}}).call(this,n(5))},function(t,e,n){"use strict";var o=s(n(6)),r=s(n(4)),i=s(n(3));function s(t){return t&&t.__esModule?t:{default:t}}var a=d3.select("body"),c=0;a.classed("is-mobile",r.default.any()),window.addEventListener("resize",(0,o.default)(function(){var t=a.node().offsetWidth;c!==t&&(c=t,i.default.resize())},150)),function(){if(a.select("header").classed("is-sticky")){var t=a.select(".header__menu"),e=a.select(".header__toggle");e.on("click",function(){var n=t.classed("is-visible");t.classed("is-visible",!n),e.classed("is-visible",!n)})}}(),i.default.init()}]);