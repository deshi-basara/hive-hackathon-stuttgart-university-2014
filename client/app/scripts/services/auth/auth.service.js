(function() {

    'use strict';

    angular
        .module('app')
        .factory('AuthService', AuthService);

    AuthService.$inject = ['$http', 'config', '$q', 'localStorageService'];

    /**
     * Service for checking if the current user is authenticated
     */
    function AuthService($http, config, $q, localStorageService) {

        var service = {
            loginUrl: '/user/login',
            registerUrl: '/user/register',
            sessionUrl: '/user/session',

            hasSession: hasSession,
            getAuth: getAuth,
            getRegistration: getRegistration
        };

        return service;

        ///////////////

        /**
         * Checks if the user has a active session and if it is still valid.
         * @return {Boolean}      [True: user is authenticated | False: not authenticated]
         */
        function hasSession() {
            var q = $q.defer();

            // make the request
            $http({
                method: 'POST',
                url: config.apiUrl + service.sessionUrl,
            }).success(function(data) {
                q.resolve();
            }).error(function(data, status) {
                q.reject();
            });

            return q.promise;
        }

        /**
         * Requests the authentication of the handed user data.
         * @param  {Object}  loginObj [obj.user, obj.pass]
         * @return {Promise}          [Resolve: true | Reject: false]
         */
        function getAuth(loginObj) {
            var q = $q.defer();

            // make the request
            $http({
                method: 'POST',
                url: config.apiUrl + service.loginUrl,
                data: {
                    'username': loginObj.username,
                    'password': loginObj.password
                }
            }).success(function(data) {
                q.resolve(data);
            }).error(function(data, status) {
                q.reject(data, status);
            });

            return q.promise;
        }

        /**
         * Submits an registration attemp to the server.
         * @param  {object} registerModel [ngModel with all registration form inputs]
         * @return {promise}              [$q promise]
         */
        function getRegistration(registerModel) {
            var q = $q.defer();

            // make the request
            $http({
                method: 'POST',
                url: config.apiUrl + service.registerUrl,
                data: registerModel
            }).success(function(data) {
                if(registerModel.role !== 'student') {
                    localStorageService.set('prof', true);
                }
                else {
                    localStorageService.set('prof', false);
                }
                q.resolve(data);
            }).error(function(data, status) {
                q.reject(data, status);
            });

            return q.promise;
        }


    }


})();