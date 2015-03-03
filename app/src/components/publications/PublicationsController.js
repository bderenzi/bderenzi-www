(function(){
  'use strict';
  
  angular.module('bdr')
    .controller('PublicationsController', [
        '$scope', 'publicationsService',
        PublicationsController
     ]);

   /**
   * Main Controller for the navigation
   * @param $scope
   * @constructor
   */
  function PublicationsController($scope, publicationsService) {
    $scope.publications = [ ];

    // Default grouping
    $scope.predicate = 'year';
    $scope.reverse = true;

    publicationsService
      .loadAll()
      .then(function(pubs) {
        $scope.publications = [].concat(pubs);
      });
  }

})();