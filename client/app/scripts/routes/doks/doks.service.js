(function() {

    'use strict';

    angular
        .module('app')
        .factory('DoksService', DoksService);

    DoksService.$inject = ['$upload', '$http', 'config', '$q'];

    /**
     * Service for checking if the current user is authenticated
     */
    function DoksService($upload, $http, config, $q) {

        var service = {
            urlUploadFile: '/doc',
            urlAllFiles: '/docs',

            getAllFiles: getAllFiles,
            uploadFile: uploadFile
        };

        return service;

        ///////////////
    

        /**
         * Requests all available file for the room from the server.
         * @return {promise}     [$q-promise]
         */
        function getAllFiles() {
            var q = $q.defer();

            // make the request
            $http({
                method: 'GET',
                url: config.apiUrl + service.urlAllFiles
            }).success(function(data) {
                q.resolve(data);
            }).error(function(data, status) {
                q.reject(data, status);
            });

            return q.promise;
        }

        /**
         * Upload the handed file to the rest api.
         * @param  {File Object}  fileObj [File data from angular-file-upload]
         * @return {Promise}               [Resolve: true | Reject: false]
         */
        function uploadFile(fileObj, roomID) {
            var q = $q.defer();

            // make the request
            $upload.upload({
                method: 'POST',
                url: config.apiUrl + service.urlUploadFile,
                file: fileObj,
                fileFormDataName: 'docFile',
                data: {
                    'roomid': roomID
                }
            }).progress(function(evt) {
<<<<<<< HEAD
            }).success(function(data) {
                q.resolve(data);
            }).error(function(data, status) {
=======
                // calculate the progress in percentage and notify
                fileObj.progress = parseInt(100.00 * evt.loaded / evt.total);
            }).success(function(data) {
                // file upload complete
                fileObj.status = 'Bereit';

                // save the database id of the uploaded file in the queue-array
                fileObj.uploadId = data.id;
                q.resolve(data);
            }).error(function(data, status) {
                // file upload error
                fileObj.status = 'Fehler';
>>>>>>> cb32da572fa7074d8ed8022dc655f700053b0a6d
                q.reject(data, status);
            });

            return q.promise;
        }


    }


})();