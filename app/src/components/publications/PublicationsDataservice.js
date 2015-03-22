(function(){
  'use strict';

  angular.module('bdr')
         .factory('publicationsService', ['$http', '$q', PublicationsDataservice]);

  /**
   * Publications DataService
   *
   * @returns {{loadAll: Function}}
   * @constructor
   */
  function PublicationsDataservice($http, $q){
    // Promise-based API modeled from 
    // http://weblog.west-wind.com/posts/2014/Oct/24/AngularJs-and-Promises-with-the-http-Service
    return { 
      loadAll: function() {
          var def = $q.defer();
          $http.get('/api/v1/publication')
            .success(function(data,status,headers,config) {
              def.resolve(data);
            })
            .error(function() {
              def.reject('Failed to load publications.');
            });
          return def.promise;
        }
    };
  }

})();