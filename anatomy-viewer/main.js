import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

import { createScene } from './core/Scene.js';
import { createCamera } from './core/Camera.js';
import { loadDogModel } from './models/DogModel.js';


// ======================
// RAYCASTER
// ======================

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();


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

let dogModel = null;

loadDogModel(scene, camera, controls, (model) => {
    dogModel = model;
});


// ======================
// INTERAÇÃO
// ======================

window.addEventListener("click", onMouseClick);

function onMouseClick(event) {

    if (!dogModel) return;

    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);

    const intersects = raycaster.intersectObjects(
        dogModel.children,
        true
    );

    if (intersects.length > 0) {

        intersects.forEach((hit, index) => {

            console.log(
                index,
                hit.object.name,
                hit.distance
            );

        });

    }

}


// ======================
// LOOP
// ======================

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

animate();
