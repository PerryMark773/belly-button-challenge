// Function to update the charts and display sample metadata based on the selected sample ID
function optionChanged(sampleId) {
    d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json")
      .then(function(data) {
        // Extract the data for the selected sample ID
        var samples = data.samples;
        var selectedSample = samples.filter(sample => sample.id === sampleId)[0];
  
        // Take the top 10 values, IDs, and labels for the bar chart
        var sampleValues = selectedSample.sample_values.slice(0, 10).reverse();
        var otuIds = selectedSample.otu_ids.slice(0, 10).reverse().map(id => `OTU ${id}`);
        var otuLabels = selectedSample.otu_labels.slice(0, 10).reverse();
  
        // Create the bar chart
        var barTrace = {
          x: sampleValues,
          y: otuIds,
          text: otuLabels,
          type: "bar",
          orientation: "h"
        };
  
        var barLayout = {
          title: "Top 10 OTUs",
          xaxis: { title: "Sample Values" },
          yaxis: { title: "OTU IDs" }
        };
  
        Plotly.newPlot("bar", [barTrace], barLayout);

        // Retrieve the required data for the bubble chart
      var otuIdsBubble = selectedSample.otu_ids;
      var sampleValuesBubble = selectedSample.sample_values;
      var otuLabelsBubble = selectedSample.otu_labels;

      // Create the bubble chart
      var bubbleTrace = {
        x: otuIdsBubble,
        y: sampleValuesBubble,
        text: otuLabelsBubble,
        mode: 'markers',
        marker: {
          size: sampleValuesBubble,
          color: otuIdsBubble,
          colorscale: 'Earth'
        }
      };

      var bubbleLayout = {
        title: 'Samples',
        xaxis: { title: 'OTU IDs' },
        yaxis: { title: 'Sample Values' }
      };

      Plotly.newPlot('bubble', [bubbleTrace], bubbleLayout);

          });
        }
        
// Function to populate the dropdown menu with sample IDs
function populateDropdown() {
    var dropdown = d3.select("#selDataset");
  
    d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json")
      .then(function(data) {
        var sampleIds = data.names;
  
        // Append options to the dropdown for each sample ID
        sampleIds.forEach(function(id) {
          dropdown.append("option")
            .attr("value", id)
            .text(id);
        });
  
        // Initialize the chart with the first sample ID
        var initialSampleId = sampleIds[0];
        optionChanged(initialSampleId);
      })
      .catch(function(error) {
        console.log("Error loading the JSON file:", error);
      });
  }
  
  // Call the function to populate the dropdown menu and display initial data
  populateDropdown();