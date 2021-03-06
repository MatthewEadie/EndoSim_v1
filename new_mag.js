//https://codepen.io/chengarda/pen/wRxoyB
const canvas = document.getElementById("mainCanvas")
let ctx = canvas.getContext('2d')


const zoomCanvas = document.getElementById("compareCanvas");
zoomCanvas.setAttribute("class", "img-magnifier-glass");
let zoomCtx = zoomCanvas.getContext("2d");

let v_pause = true

let cameraOffset = { x: 200, y: 125 }
let cameraZoom = 1
let MAX_ZOOM = 5
let MIN_ZOOM = 0.1
let SCROLL_SENSITIVITY = 0.0005


var dataset_location = "./images/dataset1/"
var image_number = 11

var image = new Image()
image.src = dataset_location + 'image' + image_number + '_HR.png';

var compImage = new Image()
compImage.src = dataset_location + 'image' + image_number + '_HR.png';;

let zoomSlider = document.getElementById("zoomSize");
let zoomOutput = document.getElementById("zoomSizeValue");

let magSlider = document.getElementById("magAmount");
let magOutput = document.getElementById("magValue");

zoomOutput.innerHTML = zoomSlider.value;
zoomSlider.oninput = function() {
    zoomOutput.innerHTML = this.value;
    zoomCanvas.width=this.value
    zoomCanvas.height=this.value
}

magOutput.innerHTML = magSlider.value;
magSlider.oninput = function() {
    magOutput.innerHTML = this.value;
}


function load_HR_image(){
    compImage.src = dataset_location + 'image' + image_number + '_HR.png';
    draw()
}

function load_Linear_image(){
    compImage.src = dataset_location + 'image' + image_number + '_Interp.png';
    draw()
}

function load_Gaussian_image(){
    compImage.src = dataset_location + 'image' + image_number + '_HR.png';
    draw()
}

function load_SR_image(){
    compImage.src = dataset_location + 'image' + image_number + '_SR.png';
    draw()
}

function changeImage(imgNo){
    image.src = dataset_location + 'image' + imgNo + '_HR.png';
    compImage.src = dataset_location + 'image' + imgNo + '_HR.png';
}

function openTab(evt, tabName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
  }

function changeFilter(){
    sliderContrast = document.getElementById("sliderContrast");
    sliderBrightness = document.getElementById("sliderBrightness");

    canvas.style.setProperty('filter',`contrast(${sliderContrast.value}%) brightness(${sliderBrightness.value}%)`)
  }

function noiseLevel(){
    sliderNoise = document.getElementById("sliderNoise");

    opacity = sliderNoise.value/100


    alert(canvas.width)

    ctx = canvas.getContext('2d'),
    x, y,
    number,
    opacity = opacity || .2;
  
    for ( x = 0; x < canvas.width; x++ ) {
        for ( y = 0; y < canvas.height; y++ ) {
            number = Math.floor( Math.random() * 60 );

            ctx.fillStyle = "rgba(" + number + "," + number + "," + number + "," + opacity + ")";
            ctx.fillRect(x, y, 1, 1);
        }
    }
}

function draw()
{
    canvas.width = 1480 //window.innerWidth
    canvas.height = 720 //window.innerHeight
    
    // Translate to the canvas centre before zooming - so you'll always zoom on what you're looking directly at
    ctx.translate( canvas.width / 2, canvas.height / 2 )
    ctx.scale(cameraZoom, cameraZoom)
    ctx.translate( -window.innerWidth / 2 + cameraOffset.x, -window.innerHeight / 2 + cameraOffset.y )
    ctx.clearRect(0,0, window.innerWidth, window.innerHeight)

    ctx.drawImage(image,0,0,canvas.width,canvas.height)
    
    if (v_pause) {
        requestAnimationFrame( draw )
        console.log('draw')
    }
}

function pause(){
    if (v_pause == false) {
        v_pause = true
        draw()
    } else {
        v_pause = false
    }
}

// Gets the relevant location from a mouse or single touch event
function getEventLocation(e)
{
    if (e.touches && e.touches.length == 1)
    {
        return { x:e.touches[0].clientX, y: e.touches[0].clientY }
    }
    else if (e.clientX && e.clientY)
    {
        return { x: e.clientX, y: e.clientY }        
    }
}

function drawRect(x, y, width, height)
{
    ctx.fillRect( x, y, width, height )
}

function drawText(text, x, y, size, font)
{
    ctx.font = `${size}px ${font}`
    ctx.fillText(text, x, y)
}

let isDragging = false
let dragStart = { x: 0, y: 0 }

function onPointerDown(e)
{
    isDragging = true
    dragStart.x = getEventLocation(e).x/cameraZoom - cameraOffset.x
    dragStart.y = getEventLocation(e).y/cameraZoom - cameraOffset.y
}

function onPointerUp(e)
{
    isDragging = false
    initialPinchDistance = null
    lastZoom = cameraZoom
}

function onPointerMove(e)
{
    if (isDragging)
    {
        cameraOffset.x = getEventLocation(e).x/cameraZoom - dragStart.x
        cameraOffset.y = getEventLocation(e).y/cameraZoom - dragStart.y
    }
}

function handleTouch(e, singleTouchHandler)
{
    if ( e.touches.length == 1 )
    {
        singleTouchHandler(e)
    }
    else if (e.type == "touchmove" && e.touches.length == 2)
    {
        isDragging = false
        handlePinch(e)
    }
}

let initialPinchDistance = null
let lastZoom = cameraZoom

function handlePinch(e)
{
    e.preventDefault()
    
    let touch1 = { x: e.touches[0].clientX, y: e.touches[0].clientY }
    let touch2 = { x: e.touches[1].clientX, y: e.touches[1].clientY }
    
    // This is distance squared, but no need for an expensive sqrt as it's only used in ratio
    let currentDistance = (touch1.x - touch2.x)**2 + (touch1.y - touch2.y)**2
    
    if (initialPinchDistance == null)
    {
        initialPinchDistance = currentDistance
    }
    else
    {
        adjustZoom( null, currentDistance/initialPinchDistance )
    }
}

function adjustZoom(zoomAmount, zoomFactor)
{
    if (!isDragging)
    {
        if (zoomAmount)
        {
            cameraZoom += zoomAmount
        }
        else if (zoomFactor)
        {
            console.log(zoomFactor)
            cameraZoom = zoomFactor*lastZoom
        }
        
        cameraZoom = Math.min( cameraZoom, MAX_ZOOM )
        cameraZoom = Math.max( cameraZoom, MIN_ZOOM )
        
        console.log(zoomAmount)
    }
}

function toggleMove(){
    var checkMove = document.getElementById("checkMove");
    if (!checkMove.checked) {
        canvas.addEventListener('mousedown', onPointerDown)
        // canvas.addEventListener('touchstart', (e) => handleTouch(e, onPointerDown))
        canvas.addEventListener('mouseup', onPointerUp)
        // canvas.addEventListener('touchend',  (e) => handleTouch(e, onPointerUp))
        canvas.addEventListener('mousemove', onPointerMove)
        // canvas.addEventListener('touchmove', (e) => handleTouch(e, onPointerMove))
    } else {
        canvas.removeEventListener('mousedown', onPointerDown)
        // canvas.removeEventListener('touchstart', (e) => handleTouch(e, onPointerDown))
        canvas.removeEventListener('mouseup', onPointerUp)
        // canvas.removeEventListener('touchend',  (e) => handleTouch(e, onPointerUp))
        canvas.removeEventListener('mousemove', onPointerMove)
        // canvas.removeEventListener('touchmove', (e) => handleTouch(e, onPointerMove))
        canvas.removeEventListener( 'wheel', (e) => adjustZoom(e.deltaY*SCROLL_SENSITIVITY))        
    }
}






//https://stackoverflow.com/questions/25907163/html5-canvas-eraser-tool-without-overdraw-white-color
//Code for eraser for later

//https://codepen.io/alperentalaslioglu/pen/yPGgvP
function draw_annotation() {
    // Definitions
    var boundings = canvas.getBoundingClientRect();
  
    // Specifications
    var mouseX = 0;
    var mouseY = 0;
    ctx.strokeStyle = 'black'; // initial brush color
    ctx.lineWidth = 1; // initial brush width
    var isDrawing = false;
  
  
    // Handle Colors
    var colors = document.getElementsByClassName('colors')[0];
  
    colors.addEventListener('click', function(event) {
      ctx.strokeStyle = event.target.value || 'black';
    });
  
    // Handle Brushes
    var brushes = document.getElementsByClassName('brushes')[0];
  
    brushes.addEventListener('click', function(event) {
      ctx.lineWidth = event.target.value || 1;
    });
  
    // Mouse Down Event
    canvas.addEventListener('mousedown', function(event) {
      setMouseCoordinates(event);

      isDrawing = true;
  
      // Start Drawing
      ctx.beginPath();
      ctx.moveTo(mouseX, mouseY);
    });
  
    // Mouse Move Event
    canvas.addEventListener('mousemove', function(event) {
      setMouseCoordinates(event);
  
      if(isDrawing){
        ctx.lineTo(mouseX, mouseY);
        ctx.stroke();
      }
    });
  
    // Mouse Up Event
    canvas.addEventListener('mouseup', function(event) {
      setMouseCoordinates(event);
      isDrawing = false;
    });
  
    // Handle Mouse Coordinates
    function setMouseCoordinates(e) {
    //   mouseX = event.clientX/cameraZoom - cameraOffset.x //+ boundings.left; ///cameraZoom
    //   mouseY = event.clientY/cameraZoom - cameraOffset.y //+ boundings.top;

      mouseX = getEventLocation(e).x- cameraOffset.x/cameraZoom //cameraZoom
      mouseY = getEventLocation(e).y- cameraOffset.y/cameraZoom

    }
  
    // Handle Clear Button
    var clearButton = document.getElementById('clear');
  
    clearButton.addEventListener('click', function() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    });
  
    // Handle Save Button
    var saveButton = document.getElementById('save');
  
    saveButton.addEventListener('click', function() {
      var imageName = prompt('Please enter image name');
      var canvasDataURL = canvas.toDataURL();
      var a = document.createElement('a');
      a.href = canvasDataURL;
      a.download = imageName || 'drawing';
      a.click();
    });
  };


function togglePlaceAnnotation(){
    var checkPlaceAnno = document.getElementById("checkPlaceAnnotation");
    alert("annotation")
    if (!checkPlaceAnno.checked) {
        canvas.addEventListener('mousedown', placeAnnotation)
    } else {
        canvas.removeEventListener('mousedown', placeAnnotation)   
    }
}

function placeAnnotation(e){
    const textBox = document.getElementById("annotationTextBox")
    var text = textBox.value //Get text from textbox

    const annotationShapeColor = document.getElementById("annotationShapeColor")
    var shapeColor = annotationShapeColor.value //Get text from textbox

    const annotationShapeSize = document.getElementById("annotationShapeSize")
    var shapeRadius = annotationShapeSize.value //Get text from textbox

    //place text at position of mouse
    ctx.fillStyle="#990000";
    ctx.font="30px futura";
    ctx.textBaseline="top";
    ctx.fillText(text,e.x+shapeRadius,e.y+shapeRadius); 

    //place circle at position of mouse    
    ctx.lineWidth = 4;
    ctx.strokeStyle = shapeColor;
    ctx.beginPath();
    ctx.arc(e.x, e.y+10, shapeRadius, 0, 2 * Math.PI);
    ctx.stroke();

    
    var ul = document.getElementById("annotation_list");
    var li = document.createElement("li");
    li.appendChild(document.createTextNode(text));
    ul.appendChild(li);
}



function cursorMag(e){
    zoomCtx.fillStyle = "white";

    // var mag = document.getElementById("magAmount");

    zoomCtx.fillRect(0,0, zoomCanvas.width, zoomCanvas.height);
    zoomCtx.drawImage(compImage, e.x-300, e.y-200, 1480, 720, 0,0, 1480, 720);

    // console.log(zoom.style);
    zoomCanvas.style.top = e.pageY + 10 + "px"
    zoomCanvas.style.left = e.pageX + 10 + "px"
    zoomCanvas.style.display = "block";
}

function cursorOut(e){
    zoomCanvas.style.display = "none";
}


//https://stackoverflow.com/questions/23971717/magnifying-glass-that-follows-cursor-for-canvas
function toggleMagnify(){
    var checkMove = document.getElementById("checkMag");
    if (!checkMove.checked) {
        canvas.addEventListener("mousemove", cursorMag);
        canvas.addEventListener("mouseout", cursorOut);
    } else {
        canvas.removeEventListener("mousemove", cursorMag);
        canvas.removeEventListener("mouseout", cursorOut);
    }
}

canvas.addEventListener( 'wheel', (e) => adjustZoom(e.deltaY*SCROLL_SENSITIVITY))

// Ready, set, go
draw()