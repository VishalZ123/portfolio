let root = document.documentElement;

// For mouse transition

// let rect = document.getElementsByClassName("card")[0].getBoundingClientRect();
// root.addEventListener("mousemove", (e) => {
//   let cx = (rect.x + rect.right) / 2;
//   let cy = (rect.y + rect.bottom) / 2;
//   let theta =
//     (Math.atan(Math.abs((e.clientY - cy) / (e.clientX - cx))) * 180) / Math.PI;
//   let angle;
//   if (e.clientX > cx && e.clientY > cy) {
//     angle = 360 - theta;
//   } else if (e.clientX > cx && e.clientY < cy) {
//     angle = 180 + theta;
//   } else if (e.clientX < cx && e.clientY > cy) {
//     angle = theta;
//   } else if (e.clientX < cx && e.clientY < cy) {
//     angle = 180 - theta;
//   }
//   console.log(angle);
//   root.style.setProperty("--rotate", angle + "deg");
// });

// transition with time
let temp = new Date().getTime();
let now, delta;
function animate() {
  requestAnimationFrame(animate);
  now = new Date().getTime();
  delta = now - temp;
  
  root.style.setProperty(
    "--rotate",
    180*Math.sin(delta/1500)+ "deg"
  );
  root.style.setProperty(
    "--rotate2",
    360 * Math.abs(Math.sin(delta / 1500)) + "deg"
  );
}
animate();
