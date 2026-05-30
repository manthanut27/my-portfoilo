'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  innerRingSkills,
  middleRingSkills,
  outerRingSkills,
  allSkills,
  proficiencyColors,
  type Skill,
} from '@/lib/constants';
import SectionTransition from '@/components/ui/SectionTransition';
import { useHiringManager } from '@/providers/HiringManagerProvider';

export default function SkillsSection() {
  const { isHiringMode } = useHiringManager();
  const [hoveredSkill, setHoveredSkill] = useState<Skill | null>(null);

  return (
    <section id="skills" className="relative py-20 md:py-32" style={{ background: 'var(--cyan)' }}>
      <SectionTransition kanji="技" label="SKILLS" />

      <div className="max-w-6xl mx-auto px-6">
        {/* Section Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-space text-[56px] md:text-[74px] font-bold uppercase text-center mb-16"
          style={{ color: 'var(--navy)' }}
        >
          Skills
        </motion.h2>

        {isHiringMode ? (
          <SkillGrid skills={allSkills} />
        ) : (
          <>
            {/* Desktop: Orbit Visualization */}
            <div className="hidden md:flex items-center justify-center">
              <div className="relative" style={{ width: '650px', height: '650px' }}>
                {/* Orbit Rings (visual) */}
                <div
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed"
                  style={{ width: '240px', height: '240px', borderColor: 'rgba(12,74,110,0.12)' }}
                />
                <div
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed"
                  style={{ width: '420px', height: '420px', borderColor: 'rgba(12,74,110,0.08)' }}
                />
                <div
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed"
                  style={{ width: '600px', height: '600px', borderColor: 'rgba(12,74,110,0.06)' }}
                />

                {/* Inner Ring Skills */}
                <div
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                  style={{
                    width: '240px',
                    height: '240px',
                    animation: 'orbit-clockwise 30s linear infinite',
                  }}
                >
                  {innerRingSkills.map((skill, i) => {
                    const angle = (i / innerRingSkills.length) * 360;
                    const rad = (angle * Math.PI) / 180;
                    const x = Math.cos(rad) * 120;
                    const y = Math.sin(rad) * 120;
                    return (
                      <SkillOrb
                        key={skill.name}
                        skill={skill}
                        x={x}
                        y={y}
                        counterRotate="orbit-self-correct"
                        duration={30}
                        onHover={setHoveredSkill}
                      />
                    );
                  })}
                </div>

                {/* Middle Ring Skills */}
                <div
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                  style={{
                    width: '420px',
                    height: '420px',
                    animation: 'orbit-counter 50s linear infinite',
                  }}
                >
                  {middleRingSkills.map((skill, i) => {
                    const angle = (i / middleRingSkills.length) * 360;
                    const rad = (angle * Math.PI) / 180;
                    const x = Math.cos(rad) * 210;
                    const y = Math.sin(rad) * 210;
                    return (
                      <SkillOrb
                        key={skill.name}
                        skill={skill}
                        x={x}
                        y={y}
                        counterRotate="orbit-self-correct-reverse"
                        duration={50}
                        onHover={setHoveredSkill}
                      />
                    );
                  })}
                </div>

                {/* Outer Ring Skills */}
                <div
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                  style={{
                    width: '600px',
                    height: '600px',
                    animation: 'orbit-clockwise 70s linear infinite',
                  }}
                >
                  {outerRingSkills.map((skill, i) => {
                    const angle = (i / outerRingSkills.length) * 360;
                    const rad = (angle * Math.PI) / 180;
                    const x = Math.cos(rad) * 300;
                    const y = Math.sin(rad) * 300;
                    return (
                      <SkillOrb
                        key={skill.name}
                        skill={skill}
                        x={x}
                        y={y}
                        counterRotate="orbit-self-correct"
                        duration={70}
                        onHover={setHoveredSkill}
                      />
                    );
                  })}
                </div>

                {/* Center MU Monogram */}
                <div
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full flex items-center justify-center z-10 glass-strong"
                  style={{ animation: 'slowSpin 20s linear infinite' }}
                >
                  <span className="font-syne text-xl font-extrabold" style={{ color: 'var(--navy)' }}>
                    MU
                  </span>
                </div>

                {/* Hovered Skill Info */}
                {hoveredSkill && (
                  <div className="absolute top-4 left-1/2 -translate-x-1/2 text-center z-20">
                    <p className="font-syne text-lg font-bold" style={{ color: 'var(--navy)' }}>
                      {hoveredSkill.name}
                    </p>
                    <div className="flex items-center gap-2 mt-1 justify-center">
                      <div
                        className="h-2 rounded-full"
                        style={{
                          width: hoveredSkill.proficiency === 'confident' ? '80px' : hoveredSkill.proficiency === 'intermediate' ? '50px' : '30px',
                          background: proficiencyColors[hoveredSkill.proficiency],
                        }}
                      />
                      <span className="text-xs capitalize opacity-60">{hoveredSkill.proficiency}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Mobile: Grid */}
            <div className="md:hidden">
              <SkillGrid skills={allSkills} />
            </div>
          </>
        )}
      </div>
    </section>
  );
}

function SkillOrb({
  skill,
  x,
  y,
  counterRotate,
  duration,
  onHover,
}: {
  skill: Skill;
  x: number;
  y: number;
  counterRotate: string;
  duration: number;
  onHover: (skill: Skill | null) => void;
}) {
  return (
    <div
      className="absolute top-1/2 left-1/2"
      style={{
        transform: `translate(${(x - 26).toFixed(3)}px, ${(y - 26).toFixed(3)}px)`,
      }}
    >
      <div
        className="w-[52px] h-[52px] rounded-full bg-white flex items-center justify-center cursor-pointer transition-transform duration-200 hover:scale-[1.4] shadow-sm"
        style={{
          border: '0.5px solid rgba(12,74,110,0.15)',
          animation: `${counterRotate} ${duration}s linear infinite`,
        }}
        onMouseEnter={() => onHover(skill)}
        onMouseLeave={() => onHover(null)}
        title={skill.name}
      >
        <span className="text-lg">{skill.icon}</span>
      </div>
    </div>
  );
}

function SkillGrid({ skills }: { skills: Skill[] }) {
  return (
    <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
      {skills.map((skill, i) => (
        <motion.div
          key={skill.name}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.05 }}
          className="flex flex-col items-center gap-2 p-4 glass rounded-xl hover:scale-105 transition-transform"
        >
          <div
            className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm"
            style={{ border: '0.5px solid rgba(12,74,110,0.15)' }}
          >
            <span className="text-xl">{skill.icon}</span>
          </div>
          <span className="text-xs font-medium text-center" style={{ color: 'var(--navy)' }}>
            {skill.name}
          </span>
          <div
            className="h-1.5 rounded-full w-full max-w-[60px]"
            style={{
              background: 'rgba(12,74,110,0.08)',
            }}
          >
            <div
              className="h-full rounded-full"
              style={{
                width: skill.proficiency === 'confident' ? '100%' : skill.proficiency === 'intermediate' ? '65%' : '35%',
                background: proficiencyColors[skill.proficiency],
              }}
            />
          </div>
        </motion.div>
      ))}
    </div>
  );
}
