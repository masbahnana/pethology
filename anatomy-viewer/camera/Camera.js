import * as THREE from 'three';
import { CAMERA_CONFIG } from './CameraConfig.js';

export function createCamera() {
    const { fov, near, far, initialPosition } = CAMERA_CONFIG;

    const camera = new THREE.PerspectiveCamera(fov, window.innerWidth / window.innerHeight, near, far);
    camera.position.set(...initialPosition);

    return camera;
}
