app.controller('Temp2Ctrl', ['$scope', '$rootScope', '$tm1Ui', function($scope, $rootScope, $tm1Ui) {
	$scope.validate = function(data){
		console.info(data);
		
		data.cancel();
	};
	
	$scope.runTest = function(){
	      // var element1 = $scope.values.hierarchy2 + '::Assets';
	      // element1 += '&&' + $scope.values.hierarchy1 + '::Receivables';
	      /*
	      $tm1Ui.cellGet('dev', 'General Ledger', '1', '2012', 'Year', 'Local', 'Total Europe', 'Corporate', element1, 'Amount')
	        .then(function(data1){
	        console.info('data1 %o', data1.Value);  
	      });
	      
	      $tm1Ui.dimensionHierarchyElements('dev', 'Account', 'Account Type').then(function(result1){
	        console.info('result1 %o', result1);
	      });
	      
	      $tm1Ui.dimensionHierarchyElements('dev', 'Account', 'Account').then(function(result2){
	        console.info('result2 %o', result2);
	      });
	      
	      $tm1Ui.dimensionHierarchyElement('dev', 'Account', 'Account', '1110').then(function(result3){
	        console.info('result3 %o', result3);
	      });
	      
	      */
	      
	      /*
	      $tm1Ui.dimensionHierarchyAttributes('dev', 'Account', 'Account').then(function(result3){
		    console.info('result3 %o', result3);
		  });
	      */
	      
			/*
	      $tm1Ui.dimensionElements('dev', 'Account::Account Type', 'Order Seed, Account Type', null, null, null, 0, true).then(function(result1){
	          console.info('result1 %o', result1);
	      });
	      */
	      
	      var options = {
	    		  attributes: 'Order Seed, Account Type',
	    		  elementsOnly: false,
	    		  filter: 'bal'
	      };
	      $tm1Ui.dimensionElements('dev', 'Account::Account Type', options).then(function(result2){
	          console.info('result2 %o', result2);
	      });
	      
	      /*
	      options.batchSize = undefined;
	      $tm1Ui.dimensionElements('dev', 'Account::Account Type', options).then(function(result3){
	          console.info('result3 %o', result3);
	      });
	      */
	      
	    };
}]);
