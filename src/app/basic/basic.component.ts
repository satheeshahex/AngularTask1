import { Input } from '@angular/core';
import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
@Component({
  selector: 'app-basic',
  templateUrl: './basic.component.html',
  styleUrls: ['./basic.component.css']
})
export class BasicComponent implements OnInit {
  @ViewChild('canvasElement',{static:true})
  canvasElementRef:ElementRef<HTMLCanvasElement> | undefined;

  @Input() public texture: string = "/assets/asdf.png";
  constructor(private ngZone:NgZone) { }

  ngOnInit(): void {
    this.ngZone.runOutsideAngular(()=>{

      const scene = new THREE.Scene();
			const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 1000 );
     
			const renderer = new THREE.WebGLRenderer({
        canvas:this.canvasElementRef?.nativeElement
      });

			renderer.setSize( window.innerWidth, window.innerHeight );
      window.addEventListener('resize',()=>{
        camera.aspect=window.innerWidth/window.innerHeight;
        camera.updateProjectionMatrix();
        camera.updateMatrixWorld();
        renderer.setSize(window.innerWidth,window.innerHeight)
      })
			document.body.appendChild( renderer.domElement );
      
 const controls = new OrbitControls( camera, renderer.domElement )
      
      const loader = new THREE.TextureLoader();
			const geometry = new THREE.BoxGeometry( 2, 2, 2 );
			const material = new THREE.MeshBasicMaterial( { map: loader.load(this.texture)} );
			const cube = new THREE.Mesh( geometry, material );
			scene.add( cube );

			camera.position.z = 5;
      

			function animate() {
        
				requestAnimationFrame( animate );
        // controls.update();
				// cube.rotation.x += 0.01;
				cube.rotation.y += 0.01;

				renderer.render( scene, camera );
			};

			animate();
    })
  }

}
