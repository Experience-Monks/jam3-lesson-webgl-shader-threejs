/*
  This is a generic "ThreeJS Application"
  helper which sets up a renderer and camera
  controls.
 */

const createControls = require('orbit-controls');
const assign = require('object-assign');

module.exports = createApp;
function createApp (opt = {}) {
  // Scale for retina
  const dpr = window.devicePixelRatio;

  // Our WebGL renderer with alpha and device-scaled
  const renderer = new THREE.WebGLRenderer(assign({
    antialias: true // default enabled
  }, opt));
  renderer.setPixelRatio(dpr);

  // Add the <canvas> to DOM body
  const canvas = renderer.domElement;
  document.body.appendChild(canvas);

  // perspective camera
  const near = 0.01;
  const far = 1000;
  const fieldOfView = 65;
  const camera = new THREE.PerspectiveCamera(fieldOfView, 1, near, far);
  const target = new THREE.Vector3();

  // 3D scene
  const scene = new THREE.Scene();

  // slick 3D orbit controller with damping
  const controls = createControls(assign({
    canvas,
    distanceBounds: [ 1, 10 ],
    distance: 2.5,
    phi: 70 * Math.PI / 180
  }, opt));

  // Update renderer size
  window.addEventListener('resize', resize);

  // Setup initial size & aspect ratio
  resize();

  return {
    updateControls,
    camera,
    scene,
    renderer,
    controls,
    canvas
  };

  function updateControls () {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const aspect = width / height;

    // update camera controls
    controls.update();
    camera.position.fromArray(controls.position);
    camera.up.fromArray(controls.up);
    target.fromArray(controls.direction).add(camera.position);
    camera.lookAt(target);

    // Update camera matrices
    camera.aspect = aspect;
    camera.updateProjectionMatrix();
  }

  function resize () {
    renderer.setSize(window.innerWidth, window.innerHeight);
    updateControls();
  }
}
