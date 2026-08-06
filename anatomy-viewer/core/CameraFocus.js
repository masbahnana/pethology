import * as THREE from 'three';

const box = new THREE.Box3();

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

    const largestDimension = Math.max(size.x, size.y, size.z);
    const multiplier = cameraView.distanceMultiplier ?? 2.5;
    const distance = Math.max(largestDimension * multiplier, 0.8);

    const position = center.clone().add(direction.multiplyScalar(distance));

    return { position, target: center.clone() };
}
