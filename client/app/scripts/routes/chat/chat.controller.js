(function () {

    'use strict';

    angular
        .module('app')
        .controller('ChatCtrl', ChatCtrl);

    ChatCtrl.$inject = ['$scope','$stateParams','SocketService','$timeout'];

    /**
     * Handles all chat interaction.
     */
    function ChatCtrl($scope, $stateParams, SocketService, $timeout) {
        var ctrl = this;


        function addMsg() {

        }

        /**
         * Check if the user is already connected to the socket
         * and joins if connected.
         */
        function initChat() {

            // not connected to the socket
            if(!SocketService.socket) {
                // try again
                SocketService.connect().then(function() {
                    // success, initialize chat
                    initChat();
                }, function() {

                });
            }
            else {
                var currentRoom = $stateParams.roomId;
                var left = true; // sets the side of our msg in the chat

                // join the current room
                SocketService.joinRoom(currentRoom);
                // get all connected users
                SocketService.getRoomInfo(currentRoom, function(users) {
                    ctrl.connectedUsers = users;
                });
                // listen for messages
                SocketService.getMsgs(function(msgObj) {
                    if(left) { // put on the left side
                        msgObj.side = 'left';
                        left = false;
                    }
                    else { // put on the right side
                        msgObj.side = 'right';
                        left = true;
                    }

                    ctrl.allEvents.push(msgObj);
                    console.log(ctrl.allEvents);
                    $scope.$apply();
                });

            }

        }

        /**
         * Submits the input-message to the room.
         */
        function submitMsg() {
            // only submit messages
            if(ctrl.inputMsg.length > 0) {
                SocketService.submitMsg(ctrl.inputMsg);

                // empty the message box
                ctrl.inputMsg = '';
            }
        }

        //////////////////////

        angular.extend(ctrl, {
            allEvents: [],
            connectedUsers: [],
            inputMsg: '',

            submitMsg: submitMsg
        });

        /////////////////////

        initChat();
    }

})();