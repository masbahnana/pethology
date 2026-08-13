import * as THREE from 'three';
import { boneDictionary } from '../anatomy/BoneDictionary.js';
import {
    hoverStructure,
    clearHover,
    highlightStructure,
    clearSelection,
    getSelectedStructureKey
} from './HighlightManager.js';

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

/**
 * Maps mesh name substrings to their canonical structure keys.
 * "Lefr_radius" is a typo in the original GLB — intentional.
 */
const bonePatterns = [
    { pattern: "Dog_upper_skull",  key: "skull" },
    { pattern: "Dog_lower_jaw",    key: "mandible" },
    { pattern: "Scapula",          key: "scapula" },
    { pattern: "Left_humerus",     key: "humerus" },
    { pattern: "Lefr_radius",      key: "radius" },
    { pattern: "Left__ulna",       key: "ulna" },
    { pattern: "Hip_bone",         key: "pelvis" },
    { pattern: "Femur",            key: "femur" },
    { pattern: "Left_tibia",       key: "tibia" },
    { pattern: "Left_fibula",      key: "fibula" },
    { pattern: "C1_C1",            key: "atlas" },
    { pattern: "C7_T7",            key: "cervicothoracic-spine" },
    { pattern: "L1_L1",            key: "lumbar-vertebra" },
    { pattern: "R1_R13",           key: "ribcage" },
    { pattern: "R4_R4",            key: "rib-4" },
    { pattern: "R9_R1",            key: "rib-group-1" },
    { pattern: "R13_R9",           key: "rib-group-2" }
];

/**
 * Maps a raw GLB mesh name to a canonical structure key.
 *
 * @param {string} name - Raw mesh name from the GLB.
 * @returns {string | null} Structure key, or null if unmapped.
 */
export function normalizeBoneName(name) {
    const match = bonePatterns.find(({ pattern }) => name.includes(pattern));
    return match?.key ?? null;
}

/**
 * Initializes pointer event listeners on the canvas for hover and click selection.
 *
 * @param {THREE.PerspectiveCamera} camera
 * @param {() => THREE.Object3D | null} getDogModel
 * @param {(structure: object, key: string) => void} onBoneSelected
 * @param {() => void} onBoneDeselected
 * @param {HTMLElement} domElement
 */
export function initSelectionManager(camera, getDogModel, onBoneSelected, onBoneDeselected, domElement) {

    /**
     * Resolves the structure key under the pointer.
     * Prioritizes the currently selected structure to ensure reliable toggle/deselect.
     */
    function getStructureKeyAtPointer(event) {
        const dogModel = getDogModel();
        if (!dogModel) return null;

        const rect = domElement.getBoundingClientRect();
        mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

        raycaster.setFromCamera(mouse, camera);

        const validHits = raycaster
            .intersectObject(dogModel, true)
            .map((hit) => ({ ...hit, structureKey: normalizeBoneName(hit.object.name) }))
            .filter((hit) => !hit.object.name.startsWith("low_poly_doggy") && hit.structureKey !== null);

        const currentSelectedKey = getSelectedStructureKey();
        const selectedHit = validHits.find((hit) => hit.structureKey === currentSelectedKey);

        return selectedHit ? currentSelectedKey : (validHits[0]?.structureKey ?? null);
    }

    let pointerDownPosition = null;

    domElement.addEventListener("pointerdown", (event) => {
        pointerDownPosition = { x: event.clientX, y: event.clientY };
    });

    domElement.addEventListener("pointermove", (event) => {
        const dogModel = getDogModel();
        const key = getStructureKeyAtPointer(event);
        hoverStructure(dogModel, key, normalizeBoneName);
        domElement.style.cursor = key ? "pointer" : "grab";
    });

    domElement.addEventListener("pointerleave", () => {
        clearHover();
        domElement.style.cursor = "grab";
    });

    domElement.addEventListener("click", (event) => {
        if (pointerDownPosition) {
            const movement = Math.hypot(
                event.clientX - pointerDownPosition.x,
                event.clientY - pointerDownPosition.y
            );
            pointerDownPosition = null;
            if (movement > 5) return;
        }

        const dogModel = getDogModel();
        const key = getStructureKeyAtPointer(event);

        if (!key) {
            clearSelection();
            onBoneDeselected();
            return;
        }

        const structure = boneDictionary[key];
        if (!structure) {
            console.warn("Estrutura sem dados no dicionário:", key);
            return;
        }

        const isSelected = highlightStructure(dogModel, key, normalizeBoneName);
        isSelected ? onBoneSelected(structure, key) : onBoneDeselected();
    });
}
