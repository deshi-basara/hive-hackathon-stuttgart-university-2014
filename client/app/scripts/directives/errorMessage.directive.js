(function() {
    'use strict';
    angular
    .module('app')
    .directive('errorMessage', showErrorMessage);
     
    function showErrorMessage() {
        var directive = {
            transclude: true,
            templateUrl: 'scripts/directives/tpl/errorMessage.html',
            restrict: 'E'
        }
        return directive;
    };
})();