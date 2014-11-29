(function () {

    'use strict';

    angular
        .module('app')
        .controller('DoksCtrl', DoksCtrl);

    DoksCtrl.$inject = ['$stateParams','RoomService','SocketService','$rootScope','$timeout'];

    /**
     * Handles all chat interaction.
     */
    function DoksCtrl($stateParams, RoomsService, SocketService, $rootScope, $timeout) {
        var ctrl = this;

        console.log($stateParams);


        //////////////////////

        angular.extend(ctrl, {
        });

        //////////////////////

    }

})();