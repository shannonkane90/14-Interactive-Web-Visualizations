// Use the D3 library to read in samples.json.
// Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.
// Use sample_values as the values for the bar chart.
// Use otu_ids as the labels for the bar chart.
// Use otu_labels as the hovertext for the chart.


// get the numbers from json into the dropdown
function buildmetadatadropdown(samples) {
    d3.json("samples.json").then((data) => {
            let metadata = data.metadata;
            let filtermetadata = metadata.filter(sampleobject => sampleobject.id == samples);
            var samplemetadata = d3.select("sample-metadata");
        } ) 

}

function buildmetadatadisplay(samples) {
    d3.json("samples.json").then((data)=>{
        let metadata=data.metadata;
    }
}
//then do object entries for key and value pair; each key value pair needs to be included in order for changes in display to occur
// Need to change what is in the append() Don't think "option" is right
            Object.entries(filtermetadata).forEach(([key, value]) => {
                samplemetadata.append("h5").text(key[0].toUpperCase() + ": " + key[1] + "\n");

  });

 function ChangeOption(id) {
     buildmetadatadropdown(id);
     buildmetadatadisplay(id);
    } 


// Build Charts; may want to change chartdata variable name
function buildBarCharts(samples) {

    d3.json("samples.json").then((data) => {
        let chartdata = data.chartdata;
        let filtermetadata = chartdata.filter(sampleobject => sampleobject.id == samples);
        var labels= data.samples[0].otu_labels.slice(0,10);
        var top_otus= (data.samples[0].otu_ids.slice(0,10)).reverse();
        var OTU_id=top_otus.map(d=>"OTU " + d);
        var trace = {
            x:"samples",
            y:"OTU_id",
            text:"OTU_labels",
            marker: {
            color:'blue'},    
            type:"bar",
            oriencation:"h",
        }
        var barchartdata=[trace];
        var chartlayout = {
            title:"Top Ten OTUs",
            yaxis:{tickmode:"linear"},
            margin:{
                l: 100,
                r:100,
                t: 100,
                b: 100,
            }
        };
// Create a bubble chart that displays each sample.
// Use otu_ids for the x values.
// Use sample_values for the y values.
// Use sample_values for the marker size.
// Use otu_ids for the marker colors.
// Use otu_labels for the text values.
        var trace2= {
            x: data.samples[0].otu_ids,
            y:data.samples[0].samplemetadata,
            mode:"markers",
            marker: {
                size:data.samples[0].samplemetadata,
                color: data.samples[0].otu_ids
            }
            text:data.samples[0].otu_labels


        }
        var bubblechartlayout = {
            xaxis:{title: "OTU IDs"},
            height: 600,
            width: 1000
        };
        //Plots for bar and bubble
        Plotly.newPlot("bar", barchartdata, barchartlayout);
        Plotly.nerPlot("bubble", trace2, bublechartlayout)

        //Data Rendering + Dropdown
        function init() {
            let dropdown = d3.select("#selDataset");
            d3.json("samples.json").then((data)=> {
            data.names.forEach(function(name){
                dropdown.append("option").text(name).property("value");
            });  
        
        
            buildmetadatadropdown(data.names[0]);
            buildmetadatadisplay(data.names[0]);
        });
    }
    init();

