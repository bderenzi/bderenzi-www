(function(){
  'use strict';

  angular.module('bdr')
    .directive('publication', function() {
      return {
        restrict:     'E',
        scope: {
          pub:  '=',
        },
        templateUrl:  'src/components/publications/publicationDirective.html',
      };
    });

})();