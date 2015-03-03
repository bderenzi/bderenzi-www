(function(){
  'use strict';
  
  angular.module('bdr')
    .controller('BioController', [
        '$scope',
        BioController
     ]);

   /**
   * Main Controller for the navigation
   * @param $scope
   * @constructor
   */
  function BioController($scope) {
    // TODO: refactor to a different controller
    var reserachInterests = [
      'ICT4D, ict4chw',
      'Mobile health',
      'Supervisory systems',
      'Behavior change',
      'Data quality',
      'Community empowerment',
    ];

    var positions = [
      {
        start:       '2006',
        end:         '2011',
        title:       'Research Assistant',
        institution: 'University of Washington',
        department:  'Computer Science & Engineering',
      },{
        start:       '2012',
        end:         '2013',
        title:       'Research Associate',
        institution: 'University of Washington',
        department:  'Computer Science & Engineering',
      },{
        start:       '2013',
        end:         '2015',
        title:       'Research Scientist',
        institution: 'IBM Research Africa',
        department:  'Nairobi Lab',
      },{
        start:       '2015',
        end:         'Present',
        title:       'Senior Lecturer',
        institution: 'University of Cape Town',
        department:  'Computer Science',
      },
    ];

    var education = [
      {
        degree:      'B.S.',
        year:        '2006',
        institution: 'University of California, Santa Barbara',
        department:  'Computer Engineering',
      },{
        degree:      'M.S.',
        year:        '2008',
        institution: 'University of Washington',
        department:  'Computer Science & Engineering',
      },{
        degree:      'Ph.D.',
        year:        '2011',
        institution: 'University of Washington',
        department:  'Computer Science & Engineering',
      },
    ];

    $scope.reserachInterests  = reserachInterests;
    $scope.education          = education;
    $scope.positions          = positions;
  }

})();