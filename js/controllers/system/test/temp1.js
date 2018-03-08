app.controller('Temp1Ctrl', ['$scope', '$rootScope', '$tm1Ui', '$timeout', function($scope, $rootScope, $tm1Ui, $timeout) {
	$scope.values = {};
	$scope.lists = {};
	
	$scope.cubeOptions = {};
	
	// others
	$scope.cubeOptions.autoRecalculate = true;
	
	// rows
	$scope.cubeOptions.rows = [];
	$scope.cubeOptions.rows.push({dimension: 'Version', subset: 'TempView1', mdx: '{[Version].[Actual], [Version].[Budget], [Version].[Forecast], [Version].[Quota]}'});
	// $scope.cubeOptions.rows.push({dimension: 'Account', subset: 'Net Income', mdx: '{[Account].AllMembers}'});
	$scope.cubeOptions.rows.push({dimension: 'Account', alias:'Description', subset: 'Net Income', elementsOrAliases: ['Net Income', 'Operating Profit']});
	
	// columns
	$scope.cubeOptions.columns = [];
	$scope.cubeOptions.columns.push({dimension: 'Year', subset: 'Default', mdx: '{[Year].[2012]}'});
	$scope.cubeOptions.columns.push({dimension: 'Period', subset: 'Default', mdx: '{[Period].[Jan], [Period].[Feb], [Period].[Mar]}'});
	
	// titles
	$scope.cubeOptions.titles = [];
	$scope.cubeOptions.titles.push({dimension: 'Currency', subset: 'Default', mdx: '{[Currency].[Local]}', elementSelected: 'Local'});
	$scope.cubeOptions.titles.push({dimension: 'Region', subset: 'Default', mdx: '{[Region].[1]}', elementSelected: '1'});
	$scope.cubeOptions.titles.push({dimension: 'Department', subset: 'Default', mdx: '{[Department].[1]}', elementSelected: '2'});
	$scope.cubeOptions.titles.push({dimension: 'General Ledger Measure', subset: 'Default', mdx: '{[General Ledger Measure].[Amount]}', elementSelected: 'Amount'});
	
	/// OTHERS
	/*
	$scope.cubeOptions.mdx = 'SELECT {[Year].[2012]} * {[Period].[Jan], [Period].[Feb], [Period].[Mar]} ON COLUMNS,';
	$scope.cubeOptions.mdx += ' {[Version].[Actual], [Version].[Budget], [Version].[Forecast], [Version].[Quota]}'
	$scope.cubeOptions.mdx += ' * {[Account].AllMembers} ON ROWS'
	$scope.cubeOptions.mdx += ' FROM [General Ledger] where([General Ledger Measure].[Amount], [Currency].[Local], [Region].[1], [Department].[1])';
	*/
	
	// cube list
	$tm1Ui.cubes('dev').then(function(cubes){
		if(cubes){
			if(_.isNil(cubes.failed)){
				$scope.lists.cubes = cubes;
				
				$scope.selectedCube = $scope.lists.cubes[0].Name;
				$scope.resetCubeViewer();
				// console.info(cubes);
			}
		}		
	});
	
	$scope.resetCubeViewer = function(){
		$scope.showViewer = false;
		
		$timeout(function(){
			$scope.showViewer = true;
		}, 500);
	};
}]);
