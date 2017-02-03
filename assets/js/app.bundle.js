webpackJsonp([0],[
/* 0 */,
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var angular = __webpack_require__(0);

angular.module('giphm').controller('GiphmController', __webpack_require__(4));


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var angular = __webpack_require__(0);

angular.module('giphm').directive('carousel', __webpack_require__(5));


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var angular = __webpack_require__(0);

angular.module('giphm').service('GiphyService', __webpack_require__(6));


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


GiphmController.$inject = ['GiphyService'];
function GiphmController($scope) {
    var ctrl = this;
    ctrl.query = 'Adventure time';
    ctrl.result = '';
    ctrl.MAXGIFS = 10;
    ctrl.reload = getGifs;

    getGifs();

    function getGifs() {
        var query = formatQuery(ctrl.query);
        $scope.getRandom(query).then(function(data) {
            ctrl.result = data;
        });
    }

    function formatQuery(q) {
        // replace spaces with +
        return q.replace(/\s+/g, '+')
    }
}

module.exports = GiphmController;


/***/ }),
/* 5 */
/***/ (function(module, exports) {

function CarouselDirective() {
    return {
        restrict: 'E',
        link: function (scope, element, attrs) {
            var ctrl = scope.ctrl;
            scope.$watch('ctrl.result', function (data) {
                //todo handle error
                if (ctrl.query && data && data.statusText == "OK") {
                    var gifs = data.data.data;
                    console.log(gifs);
                    element.html('');
                    for (var i = 0; i < ctrl.MAXGIFS; i++) {
                        var downsized_small = gifs[i].images.downsized_small.mp4;
                        var fixed_width_small_still = gifs[i].images.fixed_width_small_still.url;
                        element.append('<span class="c-gif"><div style="background-image: url(' + fixed_width_small_still + ')"></div><span></span><video autoplay loop><source src="' + downsized_small + '" type="video/mp4"></video></span>');
                    }
                }
            });
            scope.$watch('ctrl.query', function (query) {
                ctrl.reload(query)
            });
        }
    }
}

module.exports = CarouselDirective;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


GiphyService.$inject = ['$http'];
function GiphyService($http) {
    var _this = this;
    _this.getRandom = function getRandom(query) {
        const url = 'http://api.giphy.com/v1/gifs/search?api_key=dc6zaTOxFJmzC&q=' + query;
        return $http.get(url);
    }
}

module.exports = GiphyService;


/***/ }),
/* 7 */,
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

angular.module('giphm', []);

__webpack_require__(2);
__webpack_require__(3);
__webpack_require__(1);


/***/ })
],[8]);