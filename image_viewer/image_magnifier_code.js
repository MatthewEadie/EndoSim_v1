function magnify(){
    var main = document.getElementById("mainCanvas");
    var zoom = document.getElementById("zoomCanvas");
    zoom.setAttribute("class", "img-magnifier-glass");
    var ctx = main.getContext("2d")
    var zoomCtx = zoom.getContext("2d");
    var img = new Image();
    img.src = "http://astrobioloblog.files.wordpress.com/2011/10/duck-1.jpg"


    ctx.drawImage(img,0,0);


    alert('circle')

    main.addEventListener("mousemove", function(e){
        // console.log(e);
        e.preventDefault();
        zoomCtx.fillStyle = "white";

        

        zoomCtx.fillRect(0,0, zoom.width, zoom.height);
        zoomCtx.drawImage(main, e.x-125, e.y-125, 250, 250, 0,0, 500, 500);

        // zoomCtx.beginPath();
        // zoomCtx.arc(100, 75, 50, 0, 2 * Math.PI);
        // zoomCtx.fill();

        // console.log(zoom.style);
        zoom.style.top = e.pageY + 10 + "px"
        zoom.style.left = e.pageX + 10 + "px"
        zoom.style.display = "block";
    });
}