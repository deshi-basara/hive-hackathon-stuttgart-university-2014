(function() {
    'use strict';
    angular
        .module('app')
        .directive('preLoader', preLoaderDirective);

    function preLoaderDirective() {
        var directive = {
            restrict: 'A',
            templateUrl: 'scripts/directives/tpl/preLoader.html',
            link: link,
            scope: true,
            controller: function($scope) {
                $scope.show = true;
            }
        };
        return directive;

        /////////////////

        function link(scope, element, attrs) {
            // listen for show/hide event
            scope.$on('loader.hide', function() {
                scope.show = false;
            });
            scope.$on('loader.show', function() {
                scope.show = true;
            });
        };
    }


})();