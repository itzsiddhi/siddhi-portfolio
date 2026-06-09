import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export function useThreeScene(containerRef: React.RefObject<HTMLDivElement>) {
  const cleanupRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const isMobile = window.matchMedia('(max-width: 768px)').matches;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: !isMobile, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 5);

    // ── Geodesic sphere (quantum lattice) ──
    const latticeGroup = new THREE.Group();
    scene.add(latticeGroup);

    const outerGeo = new THREE.IcosahedronGeometry(1.6, 3);
    const outerMat = new THREE.MeshBasicMaterial({
      wireframe: true,
      transparent: true,
      opacity: 0.18,
      color: new THREE.Color(0xa78bfa),
    });
    const outerMesh = new THREE.Mesh(outerGeo, outerMat);
    latticeGroup.add(outerMesh);

    const innerGeo = new THREE.IcosahedronGeometry(1.1, 2);
    const innerMat = new THREE.MeshBasicMaterial({
      wireframe: true,
      transparent: true,
      opacity: 0.12,
      color: new THREE.Color(0x60a5fa),
    });
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);
    latticeGroup.add(innerMesh);

    // Core glow sphere
    const coreGeo = new THREE.SphereGeometry(0.35, 16, 16);
    const coreMat = new THREE.MeshBasicMaterial({
      transparent: true,
      opacity: 0.6,
      color: new THREE.Color(0x34d399),
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    latticeGroup.add(coreMesh);

    // ── Particle field ──
    const PARTICLE_COUNT = isMobile ? 800 : 2000;
    const pPositions = new Float32Array(PARTICLE_COUNT * 3);
    const pOriginal = new Float32Array(PARTICLE_COUNT * 3);
    const pSpeeds = new Float32Array(PARTICLE_COUNT);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const x = (Math.random() - 0.5) * 14;
      const y = (Math.random() - 0.5) * 10;
      const z = (Math.random() - 0.5) * 8 - 2;
      pPositions[i * 3] = x;
      pPositions[i * 3 + 1] = y;
      pPositions[i * 3 + 2] = z;
      pOriginal[i * 3] = x;
      pOriginal[i * 3 + 1] = y;
      pOriginal[i * 3 + 2] = z;
      pSpeeds[i] = Math.random() * 0.5 + 0.2;
    }

    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPositions, 3));
    const pMat = new THREE.PointsMaterial({
      size: 0.025,
      transparent: true,
      opacity: 0.55,
      sizeAttenuation: true,
    });
    pMat.color.setHSL(0.75, 0.8, 0.75);
    const particles = new THREE.Points(pGeo, pMat);
    scene.add(particles);

    // ── Holographic grid ──
    const gridHelper = new THREE.GridHelper(30, 30, 0x1a1a2e, 0x0d0d1a);
    gridHelper.position.y = -3;
    gridHelper.material = new THREE.LineBasicMaterial({
      color: 0x1a1a2e,
      transparent: true,
      opacity: 0.3,
    }) as THREE.Material;
    scene.add(gridHelper);

    // ── Mouse tracking ──
    const mouse3D = new THREE.Vector2(0, 0);
    let lastMouseTime = 0;

    const onMouseMove = (e: MouseEvent) => {
      const now = Date.now();
      if (now - lastMouseTime < 16) return;
      lastMouseTime = now;
      mouse3D.x = ((e.clientX / window.innerWidth) - 0.5) * 2;
      mouse3D.y = -((e.clientY / window.innerHeight) - 0.5) * 2;
    };
    window.addEventListener('mousemove', onMouseMove);

    // ── Color palette cycling ──
    const holoColors = [
      new THREE.Color(0xa78bfa),
      new THREE.Color(0x60a5fa),
      new THREE.Color(0x34d399),
      new THREE.Color(0xf472b6),
    ];
    let colorPhase = 0;

    function lerpColor(a: THREE.Color, b: THREE.Color, t: number) {
      return new THREE.Color(
        a.r + (b.r - a.r) * t,
        a.g + (b.g - a.g) * t,
        a.b + (b.b - a.b) * t,
      );
    }

    // ── Animation loop ──
    let time = 0;
    let rafId: number;

    function animate() {
      rafId = requestAnimationFrame(animate);
      time += 0.003; // 0.3x slow
      colorPhase += 0.002;

      // Rotate lattice slowly
      latticeGroup.rotation.y = time * 0.5;
      latticeGroup.rotation.x = Math.sin(time * 0.3) * 0.15;
      outerMesh.rotation.z = time * 0.2;
      innerMesh.rotation.y = -time * 0.4;
      innerMesh.rotation.z = time * 0.15;

      // Pulse core
      const coreScale = 1 + Math.sin(time * 3) * 0.15;
      coreMesh.scale.setScalar(coreScale);

      // Cycle holographic colors
      const ci = colorPhase % holoColors.length;
      const cFloor = Math.floor(ci);
      const cFrac = ci - cFloor;
      const mixedColor = lerpColor(
        holoColors[cFloor % holoColors.length],
        holoColors[(cFloor + 1) % holoColors.length],
        cFrac
      );

      outerMat.color.copy(mixedColor);
      innerMat.color.copy(
        lerpColor(holoColors[(cFloor + 1) % holoColors.length], holoColors[(cFloor + 2) % holoColors.length], cFrac)
      );
      coreMesh.material.color.copy(
        lerpColor(holoColors[(cFloor + 2) % holoColors.length], holoColors[(cFloor + 3) % holoColors.length], cFrac)
      );
      pMat.color.copy(
        lerpColor(holoColors[(cFloor + 3) % holoColors.length], holoColors[cFloor % holoColors.length], cFrac)
      );

      // Particle mouse drift
      const mx = mouse3D.x * 5;
      const my = mouse3D.y * 3;
      const pos = pGeo.attributes.position.array as Float32Array;
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const ox = pOriginal[i * 3];
        const oy = pOriginal[i * 3 + 1];
        const px = pos[i * 3];
        const py = pos[i * 3 + 1];
        const dx = mx - ox;
        const dy = my - oy;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 3) {
          const force = (3 - dist) / 3 * 0.001 * pSpeeds[i];
          pos[i * 3] += dx * force;
          pos[i * 3 + 1] += dy * force;
        }

        // Drift back to origin
        pos[i * 3] += (ox - px) * 0.01;
        pos[i * 3 + 1] += (oy - py) * 0.01;

        // Slow vertical drift
        pos[i * 3 + 1] += Math.sin(time * pSpeeds[i] + ox) * 0.0008;
      }
      pGeo.attributes.position.needsUpdate = true;

      // Subtle parallax on lattice from mouse
      latticeGroup.position.x += (mouse3D.x * 0.3 - latticeGroup.position.x) * 0.02;
      latticeGroup.position.y += (mouse3D.y * 0.2 - latticeGroup.position.y) * 0.02;

      renderer.render(scene, camera);
    }

    animate();

    // ── Resize ──
    const onResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', onResize);

    cleanupRef.current = () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
      outerGeo.dispose(); outerMat.dispose();
      innerGeo.dispose(); innerMat.dispose();
      coreGeo.dispose(); coreMat.dispose();
      pGeo.dispose(); pMat.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };

    return () => cleanupRef.current?.();
  }, []);
}
