app.controller('ComponentCtrl', ['$scope', '$rootScope', '$interval', '$timeout', '$state', '$stateParams', '$http', 
                            	function($scope, $rootScope, $interval, $timeout, $state, $stateParams, $http) {
	
 	$scope.colors = [{color:"#9FD000"}, {color:"#0085B9"}, {color:"#FF9214"}];
 	$scope.selected = {value: 0};

 	$scope.menuDescription = {};
 	$scope.menuDescription['subnm'] = 'Create all types of dropdown lists';
 	$scope.menuDescription['dbr'] = 'Get data from a TM1 cube using DBR';
 	$scope.menuDescription['dbr-group-update'] = 'Target group of DBRs to update';
 	$scope.menuDescription['dbr-hierarchy'] = 'Query alternate hierarchies with DBR';
 	$scope.menuDescription['dbr-hidden'] = 'A lightweight DBR version for purely reading on the value.';
 	$scope.menuDescription['dbr-read-only'] = 'For DBRs that is always read-only';
 	$scope.menuDescription['dbr-image'] = 'Use DBRs to display an image';
 	$scope.menuDescription['dbra'] = 'Get attributes values from a dimension';
 	$scope.menuDescription['process'] = 'Run a TM1 process from Canvas';
 	$scope.menuDescription['store'] = 'Store user or global prefences in your prefered TM1 cube';
 	$scope.menuDescription['activeform'] = 'Create table with dynamic rows and drill-down functionality';
 	$scope.menuDescription['tm1web'] = 'Show cubeviews or websheets from TM1 Web';
 	$scope.menuDescription['mdx-chart'] = 'Show bar charts per rows using MDX';
 	$scope.menuDescription['element-info'] = 'Retrieve an element\'s information';
 	$scope.menuDescription['element-list'] = 'Create a list of elements from SUBSET or MDX';
 	$scope.menuDescription['charts'] = 'All charts which have been pre-built in Canvas';
 	$scope.menuDescription['upload'] = 'How to create upload files button';
 	$scope.menuDescription['mdx-table'] = 'Format MDX Query into a table';
 	$scope.menuDescription['login-info'] = 'Design your own Login page';
 	$scope.menuDescription['session-info'] = 'Utilize the Session button';
 	$scope.menuDescription['progress-update'] = 'Show a display while waiting for TM1';
 	$scope.menuDescription['user-info'] = 'Get user information and use on your page';
 	$scope.menuDescription['export-info'] = 'Export tables';
 
}]);
