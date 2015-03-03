(function(){
  'use strict';

  // Prepare the 'bdr' module for subsequent registration of controllers and delegates
  angular.module('bdr', [ 'ngMaterial', 'ngRoute' ])
    .config(['$routeProvider', '$locationProvider',
    function($routeProvider, $locationProvider) {
      $routeProvider.
        when('/home', {
          templateUrl: 'src/bdr/view/home.html',
          navIndex: '0',
          controller: 'HomeController'
        }).
        when('/bio', {
          templateUrl: 'src/bdr/view/bio.html',
          navIndex: '1',
          controller: 'BioController'
        }).
        when('/publications', {
          templateUrl: 'src/bdr/view/publications.html',
          navIndex: '2'
          // controller: 'PhoneDetailCtrl'
        }).
        when('/calendar', {
          templateUrl: 'src/bdr/view/calendar.html',
          navIndex: '3'
          // controller: 'PhoneDetailCtrl'
        }).
        otherwise({
          redirectTo: '/home'
        });

      // use the HTML5 History API
      // Thanks: https://scotch.io/quick-tips/pretty-urls-in-angularjs-removing-the-hashtag
      $locationProvider.html5Mode(true);
    }]);

})();