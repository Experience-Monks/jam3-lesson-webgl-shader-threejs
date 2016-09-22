precision highp float;

varying float distFromCenter;
void main () {
  gl_FragColor = vec4(vec3(distFromCenter), 1.0);
}