import { gsap } from 'gsap';
import { CAMERA_CONFIG } from './CameraConfig.js';

/**
 * Creates an animated camera controller with focus and reset capabilities.
 *
 * @param {THREE.PerspectiveCamera} camera
 * @param {OrbitControls} controls
 * @returns {{ focus: Function, reset: Function, saveHome: Function }}
 */
export function createCameraController(camera, controls) {
    const { duration, ease } = CAMERA_CONFIG.animation;

    let homePosition = null;
    let homeTarget = null;
    let activeTween = null;

    /**
     * Animates the camera to a position and target.
     *
     * @param {THREE.Vector3} position
     * @param {THREE.Vector3} target
     */
    function animateTo(position, target) {
        activeTween?.kill();

        const timeline = gsap.timeline({ defaults: { duration, ease } });

        timeline.to(camera.position, {
            x: position.x, y: position.y, z: position.z,
            onUpdate: () => controls.update()
        }, 0);

        timeline.to(controls.target, {
            x: target.x, y: target.y, z: target.z,
            onUpdate: () => controls.update()
        }, 0);

        activeTween = timeline;
    }

    /** Moves the camera smoothly to focus on a structure. */
    function focus(position, target) {
        animateTo(position, target);
    }

    /** Saves the current camera state as the home position for reset. */
    function saveHome() {
        homePosition = camera.position.clone();
        homeTarget = controls.target.clone();
    }

    /** Animates the camera back to the saved home position. */
    function reset() {
        if (!homePosition) return;
        animateTo(homePosition, homeTarget);
    }

    return { focus, reset, saveHome };
}
