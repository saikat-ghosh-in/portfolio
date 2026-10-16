import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useReducedMotion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import { useLoading } from "../context/LoadingContext";
import * as THREE from "three";

// ─── GLSL: Simplex noise + displacement helper ─────────────────────────────
const SNOISE = /* glsl */`
vec4 permute4(vec4 x){return mod(((x*34.0)+1.0)*x,289.0);}
vec4 taylorInvSqrt4(vec4 r){return 1.79284291400159-0.85373472095314*r;}
float snoise(vec3 v){
  const vec2 C=vec2(1.0/6.0,1.0/3.0);
  const vec4 D=vec4(0.0,0.5,1.0,2.0);
  vec3 i=floor(v+dot(v,C.yyy));
  vec3 x0=v-i+dot(i,C.xxx);
  vec3 g=step(x0.yzx,x0.xyz);
  vec3 l=1.0-g;
  vec3 i1=min(g.xyz,l.zxy);
  vec3 i2=max(g.xyz,l.zxy);
  vec3 x1=x0-i1+C.xxx;
  vec3 x2=x0-i2+C.xxx*2.0;
  vec3 x3=x0-1.0+C.xxx*3.0;
  i=mod(i,289.0);
  vec4 p=permute4(permute4(permute4(
    i.z+vec4(0.0,i1.z,i2.z,1.0))
    +i.y+vec4(0.0,i1.y,i2.y,1.0))
    +i.x+vec4(0.0,i1.x,i2.x,1.0));
  float n_=1.0/7.0;
  vec3 ns=n_*D.wyz-D.xzx;
  vec4 j=p-49.0*floor(p*ns.z*ns.z);
  vec4 x_=floor(j*ns.z);
  vec4 y_=floor(j-7.0*x_);
  vec4 x=x_*ns.x+ns.yyyy;
  vec4 y=y_*ns.x+ns.yyyy;
  vec4 h=1.0-abs(x)-abs(y);
  vec4 b0=vec4(x.xy,y.xy);
  vec4 b1=vec4(x.zw,y.zw);
  vec4 s0=floor(b0)*2.0+1.0;
  vec4 s1=floor(b1)*2.0+1.0;
  vec4 sh=-step(h,vec4(0.0));
  vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;
  vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
  vec3 p0=vec3(a0.xy,h.x);
  vec3 p1=vec3(a0.zw,h.y);
  vec3 p2=vec3(a1.xy,h.z);
  vec3 p3=vec3(a1.zw,h.w);
  vec4 norm=taylorInvSqrt4(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
  p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;
  vec4 m=max(0.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.0);
  m=m*m;
  return 42.0*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
}

// A single broad noise field keeps the silhouette fluid while avoiding the
// extra octave that made the surface busy and expensive on mobile GPUs.
float displacement(vec3 p, float t){
  return snoise(vec3(p.x*1.15, p.y*1.15 + t*0.125, p.z*1.15 - t*0.095));
}
`;

// ─── Vertex Shader ─────────────────────────────────────────────────────────
// Uses 3D position (not UV) for EVERYTHING — avoids all UV seam artefacts.
// Use screen-space derivatives for the displaced surface normal, avoiding
// repeated noise samples at neighboring vertices.
const vertexShader = SNOISE + /* glsl */`
uniform float u_time;

varying vec3  vPos;        // displaced object-space position
varying vec3  vWorldPos;   // world-space position for lighting

void main(){
  // ── 1. Base displacement ────────────────────────────────────────────────
  float d0 = displacement(position, u_time);

  // ── 2. Apply restrained displacement for a smooth, rounded silhouette ───
  vec3 displaced = position + normal * (d0 * 0.17);
  vPos     = displaced;
  vWorldPos = (modelMatrix * vec4(displaced, 1.0)).xyz;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(displaced, 1.0);
}
`;

// ─── Fragment Shader ────────────────────────────────────────────────────────
// DoubleSide-aware: flips normal for back faces using gl_FrontFacing.
// 4-colour spatial blend + 3-point Phong lighting.
// ALL highlights colour-tinted — zero white blowout.
const fragmentShader = /* glsl */`
uniform vec3  u_colorA;
uniform vec3  u_colorB;
uniform vec3  u_colorC;
uniform vec3  u_colorD;
uniform float u_time;

varying vec3  vPos;
varying vec3  vWorldPos;

void main(){
  // ── Back-face correction ────────────────────────────────────────────────
  vec3 N = normalize(cross(dFdx(vWorldPos), dFdy(vWorldPos)));
  bool isFront = gl_FrontFacing;
  if (!isFront) N = -N;

  vec3 V = normalize(cameraPosition - vWorldPos);

  // ── 4-colour spatial blend ──────────────────────────────────────────────
  // Linear vertical — ensures the full A↔B gradient is always visible
  float tv = clamp((vPos.y + 1.3) / 2.6, 0.0, 1.0);

  // Sinusoidal horizontal + animated wave — cycles through all 4 colours
  // across the blob surface so every hue is clearly seen at some point
  float th = 0.5 + 0.5 * sin(vPos.x * 1.6 + vPos.z * 0.9 + u_time * 0.20);

  vec3 topRow   = mix(u_colorA, u_colorC, th);   // A ↔ C along top
  vec3 botRow   = mix(u_colorB, u_colorD, th);   // B ↔ D along bottom
  vec3 baseColor = mix(botRow, topRow, tv);

  // ── 3-point lighting ────────────────────────────────────────────────────
  vec3  Lkey = normalize(vec3(1.0, 1.4, 2.5));
  float diff  = max(0.0, dot(N, Lkey));

  vec3  H    = normalize(Lkey + V);
  float spec = pow(max(0.0, dot(N, H)), 38.0);

  float fill = max(0.0, dot(N, normalize(vec3(-0.7, -0.5, 0.8)))) * 0.20;

  float rim  = pow(clamp(1.0 - dot(N, V), 0.0, 1.0), 2.8);

  // ── Compose ─────────────────────────────────────────────────────────────
  vec3 ambient   = baseColor * 0.40;
  vec3 diffuse   = baseColor * (diff + fill) * 0.68;

  // Specular: tinted blend of C and A — highlights bump topology in colour
  vec3 specularC = mix(u_colorC, u_colorA, 0.40) * spec * 0.58;

  // Rim: blend of colorA + colorD so two hues share the edge — not one dominant
  vec3 rimColor  = mix(u_colorA, u_colorD, 0.55) * 1.45 * rim;

  vec3 color = ambient + diffuse + specularC + rimColor;

  // Dim back-faces slightly — adds extra perceived depth / 3D volume
  if (!isFront) color *= 0.60;

  gl_FragColor = vec4(color, 1.0);
}
`;


// ─── BlobMesh ───────────────────────────────────────────────────────────────
function BlobMesh({ isDark, onReady }) {
  const meshRef     = useRef();
  const materialRef = useRef();
  const hasSignaled = useRef(false);

  const { viewport }        = useThree();
  const prefersReducedMotion = useReducedMotion();

  const scrollProgress = useRef(null);
  const prevScroll     = useRef(0);
  const scrollVelocity = useRef(0);

  // Light mode (multiply blend) — vibrant Apple palette
  // Dark mode (screen blend) — luminous neon Apple colors
  const uniforms = useMemo(() => ({
    u_time:   { value: 0.0 },
    u_colorA: { value: new THREE.Color(isDark ? "#0071e3" : "#5856d6") },
    u_colorB: { value: new THREE.Color(isDark ? "#bf5af2" : "#ff2d55") },
    u_colorC: { value: new THREE.Color(isDark ? "#30d158" : "#ff9500") },
    u_colorD: { value: new THREE.Color(isDark ? "#5ac8fa" : "#5ac8fa") },
  }), [isDark]);

  useFrame((state, delta) => {
    if (!meshRef.current || !materialRef.current) return;

    const time = state.clock.getElapsedTime();
    const motionEnabled = !prefersReducedMotion;
    const scrollRange = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
    const targetScroll = motionEnabled ? THREE.MathUtils.clamp(window.scrollY / scrollRange, 0, 1) : 0;
    // Mobile browser chrome changes the visual viewport while scrolling. Ease
    // the page-driven parallax so those small viewport/scroll jumps never
    // snap the blob when the user reverses scroll direction.
    if (scrollProgress.current === null) {
      scrollProgress.current = targetScroll;
      prevScroll.current = targetScroll;
    } else {
      scrollProgress.current = THREE.MathUtils.damp(
        scrollProgress.current,
        targetScroll,
        4.5,
        Math.min(delta, 0.05)
      );
    }
    const scroll = scrollProgress.current;

    materialRef.current.uniforms.u_time.value = motionEnabled ? time : 0;
    // Signal ready after first successful frame
    if (!hasSignaled.current) {
      hasSignaled.current = true;
      onReady?.();
    }

    // Scroll velocity → reactive Z lean
    const scrollDelta = scroll - prevScroll.current;
    const targetVelocity = motionEnabled && delta > 0
      ? THREE.MathUtils.clamp((scrollDelta / delta) * 0.08, -1, 1)
      : 0;
    scrollVelocity.current = THREE.MathUtils.damp(
      scrollVelocity.current,
      targetVelocity,
      6,
      Math.min(delta, 0.05)
    );
    prevScroll.current = scroll;

    // Scale
    const baseScale = Math.min(viewport.width, viewport.height) * 0.38;
    let scale = baseScale;

    // Y parallax — reduced range so blob drifts less on its own
    let yOffset;
    if (scroll > 0.95) {
      const excess = (scroll - 0.95) / 0.05;
      yOffset = THREE.MathUtils.lerp(-viewport.height * 0.035, -viewport.height * 0.18, excess);
      scale   = baseScale * (1 + excess * 0.10);
    } else {
      yOffset = THREE.MathUtils.lerp(viewport.height * 0.035, -viewport.height * 0.035, scroll / 0.95);
    }

    // Entrance animation: smooth growth and initial spin
    const entranceRaw = motionEnabled ? Math.min(time / 1.4, 1.0) : 1;
    const easeOutExpo = entranceRaw === 1 ? 1 : 1 - Math.pow(2, -10 * entranceRaw);

    scale = scale * (0.96 + 0.04 * easeOutExpo);
    meshRef.current.scale.setScalar(scale);

    // X drift — sinusoidal across sections. Start slightly right.
    const xBaseOffset = viewport.width * 0.10;
    const xDrift = xBaseOffset + (motionEnabled ? Math.sin(scroll * Math.PI * 1.5) * viewport.width * 0.14 : 0);
    meshRef.current.position.set(xDrift, yOffset, 0);

    // Initial spin that slows down as it reaches full size
    const initialSpin = motionEnabled ? (1 - easeOutExpo) * 0.18 : 0;

    // Rotation follows only the blob's idle motion and page scroll.
    meshRef.current.rotation.x = THREE.MathUtils.lerp(
      meshRef.current.rotation.x,
      motionEnabled ? scroll * 0.4 + initialSpin * 0.5 : 0,
      0.04
    );
    meshRef.current.rotation.y = THREE.MathUtils.lerp(
      meshRef.current.rotation.y,
      motionEnabled ? time * 0.006 + scrollVelocity.current * 0.12 + initialSpin : 0,
      0.04
    );
    meshRef.current.rotation.z = THREE.MathUtils.lerp(
      meshRef.current.rotation.z,
      motionEnabled ? scrollVelocity.current * 0.07 + initialSpin * 0.2 : 0,
      0.05
    );
  });

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[1, 128]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        // ── KEY FIX: render both front AND back faces ──────────────────────
        // Noise can fold the mesh inward; without DoubleSide those concavities
        // appear as black holes. DoubleSide fills them, and the fragment shader
        // flips the normal for back faces (gl_FrontFacing) for correct shading.
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

// ─── Canvas wrapper ──────────────────────────────────────────────────────────
export default function WebGLBlob() {
  const { mode } = useTheme();
  const isDark   = mode === "dark";
  const { setBlobReady } = useLoading();

  return (
    <div
      className="fixed inset-0 z-[0] pointer-events-none"
      style={{
        mixBlendMode: isDark ? "screen" : "multiply",
        opacity: isDark ? 0.85 : 0.45,
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true }}
      >
        <BlobMesh isDark={isDark} onReady={setBlobReady} />
      </Canvas>
    </div>
  );
}
