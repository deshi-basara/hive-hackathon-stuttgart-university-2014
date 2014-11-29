(function () {

    'use strict';

    angular
        .module('app')
        .controller('DoksCtrl', DoksCtrl);

    DoksCtrl.$inject = ['$rootScope','$timeout','$modal', 'DoksService'];

    /**
     * Handles all chat interaction.
     */
    function DoksCtrl($rootScope, $timeout, $modal, DoksService) {
        var ctrl = this;

        /**
         * Is called when files were selected for uploading.
         * @param  {[Array]} $file  [Array of files selected]
         * @return {[type]}         [description]
         */
        function onFileSelect($files) {
            console.log('selected');

            return console.log($files);

            // inject files into the view
            /*ctrl.filesInUploadQueue = $files;

            // foreach file start an upload
            for(var i = 0; i < ctrl.filesInUploadQueue.length; i++) {

                // set the progress to zero and the status
                ctrl.filesInUploadQueue[i].progress = parseInt(0);
                ctrl.filesInUploadQueue[i].status = 'Uploading';

                // upload the current file
                JobService.uploadFile(ctrl.filesInUploadQueue[i]).then(function(success) {


                }, function(error, status) {

                    // server not available
                    if(status === null) {
                        return SweetAlert.swal('Der Upload-Server ist nicht erreichbar');
                    }

                }, null);
            }*/
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
                        DoksService.uploadFile($files[0]).then(function() {

                        }, function() {

                        });
                    }
                },
                size: 'sm'
            });

        }


        //////////////////////

        angular.extend(ctrl, {
            onFileSelect: onFileSelect
        });

        //////////////////////

        openUploadModal();

    }

})();