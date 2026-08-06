import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

import { createScene } from './core/Scene.js';
import { createCamera } from './core/Camera.js';
import { loadDogModel } from './models/DogModel.js';
import { initSelectionManager } from './interaction/SelectionManager.js';
import { showStructureInfo } from './ui/InfoPanel.js';


// ======================
// SETUP
// ======================

const scene = createScene();
const camera = createCamera();

const canvas = document.querySelector("#anatomy-canvas");
const viewerArea = document.querySelector(".viewer-area");


// ======================
// RENDER
// ======================

const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true
});

function resizeRenderer() {
    const width = viewerArea.clientWidth;
    const height = viewerArea.clientHeight;
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
}

window.addEventListener("resize", resizeRenderer);
resizeRenderer();


// ======================
// CONTROLES
// ======================

const controls = new OrbitControls(camera, canvas);

controls.enableDamping = true;


// ======================
// MODELO
// ======================

let dogModel = null;

loadDogModel(scene, camera, controls, (model) => {
    dogModel = model;
});


// ======================
// INTERAÇÃO
// ======================

initSelectionManager(
    camera,
    () => dogModel,
    (bone) => showStructureInfo(bone),
    canvas
);


// ======================
// LOOP
// ======================

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

animate();
