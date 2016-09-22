attribute vec4 position;
attribute vec3 normal;

uniform mat4 projectionMatrix;
uniform mat4 modelViewMatrix;

uniform float time;

varying vec3 vNormal;

void main () {
  vNormal = normal;

  vec4 offset = position;

  // Animate between 0 and 1
  // sin(x) returns a value in [-1...1] range
  float dist = sin(time) * 0.5 + 0.5;

  // CHEAT SHEET
  // -------------------
  // [0..1]  to [-1..1]    a = (b * 2.0 - 1.0)
  // [-1..1] to [0..1]     a = (b * 0.5 + 0.5)

  offset.xyz += normal * dist;
  gl_Position = projectionMatrix * modelViewMatrix * offset;
}