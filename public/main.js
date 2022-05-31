let root = document.documentElement;

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
