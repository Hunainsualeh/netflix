"use client";

import { motion } from "framer-motion";
import { BRAND } from "@/lib/config";

/** The FAKIHA wordmark, in the same tall, red, condensed style as the platform it parodies. */
export function Logo({ className = "", onClick }: { className?: string; onClick?: () => void }) {
  const inner = (
    <span
      className={`select-none font-logo uppercase leading-none tracking-[0.04em] text-nf-red [text-shadow:0_2px_0_rgba(0,0,0,0.35)] ${className}`}
      style={{ fontSize: "inherit" }}
    >
      {BRAND}
    </span>
  );
  if (onClick) {
    return (
      <button onClick={onClick} aria-label={`${BRAND} home`} className="block">
        {inner}
      </button>
    );
  }
  return inner;
}

/** Big animated intro logo (letters fall in, light streak sweeps). */
export function SplashLogo({ size = "clamp(64px, 20vw, 190px)" }: { size?: string }) {
  const letters = BRAND.split("");
  return (
    <div className="relative inline-block overflow-hidden px-2" style={{ fontSize: size }}>
      <div className="flex font-logo uppercase leading-[0.9] text-nf-red [text-shadow:0_6px_0_rgba(120,0,0,0.65),0_0_40px_rgba(229,9,20,0.35)]">
        {letters.map((l, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, scaleY: 1.6, y: -40, filter: "blur(12px)" }}
            animate={{ opacity: 1, scaleY: 1, y: 0, filter: "blur(0px)" }}
            transition={{ delay: 0.5 + i * 0.1, duration: 0.9, ease: [0.2, 0.8, 0.2, 1] }}
            className="inline-block tracking-[0.03em]"
          >
            {l}
          </motion.span>
        ))}
      </div>
      <div className="logo-streak" />
    </div>
  );
}
