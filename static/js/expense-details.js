// Pie chart visualization 
var pie_graph = [{
  values: [totExp,totRev],
  labels: ['Total Expense', 'Total Revenue'],
  type: 'pie'
}];

var layout = {
  height: 400,
  width: 500
};

Plotly.newPlot('pie-plot', pie_graph, layout);


// // 1. Read in samples.JSON

// var file_path = "samples.json";

// var data = d3.json(file_path);

// d3.json(file_path).then(function(data) {

//   var select = d3.select("#selDataset")

//   data.names.forEach(patient => {
    
//     select.append("option").attr("value", patient).text(patient)
//   })

//   console.log(data)

//   // Change data based on patient selected
//   select.on("change", patientSelect);

//   function patientSelect (patient_select) {
//     var patient_id = d3.select(this).property("value");
//     var patient_data = data.samples.filter(d => +d.id === +patient_id)[0];
//     var patient_metadata = data.metadata.filter(d => +d.id === +patient_id)[0];
//     drawbarchart(patient_data);
//     drawbubblechart(patient_data);

//     var idSummary = d3.select("#id");
//     idSummary.text(`id: ${patient_id}`);
//     var ethnicitySummary = d3.select("#ethnicity");
//     ethnicitySummary.text(`ethnicity: ${patient_metadata.ethnicity}`);
//     var genderSummary = d3.select("#gender");
//     genderSummary.text(`gender: ${patient_metadata.gender}`);
//     var ageSummary = d3.select("#age");
//     ageSummary.text(`age: ${patient_metadata.age}`);
//     var locationSummary = d3.select("#location");
//     locationSummary.text(`location: ${patient_metadata.location}`);
//     var bbtypeSummary = d3.select("#bbtype");
//     bbtypeSummary.text(`bbtype: ${patient_metadata.bbtype}`);
//     var wfreqSummary = d3.select("#wfreq");
//     wfreqSummary.text(`wfreq: ${patient_metadata.wfreq}`);
//     }
// });

// function drawbarchart (pdata) {
//     var sample_values = pdata.sample_values;
//     var otu_ids = pdata.otu_ids;
//     var otu_labels = pdata.otu_labels;

//     data = [{
//         x: sample_values.slice(0,10).reverse(),
//         y: otu_ids.slice(0,10).map(val => "OTU" + val + " ").reverse(),
//         type: 'bar',
//         orientation: 'h'
//       }];
    
//       var layout = {  
//         title: "Spend Breakout Compared to US Average",
//         xaxis: {
//             title: "Expense Type"},
//         yaxis: {
//             title: "Amount Spent ($)"},
//         height: 600,
//         width: 500,

//         showlegend: false
//       }

//       Plotly.newPlot("bar", data, layout);

//     console.log(sample_values)
//     console.log(otu_ids)
//     console.log(otu_labels)
// }

// function drawbubblechart (pdata) {
//     var sample_values = pdata.sample_values;
//     var otu_ids = pdata.otu_ids;
//     var otu_labels = pdata.otu_labels;

//     data2 = [{
//         x: otu_ids,
//         y: sample_values,
//         type: 'bar',
//         mode: 'markers',
//         text: otu_labels,
//         marker: {
//             size: sample_values,
//             color: otu_ids
//         }
//       }];
    
//       var layout = {  
//         title: "Charity Expense Breakout",
//         xaxis: {
//             title: "Expense Type"},
//         yaxis: {
//             title: "Amount Spent ($)"},
//         height: 600,
//         width: 800,

//         showlegend: false
//       }

//       Plotly.newPlot("bubble", data2, layout);

// }
