angular.module('starter')
.controller('todoController',['$scope','Todo',
    function($scope, Todo){
        $scope.todos = Todo.list();
        $scope.addTodo = function(todo){
            todo.done = false;
            //copy a to b
            Todo.add(angular.copy(todo));
            todo.title = '';
        };
    }
]);