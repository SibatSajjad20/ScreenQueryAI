import { motion, useScroll, useTransform } from 'framer-motion';
import {
  Camera, Search, Download, MessageSquare, Zap, Shield,
  ChevronRight, MousePointer2, Cpu, Sparkles, ArrowRight, Star
} from 'lucide-react';
import React, { useState, useRef, useEffect } from 'react';

const FloatingIcon = ({ children, delay = 0, className = '' }) => (
  <motion.div
    initial={{ y: 0 }}
    animate={{ y: [-15, 15, -15] }}
    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay }}
    className={className}
  >
    {children}
  </motion.div>
);

const FeatureCard = ({ icon: Icon, title, description, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.1 }}
    whileHover={{ scale: 1.05, rotateY: 5, rotateX: 5 }}
    className="glass p-8 rounded-3xl group cursor-default transition-all duration-500 hover:shadow-[0_0_30px_rgba(99,102,241,0.2)]"
  >
    <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 flex items-center justify-center mb-6 text-indigo-400 group-hover:scale-110 group-hover:bg-indigo-500 group-hover:text-white transition-all">
      <Icon size={28} />
    </div>
    <h3 className="text-xl font-semibold mb-3 font-display">{title}</h3>
    <p className="text-slate-400 leading-relaxed text-sm">{description}</p>
  </motion.div>
);

const StepCard = ({ number, title, description }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="flex gap-6 items-start"
  >
    <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center shrink-0 text-indigo-300 font-bold font-display text-lg">
      {number}
    </div>
    <div>
      <h4 className="font-semibold text-white mb-1">{title}</h4>
      <p className="text-slate-400 text-sm leading-relaxed">{description}</p>
    </div>
  </motion.div>
);

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [demoQuery, setDemoQuery] = useState('');
  const [demoProcessing, setDemoProcessing] = useState(false);
  const [demoAnswer, setDemoAnswer] = useState('');
  const heroRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.85]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  function handleDownload() {
    const link = document.createElement('a');
    link.href = '/screenquery-ai.zip';
    link.download = 'screenquery-ai.zip';
    link.click();
  }

  function handleDemoSubmit(e) {
    e.preventDefault();
    if (!demoQuery.trim()) return;
    setDemoProcessing(true);
    setDemoAnswer('');
    setTimeout(() => {
      setDemoProcessing(false);
      setDemoAnswer('This appears to be a CSS grid layout with 3 columns. The gap property controls spacing between cells. To refactor, consider using grid-template-areas for named regions and clamp() for responsive sizing.');
    }, 2000);
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background */}
      <div className="fixed inset-0 z-[-2] mesh-bg-theme" />
      <div className="fixed top-[-100px] left-[-100px] w-[500px] h-[500px] accent-glow z-[-1]" />
      <div className="fixed bottom-[-100px] right-[-100px] w-[500px] h-[500px] accent-glow z-[-1]" />

      {/* Navbar */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'py-4 glass border-b border-indigo-500/10 shadow-lg' : 'py-8 bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 group cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-indigo-500 flex items-center justify-center text-white shadow-lg shadow-indigo-500/30 group-hover:rotate-12 transition-transform">
              <Camera size={22} />
            </div>
            <span className="text-xl font-display font-bold tracking-tight text-white">ScreenQuery</span>
          </motion.div>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
            {['Features', 'How It Works', 'Download'].map((item) => (
              <a key={item} href={`#${item.toLowerCase().replace(/ /g, '-')}`} className="hover:text-indigo-400 transition-colors relative group">
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-500 transition-all group-hover:w-full" />
              </a>
            ))}
            <span className="text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded text-[10px] font-bold border border-indigo-500/20">v1.0.0</span>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleDownload}
            className="px-6 py-2.5 rounded-full bg-white text-black font-semibold text-sm hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all flex items-center gap-2"
          >
            Get Extension <ArrowRight size={15} />
          </motion.button>
        </div>
      </nav>

      {/* Hero */}
      <section ref={heroRef} className="relative pt-36 pb-24 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <motion.div style={{ opacity, scale }} className="relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-block px-3 py-1 glass rounded-full text-[10px] uppercase tracking-widest text-indigo-300 font-semibold mb-6 border border-indigo-500/30"
            >
              🚀 Free Early Access — No Account Needed
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-6xl md:text-7xl font-display font-bold leading-[1.1] mb-6 text-white"
            >
              Ask your <br />
              <span className="text-gradient">Screen.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg text-slate-400 mb-10 leading-relaxed max-w-lg"
            >
              Capture any tab and let Gemini AI analyze it instantly. Debug code, summarize charts, translate UI — all without leaving your browser.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-6"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleDownload}
                className="px-8 py-4 bg-indigo-600 text-white rounded-2xl font-bold shadow-2xl shadow-indigo-500/40 hover:bg-indigo-500 transition-all border-t border-indigo-400/30 flex items-center gap-3 group btn-glow"
              >
                <Download size={20} />
                Download .zip
                <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </motion.button>
              <div className="flex flex-col">
                <span className="text-xs text-slate-500 font-mono">v1.0.0 · Chrome Extension</span>
                <span className="text-[10px] text-green-400 font-medium uppercase tracking-tighter">✓ Verified Secure · Manifest V3</span>
              </div>
            </motion.div>

            {/* Social proof */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex items-center gap-3 mt-8"
            >
              <div className="flex -space-x-2">
                {[10, 20, 30, 40].map((seed) => (
                  <img key={seed} src={`https://picsum.photos/seed/${seed}/40/40`} className="w-8 h-8 rounded-full border-2 border-slate-900 object-cover" alt="user" />
                ))}
              </div>
              <div className="flex items-center gap-1 text-yellow-400 text-xs">
                {[...Array(5)].map((_, i) => <Star key={i} size={12} fill="currentColor" />)}
              </div>
              <span className="text-slate-400 text-xs">200+ beta testers</span>
            </motion.div>
          </motion.div>

          {/* Right — 3D Extension Preview */}
          <motion.div style={{ y: y1 }} className="relative">
            <motion.div
              initial={{ rotate: -5, opacity: 0, scale: 0.85 }}
              animate={{ rotate: 0, opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
              className="relative max-w-[480px] mx-auto"
            >
              <div className="absolute inset-0 bg-indigo-500/10 blur-[80px] rounded-full" />

              <div className="relative card-3d-theme glass rounded-3xl p-5 border-white/5">
                {/* Mock browser screenshot */}
                <div className="bg-slate-900 rounded-2xl relative overflow-hidden border border-white/5 shadow-inner">
                  {/* Browser chrome bar */}
                  <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5 bg-slate-950/60">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-red-500/70" />
                      <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                      <div className="w-3 h-3 rounded-full bg-green-500/70" />
                    </div>
                    <div className="flex-1 mx-3 h-6 glass rounded-md flex items-center px-3">
                      <span className="text-[10px] text-slate-500 font-mono">github.com/user/project</span>
                    </div>
                  </div>

                  {/* Code content simulation */}
                  <div className="p-4 font-mono text-[11px] leading-6 relative overflow-hidden" style={{ minHeight: 160 }}>
                  <div className="text-purple-400">{'const analyzeLayout = (grid) => {'}</div>
                    <div className="text-slate-400 pl-4">const cols = grid.<span className="text-yellow-300">getColumns</span>();</div>
                    <div className="text-slate-400 pl-4">{'return cols.map(col => {'}</div>
                    <div className="text-slate-400 pl-8">width: col.<span className="text-green-300">offsetWidth</span>,</div>
                    <div className="text-slate-400 pl-8">gap: col.<span className="text-green-300">gap</span></div>
                    <div className="text-slate-400 pl-4">{'}'});</div>
                    <div className="text-white">{'}'}</div>
                    {/* Scan line animation */}
                    <div className="absolute inset-x-0 top-0 h-8 scan-line pointer-events-none" />
                  </div>
                </div>

                {/* Query input row */}
                <div className="mt-4 flex gap-3">
                  <div className="flex-1 h-12 glass rounded-xl flex items-center px-4 gap-3 border-indigo-500/20">
                    <div className="w-2 h-2 rounded-full bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.6)] shrink-0" />
                    <span className="text-xs text-slate-300 italic truncate">"How do I refactor this CSS grid?"</span>
                  </div>
                  <div className="w-12 h-12 glass rounded-xl flex items-center justify-center border-white/10 text-indigo-300 cursor-pointer hover:text-white hover:bg-indigo-500/20 transition-all">
                    <MessageSquare size={18} />
                  </div>
                </div>

                {/* AI response bubble */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2 }}
                  className="mt-3 glass rounded-xl p-3 border-indigo-500/20"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-5 h-5 rounded-full bg-indigo-500 flex items-center justify-center">
                      <Sparkles size={10} className="text-white" />
                    </div>
                    <span className="text-[10px] text-indigo-300 font-semibold">Gemini AI</span>
                  </div>
                  <p className="text-[11px] text-slate-300 leading-5">Use <span className="text-indigo-300 font-mono">grid-template-areas</span> for named regions and <span className="text-indigo-300 font-mono">clamp()</span> for responsive column sizing...</p>
                </motion.div>
              </div>

              {/* Floating icons */}
              <FloatingIcon className="absolute -top-8 -right-8 glass p-4 rounded-2xl shadow-xl z-20 border-indigo-500/20" delay={0.2}>
                <Camera className="text-indigo-300" size={26} />
              </FloatingIcon>
              <FloatingIcon className="absolute top-1/2 -left-10 glass p-4 rounded-2xl shadow-xl z-20 border-indigo-500/20" delay={0.5}>
                <Cpu className="text-purple-400" size={26} />
              </FloatingIcon>
              <FloatingIcon className="absolute -bottom-6 right-12 glass p-3 rounded-xl shadow-xl z-20 border-indigo-500/20" delay={0.8}>
                <Zap className="text-yellow-400" size={20} />
              </FloatingIcon>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-display font-bold mb-6"
            >
              Everything you need,{' '}
              <span className="text-gradient">all in one popup.</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-slate-400 max-w-2xl mx-auto"
            >
              Stop copy-pasting screenshots into ChatGPT. ScreenQuery brings vision AI directly into your browser workflow.
            </motion.p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard index={0} icon={MousePointer2} title="One-Click Capture" description="Capture the entire visible tab instantly with a single click — no cropping tools or extra steps needed." />
            <FeatureCard index={1} icon={Sparkles} title="Gemini Vision AI" description="Powered by Google's Gemini model which understands code, charts, UI layouts, and natural language simultaneously." />
            <FeatureCard index={2} icon={MessageSquare} title="Ask Anything" description="Type any question about what's on screen — explain this error, summarize this article, translate this UI." />
            <FeatureCard index={3} icon={Zap} title="Instant Answers" description="Get responses in seconds. No tab switching, no copy-pasting, no context loss." />
            <FeatureCard index={4} icon={Shield} title="Privacy First" description="Your API key stays in your browser via chrome.storage.local. Screenshots are never stored or sent to our servers." />
            <FeatureCard index={5} icon={Cpu} title="Your Own API Key" description="Use your own Gemini API key — free tier included. You control the costs and the data." />
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24 px-6 relative">
        <div className="absolute inset-0 bg-black/20" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            {/* Steps */}
            <div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-4xl font-display font-bold mb-4"
              >
                Up and running in <span className="text-gradient">60 seconds.</span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-slate-400 mb-12"
              >
                No account. No subscription. Just download, load, and ask.
              </motion.p>
              <div className="flex flex-col gap-8">
                <StepCard number="1" title="Download the ZIP" description="Click the download button to get the extension package. No Chrome Web Store needed." />
                <StepCard number="2" title="Load as Unpacked Extension" description="Go to chrome://extensions, enable Developer Mode, click 'Load unpacked', and select the dist/ folder." />
                <StepCard number="3" title="Add your Gemini API Key" description="Click the ⚙ Settings icon in the popup and paste your free Gemini API key from aistudio.google.com." />
                <StepCard number="4" title="Capture & Ask" description="Navigate to any tab, click the extension icon, hit Capture, type your question, and get an instant AI answer." />
              </div>
            </div>

            {/* Interactive Demo */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass rounded-3xl p-6 border-indigo-500/10"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-xl bg-indigo-500 flex items-center justify-center">
                  <Camera size={16} className="text-white" />
                </div>
                <span className="font-display font-bold text-white">ScreenQuery AI</span>
                <span className="ml-auto text-xs text-slate-500 cursor-pointer hover:text-slate-300 transition-colors">⚙ Settings</span>
              </div>

              {/* Mock screenshot preview */}
              <div className="rounded-2xl overflow-hidden border border-white/5 mb-4 bg-slate-900 relative">
                <div className="flex items-center gap-2 px-3 py-2 bg-slate-950/80 border-b border-white/5">
                  <div className="flex gap-1">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
                  </div>
                  <span className="text-[10px] text-slate-600 font-mono ml-2">stackoverflow.com/questions/...</span>
                </div>
                <div className="p-4 font-mono text-[10px] leading-5 text-slate-400">
                  <div className="text-blue-400">TypeError<span className="text-white">: Cannot read properties of</span></div>
                  <div className="text-white pl-2">undefined <span className="text-slate-500">(reading 'map')</span></div>
                  <div className="text-slate-500 pl-2">at App.jsx:42:18</div>
                  <div className="text-slate-500 pl-2">at renderWithHooks</div>
                </div>
              </div>

              {/* Demo query form */}
              <form onSubmit={handleDemoSubmit} className="flex gap-2 mb-4">
                <input
                  type="text"
                  value={demoQuery}
                  onChange={(e) => setDemoQuery(e.target.value)}
                  placeholder="Ask about this screen…"
                  className="flex-1 glass rounded-xl px-4 py-3 text-sm bg-transparent outline-none placeholder-slate-600 focus:border-indigo-500 transition-colors text-white"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="px-4 py-3 bg-indigo-600 rounded-xl text-white text-sm font-bold hover:bg-indigo-500 transition-colors"
                >
                  {demoProcessing ? '…' : '→'}
                </motion.button>
              </form>

              {/* Demo answer */}
              {demoProcessing && (
                <div className="glass rounded-xl p-4 border-indigo-500/20">
                  <div className="flex items-center gap-2">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      className="w-4 h-4 border-2 border-indigo-500 border-t-transparent rounded-full"
                    />
                    <span className="text-xs text-indigo-300">Gemini is analyzing…</span>
                  </div>
                </div>
              )}
              {demoAnswer && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="glass rounded-xl p-4 border-indigo-500/20 text-sm text-slate-300 leading-relaxed"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles size={12} className="text-indigo-400" />
                    <span className="text-[10px] text-indigo-400 font-semibold uppercase tracking-wider">Gemini AI</span>
                  </div>
                  {demoAnswer}
                </motion.div>
              )}

              {!demoProcessing && !demoAnswer && (
                <p className="text-center text-xs text-slate-600 mt-2">Try typing "What does this error mean?" above ↑</p>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="download" className="py-32 px-6 overflow-hidden relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-4xl bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="max-w-4xl mx-auto glass rounded-[40px] p-12 md:p-20 text-center relative z-10 border-white/10">
          <motion.h2
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl font-display font-bold mb-8 leading-tight"
          >
            Ready to query <br /> your <span className="text-gradient">world?</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-slate-400 mb-12 max-w-lg mx-auto"
          >
            Download the free build now and start browsing smarter. No account required.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col items-center gap-6"
          >
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 0 50px rgba(255,255,255,0.3)' }}
              whileTap={{ scale: 0.97 }}
              onClick={handleDownload}
              className="px-12 py-6 rounded-3xl bg-white text-black font-extrabold text-2xl transition-all flex items-center gap-4"
            >
              <Download size={28} /> Download ZIP
            </motion.button>
            <div className="flex items-center gap-4 text-slate-500 text-sm font-medium">
              <div className="flex -space-x-2">
                {[10, 20, 30, 40].map((seed) => (
                  <img key={seed} src={`https://picsum.photos/seed/${seed}/40/40`} className="w-8 h-8 rounded-full border-2 border-slate-900 object-cover" alt="user" />
                ))}
              </div>
              Joined by 200+ beta testers
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-slate-950/40 backdrop-blur-sm border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center gap-12 mb-10 opacity-25 grayscale hover:opacity-50 transition-opacity">
            <img src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" className="h-4" alt="google" referrerPolicy="no-referrer" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/b/b9/Slack_Technologies_Logo.svg" className="h-4" alt="slack" referrerPolicy="no-referrer" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/3/39/Loom_logo.svg" className="h-5" alt="loom" referrerPolicy="no-referrer" />
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-slate-600 font-bold uppercase tracking-widest">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-indigo-500 flex items-center justify-center">
                <Camera size={12} className="text-white" />
              </div>
              <p>© 2026 ScreenQuery AI. All rights reserved.</p>
            </div>
            <div className="flex gap-8">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
   
