'use strict';

angular.module('caleb')
 .directive('contactNav', function ($rootScope) {
   return {
	restrict: 'AEC',      
	link: function (scope, element, attrs) {
	  	scope.scrollFooter = function(){
	  		$('#calltoaction')[0].scrollIntoView();
		}
	},
 }
});