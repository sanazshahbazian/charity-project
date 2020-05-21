            var makeVis = function(data) {
                
                var nutritionFields = ["total_revenue", "total_expenses", "program_expenses", "fundraising_expenses", "administrative_expenses", "ceo_compensation"];
                var cerealMap = {};
                data.forEach(function(d) {
                    var cereal = d.name;
                    cerealMap[cereal] = [];
            
                    // { cerealName: [ bar1Val, bar2Val, ... ] }
                    nutritionFields.forEach(function(field) {
                        cerealMap[cereal].push( +d[field] );
                    });
                  
                });
                
                // Define dimensions of vis
                var margin = { top: 30, right: 75, bottom: 30, left: 75 },
                    width  = 1000 - margin.left - margin.right,
                    height = 460 - margin.top  - margin.bottom;

                // set the ranges
                var xScale = d3.scaleBand()
                .range([0, width])
                .padding(0.1);
                var nutritionFields = ["total_revenue", "total_expenses", "program_expenses", "fundraising_expenses", "administrative_expenses", "ceo_compensation"];

                // Scale the range of the data in the domains
                xScale.domain(nutritionFields);
                
                var yScale = d3.scaleLinear()
                .range([height, 0]);
                yScale.domain([0, d3.max(data, function(d,i) { return (d[nutritionFields[i]]); })]);
                console.log(d3.max(data, function(d,i) { return (d[nutritionFields[i]])}))
                var tooltip_bar= d3.select("#vis-container")
                    .append("div")
                    .style("opacity", 0)
                    .attr("class", "tooltip_bar")
                    .style("background-color", "black")
                    .style("border-radius", "5px")
                    .style("padding", "10px")
                    .style("color", "white")
                    .style("width", "150px")
                
                    // Create canvas
                var canvas = d3.select("#vis-container")
                    .append("svg")
                    .attr("width",  width  + margin.left + margin.right)
                    .attr("height", height + margin.top  + margin.bottom)
                  .append("g")
                    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
                // add the x Axis
                    canvas.append("g")
                    .attr("transform", "translate(0," + height + ")")
                    .call(d3.axisBottom(xScale));
                
                
                var yAxisHandleForUpdate = canvas.append("g")
                    .attr("class", "y axis")
                    .call(d3.axisLeft(yScale));

                yAxisHandleForUpdate.append("text")
                    .attr("transform", "rotate(-90)")
                    .attr("y", 6)
                    .attr("dy", ".71em")
                    .style("text-anchor", "end")
                    .text("Dollar Amount");

                var updateBars = function(data) {
                    var dextent= d3.extent(data);
                    dextent[0] = 0.8 * dextent[0];
                    // First update the y-axis domain to match data
                    yScale.domain(dextent);
                    yAxisHandleForUpdate.call(d3.axisLeft(yScale));
                    var bars = canvas.selectAll(".bar").data(data);

                    // -------------------------//
                //   BAR Tooltip            //
                // -------------------------//
                
                var showTooltip_bar = function(d) {
                    tooltip_bar
                    .transition()
                    .duration(200)
                    tooltip_bar
                    .style("opacity", 1)
                    .html("$"+d)
                    .style("left", (d3.mouse(this)[0]+30) + "px")
                    .style("top", (d3.mouse(this)[1]) + "px")
                    // console.log(d)
                    }
    
                    var moveTooltip_bar = function(d) {
                    tooltip_bar
                    .style("left", (d3.mouse(this)[0]+30) + "px")
                    .style("top", (d3.mouse(this)[1]) + "px")
                    }
                    // console.log(d3.mouse);
                    var hideTooltip_bar = function(d) {
                    tooltip_bar
                    .transition()
                    .duration(200)
                    .style("opacity", 0)
                    }

                    // Add bars for new data
                    bars.enter()
                      .append("rect")
                        .attr("class", "bar")
                        .attr("x", function(d,i) { return xScale( nutritionFields[i] ); })
                        .attr("width", xScale.bandwidth())
                        .attr("y", function(d,i) { return yScale(d); })
                        .attr("height", function(d,i) { return height - yScale(d); })
                        .on("mouseover", showTooltip_bar )
                        .on("mousemove", moveTooltip_bar )
                        .on("mouseleave", hideTooltip_bar )
                    // Update old ones, already have x / width from before
                    bars
                        .transition().duration(250)
                        .attr("y", function(d,i) { return yScale(d); })
                        .attr("height", function(d,i) { return height - yScale(d); });

                    // Remove old ones
                    bars.exit().remove();
                };

                // Handler for dropdown value change
                var dropdownChange = function() {
                    var newCereal = d3.select(this).property('value'),
                        newData   = cerealMap[newCereal];

                    updateBars(newData);
                };

                // Get names of cereals, for dropdown
                var cereals = Object.keys(cerealMap).sort();

                var dropdown = d3.select("#vis-container")
                    .insert("select", "svg")
                    .on("change", dropdownChange);

                dropdown.selectAll("option")
                    .data(cereals)
                  .enter().append("option")
                    .attr("value", function (d) { return d; })
                    .text(function (d) {
                        return d[0].toUpperCase() + d.slice(1,d.length); // capitalize 1st letter
                    });

                var initialData = cerealMap[ cereals[0] ];
                updateBars(initialData);
                 // set the dimensions and margins of the graph
                var margin = {top: 40, right: 150, bottom: 60, left: 30},
                width = 1270 - margin.left - margin.right,
                height = 500 - margin.top - margin.bottom;
                 
                // -1- Create a tooltip div that is hidden by default:
                var tooltip = d3.select(".tooltip")

                // append the svg object to the body of the page
                var svg = d3.select("#my_dataviz")
                .append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform",
                    "translate(" + margin.left + "," + margin.top + ")");
        
    //Create Bubble Chart
                var darr = []
                Object.keys(data).forEach(function(jB){   var arr = data[jB];
                    darr.push(arr)   
                    }) //will print the array belongs to each property. });
                darr.map(function(d) { return d["category"]; })
                // console.log(darr.slice(1,5).map(function(d) { return parseFloat(d["fund_eff"]); }))
                // console.log(darr.slice(1,5).map(function(d) { return d["category"]; }))
                // console.log(darr.slice(1,5).map(function(d) { return parseFloat(d["score"]); }))
                // console.log(darr.slice(1,5).map(function(d) { return parseFloat(d["ceo_compensation"]); }))
                // ---------------------------//
                //       AXIS  AND SCALE      //
                // ---------------------------//

                // Add X axis
                var x = d3.scaleLinear()
                .domain([0, d3.max(darr.map(function(d) { return parseFloat(d["fundraising_expenses"]); }))])
                .range([ 0, width ]);
                svg.append("g")
                .attr("transform", "translate(0," + height + ")")
                .call(d3.axisBottom(x).ticks(10));
                    // console.log(d3.max(darr.map(function(d) { return parseFloat(d["fundraising_expenses"]); })))
                // Add X axis label:
                svg.append("text")
                .attr("text-anchor", "middle")
                .attr("x", width)
                .attr("y", height+50 )
                .text("Fundraising Expense");

                // Add Y axis
                var y = d3.scaleLinear()
                .domain([0, 1.5])
                .range([ height, 0]);
                svg.append("g")
                .call(d3.axisLeft(y));

                // Add Y axis label:
                svg.append("text")
                .attr("text-anchor", "end")
                .attr("x", 0)
                .attr("y", -30 )
                .text("Fundraising Efficiency ($)")
                .attr("text-anchor", "start")

                // Add a scale for bubble size
                var z = d3.scaleSqrt()
                    .domain([100000, 1000000000])
                    .range([ 2, 30]);
                
                var categories=new Set(data.map(function(d) { return d.category; }))
                categories= Array.from(categories);
                // Add a scale for bubble color
                var myColor = d3.scaleOrdinal()
                .domain(categories)
                .range(d3.schemeSet1);
                // console.log(categories);

                
                // ---------------------------//
                //      TOOLTIP               //
                // ---------------------------//
                // -2- Create 3 functions to show / update (when mouse move but stay on same circle) / hide the tooltip
                var showTooltip = function(d) {
                tooltip
                .transition()
                .duration(200)
                tooltip
                .style("opacity", 1)
                .html("Org Name:" +d["name"] + "<br></br>" + "Org Size: " + d["size"] + "<br></br>" + "Total Contribution: $" + parseFloat(d["fundraising_expenses"] /d["fund_eff"]).toFixed(2) + "<br></br>" + "Total Expenses: $" + d["total_expenses"] + "<br></br>" +"Financial Score: " + d["financial_score"] + "<br></br>" + "Accountability Score: " + d["accountability_score"] + "<br></br>" + "Total Score: " + d["score"])
                .style("left", (d3.mouse(this)[0]+30) + "px")
                .style("top", (d3.mouse(this)[1]) + "px")
                // console.log(d)
                }

                var moveTooltip = function(d) {
                tooltip
                .style("left", (d3.mouse(this)[0]+30) + "px")
                .style("top", (d3.mouse(this)[1]) + "px")
                }
                // console.log(d3.mouse);
                var hideTooltip = function(d) {
                tooltip
                .transition()
                .duration(200)
                .style("opacity", 0)
                }
                
                // ---------------------------//
                //       HIGHLIGHT GROUP      //
                // ---------------------------//

                // What to do when one group is hovered
                var highlight = function(d){
                // reduce opacity of all groups
                d3.selectAll(".bubbles").style("opacity", .05)
                // expect the one that is hovered
                // console.log(d.split(' ').join('.'));
                d3.selectAll("."+d.split(' ').join('.')).style("opacity", 1)
                
                }

                // And when it is not hovered anymore
                var noHighlight = function(d){
                d3.selectAll(".bubbles").style("opacity", 1)
                
                }

                // ---------------------------//
                //       CIRCLES              //
                // ---------------------------//
              
                 
                    // Add dots
                svg.append('g')
                .selectAll("dot")
                .data(darr)
                .enter()
                .append("circle")
                .attr("class", function(d) { return "bubbles " + d["category"]; })
                .attr("cx", function(d) { return x(parseFloat(d["fundraising_expenses"])); })
                .attr("cy", function(d) { return y(parseFloat(d["fund_eff"])); })
                .attr("r", function(d) { return z(parseFloat(d["fundraising_expenses"] /d["fund_eff"])); })
                .style("fill", function (d) { return myColor(d["category"]); })
                // -3- Trigger the functions for hover
                .on("mouseover", showTooltip )
                .on("mousemove", moveTooltip )
                .on("mouseleave", hideTooltip )
                // var totalContribution = parseFloat(d["fundraising_expenses"] /d["fund_eff"]).toFixed(2)
                // console.log(totalContribution)
                // ---------------------------//
                //       LEGEND              //
                // ---------------------------//

                // Add legend: circles
                var valuesToShow = [100000, 10000000, 1000000000]
                var xCircle = 1200
                var xLabel = 950
                svg
                .selectAll("legend")
                .data(valuesToShow)
                .enter()
                .append("circle")
                    .attr("cx", xCircle - .5)
                    .attr("cy", function(d){ return height -30 - z(d) } )
                    .attr("r", function(d){ return z(d)})
                    .style("fill", "none")
                    .attr("stroke", "black")

                // Add legend: segments
                svg
                .selectAll("legend")
                .data(valuesToShow)
                .enter()
                .append("line")
                    .attr('x1', function(d){ return xCircle + z(d) } )
                    .attr('x2', xLabel + 200)
                    .attr('y1', function(d){ return height - 30 - z(d) } )
                    .attr('y2', function(d){ return height - 30 - z(d) } )
                    .attr('stroke', 'black')
                    .style('stroke-dasharray', ('2,2'))

                // Add legend: labels
                svg
                .selectAll("legend")
                .data(valuesToShow)
                .enter()
                .append("text")
                    .attr('x', xLabel + 180)
                    .attr('y', function(d){ return height -30 - z(d) } )
                    .text( function(d){ return d/10000000 } )
                    .style("font-size", 10)
                    .attr('alignment-baseline', 'middle')

                // Legend title
                svg.append("text")
                .attr('x', xCircle - 20)
                .attr("y", height-20)
                .text("Total Contribution(10M)")
                .attr("text-anchor", "middle")

                // Add one dot in the legend for each name.
                var size = 20
                var allgroups = categories //["Asia", "Europe", "Americas", "Africa", "Oceania"]
                svg.selectAll("myrect")
                .data(allgroups)
                .enter()
                .append("circle")
                    .attr("cx", 1100)
                    .attr("cy", function(d,i){ return 10 + i*(size+5)}) // 100 is where the first dot appears. 25 is the distance between dots
                    .attr("r", 7)
                    .style("fill", function(d){ return myColor(d)})
                    .on("mouseover", highlight)
                    .on("mouseleave", noHighlight)

                // Add labels beside legend dots
                svg.selectAll("mylabels")
                .data(allgroups)
                .enter()
                .append("text")
                    .attr("x", 1100 + size*.8)
                    .attr("y", function(d,i){ return i * (size + 5) + (size/2)}) // 100 is where the first dot appears. 25 is the distance between dots
                    .style("fill", function(d){ return myColor(d)})
                    .text(function(d){ return d})
                    .attr("text-anchor", "left")
                    .style("alignment-baseline", "middle")
                    .on("mouseover", highlight)
                    .on("mouseleave", noHighlight)
                };
            ;
            
            
                makeVis(JSON.parse(data));

               
