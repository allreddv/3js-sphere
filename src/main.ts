import * as THREE from "three";
import "./style.css";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import gsap from "gsap";

// Scene
const scene = new THREE.Scene();

// Create Sphere
const geometry = new THREE.SphereGeometry(3, 64, 64);
const material = new THREE.MeshStandardMaterial({
  color: "#00ff83",
  roughness: 0.5,
});
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

//Light
const light = new THREE.PointLight(0xffffff, 10, 100, 0.75);
light.position.set(0, 10, 10);
scene.add(light);

// Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

// Camera
const camera = new THREE.PerspectiveCamera(
  45,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.z = 20;
scene.add(camera);

// Renderer
const canvas = document.querySelector(".webgl") as HTMLCanvasElement;
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setPixelRatio(2);
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.dampingFactor = 0.01;
controls.enablePan = false;
controls.enableZoom = false;
controls.autoRotate = true;
controls.autoRotateSpeed = 5;

// Resize
window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();
  renderer.setSize(sizes.width, sizes.height);
});

const loop = () => {
  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(loop);
};
loop();

// Timeline
const timeline = gsap.timeline({ defaults: { duration: 1 } });
timeline.fromTo(mesh.scale, { x: 0.1, y: 0.1, z: 0.1 }, { x: 1, y: 1, z: 1 });
timeline.fromTo("nav", { y: "-100%" }, { y: "0%" });
timeline.fromTo(".title", { opacity: 0 }, { opacity: 1 });

// Mouse Animation Color
let mouseDown = false;
let rgb: [number, number, number] = [0, 0, 0];
window.addEventListener("mousedown", () => {
  mouseDown = true;
});
window.addEventListener("mouseup", () => {
  mouseDown = false;
});
window.addEventListener("mousemove", (e) => {
  if (mouseDown) {
    rgb = [e.clientX / window.innerWidth, e.clientY / window.innerHeight, 0.5];
    material.color.setRGB(...rgb);
  }
});
