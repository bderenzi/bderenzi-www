(function(){
  'use strict';
  
  angular.module('bdr')
    .controller('BioController', [
        '$scope',
        BioController
     ]);

   /**
   * Main Controller for the navigation
   * @param $scope
   * @constructor
   */
  function BioController($scope) {
    // TODO: refactor to a different controller
    var reserachInterests = [
      'ICT4D, ict4chw',
      'Mobile health',
      'Supervisory systems',
      'Behavior change',
      'Data quality',
      'Community empowerment',
    ];

    $scope.reserachInterests = reserachInterests;
  }

})();