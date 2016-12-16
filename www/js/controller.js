angular.module('starter')
.controller('todoController',['$scope','Todo',
    function($scope, Todo){
        $scope.addTodo = function(todo){
            todo.tasks = [];
            //copy a to b
            Todo.add(angular.copy(todo));
            todo.title = '';
        };
        $scope.getUserTask = Todo.getUserTask();
        $scope.todos = Todo.list();
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

.controller('cateCtrl', function($scope, Todo){})

.controller('taskCtrl', function($scope, Todo){})
