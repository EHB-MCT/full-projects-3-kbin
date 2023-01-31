import * as THREE from '../node_modules/three/src/Three.js';
import {
  OrbitControls
} from 'https://cdn.jsdelivr.net/npm/three@0.122.0/examples/jsm/controls/OrbitControls.js';


let scene, camera, renderer, controls, earthMesh;
let poiMesh;


const init = () => {
  // Create a scene
  scene = new THREE.Scene();

  // Create a camera
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 4;

  // Create a renderer
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  // Create orbit controls
  controls = new OrbitControls(camera, renderer.domElement);

  // Create an Earth sphere
  const earthGeometry = new THREE.SphereGeometry(1, 32, 32);
  const earthMaterial = new THREE.MeshPhongMaterial({
    map: new THREE.TextureLoader().load('https://threejs.org/examples/textures/land_ocean_ice_cloud_2048.jpg'),
    bumpMap: new THREE.TextureLoader().load('https://threejs.org/examples/textures/waternormals.jpg'),
    bumpScale: 0,
  });
  earthMesh = new THREE.Mesh(earthGeometry, earthMaterial);
  scene.add(earthMesh);

  //creat poi
  const poiGeometry = new THREE.SphereGeometry(0.02, 32, 32);
  const poiMaterial = new THREE.MeshBasicMaterial({
    color: 0xff0000
  });
  const poiMesh = new THREE.Mesh(poiGeometry, poiMaterial);
  poiMesh.position.set(-0.1, 0.3, 0.99);
  scene.add(poiMesh);

  /*
  // Create cube and add to scene
  const geometry = new THREE.BoxGeometry(5, 1, 1);
  const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);
  */

  // Add mouse click event to check if click is on cube
let popupDisplayed = false;
let popup;

document.addEventListener("click", function (event) {
  const rect = renderer.domElement.getBoundingClientRect();
  const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
  const y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
  const vector = new THREE.Vector3(x, y, 0.5);
  vector.unproject(camera);
  const raycaster = new THREE.Raycaster(camera.position, vector.sub(camera.position).normalize());
  const intersects = raycaster.intersectObjects([poiMesh]);

  if (intersects.length > 0 && !popupDisplayed) {
    popupDisplayed = true;
    popup = document.createElement("div");
    popup.style.position = "absolute";
    popup.style.backgroundColor = "white";
    popup.style.padding = "10px";
    popup.innerHTML = "You clicked on the POI!";
    document.body.appendChild(popup);

    // update the position of the popup
    const poiWorldPos = new THREE.Vector3();
    poiWorldPos.setFromMatrixPosition(poiMesh.matrixWorld);
    const pos = poiWorldPos.project(camera);
    popup.style.left = (pos.x * rect.width / 2 + rect.width / 2) + "px";
    popup.style.top = (-pos.y * rect.height / 2 + rect.height / 2) + "px";
    
    // Attach the popup to the POI
    popup.object3D = new THREE.Object3D();
    popup.object3D.position.copy(poiMesh.position);
    poiMesh.add(popup.object3D);
  } else if (popupDisplayed) {
    popupDisplayed = false;
    document.body.removeChild(popup);
    // Detach the popup from the POI
    poiMesh.remove(popup.object3D);
  }
});




  // Create a light
  const light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(1, 1, 1);
  scene.add(light);

  // Create a starfield
  const starPositions = new Float32Array(10000 * 3);
  for (let i = 0; i < 10000; i++) {
    starPositions[i * 3] = THREE.MathUtils.randFloatSpread(2000);
    starPositions[i * 3 + 1] = THREE.MathUtils.randFloatSpread(2000);
    starPositions[i * 3 + 2] = THREE.MathUtils.randFloatSpread(2000);
  }
  const starGeometry = new THREE.BufferGeometry();
  starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
  const starMaterial = new THREE.PointsMaterial({
    color: 0xffffff
  });
  const starField = new THREE.Points(starGeometry, starMaterial);
  scene.add(starField);

  // Render the scene
  renderer.render(scene, camera);
};



const animate = () => {
  requestAnimationFrame(animate);

  earthMesh.rotation.y += 0.0;

  renderer.render(scene, camera);
};

init();
animate();