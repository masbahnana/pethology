import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

import { createScene } from './core/Scene.js';
import { createCamera } from './core/Camera.js';
import { loadDogModel } from './models/DogModel.js';


// ======================
// SETUP
// ======================

const scene = createScene();
const camera = createCamera();


// ======================
// RENDER
// ======================

const renderer = new THREE.WebGLRenderer({ antialias: true });

renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);


// ======================
// CONTROLES
// ======================

const controls = new OrbitControls(camera, renderer.domElement);

controls.enableDamping = true;


// ======================
// MODELO
// ======================

loadDogModel(scene, camera, controls);


// ======================
// LOOP
// ======================

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

animate();
