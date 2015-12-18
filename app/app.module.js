(function () {
    'use strict';

    angular
      .module('app', [
        // Angular modules.
        'ngRoute',

        // Third party modules.
        'firebase',

         //Custom modules.
        'app.core',
        'app.game'
      ])
      .config(['$routeProvider', configFunction])
      .run(runFunction, ['$rootScope', '$location']);

    //configFunction.$inject = ['$routeProvider'];

    function configFunction($routeProvider) {
        $routeProvider.otherwise({
            redirectTo: '/'
        });
    }

    // runFunction.$inject = ['$rootScope', '$location'];

    function runFunction($rootScope, $location) {
        $rootScope.$on('$routeChangeError', function (event, next, previous, error) {

        });
    }

})();