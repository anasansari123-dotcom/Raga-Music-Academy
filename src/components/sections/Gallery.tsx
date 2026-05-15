"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ImageIcon } from "lucide-react";
import { galleryImages } from "@/lib/data";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";

const aspectClasses = [
  "aspect-[4/5]",
  "aspect-square",
  "aspect-[4/5]",
  "aspect-square",
  "aspect-[3/4]",
  "aspect-square",
];

function GalleryItem({
  src,
  alt,
  category,
  index,
}: {
  src: string;
  alt: string;
  category: string;
  index: number;
}) {
  const [failed, setFailed] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.5 }}
      className="group w-full overflow-hidden rounded-2xl"
    >
      <div
        className={cn(
          "relative w-full overflow-hidden bg-dark-soft/20",
          aspectClasses[index % aspectClasses.length]
        )}
      >
        {failed ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-purple-deep/40 p-4 text-center">
            <ImageIcon className="h-10 w-10 text-gold/50" />
            <p className="text-xs text-ivory/60">{alt}</p>
          </div>
        ) : (
          <Image
            src={src}
            alt={alt}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            onError={() => setFailed(true)}
          />
        )}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-dark/90 via-dark/40 to-transparent" />
        <div className="absolute right-3 bottom-3 left-3">
          <span className="inline-block rounded-full border border-gold/30 bg-dark/70 px-3 py-1 text-xs font-semibold text-gold-light backdrop-blur-md">
            {category}
          </span>
          <p className="mt-2 line-clamp-2 text-sm font-medium leading-snug text-ivory/95">
            {alt}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

type GalleryProps = {
  showHeading?: boolean;
};

export function Gallery({ showHeading = true }: GalleryProps) {
  return (
    <section className="section-padding relative bg-dark">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {showHeading && (
          <SectionHeading
            eyebrow="Gallery"
            title="Moments of Musical Grace"
            subtitle="Student performances, concerts, instruments, and the vibrant life of our online academy."
            light
          />
        )}

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {galleryImages.map((img, i) => (
            <GalleryItem
              key={`${img.id}-${i}`}
              src={img.src}
              alt={img.alt}
              category={img.category}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
