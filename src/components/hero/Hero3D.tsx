"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * Interactive 360° hero visual: wireframe icosahedron core with orbiting point
 * field. Responds to mouse, drag (rotate) and scroll. Mounted only on capable
 * desktop clients — see Hero.tsx for the fallback ladder.
 */
export default function Hero3D() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
    camera.position.set(0, 0, 6);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    renderer.domElement.style.display = "block";
    renderer.domElement.style.touchAction = "pan-y";

    const accent = new THREE.Color(0x38bdf8);
    const secondaryAccent = new THREE.Color(0x818cf8);

    const group = new THREE.Group();
    scene.add(group);

    const coreGeo = new THREE.IcosahedronGeometry(1.6, 1);
    const core = new THREE.Mesh(
      coreGeo,
      new THREE.MeshBasicMaterial({ color: accent, wireframe: true, transparent: true, opacity: 0.65 })
    );
    group.add(core);

    const haloGeo = new THREE.SphereGeometry(2.4, 24, 12);
    const halo = new THREE.Mesh(
      haloGeo,
      new THREE.MeshBasicMaterial({ color: secondaryAccent, wireframe: true, transparent: true, opacity: 0.12 })
    );
    group.add(halo);

    // Point field
    const COUNT = 750;
    const positions = new Float32Array(COUNT * 3);
    for (let i = 0; i < COUNT; i++) {
      const r = 2.4 + Math.random() * 2.0;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
    }
    const pointsGeo = new THREE.BufferGeometry();
    pointsGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const points = new THREE.Points(
      pointsGeo,
      new THREE.PointsMaterial({ color: accent, size: 0.025, transparent: true, opacity: 0.85 })
    );
    group.add(points);

    // Interaction state
    const target = { rx: 0.2, ry: 0 };
    const current = { rx: 0.2, ry: 0 };
    let dragVelY = 0;
    let dragging = false;
    let lastX = 0;
    let scrollTilt = 0;

    const onMouseMove = (e: MouseEvent) => {
      const rect = mount.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = ((e.clientY - rect.top) / rect.height) * 2 - 1;
      if (!dragging) {
        target.ry += (nx * 0.6 - target.ry) * 0.0; // parallax handled below
        target.rx = 0.2 + ny * 0.35;
        target.ry = nx * 0.6;
      }
    };
    const onPointerDown = (e: PointerEvent) => {
      dragging = true;
      lastX = e.clientX;
    };
    const onPointerMove = (e: PointerEvent) => {
      if (!dragging) return;
      const dx = e.clientX - lastX;
      lastX = e.clientX;
      target.ry += dx * 0.008; // full 360° drag rotation
      dragVelY = dx * 0.008;
    };
    const onPointerUp = () => {
      dragging = false;
    };
    const onScroll = () => {
      scrollTilt = Math.min(window.scrollY / 800, 1) * 0.8;
    };
    const onResize = () => {
      const { clientWidth: w, clientHeight: h } = mount;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h, false);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    mount.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    onResize();

    let raf = 0;
    let t = 0;
    const frame = () => {
      t += 0.005;
      if (!dragging) {
        target.ry += dragVelY;
        dragVelY *= 0.95;
        if (!reduced) target.ry += 0.0018; // ambient spin
      }
      current.rx += (target.rx - current.rx) * 0.06;
      current.ry += (target.ry - current.ry) * 0.08;

      group.rotation.x = current.rx + scrollTilt;
      group.rotation.y = current.ry;
      if (!reduced) {
        group.position.y = Math.sin(t * 2) * 0.12; // subtle float
        core.rotation.z = t;
        points.rotation.y = -t * 0.4;
      }

      renderer.render(scene, camera);
      raf = requestAnimationFrame(frame);
    };
    frame();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMouseMove);
      mount.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      coreGeo.dispose();
      haloGeo.dispose();
      pointsGeo.dispose();
      renderer.dispose();
      mount.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={mountRef}
      role="img"
      aria-label="Interactive 3D visual — drag to rotate 360 degrees"
      className="h-full w-full cursor-grab active:cursor-grabbing"
    />
  );
}
