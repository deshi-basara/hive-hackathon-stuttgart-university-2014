(function () {

    'use strict';

    angular
        .module('app')
        .controller('DoksCtrl', DoksCtrl);

    DoksCtrl.$inject = ['$rootScope','$timeout','$modal', 'DoksService', '$state'];

    /**
     * Handles all chat interaction.
     */
    function DoksCtrl($rootScope, $timeout, $modal, DoksService, $state) {
        var ctrl = this;

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
            //@todo real redirect
            //$state.go('')
            alert('go to: '+fileId);
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
                        $scope.file = $files[0];

                        // upload the selected file
                        DoksService.uploadFile($scope.file).then(function() {
                            modalInstance.close();

                            return fetchAllDoks();
                        }, function() {
                            return showToast('An error during file upload occured');
                        });
                    }
                },
                size: 'sm'
            });
        }

        function showToast(msg){
            // show an error toast and break
            ctrl.errorMsg = msg;
            ctrl.showError = true;

            // hide the toast after 5000ms
            $timeout(function() {
                ctrl.showError = false;
            }, 5000);  
        }


        //////////////////////

        angular.extend(ctrl, {
            dokList: {},

            goToFile: goToFile,
            openUploadModal: openUploadModal
        });

        //////////////////////

        //openUploadModal();
        fetchAllDoks();


    }

})();