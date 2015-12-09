var video = document.querySelector('video');
var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');
var localMediaStream = null;
var rgb = {r:0,g:0,b:0};
// var r;
// var g;
// var b;

function turnOn()
{
    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia || navigator.oGetUserMedia;

    if (navigator.getUserMedia)
    {
        navigator.getUserMedia({video: true}, handleVideo, videoError);
    }
}

function handleVideo(stream)
{
    video.src = window.URL.createObjectURL(stream);
    localMediaStream = stream;
}

function videoError(e)
{
    // do something
}

function snapshot()
{
  if (localMediaStream)
  {
    ctx.drawImage(video, 0, 0, 300, 150);
    document.querySelector('img').src = canvas.toDataURL('image/webp');

    getAverageRGB(img);
  }
}

//Creates the counter for the localStorage for saving
function createSave()
{
  if(typeof(Storage) !== "undefined")
  {

    var dataSet = new RGBConstructor(rgb);

    //alert("dataSet = " + JSON.stringify(dataSet));

            if(localStorage.saveCount == undefined)
            {
              localStorage.setItem('saveCount', 0)
            }
            var saveSize = parseInt(localStorage.saveCount) + 1;

            //Calls the commitToStorage function to save the object
            commitToStorage(saveSize, dataSet);
  }
  else
  {
    alert("Sorry, your browser does not support web storage...");
  }
}

// //Saves the the object in the localStorage
function commitToStorage(objectCount, newObject)
{
  var item = getFileName();
  localStorage.setItem('saveCount', objectCount);

  localStorage.setItem(item, JSON.stringify(newObject));
  alert("Saved " + item);
}

function callSave()
{
  var save = JSON.parse(localStorage.getItem(getFileName()));
  // alert(JSON.stringify(save));
  // alert("Loading " + getFileName() + ", RGB values... " + "\n" +
  // JSON.stringify(save);
  savedTable(save);
}

//Function clears localStorage
function clearSave()
{
  localStorage.clear();
  alert("Saved data has been erased");
}

// //Function generates an object for rgb parameters
function RGBConstructor(rgb)
{
  this.rgb = rgb;
}

// //Get function for the fileName
function getFileName()
{
  var fileName = document.getElementById('txt_save').value;
  return fileName;
}

function getAverageRGB (img)
{
  //alert("Calculating RGB values...")
      var pixelInterval = 1,
      count = 0,
      i = -4,
      data, length;

  // return the base colour for non-compliant browsers
  if (!ctx)
  {
    return rgb;
  }

  try
  {
    data = ctx.getImageData(0, 0, img.width, img.height);
  }
  catch(e)
  {
    // catch errors - usually due to cross domain security issues
    alert(e);
    return rgb;
  }

  data = data.data;
  length = data.length;
  while ((i += pixelInterval * 4) < length)
  {
    count++;
    rgb.r += data[i];
    rgb.g += data[i+1];
    rgb.b += data[i+2];
  }

  // floor the average values to give correct rgb values (ie: round number values)
  rgb.r = Math.floor(((rgb.r/count) / 100) *255);
  rgb.g = Math.floor(((rgb.g/count) / 100) *255);
  rgb.b = Math.floor(((rgb.b/count) / 100) *255);

 //  // Write the result to table.
 // var pixelTable = document.getElementById('pixel_table');
 // var row;
 //
 // row = pixelTable.deleteRow(-1);
 // row = pixelTable.insertRow(-1);
 //
 //  row.insertCell(-1).innerHTML = getFileName();
 //  row.insertCell(-1).innerHTML = rgb.r;
 //  row.insertCell(-1).innerHTML = rgb.g;
 //  row.insertCell(-1).innerHTML = rgb.b;
 writeTable(rgb);

  return rgb;
}

//Function reloads the saved RGB values into the chart
function savedTable(save)
{
  // Write the result to table.
 var pixelTable = document.getElementById('pixel_table');
 var row;

 //alert("in savedTable " + JSON.stringify(save.rgb));

 row = pixelTable.deleteRow(-1);
 row = pixelTable.insertRow(-1);

  row.insertCell(-1).innerHTML = getFileName();
  row.insertCell(-1).innerHTML = save.rgb.r;
  row.insertCell(-1).innerHTML = save.rgb.g;
  row.insertCell(-1).innerHTML = save.rgb.b;
}

//Writes the RGB values to the chart
function writeTable(rgb)
{
  // Write the result to table.
 var pixelTable = document.getElementById('pixel_table');
 var row;

 row = pixelTable.deleteRow(-1);
 row = pixelTable.insertRow(-1);

  row.insertCell(-1).innerHTML = getFileName();
  row.insertCell(-1).innerHTML = rgb.r;
  row.insertCell(-1).innerHTML = rgb.g;
  row.insertCell(-1).innerHTML = rgb.b;
}
