(function () {

    'use strict';

    angular
        .module('app')
        .controller('RoomsCtrl', RoomsCtrl);

    RoomsCtrl.$inject = ['RoomsService','SocketService','$rootScope','$timeout', '$modal'];

    /**
     * Handles all chat interaction.
     */
    function RoomsCtrl(RoomsService, SocketService, $rootScope, $timeout, $modal) {
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
                ctrl.roomList = rooms;

                $timeout(function() {
                    $rootScope.$broadcast('loader.hide');
                }, 500);

            }, function(error) {

            });
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
                        //@todo redirect to the selected room
                        modalInstance.close();
                    }
                },
                size: 'sm'
            });

        }

        //////////////////////

        angular.extend(ctrl, {
            roomList: {},

            openRoomModal: openRoomModal
        });

        //////////////////////

        initChat();
    }

})();