(function(){
'use strict';

  angular
      .module('starterApp', ['ngMaterial', 'avatars', 'ngRoute'])
      .controller('AppCtrl', ['$scope', 'avatarsService', '$mdSidenav', '$mdBottomSheet', '$log', AvatarAppController ])
      .config(function($mdThemingProvider) {
        // Use custom theme
        $mdThemingProvider.theme('default')
          .primaryPalette('grey')
          .accentPalette('teal');
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
        icon:       'fa-home',
        text:       'Home',
        link:       'home',  
      }, {
        icon:       'fa-user',
        text:       'About Me',
        link:       'bio',  
      }, {
        icon:       'fa-edit',
        text:       'Publication',
        link:       'publications',  
      },{
        icon:       'fa-calendar',
        text:       'Calendar',
        link:       'calendar',  
      },{
        icon:       'fa-download',
        text:       'Download CV', 
        link:       'xxx',  
      },

    ];

    $scope.selected          = null;
    $scope.avatars           = allAvatars;
    $scope.navItems          = navItems;
    $scope.isNavLockedOpen   = isNavLockedOpen;
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
     * Query whether the nav is open or not
     * @param menuId
     */
    function isNavLockedOpen( name ) {
      return $mdSidenav(name).isLockedOpen();
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
