import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useScroll, useSpring, useMotionValue } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import * as THREE from "three";

// --- GLSL Shaders ---
const vertexShader = `
uniform float u_time;
uniform vec2 u_mouse;
varying vec2 vUv;
varying vec3 vPosition;
varying vec3 vNormal;

// Simplex 3D Noise 
vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}
float snoise(vec3 v){ 
  const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
  const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);
  vec3 i  = floor(v + dot(v, C.yyy) );
  vec3 x0 = v - i + dot(i, C.xxx) ;
  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min( g.xyz, l.zxy );
  vec3 i2 = max( g.xyz, l.zxy );
  vec3 x1 = x0 - i1 + 1.0 * C.xxx;
  vec3 x2 = x0 - i2 + 2.0 * C.xxx;
  vec3 x3 = x0 - 1.0 + 3.0 * C.xxx;
  i = mod(i, 289.0 ); 
  vec4 p = permute( permute( permute( 
             i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
           + i.y + vec4(0.0, i1.y, i2.y, 1.0 )) 
           + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));
  float n_ = 1.0/7.0;
  vec3  ns = n_ * D.wyz - D.xzx;
  vec4 j = p - 49.0 * floor(p * ns.z *ns.z);
  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_ );
  vec4 x = x_ *ns.x + ns.yyyy;
  vec4 y = y_ *ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);
  vec4 b0 = vec4( x.xy, y.xy );
  vec4 b1 = vec4( x.zw, y.zw );
  vec4 s0 = floor(b0)*2.0 + 1.0;
  vec4 s1 = floor(b1)*2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));
  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
  vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;
  vec3 p0 = vec3(a0.xy,h.x);
  vec3 p1 = vec3(a0.zw,h.y);
  vec3 p2 = vec3(a1.xy,h.z);
  vec3 p3 = vec3(a1.zw,h.w);
  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
  p0 *= norm.x;
  p1 *= norm.y;
  p2 *= norm.z;
  p3 *= norm.w;
  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
  m = m * m;
  return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1), 
                                dot(p2,x2), dot(p3,x3) ) );
}

void main() {
  vUv = uv;
  vNormal = normal;
  
  // Chaotic liquid noise based on position and time
  float noise = snoise(vec3(position.x * 1.5, position.y * 1.5 + u_time * 0.4, position.z * 1.5 - u_time * 0.3));
  
  // Mouse distortion effect
  float mouseDist = distance(vUv, vec2(u_mouse.x * 0.5 + 0.5, u_mouse.y * 0.5 + 0.5));
  float mouseInfluence = smoothstep(0.5, 0.0, mouseDist) * 0.2;

  // Apply displacement
  vec3 newPosition = position + normal * (noise * 0.3) + normal * mouseInfluence;
  vPosition = newPosition;
  
  gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
}
`;

const fragmentShader = `
uniform vec3 u_colorA;
uniform vec3 u_colorB;
varying vec2 vUv;
varying vec3 vPosition;
varying vec3 vNormal;

void main() {
  // Vibrant organic gradient map based on distorted position
  float mixValue = smoothstep(-1.0, 1.0, vPosition.y + vPosition.x * 0.5);
  vec3 color = mix(u_colorA, u_colorB, mixValue);

  // Rim lighting (Fresnel effect) to make it look like a 3D glass liquid
  vec3 viewDir = normalize(cameraPosition - vPosition);
  float fresnel = dot(viewDir, vNormal);
  fresnel = clamp(1.0 - fresnel, 0.0, 1.0);
  fresnel = pow(fresnel, 3.0);

  color += fresnel * 0.6; // Strong glowing edges

  gl_FragColor = vec4(color, 1.0);
}
`;

function BlobMesh({ isDark }) {
  const meshRef = useRef();
  const materialRef = useRef();
  
  const { viewport } = useThree();
  const { scrollYProgress } = useScroll();
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { damping: 20, stiffness: 40 });
  const smoothMouseY = useSpring(mouseY, { damping: 20, stiffness: 40 });
  
  useEffect(() => {
    const handleMove = (e) => {
      const cx = e.touches ? e.touches[0].clientX : e.clientX;
      const cy = e.touches ? e.touches[0].clientY : e.clientY;
      mouseX.set((cx / window.innerWidth) * 2 - 1);
      mouseY.set(-(cy / window.innerHeight) * 2 + 1);
    };
    window.addEventListener("mousemove", handleMove);
    window.addEventListener("touchmove", handleMove);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("touchmove", handleMove);
    };
  }, [mouseX, mouseY]);

  const uniforms = useMemo(
    () => ({
      u_time: { value: 0 },
      u_mouse: { value: new THREE.Vector2(0, 0) },
      u_colorA: { value: new THREE.Color(isDark ? "#4f46e5" : "#3b82f6") },
      u_colorB: { value: new THREE.Color(isDark ? "#818cf8" : "#93c5fd") },
    }),
    [isDark]
  );

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (materialRef.current) {
      materialRef.current.uniforms.u_time.value = time;
      materialRef.current.uniforms.u_mouse.value.set(smoothMouseX.get(), smoothMouseY.get());
    }
    
    const scroll = scrollYProgress.get();
    
    // Scale it to take up about 40% of the screen height
    const baseScale = Math.min(viewport.width, viewport.height) * 0.45;
    meshRef.current.scale.setScalar(baseScale);

    if (scroll > 0.95) {
      const excess = (scroll - 0.95) / 0.05;
      const targetY = -viewport.height / 2; // Exact bottom edge
      const startY = -viewport.height * 0.1; // Settle position
      meshRef.current.position.y = THREE.MathUtils.lerp(startY, targetY, excess);
      
      meshRef.current.scale.setScalar(baseScale * (1 + excess * 0.3)); // Expands slightly at the bottom
    } else {
      // Parallax mapping: floats around the center and goes slightly down
      const yOffset = THREE.MathUtils.lerp(viewport.height * 0.1, -viewport.height * 0.1, scroll / 0.95);
      meshRef.current.position.y = yOffset;
    }
    
    // Slight rotation based on mouse for extra 3D feel
    meshRef.current.rotation.x = -smoothMouseY.get() * 0.5;
    meshRef.current.rotation.y = smoothMouseX.get() * 0.5;
  });

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[1, 128]} />
      <shaderMaterial 
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        wireframe={false}
      />
    </mesh>
  );
}

export default function WebGLBlob() {
  const { mode } = useTheme();
  const isDark = mode === "dark";

  return (
    <div 
      className="fixed inset-0 z-[0] pointer-events-none"
      style={{
        mixBlendMode: isDark ? "screen" : "multiply",
        opacity: isDark ? 0.7 : 0.85,
      }}
    >
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }} dpr={[1, 2]}>
        <BlobMesh isDark={isDark} />
      </Canvas>
    </div>
  );
}
