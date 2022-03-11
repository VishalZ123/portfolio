//imports
import * as THREE from "three";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry";
// import { DragControls } from "three/examples/jsm/controls/DragControls";
import { TrackballControls } from "three/examples/jsm/controls/TrackballControls";
//scene
const scene = new THREE.Scene();
scene.background = new THREE.Color("rgb(0, 0, 0)");
//camera
const camera = new THREE.PerspectiveCamera(
  45,
  innerWidth / innerHeight,
  0.1,
  1000
);
camera.position.set(0,0,70);
camera.lookAt(0,0,0);

//renderer
const app = document.querySelector("#app");
const renderer = new THREE.WebGLRenderer();
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(app.offsetWidth, app.offsetHeight);
app.appendChild(renderer.domElement);

// cube
const cubeGeometry = new RoundedBoxGeometry(10, 10, 10, 6, 0.4);
const loader = new THREE.TextureLoader();
const texture = loader.load("textures/wood2.jpg");
const material = new THREE.MeshStandardMaterial({ map: texture });
const mesh = new THREE.Mesh(cubeGeometry, material);
mesh.castShadow=true;
scene.add(mesh);

// sphere
const sphere = new THREE.SphereGeometry(10,500,500);
// const sphereTextures=[];
// sphereTextures.push(loader.load("textures/Crystal_004_basecolor.jpg"));
// sphereTextures.push(loader.load("textures/Crystal_004_normal.jpg"));
// sphereTextures.push(loader.load("textures/Crystal_004_roughness.jpg"));
// sphereTextures.push(loader.load("textures/Crystal_004_height.png"));
// sphereTextures.push(loader.load("textures/Crystal_004_ambientOcclusion.jpg"))

// const sphereMaterial = new THREE.MeshStandardMaterial({
//   map:sphereTextures[0],
//   normalMap:sphereTextures[1],
//   roughnessMap:sphereTextures[2],
//   displacementMap:sphereTextures[3],
//   displacementScale:4,
//   aoMap:sphereTextures[4],
//   metalness:0.3
// })
// const sphereMesh = new THREE.Mesh(sphere,sphereMaterial);
// scene.add(sphereMesh);
// sphereMesh.position.set(20,0,0);

// initially rotate randomly
mesh.rotateZ(2 * Math.PI * Math.random());
mesh.rotateY(2 * Math.PI * Math.random());
mesh.rotateX(2 * Math.PI * Math.random());

//light
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(0, 200, 0);
light.lookAt(0,0,0);

const secondLight = new THREE.DirectionalLight(0xffffff, 0.5);
secondLight.position.set(-200, 0, 0);
secondLight.lookAt(0,0,0);


const thirdLight = new THREE.DirectionalLight(0xffffff, 0.25);
secondLight.position.set(0, 0, 200);
thirdLight.lookAt(0,0,0);

const fouthLight = new THREE.DirectionalLight(0xffffff, 1)
fouthLight.position.set(0,0,-200);
fouthLight.lookAt(0,0,0);
scene.add(light, secondLight, thirdLight, fouthLight);

//Track ball Controls
let controls = new TrackballControls( camera, renderer.domElement );

controls.rotateSpeed = 1.0;
controls.zoomSpeed = 1.2;
controls.panSpeed = 0.8;

//animate and render
let frame = 0;
function animate() {
  requestAnimationFrame(animate);
  frame += 0.01;
  renderer.render(scene, camera);
  let num = Math.random();
  mesh.rotateZ(0.0009 * Math.sin(frame + num));
  mesh.rotateY(0.0009 * Math.cos(frame + num));
  mesh.rotateX(0.0009 * Math.sin(frame + num));

  mesh.position.z += 0.005 * Math.sin(frame + num);
  mesh.position.y += 0.005 * Math.cos(frame + num);
  mesh.position.x += 0.005 * Math.sin(frame + num);

  controls.update();
}
animate();

//responsive
window.onresize = () => {
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(app.offsetWidth, app.offsetHeight);
};
