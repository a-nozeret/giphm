'use strict';

GiphyService.$inject = ['$http'];
function GiphyService($http) {
    var _this = this;
    _this.getRandom = function getRandom(query) {
        const url = 'https://api.giphy.com/v1/gifs/search?api_key=dc6zaTOxFJmzC&q=' + query;
        return $http.get(url);
    }
}

module.exports = GiphyService;
