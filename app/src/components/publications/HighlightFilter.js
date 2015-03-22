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
    .filter('highlight', ['$sce', function($sce) {
      return function(text, phrase) {
        if (phrase) {
          text = text.replace(new RegExp('('+phrase+')', 'gi'), '<span class="highlighted">$1</span>');
        }
        
        return $sce.trustAsHtml(text);
      };
    }])
    .filter('titleCase', function() {
        // Inspired by: https://gist.github.com/maruf-nc/5625869
        return function(str) {
          var smallwords = ['a','an','and','as','at','but','by','en','for','if','in','nor','of','on','or','per','the','to','vs','via',];
          var bigwords = ['IMCI','SMS','CHW',];
          return (str === undefined || str === null) ? '' : str.charAt(0).toUpperCase() + str.replace(/_|-/, ' ').replace(/\w\S*/g, function(txt){
            if(smallwords.indexOf(txt.toLowerCase()) >= 0){
              return txt.toLowerCase();
            } else if(bigwords.indexOf(txt.toUpperCase()) >= 0){
              return txt.toUpperCase();
            }
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
          }).substr(1);
        };
    });
})();