(function(){
  'use strict';
  
  Date.prototype.addDays = function(days) {
    var dat = new Date(this.valueOf());
    dat.setDate(dat.getDate() + days);
    return dat;
  };

  // Prepare the 'bdr' module for subsequent registration of controllers and delegates
  angular.module('bdr', [ 'ngMaterial', 'ngRoute' ]);
  
})();