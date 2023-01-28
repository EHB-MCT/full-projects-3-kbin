import * as THREE from '../node_modules/three/src/Three.js';
import {OrbitControls} from 'https://cdn.jsdelivr.net/npm/three@0.122.0/examples/jsm/controls/OrbitControls.js';


let scene, camera, renderer, controls, earthMesh;

const init = () => {
  // Create a scene
  scene = new THREE.Scene();

  // Create a camera
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 5;

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
    bumpScale: 0.05,
  });
  earthMesh = new THREE.Mesh(earthGeometry, earthMaterial);
  scene.add(earthMesh);

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
  const starMaterial = new THREE.PointsMaterial({ color: 0xffffff });
  const starField = new THREE.Points(starGeometry, starMaterial);
  scene.add(starField);

  // Render the scene
  renderer.render(scene, camera);
};



const animate = () => {
  requestAnimationFrame(animate);

  earthMesh.rotation.y += 0.001;

  renderer.render(scene, camera);
};

init();
animate();
