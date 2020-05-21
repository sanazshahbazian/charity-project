// Using the Charity Navigtaor data provided in the form of an array of JavaScript objects, write code that appends a table to your web page and then adds new rows of data for each charity.
var tbody = d3.select("tbody");
var tr = d3.select("tr");

d3.select("tbody")
  .selectAll("tr")
  .data(data)
  .enter()
  .append("tr")
  .html(function(d) {
    return `<td>${d.name}</td><td>${d.category}</td><td>${d.subcategory}</td><td>${d.state}</td><td>${d.motto}</td>`;
  });

console.log(data);

// Use a text form in your HTML document and write JavaScript code that will listen for events and search through the charity cause, organization name, and location columns to find rows that match user input.
var instances = data;
var filterButton = d3.select("#filter-btn");

// Create array of Charity Names
var orgs = [], charity_names = [], l = data.length, i;
for(i=0; i<l; i++) {
    if(orgs[data[i].name]) continue;
    orgs[data[i].name] = true;
    charity_names.push(data[i].name);
    charity_names.sort();
};


// Create dropdown for Charity Names

var select = d3.select("#selOrgData")
charity_names.forEach (name => {
    select.append("option").attr("value", name).text(name)
});

// Create array of unique Cause (category) values
var causes = [], unique_categories = [], l = data.length, i;
for(i=0; i<l; i++) {
    if(causes[data[i].category]) continue;
    causes[data[i].category] = true;
    unique_categories.push(data[i].category);
    unique_categories.sort();
};

// Create dropdown for Cause filter based on unique Cause values

var select = d3.select("#selCauseData")
unique_categories.forEach (name => {
    select.append("option").attr("value", name).text(name)
})


// Create array of State values
var flags = [], states = [], l = data.length, i;
for( i=0; i<l; i++) {
    if(flags[data[i].state]) continue;
    flags[data[i].state] = true;
    states.push(data[i].state);
    states.sort();
};

// Create dropdown for State filter based on State values

var select = d3.select("#selStateData")
states.forEach (name => {
    select.append("option").attr("value", name).text(name)
});

//PLAYGROUND

// CHOOSE A CHARITY

// Complete the click handler for the form
filterButton.on("click", function() {

  // Select the input element and get the raw HTML node
  var inputElement = d3.select("#selOrgData");

  //Get the value property of the input Element
  var inputValue = inputElement.property("value");

  // Create a custom filtering function that filters dataset for user input
  function selectName(instance) {
      return instance.name === inputValue;
  }

  // Remove table contents
  tbody.html("");

  // Use the form input to filter the data by user input
  var filteredData = instances.filter(selectName);

  // console.log(filteredData);
  d3.select("tbody")
    .selectAll("tr")
    .data(filteredData)
    .enter()
    .append("tr")
    .html(function(d) {
      return `<td>${d.name}</td><td>${d.category}</td><td>${d.subcategory}</td><td>${d.state}</td><td>${d.motto}</td>`;
    });

  
// CHOOSE A CAUSE

// Complete the click handler for the form
filterButton.on("click", function() {

  // Select the input element and get the raw HTML node
  var inputElement = d3.select("#selCauseData");

  //Get the value property of the input Element
  var inputValue = inputElement.property("value");

  // Create a custom filtering function that filters dataset for user input
  function selectCause(instance) {
      return instance.category === inputValue;
  }

  // Remove table contents
  tbody.html("");

  // Use the form input to filter the data by user input
  var filteredData = instances.filter(selectCause);

  d3.select("tbody")
    .selectAll("tr")
    .data(filteredData)
    .enter()
    .append("tr")
    .html(function(d) {
      return `<td>${d.name}</td><td>${d.category}</td><td>${d.subcategory}</td><td>${d.state}</td><td>${d.motto}</td>`;
    
    });

// CHOOSE A STATE

// Complete the click handler for the form
filterButton.on("click", function() {

  // Select the input element and get the raw HTML node
  var inputElement = d3.select("#selStateData");

  //Get the value property of the input Element
  var inputValue = inputElement.property("value");

  // Create a custom filtering function that filters dataset for user input
  function selectState(instance) {
      return instance.state === inputValue;
  }

  // Remove table contents
  tbody.html("");

  // Use the form input to filter the data by user input
  var filteredData = instances.filter(selectState);

  d3.select("tbody")
    .selectAll("tr")
    .data(filteredData)
    .enter()
    .append("tr")
    .html(function(d) {
      return `<td>${d.name}</td><td>${d.category}</td><td>${d.subcategory}</td><td>${d.state}</td><td>${d.motto}</td>`;
    });
  
  console.log(filteredData);

});

});
});
