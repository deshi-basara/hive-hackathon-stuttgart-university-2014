(function() {

    'use strict';

    angular
        .module('app')
        .factory('ChatService', ChatService);

    ChatService.$inject = ['$http', 'config', '$q', 'localStorageService'];

    /**
     * Service for checking if the current user is authenticated
     */
    function ChatService($http, config, $q, localStorageService) {

        var service = {
            submitMsg: submitMsg
        };

        return service;

        ///////////////

        /**
         * Submits an msg to the socket.
         * @param  {string}  msg [The message the user wants to submit]
         * @return {promise}     [$q-promise]
         */
        function submitMsg(msg) {
            var q = $q.defer();

            console.log(registerModel);

            // make the request
            $http({
                method: 'POST',
                url: config.apiUrl + service.registerUrl,
                data: registerModel
            }).success(function(data) {
                q.resolve(data);
            }).error(function(data, status) {
                q.reject(data, status);
            });

            return q.promise;
        }


    }


})();