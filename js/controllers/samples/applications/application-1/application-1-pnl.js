app.controller('ApplicationProfitLossCtrl', ['$scope', '$rootScope', '$log', '$tm1Ui', '$ngBootbox', '$interval', '$timeout', 'screenSize', '$location', function($scope, $rootScope, $log, $tm1Ui,$ngBootbox, $interval, $timeout, screenSize, $location) {
    /*
     *     defaults.* are variables that are declared once and are changed in the page, otherwise known as constants in programming languages
     *     lists.* should be used to store any lists that are used with ng-repeat, i.e. tm1-ui-element-list
     *     selections.* should be used for all selections that are made by a user in the page
     *     values.* should store the result of any dbr, dbra or other values from server that you want to store to use elsewhere, i.e. in a calculation
     * 
     *     For more information: https://github.com/cubewise-code/canvas-best-practice
     */
     
     
     $scope.values = {};
     $scope.values.region = {show: true};
     $scope.values.month = {show: true};
 
      // Default values to be used before selections are made
     $scope.defaults = {
         region: 'Total Europe',
         category:'Corporate',
         driverParent: 'Operating Profit',
         driver: 'Operating Profit',
         month: 'Year',
         year: '2016',
         version: 'Budget',
         dashboardChart: 'by categories',
         OperatingProfit: 'Operating Profit',
         GrossMargin: 'Gross Margin',
         OperatingExpenses: 'Operating Expenses',
         OtherIncome: 'Other Income and Expense',
         colorNegative: '#E6AB02',
         colorPositive: '#66A61F'
     }
     
     $scope.selections = {
         month: $scope.defaults.month,
         year: $scope.defaults.year,
         region: $scope.defaults.region,
         category: $scope.defaults.category,
         dashboardChart: $scope.defaults.dashboardChart,
         version: $scope.defaults.version,
         driver: $scope.defaults.driver,
         driverParent: $scope.defaults.driverParent,
         segment: 'region',
         subset: [
             {description:"Operating Profit"},
             {description:"Gross Margin"},
             {description:"Operating Expenses"},
             {description:"Other Income and Expense"}
         ]
     };

     $scope.lists = {
        years: [
            {description:"2015"},
            {description:"2016"},
            {description:"2017"}
        ],
        versions: [
            {description:"Actual"},
            {description:"Budget"},
            {description:"vs"}
        ]
     };
 
     $scope.getColor = function (account){
         $tm1Ui.attributeGet("dev", "Account", account.key , "Color").then(function(data){
              ///$scope.account.color=[]; 
                 account.color2 = [];
                 account.color2.push(data.Value);             
             
         });
     };
 
     $scope.getColorDriver = function (account){
         $tm1Ui.attributeGet("dev", "Account", account.key , "Color").then(function(data){
            
             $scope.selectedColor = [];
             $scope.selectedColor.push(data.Value);
         });
     };
 
     // ###############
     // Update driver Description
 
     if($location.search().driver){
         $scope.selections.driver = $location.search().driver;
     }
 
     if($location.search().driverParent){
         $scope.selections.driverParent = $location.search().driverParent;
     }
 
     $scope.setDriverSelections = function(driverParent,driver){
         // Set main driver for values
         $scope.selections.driver = driver;
         if(driver != $scope.defaults.driver){
             // Set the URL parameter
             $location.search("driver", driver);
         }
         else {
             // If the parameter equals the default value remove it from the URL
             $location.search("driver", null);
         } 
 
         // Set parent driver for values
         $scope.selections.driverParent = driverParent;
         if(driverParent != $scope.defaults.driverParent){
             // Set the URL parameter
             $location.search("driverParent", driverParent);
         }
         else {
             // If the parameter equals the default value remove it from the URL
             $location.search("driverParent", null);
     }  
 
     $scope.refreshBarChartRegion();
     $scope.refreshBarChartMonth();
 
     };
 
     // ###############
     // Force bar chart region to rebuild (required for the color)
     
     $scope.refreshBarChartRegion = function(){
         $scope.values.region.show = false;
         $timeout(function(){
           $scope.values.region.show = true;
         });
     };
 
     // ###############
     // Force bar chart Month to rebuild (required for the color)
     
     $scope.refreshBarChartMonth = function(){
         $scope.values.month.show = false;
         $timeout(function(){
           $scope.values.month.show = true;
         });
     };
 
     // ###############
     // Update Region parameter
 
     if($location.search().region){
         $scope.selections.region = $location.search().region;
     }
 
     $scope.setRegion = function(region){
         $scope.selections.region = region;
         if(region != $scope.defaults.region){
             // Set the URL parameter
             $location.search("region", region);
         }
         else {
             // If the parameter equals the default value remove it from the URL
             $location.search("region", null);
         }
         $scope.refreshBarChartMonth();
     };
 
     // ###############
     // Update Year parameter
 
     if($location.search().year){
         $scope.selections.year = $location.search().year;
     }
 
     $scope.setYear = function(year){
         $scope.selections.year = year;
         if(year != $scope.defaults.year){
             // Set the URL parameter
             $location.search("year", year);
         }
         else {
             // If the parameter equals the default value remove it from the URL
             $location.search("year", null);
         }
         $scope.refreshBarChartRegion();
     };
     
     // ###############
     // Update Version parameter
 
     if($location.search().version){
         $scope.selections.version = $location.search().version;
     }
 
     $scope.setVersion = function(version){
         $scope.selections.version = version;
         if(version != $scope.defaults.version){
             // Set the URL parameter
             $location.search("version", version);
         }
         else {
             // If the parameter equals the default value remove it from the URL
             $location.search("version", null);
         }
         $scope.refreshBarChartRegion();
     };
     
         // ##################
     // Clickablke chart to update region
     $scope.optionsOverrideRegion = {
         chart:{
             discretebar:{
                 dispatch:{
                     elementClick:function(e){
                         // uncomment below line if you want to check what is being passed on
                         // console.debug(e); 
                     $scope.setRegion(e.data.elements.split(',')[4]);
                     }
                 }
             }
             
         }
 };
 
     
     // ##################
     // Clickablke chart to update month
     $scope.optionsOverride = {
                 chart:{
                     discretebar:{
                         dispatch:{
                             elementClick:function(e){
                                 // uncomment below line if you want to check what is being passed on
                                 // console.debug(e); 
                             $scope.setMonth(e.data.elements.split(',')[2]);
                             }
                         }
                     }
                     
                 }
         };
 
     if($location.search().month){
         $scope.selections.month = $location.search().month;
     }
 
     $scope.setMonth = function(month){
         $scope.selections.month = month;
         if(month != $scope.defaults.month){
             // Set the URL parameter
             $location.search("month", month);
         }
         else {
             // If the parameter equals the default value remove it from the URL
             $location.search("month", null);
         }
         $scope.refreshBarChartRegion();
     };
 
     // ##################
     // Clickablke chart to update category
 
     if($location.search().category){
         $scope.selections.category = $location.search().category;
     }
 
     $scope.setCategory = function(category){
         $scope.selections.category = category;
         if($scope.selections.category != $scope.defaults.category){
             // Set the URL parameter
             $location.search("category", $scope.selections.category);
         }
         else {
             // If the parameter equals the default value remove it from the URL
             $location.search("category", null);
         }
     };
 
     $scope.setCategoryDefault = function(category){
         $scope.selections.category = category;
         $location.search("category", null);
     };
 
     // ##################################
     // Percentage for KPI value
     $scope.renderPercentage = function(percent){
         $scope.mypercent =  parseInt(percent * 100);
 
         return $scope.mypercent;
     }
    // ##################################
     // Percentage for KPI progress bar
     $scope.renderPercentageAbs = function(abspercent){
         $scope.myabspercent = Math.abs(parseInt(abspercent * 100));
          
         return $scope.myabspercent;
     }
     // ##################################
     // Percentage for Category
     $scope.renderPercentageAbsCategory = function(abspercent){
         $scope.myabspercent = Math.abs(parseInt(abspercent * 100));
          
         return $scope.myabspercent;
     }
     
 }]);
 