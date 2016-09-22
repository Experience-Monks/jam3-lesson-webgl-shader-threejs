attribute vec4 position;

uniform mat4 projectionMatrix;
uniform mat4 modelViewMatrix;

varying float distFromCenter;

void main () {
  distFromCenter = length(position.xyz);

  // Can also be written as:
  // distFromCenter = distance(position.xyz, vec3(0.0));

  gl_Position = projectionMatrix * modelViewMatrix * position;
}