app.controller('SampleAdvanceChartCtrl', ['$scope', '$rootScope', '$interval', '$timeout', '$tm1Ui', '$stateParams', '$http', '$ngBootbox',
                                          function($scope, $rootScope, $interval, $timeout, $tm1Ui, $stateParams, $http, $ngBootbox) {
	
	// variables

	$scope.selections = {
		barMonth: ''
	};

	$scope.options = {
			pageLeftlocation:'html/samples/sample-advance-chart.left.html',
			pageRightlocation:'html/samples/sample-advance-chart.right.html',
			
			type1Charts:
			[
			 {name:'Bar', type:'discreteBar'},
			 {name:'Pie', type:'pie'},
			 {name:'Donut', type:'donut'},
			 {name:'Line', type:'line'}
			],
			type2Charts:
			[
			 {name:'Lines', type:'line'},
			 {name:'Multi Bar', type:'multiBar'},
			 {name:'Multi Bar - Horizontal', type:'multiBarHorizontal'},
			 {name:'Lines with Focus Chart', type:'lineWithFocus'}
			]
	};
	
	$scope.chart = {
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
							// uncomment below line if you want to check what is being passed on
							// console.info(e); 
							
							// var message = '<p>Cube: ' + e.data.cube + '</p>'
							// message += '<p>Elements: ' + e.data.elements + '</p>';
							// message += '<p>Value: ' + e.data.value + '</p>';
							// $ngBootbox.alert(message);
							
							$scope.selections.barMonth = e.data.elements.split(',')[2];
						}
					}
				}
				
			}
	};
	
	
	// on mobile i.e. iPad, tablets, phones, etc. the detection of the click is via mouseOver event.
	// the isMobile library can detect which devices
	// for more info, go to About page of your Canvas application and check the link of this library under Third Party Libraries
	if(isMobile.any){
		$scope.optionsOverride.chart.multibar.dispatch.elementClick = undefined;
		$scope.optionsOverride.chart.multibar.dispatch.elementMouseover = function(e){       
			$scope.selections.barMonth = e.data.elements.split(',')[2];
		};
	}
	
}]);
