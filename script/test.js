import * as THREE from '../node_modules/three/src/Three.js';
import {
  OrbitControls
} from 'https://cdn.jsdelivr.net/npm/three@0.122.0/examples/jsm/controls/OrbitControls.js';


let scene, camera, renderer, controls, earthMesh, earthMesh2, target;

const init = () => {
  // Create a scene
  scene = new THREE.Scene();
  // Used for camera targeting during animation
  target = new THREE.Vector3();
  // Create a camera
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 1702;
  // Create a renderer
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  // Create orbit controls
  controls = new OrbitControls(camera, renderer.domElement);

  // Create an Earth sphere 1
  const earthGeometry = new THREE.SphereGeometry(1, 32, 32);
  const earthMaterial = new THREE.MeshPhongMaterial({
    map: new THREE.TextureLoader().load('/dist/photos/wereldbol1.png'),
    bumpMap: new THREE.TextureLoader().load('https://threejs.org/examples/textures/waternormals.jpg'),
    bumpScale: 0,
  });
  earthMesh = new THREE.Mesh(earthGeometry, earthMaterial);

 // Create an Earth sphere 2
  
  const earthMaterial2 = new THREE.MeshPhongMaterial({
    map: new THREE.TextureLoader().load('/dist/photos/wereldbol2-modified.png'),
    bumpMap: new THREE.TextureLoader().load('https://threejs.org/examples/textures/waternormals.jpg'),
    bumpScale: 0,
  });
  earthMesh2 = new THREE.Mesh(earthGeometry, earthMaterial2);
  scene.add(earthMesh, earthMesh2);

  earthMesh.visible = false;
  earthMesh2.visible = false;

  fetch('https://full-project-api.onrender.com/topstukken')
    .then(response => {
      return response.json();
    })
    .then((data) => {
      console.log(data)

      let filteredData = data.filter(item => item.tid === "1" || item.tid === "2" || item.tid === "3" || item.tid === "4" || item.tid === "5" || item.tid === "6"|| item.tid === "7" || item.tid === "8");
      console.log(filteredData);

      filteredData.forEach(e => {

        let id = e.tid;
        console.log(id);

        let x = e.x;
        let y = e.y;
        let z = e.z;
        console.log(x, y, z)
        let poifoto = e.poifoto;


        // Create poi(button)
        const poiGeometry = new THREE.SphereGeometry(0.1, 32, 32);
        const poiMaterial = new THREE.MeshBasicMaterial({
          map: new THREE.TextureLoader().load(poifoto),
        });
        //const poiGeometry = new THREE.SphereGeometry(0.05, 32, 32);
        //const poiMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
        const poiMesh = new THREE.Mesh(poiGeometry, poiMaterial);
        poiMesh.position.set(x, y, z);
        scene.add(poiMesh);

        // make the poi(button) a child of earthMesh
        // so it follows it's position on the earth 
        earthMesh.add(poiMesh);
        // Render the scene
        renderer.render(scene, camera);


        // Add mouse click event to check if click is on cube
        document.addEventListener("click", function (event) {

          // Convert click coordinates to Three.js coordinates
          const rect = renderer.domElement.getBoundingClientRect();
          const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
          const y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
          const vector = new THREE.Vector3(x, y, 0.5);
          vector.unproject(camera);
          const raycaster = new THREE.Raycaster(camera.position, vector.sub(camera.position).normalize());
          const intersects = raycaster.intersectObjects([poiMesh]);

          // If click was on cube, display pop-up
          if (intersects.length > 0) {
            window.location.href = `info.html?id=${id}`;
            // Get screen resolution of both monitors
            const screen1 = window.screen.width;
            const screen2 = window.screen.width;

            // Open two windows and set their size and position
            //const window1 = window.open(`info.html?id=${id}`, "Window 1", `width=${screen1}, height=${screen1}`);
            //window1.moveTo(screen1, 0);

            const window2 = window.open(`hologram.html?id=${id}`, "Window 2", `width=${screen2}, height=${screen2}`);
            window2.moveTo(screen1 * 2, 0);

          }

        });
      })
    });

  fetch('https://full-project-api.onrender.com/topstukken')
    .then(response => {
      return response.json();
    })
    .then((data) => {
      console.log(data)

      let filteredData = data.filter(item => item.tid === "9" || item.tid === "10" || item.tid === "11");
      console.log(filteredData);

      filteredData.forEach(e => {

        let id = e.tid;
        console.log(id);

        let x = e.x;
        let y = e.y;
        let z = e.z;
        console.log(x, y, z)
        let poifoto = e.poifoto;


        // Create poi(button)
        const poiGeometry = new THREE.SphereGeometry(0.1, 32, 32);
        const poiMaterial = new THREE.MeshBasicMaterial({
          map: new THREE.TextureLoader().load(poifoto),
        });
        //const poiGeometry = new THREE.SphereGeometry(0.05, 32, 32);
        //const poiMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
        const poiMesh = new THREE.Mesh(poiGeometry, poiMaterial);
        poiMesh.position.set(x, y, z);
        scene.add(poiMesh);

        // make the poi(button) a child of earthMesh
        // so it follows it's position on the earth 
        earthMesh2.add(poiMesh);
        // Render the scene
        renderer.render(scene, camera);


        // Add mouse click event to check if click is on cube
        document.addEventListener("click", function (event) {

          // Convert click coordinates to Three.js coordinates
          const rect = renderer.domElement.getBoundingClientRect();
          const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
          const y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
          const vector = new THREE.Vector3(x, y, 0.5);
          vector.unproject(camera);
          const raycaster = new THREE.Raycaster(camera.position, vector.sub(camera.position).normalize());
          const intersects = raycaster.intersectObjects([poiMesh]);

          // If click was on cube, display pop-up
          if (intersects.length > 0) {
            window.location.href = `info.html?id=${id}`;
            // Get screen resolution of both monitors
            const screen1 = window.screen.width;
            const screen2 = window.screen.width;

            // Open two windows and set their size and position
            //const window1 = window.open(`info.html?id=${id}`, "Window 1", `width=${screen1}, height=${screen1}`);
            //window1.moveTo(screen1, 0);

            const window2 = window.open(`hologram.html?id=${id}`, "Window 2", `width=${screen2}, height=${screen2}`);
            window2.moveTo(screen1 * 2, 0);

          }

        });
      })
    });


  // Create a light
  const light = new THREE.AmbientLight(0x404040, 3.5); // white light, for all objects evenly
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


function cameraAnimate() {

  requestAnimationFrame(cameraAnimate);
  let wereldbol1 = document.querySelector('.wereldbol1');
  let wereldbol2 = document.querySelector('.wereldbol2');

  wereldbol2.onclick = function() {
    wereldbol1.style.opacity = '50%'
    wereldbol2.style.opacity = '100%'
    
   wereldbol2.classList.add('wereldbol-active');
   wereldbol1.classList.remove('wereldbol-active');
   camera.position.z = 1802;
  }

  wereldbol1.onclick = function() {
    wereldbol2.style.opacity = '50%'
    wereldbol1.style.opacity = '100%'

    wereldbol1.classList.add('wereldbol-active');
    wereldbol2.classList.remove('wereldbol-active');
    camera.position.z = 1802;
  }

  // WERELDBOL 1 ACTIEF
  if (wereldbol1.classList.contains('wereldbol-active')) {
    if (camera.position.z > 2) {
    camera.position.z -= 5;
    camera.lookAt(target);
    }
    earthMesh.visible = true;
    earthMesh2.visible = false;
    let titel1 = document.querySelector('.years h1');
    titel1.textContent = "2.3 miljoen jaar geleden - heden";
  }
  // WERELDBOL 2 ACTIEF
  if (wereldbol2.classList.contains('wereldbol-active')) {
    if (camera.position.z > 2) {
    camera.position.z -= 5;
    camera.lookAt(target);
    
    }
    earthMesh2.visible = true;
    earthMesh.visible = false;
    let titel1 = document.querySelector('.years h1');
    titel1.innerHTML = `60 miljoen jaar geleden`;

    // let count = 1;
    // setInterval(() => {
    //   document.querySelector(".years h1").textContent = `${count} miljoen jaar geleden`;
    //   count++ *2;
    //   if (count > 60) {
    //     clearInterval(setInterval);
    //   }
    //   }, 100);
  }
} 

const animate = () => {
  requestAnimationFrame(animate);

  earthMesh.rotation.y += 0.0001;
  earthMesh2.rotation.y += 0.0001;

  renderer.render(scene, camera);
};

init();
cameraAnimate();
animate();