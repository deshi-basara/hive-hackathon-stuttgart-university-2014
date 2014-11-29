(function () {

    'use strict';

    angular
        .module('app')
        .controller('RegisterCtrl', RegisterCtrl);

    RegisterCtrl.$inject = ['AuthService', '$timeout', '$state'];

    /**
     * Handles the login request and potential error feedbacks.
     */
    function RegisterCtrl(AuthService, $timeout, $state) {
        var ctrl = this;

        /**
         * Submits the form values to the AuthService after validation
         */
        function submitRegistration() {

            // TODO: read from form
            //ctrl.register = {username: "Simon Schuster", email: "simon.schuster@hs-furtwangen.de", password: "Simon123", password2: "Simon123", role: 'student'};

            // has the user entered all needed values, otherwise stop
            if(ctrl.register.username.length === 0 || ctrl.register.email.length === 0 ||
                    ctrl.register.password.length === 0 || ctrl.register.password2.length === 0) {

                // show an error toast and break
                ctrl.errorMsg = 'Du hast nicht alle Formular-Felder ausgefüllt';
                ctrl.showError = true;

                // hide the toast after 5000ms
                $timeout(function() {
                    ctrl.showError = false;
                }, 5000);

                return;
            }
            // check if both passwords match
            else if(ctrl.register.pass !== ctrl.register.pass2) {
                // show an error toast and break
                ctrl.errorMsg = 'Die Passwörter stimmen nicht überein';
                ctrl.showError = true;

                // hide the toast after 5000ms
                $timeout(function() {
                    ctrl.showError = false;
                }, 5000);

                return;
            }

            // hand data over
            AuthService.getRegistration(ctrl.register).then(function(success) {

                // everything went well, redirect to the room list

                //@todo give user feedback
                $state.go('rooms');

            }, function(error) {

                // show an error toast and break
                ctrl.errorMsg = error.error;
                ctrl.showError = true;

                // hide the toast after 5000ms
                $timeout(function() {
                    ctrl.showError = false;
                }, 5000);

            });

        }


        //////////////////////

        angular.extend(ctrl, {
            register: {
                name: '',
                mail: '',
                pass: '',
                pass2: '',
                role: 'student'
            },
            showError: false,

            submitRegistration: submitRegistration
        });
    }

})();