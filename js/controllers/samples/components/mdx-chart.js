app.controller('MdxChartCtrl', ['$scope', '$rootScope', '$tm1Ui', '$timeout', function($scope, $rootScope, $tm1Ui, $timeout) {
	$scope.lists = {};
	$scope.values = {};
	
	$scope.lists.instances = [];
	$scope.values = {instance: '', showCharts: false, timeStart: 0, timeEnd: 0};
	
	$scope.values.optionsOverride = {
		chart:{
			showXAxis: false, 
			showYAxis: false,
			
			tooltip: {
				enabled: false
			},
			
			interactiveLayer:{
				tooltip:{
					enabled: false
				}
			}
		}	
	};
	
	$scope.values.chartMargin = {
			top: 1,
			left: 1,
			right: 1,
			bottom: 1
	};
	
	$scope.getChartData = function(row){
		var rowChartData = [];
		
		_.forEach(row.cells, function(cell){
			rowChartData.push({x:cell.key, y:cell.value});
		});
		
		return rowChartData;
	};
	
	$scope.extractCube = function(mdx){
		var cube = mdx.substr(mdx.toLowerCase().indexOf('from') + 4);
		
		if(cube.toLowerCase().indexOf('where') != -1){
			cube = cube.substring(0, cube.toLowerCase().indexOf('where'));
		}
		
		cube = cube.trim();
		
		if(cube.indexOf('[') == 0 && cube.indexOf(']') == cube.length - 1){
			cube = cube.substring(1, cube.length - 1);
		}
		
		return cube;
	};
	
	$scope.executeQuery = function(){	
		if($scope.values.instance){
			if($scope.mdxQuery == undefined){
				$scope.mdxQuery = 'SELECT NON EMPTY {[Period].[Jan], [Period].[Feb], [Period].[Mar]} ON COLUMNS, ';
				$scope.mdxQuery += 'NON EMPTY {[Account].AllMembers} ON ROWS ';
				$scope.mdxQuery += 'FROM [General Ledger] ';
				$scope.mdxQuery += 'where(';
				$scope.mdxQuery += '[Version].[Actual], ';
				$scope.mdxQuery += '[General Ledger Measure].[Amount], ';
				$scope.mdxQuery += '[Currency].[Local], ';
				$scope.mdxQuery += '[Region].[1], ';
				$scope.mdxQuery += '[Department].[1], ';				
				$scope.mdxQuery += '[Year].[2012]';
				$scope.mdxQuery += ')';
			}
			
			$scope.values.timeStart = _.now();
			$scope.values.timeEnd = 0;
			$tm1Ui.cubeExecuteMdx($scope.values.instance, $scope.mdxQuery).then(function(data){
				$scope.values.timeEnd = _.now();
				
				if(!data.failed){
					$scope.values.table = $tm1Ui.resultsetTransform($scope.values.instance, $scope.extractCube($scope.mdxQuery), data);
					
					// add chart data
					_.forEach($scope.values.table.rows, function(row){
						row.chartData = $scope.getChartData(row);
					});	
				}	
			});
		}
	};	
	
	// finally
	// get available instances
	$tm1Ui.applicationInstances().then(function(instances){
		angular.forEach(instances, function(instance){
			$scope.lists.instances.push(instance.name);
		});
		
		$scope.values.instance = $scope.lists.instances[0];
		$scope.executeQuery();
	});
	
}]);
