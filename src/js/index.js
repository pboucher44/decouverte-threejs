import "../scss/base.scss";
import * as THREE from 'three';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader'

window.addEventListener( 'resize', onWindowResize, false );

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

var period = 5;
var clock = new THREE.Clock();
var matrix = new THREE.Matrix4();

camera.position.z = 0.9;

window.addEventListener('wheel',onWheelFunction ,false);

const loader = new GLTFLoader();

var myObj;
loader.load( 'fini.gltf', function ( gltf ) {
    scene.traverse((gltf) => {
        gltf.transparent = false;
        gltf.frustumCulled = false;
        gltf.depthWrite = false;
        gltf.renderOrder = 1;
        gltf.position.y = -0.60;
    });
    myObj = gltf.scene;
    scene.add( myObj );
    animate();
}, undefined, function ( error ) {
    console.error( error );
} );

scene.traverse(function( obj ) {
    obj.frustumCulled = false;
});

var light = new THREE.AmbientLight(0xFFFFFF, 3);
scene.add(light);

function animate() {
    matrix.makeRotationY(-20);
    // Apply matrix like this to rotate the camera.
    camera.position.applyMatrix4(matrix);
    // Make camera look at the box.
    camera.lookAt(myObj.position);

    renderer.render( scene, camera );
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
}

function onWheelFunction(event) {
    matrix.makeRotationY(event.deltaY/500);
    // Apply matrix like this to rotate the camera.
    camera.position.applyMatrix4(matrix);
    // Make camera look at the box.
    camera.lookAt(myObj.position);

    renderer.render( scene, camera );

}
