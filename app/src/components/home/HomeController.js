(function(){
  'use strict';

  angular.module('bdr')
    .controller('HomeController', [
        '$scope','$sce',
        HomeController
     ]);

   /**
   * Main Controller for the navigation
   * @param $scope
   * @constructor
   */
  function HomeController($scope, $sce) {
    // TODO: refactor to a different controller
    var contactInfo = [
      {
        icon:       'bdr bdr-email',
        text:       'bderenzi@cs.uct.ac.za',
      }, {
        icon:       'bdr bdr-skype',
        text:       'brianderenzi',
        link:       'skpe:brianderenzi?userinfo',
      }, {
        icon:       'bdr bdr-linkedin',
        text:       'linkedin.com/in/bderenzi',
        link:       'http://www.linkedin.com/in/bderenzi',  
      },{
        icon:       'bdr bdr-google-scholar',
        text:       'Google Scholar',
        link:       'http://scholar.google.com/citations?user=iVR3Ti8AAAAJ',  
      },{
        icon:       'bdr bdr-windows8',
        text:       'Microsoft Academic', 
        link:       'http://academic.research.microsoft.com/Author/3563979/',  
      },{
        icon:       'bdr bdr-library',
        text:       'Room 306 Comp Sci Building',
        textClass:  'normal-case', 
      },{
        icon:       'bdr',
        text:       '18 University Avenue',
        textClass:  'normal-case', 
      },{
        icon:       'bdr ',
        text:       'University of Cape Town',
        textClass:  'normal-case', 
      },{
        icon:       'bdr ',
        text:       'Rondebosch',
        textClass:  'normal-case', 
      },{
        icon:       'bdr ',
        text:       'Cape Town, South Africa',
        textClass:  'normal-case', 
      },
    ];


    var projects = [{
      thumb:        'images/projThumb/automated-data-quality.jpg',
      title:        $sce.trustAsHtml('Automated Data Quality'),
      subtitle:     $sce.trustAsHtml('Automatically detecting anomolous data from field-based workers.'),
      description:  $sce.trustAsHtml('<p>As we increase the amount of digital data available to inform decision making for health systems, data quality becomes a major concern. Overworked and under-appreciated health workers may make mistakes, misunderstand questions or \'satisfice\', producing unreliable data. By exploiting statistical anomalies within the data sets themselves, we can begin to identify questionable data.</p><p>In this work, we are looking at both supervised and unsupervised approaches to automatically detecting potentially anomolous data and following up with those anomalies in the field.</p>')
    },{
      thumb:        'images/projThumb/self-tracking.jpg',
      title:        $sce.trustAsHtml('Self-tracking application'),
      subtitle:     $sce.trustAsHtml('Non-evaluative visual and audio feedback for CHWs.'),
      description:  $sce.trustAsHtml('<p>Community health workers (CHWs) have the potential to reduce neonatal and maternal mortality rates when used effectively. However, community health programs are difficult to setup and run. Mobile applications, like <a href="http://www.commcarehq.org/">CommCare</a>, that are used by CHWs to collect information during routine home visits, provide opportunities for increased supervision, accountability, and feedback.</p><p>In this project, we explore completing the feedback loop with CHWs by sending back performance feedback in the form of rich graphs. Once a week a CHW will receive an SMS message with a link to her specific performance graph, showing her performance compared to a subset of her peers. The project is currently being evaluated with a randomized controlled trial in India.</p>')
    },{
      thumb:        'images/projThumb/mwach.png',
      title:        $sce.trustAsHtml('Mobile WACh<sub>x</sub>'),
      subtitle:     $sce.trustAsHtml('Two-way SMS with pregnant women in Kenya.'),
      description:  $sce.trustAsHtml('<p>In Kenya, only 40% of women deliver in a health facility, despite the dangers of home-based delivery. Similarly, few women complete the three recommended antenatal visits at the facility and few receive proper counseling in the postnatal period. There are a number of existing maternal health interventions, however, most projects target specific timelines (e.g., pregnancy, or neonatal health) as opposed to the entire continuum of care.</p><p>With the Mobile WaCH project, we are sending targeted (both temporal and health challenges) SMS messages to pregnant women during the entire continuum of care to achieve behavior change around the uptake of government health services. We hypothesize that a woman’s reply can be used as a proxy for her engagement with the health system and eventual uptake of health services. This is currently being evaluated in a randomized control trial in Kenya at an urban clinic in Nairobi.</p>')
    },{
      thumb:        'images/projThumb/commcare.jpg',
      title:        $sce.trustAsHtml('CommCare'),
      subtitle:     $sce.trustAsHtml('Mobile platform for Community Health Workers.'),
      description:  $sce.trustAsHtml('<p>Community Health Workers (CHWs) are the first—and often only—medical professionals who people see in rural areas of low-income countries. People living in extreme poverty often delay seeking care until it is too late for them to be helped. CHWs make house hold visits to provide very basic education, care, and encouragement. However, for CHWs to provide effective care, they must keep track of their clients and ensure that no one slips between the cracks. CommCare is software that we have helped design and deploy to run on mobile phones to aid CHWs with planning and performing their job.</p><p>CommCare is maintained and supported by <a href="http://www.dimagi.com/">Dimagi, Inc.</a>. Check out the <a href="https://www.commcarehq.org/">website for CommCareHQ</a> to find out more, watch videos, and demo the software.</p>')
    },{
      thumb:        'images/projThumb/e-imci.jpg',
      title:        $sce.trustAsHtml('e-IMCI'),
      subtitle:     $sce.trustAsHtml('Medical protocols on mobile devices.'),
      description:  $sce.trustAsHtml('<p>In low-income countries 10% of infants die in their first year, compared to 0.5% in wealthy countries. To address these health inequities, the <abbr title="World Health Organization">WHO</abbr>, <abbr title="United Nations Children\'s Fund">UNICEF</abbr>, and others have created the <abbr title="Integrated Management of Childhood Illness">IMCI</abbr> program.</p><p>Targeted directly at reducing child mortality rates in low-income countries, IMCI is a multi-faceted evidence-based approach. At the core are a set of clinical guidelines, or medical algorithms, designed to guide health workers step-by-step through the classification and treatment of children from 0-5 years old. The program is currently implemented in over 80 countries worldwide. Research has shown that following IMCI leads to better health outcomes. The problem is that it is not commonly used. There are a number of reasons including: expense of training, lack of sufficient supervision and a tendency to adhere to protocols less rigorously over time.</p><p>e-IMCI is a project to put IMCI onto mobile devices to aid clinicians. The current work is maintained and supported by <a href="http://www.dtree.org/">D-tree International</a>, who is working with the Ministry of Health in Tanzania to further evaluate and scale the project.</p>')
    },];

    $scope.contactInfo  = contactInfo;
    $scope.projects     = projects;
  }

})();
