app.controller('ApplicationEmployeeCtrl', ['$scope', '$rootScope', '$log', '$tm1Ui', '$tm1UiTable', '$ngBootbox', '$interval', '$timeout', '$location', 'screenSize', function ($scope, $rootScope, $log, $tm1Ui, $tm1UiTable, $ngBootbox, $interval, $timeout, $location, screenSize) {
    /*
     *     defaults.* are variables that are declared once and are changed in the page, otherwise known as constants in programming languages
     *     lists.* should be used to store any lists that are used with ng-repeat, i.e. tm1-ui-element-list
     *     selections.* should be used for all selections that are made by a user in the page
     *     values.* should store the result of any dbr, dbra or other values from server that you want to store to use elsewhere, i.e. in a calculation
     * 
     *     For more information: https://github.com/cubewise-code/canvas-best-practice
     */

    $scope.lists = {};
    $scope.values = {};

    // ###############
    // Define variables

    // Default values to be used before selections are made
    $scope.defaults = {
        region: 'Total Europe',
        regionAlias: 'Total Europe',
        department: 'Corporate',
        departmentAlias: 'Corporate',
        measure: 'Order Quantity',
        version: 'Budget',
        product: 'Accessories',
        month: 'Year',
        year: '2016',
        previousYear: '2015',
        OperatingProfit: 'Operating Profit',
        GrossMargin: 'Gross Margin',
        OperatingExpenses: 'Operating Expenses',
        OtherIncome: 'Other Income and Expense',
        showCharts: 'true'
    }

    $scope.selections = {
        month: $scope.defaults.month,
        year: $scope.defaults.year,
        previousYear: $scope.defaults.previousYear,
        version: $scope.defaults.version,
        region: $scope.defaults.region,
        regionAlias: $scope.defaults.regionAlias,
        department: $scope.defaults.department,
        departmentAlias: $scope.defaults.departmentAlias,
        product: $scope.defaults.product,
        measure: $scope.defaults.measure,
        showCharts: $scope.defaults.showCharts,
        segment: 'region'
    };

    $scope.lists = {
        months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        employees: [],
        versions: [
            { description: "Actual" },
            { description: "Budget" },
            { description: "vs" }
        ]
    };

    $scope.q1 = ["Jan", "Feb", "Mar"];
    $scope.q2 = ["Apr", "May", "Jun"];
    $scope.q3 = ["Jul", "Aug", "Sep"];
    $scope.q4 = ["Oct", "Nov", "Dec"];

    $scope.screenSize = screenSize;

    // ###############
    // Calculate %

    $scope.renderPercentageAbsVersion = function (abspercent) {
        $scope.myabspercent = Math.abs(parseInt(abspercent * 100));

        return $scope.myabspercent;
    }

    $scope.renderPercentageAbsCategory = function (abspercent) {
        $scope.myabspercent = Math.abs(parseInt(abspercent * 200));

        return $scope.myabspercent;
    }

    $scope.renderPercentageAbsRegion = function (abspercent) {
        $scope.myabspercent = Math.abs(parseInt(abspercent * 300));

        return $scope.myabspercent;
    }


    // ###############
    // Update Version parameter

    if ($location.search().version) {
        $scope.selections.version = $location.search().version;
    }

    $scope.setVersion = function (version) {
        $scope.selections.version = version;
        if (version != $scope.defaults.version) {
            // Set the URL parameter
            $location.search("version", version);
        }
        else {
            // If the parameter equals the default value remove it from the URL
            $location.search("version", null);
        }
    };

    // ###############
    // Update Year parameter


    if ($location.search().year) {
        $scope.selections.year = $location.search().year;
    }

    $scope.setYear = function (year) {
        $scope.selections.year = year;

        if (year != $scope.defaults.year) {
            // Set the URL parameter
            $location.search("year", year);
        }
        else {
            // If the parameter equals the default value remove it from the URL
            $location.search("year", null);
            //  $scope.selections.departmentAlias = department;
        }

        $tm1Ui.attributeGet("dev", "Year", $scope.selections.year, "Year-1").then(function (data) {
            $scope.selections.previousYear = data.Value;
        });

    };

    // ###############
    // Update Product parameter

    if ($location.search().department) {
        $scope.selections.department = $location.search().department;
    }

    $scope.setDepartment = function (department) {



        $scope.selections.department = department;

        $scope.selections.departmentAlias = department;

        $scope.getColorDepartment();

        if (department != $scope.defaults.department) {
            // Set the URL parameter
            $location.search("department", department);
        }
        else {
            // If the parameter equals the default value remove it from the URL
            $location.search("department", null);
            //  $scope.selections.departmentAlias = department;
        }
    };

    // Get Department Color
    $scope.getColorDepartment = function () {

        $tm1Ui.attributeGet("dev", "Department", $scope.selections.department, "Color").then(function (data) {

            $scope.selections.color = data.Value;

            $scope.selections.colorArray = [];
            $scope.selections.colorArray.push(data.Value);

        });
    };

    // ###############
    // Update Region parameter

    if ($location.search().region) {
        $scope.selections.region = $location.search().region;
    }

    $scope.setRegion = function (region) {
        $scope.selections.region = region;
        $scope.selections.regionAlias = region;
        if (region != $scope.defaults.region) {
            // Set the URL parameter
            $location.search("region", region);
        }
        else {
            // If the parameter equals the default value remove it from the URL
            $location.search("region", null);
            //$scope.selections.regionAlias = region;
        }
    };

    // ##################
    // Clickablke chart to update DEpartment
    $scope.optionsOverride = {
        chart: {
            discretebar: {
                dispatch: {
                    elementClick: function (e) {
                        $scope.setDepartment(e.data.elements.split(',')[5]);
                    }
                }
            }

        }
    };

    if (screenSize.is('xs, sm')) {
        $scope.optionsOverride.chart.discretebar.dispatch.elementClick = undefined;
        $scope.optionsOverride.chart.discretebar.dispatch.elementMouseover = function (e) {
            console.info('elementMouseover');
            $scope.setDepartment(e.data.elements.split(',')[5]);
            //$scope.selections.department = e.data.elements.split(',')[5];
        };
    }

    // ##################
    // Clickable chart to update Region
    $scope.optionsOverrideRegion = {
        chart: {
            discretebar: {
                dispatch: {
                    elementClick: function (e) {
                        //	console.debug('elementClick');
                        $scope.setRegion(e.data.elements.split(',')[4]);
                    }
                }
            }

        }
    };

    if (screenSize.is('xs, sm')) {
        $scope.optionsOverrideRegion.chart.discretebar.dispatch.elementClick = undefined;
        $scope.optionsOverrideRegion.chart.discretebar.dispatch.elementMouseover = function (e) {
            console.debug('elementMouseover');

            $scope.$apply(function () {
                $scope.setRegion(e.data.elements.split(',')[4]);
            });

            //$scope.selections.region = e.data.elements.split(',')[4];
        };
    }

    $scope.employeeDetails = {
        id: '',
        name: '',
        region: '',
        dept: ''
    };

    $scope.employeeToDelete = {
        id: '',
        name: ''
    };

    $scope.filter = function (value) {

        if (value.yearTotal == null) {
            // Data isn't ready so don't display row
            return false;
        }

        if ($scope.page.suppressZeros && value.yearTotal == 0) {
            return false;
        }

        if ($scope.page.filter && $scope.page.filter != "") {
            if (value["Full Name"].toLowerCase().indexOf($scope.page.filter) == -1) {
                return false;
            }
        }

        return true;
    };

    // Create Table based on lists.employees
    $scope.table = $tm1Ui.tableCreate($scope, $scope.lists.employees, { preload: false, filter: $scope.filter });

    $scope.employeeDelete = function (id, name) {
        $scope.employeeToDelete.id = id;
        $scope.employeeToDelete.name = name;
    };

    $scope.employeeDetailsShow = function (id, name) {

        $scope.employeeDetails.id = id;
        $scope.employeeDetails.name = name;

    };

    $scope.employeeMeasure = function (employee) {
        if (employee.salaryYearEntered > 0) {
            return "Base Salary";
        }
        else {
            return "Full Time Base Salary";
        }
    };

}]);
