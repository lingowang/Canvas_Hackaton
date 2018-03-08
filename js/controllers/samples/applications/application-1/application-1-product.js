app.controller('ApplicationProductCtrl',  ['$scope', '$rootScope', '$log', '$tm1Ui', '$ngBootbox','screenSize','$timeout', '$location', function ($scope, $rootScope, $log, $tm1Ui, $ngBootbox, screenSize, $timeout, $location) {
    ////Sorting

    $scope.sortBy = function (key) {

        if ($scope.sortPeriod === key) {
            $scope.sortDirection = $scope.sortDirection === 'BDESC' ? 'BASC' : 'BDESC';
        } else {
            $scope.sortPeriod = key;
        }

    };

    $scope.sortBy1 = function (key) {

        if ($scope.sortPeriod1 === key) {
            $scope.sortDirection1 = $scope.sortDirection1 === 'BDESC' ? 'BASC' : 'BDESC';
        } else {
            $scope.sortPeriod1 = key;
        }

    };

    $scope.drillDown = function (key) {
        $scope.productDrill = key;
    };
    /*
     *     defaults.* are variables that are declared once and are changed in the page, otherwise known as constants in programming languages
     *     lists.* should be used to store any lists that are used with ng-repeat, i.e. tm1-ui-element-list
     *     selections.* should be used for all selections that are made by a user in the page
     *     values.* should store the result of any dbr, dbra or other values from server that you want to store to use elsewhere, i.e. in a calculation
     * 
     *     For more information: https://github.com/cubewise-code/canvas-best-practice
     */

    $scope.lists = {
        measures: [
            {key:"Order Quantity", description:"Quantity"},
            {key:"Sales Amount", description:"Sales"},
            {key:"Total Product Cost", description:"Cost"}
        ],
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
    $scope.values = {};

    $scope.screenSize = screenSize;
    

    // Default values to be used before selections are made
    $scope.defaults = {
        region: 'Total Europe',
        category: 'Corporate',
        measure: 'Sales Amount',
        version: 'Budget',
        product: 'All Products by Category',
        color: '#666666',
        icon: 'fa-shopping-cart',
        month: 'Year',
        year: '2016',
        OperatingProfit: 'Operating Profit',
        GrossMargin: 'Gross Margin',
        OperatingExpenses: 'Operating Expenses',
        OtherIncome: 'Other Income and Expense',
        dashboardSubTitle: 'Products by Month',
        showContent: 'table',
        showCharts: 'true',
        dashboardSubTitle: 'Products by Month'
    }

    $scope.selections = {
        showContent: 'table',
        month: $scope.defaults.month,
        year: $scope.defaults.year,
        version: $scope.defaults.version,
        region: $scope.defaults.region,
        category: $scope.defaults.category,
        product: $scope.defaults.product,
        color: $scope.defaults.color,
        icon: $scope.defaults.icon,
        measure: $scope.defaults.measure,
        dashboardSubTitle: $scope.defaults.dashboardSubTitle,
        showContent: $scope.defaults.showContent,
        showCharts: $scope.defaults.showCharts,
        segment: 'region',
        subset: [
            {
                description: "Operating Profit",
                icon: ""
            },
            {
                description: "Gross Margin"
            },
            {
                description: "Operating Expenses"
            },
            {
                description: "Other Income and Expense"
            }
		]
    };

    // ###############
	// Update Chart Content and Title

    if($location.search().showContent){
        $scope.selections.showContent = $location.search().showContent;
    }

    if($location.search().dashboardSubTitle){
        $scope.selections.dashboardSubTitle = $location.search().dashboardSubTitle;
    }

	$scope.setChartContent = function(showContent,dashboardSubTitle){
		$scope.selections.showContent = showContent;
		if(showContent != $scope.defaults.showContent){
			// Set the URL parameter
			$location.search("showContent", showContent);
		}
		else {
			// If the parameter equals the default value remove it from the URL
			$location.search("showContent", null);
        }
        $scope.selections.dashboardSubTitle = dashboardSubTitle;
		if(dashboardSubTitle != $scope.defaults.dashboardSubTitle){
			// Set the URL parameter
			$location.search("dashboardSubTitle", dashboardSubTitle);
		}
		else {
			// If the parameter equals the default value remove it from the URL
			$location.search("dashboardSubTitle", null);
		}
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
    };

    // ###############
	// Update Measure parameter

    if($location.search().measure){
        $scope.selections.measure = $location.search().measure;
    }

	$scope.setMeasure = function(measure){
		$scope.selections.measure = measure;
		if(measure != $scope.defaults.measure){
			// Set the URL parameter
			$location.search("measure", measure);
		}
		else {
			// If the parameter equals the default value remove it from the URL
			$location.search("measure", null);
		}
    };

    // ##################################
	// Percentage
	$scope.renderPercentage = function(percent){
		$scope.mypercent =  parseInt(percent * 100);

		return $scope.mypercent;
    }
    $scope.renderPercentageAbsKPI = function(abspercent){
		$scope.myabspercent = Math.abs(parseInt(abspercent * 100));
		 
		return $scope.myabspercent;
    }
	$scope.renderPercentageAbsCategory = function(abspercent){
		$scope.myabspercent = Math.abs(parseInt(abspercent * 200));
		 
		return $scope.myabspercent;
    }
    
    $scope.renderPercentageAbsRegion = function(abspercent){
		$scope.myabspercent = Math.abs(parseInt(abspercent * 200));
		 
		return $scope.myabspercent;
    }

    // ###############
    // Update Product parameter

    if($location.search().product){
        $scope.selections.product = $location.search().product;
    }

    $scope.setProduct = function (product) {
        $scope.selections.product = product;

        $scope.getColorProduct($scope.selections.product);

        if (product != $scope.defaults.product) {
            // Set the URL parameter
            $location.search("product", product);
        } else {
            // If the parameter equals the default value remove it from the URL
            $location.search("product", null);
        }

    };

    // Get Product Color
    $scope.getColorProduct = function (product){
        
        $tm1Ui.attributeGet("dev", "Product", $scope.selections.product, "background").then(function(data){

            $scope.selections.color=data.Value;

            $scope.selections.colorArray = [];
            $scope.selections.colorArray.push(data.Value);  

        });
    };

    	$scope.setProductFromChart = function(chartElement){
            $scope.setProduct(chartElement.data.elements.split(',')[5]);
        };

    // ###############
    // Update Region parameter

    if($location.search().region){
        $scope.selections.region = $location.search().region;
    }

    $scope.setRegion = function (region) {
        $scope.selections.region = region;
        if (region != $scope.defaults.region) {
            // Set the URL parameter
            $location.search("region", region);
        } else {
            // If the parameter equals the default value remove it from the URL
            $location.search("region", null);
        }
    };

    // ##################
    // Clickable chart to update region
    $scope.optionsOverrideRegion = {
        chart: {
            discretebar: {
                dispatch: {
                    
                    elementClick: function (e) {
                        $scope.setRegion(e.data.elements.split(',')[4]);
                    }
                }
            }

        }
    };

        if(screenSize.is('xs, sm')){
		$scope.optionsOverrideRegion.chart.discretebar.dispatch.elementClick = undefined;
		$scope.optionsOverrideRegion.chart.discretebar.dispatch.elementMouseover = function(e){ 
            $scope.setRegion(e.data.elements.split(',')[4]);
			//$scope.selections.region = e.data.elements.split(',')[4];
		};
    }


    // ############################
    //         TREEMAP

    function tm1flat(tm1o, attrs, bFilter, inclAttrs) {
        //function to convert array into object
        function toObject(val, label) {
            var obj = {};
            for (var i = 0; i < label.length; i++)
                if (val[i] !== undefined && label[i] !== undefined) obj[label[i]] = val[i];
            return obj;
        }
        //========================================================

        //collect all dimensions from rows and columns
        //1) dimensions on columns
        var dims = [];

        for (var i = 0; i < tm1o.Axes[1].Hierarchies.length; i++) {
            dims.push(tm1o.Axes[1].Hierarchies[i].Name);
        }
        //2)dimensions on rows 
        for (var i = 0; i < tm1o.Axes[0].Hierarchies.length; i++) {
            dims.push(tm1o.Axes[0].Hierarchies[i].Name);
        }

        //3)OPTIONAL.filters
        if (bFilter != null && bFilter == true) {
            for (var i = 0; i < tm1o.Axes[2].Hierarchies.length; i++) {
                dims.push(tm1o.Axes[2].Hierarchies[i].Name);
            }
        }

        //4)add value to the list of dimensions
        dims.push('TM1CubeValue');

        if (inclAttrs) {
            var attributes = {};
        }


        //create auxilary arrays. rc is the main one. it contains all reference points + value as the last element.tm1fo is the array to be returned.
        var r1 = [],
            c1 = [],
            rc = [];
        var cellCount = 0;
        var tm1fo = [];

        //loop through rows
        for (var j = 0; j < tm1o.Axes[1].Tuples.length; j++) {
            for (var j1 = 0; j1 < tm1o.Axes[1].Tuples[j].Members.length; j1++) {

                if (attrs != null && tm1o.Axes[1].Tuples[j].Members[j1].Attributes[attrs[tm1o.Axes[1].Hierarchies[j1].Name]] != null) {
                    r1.push(tm1o.Axes[1].Tuples[j].Members[j1].Attributes[attrs[tm1o.Axes[1].Hierarchies[j1].Name]]);
                } else {
                    r1.push(tm1o.Axes[1].Tuples[j].Members[j1].Name);
                }


                //add dimensions attributes
                if (inclAttrs) {

                    attributes[tm1o.Axes[1].Hierarchies[j1].Name] = {};

                    for (var key in tm1o.Axes[1].Tuples[j].Members[j1].Attributes) {
                        attributes[tm1o.Axes[1].Hierarchies[j1].Name][key] = tm1o.Axes[1].Tuples[j].Members[j1].Attributes[key];
                    }
                }


            }
            //loop through columns
            for (var k = 0; k < tm1o.Axes[0].Tuples.length; k++) {
                for (var k1 = 0; k1 < tm1o.Axes[0].Tuples[k].Members.length; k1++) {
                    if (attrs != null && tm1o.Axes[0].Tuples[k].Members[k1].Attributes[attrs[tm1o.Axes[0].Hierarchies[k1].Name]] != null) {
                        c1.push(tm1o.Axes[0].Tuples[k].Members[k1].Attributes[attrs[tm1o.Axes[0].Hierarchies[k1].Name]]);
                    } else {
                        c1.push(tm1o.Axes[0].Tuples[k].Members[k1].Name);
                    }

                    if (inclAttrs) {
                        //add dimensions attributes
                        attributes[tm1o.Axes[0].Hierarchies[k1].Name] = {};

                        for (var key in tm1o.Axes[0].Tuples[k].Members[k1].Attributes) {
                            attributes[tm1o.Axes[0].Hierarchies[k1].Name][key] = tm1o.Axes[0].Tuples[k].Members[k1].Attributes[key];
                        }
                    }


                }
                rc = r1.concat(c1);

                //include filter values
                if (bFilter != null && bFilter == true) {
                    for (var m = 0; m < tm1o.Axes[2].Tuples[0].Members.length; m++) {
                        if (attrs != null && tm1o.Axes[2].Tuples[0].Members[m].Attributes[attrs[tm1o.Axes[2].Hierarchies[m].Name]] != null) {
                            rc.push(tm1o.Axes[2].Tuples[0].Members[m].Attributes[attrs[tm1o.Axes[2].Hierarchies[m].Name]]);
                        } else {
                            rc.push(tm1o.Axes[2].Tuples[0].Members[m].Name);
                        }
                    }
                }
                //add value from Cells
                rc.push(tm1o.Cells[cellCount].Value);
                //console.log(rc);

                tm1fo.push(toObject(rc, dims));

                if (inclAttrs) {
                    tm1fo[cellCount].Attributes = JSON.parse(JSON.stringify(attributes));
                }


                cellCount += 1;

                //zero out auxilary arrays
                c1 = [];
                rc = [];
            }
            r1 = [];
            if (inclAttrs) {
                attributes = {};
            }


        }

        return tm1fo;
    };
//map


var map;


    var icons = {
        neutral: '',
        positive: 'images/applications/application-1/' + $scope.selections.product + '.png',
        negative: 'images/applications/application-1/red75.png'
    };
    var markers = [];
    

    $scope.initMap = function (){
        map = new google.maps.Map(document.getElementById('map'), {
            center: new google.maps.LatLng(48.8, 2.35),
            zoom: 4
        });
        // Vincent Hide components !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!1
    var styleArray = [
    {
        featureType: "all",
        stylers: [
        { visibility: "on" },
        { saturation: -90 }
        ]
    },
    // ROADS
    {
        featureType: "road",
        stylers: [
        { visibility: "off" }
        ]
    },
    // Makers / Monuments
    {
        featureType: "poi",
        elementType: "labels",
        stylers: [
        { visibility: "off" }
        ]
    },
    // Transit
    {
        featureType: "transit",
        elementType: "labels",
        stylers: [
        { visibility: "off" }
        ]
    }
    ];

    map.setOptions({styles: styleArray});
        
    };

    $scope.reCenter = function (address, lat, lon) {

        map.setCenter({
            lat: Number(lat),
            lng: Number(lon)
        });

        map.setZoom(15);

    };

    function removeMarkers() {
        for (var i = 0; i < markers.length; i++) {
            markers[i].setMap(null);
        }
        markers.length = 0;
    }


    function heatPoint(lat, lon, value, min, max, address) {

        var marker = new google.maps.Marker({
            position: {
                lat: lat,
                lng: lon
            },
            map: map,
            opacity: 1,
            icon: (value > 0 ? icons.positive : icons.negative)
        });
        
        markers.push(marker);
        
        marker.addListener('click', function () {
            var mdx = 'select {[Retail Measure].['+$scope.selections.measure+']} on 0, {[Store].[' + address + ']} on 1 from [Retail by Store] where ([Version].['+$scope.selections.version+'],[Year].['+$scope.selections.year+'],[Period].[Year],[Currency].[local],[Region].['+$scope.selections.region+'],[Product].['+$scope.selections.product+'])';
            $tm1Ui.cubeExecuteMdx('dev', mdx).then(function (data) {
                $scope.customers = tm1flat(data, {}, false, true);

                var content = '<div>' + address + '<ul>';

                for (var i = 0; i < $scope.customers.length; i++) {
                    if($scope.selections.measure == 'Order Quantity'){
                    content = content + '<li>' + $scope.selections.measure + ': ' + accounting.formatNumber($scope.customers[i]['TM1CubeValue']) + '</li>';
                    }else{
                    content = content + '<li>' + $scope.selections.measure + ': €' + accounting.formatMoney($scope.customers[i]['TM1CubeValue'], "€", 2, ".", ",") + '</li>';   
                    }
                }
                content = content + '</ul></div>';

                var infowindow = new google.maps.InfoWindow({
                    content: content
                });

                infowindow.open(map, marker);

            });
        });

    }

    $scope.mainQuery = function() {


        icons.positive = 'images/applications/application-1/' + $scope.selections.product + '.png';
        icons.negative = 'images/applications/application-1/red75.png';
        
        removeMarkers();
        var mdx = "select {[Retail Measure].["+$scope.selections.measure+"]} on 0, NON EMPTY {TM1FILTERBYLEVEL( {TM1SUBSETALL( [Store] )}, 0)} on 1 from [Retail by Store] where ([Version].["+$scope.selections.version+"],[Year].["+$scope.selections.year+"],[Period].[Year],[Currency].[local],[Region].["+$scope.selections.region+"],[Product].["+$scope.selections.product+"])";
        $tm1Ui.cubeExecuteMdx('dev', mdx).then(function (data) {
            var flatArray = tm1flat(data, {}, true, true);        
            $scope.data = flatArray;
            var min = d3.min(flatArray, function (d) {
                return d.TM1CubeValue;
            });
            
            var max = d3.max(flatArray, function (d) {
                return d.TM1CubeValue;
            });
 
            for (var i = 0; i < flatArray.length; i++) {
                heatPoint(Number(flatArray[i]['Attributes']['Store']['Lat']), Number(flatArray[i]['Attributes']['Store']['Lon']), flatArray[i]['TM1CubeValue'], min, max, flatArray[i]['Attributes']['Store']['Description']);
            }

        });
    };

    $scope.initMap();

    $scope.showMap = function() {
        //if(!$scope.mapCreated){
            $timeout(function(){
        //        $scope.mapCreated = true;
                $scope.initMap();
                $scope.mainQuery();
            }, 50);
      //  }
    };

  
    


    //map end

    function loopObject(o) {
        var temp;
        var tempName;
        
        for (var i = 0; i < values.length; i++) {
            
            if (values[i].Product == o.Name && values[i].Version == 'Var %') {
                
                temp=values[i].TM1CubeValue==null?0:values[i].TM1CubeValue;
                break;
            }
        }
        o.variance=temp;
        
        if (o.hasOwnProperty('Components')) {

            for (var i = 0; i < o.Components.length; i++) {
                loopObject(o.Components[i]);
            }

        } else {

            for (var i = 0; i < values.length; i++) {

                if (values[i].Product == o.Name && values[i].Version == $scope.selections.version) {
                    o.value = values[i].TM1CubeValue;
                    break;
                }
            }
        }
    }



    //var color = d3.scale.category20c();
    var color = d3.scale.linear().domain([-0.5,-0.1,0, 0.1,.5])
        //.range(['red','red', 'orange',  'green','green' ]);
        .range(['#F43848','#D8727B', '#6B95AF', '#557B99','#264775' ]);


    var margin = {
            top: 40,
            right: 0,
            bottom: 0,
            left: 0
        },
        width = parseInt((document.getElementById("chart-one").parentNode.getBoundingClientRect().width)-(30)),
        height = 500 - margin.top - margin.bottom,
        formatNumber = d3.format(",d"),
        transitioning;

    var x = d3.scale.linear()
        .domain([0, width])
        .range([0, width]);

    var y = d3.scale.linear()
        .domain([0, height])
        .range([0, height]);

    var treemap = d3.layout.treemap()
        .children(function (d, depth) {
            return depth ? null : d._children;
        })
        .sort(function (a, b) {
            return a.value - b.value;
        })
        .ratio(height / width * 0.5 * (1 + Math.sqrt(5)))
        .round(false);




    var values;
    var products;





    //var mdx = '{TM1DRILLDOWNMEMBER( {[product].[All Products by Category]}, ALL, RECURSIVE )}';
    var mdx = '[Product].MEMBERS';
    $tm1Ui.dimensionElements('dev', 'Product', 'Code&Description', '', mdx, '', '', true, false).then(function (v) {
        products = v[0];
        width = parseInt((document.getElementById("chart-one").parentNode.getBoundingClientRect().width)-(30));
        ///////////////////////////
        $scope.$watch('selections', $scope.buildChart(), true);
        //////////////////////////////////////
    })
    
    $scope.buildChart = function() {
            
            if($scope.selections && $scope.selections.measure && $scope.selections.year && $scope.selections.version && $scope.selections.product){
                $scope.mainQuery();
            }

            d3.select('#treemapchart').html('');

            var svg = d3.select("#treemapchart")
                .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
                .style("shape-rendering", "crispEdges");

            var grandparent = svg.append("g")
                .attr("class", "grandparent");

            grandparent.append("rect")
                .attr("y", -margin.top)
                .attr("width", width)
                .attr("height", margin.top);

            grandparent.append("text")
                .attr("x", 6)
                .attr("y", 6 - margin.top)
                .attr("dy", "0.75em");

            var mdx1 = 'select {[Product].MEMBERS} on 0, {[Version].[' + $scope.selections.version + '],[Version].[var %]} on 1 from [Retail] where ([Year].[' + $scope.selections.year + '],[Period].[Year],[Currency].[Local],[Region].[' + $scope.selections.region + '],[Retail Measure].[' + $scope.selections.measure + '])';
            //var mdx1 = 'select {TM1FILTERBYLEVEL( {TM1SUBSETALL( [Product] )}, 0)} on 0, {[Version].[' + $scope.selections.version + '],[Version].[var %]} on 1 from [Retail] where ([Year].[' + $scope.selections.year + '],[Period].[Year],[Currency].[Local],[Region].[' + $scope.selections.region + '],[Retail Measure].[' + $scope.selections.measure + '])';
            
            $tm1Ui.cubeExecuteMdx('dev', mdx1).then(function (data) {values = tm1flat(data, {'Version': 'Description'}, true);
                loopObject(products);


                v = products;

                initialize(v);
                accumulate(v);
                layout(v);
                display(v);

                function initialize(root) {
                    root.x = root.y = 0;
                    root.dx = width;
                    root.dy = height;
                    root.depth = 0;
                }


                function accumulate(d) {
                    return (d._children = d.Components) ? d.value = d.Components.reduce(function (p, v) {
                        return p + accumulate(v);
                    }, 0) : d.value;
                }


                function layout(d) {
                    if (d._children) {
                        treemap.nodes({
                            _children: d._children
                        });
                        d._children.forEach(function (c) {
                            c.x = d.x + c.x * d.dx;
                            c.y = d.y + c.y * d.dy;
                            c.dx *= d.dx;
                            c.dy *= d.dy;
                            c.parent = d;
                            layout(c);
                        });
                    }
                }

                function display(d) {
                    grandparent
                        .datum(d.parent)
                        .on("click", transition)
                        .select("text")
                        .text(name(d));

                    var g1 = svg.insert("g", ".grandparent")
                        .datum(d)
                        .attr("class", "depth");

                    var g = g1.selectAll("g")
                        .data(d._children)
                        .enter().append("g");

                    g.filter(function (d) {
                            return d._children;
                        })
                        .classed("children", true)
                        .on("click", transition);

                    g.selectAll(".child")
                        .data(function (d) {
                            return d._children || [d];
                        })
                        .enter().append("rect")
                        .attr("class", "child")
                        .call(rect);

                    g.append("rect")
                        .attr("class", "parent")
                        .call(rect)

                        .append("title")
                        .text(function (d) {
                            return d.Attributes['Code&Description'];
                            //return formatNumber(d.value);
                        });

                    g.append("text")
                        .attr("dy", "0.75em")
                        .text(function (d) {
                            return d.Name + ' (A: ' + Math.round(d.value) + '. V: '+Math.round(d.variance*100,2)+'%)';
                        })
                        .call(text);

                    function transition(d) {
                        if (transitioning || !d) return;
                        transitioning = true;

                        var g2 = display(d),
                            t1 = g1.transition().duration(750),
                            t2 = g2.transition().duration(750);

                        // Update the domain only after entering new elements.
                        x.domain([d.x, d.x + d.dx]);
                        y.domain([d.y, d.y + d.dy]);

                        // Enable anti-aliasing during the transition.
                        svg.style("shape-rendering", null);

                        // Draw child nodes on top of parent nodes.
                        svg.selectAll(".depth").sort(function (a, b) {
                            return a.depth - b.depth;
                        });

                        // Fade-in entering text.
                        g2.selectAll("text").style("fill-opacity", 0);

                        // Transition to the new view.
                        t1.selectAll("text").call(text).style("fill-opacity", 0);
                        t2.selectAll("text").call(text).style("fill-opacity", 1);
                        t1.selectAll("rect").call(rect);
                        t2.selectAll("rect").call(rect);

                        // Remove the old node when the transition is finished.
                        t1.remove().each("end", function () {
                            svg.style("shape-rendering", "crispEdges");
                            transitioning = false;
                        });
                    }

                    return g;
                }

                function text(text) {
                    text.attr("x", function (d) {
                            return x(d.x) + 6;
                        })
                        .attr("y", function (d) {
                            return y(d.y) + 6;
                        });
                }

                function rect(rect) {
                    rect.attr("x", function (d) {
                            return x(d.x);
                        })
                        .attr("y", function (d) {
                            return y(d.y);
                        })
                        .attr("width", function (d) {
                            return x(d.x + d.dx) - x(d.x);
                        })
                        .attr("height", function (d) {
                            return y(d.y + d.dy) - y(d.y);
                        }).style('fill', function (d, i) {
                            
                            //return 'green';
                            return color(d.variance);
                        });
                }

                function name(d) {
                    return d.parent ? name(d.parent) + "." + d.Attributes['Code&Description'] + ' (' + Math.round(d.value) + ')' : d.Attributes['Code&Description'] + ' (' + Math.round(d.value) + ')';
                }

            });
        }
    // END TREEMAP
    $(window).resize(function(){
         width = parseInt((document.getElementById("chart-one").parentNode.getBoundingClientRect().width)-(30));
          $scope.buildChart();
    });
}]);

