app.controller('ServicesCtrl', ['$scope', '$rootScope', '$timeout', '$state', '$stateParams', '$tm1Ui', '$log', '$q',
                                function($scope, $rootScope, $timeout, $state, $stateParams, $tm1Ui, $log, $q) {
	
	$scope.values = {};
	$scope.lists = {};
	
	$scope.values.instance = 'dev';
	$scope.values.user = 'admin';
	$scope.values.pass = '';
	
	$scope.values.runningTests = 0;
	$scope.values.testErrors = 0;
	
	$scope.values.messageAnnotation = "Annotation is @ Cube: Regional Assumptions, Elements: 'Actual','2012','Jan','13','Super Rate'";
	
	$scope.lists.tests = [];
	
	// test helpers
	$scope.testSandboxWithCellGetAndCellPut = function(){
		var defer = defer || $q.defer();
    	
		// create Sandbox, put a value, then check that the value on no sandbox is unchanged
		var randomSandbox = 'Sandbox-' + _.random(2000, 3000, false);
		$tm1Ui.sandboxCreate($scope.values.instance, randomSandbox).then(function(sandboxCreation){
			if(sandboxCreation.success){
				$tm1Ui.cellPut('', $scope.values.instance, 'System Info', 'Server Time', 'Comment').then(function(dbsStatus){}); // clear data
				
				$tm1Ui.cellPut(randomSandbox, $scope.values.instance, 'System Info', 'Server Time', 'Comment', {sandbox: randomSandbox}).then(function(dbsStatus){
					if(dbsStatus.success){
						// check base vs sandbox values
						$tm1Ui.cellGet($scope.values.instance, 'System Info', 'Server Time', 'Comment').then(function(dbrBaseData){
							$tm1Ui.cellGet($scope.values.instance, 'System Info', 'Server Time', 'Comment', {sandbox: randomSandbox}).then(function(dbrSandboxData){
								if(dbrBaseData.Value == '' && dbrSandboxData.Value == randomSandbox){
									$tm1Ui.sandboxDelete($scope.values.instance, randomSandbox).then(function(deleteStatus){});
									defer.resolve(true);
								}
								else{
									defer.reject(false);
								}
							});
						});
					}
					else{
						defer.reject(false);
					}
				});
			}
			else{
				defer.reject(false);
			}
		});
		
		return defer.promise;
	};
	
	$scope.testSandboxWithCellsetGetAndCellsetPut = function(){
		var defer = defer || $q.defer();
    	
		// create Sandbox, put a value, then check that the value on no sandbox is unchanged
		var randomSandbox = 'Sandbox-' + _.random(2000, 3000, false);
		$tm1Ui.sandboxCreate($scope.values.instance, randomSandbox).then(function(sandboxCreation){
			if(sandboxCreation.success){
				var dbsRequest1 = {value: '', instance: $scope.values.instance, cube: 'System Info', cubeElements: ['Server Time', 'Comment']};
				$tm1Ui.cellsetPut([dbsRequest1]).then(function(dbsStatus){}); // clear data
				
				var dbsRequest2 = {value: randomSandbox, instance: $scope.values.instance, cube: 'System Info', cubeElements: ['Server Time', 'Comment'], sandbox: randomSandbox};
				$tm1Ui.cellsetPut([dbsRequest2]).then(function(dbsStatus){
					if(dbsStatus.success){
						// check base vs sandbox values
						var dbrRequest1 = {instance: $scope.values.instance, cube: 'System Info', cubeElements: ['Server Time', 'Comment']};
						$tm1Ui.cellsetGet([dbrRequest1]).then(function(dbrBaseData){
							var dbrRequest2 = {instance: $scope.values.instance, cube: 'System Info', cubeElements: ['Server Time', 'Comment'], sandbox: randomSandbox};
							$tm1Ui.cellsetGet([dbrRequest2]).then(function(dbrSandboxData){
								if(dbrBaseData[0].Value == '' && dbrSandboxData[0].Value == randomSandbox){
									$tm1Ui.sandboxDelete($scope.values.instance, randomSandbox).then(function(deleteStatus){});
									defer.resolve(true);
								}
								else{
									defer.reject(false);
								}
							});
						});
					}
					else{
						defer.reject(false);
					}
				});
			}
			else{
				defer.reject(false);
			}
		});
		
		return defer.promise;
	};
	
	// utilities
	$scope.reset = function(){
		$scope.values.runningTests = 0;
		$scope.values.testErrors = 0;
		
		$scope.lists.tests.length = 0;
	};
	
	$scope.propertyExists = function(object, property){
		if(object && object[property] && !_.isEmpty(object[property])){
			return true;		
		}
		else{
			return false;
		}
	};
	
	$scope.prepareTestCase = function(testCase){
		var test = {};
		test.description = testCase;
		test.success = false;
		$scope.lists.tests.push(test);
		
		// increase pending tests count
		$scope.values.runningTests++;
		
		return test;
	};
	
	$scope.updateTestCase = function(testCase, testResult, testResultDisplay){
		testCase.result = testResult;
		if(angular.isDefined(testResultDisplay)){
			testCase.result = testResultDisplay;
		}
		
		// decrease pending tests count
		$scope.values.runningTests--;
		
		// check for errors, and increase error count if it is not successful
		if(!testCase.success){
			$scope.values.testErrors++;
		}
		
		console.info('%o: %o', testCase.description, testResult);
	};
	
	// test cases
	$scope.testLogin = function(){
		$scope.reset();
		
		// A1. applicationLogin(instance, username, password)
		// A2. applicationSessions()
		// A3. applicationLogout(instance)		
		var test = $scope.prepareTestCase('applicationLogin(instance, username, password)');
		$tm1Ui.applicationLogin($scope.values.instance, $scope.values.user, $scope.values.pass).then(function(result){
			test.success = result.success;
			test.result = result.message;			
			$log.info(result);		
			
			test = $scope.prepareTestCase('applicationSessions()');
			$tm1Ui.applicationSessions().then(function(result1){		
				if(result1 && result1[$scope.values.instance] && result1[$scope.values.instance].isLoggedIn){
					test.success = true;
				}				
				$log.info(result1);
				
				if(test.success){
					test = $scope.prepareTestCase('applicationLogout(instance)');
					$tm1Ui.applicationLogout($scope.values.instance).then(function(result1){
						test.success = result1.success;
						test.result = result1.message;			
						$log.info(result1);
					});
				}				
			});			
		});
	};
	
	// test cases
	$scope.testAdminLogin = function(){
		$scope.reset();
		
		// B1. applicationAdminLogin(username, password)
		// B2. applicationAdminLogout()
		var test = $scope.prepareTestCase('applicationAdminLogin(username, username)');
		$tm1Ui.applicationAdminLogin($scope.values.user, $scope.values.pass).then(function(result){
			test.success = result.success;
			$scope.updateTestCase(test, result.message);
			
			if(result.success){
				test = $scope.prepareTestCase('applicationAdminLogout()');
				$tm1Ui.applicationAdminLogout().then(function(resultLogout){
					test.success = resultLogout.success;
					$scope.updateTestCase(test, resultLogout.message);					
				});
			}
		});
	};
	
	$scope.testServices = function(){
		$scope.reset();
		
		
		// B3. applicationDeleteFile(instance, relativeFilePath)
		// B4. applicationGetTextFile(instance, relativeFilePath)
		
		// 1. applicationInfo()
		var test1 = $scope.prepareTestCase('applicationInfo()');
		$tm1Ui.applicationInfo().then(function(result1){
			if($scope.propertyExists(result1, 'name')){
				test1.success = true;				
			}			
			$scope.updateTestCase(test1, result1);
		});
		
		// 2. applicationInstance(instance)
		var test2 = $scope.prepareTestCase('applicationInstance(instance)');
		$tm1Ui.applicationInstance($scope.values.instance).then(function(result2){
			if($scope.propertyExists(result2, 'ProductVersion')){
				test2.success = true;				
			}			
			$scope.updateTestCase(test2, result2);
		});
		
		// 3. applicationInstances()
		var test3 = $scope.prepareTestCase('applicationInstances()');
		$tm1Ui.applicationInstances().then(function(result3){
			if(angular.isArray(result3) && result3.length > 0){
				test3.success = true;
			}
			$scope.updateTestCase(test3, result3);
		});
		
		// 4. applicationMenus()
		var test4 = $scope.prepareTestCase('applicationMenus()');
		$tm1Ui.applicationMenus().then(function(result4){
			if(result4.data){
				test4.success = true;
			}
			$scope.updateTestCase(test4, result4);
		});
		
		// 5. applicationName()
		var test5 = $scope.prepareTestCase('applicationName()');
		$tm1Ui.applicationName().then(function(result5){
			if($scope.propertyExists(result5, 'name')){
				test5.success = true;				
			}
			$scope.updateTestCase(test5, result5);
		});
		
		// 5.1. applicationSaveUserMenus(userMenus) - test via Admin Console - Menu Management
		// 5.2. applicationSaveUserStates(userStates) - test via Admin Console  Menu Management
		// 5.3. applicationSettings() - test via Admin Console - Settings
		// 5.4. applicationSettingsSave(settings) - test via Admin Console - Settings
		// 5.5. applicationStates() - test via Admin Console - Page Creator
		
		
		// 6. applicationUser(instance)
		var test6 = $scope.prepareTestCase('applicationUser(instance)');
		$tm1Ui.applicationUser($scope.values.instance).then(function(result6){
			if($scope.propertyExists(result6, 'Name')){
				test6.success = true;				
			}
			$scope.updateTestCase(test6, result6);
		});
		
		// 7. applicationUserMenus()
		var test7 = $scope.prepareTestCase('applicationUserMenus()');
		$tm1Ui.applicationUserMenus().then(function(result7){
			if(angular.isArray(result7)){
				test7.success = true;
			}			
			$scope.updateTestCase(test7, result7);
		});
		
		// 8. applicationUserStates()
		var test8 = $scope.prepareTestCase('applicationUserStates()');
		$tm1Ui.applicationUserStates().then(function(result8){
			if(angular.isObject(result8)){
				test8.success = true;
			}			
			$scope.updateTestCase(test8, result8);
		});
		
		// 9. applicationUsers()
		var test9 = $scope.prepareTestCase('applicationUsers()');
		$tm1Ui.applicationUsers().then(function(result9){
			if($scope.propertyExists(result9, $scope.values.instance)){
				test9.success = true;				
			}
			$scope.updateTestCase(test9, result9);
		});
		
		// 10. attributeGet(instance, dimension, element, attribute)
		var test10 = $scope.prepareTestCase('attributeGet(instance, dimension, element, attribute)');
		$tm1Ui.attributeGet($scope.values.instance, 'Account', '1', 'Description').then(function(result10){			
			if($scope.propertyExists(result10, 'Value')){
				test10.success = true;				
			}
			
			$scope.updateTestCase(test10, result10);
		});
		
		// 11. attributePut(value, instance, dimension, element, attribute)
		var test11 = $scope.prepareTestCase('attributePut(value, instance, dimension, element, attribute)');
		$tm1Ui.attributePut('Balance Sheet', $scope.values.instance, 'Account', '1', 'Description').then(function(result11){
			if(result11.success){
				test11.success = true;		
			}
			$scope.updateTestCase(test11, result11);
		});
		
		// this will be a series of connected test, for the annotations
		// UNCOMMENT WHEN TESTING
		// 12. cellAnnotationPut(value, instance, cube, cubeElements)
		if($scope.values.isWriteAnnotationsAllowed){
			var test12 = $scope.prepareTestCase('cellAnnotationPut(value, instance, cube, cubeElements)');
			$tm1Ui.cellAnnotationPut('Now: ' + _.now(), $scope.values.instance, 'Regional Assumptions', ['Actual','2012','Jan','13','Super Rate']).then(function(result12){
				if(result12.success){
					test12.success = true;		
				}
				$scope.updateTestCase(test12, result12);
			});
		}
		
		// 13. cellAnnotationGet(instance, cube, cubeElements)
		var test13 = $scope.prepareTestCase('cellAnnotationGet(instance, cube, cubeElements)');
		$tm1Ui.cellAnnotationGet($scope.values.instance, 'Regional Assumptions', ['Actual','2012','Jan','13','Super Rate']).then(function(result13){
			if($scope.propertyExists(result13[0], 'commentValue')){
				test13.success = true;				
			}			
			$scope.updateTestCase(test13, result13);
		});	
		
		// 14. cellGet(instance, cube, element1, element2, elementN)
		var test14 = $scope.prepareTestCase('cellGet(instance, cube, element1, element2, elementN)');
		$tm1Ui.cellGet($scope.values.instance, 'Regional Assumptions', 'Actual','2012','Jan','13','Super Rate').then(function(result14){
			if($scope.propertyExists(result14, 'FormattedValue')){
				test14.success = true;				
			}	
			$scope.updateTestCase(test14, result14);
		});	
		
		// 14s. cellGet(instance, cube, element1, element2, elementN, configuration)
		// 17s. cellPut(value, instance, cube, element1, element2, elementN)
		var test17s = $scope.prepareTestCase('cellPut(value, instance, cube, element1, element2, elementN, configuration)');
		var test14s = $scope.prepareTestCase('cellGet(instance, cube, element1, element2, elementN, configuration)');
		$scope.testSandboxWithCellGetAndCellPut().then(function(testResultOfCellGetAndCellPut){
			if(testResultOfCellGetAndCellPut){
				test14s.success = true;
				test17s.success = true;
			}
			
			$scope.updateTestCase(test14s, testResultOfCellGetAndCellPut);
			$scope.updateTestCase(test17s, testResultOfCellGetAndCellPut);
		});
		
		// RE-ENABLE WHEN TESTING WITH DRILLTHROUGH		
		if($scope.values.isPA){
			// 15. cellGetDrillNames(instance, cube, cubeElements)
			var test15 = $scope.prepareTestCase('cellGetDrillNames(instance, cube, cubeElements)');
			$tm1Ui.cellGetDrillNames($scope.values.instance, 'General Ledger', ['Actual','2012','Mar','Local','England','2','Salaries','Amount']).then(function(result15){
				if(result15 && angular.isArray(result15)){
					test15.success = true;
				}
				$scope.updateTestCase(test15, result15);
				
				// 15d. cellGetDrillNameTransactions(instance, cube, cubeElements, drillName)
				var test15d = $scope.prepareTestCase('cellGetDrillNameTransactions(instance, cube, cubeElements, drillName)');
				$tm1Ui.cellGetDrillNameTransactions($scope.values.instance, 'General Ledger', ['Actual','2012','Mar','Local','England','2','Salaries','Amount'], 'Source Table').then(function(result15d){
					if(result15d && result15d.value && angular.isArray(result15d.value) && result15d.value.length > 0){
						test15d.success = true;
					}
					
					$scope.updateTestCase(test15d, result15d, 'Check Console');
				});				
			});	
		}
		
		// 16. cellGetPicklistValues(instance, cube, cubeElements, element1, element2, elementN)
		var test16 = $scope.prepareTestCase('cellGetPicklistValues(instance, cube, cubeElements, element1, element2, elementN)');
		$tm1Ui.cellGetPicklistValues($scope.values.instance, 'System Info', 'Calender Year', 'String').then(function(result16){
			if(result16.length > 0){
				test16.success = true;	
			}
			$scope.updateTestCase(test16, result16);
		});	
		
		// 17. cellPut(value, instance, cube, element1, element2, elementN)
		var test17 = $scope.prepareTestCase('cellPut(value, instance, cube, element1, element2, elementN)');
		$tm1Ui.cellPut("Today's Date", $scope.values.instance, 'System Info', 'Current Date', 'Comment').then(function(result17){
			if(result17.success){
				test17.success = true;	
			}
			$scope.updateTestCase(test17, result17);
		});
		
		// 18. cellsetGet(cellGetRequests)
		var test18 = $scope.prepareTestCase('cellsetGet(cellGetRequests)');
		var cellGetRequests = [];
		cellGetRequests.push({instance: $scope.values.instance, cube: 'System Info', cubeElements: ['Current Date', 'Comment']});
		$tm1Ui.cellsetGet(cellGetRequests).then(function(result18){
			if($scope.propertyExists(result18[0], 'FormattedValue')){
				test18.success = true;				
			}
			$scope.updateTestCase(test18, result18);
		});	
		
		// 19. cellsetPut(cellPutRequests)
		var test19 = $scope.prepareTestCase('cellsetPut(cellPutRequests)');
		var cellPutRequests = [];
		cellPutRequests.push({value:"Today's Date", instance: $scope.values.instance, cube: 'System Info', cubeElements: ['Current Date', 'Comment']});
		cellPutRequests.push({value:0.006, instance: $scope.values.instance, cube: 'Regional Assumptions', cubeElements: ['Actual', '2011/12', 'Jan', 'Finland', 'LSL Rate']});
		$tm1Ui.cellsetPut(cellPutRequests).then(function(result19){
			if(result19.success){
				test19.success = true;		
			}
			$scope.updateTestCase(test19, result19);
		});
		
		// 18s. cellGet(instance, cube, element1, element2, elementN, configuration)
		// 19s. cellPut(value, instance, cube, element1, element2, elementN)
		var test18s = $scope.prepareTestCase('cellsetGet(cellGetRequests) - with sandbox');
		var test19s = $scope.prepareTestCase('cellsetPut(cellPutRequests) - with sandbox');
		$scope.testSandboxWithCellsetGetAndCellsetPut().then(function(testResultOfCellsetGetAndCellsetPut){
			if(testResultOfCellsetGetAndCellsetPut){
				test18s.success = true;
				test19s.success = true;
			}
			
			$scope.updateTestCase(test18s, testResultOfCellsetGetAndCellsetPut);
			$scope.updateTestCase(test19s, testResultOfCellsetGetAndCellsetPut);
		});
		
		if($scope.values.testChores){
			// 21. chore(instance, name)
			var test21 = $scope.prepareTestCase('chore(instance, name)');
			$tm1Ui.chore($scope.values.instance, 'CXTM1SaveDataAll').then(function(result21){
				if($scope.propertyExists(result21, 'Name')){
					test21.success = true;				
				}
				$scope.updateTestCase(test21, result21);
			});
			
			// 22. choreExecute(instance, name)
			var test22 = $scope.prepareTestCase('choreExecute(instance, name)');
			$tm1Ui.choreExecute($scope.values.instance, 'CXTM1SaveDataAll').then(function(result22){
				if(result22.success){
					test22.success = true;
				}
				$scope.updateTestCase(test22, result22);
			});
			
			// 23. choreUpdateTasks(instance, name, chore) - Test via Chore Configurator directive
			// 24. chores(instance)
			var test24 = $scope.prepareTestCase('chores(instance)');
			$tm1Ui.chores($scope.values.instance).then(function(result24){
				if(result24 && angular.isArray(result24) && result24.length > 0){
					test24.success = true;
				}
				$scope.updateTestCase(test24, result24);
			});
		}
		
		// 25. cubeDimensions(instance, cube)
		var test25 = $scope.prepareTestCase('cubeDimensions(instance, cube)');
		$tm1Ui.cubeDimensions($scope.values.instance, 'General Ledger').then(function(result25){
			var dimensionCheck = ["Version","Year","Period","Currency","Region","Department","Account","General Ledger Measure"];
			if(_.isEqual(result25, dimensionCheck)){
				test25.success = true;
			}
			$scope.updateTestCase(test25, result25);
		});
		
		// 26. cubeExecuteMdx(instance, mdx, restPath)
		var mdx = 'SELECT NON EMPTY {[Period].[Jan], [Period].[Feb], [Period].[Mar]} ON COLUMNS,'
			+ ' NON EMPTY {[Account].[1]} ON ROWS' 
			+ ' FROM [General Ledger]'
			+ ' where(' 
			+ ' [Version].[Actual],' 
			+ ' [General Ledger Measure].[Amount],' 
			+ ' [Currency].[Local],' 
			+ ' [Region].[1],' 
			+ ' [Department].[1],'
			+ ' [Year].[2012]' 
			+ ')';
		var test26 = $scope.prepareTestCase('cubeExecuteMdx(instance, mdx)');
		$tm1Ui.cubeExecuteMdx($scope.values.instance, mdx).then(function(result26){
			if(result26.Cells.length == 3){
				test26.success = true;
			}
			$scope.updateTestCase(test26, result26);
		});
		
		var restPath = '$expand=Cells';
		var test26b = $scope.prepareTestCase('cubeExecuteMdx(instance, mdx, restPath)');
		$tm1Ui.cubeExecuteMdx($scope.values.instance, mdx, restPath).then(function(result26b){
			if(result26b['@odata.context'] == '$metadata#Cellsets(Cells)/$entity'){
				test26b.success = true;
			}
			$scope.updateTestCase(test26b, result26b);
		});
		
		// 27. cubeExecuteNamedMdx(instance, mdxId, mdxParameters)
		var test27 = $scope.prepareTestCase('cubeExecuteNamedMdx(instance, mdxId)');
		$tm1Ui.cubeExecuteNamedMdx($scope.values.instance, 'P&L').then(function(result27){
			if(result27.Cells.length > 0){
				test27.success = true;
			}
			$scope.updateTestCase(test27, result27, 'Check Console');
		});
		
		var test27b = $scope.prepareTestCase('cubeExecuteNamedMdx(instance, mdxId, mdxParameters)');
		$tm1Ui.cubeExecuteNamedMdx($scope.values.instance, 'P&L', {parameters:{ "Year":"2016"}}).then(function(result27b){
			_.forEach(result27b.Axes[2].Tuples[0].Members, function(member){
				if(member.UniqueName == '[Year].[2016]' || member.UniqueName == '[Year].[Year].[2016]'){
					test27b.success = true;
				}
			});
			$scope.updateTestCase(test27b, result27b, 'Check Console');
		});
		
		// 28. cubeExecuteView(instance, cube, view, query)
		var test28 = $scope.prepareTestCase('cubeExecuteMdx(instance, mdx)');
		$tm1Ui.cubeExecuteMdx($scope.values.instance, mdx, restPath).then(function(result28){
			if(result28.Value != 0){
				test28.success = true;
			}
			$scope.updateTestCase(test28, result28);
		});
		
		var test28b = $scope.prepareTestCase('cubeExecuteMdx(instance, mdx, restPath)');
		restPath = '$expand=Cells($select=Value)';
		$tm1Ui.cubeExecuteMdx($scope.values.instance, mdx, restPath).then(function(result28b){
			if(result28b["@odata.context"] == '$metadata#Cellsets(Cells(Value))/$entity'){
				test28b.success = true;
			}
			$scope.updateTestCase(test28b, result28b);
		});
		
		// 29. cubeView(instance, cube, view, query)
		var test29 = $scope.prepareTestCase('cubeView(instance, cube, view)');
		$tm1Ui.cubeView($scope.values.instance, 'General Ledger', 'Budget Template').then(function(result29){
			if(result29.cube == 'General Ledger' && result29.titles.length > 0 && result29.columns.length > 0){
				test29.success = true;
			}
			$scope.updateTestCase(test29, result29);
		});
		
		var test29b = $scope.prepareTestCase('cubeView(instance, cube, view, query)');
		$tm1Ui.cubeView($scope.values.instance, 'General Ledger', 'Budget Template', '$expand=tm1.NativeView/Columns/Subset').then(function(result29b){
			if(result29b['@odata.context'] == "../$metadata#Cubes('General%20Ledger')/Views/ibm.tm1.api.v1.NativeView(ibm.tm1.api.v1.NativeView/Columns/Subset)/$entity"){
				test29b.success = true;
			}
			$scope.updateTestCase(test29b, result29b);
		});
		
		// 30. cubeViews(instance, cube)
		var test30 = $scope.prepareTestCase('cubeViews(instance, cube)');
		$tm1Ui.cubeViews($scope.values.instance, 'General Ledger').then(function(result30){
			if(result30.length > 0){
				test30.success = true;
			}
			$scope.updateTestCase(test30, result30);
		});
		
		// 31. cubes(instance)
		var test31 = $scope.prepareTestCase('cubes(instance)');
		$tm1Ui.cubes($scope.values.instance).then(function(result31){
			if(result31.length > 0){
				test31.success = true;
			}
			$scope.updateTestCase(test31, result31);
		});	
		
		// 32. dataRefresh(dataGroup) - test via Samples - DBR Group Update
		
		
		// 33. dimensionAttributes(instance, dimension)
		var test33 = $scope.prepareTestCase('dimensionAttributes(instance, dimension)');
		$tm1Ui.dimensionAttributes($scope.values.instance, 'Account').then(function(result33){
			if(result33.length > 0){
				test33.success = true;
			}
			$scope.updateTestCase(test33, result33);
		});	
		
		// 34. dimensionElement(instance, dimension, elementOrAlias, attributes)
		var test34 = $scope.prepareTestCase('dimensionElement(instance, dimension, elementOrAlias, attributes)');
		$tm1Ui.dimensionElement($scope.values.instance, 'Account', '1', 'Description').then(function(result34){
			if($scope.propertyExists(result34[0], 'Name')){
				test34.success = true;				
			}
			$scope.updateTestCase(test34, result34);
		});
		var test34b = $scope.prepareTestCase('dimensionElement(instance, dimension, elementOrAlias, attributes)');
		$tm1Ui.dimensionElement($scope.values.instance, 'Account', 'Balance Sheet', 'Description').then(function(result34b){
			if($scope.propertyExists(result34b[0], 'Name')){
				test34b.success = true;				
			}
			$scope.updateTestCase(test34b, result34b);
		});	
		
		// 35. dimensionElements(instance, dimension, options)		
		var test35 = $scope.prepareTestCase('dimensionElements(instance, dimension)');
		$tm1Ui.dimensionElements($scope.values.instance, 'Region').then(function(result35){
			if(result35.length > 0){
				test35.success = true;
			}
			$scope.updateTestCase(test35, result35);
		});
		
		var test35c = $scope.prepareTestCase('dimensionElements(instance, dimension, attribute)');
		var attribute35c = 'Description';
		$tm1Ui.dimensionElements($scope.values.instance, 'Region', attribute35c).then(function(result35c){
			_.forEach(result35c, function(element){
				if(!test35c.success){
					_.forEach(element.Attributes, function(value, key){
						if(key == attribute35c){
							test35c.success = true;
						}
					});
				}				
			});
			$scope.updateTestCase(test35c, result35c);
		});
		
		var test35b = $scope.prepareTestCase('dimensionElements(instance, dimension, options)');
		var attribute35b = 'Description';
		var options = {};
		options.attributes = attribute35b;
		$tm1Ui.dimensionElements($scope.values.instance, 'Currency', options).then(function(result35b){
			_.forEach(result35b, function(element){
				if(!test35b.success){
					_.forEach(element.Attributes, function(value, key){
						if(key == attribute35b){
							test35b.success = true;
						}
					});
				}				
			});
			
			$scope.updateTestCase(test35b, result35b);
		});
		
		var test35d = $scope.prepareTestCase('dimensionElements(instance, dimension, options)');
		$tm1Ui.dimensionElements($scope.values.instance, 'Time', {subset: 'Top Elements'}).then(function(result35d){
			if(result35d.length == 1){
				test35d.success = true;
			}
			$scope.updateTestCase(test35d, result35d);
		});
		
		var test35e = $scope.prepareTestCase('dimensionElements(instance, dimension, options)');
		$tm1Ui.dimensionElements($scope.values.instance, 'Time', {mdx: '{[Time].[2010], [Time].[2011]}'}).then(function(result35e){
			if(result35e.length == 2){
				test35e.success = true;
			}
			$scope.updateTestCase(test35e, result35e);
		});
		
		// 36. dimensionHierarchies(instance, dimension)
		var test36 = $scope.prepareTestCase('dimensionHierarchies(instance, dimension)');
		$tm1Ui.dimensionHierarchies($scope.values.instance, 'Time').then(function(result36){
			if(result36.length > 0){
				test36.success = true;
			}
			$scope.updateTestCase(test36, result36);
		});	
		
		// 37. dimensionHierarchy(instance, dimension, hierarchy)
		var test37 = $scope.prepareTestCase('dimensionHierarchy(instance, dimension, hierarchy)');
		$tm1Ui.dimensionHierarchy($scope.values.instance, 'Time', 'Year').then(function(result37){
			if($scope.propertyExists(result37, 'Name')){
				test37.success = true;				
			}
			$scope.updateTestCase(test37, result37);
		});
		
		// 38. dimensionSubsetAlias(instance, dimension, subset)
		var test38 = $scope.prepareTestCase('dimensionSubsetAlias(instance, dimension, subset)');
		$tm1Ui.dimensionSubsetAlias($scope.values.instance, 'Region', 'Default').then(function(result38){
			if(result38 == 'Description'){
				test38.success = true;
			}
			$scope.updateTestCase(test38, result38);
		});
		
		// 39. dimensionSubsets(instance, dimension, options)
		var test39 = $scope.prepareTestCase('dimensionSubsets(instance, dimension, options)');
		$tm1Ui.dimensionSubsets($scope.values.instance, 'Time').then(function(result39){
			if(result39.length > 0){
				test39.success = true;
			}
			$scope.updateTestCase(test39, result39);
		});
		
		// 40. formatNumber(value, decimal)
		var test40 = $scope.prepareTestCase('formatNumber(value, decimal)');
		var result40 = $tm1Ui.formatNumber(1.1221, 2);
		if(result40 == '1.12'){
			test40.success = true;
		}
		$scope.updateTestCase(test40, result40);
		
		// 41. formatPercentage(value, decimal)
		var test41 = $scope.prepareTestCase('formatPercentage(value, decimal)');
		var result41 = $tm1Ui.formatPercentage(0.1221, 2);		
		if(result41 == '12.21%'){
			test41.success = true;
		}
		$scope.updateTestCase(test41, result41);
		
		// 42. getToken()
		var test42 = $scope.prepareTestCase('getToken()');
		$tm1Ui.getToken().then(function(result42){
			if(!_.isEmpty(result42)){
				test42.success = true;
			}
			$scope.updateTestCase(test42, result42);
		});	
		
		// 43. helperConvertElementsToArray(elements, config)
		var test43 = $scope.prepareTestCase('helperConvertElementsToArray(elements)');
		var result43 = $tm1Ui.helperConvertElementsToArray('test, this, "o.a, and this; with spaces trimmed()   "');	
		if(result43.length == 3 && result43[2] == 'o.a, and this; with spaces trimmed()'){
			test43.success = true;
		}
		$scope.updateTestCase(test43, result43);
		
		// 44. helperDoesPageExists(pageUrl)
		// 45. helperGenerateUUID()
		var test45 = $scope.prepareTestCase('helperGenerateUUID()');
		var result45 = $tm1Ui.helperGenerateUUID();
		if(!_.isEmpty(result45)){
			test45.success = true;
		}
		$scope.updateTestCase(test45, result45);
		
		// 46. helperIsStatusSuccessful(status) - Test via Directive - DBRA
		// 47. helperIsSuccessful(success) - Test via Directive - Upload, Active Form
		// 48. process(instance, name)
		var test48 = $scope.prepareTestCase('process(instance, name)');
		$tm1Ui.process($scope.values.instance, 'Bedrock.Server.Wait').then(function(result48){
			if($scope.propertyExists(result48, 'Name')){
				test48.success = true;				
			}
			$scope.updateTestCase(test48, result48);
		});	
		
		// 49. processExecute(instance, name, paramName1, paramValue1, paramNameN, paramValueN)
		var test49 = $scope.prepareTestCase('processExecute(instance, name, paramName1, paramValue1, paramNameN, paramValueN)');
		$tm1Ui.processExecute($scope.values.instance, 'Bedrock.Server.Wait', 'pWaitSec', 2).then(function(result49){
			if(result49.success){
				test49.success = true;
			}
			$scope.updateTestCase(test49, result49);
		});	
		
		// 50. resultsetTransform(instance, cube, result, options) - Test via Samples - Active Form
		
		// Sandboxing - START
		var randomSandbox = 'Sandbox-' + _.random(1, 1000, false);
		
		// 50s2. sandboxCreate(instance, name)
		var test50s2 = $scope.prepareTestCase('sandboxCreate(instance, name)');
		$tm1Ui.sandboxCreate($scope.values.instance, randomSandbox).then(function(result50s2){
			if(result50s2.success){
				test50s2.success = true;
				
				// 50s1. sandbox(instance, name)
				var test50s1 = $scope.prepareTestCase('sandbox(instance, name)');
				$tm1Ui.sandbox($scope.values.instance, randomSandbox).then(function(result50s1){
					if(result50s1.Name == randomSandbox){
						test50s1.success = true;
					}
					$scope.updateTestCase(test50s1, result50s1);
				});	
				
				// 50s6. sandboxes(instance)
				var test50s6 = $scope.prepareTestCase('sandboxes(instance)');
				$tm1Ui.sandboxes($scope.values.instance).then(function(result50s6){
					_.forEach(result50s6, function(sandboxObj){
						if(!test50s6.success && sandboxObj.Name == randomSandbox){
							test50s6.success = true;							
						}
					});
					
					$scope.updateTestCase(test50s6, result50s6);
					
					if(test50s6.success){
						
						// 50s4. sandboxDiscardChanges(instance, name)
						var test50s4 = $scope.prepareTestCase('sandboxDiscardChanges(instance, name)');
						$tm1Ui.sandboxDiscardChanges($scope.values.instance, randomSandbox).then(function(result50s4){
							if(result50s4.success){
								test50s4.success = true;
							}
							$scope.updateTestCase(test50s4, result50s4);
							
							// 50s5. sandboxPublishChanges(instance, name)
							if(test50s4.success){
								var test50s5 = $scope.prepareTestCase('sandboxPublishChanges(instance, name)');
								$tm1Ui.sandboxPublishChanges($scope.values.instance, randomSandbox).then(function(result50s5){
									if(result50s5.success){
										test50s5.success = true;
									}
									$scope.updateTestCase(test50s5, result50s5);
									
									if(test50s5.success){
										// 50s3. sandboxDelete(instance, name)
										var test50s3 = $scope.prepareTestCase('sandboxDelete(instance, name)');
										$tm1Ui.sandboxDelete($scope.values.instance, randomSandbox).then(function(result50s3){
											if(result50s3.success){
												test50s3.success = true;
											}
											$scope.updateTestCase(test50s3, result50s3);
										});
									}
								});	
							}							
						});
					}						
				});	
			}
			$scope.updateTestCase(test50s2, result50s2);			
		});	
		
		
		/*
		 var test4 = $scope.prepareTestCase('applicationMenus()');
		$tm1Ui.applicationMenus().then(function(result4){
			$scope.updateTestCase(test4, result4);
		});	
		 * */
		
		// Sandboxing - END
				
		// 51. tableCreate(scope, data, options) - Test via Directive - table-ui-table-mdx
		
		// THIS is ADMIN RELATED TEST CASES
		
		// 52. deleteScheduledJob(scheduledJobId) - OBSOLETE
		// 53. saveOrUpdateScheduledJob(scheduledJob) - OBSOLETE
		// 54. scheduledJob(scheduledJobId) - OBSOLETE
		// 55. scheduledJobs() - OBSOLETE
		// 56. deleteTask(taskId) - test via Admin Console - Task Editor
		// 57. saveOrUpdateTask(task) - test via Admin Console - Task Editor
		// 58. task(taskId) - test via Admin Console - Task Editor
		// 59. taskRun(taskId) - test via Admin Console - Task Editor
		// 60. taskRunStatus(taskId) - test via Admin Console - Task Editor
		// 61. tasks() - test via Admin Console - Task Editor
		/* 
		var test61 = $scope.prepareTestCase('tasks()');
		$tm1Ui.tasks().then(function(result61){
			$scope.updateTestCase(test61, result61);
		});
		*/
		
		
		/*		 
		var test4 = $scope.prepareTestCase('applicationMenus()');
		$tm1Ui.applicationMenus().then(function(result4){
			$scope.updateTestCase(test4, result4);
		});		 
		* */
	};
}]);
