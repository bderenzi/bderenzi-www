(function(){
  'use strict';
  
  // Thanks to: http://stackoverflow.com/questions/19992090/angularjs-group-by-directive
  /*
   * groupBy
   *
   * Define when a group break occurs in a list of items
   *
   * @param {array}  the list of items
   * @param {String} then name of the field in the item from the list to group by
   * @returns {array} the list of items with an added field name named with "_new"
   *          appended to the group by field name
   *
   * @example   <div ng-repeat="item in MyList  | groupBy:'groupfield'" >
   *        <h2 ng-if="item.groupfield_CHANGED">{{item.groupfield}}</h2>
   *
   *        Typically you'll want to include Angular's orderBy filter first
   */
  angular.module('bdr')
    .filter('groupBy', ['$parse', function ($parse) {
    return function (list, groupBy) {

        var filtered = [];
        var prevItem = null;
        var groupChanged = false;
        // this is a new field which is added to each item where we append "_CHANGED"
        // to indicate a field change in the list
        //was var newField = group_by + '_CHANGED'; - JB 12/17/2013
        var newField = 'group_by_CHANGED';

        // loop through each item in the list
        angular.forEach(list, function (item) {

            groupChanged = false;

            // if not the first item
            if (prevItem !== null) {

                // check if any of the group by field changed
                
                //force group_by into Array
                groupBy = angular.isArray(groupBy) ? groupBy : [groupBy]; 
                
                //check each group by parameter
                for (var i = 0, len = groupBy.length; i < len; i++) {
                    if ($parse(groupBy[i])(prevItem) !== $parse(groupBy[i])(item)) {
                        groupChanged = true;
                    }
                }

                
            }// otherwise we have the first item in the list which is new
            else {
                groupChanged = true;
            }

            // if the group changed, then add a new field to the item
            // to indicate this
            if (groupChanged) {
                item[newField] = true;
            } else {
                item[newField] = false;
            }

            filtered.push(item);
            prevItem = item;

        });

        return filtered;
    };
  }]);
})();