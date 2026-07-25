"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/cn";

interface SectionTitleProps {
  eyebrow: string;
  title: string;
  description?: string;
  center?: boolean;
  className?: string;
}

export default function SectionTitle({
  eyebrow,
  title,
  description,
  center = false,
  className,
}: SectionTitleProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className={cn(center && "text-center", className)}
    >
      <p className="mb-3 text-sm uppercase tracking-[0.35em] text-[#8A6E4A]">
        {eyebrow}
      </p>

      <h2 className="font-heading text-4xl leading-tight text-[#2F2B27] md:text-6xl">
        {title}
      </h2>

      {description && (
        <p
          className={cn(
            "mt-6 max-w-3xl text-lg leading-8 text-neutral-600",
            center && "mx-auto"
          )}
        >
          {description}
        </p>
      )}
    </motion.div>
  );
}