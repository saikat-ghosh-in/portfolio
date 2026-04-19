import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useScroll, useSpring, useMotionValue } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
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

// Two-octave displacement evaluated at point p at time t
float displacement(vec3 p, float t){
  float n1 = snoise(vec3(p.x*1.3, p.y*1.3 + t*0.32, p.z*1.3 - t*0.22));
  float n2 = snoise(vec3(p.x*2.6+0.5, p.y*2.6 - t*0.50, p.z*2.6 + t*0.38)) * 0.30;
  return n1 + n2;
}
`;

// ─── Vertex Shader ─────────────────────────────────────────────────────────
// Uses 3D position (not UV) for EVERYTHING — avoids all UV seam artefacts.
// Forward-difference gradient → perturbed normals for real front-face 3D shading.
const vertexShader = SNOISE + /* glsl */`
uniform float u_time;
uniform vec2  u_mouse;     // NDC mouse position (-1 to +1)

varying vec3  vPos;        // displaced object-space position
varying vec3  vNorm;       // noise-perturbed normal
varying vec3  vWorldPos;   // world-space position for lighting

void main(){
  // ── 1. Base displacement ────────────────────────────────────────────────
  float d0 = displacement(position, u_time);

  // ── 2. Finite-difference gradient → perturbed normal ───────────────────
  // All sampling in 3D object-space — zero UV seam artefacts
  float eps = 0.04;
  float dx  = displacement(position + vec3(eps, 0.0, 0.0), u_time);
  float dy  = displacement(position + vec3(0.0, eps, 0.0), u_time);
  float dz  = displacement(position + vec3(0.0, 0.0, eps), u_time);
  vec3  grad = vec3(dx-d0, dy-d0, dz-d0) / eps;
  vNorm = normalize(normal - grad * 0.28);

  // ── 3. Cloud-puff mouse interaction using 3D direction ──────────────────
  // Map mouse NDC to a direction on the unit sphere — seamless everywhere
  vec3  mouseDir = normalize(vec3(u_mouse.x * 1.1, u_mouse.y * 1.1, 1.6));
  float cosA     = dot(normalize(position), mouseDir);
  float mdist    = 1.0 - max(cosA, 0.0);   // 0 = facing mouse, 1 = away

  float puff  = exp(-mdist * mdist * 6.0)  * 0.32;
  float ring  = smoothstep(0.55, 0.40, mdist) * smoothstep(0.22, 0.40, mdist) * 0.09;
  // Swirl uses 3D position + time — no seam
  float swirl = snoise(position * 2.5 + vec3(u_mouse.x, u_mouse.y, 0.0) * 0.9
                       + vec3(0.0, 0.0, u_time * 0.55))
                * 0.06 * exp(-mdist * mdist * 9.0);

  float mInfluence = puff + ring + swirl;

  // ── 4. Apply displacement (conservative amplitude to avoid deep concavities)
  vec3 displaced = position + normal * (d0 * 0.22 + mInfluence);
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
varying vec3  vNorm;
varying vec3  vWorldPos;

void main(){
  // ── Back-face correction ────────────────────────────────────────────────
  vec3 N = normalize(vNorm);
  bool isFront = gl_FrontFacing;
  if (!isFront) N = -N;

  vec3 V = normalize(cameraPosition - vWorldPos);

  // ── 4-colour spatial blend ──────────────────────────────────────────────
  // Linear vertical — ensures the full A↔B gradient is always visible
  float tv = clamp((vPos.y + 1.3) / 2.6, 0.0, 1.0);

  // Sinusoidal horizontal + animated wave — cycles through all 4 colours
  // across the blob surface so every hue is clearly seen at some point
  float th = 0.5 + 0.5 * sin(vPos.x * 1.6 + vPos.z * 0.9 + u_time * 0.28);

  vec3 topRow   = mix(u_colorA, u_colorC, th);   // A ↔ C along top
  vec3 botRow   = mix(u_colorB, u_colorD, th);   // B ↔ D along bottom
  vec3 baseColor = mix(botRow, topRow, tv);

  // ── 3-point lighting ────────────────────────────────────────────────────
  vec3  Lkey = normalize(vec3(1.0, 1.4, 2.5));
  float diff  = max(0.0, dot(N, Lkey));

  vec3  H    = normalize(Lkey + V);
  float spec = pow(max(0.0, dot(N, H)), 30.0);

  float fill = max(0.0, dot(N, normalize(vec3(-0.7, -0.5, 0.8)))) * 0.20;

  float rim  = pow(clamp(1.0 - dot(N, V), 0.0, 1.0), 2.0);

  // ── Compose ─────────────────────────────────────────────────────────────
  vec3 ambient   = baseColor * 0.40;
  vec3 diffuse   = baseColor * (diff + fill) * 0.68;

  // Specular: tinted blend of C and A — highlights bump topology in colour
  vec3 specularC = mix(u_colorC, u_colorA, 0.40) * spec * 0.48;

  // Rim: blend of colorA + colorD so two hues share the edge — not one dominant
  vec3 rimColor  = mix(u_colorA, u_colorD, 0.55) * 1.35 * rim;

  vec3 color = ambient + diffuse + specularC + rimColor;

  // Dim back-faces slightly — adds extra perceived depth / 3D volume
  if (!isFront) color *= 0.60;

  gl_FragColor = vec4(color, 1.0);
}
`;


// ─── BlobMesh ───────────────────────────────────────────────────────────────
function BlobMesh({ isDark }) {
  const meshRef     = useRef();
  const materialRef = useRef();

  const { viewport }        = useThree();
  const { scrollYProgress } = useScroll();

  const prevScroll     = useRef(0);
  const scrollVelocity = useRef(0);

  // Floaty spring physics
  const mouseX       = useMotionValue(0);
  const mouseY       = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { damping: 30, stiffness: 28 });
  const smoothMouseY = useSpring(mouseY, { damping: 30, stiffness: 28 });

  useEffect(() => {
    const onMove = (e) => {
      const cx = e.touches ? e.touches[0].clientX : e.clientX;
      const cy = e.touches ? e.touches[0].clientY : e.clientY;
      mouseX.set((cx / window.innerWidth)  *  2 - 1);
      mouseY.set(-(cy / window.innerHeight) * 2 + 1);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("touchmove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchmove", onMove);
    };
  }, [mouseX, mouseY]);

  // ── Colour palettes ──────────────────────────────────────────────────────
  //
  // Light mode (multiply blend) — use vivid, fully saturated hues so that
  // even at 0.60 opacity through multiply they look POPPY, not greyed-out.
  //   A — bright violet   #a855f7   (Tailwind purple-500)
  //   B — hot rose        #f43f5e   (Tailwind rose-500)
  //   C — vivid orange    #fb923c   (Tailwind orange-400)
  //   D — electric cyan   #22d3ee   (Tailwind cyan-400)
  //
  // Dark mode (screen blend) — luminous neons
  //   A — electric indigo #4338ca
  //   B — vivid violet    #7c3aed
  //   C — neon cyan       #0891b2
  //   D — soft lavender   #a78bfa
  const uniforms = useMemo(() => ({
    u_time:   { value: 0.0 },
    u_mouse:  { value: new THREE.Vector2(0, 0) },
    u_colorA: { value: new THREE.Color(isDark ? "#4338ca" : "#a855f7") },
    u_colorB: { value: new THREE.Color(isDark ? "#7c3aed" : "#f43f5e") },
    u_colorC: { value: new THREE.Color(isDark ? "#0891b2" : "#fb923c") },
    u_colorD: { value: new THREE.Color(isDark ? "#a78bfa" : "#22d3ee") },
  }), [isDark]);

  useFrame((state) => {
    if (!meshRef.current || !materialRef.current) return;

    const time = state.clock.getElapsedTime();
    const rawScroll = scrollYProgress.get();
    const scroll    = Number.isFinite(rawScroll) ? rawScroll : 0;

    materialRef.current.uniforms.u_time.value = time;
    materialRef.current.uniforms.u_mouse.value.set(
      smoothMouseX.get(), smoothMouseY.get()
    );

    // Scroll velocity → reactive Z lean
    const delta = scroll - prevScroll.current;
    scrollVelocity.current = THREE.MathUtils.lerp(
      scrollVelocity.current, delta * 70, 0.14
    );
    prevScroll.current = scroll;

    // Scale
    const baseScale = Math.min(viewport.width, viewport.height) * 0.45;
    let scale = baseScale;

    // Y parallax
    let yOffset;
    if (scroll > 0.95) {
      const excess = (scroll - 0.95) / 0.05;
      yOffset = THREE.MathUtils.lerp(-viewport.height * 0.1, -viewport.height * 0.5, excess);
      scale   = baseScale * (1 + excess * 0.28);
    } else {
      yOffset = THREE.MathUtils.lerp(viewport.height * 0.12, -viewport.height * 0.12, scroll / 0.95);
    }
    meshRef.current.scale.setScalar(scale);

    // X drift — sinusoidal across sections. Start slightly right.
    const xBaseOffset = viewport.width * 0.15;
    const xDrift = xBaseOffset + Math.sin(scroll * Math.PI * 1.5) * viewport.width * 0.17;
    meshRef.current.position.set(xDrift, yOffset, 0);

    // Rotation
    meshRef.current.rotation.x = THREE.MathUtils.lerp(
      meshRef.current.rotation.x,
      -smoothMouseY.get() * 0.40 + scroll * 0.72,
      0.04
    );
    meshRef.current.rotation.y = THREE.MathUtils.lerp(
      meshRef.current.rotation.y,
      smoothMouseX.get() * 0.40 + time * 0.024 + scrollVelocity.current * 0.26,
      0.04
    );
    meshRef.current.rotation.z = THREE.MathUtils.lerp(
      meshRef.current.rotation.z,
      scrollVelocity.current * 0.12,
      0.07
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

  return (
    <div
      className="fixed inset-0 z-[0] pointer-events-none"
      style={{
        mixBlendMode: isDark ? "screen" : "multiply",
        // Light: 0.62 — vibrant poppy colours are vivid enough at this level
        // Dark:  0.72 — additive glow on black
        opacity: isDark ? 0.72 : 0.62,
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true }}
      >
        <BlobMesh isDark={isDark} />
      </Canvas>
    </div>
  );
}
