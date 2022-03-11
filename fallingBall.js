import * as THREE from "three";
import { TrackballControls } from "three/examples/jsm/controls/TrackballControls";
const scene = new THREE.Scene();
scene.background = new THREE.Color("rgb(20, 20, 20)");
//camera
const camera = new THREE.PerspectiveCamera(
  50,
  innerWidth / innerHeight,
  0.1,
  1000
);
camera.position.set(0,15,70);

//renderer
const app = document.querySelector("#app");
const renderer = new THREE.WebGLRenderer();
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(app.offsetWidth, app.offsetHeight);
app.appendChild(renderer.domElement);

//light
const light = new THREE.DirectionalLight(0xffffff,1);
light.position.set(0,20,20);
light.lookAt(0,0,0);
scene.add(light);

const loader = new THREE.TextureLoader();
// sphere
let initial_position = 30;
const sphere = new THREE.SphereGeometry(2);
const sphereTexture = loader.load("./textures/wood2.jpg");
const sphereMaterial = new THREE.MeshStandardMaterial({map:sphereTexture});
const sphereMesh = new THREE.Mesh(sphere,sphereMaterial);
sphereMesh.position.set(0, initial_position, 0);
sphere.name = 'sphere';
scene.add(sphereMesh);

// floor
const floor= new THREE.BoxGeometry(50,0.5,50);
const floorMaterial = new THREE.MeshStandardMaterial({color:0x206de8,roughness:0,metalness:0.1})
const floorMesh= new THREE.Mesh(floor,floorMaterial);
floorMesh.position.set(0,-4,0);
scene.add(floorMesh)


//controls
let controls = new TrackballControls( camera, renderer.domElement );
controls.rotateSpeed = 1.0;
controls.zoomSpeed = 1.2;
controls.panSpeed = 0.8;

let g=9.8;
let time_counter = Math.sqrt(initial_position*2/g);
let initial_speed = g*time_counter;
let time_step=0.02;
let e=0.6;
// animate and render
function animate(){
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    controls.update();

    if (sphereMesh.position.y <= floorMesh.position.y+sphere.parameters.radius) {
        time_counter = 0;
        initial_speed*=e;
      }

      if(initial_speed>1){
          sphereMesh.position.y = initial_speed * time_counter - 0.5*g*Math.pow(time_counter,2);
      }else{
        sphereMesh.translateX(0.2);
      }
      // advance time
      time_counter += time_step;
}
animate();

//responsive
window.onresize = () => {
    camera.aspect = innerWidth / innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(app.offsetWidth, app.offsetHeight);
  };