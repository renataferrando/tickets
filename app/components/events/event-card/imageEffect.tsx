/* eslint-disable */
// @ts-nocheck

"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { vertexShader, fragmentShader } from "./shaders/shaders";

const ImageEffect = ({ imageSrc }: any) => {
  const containerRef = useRef();

  useEffect(() => {
    let scene: THREE.Scene,
      camera: THREE.PerspectiveCamera,
      renderer: THREE.WebGLRenderer,
      planeMesh;
    let mousePosition = { x: 0.5, y: 0.5 };
    let targetMousePosition = { x: 0.5, y: 0.5 };
    let prevPosition = { x: 0.5, y: 0.5 };
    let aberrationIntensity = 0.0;
    let easeFactor = 0.02;

    
    

    const initializeScene = (texture: THREE.Texture) => {
      scene = new THREE.Scene();

      const container = containerRef.current;
      const width = container.offsetWidth;
      const height = container.offsetHeight;
      const aspectRatio = width / height;
      camera = new THREE.PerspectiveCamera(
        75,
        containerRef.current.offsetWidth / containerRef.current.offsetHeight,
        0.1,
        10
      );
      camera.position.z = 1;

      const uniforms = {
        u_texture: { value: texture },
        u_mouse: { value: new THREE.Vector2(0.5, 0.5) },
        u_prevMouse: { value: new THREE.Vector2(0.5, 0.5) },
        u_aberrationIntensity: { value: 0.0 },
      };

      const material = new THREE.ShaderMaterial({
        uniforms,
        vertexShader,
        fragmentShader,
      });

      planeMesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material);
      scene.add(planeMesh);

      renderer = new THREE.WebGLRenderer();
      // @ts-expect-error: r
      renderer.setSize(
        containerRef.current.offsetWidth,
        containerRef.current.offsetHeight
      );
      // @ts-expect-error: r
      containerRef.current.appendChild(renderer.domElement);

      const animate = () => {
        requestAnimationFrame(animate);

        // Ease the mouse movement
        mousePosition.x +=
          (targetMousePosition.x - mousePosition.x) * easeFactor;
        mousePosition.y +=
          (targetMousePosition.y - mousePosition.y) * easeFactor;

        uniforms.u_mouse.value.set(mousePosition.x, 1.0 - mousePosition.y);
        uniforms.u_prevMouse.value.set(prevPosition.x, 1.0 - prevPosition.y);

        aberrationIntensity = Math.max(0.0, aberrationIntensity - 0.05);
        uniforms.u_aberrationIntensity.value = aberrationIntensity;

        renderer.render(scene, camera);
      };

      animate();
    };

    const textureLoader = new THREE.TextureLoader();
    textureLoader.crossOrigin = "anonymous";
    const texture = textureLoader.load(imageSrc, () =>
      initializeScene(texture)
    );

    const handleMouseMove = (e: { clientX: number; clientY: number }) => {
      // @ts-expect-error: r
      const rect = containerRef.current.getBoundingClientRect();
      prevPosition = { ...targetMousePosition };
      targetMousePosition = {
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
      };
      aberrationIntensity = 1;
    };
    // @ts-expect-error: r
    containerRef.current.addEventListener("mousemove", handleMouseMove);

    return () => {
      // @ts-expect-error: r
      containerRef.current.removeEventListener("mousemove", handleMouseMove);
    };
  }, [imageSrc]);
  // @ts-expect-error: r
  return (
    <div ref={containerRef} className="relative w-full h-64 overflow-hidden" />
  );
};

export default ImageEffect;
