"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

function Counter({ target, suffix }: { target: number; suffix: string }) {
  const ref = useRef<HTMLHeadingElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let current = 0;
    const step = Math.max(1, Math.ceil(target / 40));
    const tick = () => {
      current += step;
      if (current >= target) {
        setValue(target);
      } else {
        setValue(current);
        requestAnimationFrame(tick);
      }
    };
    tick();
  }, [inView, target]);

  return (
    <h3
      ref={ref}
      className="grad-text font-display text-4xl font-bold md:text-5xl"
    >
      {value}
      {suffix}
    </h3>
  );
}

const STATS = [
  {
    target: 6,
    suffix: "+",
    label: "product categories we engineer",
  },
  {
    target: 30,
    suffix: "+",
    label: "technologies in our stack",
  },
  {
    target: 100,
    suffix: "%",
    label: "code ownership — it's your product",
  },
];

export default function Hero() {
  return (
    <section className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 pb-20 pt-36 text-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="mb-9 inline-flex items-center gap-2.5 rounded-full border border-line bg-white/5 px-5 py-2 text-sm text-muted"
      >
        <span className="pulse-dot h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_12px_#34d399]" />
        AI Automation Agency & Software Development Company
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 34 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.15 }}
        className="max-w-5xl font-display text-5xl font-bold leading-[1.06] tracking-tight md:text-7xl"
      >
        We Build Technology
        <br />
        That Moves{" "}
        <span className="grad-text">Businesses Forward.</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 34 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-muted"
      >
        From AI chatbots and business automation to custom software, SaaS
        platforms and enterprise systems — ARBYNEX helps businesses reply to
        every customer instantly, automate operations and turn ideas into
        reliable, scalable technology.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 34 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.45 }}
        className="mt-11 flex flex-wrap justify-center gap-4"
      >
        <a
          href="#contact"
          className="grad-bg rounded-xl px-8 py-3.5 font-display font-semibold text-white shadow-[0_8px_30px_rgba(139,92,246,.35)] transition-all hover:-translate-y-1 hover:shadow-[0_14px_44px_rgba(139,92,246,.5)]"
        >
          Start Your Project →
        </a>
        <a
          href="#work"
          className="rounded-xl border border-line px-8 py-3.5 font-display font-semibold text-white transition-all hover:-translate-y-1 hover:border-violet"
        >
          View Our Work →
        </a>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 34 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="mt-20 flex flex-wrap justify-center gap-12 md:gap-20"
      >
        {STATS.map((s) => (
          <div key={s.label} className="max-w-[220px]">
            <Counter target={s.target} suffix={s.suffix} />
            <p className="mt-2 text-sm text-muted">{s.label}</p>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
