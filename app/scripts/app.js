(function(){
'use strict';

  angular
      .module('starterApp', ['ngMaterial', 'avatars', 'ngRoute'])
      .controller('AppCtrl', ['$scope', 'avatarsService', '$mdSidenav', '$mdBottomSheet', '$log', AvatarAppController ])
      .config(function($mdThemingProvider) {
        // Use custom theme
        $mdThemingProvider.theme('default')
          .primaryPalette('grey')
          .accentPalette('teal')
          .backgroundPalette('grey',{
            'hue-1': '500'
          });
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
  function AvatarAppController($scope, avatarsService, $mdSidenav, $mdBottomSheet, $log ) {
    var allAvatars = [ ];
    var navItems = [
      {
        icon:       'bdr bdr-home',
        text:       'Home',
        link:       'home',  
      }, {
        icon:       'bdr-person',
        text:       'About Me',
        link:       'bio',  
      }, {
        icon:       'bdr-book',
        text:       'Publications',
        link:       'publications',  
      },{
        icon:       'bdr-calendar',
        text:       'Calendar',
        link:       'calendar',  
      },{
        icon:       'bdr-file-download',
        text:       'Download CV', 
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
    $scope.avatars           = allAvatars;
    $scope.navItems          = navItems;
    $scope.contactInfo       = contactInfo;
    $scope.reserachInterests = reserachInterests;
    $scope.toggleSidenav     = toggleSideNav;
    $scope.showActions       = showActions;

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

    loadAvatars();

    // *********************************
    // Internal methods
    // *********************************

    /**
     * Load all available avatars
     * @param menuId
     *
     */
    function loadAvatars() {
      avatarsService
        .loadAll()
        .then( function( avatars ) {
          allAvatars = avatars;

          $scope.avatars = [].concat(avatars);
          // $scope.selected = avatars[0];
        });
    }

    /**
     * Hide or Show the sideNav area
     * @param menuId
     */
    function toggleSideNav( name ) {
      $mdSidenav(name).toggle();
    }

    /**
     * Show the bottom sheet
     */
    function showActions($event) {

        $mdBottomSheet.show({
          parent: angular.element(document.getElementById('content')),
          template: '<md-bottom-sheet class="md-list md-has-header">' +
                      '<md-subheader>Avatar Actions</md-subheader>' +
                        '<md-list>' +
                          '<md-item ng-repeat="item in vm.items">' +
                            '<md-button ng-click="vm.performAction(item)">{{item.name}}</md-button>' +
                          '</md-item>' +
                        '</md-list>' +
                      '</md-bottom-sheet>',
          bindToController : true,
          controllerAs: 'vm',
          controller: [ '$mdBottomSheet', AvatarSheetController],
          targetEvent: $event
        }).then(function(clickedItem) {
          $log.debug( clickedItem.name + ' clicked!');
        });

        /**
         * Bottom Sheet controller for the Avatar Actions
         */
        function AvatarSheetController( $mdBottomSheet ) {
          this.items = [
            { name: 'Share', icon: 'share' },
            { name: 'Copy', icon: 'copy' },
            { name: 'Impersonate', icon: 'impersonate' },
            { name: 'Singalong', icon: 'singalong' },
          ];
          this.performAction = function(action) {
            $mdBottomSheet.hide(action);
          };
        }
    }

  }



})();
