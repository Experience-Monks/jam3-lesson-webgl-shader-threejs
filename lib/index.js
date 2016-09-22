global.THREE = require('three');
const path = require('path');
const fs = require('fs');
const createApp = require('./createApp');
const createBunnyGeometry = require('./createBunnyGeometry');
const createLoop = require('raf-loop');

// Create our basic ThreeJS application
const {
  renderer,
  camera,
  scene,
  updateControls
} = createApp();

// Get a nicely prepared geometry
const geometry = createBunnyGeometry({ flat: true });

// Create our vertex/fragment shaders
const material = new THREE.RawShaderMaterial({
  vertexShader: fs.readFileSync(path.join(__dirname, 'shader.vert'), 'utf8'),
  fragmentShader: fs.readFileSync(path.join(__dirname, 'shader.frag'), 'utf8'),
  uniforms: {
    time: { type: 'f', value: 0 }
  }
});

// Setup our mesh
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// Time since beginning
let time = 0;

// Start our render loop
createLoop((dt) => {
  // update time
  time += dt / 1000;
  material.uniforms.time.value = time;

  // render
  updateControls();
  renderer.render(scene, camera);
}).start();
