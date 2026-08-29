// src/components/RoseDraw.jsx
// A realistic red-rose bouquet that draws itself via SVG stroke animation:
// wrapper paper, ribbon bow, stems, leaves and clustered red roses.
import { motion } from 'framer-motion';

const RED = '#d50032';
const DARKRED = '#9e1b32';
const GREEN = '#1f7a3d';
const LEAF = '#2e8b57';
const WRAP = '#f4e9d8';

// Rose flower as a group of layered petals (rendered around a centroid)
const RoseFlower = ({ x, y, s, drawDelay, fillDelay }) => {
  const dims = [
    [0, 0, s * 0.5, s * 0.62], // center
    [-s * 0.42, -s * 0.18, s * 0.5, s * 0.55], // left
    [s * 0.42, -s * 0.18, s * 0.5, s * 0.55], // right
    [0, -s * 0.5, s * 0.4, s * 0.5], // top
    [0, s * 0.38, s * 0.46, s * 0.5], // bottom
  ];
  return (
    <g>
      {dims.map((d, i) => (
        <motion.ellipse
          key={i}
          cx={x + d[0]}
          cy={y + d[1]}
          rx={d[2]}
          ry={d[3]}
          fill="none"
          stroke={RED}
          strokeWidth={3.5}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: drawDelay + i * 0.12, duration: 0.25, ease: 'easeInOut' }}
        />
      ))}
      {/* red fill */}
      <motion.g
        opacity="0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.9 }}
        transition={{ delay: fillDelay, duration: 0.5 }}
      >
        {dims.map((d, i) => (
          <ellipse key={i} cx={x + d[0]} cy={y + d[1]} rx={d[2]} ry={d[3]} fill={RED} />
        ))}
        <circle cx={x} cy={y} r={s * 0.16} fill={DARKRED} />
      </motion.g>
    </g>
  );
};

const RoseDraw = ({ size = 260, duration = 4 }) => {
  const roses = [
    { x: 200, y: 118, s: 40 },
    { x: 120, y: 130, s: 34 },
    { x: 280, y: 130, s: 34 },
    { x: 150, y: 88, s: 30 },
    { x: 250, y: 88, s: 30 },
    { x: 200, y: 66, s: 28 },
  ];
  // stems converging to a holder point
  const stems = roses.map((r) => `M${r.x} ${r.y + r.s * 0.7} C${r.x} ${r.y + 90} 210 250 200 300`);

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 400 380"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'block' }}
    >
      <motion.circle
        cx="200"
        cy="170"
        r="130"
        fill="#ff5e8a"
        opacity="0.12"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.12 }}
        transition={{ duration: 1.2 }}
      />

      {/* wrapper paper cone */}
      <motion.path
        d="M150 300 C160 340 240 340 250 300 L238 262 C226 288 174 288 162 262 Z"
        fill={WRAP}
        stroke="#d8c3a0"
        strokeWidth={2}
        opacity="0"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1] }}
        transition={{ delay: duration * 0.6, duration: 0.5 }}
      />

      {/* ribbon bow */}
      <motion.g opacity="0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: duration * 0.75, duration: 0.4 }}>
        <path d="M200 268 C150 248 150 292 200 278 C250 292 250 248 200 268 Z" fill={RED} />
        <path d="M200 258 V300" stroke={RED} strokeWidth={8} strokeLinecap="round" />
        <circle cx="200" cy="268" r="9" fill={DARKRED} />
      </motion.g>

      {/* stems (draw onward) */}
      {stems.map((d, i) => (
        <motion.path
          key={`stem${i}`}
          d={d}
          stroke={GREEN}
          strokeWidth={6}
          fill="none"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: i * 0.25, duration: 1.2, ease: 'easeInOut' }}
        />
      ))}

      {/* leaves */}
      <motion.path
        d="M200 245 C170 232 158 214 168 202"
        stroke={LEAF}
        strokeWidth={5}
        fill="none"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ delay: 1.6, duration: 0.6 }}
      />
      <motion.path
        d="M190 265 C220 252 232 234 222 222"
        stroke={LEAF}
        strokeWidth={5}
        fill="none"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ delay: 1.9, duration: 0.6 }}
      />

      {/* roses */}
      {roses.map((r, i) => (
        <RoseFlower
          key={i}
          x={r.x}
          y={r.y}
          s={r.s}
          drawDelay={1.2 + i * 0.4}
          fillDelay={2.2 + i * 0.4}
        />
      ))}
    </svg>
  );
};

export default RoseDraw;
