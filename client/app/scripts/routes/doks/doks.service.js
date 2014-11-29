(function() {

    'use strict';

    angular
        .module('app')
        .factory('DoksService', DoksService);

    DoksService.$inject = ['$upload', 'config', '$q'];

    /**
     * Service for checking if the current user is authenticated
     */
    function DoksService($upload, config, $q) {

        var service = {
            urlUploadFile: '/doc',

            uploadFile: uploadFile
        };

        return service;

        ///////////////

        /**
         * Upload the handed file to the rest api.
         * @param  {File Object}  fileObj [File data from angular-file-upload]
         * @return {Promise}               [Resolve: true | Reject: false]
         */
        function uploadFile(fileObj) {
            var q = $q.defer();

            // make the request
            $upload.upload({
                method: 'POST',
                url: config.apiUrl + service.urlUploadFile,
                file: fileObj,
                fileFormDataName: 'docFile'
            }).progress(function(evt) {
                // calculate the progress in percentage and notify
                //fileObj.progress = parseInt(100.00 * evt.loaded / evt.total);
            }).success(function(data) {
                console.log(data);
                // file upload complete
                //fileObj.status = 'Bereit';

                // save the database id of the uploaded file in the queue-array
                //fileObj.uploadId = data.id;
                //q.resolve(data);
            }).error(function(data, status) {
                // file upload error
                //fileObj.status = 'Fehler';
                //q.reject(data, status);
            });

            return q.promise;
        }


    }


})();