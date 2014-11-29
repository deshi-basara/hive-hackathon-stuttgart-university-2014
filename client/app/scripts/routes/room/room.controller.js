(function () {

    'use strict';

    angular
        .module('app')
        .controller('RoomCtrl', RoomCtrl);

    RoomCtrl.$inject = ['$stateParams','RoomService','SocketService','$rootScope','$timeout'];

    /**
     * Handles all chat interaction.
     */
    function RoomCtrl($stateParams, RoomsService, SocketService, $rootScope, $timeout) {
        var ctrl = this;

        console.log($stateParams);


        //////////////////////

        angular.extend(ctrl, {
        });

        //////////////////////

    }

})();