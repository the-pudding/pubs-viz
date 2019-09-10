parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"or4r":[function(require,module,exports) {
var global = arguments[3];
var t=arguments[3],e="Expected a function",n=NaN,r="[object Symbol]",i=/^\s+|\s+$/g,o=/^[-+]0x[0-9a-f]+$/i,u=/^0b[01]+$/i,f=/^0o[0-7]+$/i,c=parseInt,a="object"==typeof t&&t&&t.Object===Object&&t,s="object"==typeof self&&self&&self.Object===Object&&self,v=a||s||Function("return this")(),l=Object.prototype,p=l.toString,b=Math.max,m=Math.min,y=function(){return v.Date.now()};function d(t,n,r){var i,o,u,f,c,a,s=0,v=!1,l=!1,p=!0;if("function"!=typeof t)throw new TypeError(e);function d(e){var n=i,r=o;return i=o=void 0,s=e,f=t.apply(r,n)}function g(t){var e=t-a;return void 0===a||e>=n||e<0||l&&t-s>=u}function O(){var t=y();if(g(t))return x(t);c=setTimeout(O,function(t){var e=n-(t-a);return l?m(e,u-(t-s)):e}(t))}function x(t){return c=void 0,p&&i?d(t):(i=o=void 0,f)}function T(){var t=y(),e=g(t);if(i=arguments,o=this,a=t,e){if(void 0===c)return function(t){return s=t,c=setTimeout(O,n),v?d(t):f}(a);if(l)return c=setTimeout(O,n),d(a)}return void 0===c&&(c=setTimeout(O,n)),f}return n=h(n)||0,j(r)&&(v=!!r.leading,u=(l="maxWait"in r)?b(h(r.maxWait)||0,n):u,p="trailing"in r?!!r.trailing:p),T.cancel=function(){void 0!==c&&clearTimeout(c),s=0,i=a=o=c=void 0},T.flush=function(){return void 0===c?f:x(y())},T}function j(t){var e=typeof t;return!!t&&("object"==e||"function"==e)}function g(t){return!!t&&"object"==typeof t}function O(t){return"symbol"==typeof t||g(t)&&p.call(t)==r}function h(t){if("number"==typeof t)return t;if(O(t))return n;if(j(t)){var e="function"==typeof t.valueOf?t.valueOf():t;t=j(e)?e+"":e}if("string"!=typeof t)return 0===t?t:+t;t=t.replace(i,"");var r=u.test(t);return r||f.test(t)?c(t.slice(2),r?2:8):o.test(t)?n:+t}module.exports=d;
},{}],"WEtf":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var r={android:function(){return navigator.userAgent.match(/Android/i)},blackberry:function(){return navigator.userAgent.match(/BlackBerry/i)},ios:function(){return navigator.userAgent.match(/iPhone|iPad|iPod/i)},opera:function(){return navigator.userAgent.match(/Opera Mini/i)},windows:function(){return navigator.userAgent.match(/IEMobile/i)},any:function(){return r.android()||r.blackberry()||r.ios()||r.opera()||r.windows()}},e=r;exports.default=e;
},{}],"xZJw":[function(require,module,exports) {
"use strict";function n(n){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{},o=Object.keys(r);"function"==typeof Object.getOwnPropertySymbols&&(o=o.concat(Object.getOwnPropertySymbols(r).filter(function(n){return Object.getOwnPropertyDescriptor(r,n).enumerable}))),o.forEach(function(e){t(n,e,r[e])})}return n}function t(n,t,e){return t in n?Object.defineProperty(n,t,{value:e,enumerable:!0,configurable:!0,writable:!0}):n[t]=e,n}Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=u;var e={color:"color-noun",royalty:"royalty-noun",inn:"noun-inn",noun:"noun-noun"};function r(n){return n.replace(/\w\S*/g,function(n){return n.charAt(0).toUpperCase()+n.substr(1).toLowerCase()})}function o(t){return new Promise(function(o,u){d3.csv("assets/data/".concat(t)).then(function(t){var u=t.map(function(t){return n({},t,{pub:r(t.pub),count:+t.count,category:e[t.tag]})});o(u)}).catch(u)})}function u(){var n=[o("pub-counts.csv")];return Promise.all(n)}
},{}],"n/u7":[function(require,module,exports) {
d3.selection.prototype.puddingCountTable=function(t){var n=this.nodes().map(function(n){var e=d3.select(n),r=e.datum(),u=null,a={init:function(){!function(t){u=r.filter(function(n){return n.category==t})}(t);var n=e.append("div").attr("class","g-vis").selectAll(".pub").data(u).enter().append("div").attr("class","table-row");n.append("p").text(function(t){return t.pub}).attr("class","table-pub-name"),n.append("p").text(function(t){return t.count}).attr("class","table-pub-count"),a.resize(),a.render()},resize:function(){return a},render:function(){return a},data:function(t){return arguments.length?(r=t,e.datum(r),a.render(),a):r}};return a.init(),a});return n.length>1?n:n.pop()};
},{}],"TAPd":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var e,l=c(require("./load-data"));function c(e){return e&&e.__esModule?e:{default:e}}require("./pudding-chart/count-table");var n=null,o=null,t=d3.select("#color-noun button"),s=d3.select("#royalty-noun button"),i=d3.select("#noun-inn button"),a=d3.select("#noun-noun button"),u=d3.selectAll(".combo-block button"),d=d3.selectAll(".combo-block fade"),r=d3.selectAll(".nav__choices p");function b(e,l){var c=d3.selectAll("#".concat(l," .pub-counts"));o=c.datum(e).puddingCountTable(l)}function p(){var e=d3.select(this);r.classed("is-selected",!1),e.classed("is-selected",!0)}function v(){var e=this.parentElement.id;u.classed("is-visible",!0),d3.select(this).classed("is-visible",!1),d.classed("is-visible",!0),d3.select("#".concat(e," .fade")).classed("is-visible",!1),d3.selectAll("combo-block").classed("is-visible",!0);var l=d3.select("#".concat(e," .pub-counts"));d3.selectAll(".pub-counts").classed("is-visible",!1),l.classed("is-visible",!0)}function f(){mapboxgl.accessToken="pk.eyJ1IjoiZG9jazQyNDIiLCJhIjoiY2pjazE5eTM2NDl2aDJ3cDUyeDlsb292NiJ9.Jr__XbmAolbLyzPDj7-8kQ",e=new mapboxgl.Map({container:"pubsMap",style:"mapbox://styles/dock4242/cjz1lxn1i17571cpdemlrh3e5",center:[-4.503,54.385],zoom:6,interactive:!0})}function k(){}function m(){(0,l.default)().then(function(e){b(n=e[0],"color-noun"),b(n,"royalty-noun"),b(n,"noun-inn"),b(n,"noun-noun"),f(),t.on("click",v),s.on("click",v),i.on("click",v),a.on("click",v),r.on("click",p)}).catch(console.error)}var y={init:m,resize:k};exports.default=y;
},{"./load-data":"xZJw","./pudding-chart/count-table":"n/u7"}],"v9Q8":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var e=[{image:"2018_02_stand-up",url:"2018/02/stand-up",hed:"The Structure of Stand-Up Comedy"},{image:"2018_04_birthday-paradox",url:"2018/04/birthday-paradox",hed:"The Birthday Paradox Experiment"},{image:"2018_11_boy-bands",url:"2018/11/boy-bands",hed:"Internet Boy Band Database"},{image:"2018_08_pockets",url:"2018/08/pockets",hed:"Women’s Pockets are Inferior"}],t=null;function n(e,t){var n=document.getElementsByTagName("script")[0],o=document.createElement("script");return o.src=e,o.async=!0,n.parentNode.insertBefore(o,n),t&&"function"==typeof t&&(o.onload=t),o}function o(t){var n=new XMLHttpRequest,o=Date.now(),r="https://pudding.cool/assets/data/stories.json?v=".concat(o);n.open("GET",r,!0),n.onload=function(){if(n.status>=200&&n.status<400){var o=JSON.parse(n.responseText);t(o)}else t(e)},n.onerror=function(){return t(e)},n.send()}function r(e){return"\n\t<a class='footer-recirc__article' href='https://pudding.cool/".concat(e.url,"' target='_blank'>\n\t\t<img class='article__img' src='https://pudding.cool/common/assets/thumbnails/640/").concat(e.image,".jpg' alt='").concat(e.hed,"'>\n\t\t<p class='article__headline'>").concat(e.hed,"</p>\n\t</a>\n\t")}function a(){var e=window.location.href,n=t.filter(function(t){return!e.includes(t.url)}).slice(0,4).map(r).join("");d3.select(".pudding-footer .footer-recirc__articles").html(n)}function s(){var e,t,o,r,a;e=document,t="script",o="facebook-jssdk",a=e.getElementsByTagName(t)[0],e.getElementById(o)||((r=e.createElement(t)).id=o,r.src="//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.7",a.parentNode.insertBefore(r,a)),n("https://platform.twitter.com/widgets.js")}function c(){o(function(e){t=e,a(),s()})}var i={init:c};exports.default=i;
},{}],"epB2":[function(require,module,exports) {
"use strict";var e=l(require("lodash.debounce")),i=l(require("./utils/is-mobile")),s=l(require("./graphic")),t=l(require("./footer"));function l(e){return e&&e.__esModule?e:{default:e}}var d=d3.select("body"),r=0;function a(){var e=d.node().offsetWidth;r!==e&&(r=e,s.default.resize())}function n(){if(d.select("header").classed("is-sticky")){var e=d.select(".header__menu"),i=d.select(".header__toggle");i.on("click",function(){var s=e.classed("is-visible");e.classed("is-visible",!s),i.classed("is-visible",!s)})}}function u(){d.classed("is-mobile",i.default.any()),window.addEventListener("resize",(0,e.default)(a,150)),n(),s.default.init(),t.default.init()}u();
},{"lodash.debounce":"or4r","./utils/is-mobile":"WEtf","./graphic":"TAPd","./footer":"v9Q8"}]},{},["epB2"], null)