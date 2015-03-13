(function(){
  'use strict';

  angular.module('bdr')
         .factory('calendarService', ['$http', '$q', CalendarDataservice]);

  /**
   * Publications DataService
   *
   * @returns {{loadAll: Function}}
   * @constructor
   */
  function CalendarDataservice($http, $q){
    // Promise-based API modeled from 
    return { 
      loadAll: function() {
          var def = $q.defer();
          $http.get('/assets/events.json')
            .success(function(data,status,headers,config) {
              def.resolve(data);
            })
            .error(function() {
              def.reject('Failed to load calendar events.');
            });
          return def.promise;
        }
    };
  }

})();