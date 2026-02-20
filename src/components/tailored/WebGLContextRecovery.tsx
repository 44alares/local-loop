import { useEffect } from 'react';
import { useThree } from '@react-three/fiber';

/**
 * Drop this inside any <Canvas> to:
 * 1. Auto-recover from WebGL context loss
 * 2. Properly dispose the GL context on unmount
 */
export function WebGLContextRecovery() {
  const { gl } = useThree();

  useEffect(() => {
    const canvas = gl.domElement;

    const handleContextLost = (e: Event) => {
      e.preventDefault();
      setTimeout(() => {
        try {
          gl.forceContextRestore();
        } catch {
          // silently fail — error boundary will catch
        }
      }, 300);
    };

    canvas.addEventListener('webglcontextlost', handleContextLost, false);

    return () => {
      canvas.removeEventListener('webglcontextlost', handleContextLost, false);
      try {
        gl.dispose();
      } catch {
        // already disposed
      }
    };
  }, [gl]);

  return null;
}
