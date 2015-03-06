(function(){
  'use strict';

  angular.module('bdr')
    .directive('bdrPublication', function() {
      return {
        restrict:     'E',
        scope: {
          pub:        '=',
          query:      '=',
        },
        templateUrl:  'src/components/publications/publicationDirective.html',
      };
    });

})();