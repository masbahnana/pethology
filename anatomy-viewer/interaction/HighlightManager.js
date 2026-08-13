import * as THREE from "three";

const selectedMaterial = new THREE.MeshStandardMaterial({
    color: 0x3182ce,
    emissive: 0x123c66,
    emissiveIntensity: 0.8,
    roughness: 0.45,
    metalness: 0.05
});

const hoverMaterial = new THREE.MeshStandardMaterial({
    color: 0x90cdf4,
    emissive: 0x1a5f89,
    emissiveIntensity: 0.35,
    roughness: 0.5,
    metalness: 0.02
});

let selectedStructureKey = null;
let selectedMeshes = [];

let hoveredStructureKey = null;
let hoveredMeshes = [];

/**
 * Returns all meshes in the model that belong to a given structure key.
 *
 * @param {THREE.Object3D} model
 * @param {string} structureKey
 * @param {(name: string) => string | null} normalizeName
 * @returns {THREE.Mesh[]}
 */
function getStructureMeshes(model, structureKey, normalizeName) {
    const meshes = [];
    model.traverse((object) => {
        if (!object.isMesh) return;
        if (normalizeName(object.name) === structureKey) meshes.push(object);
    });
    return meshes;
}

/** Restores meshes to their original material saved at load time. */
function restoreMeshes(meshes) {
    meshes.forEach((mesh) => {
        if (mesh.userData.originalMaterial) mesh.material = mesh.userData.originalMaterial;
    });
}

/** Clears hover highlight and restores original materials. */
export function clearHover() {
    restoreMeshes(hoveredMeshes);
    hoveredMeshes = [];
    hoveredStructureKey = null;
}

/**
 * Applies hover highlight to all meshes of a structure.
 * Skips if the structure is already selected.
 *
 * @param {THREE.Object3D} model
 * @param {string | null} structureKey
 * @param {(name: string) => string | null} normalizeName
 */
export function hoverStructure(model, structureKey, normalizeName) {
    if (hoveredStructureKey === structureKey) return;

    clearHover();

    if (!structureKey || structureKey === selectedStructureKey) return;

    hoveredMeshes = getStructureMeshes(model, structureKey, normalizeName);
    hoveredMeshes.forEach((mesh) => { mesh.material = hoverMaterial; });

    hoveredStructureKey = structureKey;
}

/** Clears selection highlight and restores original materials. */
export function clearSelection() {
    clearHover();
    restoreMeshes(selectedMeshes);
    selectedMeshes = [];
    selectedStructureKey = null;
}

/**
 * Toggles selection highlight on a structure.
 * Clicking the same structure again deselects it.
 *
 * @param {THREE.Object3D} model
 * @param {string} structureKey
 * @param {(name: string) => string | null} normalizeName
 * @returns {boolean} true if selected, false if deselected
 */
export function highlightStructure(model, structureKey, normalizeName) {
    clearHover();

    if (selectedStructureKey === structureKey) {
        restoreMeshes(selectedMeshes);
        selectedMeshes = [];
        selectedStructureKey = null;
        return false;
    }

    restoreMeshes(selectedMeshes);

    selectedMeshes = getStructureMeshes(model, structureKey, normalizeName);
    selectedMeshes.forEach((mesh) => { mesh.material = selectedMaterial; });

    selectedStructureKey = structureKey;
    return true;
}

/** @returns {string | null} The currently selected structure key. */
export function getSelectedStructureKey() {
    return selectedStructureKey;
}

/** @returns {THREE.Mesh[]} The meshes of the currently selected structure. */
export function getSelectedMeshes() {
    return selectedMeshes;
}
