app.controller('CubeViewerCtrl', ['$scope', '$rootScope', '$tm1Ui', '$timeout', function($scope, $rootScope, $tm1Ui, $timeout) {
	$scope.values = {};
	$scope.lists = {};
	
	$scope.values.hideOptions = false;
	$scope.values.useOwnMDX = false;
	$scope.values.useGLOverride = false;
	$scope.values.sampleOverrideCube = 'General Ledger';
	
	$scope.values.mdx = 'SELECT {[Balance Sheet Measure].[Balance Sheet Measure].DefaultMember} on COLUMNS , {[Account].[Account].DefaultMember} on ROWS FROM [Balance Sheet] WHERE ([Department].[Department].[1],[Region].[Region].[1],[Currency].[Currency].[Local],[Time].[Time].[All Months],[Version].[Version].[vs])';
	
	$scope.cubeOptions = {};
	
	// others
	$scope.cubeOptions.autoRecalculate = true;
	$scope.cubeOptions.allowViewSave = true;
	$scope.cubeOptions.allowSandboxOperation = true;
	$scope.cubeOptions.allowSandboxPublishChanges = true;
	$scope.cubeOptions.allowSandboxCreateDelete = true;
	$scope.cubeOptions.hideHierarchies = false;
	$scope.cubeOptions.hideToolbar = false;
	$scope.cubeOptions.hideTitle = false;
	$scope.cubeOptions.hideMdx = false;
	$scope.cubeOptions.pageSize = '';
	$scope.cubeOptions.tableClass = 'table table-condensed table-bordered';
	
	$scope.cubeOptions.tableMode = '0';
	$scope.cubeOptions.viewTypePriority = 'canvas';
	
	$scope.lists.pageSizes = [
	                          {value: '', display: 'None'},
	                          {value: '5', display: '5 Per Page'},
	                          {value: '15', display: '15 Per Page'}
	];
	
	$scope.lists.sandboxes = [
	      {sandbox:'', display:'Please Select'}, 
	      {sandbox:'Sandbox1', display:'Sandbox1'}, 
	      {sandbox:'Sandbox2', display:'Sandbox2'}
	];
	
	$scope.lists.tableStyles = [
	                	      {tableStyle:'', display:'Default'}, 
	                	      {display:'Striped', tableStyle:'table table-striped'}, 
	                	      {display:'Bordered', tableStyle:'table table-bordered'},
	                	      {display:'With Hover', tableStyle:'table table-hover'},
	                	      {display:'Condensed', tableStyle:'table table-condensed'},
	                	      {display:'Bordered Condensed', tableStyle:'table table-condensed table-bordered'}
	];
	
	$scope.resetGLOverride = function(){
		function clearArray(arrayToClear){
			if(!_.isNil(arrayToClear)){
				arrayToClear.length = 0;
			}
			
			arrayToClear = undefined;
		}
		
		clearArray($scope.cubeOptions.columns);
		clearArray($scope.cubeOptions.rows);
		clearArray($scope.cubeOptions.titles);		
	};
	
	$scope.addGLOverride = function(){
		
		// priorities: elementsOrAliases > subset > mdx
		
		// rows
		$scope.cubeOptions.rows = [];
		$scope.cubeOptions.rows.push({dimension: 'Version', mdx: '{[Version].[Actual], [Version].[Budget], [Version].[Forecast], [Version].[Quota]}', alias:'Description'});
		$scope.cubeOptions.rows.push({dimension: 'Account', alias:'Description', subset: 'Net Income', elements: ['Net Income', 'Operating Profit']});
		
		// columns
		$scope.cubeOptions.columns = [];
		$scope.cubeOptions.columns.push({dimension: 'Year', subset: 'Default', mdx: '{[Year].[2012]}'});
		$scope.cubeOptions.columns.push({dimension: 'Period', subset: 'Default', mdx: '{[Period].[Jan], [Period].[Feb], [Period].[Mar]}'});
		
		// titles
		$scope.cubeOptions.titles = [];
		$scope.cubeOptions.titles.push({dimension: 'Currency', subset: 'Default', mdx: '{[Currency].[Local]}', elementSelected: 'Local'});
		$scope.cubeOptions.titles.push({dimension: 'Region', subset: 'Default', mdx: '{[Region].[1]}', elementSelected: '1'});
		$scope.cubeOptions.titles.push({dimension: 'Department', subset: 'Default', mdx: '{[Department].[1]}', elementSelected: '2'});
		$scope.cubeOptions.titles.push({dimension: 'General Ledger Measure', mdx: '{[General Ledger Measure].[Amount]}', elementSelected: 'Amount'});
		
		$scope.selectedCube = $scope.values.sampleOverrideCube;
		$scope.resetCubeViewer();
	};	
	
	$scope.updateCubeOptions = function(){
		if($scope.values.useGLOverride){
			$scope.addGLOverride();
		}
		else{
			$scope.resetGLOverride();
		}
	};
	
	$scope.updateCubeSandbox = function(){
		console.info($scope.selectedSandbox);
	};
	
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
		
		if($scope.selectedCube != $scope.values.sampleOverrideCube){
			$scope.values.useGLOverride = false;
			$scope.resetGLOverride();
		}
		
		$timeout(function(){
			$scope.showViewer = true;
		}, 500);
	};
	
	$scope.initPageControls = function(){
		if($scope.values.useCustomPagination){
			if($scope.values.api.isBuiltinPaginationVisible()){
				$scope.values.api.toggleBuiltinPagination();
			}
		}
		else{
			if(!$scope.values.api.isBuiltinPaginationVisible()){
				$scope.values.api.toggleBuiltinPagination();
			}
		}
	};
	
}]);
