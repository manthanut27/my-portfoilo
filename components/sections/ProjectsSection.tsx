'use client';
import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { projects, type Project } from '@/lib/constants';
import SectionTransition from '@/components/ui/SectionTransition';

export default function ProjectsSection() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const handleScroll = () => {
      const maxScroll = track.scrollWidth - track.clientWidth;
      if (maxScroll > 0) {
        setScrollProgress((track.scrollLeft / maxScroll) * 100);
      }
    };

    track.addEventListener('scroll', handleScroll, { passive: true });
    return () => track.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="projects" className="relative py-20 md:py-32" style={{ background: 'var(--pink)' }}>
      <SectionTransition kanji="作" label="WORK" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Section Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-syne text-[56px] md:text-[74px] font-extrabold uppercase mb-12"
          style={{ color: 'var(--navy)' }}
        >
          Projects
        </motion.h2>

        {/* Horizontal Scroll Track */}
        <div
          ref={trackRef}
          className="flex gap-6 overflow-x-auto hide-scrollbar pb-4 snap-x snap-mandatory cursor-grab active:cursor-grabbing"
          style={{ scrollSnapType: 'x mandatory' }}
        >
          {projects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>

        {/* Scroll Progress Bar */}
        <div className="mt-8 h-1 rounded-full max-w-md mx-auto" style={{ background: 'rgba(12,74,110,0.1)' }}>
          <motion.div
            className="h-full rounded-full"
            style={{ background: 'var(--orange-red)', width: `${Math.max(scrollProgress, 5)}%` }}
          />
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    card.style.setProperty('--mouse-x', `${x}%`);
    card.style.setProperty('--mouse-y', `${y}%`);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      className="card-shimmer glass-strong rounded-2xl overflow-hidden flex-shrink-0 snap-center transition-all duration-200 hover:-translate-y-2 hover:shadow-xl group"
      style={{
        width: '360px',
        minWidth: '360px',
        borderLeft: `4px solid ${project.accentColor}`,
        transform: 'perspective(1000px) rotateY(2deg)',
      }}
      whileHover={{
        rotateY: 0,
        scale: 1.02,
      }}
    >
      {/* Project Image */}
      <div className="h-48 w-full relative overflow-hidden bg-black/5">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.05]"
        />

        {/* Status Badge */}
        <span
          className="absolute top-4 right-4 px-3 py-1 text-xs font-bold rounded-full z-10 shadow-sm"
          style={{
            background: project.status === 'LIVE' ? 'var(--orange-red)' : 'var(--navy)',
            color: project.status === 'LIVE' ? 'white' : 'var(--fizzi-yellow)',
          }}
        >
          {project.status}
        </span>
      </div>

      {/* Card Content */}
      <div className="p-6 space-y-4">
        <h3 className="font-syne text-xl font-bold" style={{ color: 'var(--navy)' }}>
          {project.title}
        </h3>

        <p className="text-sm opacity-70 leading-relaxed line-clamp-3">{project.description}</p>

        {/* Tech Stack Pills */}
        <div className="flex flex-wrap gap-2">
          {project.techStack.map(tech => (
            <span
              key={tech}
              className="px-2.5 py-1 text-[10px] font-bold rounded-full uppercase tracking-wide"
              style={{
                background: 'rgba(12,74,110,0.08)',
                color: 'var(--navy)',
              }}
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-2">
          {project.liveUrl ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 text-xs font-bold rounded-full transition-all hover:scale-105"
              style={{ background: 'var(--orange-red)', color: 'white' }}
            >
              Live Demo
            </a>
          ) : (
            <span
              className="px-4 py-2 text-xs font-bold rounded-full cursor-not-allowed opacity-50"
              style={{ background: 'rgba(12,74,110,0.1)', color: 'var(--navy)' }}
            >
              Coming Soon
            </span>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 text-xs font-bold rounded-full border transition-all hover:scale-105"
              style={{ borderColor: 'var(--navy)', color: 'var(--navy)' }}
            >
              GitHub
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}
