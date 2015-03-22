(function(){
  'use strict';

  angular.module('bdr')
    .controller('CalendarController', [
        '$scope', 'calendarService',
        CalendarController
     ]);

   /**
   * Calendar Controller 
   * @param $scope
   * @constructor
   */
  function CalendarController($scope, calendarService) {
    var MONDAY = 1;

    // Vars
    $scope.startTime      = 8;
    $scope.endTime        = 18;
    $scope.monday         = getWeekday(new Date(), MONDAY);
    $scope.originalMonday = new Date($scope.monday);
    $scope.testEvents     = {};
    $scope.dataReady      = false;

    // Fns
    $scope.datesMatch     = datesMatch; 
    $scope.range          = range; 
    $scope.hasKey         = hasKey; 
    $scope.getHeight      = getHeight; 
    $scope.getDisplayTime = getDisplayTime; 
    $scope.getTZString    = getTZString; 

    calendarService
      .loadAll()
      .then(function(data) {
        $scope.events = data.items;
        processEvents();
      },
      function(d) {
        console.log('error.');
      });


    // Exported functions
    function datesMatch(d1, d2) {
      return  (d1.getDate() === d2.getDate()) && 
              (d1.getMonth() === d2.getMonth()) &&
              (d1.getFullYear() === d2.getFullYear());
    }

    function getTZString() {
      var tz = -1*$scope.monday.getTimezoneOffset()/60;
      return tz < 0 ? 'GMT'+tz+':00' : 'GMT+'+tz+':00';
    }
    function getDisplayTime(days,hours) {
      if(!hasKey(days,hours)) {
        return null;
      }

      var from = _formatHours(hours);
      hours = hours + 0.5 * $scope.testEvents[_getKey(days, hours)].blocks;
      var to = _formatHours(hours);

      return from + '-' + to;
    }

    function hasKey(days, hours) {
      if(!$scope.dataReady) {
        return false;
      }
      return _getKey(days, hours) in $scope.testEvents;
    }

    function getHeight(days, hours) {
      if( !hasKey(days,hours) ) {
        return null;
      }
  
      return (25 * $scope.testEvents[_getKey(days, hours)].blocks) - 2 + 'px';
    }

    function range(min, max, step){
      step = step || 1;
      var input = [];
      for (var i = min; i <= max; i += step){ input.push(i); }
      return input;
    }

    // Internal functions
    function _getKey(days, hours) {
      var key = $scope.monday.addDays(days);
      var minutes = 0;
      if(Math.floor(hours) !== hours) {
        minutes = 30;
      }
      key.setHours(hours,minutes,0,0);
      return key.toISOString();
    }
    function _formatHours(hours) {
      return Math.floor(hours) === hours ? 
                hours + ':00' : 
                Math.floor(hours) + ':30';
    }

    /*
     * processEvents()
     *
     * Make a simpler data structure.
     */
    function processEvents() {

      if(!$scope.events || !$scope.events.length) {
        console.log('something went wrong with calendar data');
        return;
      }
      
      for (var i = $scope.events.length - 1; i >= 0; i--) {
        var event = $scope.events[i];
        var s = new Date(event.start.dateTime);
        var e = new Date(event.end.dateTime);

        var shours = s.getHours();
        var smin = s.getMinutes();

        var ehours = e.getHours();
        var emin = e.getMinutes();

        // Round events to nearest 30-minutes 
        // (early for start, late for end)
        if(smin > 0 && smin < 30) {
          smin = 0;
        } else if (smin > 30) {
          smin = 30;
        }
        if(emin > 0 && emin < 30) {
          emin = 30;
        } else if (emin > 30) {
          emin = 0;
          ehours = ehours + 1;
        }

        // Handle events starting or ending outside of hour time
        if( shours < $scope.startTime && 
            ehours > $scope.startTime) {
          shours = $scope.startTime;
        }
        if( ehours > $scope.endTime &&
            shours < $scope.endTime) {
          ehours = $scope.endTime;
        }

        // Save the new event time
        s.setHours(shours,smin,0);
        e.setHours(ehours,emin,0);

        // Calculate how many 30-minute blocks this spans
        var blocks = Math.abs(e - s) / 1.8e6;
        $scope.testEvents[s.toISOString()] = {blocks:blocks};

      }

      $scope.dataReady      = true;

    }


    // Thanks: http://stackoverflow.com/questions/4156434/javascript-get-the-first-day-of-the-week-from-current-date
    function getWeekday(d, offset) {
      d = new Date(d);
      var day = d.getDay(),
          diff = d.getDate() - day + (day === 0 ? -6:offset); // adjust when day is sunday
      return new Date(d.setDate(diff));
    }

  }


})();