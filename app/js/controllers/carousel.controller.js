'use strict';

CarouselController.$inject = ['GiphyService'];
function CarouselController($scope) {

    /// Set base variables and constants ///
    let ctrl = this;
    ctrl.colors     = getShuffledData('colors');
    ctrl.queries    = getShuffledData('queries');

    ctrl.isDesktop  = typeof window.orientation === 'undefined';
    ctrl.query      = current('queries');
    ctrl.color      = current('colors');
    ctrl.result     = [];
    ctrl.MAXGIFS    = 10;
    ctrl.reload     = getGifs;
    ctrl.next       = nextElement;
    ctrl.rollDice   = rollDice;

    /// Initialize ///
    getGifs();

    ///

    /// Methods ///
    function getGifs() {
        let query = formatQuery(ctrl.query);
        $scope.getRandom(query, ctrl.MAXGIFS).then(function(data) {
            if (data && data.statusText == "OK") {
                ctrl.result = formatData(data.data.data);
            }
        });
    }

    function formatQuery(q) {
        // Replace spaces with +
        return q.replace(/\s+/g, '+')
    }

    function formatData(data) {
        // Parse response
        let gifs = [];
        for (let i = 0; i < data.length; i++) {
            let gif = {};
            if (ctrl.isDesktop) {
                // Render as .mp4 for desktop
                gif.type = 'mp4';
                gif.url =  data[i].images.downsized_small.mp4;
            }
            else {
                // Render as .gif for mobile/tablet devices
                gif.type = 'gif';
                gif.url =  data[i].images.fixed_height.url;
            }
            gif.bgImage = data[i].images.fixed_width_small_still.url;
            gifs.push(gif);
        }
        return gifs
    }

    function rollDice() {
        // Update color and query
        ctrl.query = ctrl.next(ctrl.queries);
        ctrl.color = ctrl.next(ctrl.colors);
        getGifs();
    }

    function nextElement(elements) {
        // Increments index (or reset to zero), return next element
        elements.index = elements.index < elements.data.length - 1 ? ++elements.index : 0;
        return elements.data[elements.index]
    }

    function current(element) {
        return ctrl[element].data[ctrl[element].index]
    }

    function getShuffledData(element) {
        // Get data, shuffle it, format it in an object with index for current element
        let data = require('../data/' + element);
        return {
            data: shuffle(data),
            index: 0
        }
    }

    function shuffle(array) {
        // Taken from: http://stackoverflow.com/a/2450976/7326166
        let currentIndex = array.length, temporaryValue, randomIndex;
        while (0 !== currentIndex) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
        return array;
    }
}

module.exports = CarouselController;
