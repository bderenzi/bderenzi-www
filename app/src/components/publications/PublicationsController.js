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
    // Local variables
    var me          = 'DeRenzi';
    var authorSites = {
      anderson:   'http://www.cs.washington.edu/people/faculty/anderson',
      dell:       'http://www.nixdell.com/',
      birnbaum:   'http://www.bbirnbaum.com/',
      borriello:  'http://homes.cs.washington.edu/~gaetano/',
      brunskill:  'http://www.cs.cmu.edu/~ebrun/',
      blumenstock:'http://www.jblumenstock.com/',
      findlater:  'http://terpconnect.umd.edu/~leahkf/',
      parikh:     'http://people.ischool.berkeley.edu/~parikh/',
      anokwa:     'http://www.anokwa.com/',
      kastner:    'http://kastner.ucsd.edu/',
    };

    $scope.publications     = [ ];
    $scope.clearFilter      = clearFilter;

    // Default grouping
    $scope.predicate        = 'year';
    $scope.reverse          = true;

    publicationsService
      .loadAll()
      .then(function(pubs) {
        $scope.publications = pubs;
        fixAuthors();
      },
      function(d) {
        console.log('error.');
      });

    function clearFilter() {
      $scope.query = '';
    }


    // Internal functions
    /*
     * fixAuthors()
     *
     * Assumes that the publications variable has been filled.
     */
    function fixAuthors() {
      for (var i = $scope.publications.length - 1; i >= 0; i--) {
        var pub     = $scope.publications[i];
        var authors = pub.author.split(' and ');

        $scope.publications[i].authors = [];
        
        for (var j = authors.length - 1; j >= 0; j--) {
          var names     = authors[j].split(',');
          var lastName  = String(names[0]).trim();
          var firstName = String(names[1]).trim();

          if(lastName.toLowerCase() === me.toLowerCase()) {
            $scope.publications[i].authors.unshift({
              name:   firstName + ' ' + me,
              me:     true,
            });
          } else {
            if(firstName.indexOf(' ') >= 0) {
              var initials = firstName.split(' ');
              firstName = '';
              for (var z = 0; z < initials.length; z++) {
                firstName = firstName + initials[z][0] + '.';
              }
            } else {
              firstName = firstName[0] + '. ';
            }
            $scope.publications[i].authors.unshift({
              name:   firstName + ' ' + lastName,
              link:   authorSites[lastName.toLowerCase()],
            });
          }
        }
      }
    }

  }

})();