declare module "three/examples/jsm/controls/OrbitControls" {
  export class OrbitControls extends THREE.EventDispatcher {
    constructor(object: THREE.Camera, domElement?: HTMLElement);

    // add properties and methods you're using from OrbitControls
    enableDamping: boolean;
    enablePan: boolean;
    enableZoom: boolean;
    autoRotate: boolean;
    autoRotateSpeed: number;
    dampingFactor: number;

    update(): void;
  }
}
