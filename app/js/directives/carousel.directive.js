function CarouselDirective() {
    return {
        restrict: 'E',
        link: function (scope, element, attrs) {
            var ctrl = scope.ctrl;
            scope.$watch('ctrl.result', function (data) {
                //todo handle error
                if (ctrl.query && data && data.statusText == "OK") {
                    var gifs = data.data.data;
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
