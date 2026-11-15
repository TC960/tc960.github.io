import React from "react";

// Dithered brain, one transparent layer per lobe (public/brain/, generated
// from a color-coded render: lobes split by tint, Atkinson-dithered in ink).
// The active lobe lifts off the surface on a frosted glass tablet.
// cx/cy: lobe centroid as a fraction of the image, used to push it outward.
const LOBES = [
  { id: "brainstem", cx: 0.548, cy: 0.818 },
  { id: "cerebellum", cx: 0.725, cy: 0.722 },
  { id: "occipital", cx: 0.891, cy: 0.456 },
  { id: "temporal", cx: 0.526, cy: 0.546, label: "Temporal lobe", section: "Writing" },
  { id: "parietal", cx: 0.661, cy: 0.235, label: "Parietal lobe", section: "Projects" },
  { id: "frontal", cx: 0.27, cy: 0.318, label: "Frontal lobe", section: "Experience" },
];

const CENTER = { x: 0.56, y: 0.48 };
const PUSH = 26; // px the active lobe travels outward

const offset = ({ cx, cy }) => {
  const dx = cx - CENTER.x;
  const dy = cy - CENTER.y;
  const len = Math.hypot(dx, dy) || 1;
  return { x: (dx / len) * PUSH, y: (dy / len) * PUSH - 10 };
};

const BrainStack = ({ active = null, showLabel = true }) => {
  const current = LOBES.find((l) => l.id === active);

  return (
    <figure className="m-0">
      <div
        className="brain"
        role="img"
        aria-label="Dithered illustration of a brain. The lobe for the section you are reading lifts off the page."
        style={{ aspectRatio: "840 / 738" }}
      >
        {LOBES.map((lobe) => {
          const on = lobe.id === active;
          const { x, y } = offset(lobe);
          return (
            <div
              key={lobe.id}
              className="lobe"
              data-active={on || undefined}
              style={{ "--lift-x": `${x}px`, "--lift-y": `${y}px` }}
            >
              <div
                className="lobe-glass"
                style={{ maskImage: `url(/brain/glass-${lobe.id}.png)`, WebkitMaskImage: `url(/brain/glass-${lobe.id}.png)` }}
              />
              <img src={`/brain/lobe-${lobe.id}.png`} alt="" width="840" height="738" className="lobe-dots" />
            </div>
          );
        })}
      </div>
      {showLabel && (
        <figcaption className="mono mt-4 h-5" aria-live="polite">
          {current ? `${current.label} / ${current.section}` : ""}
        </figcaption>
      )}
    </figure>
  );
};

export default BrainStack;
