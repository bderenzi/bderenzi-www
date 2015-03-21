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
        link:         function(scope, element, attrs, controllers) {
                        scope.isAvailable = function(item) {
                          return item && String(item) !== 'undefined';
                        };
        },
      };
    });

})();