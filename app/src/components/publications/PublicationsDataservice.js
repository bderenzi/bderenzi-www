(function(){
  'use strict';

  angular.module('bdr')
         .service('publicationsService', ['$q', PublicationsDataservice]);

  /**
   * Publications DataService
   * Uses embedded, hard-coded data model; acts asynchronously to simulate
   * remote data service call(s).
   *
   * @returns {{loadAll: Function}}
   * @constructor
   */
  function PublicationsDataservice($q){
    var publications = [
      {
        title:    'XMy conference paper',
        year:     '2013',
        type:     'conference',
        authors:  ['Brian DeRenzi','Gaetano Borriello'],
      },
      {
        title: 'My journal paper',
        year:     '2015',
        type:     'journal',
        authors: ['Brian DeRenzi','Gaetano Borriello'],
      },
      {
        title: 'My journal paper',
        year:     '2013',
        type:     'journal',
        authors: ['Brian DeRenzi','Gaetano Borriello'],
      },
      {
        title: 'Z journal paper',
        year:     '2001',
        type:     'journal',
        authors: ['Brian DeRenzi','Gaetano Borriello'],
      },
    ];

    // Promise-based API
    return {
      loadAll : function() {
        // Simulate async nature of real remote calls
        return $q.when(publications);
      }
    };
  }

})();