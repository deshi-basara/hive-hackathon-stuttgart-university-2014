(function () {

    'use strict';

    angular
        .module('app')
        .controller('RoomsCtrl', RoomsCtrl);

    RoomsCtrl.$inject = ['RoomsService','SocketService','$rootScope','$timeout', '$modal', '$state'];

    /**
     * Handles all chat interaction.
     */
    function RoomsCtrl(RoomsService, SocketService, $rootScope, $timeout, $modal, $state) {
        var ctrl = this;

        /**
         * Check if the user is already connected to the socket
         * and joins if connected.
         */
        function initChat() {
            // not connected to the socket
            if(SocketService.socket) {
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
            RoomsService.getAllRooms().then(function(rooms) {
                console.log(rooms);

                ctrl.roomList = rooms;

                $timeout(function() {
                    $rootScope.$broadcast('loader.hide');
                }, 500);

            }, function(error) {

            });
        }

        /**
         * Is called when the SonicServer receives a broadcast
         * @param  {string} message [Broadcast message]
         */
        function onIncomingChat(message) {
            console.log(message);
        }

        /**
         * Opens the room-modal with all the needed data of
         * the clicked room.
         * @param  {object} room [Object with all data from the clicked room]
         * @return {[type]}      [description]
         */
        function openRoomModal(room) {

            var modalInstance = $modal.open({
                templateUrl: 'room-modal.html',
                controller: function($scope) {
                    $scope.room = room;
                    $scope.ok = function() {
                        modalInstance.close();
                        //@todo redirect to the selected room
                        $state.go('room.chat', {roomId: 1})
                    }
                },
                size: 'sm'
            });
        }

        /**
         * Start listening for room-audio transmissions.
         */
        var ALPHABET = ' abcdefghijklmnopqrstuvwxyz';
        function startListening() {
            // try to start the sonic server and listen for broadcasts
            try {
                var SonicServer = new window.SonicServer({alphabet: ALPHABET, debug: true});
                SonicServer.start();
                SonicServer.on('message', onIncomingChat);
            }
            catch(err) {
                return alert(err);
            }
        }

        //////////////////////

        angular.extend(ctrl, {
            hasSignal: false,
            roomList: {},

            openRoomModal: openRoomModal,
            startListening: startListening
        });

        //////////////////////

        initChat();
    }

})();