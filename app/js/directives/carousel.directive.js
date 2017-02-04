function CarouselDirective() {
    return {
        link: function (scope, element, attrs) {
            var ctrl = scope.ctrl;
            scope.$watch('ctrl.result', function (data) {
                //todo handle error
                if (ctrl.query && data && data.statusText == "OK") {
                    var gifs = data.data.data;
                    element.html('');
                    for (var i = 0; i < gifs.length; i++) {
                        var gif;
                        if (ctrl.isDesktop) {
                            // Render as .mp4 for desktop
                            gif = '<video autoplay loop muted><source src="' + gifs[i].images.downsized_small.mp4 + '" type="video/mp4"></video>';
                        }
                        else {
                            // Render as .gif for mobile/tablet devices
                            gif = '<img src="' + gifs[i].images.fixed_height.url + '" alt="Result #' + i + '">';
                        }
                        var bgImage = gifs[i].images.fixed_width_small_still.url;
                        element.append('<li class="c-gif"><div style="background-image: url(' + bgImage + ')"></div><span></span> ' + gif + '</li>');
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
