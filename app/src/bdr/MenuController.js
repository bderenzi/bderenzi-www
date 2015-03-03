(function(){
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
        link:       'xxx',  
      },
    ];

    // TODO: refactor to a different controller
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

    // TODO: refactor to a different controller
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