(function () {

    'use strict';

    angular
        .module('app')
        .controller('DoksCtrl', DoksCtrl);

    DoksCtrl.$inject = ['$rootScope','$timeout','$modal', 'DoksService', '$state', '$stateParams'];

    /**
     * Handles all chat interaction.
     */
    function DoksCtrl($rootScope, $timeout, $modal, DoksService, $state, $stateParams) {
        var ctrl = this;
        ctrl.currentRoom = $stateParams.roomId;

        /**
         * Fetch all doks from the server.
         */
        function fetchAllDoks() {
            DoksService.getAllFiles().then(function(success) {
                ctrl.dokList = success;
            }, function(error) {
                //@todo error handling
            });
        }

        /**
         * Redirects to the file-view state and passes the file-id.
         * @param  {int} fileId [Database id of the file]
         */
        function goToFile(fileId) {
            $state.go('pdf', fileId);
        }

        /**
         * Opens the room-modal with all the needed data of
         * the clicked room.
         * @param  {object} room [Object with all data from the clicked room]
         * @return {[type]}      [description]
         */
        function openUploadModal(room) {

            var modalInstance = $modal.open({
                templateUrl: 'upload-modal.html',
                controller: function($scope) {
                    $scope.room = room;
                    $scope.onFileSelect = function($files) {
                        // upload the selected file
                        DoksService.uploadFile($files[0], ctrl.currentRoom).then(function(success) {
                            ctrl.dokList.push(success);
                        }, function() {
                        });
                    }
                },
                size: 'sm'
            });
        }


        //////////////////////

        angular.extend(ctrl, {
            dokList: {},

            goToFile: goToFile,
            openUploadModal: openUploadModal
        });

        //////////////////////

        fetchAllDoks();


    }

})();