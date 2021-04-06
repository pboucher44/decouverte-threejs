import "../scss/base.scss";
import * as THREE from 'three';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader'
import * as dat from 'dat.gui';

window.addEventListener( 'resize', onWindowResize, false );
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

camera.position.z = 0.9;

window.addEventListener('wheel',onWheelFunction ,false);

const loader = new GLTFLoader();

var myObj;

const light = new THREE.DirectionalLight( 0xffffff, 3.6 );
light.position.x = -1;
light.position.y = 2.3;
light.position.z = 1;
scene.add( light );

var gui = new dat.GUI();
var f1 = gui.addFolder('light');
f1.add(light, 'intensity', 0, 10);
f1.add(light.position, 'x', -10, 10);
f1.add(light.position, 'y', -10, 10);
f1.add(light.position, 'z', -10, 10);

//text pres
var f3 = gui.addFolder('text1');
textGenerator('Pierre BOUCHER\n' +
    'Actuellement en dernière année\nde Master en alternance\n(contrat de professionnalisation)\navec Sopra Steria depuis 3 ans.\n' +
    'Mes technologies de prédilection\nsont le Java (7 et 8+) ainsi que\nAngular (JS et 2+). ', -285, 75, -400, 0, f3);

//text pres
var f4 = gui.addFolder('text2');
textGenerator('Pierre BOUCHER\n' +
    'Actuellement en dernière année\nde Master en alternance\n(contrat de professionnalisation)\navec Sopra Steria depuis 3 ans.\n' +
    'Mes technologies de prédilection\nsont le Java (7 et 8+) ainsi que\nAngular (JS et 2+). ', -285, -60, -400, 0.25, f4);
//text pres
var f5 = gui.addFolder('text3');
textGenerator('Pierre BOUCHER\n' +
    'Actuellement en dernière année\nde Master en alternance\n(contrat de professionnalisation)\navec Sopra Steria depuis 3 ans.\n' +
    'Mes technologies de prédilection\nsont le Java (7 et 8+) ainsi que\nAngular (JS et 2+). ', -285, -205, -455, 0.5, f5);
//text pres
var f6 = gui.addFolder('text4');
textGenerator('Pierre BOUCHER\n' +
    'Actuellement en dernière année\nde Master en alternance\n(contrat de professionnalisation)\navec Sopra Steria depuis 3 ans.\n' +
    'Mes technologies de prédilection\nsont le Java (7 et 8+) ainsi que\nAngular (JS et 2+). ', -285, -338, -540,0.75, f6);

loader.load( 'myself.gltf', function ( gltf ) {
    scene.traverse((gltf) => {
        gltf.transparent = false;
        gltf.frustumCulled = false;
        gltf.depthWrite = false;
        gltf.renderOrder = 1;
    });
    myObj = gltf.scene;
    myObj.position.y = -0.60;
    myObj.position.x = 0.2;
    myObj.rotation.y = -1;

    var f2 = gui.addFolder('myObj');
    f2.add(myObj.rotation, 'y', -1, 1);
    f2.add(myObj.position, 'x', -1, 1);

    scene.add( myObj );
    animate();
}, undefined, function ( error ) {
    console.error( error );
} );

scene.traverse(function( obj ) {
    obj.frustumCulled = false;
});

function textGenerator(text, posx, posy, posz, rotax, guifolder) {
    var fontLoader = new THREE.FontLoader();
    var font = fontLoader.load( 'helvetiker_regular.typeface.json', function(font)
    {
        var logo = new THREE.TextGeometry( text, {
            font: font,
            size: 10,
            height: 1,
            width: 1
        });

        var material = new THREE.MeshPhongMaterial({color:0xFFFFFF});
        var mesh = new THREE.Mesh(logo, material);

        mesh.position.set( posx, posy, posz );
        mesh.rotation.x = rotax;


        guifolder.add(mesh.position, 'x', -400, 200);
        guifolder.add(mesh.position, 'y', -400, 200);
        guifolder.add(mesh.position, 'z', -600, 200);

        guifolder.add(mesh.rotation, 'x', -10, 10);
        guifolder.add(mesh.rotation, 'y', -10, 10);
        guifolder.add(mesh.rotation, 'z', -10, 10);

        scene.add(mesh);
    });
}

function animate() {
    requestAnimationFrame( animate );
    renderer.render( scene, camera );
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
}

function onWheelFunction(event) {
    if(event.deltaY > 0 && myObj.rotation.y < 1) {
        myObj.rotation.y += 0.1;

    } else if(event.deltaY < 0 && myObj.rotation.y > -1){
        myObj.rotation.y -= 0.1;
    }
    renderer.render( scene, camera );
}
