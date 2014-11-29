(function () {

    'use strict';

    angular
        .module('app')
        .controller('ChatCtrl', ChatCtrl);

    ChatCtrl.$inject = ['SocketService','$timeout'];

    /**
     * Handles all chat interaction.
     */
    function ChatCtrl(SocketService, $timeout) {
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
        }

        //////////////////////

        angular.extend(ctrl, {
            inputMsg: {},

            submitMsg: submitMsg
        });
    }

})();