import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js';

interface StlPreviewProps {
  file: File;
}

const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB

export default function StlPreview({ file }: StlPreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    if (file.size > MAX_FILE_SIZE) {
      setError('File too large for in-browser preview (beta limit: 50MB)');
      setLoading(false);
      return;
    }

    let disposed = false;
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      50,
      container.clientWidth / container.clientHeight,
      0.1,
      10000
    );

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.1;

    // Lighting
    scene.add(new THREE.AmbientLight(0xffffff, 0.6));
    const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
    dirLight.position.set(1, 2, 3);
    scene.add(dirLight);
    const dirLight2 = new THREE.DirectionalLight(0xffffff, 0.3);
    dirLight2.position.set(-1, -1, -1);
    scene.add(dirLight2);

    // Animation loop
    let animId: number;
    const animate = () => {
      if (disposed) return;
      animId = requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // Resize handler
    const onResize = () => {
      if (!container || disposed) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    // Load STL
    file.arrayBuffer().then((buffer) => {
      if (disposed) return;
      try {
        const loader = new STLLoader();
        const geometry = loader.parse(buffer);
        geometry.computeVertexNormals();

        const material = new THREE.MeshStandardMaterial({
          color: 0x8899aa,
          metalness: 0.15,
          roughness: 0.6,
        });
        const mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);

        // Auto-fit camera
        const box = new THREE.Box3().setFromObject(mesh);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.y, size.z);
        const fov = camera.fov * (Math.PI / 180);
        const dist = maxDim / (2 * Math.tan(fov / 2)) * 1.5;

        mesh.position.sub(center);
        camera.position.set(dist * 0.8, dist * 0.6, dist);
        camera.lookAt(0, 0, 0);
        controls.target.set(0, 0, 0);
        controls.update();

        setLoading(false);
      } catch {
        setError('Failed to parse STL file.');
        setLoading(false);
      }
    }).catch(() => {
      if (!disposed) {
        setError('Failed to read file.');
        setLoading(false);
      }
    });

    return () => {
      disposed = true;
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', onResize);
      controls.dispose();
      renderer.dispose();
      scene.traverse((obj) => {
        if (obj instanceof THREE.Mesh) {
          obj.geometry.dispose();
          if (Array.isArray(obj.material)) obj.material.forEach(m => m.dispose());
          else obj.material.dispose();
        }
      });
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [file]);

  if (error) {
    return (
      <div className="w-full h-[360px] rounded-lg bg-muted/50 flex items-center justify-center text-sm text-muted-foreground">
        {error}
      </div>
    );
  }

  return (
    <div className="relative w-full">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center z-10 text-sm text-muted-foreground">
          Loading preview…
        </div>
      )}
      <div
        ref={containerRef}
        className="w-full h-[360px] rounded-lg bg-muted/30 border border-border"
      />
    </div>
  );
}
