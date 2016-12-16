// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('starter', ['ionic'])

  .run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
      if (window.cordova && window.cordova.plugins.Keyboard) {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

        // Don't remove this line unless you know what you are doing. It stops the viewport
        // from snapping when text inputs are focused. Ionic handles this internally for
        // a much nicer keyboard experience.
        cordova.plugins.Keyboard.disableScroll(true);
      }
      if (window.StatusBar) {
        StatusBar.styleDefault();
      }
    });
  })

  .config(function ($stateProvider, $urlRouterProvider) {
    //set routing 
    //only one state can be active at one time
    //state is an object, has properties: name / views / url(what the browser's URL will be / params / resolve)
    $stateProvider
      .state('tudu', {
        url: '/tudu',
         abstract: true,
         templateUrl: 'view/category.html'  //root at index.html
      })

      .state('category', {
        url: '/category',
        views: {
          'category':{
            templateUrl: 'view/category.html',
            controller: 'cateCtrl'
          }
        }
      })

      .state('task', {
        url: '/category/:categoryName',
        views: {
          'task':{
            templateUrl: 'view/task.html',
            controller: 'taskCtrl'
          }
        }
      });
      // if none of the above states are matched, use this as the fallback
      $urlRouterProvider.otherwise('/tudu');
  })



