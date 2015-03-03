(function(){
'use strict';

  angular
      .module('starterApp', ['ngMaterial', 'ngRoute'])
      .controller('AppCtrl', ['$scope', '$mdSidenav', '$mdBottomSheet', '$log', AvatarAppController ])
      .config(function($mdThemingProvider, $mdIconProvider) {
        // Use custom theme
        $mdThemingProvider.theme('default')
          .primaryPalette('grey')
          .accentPalette('teal')
          .backgroundPalette('grey',{
            'hue-1': '500'
          });
        $mdIconProvider
          .icon('menu'       , './assets/svg/menu.svg'        , 24);
      })
      .config(['$routeProvider', '$locationProvider',
        function($routeProvider, $locationProvider) {
          $routeProvider.
            when('/home', {
              templateUrl: 'partials/home.html',
              navIndex: '0'
            }).
            when('/bio', {
              templateUrl: 'partials/bio.html',
              navIndex: '1'
              // controller: 'PhoneDetailCtrl'
            }).
            when('/publications', {
              templateUrl: 'partials/publications.html',
              navIndex: '2'
              // controller: 'PhoneDetailCtrl'
            }).
            when('/calendar', {
              templateUrl: 'partials/calendar.html',
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

  /**
   * Main Controller for the Angular Material Starter App
   * @param $scope
   * @param $mdSidenav
   * @param avatarsService
   * @constructor
   */
  function AvatarAppController($scope, $mdSidenav, $mdBottomSheet, $log ) {
    var navItems = [
      {
        icon:       'bdr bdr-home',
        text:       'Home',
        link:       'home',  
      }, {
        icon:       'bdr bdr-person',
        text:       'About Me',
        link:       'bio',  
      }, {
        icon:       'bdr bdr-book',
        text:       'Publications',
        link:       'publications',  
      },{
        icon:       'bdr bdr-calendar',
        text:       'Calendar',
        link:       'calendar',  
      },{
        icon:       'bdr bdr-file-download',
        text:       'Download CV', 
        highlight:  true,
        link:       'xxx',  
      },
    ];
    var contactInfo = [
      {
        icon:       'bdr bdr-email',
        text:       'bderenzi@gmail.com',
      }, {
        icon:       'bdr bdr-skype',
        text:       'brianderenzi',
        link:       'skpe:brianderenzi?userinfo',
      }, {
        icon:       'bdr bdr-linkedin',
        text:       'linkedin.com/in/bderenzi',
        link:       'http://www.linkedin.com/in/bderenzi',  
      },{
        icon:       'bdr bdr-google-scholar',
        text:       'Google Scholar',
        link:       'http://scholar.google.com/citations?user=iVR3Ti8AAAAJ',  
      },{
        icon:       'bdr bdr-windows8',
        text:       'Microsoft Academic', 
        link:       'http://academic.research.microsoft.com/Author/3563979/',  
      },{
        icon:       'bdr bdr-library',
        text:       'Room 317 Comp Sci Building',
        textClass:  'normal-case', 
      },{
        icon:       'bdr',
        text:       '18 University Avenue',
        textClass:  'normal-case', 
      },{
        icon:       'bdr ',
        text:       'University of Cape Town',
        textClass:  'normal-case', 
      },{
        icon:       'bdr ',
        text:       'Rondebosch',
        textClass:  'normal-case', 
      },{
        icon:       'bdr ',
        text:       'Cape Town, South Africa',
        textClass:  'normal-case', 
      },
    ];

    var reserachInterests = [
      'ICT4D, ict4chw',
      'Mobile health',
      'Supervisory systems',
      'Behavior change',
      'Data quality',
      'Community empowerment',
    ];

    $scope.selected          = null;
    $scope.navItems          = navItems;
    $scope.contactInfo       = contactInfo;
    $scope.reserachInterests = reserachInterests;
    $scope.toggleSidenav     = toggleSideNav;

    // $scope.selected = $scope.navItems[0];
    // render();

    // Listen for changes to the Route. When the route
    // changes, let's set the renderAction model value so
    // that it can render in the Strong element.
    $scope.$on(
      '$routeChangeSuccess',
      function( angEvent, $currentRoute, $previousRoute ){
        try {
          $scope.selected = $scope.navItems[$currentRoute.$$route.navIndex];
        } catch(err) {
          // No navIndex for this. Means we're redirecting home.
        }
      }
    );


    // *********************************
    // Internal methods
    // *********************************
    /**
     * Hide or Show the sideNav area
     * @param menuId
     */
    function toggleSideNav( name ) {
      $mdSidenav(name).toggle();
    }

  }



})();
