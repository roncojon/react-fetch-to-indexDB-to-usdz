// @ts-nocheck
import React, { useEffect, useRef, useState } from 'react';
import { USDZLoader } from 'three-usdz-loader';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'; // add this line
// import spinnerSrc from '../../img/ajax-loader.gif';

function Viewer3DThree({ filePath }: { filePath: string }) {
  const containerRef = useRef();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let initialWidth = 0;
    let initialHeight = 0;
    let initialAspect = 1;
    if (containerRef.current) {
      initialWidth = containerRef.current.offsetWidth;
      initialHeight = containerRef.current.offsetHeight;
      initialAspect = initialWidth / initialHeight;
    }
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, initialAspect, 0.1, 2000);

    // camera.aspect = 800 / 800;
    camera.updateProjectionMatrix();

    const renderer = new THREE.WebGLRenderer();
    const loader = /* filePath *//* .endsWith('.usdz') */ /* ? */ new USDZLoader('/wasm') /* : new GLTFLoader() */;
    const group = new THREE.Group();

    // Change the scene background to white
    scene.background = new THREE.Color(0xffffff);

    // Add lights to the scene
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7); // soft white light
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8); // white, half intensity
    scene.add(directionalLight);

    // const pointLight = new THREE.PointLight(0xffffff, 1); // white, full intensity
    // pointLight.position.set(0, 100, 0); // position the light above the object
    // scene.add(pointLight);

    renderer.setSize(initialWidth, initialHeight);

    // renderer.setSize(800, 800);
    if (containerRef.current)
      containerRef.current.appendChild(renderer.domElement);

    // camera.position.x = 100;
    // camera.position.y = 100;
    // camera.position.z = 100;
    scene.add(group);

    const controls = new OrbitControls(camera, renderer.domElement); // add this line
    controls.enablePan = true; // add this line if you want to enable panning


    const animate = () => {
      requestAnimationFrame(animate);
      controls.update(); // add this line
      renderer.render(scene, camera);
    }
    if (filePath/* .endsWith('.usdz') */) {
      fetch('/chair_swan.usdz')
        .then(response => response.blob())
        .then(blob => {
          const file = new File([blob], filePath, { type: 'model/usdz' });
          return loader.loadFile(file, group);
        })
        .then((model) => {
          const bbox = new THREE.Box3().setFromObject(group);
          const size = bbox.getSize(new THREE.Vector3());
          // console.log('Width:', size.x);
          // console.log('Height:', size.y);
          // console.log('Depth:', size.z);

          const biggerSize = Math.max(size.x, size.y, size.z);

          // Center the camera
          camera.position.set(0, 0, 0);

          // Center the group in the scene
          const center = new THREE.Vector3();
          bbox.getCenter(center);
          group.position.sub(center);

          // Position the camera at 2 times the bigger size of the group
          camera.position.x = 0.8 * biggerSize;
          camera.position.y = 0.8 * biggerSize;
          camera.position.z = 0.8 * biggerSize;

          // Update the camera's aspect ratio
          /* camera.aspect = 800 / 800;
          camera.updateProjectionMatrix(); */

          // HEREEEE //
          const rotateGroup = () => {
            group.rotation.y += 0.01; // Adjust the rotation speed as needed
            requestAnimationFrame(rotateGroup);
          };
          rotateGroup();
          setIsLoading(false);
        });
    }
    // else {
    //   fetch(filePath)
    //     .then(response => response.blob())
    //     .then(blob => {
    //       const file = new File([blob], filePath, { type: 'model/gltf+binary' });
    //       return loader.loadAsync(URL.createObjectURL(file));
    //     })
    //     .then((gltf) => {
    //       const model = gltf.scene;

    //       // Add the model to the group
    //       group.add(model);

    //       const bbox = new THREE.Box3().setFromObject(group);
    //       const size = bbox.getSize(new THREE.Vector3());
    //       // console.log('Width:', size.x);
    //       // console.log('Height:', size.y);
    //       // console.log('Depth:', size.z);

    //       const biggerSize = Math.max(size.x, size.y, size.z);

    //       // Center the camera
    //       camera.position.set(0, 0, 0);

    //       // Center the group in the scene
    //       const center = new THREE.Vector3();
    //       bbox.getCenter(center);
    //       group.position.sub(center);

    //       // Position the camera at 2 times the bigger size of the group
    //       camera.position.x = 0.8 * biggerSize;
    //       camera.position.y = 0.8 * biggerSize;
    //       camera.position.z = 0.8 * biggerSize;

    //       // Update the camera's aspect ratio
    //       /* camera.aspect = 800 / 800;
    //       camera.updateProjectionMatrix(); */

    //       // HEREEEE //
    //       const rotateGroup = () => {
    //         group.rotation.y += 0.01; // Adjust the rotation speed as needed
    //         requestAnimationFrame(rotateGroup);
    //       };
    //       rotateGroup();

    //       // Use the model object here if needed
    //       // ...
    //       // console.log(model);
    //       setIsLoading(false);
    //     });
    // }

    const onWindowResize = () => {
      if (containerRef.current) {
        const width = containerRef.current.clientWidth;
        const height = containerRef.current.clientHeight;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
      }
    };

    window.addEventListener('resize', onWindowResize);

    animate();

    return () => {
      if (containerRef.current)
        containerRef.current.removeChild(renderer.domElement);

      window.removeEventListener('resize', onWindowResize);
      renderer.dispose();
    };
  }, []);

  return <div style={{ width: '98%', height: '98%' }} ref={containerRef}>
    {/* {isLoading &&
        <img 
        src={spinnerSrc} 
        alt="" 
        style={{
          display: 'block',
          padding:'calc(50% - 13px)'
        }}/>
      } */}
  </div>;
}

export default Viewer3DThree;
