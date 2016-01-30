angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
      
        
    .state('tabsController.feed', {
      url: '/page3',
      views: {
        'tab1': {
          templateUrl: 'templates/feed.html',
          controller: 'feedCtrl'
        }
      }
    })
        
      
    
      
        
    .state('tabsController.analytics', {
      url: '/page4',
      views: {
        'tab2': {
          templateUrl: 'templates/analytics.html',
          controller: 'analyticsCtrl'
        }
      }
    })
        
      
    
      
        
    .state('tabsController.settings', {
      url: '/page5',
      views: {
        'tab3': {
          templateUrl: 'templates/settings.html',
          controller: 'settingsCtrl'
        }
      }
    })
        
      
    
      
    .state('tabsController', {
      url: '/page2',
      abstract:true,
      templateUrl: 'templates/tabsController.html'
    })
      
    ;

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/page2/page3');

});