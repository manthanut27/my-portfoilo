import React, { useState } from 'react';
import { Send, CheckCircle, AlertTriangle, Github, Linkedin, Mail } from 'lucide-react';

interface ContactProps {
  hiringManagerMode: boolean;
}

export const Contact: React.FC<ContactProps> = ({ hiringManagerMode }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  // Client-side validations
  const isNameValid = name.trim().length >= 2;
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isMessageValid = message.trim().length >= 10 && message.length <= 1000;
  const isFormValid = isNameValid && isEmailValid && isMessageValid;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;

    setLoading(true);
    setStatus('idle');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, message }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setStatus('success');
        setName('');
        setEmail('');
        setMessage('');
      } else {
        throw new Error(data.error || 'Failed to submit the form. Please try again.');
      }
    } catch (err: any) {
      console.error('Contact submit error:', err);
      setStatus('error');
      setErrorMsg(err.message || 'Server error. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="contact"
      data-kanji="連"
      data-label="CONNECT"
      className={`relative w-full min-h-screen flex flex-col justify-center px-6 md:px-16 py-24 select-none transition-colors duration-1000 ${
        hiringManagerMode ? 'bg-slate-50 text-slate-900' : 'bg-[#CBEF9A] text-brand-navy'
      }`}
    >
      <div className="max-w-4xl mx-auto w-full flex flex-col gap-12 relative z-10">
        {/* Section Heading */}
        <div className="text-center relative">
          {!hiringManagerMode && (
            <div className="text-brand-navy/15 text-8xl font-black mb-2 pointer-events-none select-none">
              連
            </div>
          )}
          <h2 className="font-syne font-black text-5xl md:text-7xl uppercase tracking-tighter text-brand-navy leading-none">
            Get in touch
          </h2>
          <p className="mt-4 font-label text-base md:text-lg font-medium text-brand-navy/70 max-w-lg mx-auto">
            Drop me a line. Let us collaborate on your next premium project.
          </p>
        </div>

        {/* Contact Form Container */}
        <div className="w-full glass-card p-8 md:p-10 rounded-3xl border border-white/50 shadow-2xl relative overflow-hidden text-left">
          {status === 'success' ? (
            /* Success State screen */
            <div className="flex flex-col items-center justify-center py-12 text-center gap-4">
              <CheckCircle className="w-20 h-20 text-brand-orange animate-bounce" />
              <h3 className="font-syne font-black text-3xl text-brand-navy uppercase tracking-tight">
                Message Sent!
              </h3>
              <p className="font-body text-base text-brand-navy/80 max-w-md leading-relaxed">
                Thank you for reaching out. I have received your message and will respond within 24 hours.
              </p>
              <button
                onClick={() => setStatus('idle')}
                className="mt-4 bg-brand-navy hover:bg-brand-orange text-white font-label font-bold px-6 py-2.5 rounded-full transition-colors cursor-pointer"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            /* Standard Contact Form view */
            <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-full">
              {/* Name Field */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="name" className="font-space text-xs font-bold text-brand-navy/80 uppercase">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-5 py-3.5 bg-white/45 focus:bg-white rounded-xl border border-brand-navy/15 focus:border-brand-orange outline-none font-body text-brand-navy text-sm md:text-base transition-all duration-200 shadow-inner"
                  placeholder="John Doe"
                  required
                />
                {name.length > 0 && !isNameValid && (
                  <span className="text-xs font-bold text-red-600 mt-1">Name must be at least 2 characters.</span>
                )}
              </div>

              {/* Email Field */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="email" className="font-space text-xs font-bold text-brand-navy/80 uppercase">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-5 py-3.5 bg-white/45 focus:bg-white rounded-xl border border-brand-navy/15 focus:border-brand-orange outline-none font-body text-brand-navy text-sm md:text-base transition-all duration-200 shadow-inner"
                  placeholder="john@example.com"
                  required
                />
                {email.length > 0 && !isEmailValid && (
                  <span className="text-xs font-bold text-red-600 mt-1">Please enter a valid email address.</span>
                )}
              </div>

              {/* Message Field */}
              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between items-center text-xs font-space font-bold text-brand-navy/80 uppercase">
                  <label htmlFor="message">Message</label>
                  <span className={message.length > 1000 ? 'text-red-600 font-black' : ''}>
                    {message.length} / 1000
                  </span>
                </div>
                <textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={5}
                  className="w-full px-5 py-3.5 bg-white/45 focus:bg-white rounded-xl border border-brand-navy/15 focus:border-brand-orange outline-none font-body text-brand-navy text-sm md:text-base transition-all duration-200 shadow-inner resize-none"
                  placeholder="Hey Manthan, let us talk about..."
                  required
                />
                {message.length > 0 && message.length < 105 && !isMessageValid && (
                  <span className="text-xs font-bold text-red-600 mt-1">Message must be at least 10 characters.</span>
                )}
              </div>

              {/* Error inline message */}
              {status === 'error' && (
                <div className="flex items-center gap-2 bg-red-100 border border-red-200 text-red-700 p-4 rounded-xl text-sm font-semibold">
                  <AlertTriangle className="w-5 h-5" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={!isFormValid || loading}
                className="w-full flex items-center justify-center gap-2 bg-brand-orange hover:bg-brand-navy disabled:bg-gray-300 text-white disabled:text-gray-500 font-headline font-bold text-base py-4 rounded-xl transition-all duration-300 shadow-xl disabled:shadow-none hover:shadow-brand-orange/25 cursor-pointer disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>SEND MESSAGE</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>

        {/* Social Links Row */}
        <div className="flex flex-col items-center gap-4 border-t border-brand-navy/10 pt-8 mt-4">
          <div className="font-space text-xs font-bold text-brand-navy/60 tracking-widest uppercase">
            FIND ME AROUND THE WEB
          </div>
          <div className="flex justify-center items-center gap-6">
            <a
              href="https://github.com/manthanut27"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-12 h-12 rounded-full border border-brand-navy/15 text-brand-navy hover:bg-brand-orange hover:text-white active:scale-90 hover:border-transparent transition-all duration-200 cursor-pointer"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="https://linkedin.com/in/utkmanthan"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-12 h-12 rounded-full border border-brand-navy/15 text-brand-navy hover:bg-brand-orange hover:text-white active:scale-90 hover:border-transparent transition-all duration-200 cursor-pointer"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href="mailto:manthanutekar27@gmail.com"
              className="flex items-center justify-center w-12 h-12 rounded-full border border-brand-navy/15 text-brand-navy hover:bg-brand-orange hover:text-white active:scale-90 hover:border-transparent transition-all duration-200 cursor-pointer"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Contact;
