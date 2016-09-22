attribute vec4 position;
attribute vec3 normal;

uniform mat4 projectionMatrix;
uniform mat4 modelViewMatrix;

varying vec3 vNormal;

void main () {
  vNormal = normal;
  gl_Position = projectionMatrix * modelViewMatrix * position;
}