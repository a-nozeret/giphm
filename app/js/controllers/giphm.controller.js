'use strict';

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
