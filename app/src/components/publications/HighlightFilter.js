(function(){
  'use strict';
  
  // Thanks to: http://stackoverflow.com/questions/20597286/mark-search-string-dynamically-using-angular-js
  /*
   * filter
   *
   * Highlight text coming through
   *
   */
  angular.module('bdr')
    .filter('highlight', function($sce) {
      return function(text, phrase) {
        if (phrase) {
          text = text.replace(new RegExp('('+phrase+')', 'gi'), '<span class="highlighted">$1</span>');
        }
        
        return $sce.trustAsHtml(text);
      };
    });
})();