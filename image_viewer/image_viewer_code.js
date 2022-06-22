

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

// var canvas = document.querySelector("canvas")
// var ctx = canvas.getContext("2d")
// var image = new Image()
// image.onload = function(){        
//     ctx.drawImage(image,0,0,canvas.width,canvas.height)
// }
// image.src = '../images/HR_Stitched.png';





function load_HR_image(){
    var canvas = document.querySelector("canvas")
    var ctx = canvas.getContext("2d")
    var image = new Image()
    image.onload = function(){        
        ctx.drawImage(image,0,0,canvas.width,canvas.height)
    }
    image.src = '../images/HR_Stitched.png';
}

function load_Linear_image(){
    var canvas = document.querySelector("canvas")
    var ctx = canvas.getContext("2d")
    var image = new Image()
    image.onload = function(){        
        ctx.drawImage(image,0,0,canvas.width,canvas.height)
    }
    image.src = '../images/Interp_Stitched.png';
}

function load_Gaussian_image(){
    var canvas = document.querySelector("canvas")
    var ctx = canvas.getContext("2d")
    var image = new Image()
    image.onload = function(){        
        ctx.drawImage(image,0,0,canvas.width,canvas.height)
    }
    image.src = '../images/HR_Stitched.png';
}

function load_SR_image(){
    var canvas = document.querySelector("canvas")
    var ctx = canvas.getContext("2d")
    var image = new Image()
    image.onload = function(){        
        ctx.drawImage(image,0,0,canvas.width,canvas.height)
    }
    image.src = '../images/SR_Stitched.png';
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


//   //https://stackoverflow.com/questions/23971717/magnifying-glass-that-follows-cursor-for-canvas
// function magnifyToggle(){
//     var main = document.getElementById("mainCanvas");
//     var zoom = document.getElementById("zoomCanvas")
//     zoom.setAttribute("class", "img-magnifier-glass");
//     var zoomCtx = zoom.getContext("2d");

//     var checkMagnify = document.getElementById("checkMag");
//     checkMagnify.onchange = () => {
//             // magnifyToggle(this.checked)
//         if(this.checked){
//             alert('Magnify on')
            
//             main.addEventListener("mousemove", followMouse);
                    

//             main.addEventListener("mouseout", function(){
//                 zoom.style.display = "none";
//             });
//         }else {
//             main.removeEventListener("mousemove",followMouse)
//             alert('Magnify off')
//         }
//     }
// }

// function followMouse(e){
//     // console.log(e);
//     e.preventDefault();
//     zoomCtx.fillStyle = "white";

//     var mag = document.getElementById("magAmount");

//     zoomCtx.fillRect(0,0, zoom.width, zoom.height);
//     zoomCtx.drawImage(main, e.x-125, e.y-125, 250, 250, 0,0, (250*mag.value), (250*mag.value));

//     // console.log(zoom.style);
//     zoom.style.top = e.pageY + 10 + "px"
//     zoom.style.left = e.pageX + 10 + "px"
//     zoom.style.display = "block";
// }
