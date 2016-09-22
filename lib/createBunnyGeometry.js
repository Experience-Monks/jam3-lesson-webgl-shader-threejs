// Simple 3D geometry
const data = require('three-buffer-vertex-data');
const unindex = require('unindex-mesh');

// grab a simplicial complex
const primitive = require('bunny');

module.exports = function (opt = {}) {
  // Set up our geometry
  const geometry = new THREE.BufferGeometry();

  // Sharing normals gives us a smooth look, splitting
  // them gives us a faceted look
  if (opt.flat) {
    data.attr(geometry, 'position', unindex(primitive));
  } else {
    data.index(geometry, primitive.cells);
    data.attr(geometry, 'position', primitive.positions);
  }

  // This is a ThreeJS utility to position the vertices
  // into world center [ 0, 0, 0 ]
  geometry.center();

  // Another utility to scale all the vertices
  geometry.scale(0.2, 0.2, 0.2);

  // Now compute a normal for each vertex
  // This will add a new attribute called 'normal'
  geometry.computeVertexNormals();

  return geometry;
};
