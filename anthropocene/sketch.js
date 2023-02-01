/*by Author: danielle Gauthier
Description: This project prompted by an exercise to map the meatpacking district in New York City takes census data and climate data to describe the anthorpocene by county.
Sources: demo_3d by weidi
How to Interact: Use an arduino kit to hook up an ultrasound and humidity module to this sketch. Sync to the program to find what county your space exhibits as currently. Reflect on the text describing the county and decide on a research topic from there.
*/

let census;let selection; let description;
let county=[];let internet=[]; let education=[]; let population=[];
let temp=[]; let humidity=[]; let emissions=[]; let state=[];
let diameter = 9; let serial;
let latestData = "waiting for data";
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
    //load data with column variable names
  numRows = census.getRowCount();
  numCols = census.getColumnCount();
  county = census.getColumn(0);
  state = census.getColumn(1);
  internet = census.getColumn(2);
  education = census.getColumn(3);
  population = census.getColumn(4);
  temp = census.getColumn(5);
  humidity = census.getColumn(6); 
  emissions = census.getColumn(7);
  print("numRows "+numRows +" numCols "+numCols);
  print (internet);
 
serial = new p5.SerialPort();

 serial.list();
 serial.open('COM3');

 serial.on('connected', serverConnected);

 serial.on('list', gotList);

 serial.on('data', gotData);

 serial.on('error', gotError);

 serial.on('open', gotOpen);

 serial.on('close', gotClose);
  //make a drop down for your name column
  sel = createSelect(); sel2 = createSelect();
  sel.position(50, 400);
   sel.option("State") 
  sel.selected("State");
    // Fill the options with a filter
    for (i=1; i<numRows; i++){
    sel.option(state[i], i);
      
      
    }

  //make the description pop up when you select a county from the filtered list
  sel.changed(changeState);
     sel2.changed(changeCounty);
   sel2.position(200, 400);
  
  c1 = color(204, 102, 0);
  c2 = color(0, 102, 153);
}
function changeState(){
 sel2.remove(); //REMOVE SEL2 WHEN SELECTED STATE CHANGES
  sel2 = createSelect(); // RECREATE SEL2
  sel2.option("County"); // FIRST OPTION TO SHOW UP
  sel2.position(200, 400); // RESET SEL2 POSITION
  sel2.changed(changeCounty) // fill sel2
  sel.position(50, 400);
  for (i=1; i<numRows; i++){
  if (state[i] == state[sel.selected()]){ //CHECK ALL ROWS AGAINST SELECTED VALUE THROUGH THE filter ARRAY
      sel2.option(county[i]); // ADD filtered names TO SEL2
    }

}}
function changeCounty() {
  for (let i = 0; i < numRows; i++){ 
   if (county[i] == sel2.selected()){ //when filtered name selected
      selection = i;
     console.log(selection);
     
    } //information about filtered name
      description = "You selected: " + county[selection] + ". The population is " + population[selection] + ". The internet usage in households is " + internet[selection] + "%. The education rate of adults over 25 is " + education[selection] + "%. The emissions number is " + emissions[selection] + ". The humidity is " + humidity[selection] + "%. The average temperature is " + temp[selection] + "*F. The emissions by itself is a guage on pollution. High co2 and high humidity is a guage on potential for climate change like heavier rainfall and more dangerous heatwaves. Those places will experience more changes in temperature weather. High co2 may be affected by internet and education level in that county, as determined by the regularity of the color gradient in the data map. For the average US county: The population of these 3143 counties is 327,622,586. The internet usage in households is average 70.4% having a device. The education rate of adults over 25 is 15.6%. The average emissions number is 81.2 and the total is 2528. The average  humidity is 77.6%. The average temperature is 44.5*F.";
    
}}
  //graph the points
function draw() {
  background(220);
  strokeWeight(0.5);
    //assign columns to axes
//x-axis from 0 top left - internet
//y-axis from 0 top left- edu
 let canvasW = windowWidth;
  let canvasH = windowHeight*3;
    
    //make the overlapping points more visible
    stroke('black');
  //plot your points
   for (i=1; i<numRows+1; i++){
    let x = map(internet[i], 15, 110, 0, canvasW);
    let y = map(education[i], 0, 220, 0, canvasH);
     //let d = map(emissions[i], 0, 375, 0, canvasW);
    circle(x, y, diameter);
        //color gradient by emissions where low emissions is c2 teal and high is c1 orange
    const l = map(emissions[i], 0, 375, 1, 0);
    fill( lerpColor(c1, c2, l) );
    circle(x, y, diameter);
        
    //label by name column on mouseover
    textSize(20);
    textAlign(CENTER);
    text(county[i], x, y);
   }
  let wrapWidth = 400;
     textSize(15);
    textAlign(LEFT);
      text(description,50, 450, wrapWidth);
  text(latestData, 50, 350, 200);
 // Polling method
 /*
 if (serial.available() > 0) {
  let data = serial.read();
  ellipse(50,50,data,data);*/
 
    }
//map colors to emissions values
function setGradient(x, y, w, h, c1, c2, axis) {
  noFill();
for (i=1; i<numRows; i++) {
  if (axis === i) {
    for (let d = emissions[i]; d <= emissions[i] + w; d++) {
      let inter = map(d, w, x + w, 0, 1);
      let c = lerpColor(c1, c2, inter);
      stroke(c);
      fill(c);
      line(x, d, x + w, d);
    }}}}




function serverConnected() {
 print("Connected to Server");
}

function gotList(thelist) {
 print("List of Serial Ports:");

 for (let i = 0; i < thelist.length; i++) {
  print(i + " " + thelist[i]);
 }
}

function gotOpen() {
 print("Serial Port is Open");
}

function gotClose(){
 print("Serial Port is Closed");
 latestData = "Serial Port is Closed";
}

function gotError(theerror) {
 print(theerror);
}

function gotData() {
 let currentString = serial.readLine();
  trim(currentString);
 if (!currentString) return;
 console.log(currentString);
 latestData = currentString;

}

