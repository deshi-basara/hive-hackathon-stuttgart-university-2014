(function () {

    'use strict';

    angular
        .module('app')
        .controller('LoginCtrl', LoginCtrl);

    LoginCtrl.$inject = ['AuthService', '$timeout', '$state'];

    /**
     * Handles the login request and potential error feedbacks.
     */
    function LoginCtrl(AuthService, $timeout, $state) {
        var ctrl = this;

        /**
         * Submits the form values to the AuthService after validation
         */
        function submitLogin() {
            // has the user entered all needed values, otherwise stop
            if(ctrl.login.username.length === 0 || ctrl.login.password.length === 0) {
                return showToast('Du hast nicht alle Formular-Felder ausgefüllt');
            }

            // hand data
            AuthService.getAuth(ctrl.login).then(function(success) {
                // everything went well, redirect
                $state.go('rooms');
            }, function(error, status) {
                showToast('Username oder Passwort falsch');
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
            login: {
                username: '',
                password: ''
            },
            showError: false,
            submitLogin: submitLogin
        });
    }   
})();