import { useEffect, useRef } from "react";
import photo from "./assets/tanisha.jpg";
import { profile } from "./data.js";

const PIVOT_Y = 64; // where the strap meets the collar (matches .pivot top in CSS)

export default function IdCard() {
  const stage = useRef(null);
  const pivot = useRef(null);
  const idEl = useRef(null);
  const physics = useRef({ a: 0, v: 0, drag: false, moved: false, last: 0 });

  // restart the wobble animation
  const wobble = () => {
    const el = idEl.current;
    if (!el) return;
    el.classList.remove("flip");
    void el.offsetWidth;
    el.classList.add("flip");
  };

  // when the card lands (end of the drop), kick off the swing + wobble
  useEffect(() => {
    const t = setTimeout(() => {
      physics.current.v += 0.38;
      wobble();
    }, 900);
    return () => clearTimeout(t);
  }, []);

  // pendulum spring + idle sway
  useEffect(() => {
    let raf;
    const p = physics.current;
    const loop = (t) => {
      if (!p.drag) {
        const dt = Math.min((t - p.last) / 16.7 || 1, 3);
        p.v += (-0.012 * p.a - 0.012 * p.v) * dt;
        p.a += p.v * dt;
        p.v += Math.sin(t / 1800) * 0.0018 * dt;
      }
      p.last = t;
      if (pivot.current) pivot.current.style.transform = `rotate(${p.a}rad)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  const angle = (e) => {
    const r = stage.current.getBoundingClientRect();
    const dx = e.clientX - (r.left + r.width / 2);
    const dy = Math.max(e.clientY - (r.top + PIVOT_Y), 40);
    return Math.max(-1.1, Math.min(1.1, -Math.atan2(dx, dy)));
  };
  const down = (e) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    Object.assign(physics.current, { drag: true, moved: false, a: angle(e), v: 0 });
  };
  const move = (e) => {
    const p = physics.current;
    if (!p.drag) return;
    const n = angle(e);
    if (Math.abs(n - p.a) > 0.01) p.moved = true;
    p.v = (n - p.a) * 0.6;
    p.a = n;
  };
  const up = () => (physics.current.drag = false);

  return (
    <div className="stage" ref={stage}>
      {/* V-shaped lanyard (fixed) */}
      <div className="vstrap" aria-hidden="true">
        <i className="vs l" />
        <i className="vs r" />
      </div>
      {/* swinging part: collar + clip + card */}
      <div className="pivot" ref={pivot}>
        <div className="collar" />
        <div className="dropper">
        <div className="clip2" />
        <div
          className="id"
          ref={idEl}
          onPointerDown={down}
          onPointerMove={move}
          onPointerUp={up}
          onPointerCancel={up}
          onClick={() => {
            const p = physics.current;
            if (p.moved) return; // it was a drag, not a click
            p.v += (Math.random() < 0.5 ? -1 : 1) * 0.28;
            wobble();
          }}
        >
          <img className="idphoto" src={photo} alt={profile.name} />
        </div>
        </div>
      </div>
    </div>
  );
}
