angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
})
.controller('CateCtrl', function($scope){
//undone
}
)
.controller('todoController',['$scope','Todo', function($scope, Todo){
        $scope.addTodo = function(todo){
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
            Todo.addTask(todo, {name: task, done: false});
            todo.newTask = '';//clear newTask input
          }
        } ;
        $scope.taskCheck = function(){
          Todo.taskCheck();
        };
        $scope.taskCount = function(todo){
          Todo.taskCount(todo);
        };
        $scope.barLong = '';//undone
        // $scope.data = {
        //    taskToAdd: null,
        //   // todoToAdd: null,
        // };
    }
])
.factory('Todo', function () {
  var todos = [
    { 'title': 'Borrow things', 
      'tasks': [
          { name:'Borrow Books',
            done: false},
          {name:'Borrow Pencil',
            done: false},
          {name:'Borrow Hair',
            done: false}
      ]},
      { 'title': 'Buy foods', 
        'tasks': [
          { name:'Buy Vegetables',
            done: false},
          {name:'Buy Mushroom',
            done: false},
          {name:'Buy Dinosaur',
            done: false}
      ]}
      
  ];
  return {
    //to retrieve the list
    list: function () {
      todos.forEach(function(e){e.newTask = '';});
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
    addTask: function(todo,task){
      console.log(todo);
      todo.tasks.push(task);
      window.localStorage['userTask'] = JSON.stringify(todos);
    },
    taskCheck: function(){
      window.localStorage['userTask'] = JSON.stringify(todos);
    },
    taskCount: function(todo){ //undone
      console.log(todo.tasks.length);
      var count = 0;
      todo.tasks.forEach(function(e){
        if(e.done){ count++;}
      });
      console.log(count);
      var percent = count/todo.tasks.length;
      console.log(percent);
      document.getElementsByClassName('percentBar').style.width = percent*100+'%';
      console.log(document.getElementsByClassName('percentBar').style.width);
      // return percent*100+'%' ;
    }
  }
})


