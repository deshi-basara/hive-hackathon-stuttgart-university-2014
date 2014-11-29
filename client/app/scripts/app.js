// angular.module is a global place for creating, registering and retrieving Angular modules.
// 'app' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'.
angular
  .module('app', [
  'ui.router',
  'ui.bootstrap',
  'LocalStorageModule',
  'ngAnimate',
  'ngTable',
  'angularFileUpload',
  'formly'
])

.constant('config', {
  'name': 'development',
  'apiUrl': 'http://localhost:8081',
  'socketUrl': 'http://localhost:9002'
})

.config(function($stateProvider, $urlRouterProvider) {

  // This starter uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  $stateProvider

    .state('chat', {
      url: '/chat',
      templateUrl: 'scripts/routes/chat/chat.index.tpl.html',
      controller: 'ChatCtrl',
      controllerAs: 'ctrl'
    })

    .state('login', {
      url: '/login',
      templateUrl: 'scripts/routes/login/login.index.tpl.html',
      controller: 'LoginCtrl',
      controllerAs: 'ctrl'
    })

    .state('register', {
      url: '/register',
      templateUrl: 'scripts/routes/register/register.index.tpl.html',
      controller: 'RegisterCtrl',
      controllerAs: 'ctrl'
    })

    .state('rooms', {
      url: '/rooms',
      templateUrl: 'scripts/routes/rooms/rooms.index.tpl.html',
      controller: 'RoomsCtrl',
      controllerAs: 'ctrl'
    })

    .state('pdf', {
      url: '/pdf',
      templateUrl: 'scripts/routes/pdf/pdf.index.tpl.html',
      controller: 'PDFCtrl',
      controllerAs: 'ctrl'
    })

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('rooms');

})

.run(function($state, AuthService, SocketService) {

  // check if the user has a active session
  AuthService.hasSession().then(function(success) {}, function(error) {
    // no valid session running, redirect to the login
    //$state.go('login');
  });

  // connect the user to the websocket
  SocketService.connect().then(function() {
    console.log(SocketService.socket);
  }, function() {
    console.log('Es konnte keine Verbindung zum WebSocket hergetsellt werden');
  });

});