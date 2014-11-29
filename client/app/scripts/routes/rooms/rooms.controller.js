(function () {

    'use strict';

    angular
        .module('app')
        .controller('RoomsCtrl', RoomsCtrl);

    RoomsCtrl.$inject = ['SocketService','$timeout'];

    /**
     * Handles all chat interaction.
     */
    function RoomsCtrl(SocketService, $timeout) {
        var ctrl = this;

        /**
         * Check if the user is already connected to the socket
         * and joins if connected.
         */
        function initChat() {
            // not connected to the socket
            if(!SocketService.socket) {
                /*SocketService.connect().then(function() {

                }, function() {

                });*/
            }
            else {
                // room bootstrapping
                fetchAllRooms();
            }
        }

        /**
         * Fetches all available rooms from the socket.
         * @return {[type]} [description]
         */
        function fetchAllRooms() {
            SocketService.getAllRooms().then(function(rooms) {
                console.log(rooms);
            });
        }

        //////////////////////

        angular.extend(ctrl, {
            inputMsg: {}
        });

        //////////////////////
        
        initChat();
    }

})();