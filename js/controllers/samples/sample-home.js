app.controller('SampleHomeCtrl', ['$scope', '$rootScope', '$interval', '$timeout', '$state', '$stateParams', '$http', 
                            	function($scope, $rootScope, $interval, $timeout, $state, $stateParams, $http) {
	
 	$scope.colors = [{color:"#9FD000"}, {color:"#0085B9"}, {color:"#FF9214"}];
 	$scope.selected = {value: 0};

 	$scope.menuDescription = {};
 	
 	// Samples
 	$scope.menuDescription['sample-simple'] = 'Simple page with dynamic DBR';
 	$scope.menuDescription['sample-skinning'] = 'Override the default style of tm1-ui components';
 	$scope.menuDescription['sample-table'] = 'Sortable, filtered table with show/hide columns';
 	$scope.menuDescription['sample-dashboard'] = 'Dashboard example with advanced filtering feature';
 	$scope.menuDescription['sample-print'] = 'Printing';
 	$scope.menuDescription['sample-data-entry'] = 'Simple data entry template with search option';
 	$scope.menuDescription['sample-salary-budget'] = 'Advance data entry template with suppress zero and run TI';
 	$scope.menuDescription['sample-navigation-1'] = 'Parameterize navigation between pages';
 	$scope.menuDescription['sample-advance-chart'] = 'Advance visualization with clickable chart';
 	$scope.menuDescription['sample-upload'] = 'How to upload files';
 	$scope.menuDescription['sample-sheetjs'] = 'How to upload Excel files';
 	$scope.menuDescription['sample-cubes'] = 'Show the TM1 instance cube list';
 	$scope.menuDescription['sample-sql'] = 'Access external database from Canvas';
 	$scope.menuDescription['mdx-named'] = 'Build even faster table using MDX';
 	$scope.menuDescription['sample-grid'] = 'MDX Grid with pre-built features';
 	
 	// Components
 	$scope.menuDescription['subnm'] = 'Create all types of dropdown lists';
 	$scope.menuDescription['dbr'] = 'Get data from a TM1 cube using DBR';
 	$scope.menuDescription['dbr-group-update'] = 'Target group of DBRs to update';
 	$scope.menuDescription['dbr-hierarchy'] = 'Query alternate hierarchies with DBR';
 	$scope.menuDescription['dbr-hidden'] = 'A lightweight DBR version for purely reading on the value.';
 	$scope.menuDescription['dbr-read-only'] = 'For DBRs that is always read-only';
 	$scope.menuDescription['dbr-sandbox'] = 'Sandboxing with DBRs';
 	$scope.menuDescription['dbr-image'] = 'Use DBRs to display an image';
 	$scope.menuDescription['dbra'] = 'Get attributes values from a dimension';
 	$scope.menuDescription['process'] = 'Run a TM1 process from Canvas';
 	$scope.menuDescription['store'] = 'Store user or global prefences in your prefered TM1 cube';
 	$scope.menuDescription['activeform'] = 'Create table with dynamic rows and drill-down functionality';
 	$scope.menuDescription['tm1web'] = 'Show cubeviews or websheets from TM1 Web';
 	$scope.menuDescription['mdx-chart'] = 'Show bar charts per rows using MDX';
 	$scope.menuDescription['element-info'] = 'Retrieve an element\'s information';
 	$scope.menuDescription['element-list'] = 'Create a list of elements from SUBSET or MDX';
 	$scope.menuDescription['charts'] = 'All charts which have been pre-built in Canvas';
 	$scope.menuDescription['upload'] = 'How to create upload files button';
 	$scope.menuDescription['mdx-table'] = 'Format MDX Query into a table';
 	$scope.menuDescription['login-info'] = 'Design your own Login page';
 	$scope.menuDescription['session-info'] = 'Utilize the Session button';
 	$scope.menuDescription['progress-update'] = 'Show a display while waiting for TM1';
 	$scope.menuDescription['user-info'] = 'Get user information and use on your page';
 	$scope.menuDescription['export-info'] = 'Export tables';
 	$scope.menuDescription['cube-viewer'] = 'Slice and dice your cubes';
 	$scope.menuDescription['subset-editor'] = 'Manage your subsets';
 	
 	// Applications
 	$scope.menuDescription['application-1'] = 'Salary, Budget and Forecast';
 	
    /// CAROUSEL FUNCTIONS //// 
    $scope.carouselIndex2 = 0;
    $scope.slides2 = [];

    function getSlide(target, style) {
        var i = target.length;
        return {
            id: (i + 1),
            label: 'slide #' + (i + 1),
            img: 'assets/img/download-' + ((i + 1) % 10)+'.png' ,
            color: "#ffffff",
            odd: (i % 2 === 0)
        };
    }

    function addSlide(target, style) {
        target.push(getSlide(target, style));
    };

    function addSlides(target, style, qty) {
        for (var i=0; i < qty; i++) {
            addSlide(target, style);
        }
    }
    addSlides($scope.slides2, 'samples', 5);
    
    function getImage(target) {
        var i = target.length
        , p = (($scope.galleryNumber-1)*$scope.setOfImagesToShow)+i;
        //console.log("i=" + i + "--" + p);
        return slideImages[p];
    }
    function addImages(target, qty) {
        for (var i=0; i < qty; i++) {
            addImage(target);
        }
    }

    function addImage(target) {
        target.push(getImage(target));
    }
 
}]);
