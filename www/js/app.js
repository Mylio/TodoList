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
    $stateProvider
      .state('TuDu', {
        url: '/tudu',
        abstract: true,
        templateUrl: 'view/home.html'  //root at index.html
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
        url: '/:categoryName/:taskName',
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

app.factory('Todo', function () {
  var todos = [
    { 'title': 'Borrow the book', 'done': false }
  ];
  return {
    //to retrieve the list
    list: function () {
      return todos;
    },
    add: function (todo) {
      //splice(index, howManyItemsToDelete,optional-addNewItem);
      //splice will return the new array
      todos.splice(0, 0, todo);
      window.localStorage['userTask'] = JSON.stringify(todos);
    },
    getUserTask: function () {
      var userTask = window.localStorage['userTask'];
      if (userTask) {
        todos = JSON.parse(userTask);
        console.log(todos);
      } else {
        console.log('none local task');
      }
    }
  }
})


