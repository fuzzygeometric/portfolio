/*by Author: danielle Gauthier
Description: This project prompted by an exercise to map the meatpacking district in New York City takes census data and climate data to describe the anthorpocene by county.
Sources: demo_3d by weidi
How to Interact: Use an arduino kit to hook up an ultrasound and humidity module to this sketch. Sync to the program to find what county your space exhibits as currently. Reflect on the text describing the county and decide on a research topic from there.
*/

let census;
let county=[];let internet=[]; let education=[]; let population=[];
let temp=[]; let humidity=[]; let emissions=[];
let diameter = 9;
let myCanvas;
function preload() {
  //my table is comma separated value "csv"
  //and has a header specifying the columns labels
  //the first column is a name column
  //the other columns are rates, total, or average
  census = loadTable('meatpacking final.csv', 'csv', 'header');
   font1 = loadFont("AbhayaLibre-Regular.ttf")
  //the file can be remote
  //table = loadTable("http://p5js.org/reference/assets/mammals.csv",
  //                  "csv", "header");
}

function setup() {
  //make the canvas respective to the window and data
   let canvasW = windowWidth;
  let canvasH = windowHeight*3;
  myCanvas = createCanvas(canvasW,canvasH);
  cursor(HAND);
  textFont(font1);
  //get the basic info of the data, know your csv loaded from console
  numRows = census.getRowCount();
  numCols = census.getColumnCount();
  print("numRows "+numRows +" numCols "+numCols)
   //load data with column variable names
  for(let i=0; i<census.getRowCount(); i++){
    county[i] = census.getString(i,0); //name column
   internet[i] = census.getNum(i,1);
   education[i] = census.getNum(i,2);
  population[i] = census.getNum(i,3);
    temp[i] = census.getNum(i,4);
    humidity[i] = census.getNum(i,5);
  emissions[i] = census.getNum(i,6); 
  }
  //make a drop down for your name column
  sel = createSelect();
  sel.position(50, 400);
for(var i = 0; i < census.getRowCount(); i++) {
county[i] = census.getString(i,0);
    // Fill the options with all county names
    sel.option(county[i]);
}
  //make the description pop up when you select a county
  sel.changed(mySelectEvent);
}

function mySelectEvent() {
  for(let i=0; i<census.getRowCount();i++){ 
      let description = "You selected: " + county[i] + ". The population is " + population[i] + ". The internet usage in households is " + internet[i] + "%. The education rate of adults over 25 is " + education[i] + "%. The emissions number is " + emissions[i] + ". The humidity is " + humidity[i] + "%. The average temperature is " + temp[i] + "*F. The emissions by itself is a guage on pollution. High co2 and high humidity is a guage on potential for climate change like heavier rainfall and more dangerous heatwaves. Those places will experience more changes in temperature weather. High co2 may be affected by internet and education level in that county, as determined by the regularity of the color gradient in the data map. For the average US county: The population of these 3143 counties is 327,622,586. The internet usage in households is average 70.4% having a device. The education rate of adults over 25 is 15.6%. The average emissions number is 81.2 and the total is 2528. The average  humidity is 77.6%. The average temperature is 44.5*F.";
    let wrapWidth = 400;
     textSize(15);
    textAlign(LEFT);
      text(description,50, 450, wrapWidth)
    }
}
  //graph the points
function draw() {
  background(220);
  strokeWeight(0.5);
    //assign columns to axes
//x-axis from 0 top left - internet
//y-axis from 0 top left- edu
 let canvasW = windowWidth;
  let canvasH = windowHeight*3;
  for(let i=0; i<census.getRowCount();i++){
    let x = map(internet[i], 15, 110, 0, canvasW);
    let y = map(education[i], 0, 220, 0, canvasH);
    //make the overlapping points more visible
    stroke('blue');
  //plot your points
    circle(x, y, diameter);
        //to do: color gradient - emissions
    fill('black');
    //label by name column on mouseover
    textSize(20);
    textAlign(CENTER);
    text(county[i], x, y);
    let description = "You selected: " + county[i] + ". The population is " + population[i] + ". The internet usage in households is " + internet[i] + "%. The education rate of adults over 25 is " + education[i] + "%. The emissions number is " + emissions[i] + ". The humidity is " + humidity[i] + "%. The average temperature is " + temp[i] + "*F. The emissions by itself is a guage on pollution. High co2 and high humidity is a guage on potential for climate change like heavier rainfall and more dangerous heatwaves. Those places will experience more changes in temperature weather. High co2 may be affected by internet and education level in that county, as determined by the regularity of the color gradient in the data map. For the average US county: The population of these 3143 counties is 327,622,586. The internet usage in households is average 70.4% having a device. The education rate of adults over 25 is 15.6%. The average emissions number is 81.2 and the total is 2528. The average  humidity is 77.6%. The average temperature is 44.5*F.";
    //check mouse position against data points in for loop to display description
  if (dist(mouseX, mouseY, x, y) < diameter/2){ 
    let wrapWidth = 400;
     textSize(15);
    textAlign(LEFT);
      text(description,50, 450, wrapWidth)
    }}
}

