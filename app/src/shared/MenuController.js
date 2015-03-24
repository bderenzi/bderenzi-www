(function(){
  'use strict';

  angular.module('bdr')
    .controller('MenuController', [
        '$scope', '$mdSidenav',
        MenuController
     ]);

   /**
   * Main Controller for the navigation
   * @param $scope
   * @param $mdSidenav
   * @constructor
   */
  function MenuController($scope, $mdSidenav) {
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
        download:   true,
        link:       'downloads/bderenzi-cv.pdf',  
      },
    ];

    $scope.selected          = null;
    $scope.navItems          = navItems;
    $scope.toggleSidenav     = toggleSideNav;

    // Listen for changes to the Route. When the route
    // changes, update selected menu item
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