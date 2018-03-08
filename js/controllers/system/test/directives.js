app.controller('DirectivesCtrl', ['$scope', '$rootScope', '$log', '$tm1Ui','$location',function($scope, $rootScope, $log, $tm1Ui, $location) {
   /*
    *     defaults.* are variables that are declared once and are changed in the page, otherwise known as constants in programming languages
    *     lists.* should be used to store any lists that are used with ng-repeat, i.e. tm1-ui-element-list
    *     selections.* should be used for all selections that are made by a user in the page
    *     values.* should store the result of any dbr, dbra or other values from server that you want to store to use elsewhere, i.e. in a calculation
    * 
    *     For more information: https://github.com/cubewise-code/canvas-best-practice
    */
    
    $scope.defaults = {
        dimension : 'Account',
        attribute : 'Account Type',
        elementID : '1',
        alias : 'Description',
        subset : 'Expense'       
    };

    $scope.selections = {
        dimension : $scope.defaults.dimension,
        dimensionURL : $scope.defaults.dimension,
        attribute : $scope.defaults.attribute,
        attributeURL : $scope.defaults.attribute,
        elementID : $scope.defaults.elementID,
        elementIDURL : $scope.defaults.elementID,
        alias : $scope.defaults.alias,
        aliasURL : $scope.defaults.alias,
        subset : $scope.defaults.subset,
        subsetURL : $scope.defaults.subset
    };
    $scope.lists = {};
    $scope.values = {
        nbErrors : 0,
        element1 : []
    };

    // Manage Error
    $scope.propertyExists = function(object, property){
		if(object && object[property] && !_.isEmpty(object[property])){
			return true;		
		}
		else{
			return false;
		}
    };
    
    $scope.ResetError = function(){
		$scope.values.nbErrors = 0 ;
    };

    $scope.IncrementNbError = function(){
		$scope.values.nbErrors = $scope.values.nbErrors + 1 ;
    };

    $scope.RunTestTM1uiElement = function(){
        // Test tm1-ui-element
        console.info('test',$scope.selections.elementID,$scope.values.element1.key);

        if( $scope.propertyExists(values.element1, 'key') && $scope.selections.elementID == $scope.values.element1.key){
                
            }else{
                $scope.IncrementNbError();
            }
    };

    $scope.RunTest = function(){
        $scope.RunTestTM1uiElement();
    }

    // Dimension URL

    if($location.search().dimension){
		$scope.selections.dimensionURL = $location.search().dimension;
    }

    $scope.setDimension = function(dimension){
		$scope.selections.dimensionURL = dimension;
		if(dimension != $scope.defaults.dimension){
			// Set the URL parameter
			$location.search("dimension", dimension);
		}
		else {
			// If the parameter equals the default value remove it from the URL
			$location.search("dimension", null);
		}
		
		$tm1Ui.dimensionSubsets('dev', dimension).then(function(subsets){
			$scope.lists.currentDimensionSubsets = subsets;
		});
    };
    
    // Attribute URL

    if($location.search().attribute){
        $scope.selections.attributeURL = $location.search().attribute;
    }

    $scope.setAttribute = function(attribute){
        $scope.selections.attributeURL = attribute;
        if(attribute != $scope.defaults.attribute){
            // Set the URL parameter
            $location.search("attribute", attribute);
        }
        else {
            // If the parameter equals the default value remove it from the URL
            $location.search("attribute", null);
        }
    };

    // ElementID URL

    if($location.search().elementID){
        $scope.selections.elementIDURL = $location.search().elementID;
    }

    $scope.setElementID = function(elementID){
        $scope.selections.elementID = elementID;
        if(elementID != $scope.defaults.elementID){
            // Set the URL parameter
            $location.search("elementID", elementID);
        }
        else {
            // If the parameter equals the default value remove it from the URL
            $location.search("elementID", null);
        }
    };

    // Alias URL

    if($location.search().alias){
        $scope.selections.aliasURL = $location.search().alias;
    }

    $scope.setAlias = function(alias){
        $scope.selections.aliasURL = alias;
        if(alias != $scope.defaults.alias){
            // Set the URL parameter
            $location.search("alias", alias);
        }
        else {
            // If the parameter equals the default value remove it from the URL
            $location.search("alias", null);
        }
    };

    // Subset URL

    if($location.search().subset){
        $scope.selections.subsetURL = $location.search().subset;        
        $scope.selections.subset = $scope.selections.subsetURL; // initialize subset URL
    }

    $scope.setSubset = function(subset){
        $scope.selections.subsetURL = subset;
        if(subset != $scope.defaults.subset){
            // Set the URL parameter
            $location.search("subset", subset);
        }
        else {
            // If the parameter equals the default value remove it from the URL
            $location.search("subset", null);
        }
    };



    
}]);
