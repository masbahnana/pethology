import * as THREE from 'three';

export function createScene() {
    const scene = new THREE.Scene();
    scene.background = null;

    const light = new THREE.DirectionalLight(0xffffff, 3);
    light.position.set(5, 5, 5);
    scene.add(light);

    const ambient = new THREE.AmbientLight(0xffffff, 1);
    scene.add(ambient);

    return scene;
}
