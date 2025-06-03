import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faTShirt, faUndo, faSync } from '@fortawesome/free-solid-svg-icons';

const DemoPreview = () => {
  const [activeTab, setActiveTab] = useState('preview');
  
  return (
    <div className="bg-white rounded shadow overflow-hidden">
      <div className="border-b" style={{ borderColor: '#f1f5f9' }}>
        <div className="flex">
          <button
            className={`px-4 py-2 text-sm font-medium ${activeTab === 'preview' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('preview')}
            style={{ borderColor: activeTab === 'preview' ? '#3b82f6' : 'transparent' }}
          >
            Demo Preview
          </button>
          <button
            className={`px-4 py-2 text-sm font-medium ${activeTab === 'code' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('code')}
            style={{ borderColor: activeTab === 'code' ? '#3b82f6' : 'transparent' }}
          >
            Implementation
          </button>
        </div>
      </div>
      <div className="p-4">
        {activeTab === 'preview' ? (
          <div className="bg-gray-100 w-full rounded overflow-hidden flex" style={{ height: '400px' }}>
            <div className="w-1/3 bg-slate-800 p-4 text-white">
              <h3 className="text-lg font-semibold mb-3">3D Model Gallery</h3>
              <div className="space-y-2">
                <div className="bg-blue-700 p-3 rounded">
                  <div className="font-medium">Basic T-Shirt</div>
                  <div className="text-xs opacity-70">Selected</div>
                </div>
                <div className="bg-slate-700 p-3 rounded hover:bg-slate-600 cursor-pointer">
                  <div className="font-medium">Denim Jacket</div>
                  <div className="text-xs opacity-70">Ready to try</div>
                </div>
                <div className="bg-slate-700 p-3 rounded hover:bg-slate-600 cursor-pointer">
                  <div className="font-medium">Summer Dress</div>
                  <div className="text-xs opacity-70">Ready to try</div>
                </div>
                <div className="bg-slate-700 p-3 rounded hover:bg-slate-600 cursor-pointer">
                  <div className="font-medium">Slim Jeans</div>
                  <div className="text-xs opacity-70">Ready to try</div>
                </div>
              </div>
            </div>
            <div className="w-2/3 relative">
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, #f1f5f9, #e2e8f0)' }}></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-48 h-48 mx-auto relative">
                    <div className="absolute inset-0 border-4 rounded-full animate-pulse" style={{ borderColor: '#3b82f6', opacity: 0.5 }}></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <FontAwesomeIcon icon={faTShirt} style={{ fontSize: '5rem', color: '#3b82f6' }} />
                    </div>
                  </div>
                  <div className="mt-4 bg-white py-2 px-4 rounded-full inline-flex shadow-lg">
                    <button className="w-6 h-6 rounded-full bg-blue-600 mx-1 border-2 border-white"></button>
                    <button className="w-6 h-6 rounded-full bg-black mx-1 border-2 border-white"></button>
                    <button className="w-6 h-6 rounded-full bg-red-600 mx-1 border-2 border-white"></button>
                    <div className="mx-2 w-px bg-gray-300"></div>
                    <button className="text-gray-700 mx-1">
                      <FontAwesomeIcon icon={faUndo} />
                    </button>
                    <button className="text-gray-700 mx-1">
                      <FontAwesomeIcon icon={faSync} />
                    </button>
                  </div>
                </div>
              </div>
              <div className="absolute top-4 right-4 bg-white rounded shadow px-3 py-2 text-sm">
                <div className="font-medium">Basic T-Shirt</div>
                <div className="text-gray-500 text-xs">Fit: 98% match</div>
              </div>
            </div>
          </div>
        ) : (
          <div className="rounded p-4 overflow-auto" style={{ backgroundColor: '#1e293b', color: '#f1f5f9', height: '400px' }}>
            <pre className="text-xs">
              <code>
{`import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const ThreeDViewer = () => {
  const mountRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf0f0f0);
    
    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75, 
      mountRef.current.clientWidth / mountRef.current.clientHeight, 
      0.1, 
      1000
    );
    camera.position.z = 5;
    
    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    renderer.outputEncoding = THREE.sRGBEncoding;
    mountRef.current.appendChild(renderer.domElement);
    
    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(0, 1, 0);
    scene.add(directionalLight);
    
    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    
    // Load 3D model
    const loader = new GLTFLoader();
    loader.load(
      '/models/shirt.glb',
      (gltf) => {
        scene.add(gltf.scene);
        setIsLoading(false);
      },
      (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
      },
      (error) => {
        console.error('An error happened', error);
      }
    );
    
    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();
    
    // Cleanup
    return () => {
      mountRef.current.removeChild(renderer.domElement);
    };
  }, []);
  
  return (
    <div ref={mountRef} style={{ width: '100%', height: '400px' }}>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <p>Loading 3D model...</p>
        </div>
      )}
    </div>
  );
};

export default ThreeDViewer;`}
              </code>
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default DemoPreview;