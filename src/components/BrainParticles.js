import * as THREE from "three";

// Builds the particle brain on a canvas and exposes update(progress, time).
// Points come from public/intro/brain-points.png: R = brightness, G = depth,
// precomputed from a ChatGPT brain render. Brighter pixels get more points,
// which is dithering done in 3D.

// fewer particles on small screens, which are usually phones
const COUNT = typeof window !== "undefined" && window.innerWidth < 640 ? 26000 : 42000;
const STRETCH_X = 1.25; // brain is drawn 25% wider than the source render

const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uSize;
  uniform float uPixelRatio;
  uniform vec2 uMouse;
  attribute float aBright;
  attribute float aSeed;
  varying float vAlpha;

  void main() {
    vec3 p = position;
    // slow drift so the cloud feels alive
    p += 0.006 * vec3(sin(uTime * 0.8 + aSeed * 6.283), cos(uTime * 0.7 + aSeed * 9.1), sin(uTime * 0.6 + aSeed * 4.3));

    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;

    // push points away from the cursor, in screen space
    vec2 ndc = gl_Position.xy / gl_Position.w;
    vec2 away = ndc - uMouse;
    float push = smoothstep(0.22, 0.0, length(away));
    gl_Position.xy += normalize(away + 1e-5) * push * 0.035 * gl_Position.w;

    gl_PointSize = uSize * (0.55 + aBright * 0.9) * uPixelRatio / -mv.z;
    vAlpha = 0.18 + 0.82 * aBright;
  }
`;

const fragmentShader = /* glsl */ `
  uniform vec3 uColor;
  varying float vAlpha;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    if (d > 0.5) discard;
    gl_FragColor = vec4(uColor, smoothstep(0.5, 0.1, d) * vAlpha);
  }
`;

// Rounded-rectangle outline used for the glass tablet.
const roundedRect = (w, h, r) => {
  const s = new THREE.Shape();
  const x = -w / 2, y = -h / 2;
  s.moveTo(x + r, y);
  s.lineTo(x + w - r, y);
  s.quadraticCurveTo(x + w, y, x + w, y + r);
  s.lineTo(x + w, y + h - r);
  s.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  s.lineTo(x + r, y + h);
  s.quadraticCurveTo(x, y + h, x, y + h - r);
  s.lineTo(x, y + r);
  s.quadraticCurveTo(x, y, x + r, y);
  return s;
};

const loadPoints = (src) =>
  new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const c = document.createElement("canvas");
      c.width = img.width;
      c.height = img.height;
      const ctx = c.getContext("2d", { willReadFrequently: true });
      ctx.drawImage(img, 0, 0);
      const { data, width, height } = ctx.getImageData(0, 0, c.width, c.height);

      // importance-sample pixels by brightness (plus a floor inside the brain)
      const weights = new Float32Array(width * height);
      let total = 0;
      for (let i = 0; i < width * height; i++) {
        const b = data[i * 4] / 255;
        const inside = data[i * 4 + 3] > 0;
        const w = inside ? 0.04 + Math.pow(b, 1.7) : 0;
        total += w;
        weights[i] = total;
      }
      const pos = new Float32Array(COUNT * 3);
      const bright = new Float32Array(COUNT);
      const seed = new Float32Array(COUNT);
      const scale = 2 / width; // brain spans 2 units across
      for (let n = 0; n < COUNT; n++) {
        const r = Math.random() * total;
        let lo = 0, hi = weights.length - 1;
        while (lo < hi) {
          const mid = (lo + hi) >> 1;
          if (weights[mid] < r) lo = mid + 1; else hi = mid;
        }
        const px = (lo % width) + Math.random();
        const py = Math.floor(lo / width) + Math.random();
        const b = data[lo * 4] / 255;
        const depth = data[lo * 4 + 1] / 255;
        // a quarter of the points form a dimmer back surface, for volume
        const back = Math.random() < 0.22 ? -0.7 : 1;
        pos[n * 3] = (px - width / 2) * scale;
        pos[n * 3 + 1] = -(py - height / 2) * scale;
        pos[n * 3 + 2] = depth * 0.42 * back;
        bright[n] = back < 0 ? b * 0.35 : b;
        seed[n] = Math.random();
      }
      resolve({ pos, bright, seed, aspect: width / height });
    };
    img.onerror = reject;
    img.src = src;
  });

export const createBrainScene = async (canvas) => {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: false, alpha: true, powerPreference: "high-performance" });
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  renderer.setPixelRatio(dpr);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(35, 1, 0.05, 100);
  const group = new THREE.Group();
  scene.add(group);

  const { pos, bright, seed, aspect } = await loadPoints("/intro/brain-points.png");
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(pos, 3));
  geometry.setAttribute("aBright", new THREE.BufferAttribute(bright, 1));
  geometry.setAttribute("aSeed", new THREE.BufferAttribute(seed, 1));
  const material = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    uniforms: {
      uTime: { value: 0 },
      uSize: { value: 9 },
      uPixelRatio: { value: dpr },
      uMouse: { value: new THREE.Vector2(9, 9) },
      uColor: { value: new THREE.Color("#dbe4ff") },
    },
  });
  const brain = new THREE.Points(geometry, material);
  brain.scale.x = STRETCH_X;
  group.add(brain);

  // Glass tablet behind the brain. Its fill is the black: in the close-up it
  // is larger than the screen, and as the camera pulls back the black ends
  // exactly at the tablet's rounded edge. A faint sheen and edge read as glass.
  // generous padding: the brain takes up about 64% of the tablet each way
  const tabletW = 2 * STRETCH_X + 1.4, tabletH = Math.max(2.9, 2 / aspect + 1.0);
  const shape = roundedRect(tabletW, tabletH, 0.12);
  const tabletGeometry = new THREE.ShapeGeometry(shape, 12);
  const fillMat = new THREE.MeshBasicMaterial({ color: "#0b0b0d", transparent: true, opacity: 0, depthWrite: false });
  const fill = new THREE.Mesh(tabletGeometry, fillMat);
  fill.position.z = -0.52;
  fill.renderOrder = -2;
  const sheenMat = new THREE.MeshBasicMaterial({ color: "#ffffff", transparent: true, opacity: 0, depthWrite: false });
  const sheen = new THREE.Mesh(tabletGeometry, sheenMat);
  sheen.position.z = -0.5;
  sheen.renderOrder = -1;
  const edgeMat = new THREE.LineBasicMaterial({ color: "#ffffff", transparent: true, opacity: 0 });
  const edge = new THREE.LineLoop(new THREE.BufferGeometry().setFromPoints(shape.getPoints(24)), edgeMat);
  edge.position.z = -0.5;
  group.add(fill, sheen, edge);

  const mouse = new THREE.Vector2(9, 9);
  const target = new THREE.Vector2(9, 9);
  const onPointer = (e) => {
    const r = canvas.getBoundingClientRect();
    target.set(((e.clientX - r.left) / r.width) * 2 - 1, -(((e.clientY - r.top) / r.height) * 2 - 1));
  };
  const onLeave = () => target.set(9, 9);
  window.addEventListener("pointermove", onPointer, { passive: true });
  window.addEventListener("pointerleave", onLeave);

  // Camera distance that fits a box of size (bw, bh) to a share of the screen.
  const fitBox = (bw, bh, shareW, shareH) => {
    const t = 2 * Math.tan(THREE.MathUtils.degToRad(camera.fov) / 2);
    return Math.max(bh / shareH / t, bw / shareW / (t * camera.aspect));
  };
  const brainW = 2 * STRETCH_X, brainH = 2 / aspect;

  let startDistance = 3, fitDistance = 5;
  const resize = () => {
    const { clientWidth: w, clientHeight: h } = canvas;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    // Portrait phones are width-limited, so let the art use more of the width there.
    const portrait = camera.aspect < 0.8;
    // start: the brain nearly filling the screen; end: a much smaller tablet, for contrast
    startDistance = fitBox(brainW, brainH, portrait ? 0.95 : 0.91, 0.87);
    fitDistance = fitBox(tabletW, tabletH, portrait ? 0.8 : 0.52, 0.54);
  };
  resize();

  const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
  const range = (p, a, b) => Math.min(1, Math.max(0, (p - a) / (b - a)));

  // progress: 0..1 through the pinned part of the intro (already smoothed by
  // the caller). It is all pull-back; after it the page scrolls normally.
  const update = (progress, time) => {
    const zoom = ease(range(progress, 0, 1));

    camera.position.set(0, 0, THREE.MathUtils.lerp(startDistance, fitDistance, zoom));
    camera.lookAt(0, 0, 0);

    // The page's full-screen black covers the close-up; the tablet's own black
    // takes over as the camera pulls back, so no edge shows in the opening frame.
    fillMat.opacity = Math.min(1, zoom * 2.5);
    const glassIn = range(progress, 0.45, 0.95);
    sheenMat.opacity = 0.05 * glassIn;
    edgeMat.opacity = 0.4 * glassIn;

    mouse.lerp(target, 0.08);
    material.uniforms.uMouse.value.copy(mouse);
    material.uniforms.uTime.value = time;
    material.uniforms.uSize.value = 9 * (1 - 0.3 * (1 - zoom)); // slightly smaller points when closer
    renderer.render(scene, camera);

    // How much the page grid should scale to zoom out with the camera.
    return { zoom, gridScale: fitDistance / camera.position.z };
  };

  const dispose = () => {
    window.removeEventListener("pointermove", onPointer);
    window.removeEventListener("pointerleave", onLeave);
    geometry.dispose();
    material.dispose();
    tabletGeometry.dispose();
    fillMat.dispose();
    sheenMat.dispose();
    edge.geometry.dispose();
    edgeMat.dispose();
    renderer.dispose();
  };

  return { update, resize, dispose };
};
