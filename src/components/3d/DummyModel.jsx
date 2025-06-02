import React, { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF, useTexture, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

/**
 * This component creates a basic 3D model for demonstration purposes
 * In the actual implementation, this would be replaced with proper GLTF models of clothing
 */

// Sample color to hex mapping for predefined colors
const colorMap = {
  red: '#ef4444',
  blue: '#3b82f6',
  green: '#10b981',
  black: '#1e1e1e',
  white: '#f8fafc',
  purple: '#8b5cf6',
  cyan: '#06b6d4',
  yellow: '#fbbf24',
  pink: '#ec4899',
  navy: '#1e40af',
  'forest green': '#166534',
  'burgundy': '#9f1239',
  'charcoal': '#334155',
};

const DummyModel = ({ color = 'blue' }) => {
  const modelRef = useRef();
  const groupRef = useRef();
  
  // Convert color name to hex if it's a predefined color, otherwise use the value directly
  const colorHex = colorMap[color.toLowerCase()] || color;
  
  // Create a material with the correct color and enhanced properties for better visual appeal
  const material = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color(colorHex),
    roughness: 0.2,
    metalness: 0.1,
    clearcoat: 0.5,
    clearcoatRoughness: 0.3,
    envMapIntensity: 1.2,
    reflectivity: 0.2,
    transmission: 0.0,
  });
  
  // Subtle animation effect
  useFrame((state) => {
    if (groupRef.current) {
      // Breathing animation
      const t = state.clock.getElapsedTime();
      groupRef.current.position.y = Math.sin(t * 0.4) * 0.05;
      groupRef.current.rotation.y = Math.sin(t * 0.2) * 0.03;
    }
  });
  
  return (
    <group ref={groupRef} dispose={null} position={[0, 0, 0]}>
      {/* Create clothing item - in this case a stylized shirt */}
      <mesh castShadow receiveShadow ref={modelRef} position={[0, 0.8, 0]}>
        {/* Main body of the shirt */}
        <group>
          {/* Torso */}
          <mesh position={[0, 0, 0]} material={material} castShadow>
            <cylinderGeometry args={[1, 0.8, 2, 32, 1, true]} />
          </mesh>
          
          {/* Collar */}
          <mesh position={[0, 1, 0]} rotation={[0, 0, 0]} material={material} castShadow>
            <torusGeometry args={[0.5, 0.1, 16, 32, Math.PI * 2]} />
          </mesh>
          
          {/* Left Sleeve */}
          <mesh position={[-1, 0.3, 0]} rotation={[0, 0, Math.PI / 2 - 0.3]} material={material} castShadow>
            <cylinderGeometry args={[0.25, 0.3, 1, 16]} />
          </mesh>
          
          {/* Right Sleeve */}
          <mesh position={[1, 0.3, 0]} rotation={[0, 0, -Math.PI / 2 + 0.3]} material={material} castShadow>
            <cylinderGeometry args={[0.25, 0.3, 1, 16]} />
          </mesh>
          
          {/* Decoration details */}
          <mesh position={[0, 0.4, 0.81]} castShadow>
            <boxGeometry args={[0.5, 0.2, 0.01]} />
            <meshPhysicalMaterial
              color="#ffffff"
              metalness={0.5}
              roughness={0.2}
              clearcoat={1.0}
              reflectivity={0.5}
            />
          </mesh>
          
          {/* Button details */}
          {[-0.6, -0.2, 0.2, 0.6].map((y, i) => (
            <mesh
              key={i}
              position={[0, y, 0.81]}
              castShadow
            >
              <sphereGeometry args={[0.05, 16, 16]} />
              <meshPhysicalMaterial
                color="#e5e7eb"
                metalness={0.8}
                roughness={0.1}
                clearcoat={1.0}
                reflectivity={0.8}
                envMapIntensity={1.5}
              />
            </mesh>
          ))}

          {/* Fabric texture effect */}
          <mesh position={[0, 0, 0.8]} material={material}>
            <planeGeometry args={[1.8, 1.9]} />
            <meshPhysicalMaterial
              color={colorHex}
              roughness={0.5}
              metalness={0.0}
              clearcoat={0.3}
              opacity={0.4}
              transparent
              side={THREE.DoubleSide}
              normalScale={new THREE.Vector2(0.05, 0.05)}
            />
          </mesh>
        </group>
      </mesh>
      
      {/* Bottom part (jeans/pants) */}
      <mesh position={[0, -0.2, 0]} castShadow>
        <cylinderGeometry args={[0.8, 0.6, 1, 32]} />
        <meshPhysicalMaterial 
          color="#1d4ed8" 
          roughness={0.6}
          metalness={0.1}
          clearcoat={0.2}
          reflectivity={0.1}
        />
      </mesh>
      
      {/* Create a platform for the model to stand on */}
      <mesh position={[0, -0.7, 0]} receiveShadow>
        <cylinderGeometry args={[1.5, 1.5, 0.1, 36]} />
        <meshPhysicalMaterial 
          color="#f1f5f9"
          roughness={0.2}
          metalness={0.8}
          clearcoat={1.0}
          reflectivity={1.0}
          transmission={0.1}
          transparent
          opacity={0.7}
          envMapIntensity={1.5}
        />
        
        {/* Inner glow for the platform */}
        <mesh position={[0, -0.02, 0]}>
          <cylinderGeometry args={[1.2, 1.2, 0.05, 36]} />
          <meshBasicMaterial 
            color="#6366f1" 
            transparent
            opacity={0.2}
          />
        </mesh>
      </mesh>
      
      {/* Lighting effects around the model */}
      <pointLight
        position={[0, 1, 2]}
        intensity={0.5}
        color={colorHex}
        distance={5}
        decay={2}
      />
      
      {/* Additional lighting for improved 3D effect */}
      <spotLight
        position={[2, 3, 1]}
        angle={0.4}
        intensity={0.8}
        penumbra={1}
        castShadow
        color="#ffffff"
      />
      
      {/* Subtle ambient glow */}
      <pointLight
        position={[0, 0, 0]}
        intensity={0.2}
        color="#6366f1"
        distance={3}
        decay={2}
      />
    </group>
  );
};

export default DummyModel;