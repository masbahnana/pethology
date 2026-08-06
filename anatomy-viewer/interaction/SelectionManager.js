import * as THREE from 'three';
import { boneDictionary } from '../anatomy/BoneDictionary.js';

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

function isSelectable(object) {
    const ignored = ["low_poly_doggy", "Lamp", "Root"];
    return !ignored.some(name => object.name.startsWith(name));
}

function normalizeBoneName(name) {
    if (name.includes("Dog_upper_skull")) return "Dog_upper_skull";
    if (name.includes("Dog_lower_jaw"))  return "Dog_lower_jaw";
    if (name.includes("Femur"))          return "Femur";
    if (name.includes("Tibia"))          return "Tibia";
    if (name.includes("Fibula"))         return "Fibula";
    if (name.includes("Radius"))         return "Radius";
    if (name.includes("Humerus"))        return "Humerus";
    return name;
}

export function initSelectionManager(camera, getDogModel, onBoneSelected, domElement) {

    domElement.addEventListener("click", (event) => {

        const dogModel = getDogModel();
        if (!dogModel) return;

        const rect = domElement.getBoundingClientRect();

        mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

        raycaster.setFromCamera(mouse, camera);

        const intersects = raycaster.intersectObject(dogModel, true);

        const selected = intersects.find(hit => isSelectable(hit.object));

        if (!selected) return;

        const key = normalizeBoneName(selected.object.name);
        const bone = boneDictionary[key];

        if (bone) {
            onBoneSelected(bone);
        }

    });

}
