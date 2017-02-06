var CarouselComponent = {
        template: `
            <i class="fa fa-cog fa-spin o-loading-icon hidden"></i>
            <div class="c-main__actions" style="--accent-color: {{$ctrl.color}}">
                <input type="text" ng-model="$ctrl.query" ng-model-options="{ debounce: 800 }" ng-change="$ctrl.reload()" placeholder="Search...">
                <i class="fa fa-search"></i>
                <i class="fa fa-refresh" ng-click="$ctrl.rollDice()"></i>
                <span class="c-query">{{$ctrl.query}}</span>
            </div>
            
            <ul class="c-carousel">
                <li ng-repeat="gif in $ctrl.result" class="c-gif">
                    <div style="background-image: url({{gif.bgImage}})"></div>
                    <span></span>
                    <img ng-if="gif.type === 'gif'" src="{{gif.url}}" alt="{{$ctrl.query}} GIF" class="c-gif__media">
                    <video ng-if="gif.type === 'mp4'" class="c-gif__media" autoplay loop muted><source src="{{gif.url}}" type="video/mp4"></video>
                </li>
            </ul>
        `,
        controller: require('../controllers/carousel.controller')
};

module.exports = CarouselComponent;