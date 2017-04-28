(function (angular) {
	'use strict';
	var app=angular.module("todosApp",[])
	app.controller("todosController",['$scope',function($scope){
		$scope.newTodo=''
		$scope.id=0
		$scope.isShow=0
		$scope.isAll=false
		$scope.isHide=false
		$scope.firstArr=[
			{id:0,name:'a',completed:true},
			{id:1,name:'b',completed:false},
		]
		$scope.todos=$scope.firstArr
		$scope.getId=function(){
			if($scope.firstArr.length>0){
				$scope.id=$scope.firstArr[$scope.firstArr.length-1].id+1
			}
			return $scope.id
		}
		$scope.add=function(){
			if($scope.newTodo){
				$scope.firstArr.push({
					id:$scope.getId(),
					name:$scope.newTodo,
					completed:false
				})
				$scope.newTodo=''
				$scope.isToggle()
			}
			if($scope.firstArr.length!=0){
				$scope.isHide=false
			}
		}
		$scope.remove=function(__this){
			var _this=null
			arguments.length==0?_this=this:_this=__this
			$scope.firstArr.forEach(function(todo,i){
				if(todo.id==_this.item.id){
					$scope.firstArr.splice(i,1)
					return false
				}
			})
			$scope.isToggle()
			if($scope.firstArr.length==0){
				$scope.isHide=true
			}
		}
		$scope.edit=function(id){
			$scope.isEditingId=id
			setTimeout(function(){
				document.getElementsByClassName("blur")[id].focus()
			},0)
		}
		$scope.save=function(){
			if(!this.item.name){
				var _this=this
				$scope.remove(_this)
			}
			$scope.isEditingId=-1
		}
		$scope.toggleAll=function(){
			$scope.isAll=!$scope.isAll
			$scope.firstArr.forEach(function(todo,i){
				todo.completed=$scope.isAll
			})
			$scope.isShowing()
		}
		$scope.isToggle=function(){
			var flag=true
			$scope.firstArr.forEach(function(todo,i){
				if(!todo.completed){
					flag=false
					return false
				}
			})
			$scope.isAll=flag
			$scope.isShowing()
		}
		$scope.isShowing=function(){
			if($scope.isShow == 1){
				$scope.showActive()
			}
			if($scope.isShow == 2){
				$scope.showCompleted()
			}
		}
		$scope.leftNum=function(){
			var count=0
			$scope.firstArr.forEach(function(todo,i){
				if(!todo.completed){
					count++
				}
			})
			return count
		}
		$scope.showAll=function(){
			$scope.isShow=0
			$scope.todos=$scope.firstArr
		}
		$scope.showActive=function(){
			var activeArr=[]
			$scope.isShow=1
			$scope.firstArr.forEach(function(todo,i){
				if(!todo.completed){
					activeArr.push(todo)
				}
			})
			$scope.todos=activeArr
		}
		$scope.showCompleted=function(){
			var completeArr=[]
			$scope.isShow=2
			$scope.firstArr.forEach(function(todo,i){
				if(todo.completed){
					completeArr.push(todo)
				}
			})
			$scope.todos=completeArr
		}
		$scope.clearCompleted=function(){
			for(var i=0;i<$scope.firstArr.length;i++){
				if($scope.firstArr[i].completed){
					$scope.firstArr.splice(i,1)
					i--
				}
			}
			$scope.isToggle()
			if($scope.firstArr.length==0){
				$scope.isHide=true
			}
		}
	}])

})(angular);