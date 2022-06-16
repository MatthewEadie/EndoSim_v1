
window.onload = function(){
    var zoomCanvas = document.getElementById("zoomCanvas")

    var zoomSlider = document.getElementById("zoomSize");
    var zoomOutput = document.getElementById("zoomSizeValue");

    var magSlider = document.getElementById("magAmount");
    var magOutput = document.getElementById("magValue");



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

    var canvas = document.querySelector("canvas")
    var ctx = canvas.getContext("2d")
    var image = new Image()
    image.onload = function(){        
        ctx.drawImage(image,0,0,canvas.width,canvas.height)
    }
    image.src = '../images/HR_Stitched.png';
};




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


