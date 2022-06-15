
window.onload = function(){
}

function load_HR_image(){
    var image = new Image()
    image.src = '../images/HR_Stitched.png';
    var canvas = document.querySelector("canvas")
    var ctx = canvas.getContext("2d")
    ctx.drawImage(image,0,0)
}

function load_Linear_image(){
    var image = new Image()
    image.src = '../images/Interp_Stitched.png';
    var canvas = document.querySelector("canvas")
    var ctx = canvas.getContext("2d")
    ctx.drawImage(image,0,0)
}

function load_Gaussian_image(){
    var image = new Image()
    image.src = '../images/HR_Stitched.png';
    var canvas = document.querySelector("canvas")
    var ctx = canvas.getContext("2d")
    ctx.drawImage(image,0,0)
}

function load_SR_image(){
    var image = new Image()
    image.src = '../images/SR_Stitched.png';
    var canvas = document.querySelector("canvas")
    var ctx = canvas.getContext("2d")
    ctx.drawImage(image,0,0)
}