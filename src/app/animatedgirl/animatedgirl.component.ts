import { Component, OnInit, AfterViewInit, Input, ViewChild, ElementRef } from '@angular/core';
import * as THREE from "three";
import { GLTFLoader, GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { PerspectiveCamera, Scene } from 'three';



@Component({
  selector: 'app-animatedgirl',
  templateUrl: './animatedgirl.component.html',
  styleUrls: ['./animatedgirl.component.css']
})
export class AnimatedgirlComponent implements AfterViewInit {
  isLabel = "Start"
  initial_value: number = 0.01;
  initAnim = true;
  runAnim = false;
  mutant: any;
  isPlay = false;
  theta = 0;

  @ViewChild('canvas') private canvasRef: ElementRef | undefined;
  @Input() public uservalue: any = [];
  @Input() public fieldOfView: number = 1;
  @Input('nearClipping') public nearClippingPane: number = 1;
  @Input('farClipping') public farClippingPane: number = 1000;

  private camera: THREE.PerspectiveCamera = new PerspectiveCamera;
  private controls: OrbitControls | undefined;
  private ambientLight: THREE.AmbientLight | undefined;
  private light1: THREE.PointLight | undefined;
  private light2: THREE.PointLight | undefined;
  private light3: THREE.PointLight | undefined;
  private light4: THREE.PointLight | undefined;
  private model: any;
  private directionalLight: THREE.DirectionalLight | undefined;
  private loaderGLTF = new GLTFLoader();
  private renderer!: THREE.WebGLRenderer;
  private scene: THREE.Scene = new Scene;

  constructor() { }
  private get canvas(): HTMLCanvasElement {
    return this.canvasRef?.nativeElement;
  }


  private createControls = () => {
    const renderer = new THREE.WebGLRenderer({
      canvas: this.canvasRef?.nativeElement
    });
    document.body.appendChild(renderer.domElement);
    renderer.domElement.style.position = 'absolute';
    renderer.domElement.style.left = '0px';
    document.body.appendChild(renderer.domElement);
    this.controls = new OrbitControls(this.camera, renderer.domElement);
    this.controls.autoRotate = true;
    this.controls.enableZoom = true;
    this.controls.enablePan = false;
    this.controls.update();
  };

  private createScene(value: string) {
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x000000)
    this.loaderGLTF.load(value, (gltf: GLTF) => {
      console.log(value)
      console.log(gltf)
      this.model = gltf.scene.children[0];
      var box = new THREE.Box3().setFromObject(this.model);
      box.getCenter(this.model.position);
      this.model.position.multiplyScalar(-1);
      this.scene.add(this.model);
    });

    let aspectRatio = this.getAspectRatio();
    this.camera = new THREE.PerspectiveCamera(
      this.fieldOfView,
      aspectRatio,
      this.nearClippingPane,
      this.farClippingPane
    )
    this.camera.position.x = 100;
    this.camera.position.y = 100;
    this.camera.position.z = 100;
    this.ambientLight = new THREE.AmbientLight(0x00000, 100);
    this.scene.add(this.ambientLight);
    this.directionalLight = new THREE.DirectionalLight(0xffdf04, 0.4);
    this.directionalLight.position.set(0, 1, 0);
    this.directionalLight.castShadow = true;
    this.scene.add(this.directionalLight);
    this.light1 = new THREE.PointLight(0x4b371c, 10);
    this.light1.position.set(0, 200, 400);
    this.scene.add(this.light1);
    this.light2 = new THREE.PointLight(0x4b371c, 10);
    this.light2.position.set(500, 100, 0);
    this.scene.add(this.light2);
    this.light3 = new THREE.PointLight(0x4b371c, 10);
    this.light3.position.set(0, 100, -500);
    this.scene.add(this.light3);
    this.light4 = new THREE.PointLight(0x4b371c, 10);
    this.light4.position.set(-500, 300, 500);
    this.scene.add(this.light4);
  }

  private getAspectRatio() {
    return this.canvas.clientWidth / this.canvas.clientHeight;
  }

  private startRenderingLoop() {
    this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas, antialias: true });
    this.renderer.setPixelRatio(devicePixelRatio);
    this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);
    let component: AnimatedgirlComponent = this;
    function render() {
      if (component.isPlay) return;
      requestAnimationFrame(render);

      component.renderer?.render(component.scene, component.camera);
      component.theta += 0.01;

    };
    render()
  }

  ngAfterViewInit() {
    let o = ['assets/robot/SimpleSkinning.gltf', 'assets/robot/scene.gltf']
    o.forEach((elementL: any, index: any) => {
      setTimeout(() => {
        console.log(elementL)

        this.createScene(elementL);
        this.createControls();
        this.startRenderingLoop();
      }, index * 5000);
    })
  }



  onIncrement(val: any) {
    this.initial_value++
  }

  onDecrement(val: any) {
    this.initial_value--
  }

  OnStart() {

    if (this.initAnim) {
      this.initAnim = false;
      this.runAnim = true;
      this.theta = 0;
    }

    if (this.runAnim) {
      this.isLabel = 'Pause'
      this.runAnim = false;
      this.isPlay = true;
      let component: AnimatedgirlComponent = this;
      function render() {
        if (!component.isPlay) return;
        requestAnimationFrame(render);
        if (component.model) {
          component.model.rotation.z += component.initial_value
        }
        component.renderer.render(component.scene, component.camera);
      };
      render()
    } else {
      this.isLabel = 'Resume'
      this.runAnim = true;
      this.isPlay = false;
    }
  }

  onRest() {
    this.isLabel = 'Start'
    this.initAnim = true;
    this.runAnim = false;
    this.theta = 0;
    this.isPlay = false;
    let component: AnimatedgirlComponent = this;
    function render() {
      if (component.isPlay) return;
      requestAnimationFrame(render);
      if (component.model) {
        component.initial_value = 0.1;
        component.model.rotation.z = component.initial_value;
      }
      component.renderer.render(component.scene, component.camera);
    };
    render()
  }

}
