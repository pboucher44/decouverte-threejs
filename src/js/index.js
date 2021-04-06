import "../scss/base.scss";
import * as THREE from 'three';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader'

window.addEventListener( 'resize', onWindowResize, false );

var RESOURCES_LOADED = false;
var loadingManager = new THREE.LoadingManager();
var loadingpage = document.getElementById('loadingpage');

loadingManager.onLoad = function(){
    console.log("loaded all resources");
    RESOURCES_LOADED = true;
};

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

var fontLoader = new THREE.FontLoader(loadingManager);

//text pres
var text1
fontLoader.load( 'helvetiker_regular.typeface.json', function(font)
{
    var logo = new THREE.TextGeometry( 'Pierre BOUCHER\n' +
        'Actuellement en derniere annee\nde Master en alternance\n(contrat de professionnalisation)\nen collaboration avec\nSopra Steria depuis 3 ans.\n' +
        'Mes technologies de predilection\nsont le Java (7 et 8+) ainsi que\nAngular (JS et 2+). ', {
        font: font,
        size: 10,
        height: 1,
        width: 1
    });
    var material = new THREE.MeshPhongMaterial({color:0xFFFFFF});
    text1 = new THREE.Mesh(logo, material);
    text1.position.set( -285, 75, -400 );
    text1.rotation.x = 0;
    scene.add(text1);
});

var text2
fontLoader.load( 'helvetiker_regular.typeface.json', function(font)
{
    var logo = new THREE.TextGeometry( 'Three.js\n' +
        'Ce site web a ete concu\nen three.js qui est\nune librairie permettant \nde faire de la 3d.\nje precise que ce site web\nest un poc.\nIl faudrait tout reprendre a zero', {
        font: font,
        size: 10,
        height: 1,
        width: 1
    });
    var material = new THREE.MeshPhongMaterial({color:0xFFFFFF});
    text2 = new THREE.Mesh(logo, material);
    text2.position.set( -285, -125, -440 );
    text2.rotation.x = 0.25;
    scene.add(text2);
});

var text3
fontLoader.load( 'helvetiker_regular.typeface.json', function(font)
{
    var logo = new THREE.TextGeometry( 'Motivation\n' +
        'J\'ai cree ce site web\npar pure envie.\nJe voulais decouvrir ce\nqu\'etait la programmation conceptuelle.\nL\'experience aura ete\nenrichissante mais je ne\nm\'y connais pas assez\nen modelisation 3D\n' +
        'pour produire un travail propre', {
        font: font,
        size: 10,
        height: 1,
        width: 1
    });
    var material = new THREE.MeshPhongMaterial({color:0xFFFFFF});
    text3 = new THREE.Mesh(logo, material);
    text3.position.set( -285, -325, -480 );
    text3.rotation.x = 0.5;
    scene.add(text3);
});

var text4
fontLoader.load( 'helvetiker_regular.typeface.json', function(font)
{
    var logo = new THREE.TextGeometry( 'Contact\n' +
        'Vous pouvez me joindre ici:\nmail: boucher.pierre44400@hotmail.fr\nTel: 06 58 51 28 69\nSite web:\nwww.pierreboucher.fr\n', {
        font: font,
        size: 10,
        height: 1,
        width: 1
    });
    var material = new THREE.MeshPhongMaterial({color:0xFFFFFF});
    text4 = new THREE.Mesh(logo, material);
    text4.position.set( -285, -525, -520 );
    text4.rotation.x = 0.9;
    scene.add(text4);
});

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

    scene.add( myObj );
    animate();
}, undefined, function ( error ) {
    console.error( error );
} );

scene.traverse(function( obj ) {
    obj.frustumCulled = false;
});

function animate() {
    if( RESOURCES_LOADED == true ){
        document.getElementById("MyCoolDiv").removeChild(loadingpage);
        RESOURCES_LOADED == false
    }

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
        text1.rotation.x -= 0.01;
        text2.rotation.x -= 0.01;
        text3.rotation.x -= 0.01;
        text4.rotation.x -= 0.01;
        renderer.render( scene, camera );


        text1.position.y += 6;
        text2.position.y += 6;
        text3.position.y += 6;
        text4.position.y += 6;
        renderer.render( scene, camera );

        if (text1.position.y > 75) {
            text1.position.z -= 1.2;
        } else {
            text1.position.z += 1.2
        }
        if (text2.position.y > 75) {
            text2.position.z -= 1.2;
        } else {
            text2.position.z += 1.2
        }
        if (text3.position.y > 75) {
            text3.position.z -= 1.2;
        } else {
            text3.position.z += 1.2
        }
        if (text4.position.y > 75) {
            text4.position.z -= 1.2;
        } else {
            text4.position.z += 1.2
        }

        myObj.rotation.y += 0.02;

    } else if(event.deltaY < 0 && myObj.rotation.y > -1){
        text1.rotation.x += 0.01;
        text2.rotation.x += 0.01;
        text3.rotation.x += 0.01;
        text4.rotation.x += 0.01;
        renderer.render( scene, camera );

        text1.position.y -= 6;
        text2.position.y -= 6;
        text3.position.y -= 6;
        text4.position.y -= 6;

        renderer.render( scene, camera );

        if (text1.position.y > 75) {
            text1.position.z += 1.2;
        } else {
            text1.position.z -= 1.2
        }
        if (text2.position.y > 75) {
            text2.position.z += 1.2;
        } else {
            text2.position.z -= 1.2
        }
        if (text3.position.y > 75) {
            text3.position.z += 1.2;
        } else {
            text3.position.z -= 1.2
        }
        if (text4.position.y > 75) {
            text4.position.z += 1.2;
        } else {
            text4.position.z -= 1.2
        }

        myObj.rotation.y -= 0.02;
    }
    renderer.render( scene, camera );
}
