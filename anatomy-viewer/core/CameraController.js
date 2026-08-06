import { gsap } from 'gsap';

export function createCameraController(camera, controls) {
    let homePosition = null;
    let homeTarget = null;

    let activeTween = null;

    function animateTo(position, target, duration = 1.4) {
        activeTween?.kill();

        const timeline = gsap.timeline({
            defaults: { duration, ease: 'power2.inOut' }
        });

        timeline.to(camera.position, {
            x: position.x,
            y: position.y,
            z: position.z,
            onUpdate: () => controls.update()
        }, 0);

        timeline.to(controls.target, {
            x: target.x,
            y: target.y,
            z: target.z,
            onUpdate: () => controls.update()
        }, 0);

        activeTween = timeline;
    }

    function focus(position, target) {
        animateTo(position, target);
    }

    function saveHome() {
        homePosition = camera.position.clone();
        homeTarget = controls.target.clone();
    }

    function reset() {
        if (!homePosition) return;
        animateTo(homePosition, homeTarget);
    }

    return { focus, reset, saveHome };
}
