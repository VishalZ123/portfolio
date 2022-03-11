import * as THREE from "three";
import { TrackballControls } from "three/examples/jsm/controls/TrackballControls";
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js';
const scene = new THREE.Scene();
scene.background = new THREE.Color("rgb(20, 20, 20)");
//camera
const camera = new THREE.PerspectiveCamera(
  45,
  innerWidth / innerHeight,
  0.1,
  1000
);
camera.position.set(0, 5, 4);

//renderer
const app = document.querySelector("#app");
const renderer = new THREE.WebGLRenderer();
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(app.offsetWidth, app.offsetHeight);
app.appendChild(renderer.domElement);

//light
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(0, 20, 20);
light.lookAt(0, 0, 0);
scene.add(light);

//controls
let controls = new TrackballControls(camera, renderer.domElement);
controls.rotateSpeed = 1.0;
controls.zoomSpeed = 1.2;
controls.panSpeed = 0.8;

// curiosity
const loader = new STLLoader();
loader.load("./models/MSL_clean.stl", function (geometry) {
  const material = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    wireframe:true
  });
  const mesh = new THREE.Mesh(geometry, material);

//   mesh.castShadow = true;
//   mesh.receiveShadow = true;
  scene.add(mesh);
});

// animate and render
function animate() {
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