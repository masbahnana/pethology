import * as THREE from 'three';
import { CAMERA_CONFIG } from './CameraConfig.js';

const box = new THREE.Box3();

/**
 * Calculates the ideal camera position and target to frame a set of meshes.
 *
 * @param {THREE.Mesh[]} meshes - Meshes belonging to the selected structure.
 * @param {object} [cameraView={}] - Per-structure camera hint from BoneDictionary.
 * @param {number[]} [cameraView.direction] - Normalized [x, y, z] direction vector.
 * @param {number} [cameraView.distanceMultiplier] - Multiplier over the largest dimension.
 * @returns {{ position: THREE.Vector3, target: THREE.Vector3 } | null}
 */
export function calculateFocusView(meshes, cameraView = {}) {
    if (!meshes || meshes.length === 0) return null;

    box.makeEmpty();
    meshes.forEach((mesh) => box.expandByObject(mesh));

    if (box.isEmpty()) return null;

    const center = new THREE.Vector3();
    const size = new THREE.Vector3();
    box.getCenter(center);
    box.getSize(size);

    const directionValues = cameraView.direction ?? [0, 0, 1];
    const direction = new THREE.Vector3(...directionValues).normalize();

    const { defaultDistanceMultiplier, minDistance } = CAMERA_CONFIG.focus;
    const multiplier = cameraView.distanceMultiplier ?? defaultDistanceMultiplier;
    const distance = Math.max(Math.max(size.x, size.y, size.z) * multiplier, minDistance);

    const position = center.clone().add(direction.multiplyScalar(distance));

    return { position, target: center.clone() };
}
