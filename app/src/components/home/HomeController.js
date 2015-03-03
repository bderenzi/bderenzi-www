(function(){
  'use strict';

  angular.module('bdr')
    .controller('HomeController', [
        '$scope', '$mdSidenav',
        HomeController
     ]);

   /**
   * Main Controller for the navigation
   * @param $scope
   * @constructor
   */
  function HomeController($scope) {
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

    $scope.contactInfo = contactInfo;
  }

})();