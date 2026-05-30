'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useGitHubStats } from '@/hooks/useGitHubStats';
import { statCards, bioText, heatmapColors } from '@/lib/constants';
import { generateContributionData, fetchEvaBloomCommits } from '@/lib/github';
import SectionTransition from '@/components/ui/SectionTransition';

export default function AboutSection() {
  const { stats, loading } = useGitHubStats();
  const [evaCommits, setEvaCommits] = useState<number>(247);
  const [contributionData, setContributionData] = useState<number[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    fetchEvaBloomCommits().then(setEvaCommits);
    setContributionData(generateContributionData());
  }, []);

  const getHeatmapColor = (count: number): string => {
    if (count === 0) return heatmapColors[0];
    if (count <= 3) return heatmapColors[1];
    if (count <= 7) return heatmapColors[2];
    if (count <= 14) return heatmapColors[3];
    return heatmapColors[4];
  };

  return (
    <section id="about" className="relative py-20 md:py-32 overflow-hidden" style={{ background: 'var(--lime)' }}>
      <SectionTransition kanji="創" label="CREATE" />

      {/* Background decorative elements */}
      <div className="absolute top-40 -left-20 w-64 h-64 bg-[var(--fizzi-yellow)] rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse pointer-events-none" />
      <div className="absolute bottom-40 -right-20 w-80 h-80 bg-[var(--cyan)] rounded-full mix-blend-multiply filter blur-3xl opacity-30 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 space-y-24 relative z-10">
        {/* About Heading & Bio */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5"
          >
            <h1 className="font-syne font-extrabold text-[56px] md:text-[74px] leading-none text-[var(--navy)] uppercase tracking-tight">
              ABOUT<br /><span className="text-[var(--orange-red)]">ME.</span>
            </h1>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7 glass rounded-3xl p-8 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--fizzi-yellow)] rounded-bl-full opacity-20 -z-10" />
            <p className="text-lg md:text-xl text-[var(--navy)]/80 leading-relaxed font-body">
              {bioText}
            </p>
            <div className="mt-6 flex items-center gap-3">
              <span className="flex h-3 w-3 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--orange-red)] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-[var(--orange-red)]"></span>
              </span>
              <span className="font-space text-xs font-bold text-[var(--navy)]">OPEN TO NEW OPPORTUNITIES</span>
            </div>
          </motion.div>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
          {statCards.map((card, i) => {
            const isEva = card.value === 'live';
            const badgeText = isEva 
              ? 'Eva Bloom' 
              : card.label === 'Projects Shipped' 
              ? 'Live' 
              : card.label === 'Hackathon Won' 
              ? "Hawkathon '26" 
              : 'Active';
            
            const badgeBg = isEva 
              ? 'rgba(87, 41, 129, 0.2)' 
              : card.label === 'Hackathon Won' 
              ? 'rgba(253, 224, 71, 0.8)' 
              : 'rgba(255, 255, 255, 0.5)';
            
            const badgeColor = isEva ? 'var(--grape)' : 'var(--navy)';
            const numColor = isEva ? 'var(--grape)' : 'var(--navy)';

            return (
              <motion.div
                key={card.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass p-6 rounded-2xl flex flex-col justify-between aspect-square group hover:scale-105 transition-transform duration-200"
              >
                <div className="flex justify-between items-start">
                  <span className="text-3xl group-hover:scale-110 transition-transform duration-200">
                    {card.icon}
                  </span>
                  <span 
                    className="text-xs font-space px-2.5 py-1 rounded-full font-bold"
                    style={{ background: badgeBg, color: badgeColor }}
                  >
                    {badgeText}
                  </span>
                </div>
                <div>
                  <h3 
                    className="text-6xl font-syne font-black mb-2"
                    style={{ color: numColor }}
                  >
                    {isEva ? (loading ? '...' : evaCommits) : card.value}
                  </h3>
                  <p className="font-space text-xs text-[var(--navy)]/70 uppercase tracking-wider font-bold">
                    {card.label}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* GitHub Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass rounded-2xl p-8"
        >
          <h3 className="font-syne text-xl font-bold mb-6" style={{ color: 'var(--navy)' }}>
            GitHub Activity
          </h3>

          {/* Stats Row */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            {[
              { label: 'Public Repos', value: stats?.publicRepos ?? '-', icon: '📦' },
              { label: 'Total Stars', value: stats?.stars ?? '-', icon: '⭐' },
              { label: 'Followers', value: stats?.followers ?? '-', icon: '👥' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <span className="text-xl">{stat.icon}</span>
                <p className="font-syne text-2xl md:text-3xl font-extrabold mt-1" style={{ color: 'var(--navy)' }}>
                  {loading ? (
                    <span className="inline-block w-8 h-6 rounded bg-[var(--navy)] opacity-10 animate-pulse" />
                  ) : (
                    stat.value
                  )}
                </p>
                <p className="text-xs opacity-60 mt-0.5">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Contribution Heatmap */}
          {mounted && contributionData.length > 0 && (
            <div>
              <p className="text-xs font-space opacity-50 mb-3">Contribution Activity (past year)</p>
              <div className="overflow-x-auto hide-scrollbar">
                <div className="flex gap-[3px]" style={{ minWidth: '700px' }}>
                  {Array.from({ length: 52 }, (_, weekIndex) => (
                    <div key={weekIndex} className="flex flex-col gap-[3px]">
                      {Array.from({ length: 7 }, (_, dayIndex) => {
                        const dataIndex = weekIndex * 7 + dayIndex;
                        const count = contributionData[dataIndex] ?? 0;
                        return (
                          <div
                            key={dayIndex}
                            className="w-[11px] h-[11px] rounded-[2px] transition-colors"
                            style={{ background: getHeatmapColor(count) }}
                            title={`${count} contributions`}
                          />
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>
              {/* Legend */}
              <div className="flex items-center gap-2 mt-3 text-xs opacity-50">
                <span>Less</span>
                {heatmapColors.map((color, i) => (
                  <div
                    key={i}
                    className="w-[11px] h-[11px] rounded-[2px]"
                    style={{ background: color }}
                  />
                ))}
                <span>More</span>
              </div>
            </div>
          )}
        </motion.div>

        {/* Tokyo CSS Illustration Fallback */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="relative h-48 md:h-64 rounded-2xl overflow-hidden"
          style={{ background: 'linear-gradient(135deg, var(--navy) 0%, #1e3a5f 100%)' }}
        >
          {/* Simple CSS city skyline */}
          <div className="absolute bottom-0 left-0 right-0 flex items-end justify-center gap-2 px-4">
            {[60, 100, 80, 120, 70, 90, 110, 65, 95, 85, 105, 75, 50, 90, 75, 115, 60, 80, 100, 70, 95, 85, 110, 65].map((h, i) => {
              const width = ((i * 7 + 13) % 20) + 20; // Deterministic width between 20px and 39px
              const opacity = 0.1 + ((i * 3) % 5) * 0.05; // Deterministic opacity between 0.1 and 0.3
              return (
                <div
                  key={i}
                  className="rounded-t-sm flex-shrink-0"
                  style={{
                    width: `${width}px`,
                    height: `${h}px`,
                    background: `rgba(253, 224, 71, ${opacity})`,
                    borderTop: '1px solid rgba(253, 224, 71, 0.3)',
                  }}
                >
                  {/* Windows */}
                  <div className="grid grid-cols-2 gap-1 p-1 pt-2">
                    {Array.from({ length: Math.floor(h / 20) }, (_, j) => {
                      const showWindow = ((i * 3 + j * 7 + 5) % 10) > 3;
                      return (
                        <div
                          key={j}
                          className="w-1.5 h-1.5 rounded-[1px]"
                          style={{
                            background: showWindow
                              ? 'rgba(253, 224, 71, 0.6)'
                              : 'transparent',
                          }}
                        />
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
          {/* Moon */}
          <div
            className="absolute top-8 right-12 w-12 h-12 rounded-full"
            style={{ background: 'var(--fizzi-yellow)', opacity: 0.3, filter: 'blur(2px)' }}
          />
          <p className="absolute bottom-4 right-6 font-space text-xs" style={{ color: 'var(--fizzi-yellow)', opacity: 0.4 }}>
            東京 // TOKYO
          </p>
        </motion.div>
      </div>
    </section>
  );
}
