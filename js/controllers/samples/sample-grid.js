app.controller('SampleGridCtrl', ['$scope', '$rootScope', '$interval', '$timeout', '$state', '$stateParams', '$http', '$tm1Ui', '$templateCache', 'uiGridConstants', function($scope, $rootScope, $interval, $timeout, $state, $stateParams, $http, $tm1Ui, $templateCache, uiGridConstants) {

	$scope.instance = $stateParams.instance;
	
	$scope.defaults = {
		mdxId: "Data Entry",
		year: "2012",
		region: "England",
		department: "Executive General and Administration",
		showEmpty: false,
		collapseAll: true
	};

	$scope.selections = {
		mdxId: $scope.defaults.mdxId,
		year: $scope.defaults.year,
		region: $scope.defaults.region,
		department: $scope.defaults.department,
		showEmpty: $scope.defaults.showEmpty,
		collapseAll: $scope.defaults.collapseAll
	};	
	
	// The header template uses the object instead of a value and will hide headers on row if in a stacked dimension
	// Also supports expand and collapse with icons for each
	var cellHeaderTemplate = "<div class=\"ui-grid-cell-contents\" ng-if=\"COL_FIELD.visible\" ng-class=\"{'tm1-ui-element-consol': COL_FIELD.element.type == 'C'}\"  title=\"TOOLTIP\" ><span class=\"tm1-ui-indent\" ng-repeat=\"item in COL_FIELD.element.indent\"></span><span ng-if=\"COL_FIELD.element.type != 'C'\" style=\"margin-right:20px;\"></span><i ng-if=\"COL_FIELD.element.type == 'C' && !COL_FIELD.element.collapsed\" class=\"fa fa-angle-down fa-fw\" style=\"margin-right:5px; cursor: pointer;\" ng-click=\"COL_FIELD.element.toggle()\"></i><i ng-if=\"COL_FIELD.element.type == 'C' && COL_FIELD.element.collapsed\" class=\"fa fa-angle-right fa-fw\" style=\"margin-right:5px; cursor: pointer;\" ng-click=\"COL_FIELD.element.toggle()\"></i>{{COL_FIELD.alias CUSTOM_FILTERS}}</div>";
	// The cell template uses the cell object
	var cellTemplate = "<div class=\"ui-grid-cell-contents\" ng-class=\"{'tm1-ui-element-consol': COL_FIELD.isReadOnly }\" title=\"TOOLTIP\" uib-tooltip=\"{{COL_FIELD.message}}\">{{COL_FIELD CUSTOM_FILTERS}}</div>";
	var editorTemplate = "<div><form name=\"inputForm\"><input type=\"INPUT_TYPE\" style=\"border:0px none; text-align:right; padding: 5px;\" ng-class=\"'colt' + col.uid\" ui-grid-editor ng-model=\"MODEL_COL_FIELD.value\"></form></div>";
	
	// This sort used the value of the cell, i.e. a.value and b.value
	var sortNumber = function(a, b){
		return a.value - b.value;
	};
	
	var sortElements = function(a, b){
		if(a.name < b.name)
			return -1;
		if( a.name > b.name)
			return 1;
		return 0;
	}
	
	$scope.toggleFiltering = function(){
		$scope.gridOptions.enableFiltering = !$scope.gridOptions.enableFiltering;
    	$scope.gridApi.core.notifyDataChange( uiGridConstants.dataChange.COLUMN );
	};
	
	$scope.toggleShowEmpty = function(){
		$scope.selections.showEmpty = !$scope.selections.showEmpty;
		$scope.query(false);
	}
	
	// Define the grid options for the grid ID: gridOptions
	$scope.gridOptions = {
		enableColumnResizing: true,
		enableGridMenu: true,
		filterOptions: $scope.filterOptions,
		cellTemplate: cellTemplate,
		editableCellTemplate: editorTemplate,
		data: [],
		onRegisterApi: function(gridApi) {
		  $scope.gridApi = gridApi;
		  gridApi.edit.on.afterCellEdit($scope, function(rowEntity, colDef, newValue, oldValue) {
		    newValue.update($scope.query, false);
		  });
		},
		columnDefs: [
			{field:"index", displayName: "#", maxWidth: 40, allowCellFocus: false, enableCellEdit: false, enableFiltering: false},
			{field:"Account", displayName: "Account", minWidth: 250, allowCellFocus: false, enableCellEdit: false, cellTemplate: cellHeaderTemplate, sortingAlgorithm: sortElements, 
				filter:  {
					condition: function(searchTerm, cellValue){
				         return cellValue.alias.toLowerCase().indexOf(searchTerm.toLowerCase()) >= 0;
					}
				}
			},
			{field:"year", displayName: "Year", cellTemplate: cellTemplate, cellFilter: 'gridNumber:0', cellClass: "text-right", sortingAlgorithm: sortNumber, enableFiltering: false},
			{field:"01", displayName: "Jan", cellTemplate: cellTemplate, cellFilter: 'gridNumber:0', cellClass: "text-right", sortingAlgorithm: sortNumber, enableFiltering: false},
			{field:"02", displayName: "Feb", cellTemplate: cellTemplate, cellFilter: 'gridNumber:0', cellClass: "text-right", sortingAlgorithm: sortNumber, enableFiltering: false},
			{field:"03", displayName: "Mar", cellTemplate: cellTemplate, cellFilter: 'gridNumber:0', cellClass: "text-right", sortingAlgorithm: sortNumber, enableFiltering: false},
			{field:"04", displayName: "Apr", cellTemplate: cellTemplate, cellFilter: 'gridNumber:0', cellClass: "text-right", sortingAlgorithm: sortNumber, enableFiltering: false},
			{field:"05", displayName: "May", cellTemplate: cellTemplate, cellFilter: 'gridNumber:0', cellClass: "text-right", sortingAlgorithm: sortNumber, enableFiltering: false},
			{field:"06", displayName: "Jun", cellTemplate: cellTemplate, cellFilter: 'gridNumber:0', cellClass: "text-right", sortingAlgorithm: sortNumber, enableFiltering: false},
			{field:"07", displayName: "Jul", cellTemplate: cellTemplate, cellFilter: 'gridNumber:0', cellClass: "text-right", sortingAlgorithm: sortNumber, enableFiltering: false},
			{field:"08", displayName: "Aug", cellTemplate: cellTemplate, cellFilter: 'gridNumber:0', cellClass: "text-right", sortingAlgorithm: sortNumber, enableFiltering: false},
			{field:"09", displayName: "Sep", cellTemplate: cellTemplate, cellFilter: 'gridNumber:0', cellClass: "text-right", sortingAlgorithm: sortNumber, enableFiltering: false},
			{field:"10", displayName: "Oct", cellTemplate: cellTemplate, cellFilter: 'gridNumber:0', cellClass: "text-right", sortingAlgorithm: sortNumber, enableFiltering: false},
			{field:"11", displayName: "Nov", cellTemplate: cellTemplate, cellFilter: 'gridNumber:0', cellClass: "text-right", sortingAlgorithm: sortNumber, enableFiltering: false},
			{field:"12", displayName: "Dec", cellTemplate: cellTemplate, cellFilter: 'gridNumber:0', cellClass: "text-right", sortingAlgorithm: sortNumber, enableFiltering: false}
		]
	};
	
	$scope.query = function(loading){
		
		$scope.loading = loading;
		$scope.message = null;
		
		// options required by cubeExecuteNamedMDX
		var options = {
			showEmpty: $scope.selections.showEmpty, 
			parameters: {
				Year: $scope.selections.year, 
				Region: $scope.selections.region, 
				Department: $scope.selections.department
			}
		};
		
		// Execute the MDX query stored in \WEB-INF\resources\mdx_named.json
		$tm1Ui.cubeExecuteNamedMdx("dev", $scope.selections.mdxId, options).then(function(result) {
			if(!result.failed){
				// Default to expanding 'Operating Expenses'
				var expanded = ["60"];
				if($scope.dataset){
					// If there is already a dataset use the currently expanded elements
					expanded = $scope.dataset.expanded();
				}
				$scope.dataset = $tm1Ui.resultsetTransform("dev", "General Ledger", result, {expand: expanded, alias: {Account: "Description", Department: "Description"}});
				// Set the ui-grid data to the rows array on the dataset object
				$scope.gridOptions.data = $scope.dataset.rows;
			}
			else {
				$scope.message = result.message;
			}
			$scope.loading = false;
		});
	};
	
	$scope.query(true);
	
	
}]);