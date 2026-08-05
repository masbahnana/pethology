import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

export function loadDogModel(scene, camera, controls) {
    const loader = new GLTFLoader();

    loader.load(
        '/models/dog/3d_dog_bone_project_partial_dog_skeleton.glb',

        (gltf) => {
            const dog = gltf.scene;

            dog.scale.set(0.01, 0.01, 0.01);

            scene.add(dog);

            const box = new THREE.Box3().setFromObject(dog);
            const center = box.getCenter(new THREE.Vector3());
            const size = box.getSize(new THREE.Vector3());

            dog.position.sub(center);

            const maxDim = Math.max(size.x, size.y, size.z);
            camera.position.set(0, maxDim * 0.5, maxDim * 2);
            controls.target.set(0, 0, 0);
            controls.update();

            window.dog = dog;

            console.log('🐕 Modelo carregado');
            dog.traverse((part) => {
                if (part.isMesh) console.log('🦴', part.name);
            });
        },

        undefined,

        (error) => {
            console.error('❌ Erro ao carregar modelo:', error);
        }
    );
}
