'use strict';

GiphmController.$inject = ['GiphyService'];
function GiphmController($scope) {
    var ctrl = this;
    ctrl.isDesktop = typeof window.orientation === 'undefined';
    ctrl.query = 'Artificial Intelligence';
    ctrl.result = '';
    ctrl.MAXGIFS = 10;
    ctrl.reload = getGifs;

    getGifs();

    function getGifs() {
        var query = formatQuery(ctrl.query);
        $scope.getRandom(query, ctrl.MAXGIFS).then(function(data) {
            ctrl.result = data;
        });
    }

    function formatQuery(q) {
        // replace spaces with +
        return q.replace(/\s+/g, '+')
    }
}

module.exports = GiphmController;
