(function () {

    'use strict';

    angular
        .module('app')
        .controller('RoomsCtrl', RoomsCtrl);

    RoomsCtrl.$inject = ['RoomsService','SocketService','$rootScope','$timeout', '$modal', '$state', 'localStorageService'];

    /**
     * Handles all chat interaction.
     */
    function RoomsCtrl(RoomsService, SocketService, $rootScope, $timeout, $modal, $state, localStorageService) {
        var ctrl = this;
        var SonicServer = null;

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

        function hasAudioSupport() {
            var audioContext = window.audioContext || new webkitAudioContext() || null;
            var audioMedia = navigator.webkitGetUserMedia || null;
            console.log(audioContext);
            console.log(audioMedia);
            if(!audioContext) {
                return alert('No audio support');
            }
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
         * Sends a save-request to the server.
         */
        function saveRoom() {
            // validate input
            if(!ctrl.room.name || ctrl.room.name.length === 0) {
                return showToast('Please enter a valid name for your room');
            }

            RoomsService.submitNewRoom(ctrl.room.name).then(function(success) {
                ctrl.roomCreated = success.room;
            }, function(error) {
                return showToast(error);
            });
        }

        /**
         * Show an error toast.
         * @param  {string} msg [Error msg]
         */
        function showToast(msg){
            // show an error toast and break
            ctrl.errorMsg = msg;
            ctrl.showError = true;

            // hide the toast after 5000ms
            $timeout(function() {
                ctrl.showError = false;
            }, 5000);
        }

        /**
         * Starts broadcasting room-audio transmissions.
         * @return {[type]} [description]
         */
        function startBroadcasting() {
            // try to start the sonic server and listen for broadcasts
            try {
                var SonicSocket = new window.SonicSocket({
                    alphabet: '0123456789',
                    coder : new SonicCoder({
                        alphabet: '0123456789',
                        freqMax: 18000,
                        freqMin: 15000
                    })
                });
                console.log(ctrl.roomCreated);

                SonicSocket.send(ctrl.roomCreated.id);
            }
            catch(err) {
                return showToast(err);
            }
        }

        /**
         * Starts listening for room-audio transmissions.
         */
        function startListening() {
            // try to start the sonic server and listen for broadcasts
            try {
                SonicServer = new window.SonicServer({
                    alphabet: '0123456789',
                    debug: true,
                    coder : new SonicCoder({
                        freqMax: 18000,
                        freqMin: 15000
                    })
                });
                SonicServer.start();
                SonicServer.on('message', onIncomingChat);
            }
            catch(err) {
                return showToast(err);
            }

            ctrl.isListening = true;
        }

        /**
         * Stops listening fro room-audio transmissions.
         */
        function stopListening() {
            // try to stop the sonic server
            try {
                SonicServer.stop();
            }
            catch(err) {
                return alert(err);
            }

            ctrl.isListening = false;
        }

        //////////////////////

        angular.extend(ctrl, {
            hasSignal: false,
            isListening: false,
            prof: localStorageService.get('prof'),
            roomCreated: null,
            roomList: {},
            room: {
                name: '',
                location: ''
            },

            openRoomModal: openRoomModal,
            saveRoom: saveRoom,
            startBroadcasting: startBroadcasting,
            startListening: startListening,
            stopListening: stopListening
        });

        //////////////////////

        initChat();
        hasAudioSupport();

        console.log(ctrl.prof);
    }

})();