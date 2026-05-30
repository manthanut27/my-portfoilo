import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'shadow // manthan utekar',
  description: 'You found the shadow.',
  robots: { index: true, follow: true },
};

export default function ShadowPage() {
  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{
        background: '#ffffff',
        fontFamily: "'Space Mono', monospace",
      }}
    >
      <p
        className="text-lg md:text-xl tracking-wide"
        style={{ color: '#000000' }}
      >
        you found the shadow. not many do.
      </p>
    </div>
  );
}
