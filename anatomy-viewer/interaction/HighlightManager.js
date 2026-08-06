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

function getStructureMeshes(model, structureKey, normalizeName) {
    const meshes = [];
    model.traverse((object) => {
        if (!object.isMesh) return;
        if (normalizeName(object.name) === structureKey) {
            meshes.push(object);
        }
    });
    return meshes;
}

function restoreMeshes(meshes) {
    meshes.forEach((mesh) => {
        if (mesh.userData.originalMaterial) {
            mesh.material = mesh.userData.originalMaterial;
        }
    });
}

export function clearHover() {
    restoreMeshes(hoveredMeshes);
    hoveredMeshes = [];
    hoveredStructureKey = null;
}

export function hoverStructure(model, structureKey, normalizeName) {
    if (hoveredStructureKey === structureKey) return;

    clearHover();

    if (!structureKey || structureKey === selectedStructureKey) return;

    hoveredMeshes = getStructureMeshes(model, structureKey, normalizeName);
    hoveredMeshes.forEach((mesh) => {
        mesh.material = hoverMaterial;
    });

    hoveredStructureKey = structureKey;
}

export function clearSelection() {
    clearHover();
    restoreMeshes(selectedMeshes);
    selectedMeshes = [];
    selectedStructureKey = null;
}

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
    selectedMeshes.forEach((mesh) => {
        mesh.material = selectedMaterial;
    });

    selectedStructureKey = structureKey;
    return true;
}

export function getSelectedStructureKey() {
    return selectedStructureKey;
}
