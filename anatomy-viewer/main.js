import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

import { createScene } from './camera/Scene.js';
import { createCamera } from './camera/Camera.js';
import { calculateFocusView } from './camera/CameraFocus.js';
import { createCameraController } from './camera/CameraController.js';
import { loadDogModel } from './models/DogModel.js';
import { initSelectionManager, normalizeBoneName } from './interaction/SelectionManager.js';
import { hoverStructure, clearHover, highlightStructure, getSelectedMeshes } from './interaction/HighlightManager.js';
import {
    renderStructureList,
    showStructureInfo,
    clearStructureInfo,
    setActiveStructureItem,
    clearActiveStructureItem
} from './ui/InfoPanel.js';
import { boneDictionary } from './anatomy/BoneDictionary.js';


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
// CÂMERA CONTROLLER
// ======================

const cameraController = createCameraController(camera, controls);


// ======================
// MODELO
// ======================

let dogModel = null;

loadDogModel(scene, camera, controls, (model) => {
    dogModel = model;
    cameraController.saveHome();
});


// ======================
// HELPERS
// ======================

function selectStructure(key, structure) {
    showStructureInfo(structure);
    setActiveStructureItem(key);

    const focus = calculateFocusView(getSelectedMeshes(), structure.cameraView);
    if (focus) cameraController.focus(focus.position, focus.target);
}

function deselectStructure() {
    clearStructureInfo();
    clearActiveStructureItem();
    cameraController.reset();
}


// ======================
// LISTA DE ESTRUTURAS
// ======================

renderStructureList(boneDictionary, {

    onHover: (key) => {
        hoverStructure(dogModel, key, normalizeBoneName);
    },

    onLeave: () => {
        clearHover();
    },

    onSelect: (key, structure) => {
        const isSelected = highlightStructure(dogModel, key, normalizeBoneName);
        isSelected ? selectStructure(key, structure) : deselectStructure();
    }

});


// ======================
// INTERAÇÃO (canvas)
// ======================

initSelectionManager(
    camera,
    () => dogModel,
    (structure, key) => selectStructure(key, structure),
    () => deselectStructure(),
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
