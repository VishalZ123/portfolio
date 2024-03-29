import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
const scene = new THREE.Scene();
scene.background = new THREE.Color("rgb(20, 20, 20)");

//camera
const camera = new THREE.PerspectiveCamera(
  60,
  innerWidth / innerHeight,
  0.1,
  1500
);

//renderer
const app = document.querySelector("#app");
const renderer = new THREE.WebGLRenderer({antialias:true});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(app.offsetWidth, app.offsetHeight);
app.appendChild(renderer.domElement);

// controls
const controls = new OrbitControls( camera, renderer.domElement );
controls.enableZoom = false;
controls.rotateSpeed = 0.5;

//wireframe
var geo = new THREE.EdgesGeometry(new THREE.BoxGeometry(600, 600, 600));
var mat = new THREE.LineBasicMaterial({ color: 0xffffff, linewidth: 1 });
var wireframe = new THREE.LineSegments(geo, mat);

//stars
let starsGeo = new THREE.BufferGeometry();
const positionArray = new Float32Array(20000 * 3);
for (var i = 0; i < 60000; i++) {
  positionArray[i] = Math.random() * 600 - 300;
}
const positionAttribute = new THREE.BufferAttribute(positionArray, 3);
starsGeo.setAttribute("position", positionAttribute);

const loader = new THREE.TextureLoader();
var starMaterial = new THREE.PointsMaterial({
  color: 0xffffff,
  size: 2,
  map: loader.load('star.png'),
  transparent: true,
  sizeAttenuation: true,
  depthWrite: false
});
var stars = new THREE.Points(starsGeo, starMaterial);
scene.add(stars);


// initially rotate randomly
let rx = Math.random(),
  ry = Math.random(),
  rz = Math.random();
stars.rotateZ(2 * Math.PI * rx);
stars.rotateY(2 * Math.PI * ry);
stars.rotateX(2 * Math.PI * rz);

wireframe.rotateZ(2 * Math.PI * rx);
wireframe.rotateY(2 * Math.PI * ry);
wireframe.rotateX(2 * Math.PI * rz);

let velocity = 2.5;
let frame = 0;
var origin = new THREE.Vector3(0, 0, 0);
//animate and render
function animate() {
  frame += 0.01;
  let num = Math.random();
  stars.rotateZ(0.0009 * Math.sin(frame + num));
  stars.rotateY(0.0009 * Math.cos(frame + num));
  stars.rotateX(0.0009 * Math.sin(frame + num));

  stars.position.z += 0.1 * Math.sin(frame + num);
  stars.position.y += 0.1 * Math.cos(frame + num);
  stars.position.x += 0.1 * Math.sin(frame + num);

  wireframe.rotateZ(0.0009 * Math.sin(frame + num));
  wireframe.rotateY(0.0009 * Math.cos(frame + num));
  wireframe.rotateX(0.0009 * Math.sin(frame + num));

  wireframe.position.z += 0.1 * Math.sin(frame + num);
  wireframe.position.y += 0.1 * Math.cos(frame + num);
  wireframe.position.x += 0.1 * Math.sin(frame + num);

  if (camera.position.distanceTo(origin) < 900) {
    camera.position.z += velocity;
  }
  if (camera.position.distanceTo(origin) > 600) {
    scene.add(wireframe);
  }

  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  controls.update();
}
animate();

//responsive
window.onresize = () => {
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(app.offsetWidth, app.offsetHeight);
};