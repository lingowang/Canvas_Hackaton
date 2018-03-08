app.controller('ChartCtrl', ['$scope', '$rootScope', '$interval', '$timeout', '$state', '$stateParams', '$http', 'uuid2', '$ngBootbox', '$log',
                                 function($scope, $rootScope, $interval, $timeout, $state, $stateParams, $http, uuid2, $ngBootbox, $log) {
	
	$scope.panel = {
			body: {height:'40px'},
			footer: {height:'300px'}
	};
	
	$scope.chart = {
			height:'200',
			margin:{
				top: 10,
	            right: 10,
	            bottom: 45,
	            left: 100
			}
	};
	
	// Option #1: Via the directive exposed on the tm1-ui-chart, on certain chart types. Check Help section for more details.
	$scope.onChartElementClick = function(chartElement){		
		$scope.selections.barMonth = chartElement.data.elements.split(',')[2];	
	};	

	// Option #2: Via Custom Options Override (below is applicable for the multiBar and multiBarHorizontal charts at least)
	$scope.optionsOverride = {
			chart:{
				multibar:{
					dispatch:{
						elementClick:function(e){
							 var message = '<p>Cube: ' + e.data.cube + '</p>'
							 message += '<p>Elements: ' + e.data.elements + '</p>';
							 message += '<p>Value: ' + e.data.value + '</p>';
							 $ngBootbox.alert(message);
						}
					}
				}
				
			}
	};

}]);
