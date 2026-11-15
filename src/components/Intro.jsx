import React, { useEffect, useRef } from "react";
import { useScroll, useReducedMotion } from "framer-motion";

// Scroll-driven opening for the home page. A particle brain (three.js, see
// BrainParticles.js) starts in close-up, filling a black screen. Scrolling
// pulls the camera back: the grid zooms out with it and the black shrinks to
// the glass tablet behind the brain. The section unpins there, so the tablet
// scrolls away with the page and the site follows directly.

const Intro = () => {
  const ref = useRef(null);
  const canvasRef = useRef(null);
  const stickyRef = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    let scene = null;
    let frame = 0;
    let visible = true;
    let smoothed = reduce ? 1 : scrollYProgress.get();
    let cancelled = false;
    const start = performance.now();

    // Only render while the intro is on screen.
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible && scene && !frame) frame = requestAnimationFrame(tick);
    });
    io.observe(ref.current);

    const tick = () => {
      frame = 0;
      if (!scene || !visible) return;
      const target = reduce ? 1 : scrollYProgress.get();
      smoothed += (target - smoothed) * 0.12; // ease toward the scroll position
      const { zoom, gridScale } = scene.update(smoothed, (performance.now() - start) / 1000);
      // Hand the camera state to CSS: grid spacing and the black fade.
      const el = stickyRef.current;
      if (el) {
        el.style.setProperty("--grid", `${(28 * gridScale).toFixed(2)}px`);
        el.style.setProperty("--zoom", zoom.toFixed(3));
      }
      frame = requestAnimationFrame(tick);
    };

    const onResize = () => scene?.resize();
    import("./BrainParticles").then(async ({ createBrainScene }) => {
      if (cancelled) return;
      scene = await createBrainScene(canvas);
      if (cancelled) { scene.dispose(); return; }
      window.addEventListener("resize", onResize);
      frame = requestAnimationFrame(tick);
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
      io.disconnect();
      window.removeEventListener("resize", onResize);
      scene?.dispose();
    };
  }, [reduce, scrollYProgress]);

  return (
    <section ref={ref} className={`relative ${reduce ? "h-[100dvh]" : "h-[220vh]"}`}>
      <div ref={stickyRef} className="intro-sticky sticky top-0 h-[100dvh] overflow-hidden">
        <div className="intro-paper absolute inset-0" />
        <div className="intro-stage absolute inset-0" />
        <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-label="Particle illustration of a brain" role="img" />
      </div>
    </section>
  );
};

export default Intro;
