(function(){
  'use strict';

  // Setup the routes for the 'bdr' module
  angular.module('bdr')
    .config(['$routeProvider', '$locationProvider',
    function($routeProvider, $locationProvider) {
      $routeProvider.
        when('/home', {
          templateUrl: 'src/components/home/home.html',
          navIndex: '0',
          controller: 'HomeController'
        }).
        when('/bio', {
          templateUrl: 'src/components/bio/bio.html',
          navIndex: '1',
          controller: 'BioController'
        }).
        when('/publications', {
          templateUrl: 'src/components/publications/publications.html',
          navIndex: '2',
          controller: 'PublicationsController'
        }).
        when('/calendar', {
          templateUrl: 'src/components/calendar/calendar.html',
          navIndex: '3',
          controller: 'CalendarController'
        }).
        otherwise({
          redirectTo: '/home'
        });

      // use the HTML5 History API
      // Thanks: https://scotch.io/quick-tips/pretty-urls-in-angularjs-removing-the-hashtag
      $locationProvider.html5Mode(true);
    }]);

})();