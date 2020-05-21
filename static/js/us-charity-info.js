// var name = data.map(org=>org.name)
var state = data.map(org=>org.state)
var category = data.map(org=>org.category)
// var size = data.map(org=>org.size)

function onlyUnique(value, index, self) { 
    return self.indexOf(value) === index;
}
var unique_state = state.filter( onlyUnique )
console.log(unique_state)

count = state.reduce((a, c) => (a[c] = (a[c] || 0) + 1, a), Object.create(null));

console.log (count)

var number = Object.values(count)
console.log(number)


// console.log(name)
// console.log(state)
// console.log(category)
// console.log(size)

// Create a choropleth map based off of the number of orgs in each US state

    var map_data = [{
        type: 'choropleth',
        locationmode: 'USA-states',
        locations: unique_state,
        z: number,
        //   text: unique_state,
        zmin: 0,
        zmax: 1000,
        colorscale: [
            [0, 'rgb(218,218,235)'],
            [0.25, 'rgb(188,189,220)'], [0.5, 'rgb(158,154,200)'],
            [0.75, 'rgb(117,107,177)'], [1, 'rgb(84,39,143)']],
          
        colorbar: {
            autotic: false,
            title: 'Number of Charities',
          },
        marker: {
            line:{
                color: 'rgb(255,255,255)',
                width: 2
              }
          }
      }];


    var layout = {
        title: 'Number of Charities by State',
        "titlefont": {
        "size": 36
          },
        geo:{
            scope: 'usa',
            showlakes: true,
            lakecolor: 'rgb(255,255,255)'
              
          },
          automargin: true
      };

    Plotly.newPlot("myDiv", map_data, layout, {showLink: false});

    //   Create a horizontal bar chart per org's average score within a specific category

    var cause = category.filter( onlyUnique )
    // console.log(cause)

    var outputCat = [];
    var outputAvgScore = [];
    cause.forEach(cause => {
            outputCat.push(cause)
            var catScore = data.filter(org => org.category == cause)
            outputAvgScore.push(d3.mean(catScore.map(org => org.score)))})

        console.log(outputCat)
        console.log(outputAvgScore)

        var bar_data = [{
            type: 'bar',
            y: outputCat,
            x: outputAvgScore,
            marker: {
                color: 'rgba(55,128,191,0.6)',
                width: 20
              },
            orientation: 'h'
          }];
          // create layout variable to set plots layout
          var layout_b = {
                    title: "Average Score per Cause Category",
                    autosize: true,
                    // yaxis:{title: "Cause",
                    //     automargin: true,

                    // },
                    xaxis:{title:"Average Score"},
                    titlefont: { size:38 },
                    yaxis: {'categoryorder':'category ascending'},
                  };
          Plotly.newPlot('myDiv2', bar_data , layout_b);
        
