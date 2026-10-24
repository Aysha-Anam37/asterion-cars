import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ChevronDown, ChevronUp, Pause, Play, RotateCcw } from 'lucide-react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { usePrefersReducedMotion } from '../hooks/useMotionPreferences';
import { Reveal } from './Reveal';

type CameraPresetId = 'three-quarter' | 'front' | 'side' | 'rear';

interface CameraPreset {
  id: CameraPresetId;
  label: string;
  position: [number, number, number];
  target: [number, number, number];
}

const CAMERA_PRESETS: CameraPreset[] = [
  {
    id: 'three-quarter',
    label: 'THREE-QUARTER',
    position: [3.85, 1.44, 4.15],
    target: [0, 0.52, 0],
  },
  {
    id: 'front',
    label: 'FRONT',
    position: [0.0, 0.98, 5.45],
    target: [0, 0.48, 0],
  },
  {
    id: 'side',
    label: 'SIDE',
    position: [5.55, 1.04, 0.0],
    target: [0, 0.5, 0],
  },
  {
    id: 'rear',
    label: 'REAR',
    position: [-0.42, 1.12, -5.45],
    target: [0, 0.54, 0],
  },
];

type PaintFinishId = 'obsidian' | 'silver' | 'champagne';

interface PaintFinishOption {
  id: PaintFinishId;
  name: string;
  swatchHex: string;
  colorHex: string;
  metalness: number;
  roughness: number;
  clearcoat: number;
  clearcoatRoughness: number;
}

const PAINT_FINISHES: PaintFinishOption[] = [
  {
    id: 'obsidian',
    name: 'Obsidian Black',
    swatchHex: '#15181F',
    colorHex: '#11141A',
    metalness: 0.84,
    roughness: 0.22,
    clearcoat: 1.0,
    clearcoatRoughness: 0.06,
  },
  {
    id: 'silver',
    name: 'Titanium Silver',
    swatchHex: '#A7AEB8',
    colorHex: '#A9B0BA',
    metalness: 0.92,
    roughness: 0.17,
    clearcoat: 1.0,
    clearcoatRoughness: 0.05,
  },
  {
    id: 'champagne',
    name: 'Champagne Metallic',
    swatchHex: '#C7AD7A',
    colorHex: '#C7AD7A',
    metalness: 0.88,
    roughness: 0.2,
    clearcoat: 1.0,
    clearcoatRoughness: 0.06,
  },
];

const baseUrl = import.meta.env.BASE_URL || '/';
const normalizedBase = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
const MODEL_PATH = `${normalizedBase}models/asterion-apex.glb`;

function createContactShadowTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.scale(1, 2.05);
    const grad = ctx.createRadialGradient(0, 0, 12, 0, 0, 118);
    grad.addColorStop(0, 'rgba(0, 0, 0, 0.92)');
    grad.addColorStop(0.52, 'rgba(0, 0, 0, 0.72)');
    grad.addColorStop(0.82, 'rgba(0, 0, 0, 0.24)');
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(0, 0, 120, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

export const Asterion3DShowroom: React.FC<{ sectionId?: string }> = ({
  sectionId = 'showroom-3d',
}) => {
  const prefersReducedMotion = usePrefersReducedMotion();
  const sectionRef = useRef<HTMLElement | null>(null);
  const mountRef = useRef<HTMLDivElement | null>(null);

  const [loadStatus, setLoadStatus] = useState<'loading' | 'ready' | 'error'>('loading');
  const [loadProgress, setLoadProgress] = useState<number>(0);
  const [errorReason, setErrorReason] = useState<string | null>(null);

  const [activePreset, setActivePreset] = useState<CameraPresetId>('three-quarter');
  const [activePaint, setActivePaint] = useState<PaintFinishId>('obsidian');
  const [autoRotate, setAutoRotate] = useState<boolean>(false);
  const [controlsCollapsed, setControlsCollapsed] = useState<boolean>(false);

  // Refs bridging React controls into the Three.js scene without re-mounting WebGL
  const bodyMaterialsRef = useRef<THREE.MeshPhysicalMaterial[]>([]);
  const triggerPresetTransitionRef = useRef<((preset: CameraPreset) => void) | null>(null);
  const setAutoRotateEngineRef = useRef<((enabled: boolean) => void) | null>(null);

  // Sync default auto-rotate once reduced-motion preference is known
  useEffect(() => {
    const initialAuto = !prefersReducedMotion;
    setAutoRotate(initialAuto);
    setAutoRotateEngineRef.current?.(initialAuto);
  }, [prefersReducedMotion]);

  // Apply real PBR paint finish changes directly to Three.js MeshPhysicalMaterial instances
  useEffect(() => {
    const finish = PAINT_FINISHES.find((f) => f.id === activePaint) ?? PAINT_FINISHES[0];
    for (const mat of bodyMaterialsRef.current) {
      mat.color.set(finish.colorHex);
      mat.metalness = finish.metalness;
      mat.roughness = finish.roughness;
      mat.clearcoat = finish.clearcoat;
      mat.clearcoatRoughness = finish.clearcoatRoughness;
      mat.needsUpdate = true;
    }
    if (triggerPresetTransitionRef.current) {
      // Request a fresh frame when material properties change
      window.dispatchEvent(new CustomEvent('asterion-3d-invalidate'));
    }
  }, [activePaint]);

  useEffect(() => {
    const container = mountRef.current;
    const hostSection = sectionRef.current;
    if (!container) return;

    let disposed = false;
    let renderer: THREE.WebGLRenderer | null = null;

    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: false,
        powerPreference: 'high-performance',
      });
    } catch {
      setErrorReason('WebGL hardware acceleration is unavailable in this browser environment.');
      setLoadStatus('error');
      return;
    }

    const gl = renderer.getContext();
    const dbg = gl.getExtension('WEBGL_debug_renderer_info');
    const glRendererName = dbg ? String(gl.getParameter(dbg.UNMASKED_RENDERER_WEBGL)) : '';
    const isSoftwareGl = /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(
      glRendererName
    );

    const initWidth = Math.max(container.clientWidth, 300);
    const initHeight = Math.max(container.clientHeight, 360);

    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(initWidth, initHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.12;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.shadowMap.enabled = !isSoftwareGl;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.setClearColor(0x090b0e, 1);

    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x090b0e);
    scene.fog = new THREE.FogExp2(0x090b0e, 0.042);

    // Studio IBL Reflections via RoomEnvironment + PMREMGenerator
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    const roomEnv = new RoomEnvironment();
    const envRenderTarget = pmremGenerator.fromScene(roomEnv, 0.04);
    scene.environment = envRenderTarget.texture;
    roomEnv.dispose();
    pmremGenerator.dispose();

    const defaultPreset = CAMERA_PRESETS[0];
    const camera = new THREE.PerspectiveCamera(36, initWidth / initHeight, 0.1, 60);
    camera.position.set(...defaultPreset.position);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.target.set(...defaultPreset.target);
    controls.enableDamping = true;
    controls.dampingFactor = 0.065;
    controls.enablePan = false;
    controls.minPolarAngle = 0.24;
    controls.maxPolarAngle = Math.PI / 2 - 0.045;
    controls.minDistance = 3.45;
    controls.maxDistance = 8.8;
    controls.rotateSpeed = 0.78;
    controls.zoomSpeed = 0.85;
    controls.autoRotate = !prefersReducedMotion;
    controls.autoRotateSpeed = 0.55;

    // Studio Lighting Rig: Warm Overhead Key + Cool Slate Fill + Champagne Rim
    const hemiLight = new THREE.HemisphereLight(0xdce6f5, 0x101216, 0.55);
    scene.add(hemiLight);

    const keyLight = new THREE.DirectionalLight(0xfff4e0, 2.35);
    keyLight.position.set(4.5, 6.8, 4.2);
    if (!isSoftwareGl) {
      keyLight.castShadow = true;
      keyLight.shadow.mapSize.set(1024, 1024);
      keyLight.shadow.camera.near = 1;
      keyLight.shadow.camera.far = 18;
      keyLight.shadow.camera.left = -3.4;
      keyLight.shadow.camera.right = 3.4;
      keyLight.shadow.camera.top = 3.4;
      keyLight.shadow.camera.bottom = -3.4;
      keyLight.shadow.bias = -0.0004;
      keyLight.shadow.normalBias = 0.02;
    }
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0x9ab2d4, 1.05);
    fillLight.position.set(-5.2, 3.4, 2.6);
    scene.add(fillLight);

    const champagneRim = new THREE.DirectionalLight(0xc7ad7a, 1.55);
    champagneRim.position.set(-3.2, 3.8, -5.6);
    scene.add(champagneRim);

    // Architectural Turntable Studio Floor + Grounded Soft Contact Shadow
    const disposableGeometries: THREE.BufferGeometry[] = [];
    const disposableMaterials: THREE.Material[] = [];
    const disposableTextures: THREE.Texture[] = [];

    const floorGeo = new THREE.CircleGeometry(14, 72);
    floorGeo.rotateX(-Math.PI / 2);
    const floorMat = new THREE.MeshStandardMaterial({
      color: 0x0d1015,
      roughness: 0.72,
      metalness: 0.22,
      envMapIntensity: 0.45,
    });
    const floorMesh = new THREE.Mesh(floorGeo, floorMat);
    floorMesh.position.y = -0.002;
    floorMesh.receiveShadow = !isSoftwareGl;
    scene.add(floorMesh);
    disposableGeometries.push(floorGeo);
    disposableMaterials.push(floorMat);

    // Subtle Champagne Turntable Studio Ring
    const ringGeo = new THREE.RingGeometry(2.72, 2.745, 96);
    ringGeo.rotateX(-Math.PI / 2);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0xc7ad7a,
      transparent: true,
      opacity: 0.24,
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.position.y = 0.001;
    scene.add(ringMesh);
    disposableGeometries.push(ringGeo);
    disposableMaterials.push(ringMat);

    // Soft Grounded Contact Shadow Plane Directly Under Vehicle Footprint
    const contactShadowTex = createContactShadowTexture();
    const shadowPlaneGeo = new THREE.PlaneGeometry(2.65, 5.35);
    shadowPlaneGeo.rotateX(-Math.PI / 2);
    const shadowPlaneMat = new THREE.MeshBasicMaterial({
      map: contactShadowTex,
      transparent: true,
      opacity: 0.88,
      depthWrite: false,
    });
    const shadowPlane = new THREE.Mesh(shadowPlaneGeo, shadowPlaneMat);
    shadowPlane.position.y = 0.002;
    scene.add(shadowPlane);
    disposableTextures.push(contactShadowTex);
    disposableGeometries.push(shadowPlaneGeo);
    disposableMaterials.push(shadowPlaneMat);

    // Smooth Camera Preset Transition State
    let cameraTransition: {
      active: boolean;
      progress: number;
      fromPos: THREE.Vector3;
      toPos: THREE.Vector3;
      fromTarget: THREE.Vector3;
      toTarget: THREE.Vector3;
    } | null = null;

    let isVisibleInViewport = true;
    let rafId = 0;
    let loopRunning = false;
    let needsSingleFrame = true;

    // Backpressure fence helper so software WebGL never builds a frame backlog
    const waitGpuFence = (afterFence: () => void) => {
      if (isSoftwareGl && 'fenceSync' in gl) {
        const gl2 = gl as WebGL2RenderingContext;
        const fence = gl2.fenceSync(gl2.SYNC_GPU_COMMANDS_COMPLETE, 0);
        gl2.flush();
        const pollFence = () => {
          if (disposed) {
            if (fence) gl2.deleteSync(fence);
            return;
          }
          if (!fence) {
            afterFence();
            return;
          }
          const status = gl2.clientWaitSync(fence, 0, 0);
          if (status === gl2.TIMEOUT_EXPIRED) {
            window.setTimeout(pollFence, 4);
            return;
          }
          gl2.deleteSync(fence);
          afterFence();
        };
        window.setTimeout(pollFence, 0);
      } else {
        afterFence();
      }
    };

    const clock = new THREE.Clock();
    let prevCamPos = camera.position.clone();

    const stepFrame = () => {
      rafId = 0;
      if (disposed || !renderer) {
        loopRunning = false;
        return;
      }
      if (!isVisibleInViewport) {
        loopRunning = false;
        return;
      }

      const dt = Math.min(clock.getDelta(), 0.05);
      let keepAnimating = false;

      if (cameraTransition && cameraTransition.active) {
        cameraTransition.progress = Math.min(1, cameraTransition.progress + dt * 1.9);
        const t = THREE.MathUtils.smootherstep(cameraTransition.progress, 0, 1);
        camera.position.lerpVectors(cameraTransition.fromPos, cameraTransition.toPos, t);
        controls.target.lerpVectors(cameraTransition.fromTarget, cameraTransition.toTarget, t);
        if (cameraTransition.progress >= 1) {
          cameraTransition.active = false;
        } else {
          keepAnimating = true;
        }
      }

      prevCamPos.copy(camera.position);
      const controlsMoved = controls.update();
      const posDeltaSq = prevCamPos.distanceToSquared(camera.position);

      if (controls.autoRotate || controlsMoved || posDeltaSq > 1e-7) {
        keepAnimating = true;
      }

      renderer.render(scene, camera);
      needsSingleFrame = false;

      if (keepAnimating) {
        waitGpuFence(() => {
          if (!disposed && isVisibleInViewport && rafId === 0) {
            rafId = window.requestAnimationFrame(stepFrame);
          } else {
            loopRunning = false;
          }
        });
      } else {
        loopRunning = false;
      }
    };

    const ensureLoop = () => {
      if (disposed || !isVisibleInViewport) return;
      needsSingleFrame = true;
      if (!loopRunning && rafId === 0) {
        loopRunning = true;
        clock.getDelta();
        rafId = window.requestAnimationFrame(stepFrame);
      }
    };

    // Pause auto-rotate immediately when the visitor drags or touches the 3D scene
    const handleControlStart = () => {
      cameraTransition = null;
      if (controls.autoRotate) {
        controls.autoRotate = false;
        setAutoRotate(false);
      }
      ensureLoop();
    };

    const handleControlChange = () => {
      if (!loopRunning) {
        ensureLoop();
      }
    };

    controls.addEventListener('start', handleControlStart);
    controls.addEventListener('change', handleControlChange);

    triggerPresetTransitionRef.current = (preset: CameraPreset) => {
      cameraTransition = {
        active: true,
        progress: 0,
        fromPos: camera.position.clone(),
        toPos: new THREE.Vector3(...preset.position),
        fromTarget: controls.target.clone(),
        toTarget: new THREE.Vector3(...preset.target),
      };
      ensureLoop();
    };

    setAutoRotateEngineRef.current = (enabled: boolean) => {
      controls.autoRotate = enabled;
      if (enabled) ensureLoop();
    };

    const handleInvalidate = () => ensureLoop();
    window.addEventListener('asterion-3d-invalidate', handleInvalidate);

    // Load the local unbranded ASTERION Apex 3D GLB model
    let loadedModelRoot: THREE.Object3D | null = null;
    const loader = new GLTFLoader();
    loader.load(
      MODEL_PATH,
      (gltf) => {
        if (disposed) return;

        const model = gltf.scene;
        loadedModelRoot = model;

        // Center horizontally on X/Z and ground tires cleanly onto y = 0 studio floor
        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        model.position.x -= center.x;
        model.position.z -= center.z;
        model.position.y -= box.min.y;

        const finish = PAINT_FINISHES.find((f) => f.id === activePaint) ?? PAINT_FINISHES[0];
        const paintMats: THREE.MeshPhysicalMaterial[] = [];

        const sharedBodyPhysical = new THREE.MeshPhysicalMaterial({
          name: 'AsterionBodyPaintLive',
          color: new THREE.Color(finish.colorHex),
          metalness: finish.metalness,
          roughness: finish.roughness,
          clearcoat: finish.clearcoat,
          clearcoatRoughness: finish.clearcoatRoughness,
          envMapIntensity: 1.5,
        });
        paintMats.push(sharedBodyPhysical);
        disposableMaterials.push(sharedBodyPhysical);

        const canopyGlassMat = new THREE.MeshPhysicalMaterial({
          name: 'CanopyGlassLive',
          color: new THREE.Color('#090C12'),
          metalness: 0.12,
          roughness: 0.04,
          clearcoat: 1.0,
          clearcoatRoughness: 0.02,
          transparent: true,
          opacity: 0.86,
          envMapIntensity: 1.85,
        });
        disposableMaterials.push(canopyGlassMat);

        model.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            const mesh = child as THREE.Mesh;
            mesh.castShadow = !isSoftwareGl;
            mesh.receiveShadow = !isSoftwareGl;

            const matName = Array.isArray(mesh.material)
              ? mesh.material[0]?.name || ''
              : mesh.material?.name || '';

            if (matName.includes('AsterionBodyPaint') || mesh.name.includes('Body') || mesh.name.includes('Buttresses')) {
              mesh.material = sharedBodyPhysical;
            } else if (matName.includes('CanopyGlass') || mesh.name.includes('CanopyGlass')) {
              mesh.material = canopyGlassMat;
            } else if (matName.includes('HeadlightEmissive')) {
              const hlMat = new THREE.MeshStandardMaterial({
                color: 0xfff5e0,
                emissive: new THREE.Color(0xfff0cc),
                emissiveIntensity: 2.2,
                roughness: 0.15,
                metalness: 0.1,
              });
              mesh.material = hlMat;
              disposableMaterials.push(hlMat);
            } else if (matName.includes('TaillightCrimson')) {
              const tlMat = new THREE.MeshStandardMaterial({
                color: 0xe6192b,
                emissive: new THREE.Color(0xff1a2d),
                emissiveIntensity: 2.6,
                roughness: 0.16,
                metalness: 0.1,
              });
              mesh.material = tlMat;
              disposableMaterials.push(tlMat);
            }
          }
        });

        bodyMaterialsRef.current = paintMats;
        scene.add(model);
        setLoadProgress(100);
        setLoadStatus('ready');
        ensureLoop();
      },
      (xhr) => {
        if (disposed) return;
        if (xhr.total && xhr.total > 0) {
          setLoadProgress(Math.min(99, Math.round((xhr.loaded / xhr.total) * 100)));
        }
      },
      () => {
        if (disposed) return;
        setErrorReason(
          'Unable to load the 3D vehicle asset (/models/asterion-apex.glb). Ensure a valid GLB/GLTF 2.0 model is present in public/models/.'
        );
        setLoadStatus('error');
      }
    );

    // Responsive Canvas Sizing via ResizeObserver
    const resizeObserver = new ResizeObserver((entries) => {
      if (disposed || !renderer) return;
      const entry = entries[0];
      if (!entry) return;
      const width = Math.max(Math.floor(entry.contentRect.width), 260);
      const height = Math.max(Math.floor(entry.contentRect.height), 320);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      ensureLoop();
    });
    resizeObserver.observe(container);

    // Off-screen Viewport Pause via IntersectionObserver
    let intersectionObserver: IntersectionObserver | null = null;
    if (hostSection && typeof IntersectionObserver !== 'undefined') {
      intersectionObserver = new IntersectionObserver(
        (entries) => {
          const vis = entries[0]?.isIntersecting ?? true;
          isVisibleInViewport = vis;
          if (vis && (controls.autoRotate || needsSingleFrame)) {
            ensureLoop();
          }
        },
        { threshold: 0.05 }
      );
      intersectionObserver.observe(hostSection);
    }

    ensureLoop();

    return () => {
      disposed = true;
      if (rafId) window.cancelAnimationFrame(rafId);
      window.removeEventListener('asterion-3d-invalidate', handleInvalidate);
      resizeObserver.disconnect();
      intersectionObserver?.disconnect();
      controls.removeEventListener('start', handleControlStart);
      controls.removeEventListener('change', handleControlChange);
      controls.dispose();

      if (loadedModelRoot) {
        loadedModelRoot.traverse((obj) => {
          if ((obj as THREE.Mesh).isMesh) {
            const m = obj as THREE.Mesh;
            m.geometry?.dispose();
            if (Array.isArray(m.material)) {
              m.material.forEach((mat) => mat.dispose());
            } else {
              m.material?.dispose();
            }
          }
        });
        scene.remove(loadedModelRoot);
      }

      disposableGeometries.forEach((g) => g.dispose());
      disposableMaterials.forEach((m) => m.dispose());
      disposableTextures.forEach((t) => t.dispose());
      envRenderTarget.dispose();

      bodyMaterialsRef.current = [];
      triggerPresetTransitionRef.current = null;
      setAutoRotateEngineRef.current = null;

      if (renderer) {
        renderer.dispose();
        if (renderer.domElement.parentNode === container) {
          container.removeChild(renderer.domElement);
        }
      }
    };
  }, [prefersReducedMotion]);

  const handleSelectPreset = useCallback((preset: CameraPreset) => {
    setActivePreset(preset.id);
    triggerPresetTransitionRef.current?.(preset);
  }, []);

  const handleResetView = useCallback(() => {
    const defaultPreset = CAMERA_PRESETS[0];
    setActivePreset(defaultPreset.id);
    triggerPresetTransitionRef.current?.(defaultPreset);
  }, []);

  const handleToggleAutoRotate = useCallback(() => {
    setAutoRotate((prev) => {
      const next = !prev;
      setAutoRotateEngineRef.current?.(next);
      return next;
    });
  }, []);

  const selectedPaintMeta =
    PAINT_FINISHES.find((f) => f.id === activePaint) ?? PAINT_FINISHES[0];

  return (
    <section
      id={sectionId}
      ref={sectionRef}
      aria-labelledby="asterion-3d-showroom-heading"
      className="relative py-24 md:py-32 bg-[#08090B] border-b border-white/[0.08] scroll-mt-16"
    >
      <div className="max-w-[1380px] mx-auto px-6 lg:px-10 space-y-10">
        {/* Section Editorial Header */}
        <Reveal>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <p className="text-xs tracking-[0.24em] uppercase text-[#C7AD7A]">
                Real-Time Spatial Inspection · WebGL Studio
              </p>
              <h2
                id="asterion-3d-showroom-heading"
                className="font-display text-[clamp(2.1rem,4vw,3.4rem)] font-medium tracking-[-0.02em] leading-[1.06] text-[#F4F0E8]"
              >
                EXPLORE ASTERION IN 3D
              </h2>
              <p className="text-base sm:text-lg text-[#F4F0E8]/82 leading-relaxed">
                Every angle. Every detail. Your perspective.
              </p>
            </div>

            <div className="text-xs tracking-[0.16em] uppercase text-[#9A9A96] flex items-center gap-4">
              <span>Drag to Orbit 360°</span>
              <span aria-hidden="true" className="text-white/20">
                ·
              </span>
              <span>Scroll or Pinch to Zoom</span>
            </div>
          </div>
        </Reveal>

        {/* Full-Vehicle Interactive 3D Stage */}
        <Reveal variant="scale-in" delayMs={80}>
          <div className="relative border border-white/[0.1] bg-[#090B0E] overflow-hidden">
            {/* Dedicated Empty Three.js Canvas Mount Container */}
            <div
              ref={mountRef}
              role="region"
              aria-label="Interactive 3D Asterion Apex concept vehicle viewer"
              className="w-full h-[540px] sm:h-[620px] lg:h-[680px] touch-none select-none cursor-grab active:cursor-grabbing"
            />

            {/* Top-Left Minimal Spatial Telemetry Readout (Opaque Chrome, Zero Backdrop Blur) */}
            {loadStatus === 'ready' && (
              <div className="pointer-events-none absolute top-4 left-4 sm:top-6 sm:left-6 bg-[#0C0E13] border border-white/[0.09] px-4 py-2.5 space-y-0.5">
                <p className="text-[10px] tracking-[0.2em] uppercase text-[#C7AD7A]">
                  Asterion Apex · Unbadged 3D Concept
                </p>
                <p className="text-xs text-[#F4F0E8]/90 font-mono">
                  Finish: {selectedPaintMeta.name}
                </p>
              </div>
            )}

            {/* Loading Overlay */}
            {loadStatus === 'loading' && (
              <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-[#090B0E] px-6 text-center space-y-4">
                <p className="text-xs tracking-[0.24em] uppercase text-[#C7AD7A]">
                  Initialising 3D Studio Stage
                </p>
                <div className="w-56 h-[2px] bg-white/10 overflow-hidden">
                  <div
                    style={{ width: `${Math.max(15, loadProgress)}%` }}
                    className="h-full bg-[#C7AD7A] transition-[width] duration-200 ease-out"
                  />
                </div>
                <p className="font-mono text-xs text-[#9A9A96]">
                  Loading geometry & studio reflections ({loadProgress}%)
                </p>
              </div>
            )}

            {/* Honest Fallback State if WebGL or GLB Asset Fails */}
            {loadStatus === 'error' && (
              <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-[#090B0E] px-6 text-center">
                <div className="max-w-lg border border-white/[0.1] bg-[#131519] p-8 space-y-4">
                  <p className="text-xs tracking-[0.22em] uppercase text-[#C7AD7A]">
                    3D Showroom Unavailable
                  </p>
                  <h3 className="font-display text-2xl font-medium text-[#F4F0E8]">
                    Real-time WebGL view could not be initialised.
                  </h3>
                  <p className="text-sm text-[#9A9A96] leading-relaxed">
                    {errorReason ||
                      'A WebGL-capable browser and valid glTF 2.0 binary asset (/public/models/asterion-apex.glb) are required for live 3D inspection.'}
                  </p>
                  <p className="font-mono text-[11px] text-[#9A9A96]/80 pt-2 border-t border-white/[0.08]">
                    Asset Path: public/models/asterion-apex.glb (glTF 2.0 .glb, Y-up, metric scale)
                  </p>
                </div>
              </div>
            )}

            {/* Consolidated Collapsible Bottom Control Dock (Zero Backdrop-Filter Over WebGL) */}
            {loadStatus === 'ready' && (
              <div className="absolute bottom-4 inset-x-4 sm:bottom-6 sm:inset-x-6 z-10 flex flex-col items-center pointer-events-none">
                <div className="w-full max-w-[1120px] bg-[#0C0E13] border border-white/[0.11] pointer-events-auto">
                  {/* Dock Header Bar with Collapse Toggle & Utility Actions */}
                  <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-2.5 border-b border-white/[0.07]">
                    <button
                      type="button"
                      onClick={() => setControlsCollapsed((prev) => !prev)}
                      aria-expanded={!controlsCollapsed}
                      className="inline-flex items-center gap-2 text-[11px] tracking-[0.18em] uppercase text-[#F4F0E8] hover:text-[#C7AD7A] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C7AD7A]"
                    >
                      {controlsCollapsed ? (
                        <>
                          <ChevronUp className="w-3.5 h-3.5 text-[#C7AD7A]" />
                          <span>Show Controls</span>
                        </>
                      ) : (
                        <>
                          <ChevronDown className="w-3.5 h-3.5 text-[#C7AD7A]" />
                          <span>Hide Controls</span>
                        </>
                      )}
                    </button>

                    <div className="flex items-center gap-2 sm:gap-3">
                      <button
                        type="button"
                        onClick={handleToggleAutoRotate}
                        aria-pressed={autoRotate}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-[11px] tracking-[0.16em] uppercase border transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C7AD7A] ${
                          autoRotate
                            ? 'border-[#C7AD7A] text-[#C7AD7A] bg-[#161922]'
                            : 'border-white/15 text-[#9A9A96] hover:text-[#F4F0E8]'
                        }`}
                      >
                        {autoRotate ? (
                          <Pause className="w-3 h-3" />
                        ) : (
                          <Play className="w-3 h-3" />
                        )}
                        <span>Auto-Rotate</span>
                      </button>

                      <button
                        type="button"
                        onClick={handleResetView}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[11px] tracking-[0.16em] uppercase text-[#F4F0E8] border border-white/15 hover:border-[#C7AD7A] hover:text-[#C7AD7A] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C7AD7A]"
                      >
                        <RotateCcw className="w-3 h-3" />
                        <span>Reset View</span>
                      </button>
                    </div>
                  </div>

                  {/* Expandable Camera Presets & Live PBR Finish Selector */}
                  {!controlsCollapsed && (
                    <div className="p-4 sm:px-5 sm:py-4 grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 items-center">
                      {/* Camera Angle Presets */}
                      <div className="lg:col-span-7 flex flex-col sm:flex-row sm:items-center gap-2.5 sm:gap-4">
                        <span className="text-[10px] tracking-[0.2em] uppercase text-[#9A9A96] shrink-0">
                          Camera View
                        </span>
                        <div
                          role="group"
                          aria-label="3D Camera Angle Presets"
                          className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2 w-full"
                        >
                          {CAMERA_PRESETS.map((preset) => {
                            const isSelected = activePreset === preset.id;
                            return (
                              <button
                                key={preset.id}
                                type="button"
                                aria-pressed={isSelected}
                                onClick={() => handleSelectPreset(preset)}
                                className={`px-3.5 py-2 text-[11px] font-medium tracking-[0.16em] uppercase transition-colors cursor-pointer whitespace-nowrap focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C7AD7A] ${
                                  isSelected
                                    ? 'bg-[#C7AD7A] text-[#08090B]'
                                    : 'bg-[#131519] text-[#F4F0E8]/85 border border-white/12 hover:border-[#C7AD7A] hover:text-[#C7AD7A]'
                                }`}
                              >
                                {preset.label}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Real-Time PBR Body Paint Selector */}
                      <div className="lg:col-span-5 flex flex-col sm:flex-row sm:items-center lg:justify-end gap-2.5 sm:gap-4 pt-3 lg:pt-0 border-t lg:border-t-0 border-white/[0.07]">
                        <span className="text-[10px] tracking-[0.2em] uppercase text-[#9A9A96] shrink-0">
                          3D Finish
                        </span>
                        <div
                          role="radiogroup"
                          aria-label="3D Exterior Paint Finish"
                          className="flex flex-wrap items-center gap-2"
                        >
                          {PAINT_FINISHES.map((finish) => {
                            const selected = activePaint === finish.id;
                            return (
                              <button
                                key={finish.id}
                                type="button"
                                role="radio"
                                aria-checked={selected}
                                onClick={() => setActivePaint(finish.id)}
                                className={`inline-flex items-center gap-2 px-3 py-1.5 text-[11px] tracking-[0.1em] border transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C7AD7A] ${
                                  selected
                                    ? 'border-[#C7AD7A] bg-[#161922] text-[#F4F0E8]'
                                    : 'border-white/12 bg-[#131519] text-[#9A9A96] hover:text-[#F4F0E8]'
                                }`}
                              >
                                <span
                                  aria-hidden="true"
                                  style={{ backgroundColor: finish.swatchHex }}
                                  className="w-3 h-3 border border-white/25 shrink-0"
                                />
                                <span>{finish.name}</span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
};
