import React from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

function Model({ url }) {
  const loader = new GLTFLoader();
  let mesh;

  loader.load(url, (gltf) => {
    mesh = gltf.scene.children[0];
    mesh.scale.set(10, 10, 10);
  });

  useFrame(() => {
    if (mesh) {
      mesh.rotation.x += 0.01;
      mesh.rotation.y += 0.01;
    }
  });

  return mesh ? <primitive object={mesh} /> : null;
}

function BuildingView() {
  return (
    <Canvas>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <Model url="/scene.gltf" /> {/* Adjust the URL based on your file location */}
    </Canvas>
  );
}

export default BuildingView;
