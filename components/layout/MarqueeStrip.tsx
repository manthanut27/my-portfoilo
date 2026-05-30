'use client';
import { marqueeContent } from '@/lib/constants';
import { useHiringManager } from '@/providers/HiringManagerProvider';

export default function MarqueeStrip() {
  const { isHiringMode } = useHiringManager();

  if (isHiringMode) return null;

  return (
    <div className="marquee-strip select-none" aria-hidden="true">
      <div className="marquee-track">
        <span className="px-4">{marqueeContent}</span>
        <span className="px-4">{marqueeContent}</span>
        <span className="px-4">{marqueeContent}</span>
        <span className="px-4">{marqueeContent}</span>
      </div>
    </div>
  );
}
