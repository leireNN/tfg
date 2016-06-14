// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  //Login
  .state('app.login', {
    url: '/login',
    views: {
      'menuContent': {
        templateUrl: 'templates/log.html',
        controller: 'Login'
      }
    }
  })

  .state('app.register', {
    url: '/register',
    views: {
      'menuContent': {
        templateUrl: 'templates/register.html',
        controller: 'Register'
      }
    }
  })

  .state('app.resetPass', {
    url: '/resetPass',
    views: {
      'menuContent': {
        templateUrl: 'templates/resetPass.html',
        controller: 'ResetPass'
      }
    }
  })

  .state('app.homeRecord', {
      url: '/homeRecord',
      views: {
        'menuContent': {
          templateUrl: 'templates/homeRecord.html',
          controller: 'HomeRecordCtrl'
        }
      }
    })
    .state('app.pills', {
      url: '/pills',
      views: {
        'menuContent': {
          templateUrl: 'templates/alarms.html',
          controller: 'Pills'
        }
      }
    })
    .state('app.pillDetail', {
      url: '/pillDetail',
      views: {
        'menuContent': {
          templateUrl: 'templates/alarmDetail.html',
          controller: 'PillDetail'
        }
      }
    })
    .state('app.settings', {
      url: '/settings',
      views: {
        'menuContent': {
          templateUrl: 'templates/config.html',
          controller: 'Settings'
        }
      }
    })

    .state('app.info', {
      url: '/info',
      views: {
        'menuContent': {
          templateUrl: 'templates/info.html',
          controller: 'Info'
        }
      }
    })

    .state('app.historial', {
      url: '/historial',
      views: {
        'menuContent': {
          templateUrl: 'templates/historial.html',
          controller: 'Historial'
        }
      }
    })

    .state('app.terms', {
      url: '/terms',
      views: {
        'menuContent': {
          templateUrl: 'templates/historial.html',
          controller: 'Terms'
        }
      }
    })
  .state('app.single', {
    url: '/playlists/:playlistId',
    views: {
      'menuContent': {
        templateUrl: 'templates/playlist.html',
        controller: 'PlaylistCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/login');
});
