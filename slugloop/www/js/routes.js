angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
      
    .state('tabsController', {
      url: '/app',
      abstract:true,
      templateUrl: 'templates/tabsController.html'
    })
      
    .state('tabsController.loop', {
      url: '/loop',
      views: {
        'tab1': {
          templateUrl: 'templates/loop.html',
          controller: 'loopCtrl'
        }
      }
    })
        
      
    
    .state('tabsController.feed', {
      url: '/feed',
      views: {
        'tab2': {
          templateUrl: 'templates/feed.html',
          controller: 'feedCtrl'
        }
      }
    })
        
      .state('tabsController.feed_list', {
      url: '/feed/list',
      views: {
        'tab2': {
          templateUrl: 'templates/feed_list.html',
          controller: 'feed_listCtrl'
        }
      }
    })
      
    
      
        
    .state('tabsController.map', {
      url: '/map',
      views: {
        'tab3': {
          templateUrl: 'templates/map.html',
          controller: 'mapCtrl'
        }
      }
    })
        
      
    
      

    ;

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/loop');

});