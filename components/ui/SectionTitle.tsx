"use client";

import { motion } from "framer-motion";

interface Props {
  eyebrow?: string;
  title: string;
  description?: string;
  center?: boolean;
}

export default function SectionTitle({
  eyebrow,
  title,
  description,
  center = false,
}: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: .6 }}
      className={center ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}
    >

      {eyebrow && (
        <p className="mb-3 text-xs uppercase tracking-[0.3em] text-[#8A6E4A] sm:text-sm sm:tracking-[0.4em]">
          {eyebrow}
        </p>
      )}

      <h2 className="font-heading text-3xl leading-tight text-[#23412D] sm:text-4xl lg:text-5xl">
        {title}
      </h2>

      {description && (
        <p className="mt-4 text-base leading-7 text-neutral-600 sm:mt-5 sm:text-lg sm:leading-8">
          {description}
        </p>
      )}

    </motion.div>
  );
}