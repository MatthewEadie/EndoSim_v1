// //https://stackoverflow.com/questions/23971717/magnifying-glass-that-follows-cursor-for-canvas
// function magnify(){
//     var main = document.getElementById("mainCanvas");
//     var zoom = document.getElementById("zoomCanvas");
//     zoom.setAttribute("class", "img-magnifier-glass");
//     var zoomCtx = zoom.getContext("2d");

//     main.addEventListener("mousemove", function(e){
//         // console.log(e);
//         e.preventDefault();
//         zoomCtx.fillStyle = "white";

//         var mag = document.getElementById("magAmount");

//         zoomCtx.fillRect(0,0, zoom.width, zoom.height);
//         zoomCtx.drawImage(main, e.x-125, e.y-125, 250, 250, 0,0, (250*mag.value), (250*mag.value));

//         // console.log(zoom.style);
//         zoom.style.top = e.pageY + 10 + "px"
//         zoom.style.left = e.pageX + 10 + "px"
//         zoom.style.display = "block";
//     });

//     main.addEventListener("mouseout", function(){
//         zoom.style.display = "none";
//     });
// }

// export {magnify}