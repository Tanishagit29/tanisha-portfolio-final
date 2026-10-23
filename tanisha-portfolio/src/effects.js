import { useEffect } from "react";

const RIPPLE_SEL = ".btn, nav a, #theme, .chips li, .tags li, .proj, .soc a";
const MAGNET_SEL = ".btn, #theme, .logo";
const TILT_SEL = ".proj";
const reduced = () => matchMedia("(prefers-reduced-motion: reduce)").matches;

export function useTouchEffects() {
  useEffect(() => {
    const noMotion = reduced();
    const cleanups = [];
    const on = (t, e, f, o) => { t.addEventListener(e, f, o); cleanups.push(() => t.removeEventListener(e, f, o)); };
    const make = (cls) => { const d = document.createElement("div"); d.className = cls; document.body.appendChild(d); cleanups.push(() => d.remove()); return d; };

    // scroll progress bar
    const bar = make("progress");
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - innerHeight;
      bar.style.transform = `scaleX(${h > 0 ? scrollY / h : 0})`;
    };
    on(window, "scroll", onScroll, { passive: true });
    onScroll();

    // career journey: fill the centre line as you scroll, reveal cards + glow dots
    const cj = document.querySelector(".cj");
    const cjUpdate = () => {
      if (!cj) return;
      const r = cj.getBoundingClientRect();
      const h = Math.min(Math.max(innerHeight * 0.6 - r.top, 0), r.height);
      cj.style.setProperty("--fill", h + "px");
      cj.querySelectorAll(".cj-item").forEach((it) => it.classList.toggle("on", it.offsetTop + 35 <= h || noMotion));
    };
    on(window, "scroll", cjUpdate, { passive: true });
    on(window, "resize", cjUpdate);
    cjUpdate();

    // soft ambient glow (subtle)
    const glow = make("touch-glow");

    on(window, "pointermove", (e) => {
      glow.style.opacity = "1";
      glow.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
    }, { passive: true });
    on(window, "pointerup", (e) => { if (e.pointerType !== "mouse") glow.style.opacity = "0"; });
    on(document, "pointerleave", () => (glow.style.opacity = "0"));

    // tap ripple + light haptic
    on(window, "pointerdown", (e) => {
      if (noMotion) return;
      const el = e.target.closest?.(RIPPLE_SEL);
      if (!el) return;
      const r = el.getBoundingClientRect();
      const size = Math.max(r.width, r.height) * 2;
      const rip = document.createElement("span");
      rip.className = "ripple";
      Object.assign(rip.style, {
        width: size + "px", height: size + "px",
        left: e.clientX - r.left - size / 2 + "px",
        top: e.clientY - r.top - size / 2 + "px",
      });
      el.classList.add("rip-host");
      el.appendChild(rip);
      rip.addEventListener("animationend", () => rip.remove());
      navigator.vibrate?.(6);
    }, { passive: true });

    if (!noMotion) {
      // magnetic buttons (mouse only)
      on(window, "pointermove", (e) => {
        if (e.pointerType !== "mouse") return;
        document.querySelectorAll(MAGNET_SEL).forEach((m) => {
          const r = m.getBoundingClientRect();
          const cx = r.left + r.width / 2, cy = r.top + r.height / 2;
          const dx = e.clientX - cx, dy = e.clientY - cy;
          const near = Math.hypot(dx, dy) < Math.max(r.width, r.height) * 0.9;
          m.style.setProperty("--tx", near ? `${dx * 0.18}px` : "0px");
          m.style.setProperty("--ty", near ? `${dy * 0.25}px` : "0px");
        });
      }, { passive: true });

      // card tilt + spotlight
      const tilt = (e) => {
        const c = e.target.closest?.(TILT_SEL);
        if (!c) return;
        const r = c.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        c.style.setProperty("--ry", `${x * 8}deg`);
        c.style.setProperty("--rx", `${-y * 8}deg`);
        c.style.setProperty("--mx", `${(x + 0.5) * 100}%`);
        c.style.setProperty("--my", `${(y + 0.5) * 100}%`);
        c.classList.add("tilting");
      };
      const reset = () => document.querySelectorAll(`${TILT_SEL}.tilting`).forEach((c) => {
        c.classList.remove("tilting");
        c.style.setProperty("--rx", "0deg");
        c.style.setProperty("--ry", "0deg");
      });
      on(window, "pointermove", tilt, { passive: true });
      on(window, "pointerdown", tilt, { passive: true });
      on(window, "pointerup", reset);
      on(window, "pointercancel", reset);
      on(document, "pointerout", (e) => { if (e.target.closest?.(TILT_SEL) && !e.relatedTarget?.closest?.(TILT_SEL)) reset(); });
    }

    // active nav link on scroll
    const links = [...document.querySelectorAll("nav ul a")];
    const secs = links.map((a) => document.querySelector(a.getAttribute("href"))).filter(Boolean);
    if ("IntersectionObserver" in window) {
      const spy = new IntersectionObserver((entries) => entries.forEach((en) => {
        if (en.isIntersecting) links.forEach((a) => a.classList.toggle("active", a.getAttribute("href") === "#" + en.target.id));
      }), { rootMargin: "-40% 0px -55% 0px" });
      secs.forEach((s) => spy.observe(s));
      cleanups.push(() => spy.disconnect());
    }

    // scroll reveal
    const targets = document.querySelectorAll(".blk h2, .about, .tl > div, .proj, .chips li, .sub, .skillcard");
    if (noMotion || !("IntersectionObserver" in window)) {
      targets.forEach((t) => t.classList.add("in"));
    } else {
      const io = new IntersectionObserver((entries) => entries.forEach((en) => {
        if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
      }), { threshold: 0.12 });
      targets.forEach((t, i) => { if (!t.classList.contains("skillcard")) { t.classList.add("reveal"); t.style.transitionDelay = `${(i % 4) * 70}ms`; } io.observe(t); });
      cleanups.push(() => io.disconnect());
    }

    return () => cleanups.forEach((f) => f());
  }, []);
}
