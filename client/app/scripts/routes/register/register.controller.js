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
            // has the user entered all needed values, otherwise stop
            if(ctrl.register.username.length === 0 || ctrl.register.password.length === 0 ) {
                return showToast('Du hast nicht alle Formular-Felder ausgefüllt');
            }

            if(ctrl.register.prof){
                ctrl.register.role = 'prof';
            }

            // hand data over
            AuthService.getRegistration({
                username: ctrl.register.username, 
                password: ctrl.register.password,
                role: ctrl.register.role
            }).then(function(success) {
                $state.go('rooms');
            }, function(error) {
                showToast('Etwas ist schiefgelaufen');
            });
        }

        function showToast(msg){
            ctrl.errorMsg = msg;
            ctrl.showError = true;

            // hide the toast after 5000ms
            $timeout(function() {
                ctrl.showError = false;
            }, 5000);  
        }

        //////////////////////

        angular.extend(ctrl, {
            register: {
                name: '',
                password: '',
                prof: false,
                role: 'student'
            },
            showError: false,
            submitRegistration: submitRegistration
        });
    }

})();