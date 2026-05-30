'use client';
import { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useCommandHistory } from '@/hooks/useCommandHistory';
import { terminalCommands, cinematicLines } from '@/lib/constants';
import { useHiringManager } from '@/providers/HiringManagerProvider';
import SectionTransition from '@/components/ui/SectionTransition';

type TerminalMode = 'cinematic' | 'cli' | 'stats';

export default function TerminalSection() {
  const { isHiringMode } = useHiringManager();
  const [mode, setMode] = useState<TerminalMode>('cinematic');
  const [isGlitching, setIsGlitching] = useState(false);

  // Random glitch effect
  useEffect(() => {
    const scheduleGlitch = () => {
      const delay = 30000 + Math.random() * 10000; // 30-40s
      return setTimeout(() => {
        setIsGlitching(true);
        setTimeout(() => setIsGlitching(false), 150);
        scheduleGlitch();
      }, delay);
    };
    const timer = scheduleGlitch();
    return () => clearTimeout(timer);
  }, []);

  if (isHiringMode) return null;

  return (
    <section id="terminal" className="relative py-20 md:py-32" style={{ background: 'var(--lavender)' }}>
      <SectionTransition kanji="端" label="TERMINAL" />

      <div className="max-w-4xl mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-syne text-[56px] md:text-[74px] font-extrabold uppercase mb-12"
          style={{ color: 'var(--navy)' }}
        >
          Terminal
        </motion.h2>

        {/* Terminal Window */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={`rounded-xl overflow-hidden shadow-2xl ${isGlitching ? 'glitch-active' : ''}`}
          style={{ background: 'var(--dark-bg)' }}
        >
          {/* macOS Title Bar */}
          <div
            className="flex items-center gap-2 px-4 py-3"
            style={{ background: '#1a1a2e' }}
          >
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full" style={{ background: '#FF5F57' }} />
              <div className="w-3 h-3 rounded-full" style={{ background: '#FEBC2E' }} />
              <div className="w-3 h-3 rounded-full" style={{ background: '#28C840' }} />
            </div>
            <p className="text-xs text-center flex-1 font-space" style={{ color: 'rgba(255,255,255,0.5)' }}>
              manthan@portfolio ~ %
            </p>
          </div>

          {/* Mode Tabs */}
          <div className="flex border-b" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
            {(['cinematic', 'cli', 'stats'] as TerminalMode[]).map(m => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className="px-4 py-2 text-xs font-space uppercase tracking-wider transition-colors"
                style={{
                  color: mode === m ? 'var(--orange-red)' : 'rgba(255,255,255,0.3)',
                  borderBottom: mode === m ? '2px solid var(--orange-red)' : '2px solid transparent',
                }}
              >
                {m}
              </button>
            ))}
          </div>

          {/* Terminal Body */}
          <div className="relative min-h-[400px] p-4 md:p-6">
            {/* Scanline Overlay */}
            <div className="scanline-overlay absolute inset-0 z-10" />

            {mode === 'cinematic' && <CinematicMode />}
            {mode === 'cli' && <CLIMode />}
            {mode === 'stats' && <StatsMode />}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function CinematicMode() {
  const [visibleLines, setVisibleLines] = useState<number>(0);
  const [charIndex, setCharIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (visibleLines >= cinematicLines.length) return;

    const currentLine = cinematicLines[visibleLines];

    if (charIndex < currentLine.length) {
      const timer = setTimeout(() => setCharIndex(prev => prev + 1), 30);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        setVisibleLines(prev => prev + 1);
        setCharIndex(0);
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [visibleLines, charIndex]);

  // Auto-scroll
  useEffect(() => {
    containerRef.current?.scrollTo({ top: containerRef.current.scrollHeight });
  }, [visibleLines, charIndex]);

  return (
    <div ref={containerRef} className="font-space text-sm leading-relaxed space-y-1 max-h-[360px] overflow-y-auto hide-scrollbar">
      {cinematicLines.slice(0, visibleLines).map((line, i) => (
        <p key={i} style={{ color: line.startsWith('> //') ? 'var(--orange-red)' : 'var(--terminal-green)' }}>
          {line}
        </p>
      ))}
      {visibleLines < cinematicLines.length && (
        <p style={{ color: cinematicLines[visibleLines].startsWith('> //') ? 'var(--orange-red)' : 'var(--terminal-green)' }}>
          {cinematicLines[visibleLines].slice(0, charIndex)}
          <span className="typewriter-cursor inline-block w-[7px] h-[14px] ml-0.5 align-text-bottom" style={{ background: 'var(--terminal-green)' }} />
        </p>
      )}
    </div>
  );
}

function CLIMode() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState<Array<{ type: 'input' | 'output'; text: string }>>([
    { type: 'output', text: 'Welcome to manthan@portfolio. Type "help" for available commands.' },
  ]);
  const [isJapanese, setIsJapanese] = useState(false);
  const { addToHistory, navigateUp, navigateDown } = useCommandHistory();
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.trim().toLowerCase();
    if (!cmd) return;

    addToHistory(cmd);

    if (cmd === 'clear') {
      setOutput([]);
      setInput('');
      return;
    }

    const newOutput = [...output, { type: 'input' as const, text: `$ ${cmd}` }];

    if (cmd === 'japanese') {
      setIsJapanese(true);
      setTimeout(() => setIsJapanese(false), 5000);
    }

    const command = terminalCommands[cmd];
    if (command) {
      newOutput.push({ type: 'output', text: command.output });
    } else {
      newOutput.push({ type: 'output', text: `Command not found: ${cmd}. Type "help" for available commands.` });
    }

    setOutput(newOutput);
    setInput('');
  }, [input, output, addToHistory]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      const prev = navigateUp();
      if (prev !== null) setInput(prev);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const next = navigateDown();
      if (next !== null) setInput(next);
    }
  };

  useEffect(() => {
    containerRef.current?.scrollTo({ top: containerRef.current.scrollHeight });
  }, [output]);

  return (
    <div
      className="font-space text-sm max-h-[360px] overflow-y-auto hide-scrollbar"
      onClick={() => inputRef.current?.focus()}
    >
      <div ref={containerRef} className="space-y-1 mb-2">
        {output.map((line, i) => (
          <pre
            key={i}
            className="whitespace-pre-wrap"
            style={{
              color: line.type === 'input' ? 'var(--fizzi-yellow)' : 'var(--terminal-green)',
              opacity: line.type === 'input' ? 0.7 : 0.9,
            }}
          >
            {isJapanese && line.type === 'output' ? '日本語モード: ' + line.text : line.text}
          </pre>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        <span style={{ color: 'var(--orange-red)' }}>$</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-transparent outline-none font-space text-sm"
          style={{ color: 'var(--terminal-green)', caretColor: 'var(--terminal-green)' }}
          placeholder="type a command..."
          autoComplete="off"
          spellCheck={false}
        />
      </form>
    </div>
  );
}

function StatsMode() {
  const stats = [
    { label: 'React', value: 92 },
    { label: 'Node.js', value: 85 },
    { label: 'TypeScript', value: 88 },
    { label: 'GSAP', value: 78 },
    { label: 'Three.js', value: 65 },
    { label: 'Chai consumed', value: 100 },
  ];

  return (
    <div className="font-space text-sm space-y-3">
      <p style={{ color: 'var(--orange-red)' }}>// SKILL PROFICIENCY (ASCII BAR)</p>
      <p style={{ color: 'var(--terminal-green)', opacity: 0.5 }}>{'─'.repeat(45)}</p>
      {stats.map((stat, i) => {
        const filled = Math.floor(stat.value / 5);
        const empty = 20 - filled;
        return (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="flex items-center gap-2"
          >
            <span style={{ color: 'var(--fizzi-yellow)', width: '120px', display: 'inline-block' }}>
              {stat.label.padEnd(12)}
            </span>
            <span style={{ color: 'var(--terminal-green)' }}>
              {'█'.repeat(filled)}{'░'.repeat(empty)}
            </span>
            <span style={{ color: 'var(--orange-red)' }}>{stat.value}%</span>
          </motion.div>
        );
      })}
      <p style={{ color: 'var(--terminal-green)', opacity: 0.5 }}>{'─'.repeat(45)}</p>
      <p style={{ color: 'var(--terminal-green)', opacity: 0.6 }}>
        ☕ Status: caffeinated and shipping code
      </p>
    </div>
  );
}
