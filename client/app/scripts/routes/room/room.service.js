(function() {

    'use strict';

    angular
        .module('app')
        .factory('RoomService', RoomService);

    RoomService.$inject = ['$http', 'config', '$q', 'localStorageService'];

    /**
     * Service for checking if the current user is authenticated
     */
    function RoomService($http, config, $q, localStorageService) {

        var service = {
            urlAllRooms: '/rooms',

            getAllRooms: getAllRooms
        };

        return service;

        ///////////////

        /**
         * Requests all available rooms from the server.
         * @return {promise}     [$q-promise]
         */
        function getAllRooms() {
            var q = $q.defer();

            // make the request
            $http({
                method: 'GET',
                url: config.apiUrl + service.urlAllRooms
            }).success(function(data) {
                q.resolve(data);
            }).error(function(data, status) {
                q.reject(data, status);
            });

            return q.promise;
        }


    }


})();