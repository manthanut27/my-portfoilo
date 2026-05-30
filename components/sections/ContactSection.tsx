'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useContactForm } from '@/hooks/useContactForm';
import { socialLinks } from '@/lib/constants';
import SectionTransition from '@/components/ui/SectionTransition';

export default function ContactSection() {
  const { formData, errors, status, serverError, isValid, updateField, submit, reset } = useContactForm();

  return (
    <section id="contact" className="relative py-20 md:py-32" style={{ background: 'var(--green)' }}>
      <SectionTransition kanji="連" label="CONNECT" />

      <div className="max-w-4xl mx-auto px-6">
        {/* Section Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-syne text-[48px] md:text-[88px] font-extrabold text-center mb-4"
          style={{ color: 'var(--navy)' }}
        >
          Let&apos;s Connect
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-lg opacity-70 mb-12"
        >
          Have a project in mind or want to chat? Drop me a message.
        </motion.p>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-strong rounded-2xl p-8 md:p-10 max-w-xl mx-auto"
        >
          <AnimatePresence mode="wait">
            {status === 'success' ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12 space-y-4"
              >
                {/* Animated Checkmark */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.2 }}
                  className="w-20 h-20 rounded-full flex items-center justify-center mx-auto"
                  style={{ background: 'var(--orange-red)' }}
                >
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <motion.path
                      d="M5 12l5 5L20 7"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.5, delay: 0.5 }}
                    />
                  </svg>
                </motion.div>
                <h3 className="font-syne text-2xl font-bold" style={{ color: 'var(--navy)' }}>
                  Message Sent!
                </h3>
                <p className="opacity-70">
                  Thanks for reaching out. I&apos;ll get back to you soon.
                </p>
                <button
                  onClick={reset}
                  className="mt-4 px-6 py-2 text-sm font-bold rounded-full"
                  style={{ background: 'var(--navy)', color: 'white' }}
                >
                  Send Another
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={(e) => { e.preventDefault(); submit(); }}
                className="space-y-5"
              >
                {/* Name */}
                <div>
                  <input
                    suppressHydrationWarning
                    type="text"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={e => updateField('name', e.target.value)}
                    className="w-full px-4 py-3.5 rounded-xl bg-white/50 border outline-none transition-all focus:ring-2"
                    style={{
                      borderColor: errors.name ? '#ef4444' : 'rgba(12,74,110,0.15)',
                      color: 'var(--navy)',
                    }}
                  />
                  {errors.name && (
                    <p className="text-xs mt-1.5" style={{ color: '#ef4444' }}>{errors.name}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <input
                    suppressHydrationWarning
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={e => updateField('email', e.target.value)}
                    className="w-full px-4 py-3.5 rounded-xl bg-white/50 border outline-none transition-all focus:ring-2"
                    style={{
                      borderColor: errors.email ? '#ef4444' : 'rgba(12,74,110,0.15)',
                      color: 'var(--navy)',
                    }}
                  />
                  {errors.email && (
                    <p className="text-xs mt-1.5" style={{ color: '#ef4444' }}>{errors.email}</p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <textarea
                    suppressHydrationWarning
                    placeholder="Tell me about your project..."
                    value={formData.message}
                    onChange={e => updateField('message', e.target.value)}
                    rows={5}
                    className="w-full px-4 py-3.5 rounded-xl bg-white/50 border outline-none transition-all focus:ring-2 resize-none"
                    style={{
                      borderColor: errors.message ? '#ef4444' : 'rgba(12,74,110,0.15)',
                      color: 'var(--navy)',
                    }}
                  />
                  <div className="flex justify-between items-center mt-1">
                    {errors.message ? (
                      <p className="text-xs" style={{ color: '#ef4444' }}>{errors.message}</p>
                    ) : (
                      <span />
                    )}
                    <span className="text-xs opacity-40 font-space">
                      {formData.message.length}/1000
                    </span>
                  </div>
                </div>

                {/* Server Error */}
                {status === 'error' && serverError && (
                  <div className="p-3 rounded-lg text-sm" style={{ background: 'rgba(239,68,68,0.1)', color: '#ef4444' }}>
                    {serverError}
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={!isValid || status === 'submitting'}
                  className="w-full py-4 rounded-xl text-sm font-bold transition-all duration-200 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                  style={{ background: 'var(--orange-red)', color: 'white' }}
                >
                  {status === 'submitting' ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Sending...
                    </span>
                  ) : (
                    'SEND MESSAGE'
                  )}
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4 mt-12"
        >
          {socialLinks.map(link => (
            <a
              key={link.platform}
              href={link.url}
              target={link.platform !== 'Email' ? '_blank' : undefined}
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 glass rounded-full text-sm font-medium transition-all hover:scale-105"
              style={{ color: 'var(--navy)' }}
            >
              <SocialIcon platform={link.icon} />
              {link.handle}
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function SocialIcon({ platform }: { platform: string }) {
  if (platform === 'github') {
    return (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
      </svg>
    );
  }
  if (platform === 'linkedin') {
    return (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    );
  }
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  );
}
