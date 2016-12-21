angular.module('starter.controllers', [])

  .controller('DashCtrl', function ($scope) { })

  .controller('ChatsCtrl', function ($scope, Chats) {
    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //
    //$scope.$on('$ionicView.enter', function(e) {
    //});

    $scope.chats = Chats.all();
    $scope.remove = function (chat) {
      Chats.remove(chat);
    };
  })

  .controller('ChatDetailCtrl', function ($scope, $stateParams, Chats) {
    $scope.chat = Chats.get($stateParams.chatId);
  })

  .controller('AccountCtrl', function ($scope) {
    $scope.settings = {
      enableFriends: true
    };
  })
  .controller('CateCtrl', function ($scope) {
    //undone
  }
  )
  .controller('todoController', function ($scope, Todo, $ionicPopup, $timeout) {
    $scope.addTodo = function (todo) {
      todo.tasks = [];
      //copy a to b
      Todo.add(angular.copy(todo));
      todo.title = '';
      todo.newTask = '';
    };
    $scope.getUserTask = Todo.getUserTask(); //this must be above Todo.list();
    $scope.todos = Todo.list();
    $scope.addTask = function (todo) {
      //var task = $scope.data.taskToAdd;
      var task = todo.newTask;//not $scope.todo.newTask
      if (task) {
        Todo.addTask(todo, { name: task, done: false });
        todo.newTask = '';//clear newTask input
      }
    };
    $scope.taskCheck = function () {
      Todo.taskCheck();
    };
    $scope.taskCount = function (todo) {
      Todo.taskCount(todo);
    };

    $scope.taskPercentage = function (todo) {
      //reduce
      var count = todo.tasks.reduce(function (acc, t) {
        //if task done, acc+1, 
        //initial value = 0 ,acc and t 's order are default? 
        return acc + (t.done ? 1 : 0)
      }, 0);
      return count / todo.tasks.length;
    };
    //popUp reference: https://ionicframework.com/docs/api/service/$ionicPopup/
    $scope.showPopup = function (todo) {
      $scope.data = {}
      var myPopup = $ionicPopup.show({
        template: '<input type="color" ng-model="data.color">',
        title: 'Choose another color',
        subTitle: 'Please use normal things',
        scope: $scope,
        buttons: [ // buttons to place in the pop up footer
          { text: 'Cancel' },
          {
            text: '<b>Save</b>',
            type: 'button-positive',
            onTap:  function(e){
              //prevent popup from closing when Tapped
              e.preveantDefault();
            return $scope.data.color;
          }    
          }
        ],
      });
      //then(), take to para. , callback functions for success and failure(optional)
      myPopup.then(function (res) {
      //  console.log('Tapped!', res);
        Todo.todoColor(todo,res);
      });
    };   
  }
  )

  .factory('Todo', function () {
    var todos = [
      {
        'title': 'Borrow things',
        'tasks': [
          {
            name: 'Borrow Books',
            done: false
          },
          {
            name: 'Borrow Pencil',
            done: false
          },
          {
            name: 'Borrow Hair',
            done: false
          }
        ]
      },
      {
        'title': 'Buy foods',
        'tasks': [
          {
            name: 'Buy Vegetables',
            done: false
          },
          {
            name: 'Buy Mushroom',
            done: false
          },
          {
            name: 'Buy Dinosaur',
            done: false
          }
        ]
      }

    ];
    return {
      //to retrieve the list
      list: function () {
        todos.forEach(function (e) { e.newTask = ''; });
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
      },
      addTask: function (todo, task) {
        console.log(todo);
        todo.tasks.push(task);
        window.localStorage['userTask'] = JSON.stringify(todos);
      },
      taskCheck: function () {
        window.localStorage['userTask'] = JSON.stringify(todos);
      },
      todoColor: function(todo,color){
        todo.color = color;
        window.localStorage['userTask'] = JSON.stringify(todos);
      },

    }
  })


