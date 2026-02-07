
import React from 'react';
import { BugStatus, BugTask } from '../types';

interface SitePreviewProps {
  tasks: BugTask[];
}

export const SitePreview: React.FC<SitePreviewProps> = ({ tasks }) => {
  const getTaskStatus = (id: string) => tasks.find(t => t.id === id)?.status;

  const isLayoutFixed = getTaskStatus('bug-1') === BugStatus.FIXED;
  const isToggleFixed = getTaskStatus('bug-2') === BugStatus.FIXED;
  const isFormFixed = getTaskStatus('bug-3') === BugStatus.FIXED;
  const isBackendFixed = getTaskStatus('bug-4') === BugStatus.FIXED;

  const [isAnnual, setIsAnnual] = React.useState(false);

  const handleToggle = () => {
    if (isToggleFixed) {
      setIsAnnual(!isAnnual);
    } else {
      console.error('ReferenceError: updatePricing is not defined');
      // Visual glitch effect on error
      const el = document.getElementById('pricing-section');
      if (el) {
        el.classList.add('animate-ping');
        setTimeout(() => el.classList.remove('animate-ping'), 300);
      }
    }
  };

  return (
    <div className="bg-slate-900 rounded-xl shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col h-full border border-slate-800">
      {/* Enhanced Browser Chrome */}
      <div className="bg-slate-800 border-b border-slate-700 px-4 py-2.5 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-rose-500/80 border border-rose-600"></div>
            <div className="w-3 h-3 rounded-full bg-amber-500/80 border border-amber-600"></div>
            <div className="w-3 h-3 rounded-full bg-emerald-500/80 border border-emerald-600"></div>
          </div>
          <div className="flex gap-2">
             <div className="w-4 h-4 text-slate-500">
               <svg fill="currentColor" viewBox="0 0 20 20"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path></svg>
             </div>
             <div className="w-4 h-4 text-slate-500">
               <svg fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd"></path></svg>
             </div>
          </div>
        </div>
        <div className="flex-1 max-w-md bg-slate-900/80 rounded-full border border-slate-700 px-4 py-1 text-[10px] text-slate-400 font-mono flex items-center justify-between mx-4">
          <span className="truncate opacity-60">https://staging.client.io/deploy/v24.2</span>
          <svg className="w-3 h-3 text-emerald-500 shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M2.166 4.9L9.03 9.069a2.103 2.103 0 002.103 0l6.864-4.17a2.103 2.103 0 00-2.103-3.606L9.03 5.462a2.103 2.103 0 00-2.103 0L2.166 1.294a2.103 2.103 0 100 3.606z" clipRule="evenodd"></path></svg>
        </div>
        <div className="flex gap-3">
          <div className="w-5 h-5 text-slate-500"><svg fill="currentColor" viewBox="0 0 20 20"><path d="M5 4a1 1 0 00-2 0v7.268a2 2 0 000 3.464V16a1 1 0 102 0v-1.268a2 2 0 000-3.464V4zM11 4a1 1 0 10-2 0v1.268a2 2 0 000 3.464V16a1 1 0 102 0V8.732a2 2 0 000-3.464V4zM16 3a1 1 0 011 1v7.268a2 2 0 010 3.464V16a1 1 0 11-2 0v-1.268a2 2 0 010-3.464V4a1 1 0 011-1z"></path></svg></div>
        </div>
      </div>

      {/* Simulated Website Content */}
      <div className="flex-1 overflow-y-auto bg-slate-50 text-slate-900 custom-scrollbar">
        {/* Navigation */}
        <nav className="px-6 py-4 flex justify-between items-center bg-white/90 backdrop-blur-md sticky top-0 z-20 shadow-sm border-b">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-blue-600 rounded flex items-center justify-center text-white font-black text-sm italic">S</div>
            <span className="font-heading font-bold text-lg tracking-tight">SaaSFlow</span>
          </div>
          <div className="flex items-center gap-6">
            <div className="hidden md:flex gap-6 text-sm font-medium text-slate-600">
               <span>Solutions</span>
               <span>Pricing</span>
               <span>Contact</span>
            </div>
            <div className={`transition-all duration-300 ${isBackendFixed ? 'ring-2 ring-emerald-500/20' : 'ring-2 ring-rose-500/20 ring-pulse'}`}>
               <div className={`w-8 h-8 rounded-full flex items-center justify-center overflow-hidden border ${isBackendFixed ? 'border-emerald-500' : 'border-rose-500'}`}>
                 {isBackendFixed ? (
                   <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Senior" alt="User" className="w-full h-full object-cover" />
                 ) : (
                   <div className="text-[10px] text-rose-500 font-mono font-bold">ERR</div>
                 )}
               </div>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className={`relative transition-all duration-1000 ease-in-out ${isLayoutFixed ? 'max-w-6xl mx-auto px-6 py-20 flex flex-col md:flex-row items-center' : 'w-[1400px] flex px-8 py-16 overflow-visible'}`}>
          <div className={`flex-1 space-y-6 transition-transform duration-700 ${!isLayoutFixed ? 'translate-x-4' : ''}`}>
            <div className="inline-block px-3 py-1 bg-blue-50 border border-blue-100 rounded-full text-blue-600 text-xs font-bold uppercase tracking-wider">
              BETA RELEASE 2.0
            </div>
            <h1 className="text-5xl md:text-6xl font-heading font-black leading-[1.1] text-slate-900 tracking-tight">
              Scale your <span className="text-blue-600">startup</span> with precision.
            </h1>
            <p className="text-lg text-slate-600 max-w-lg leading-relaxed">
              We provide the tools, infrastructure, and analytics needed to grow your SaaS business from zero to million.
            </p>
            <div className="flex gap-4">
              <button className="px-8 py-3 bg-slate-900 text-white rounded-xl font-bold shadow-xl shadow-slate-900/20 hover:scale-105 transition-transform">Get Started Free</button>
              <button className="px-8 py-3 bg-white text-slate-900 border-2 border-slate-200 rounded-xl font-bold hover:bg-slate-50 transition-colors">Book Demo</button>
            </div>
          </div>
          <div className={`relative transition-all duration-1000 ease-in-out ${isLayoutFixed ? 'mt-12 md:mt-0 md:ml-12 w-full md:w-1/2' : 'ml-12 w-[800px] shadow-2xl scale-110'}`}>
            <div className="rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.15)] border-8 border-white">
              <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800" className="w-full aspect-[4/3] object-cover" alt="Dashboard" />
            </div>
            {!isLayoutFixed && (
              <div className="absolute -top-4 -left-4 px-4 py-2 bg-rose-500 text-white font-mono text-xs font-bold rounded-lg shadow-lg animate-bounce">
                CRITICAL: LAYOUT_OVERFLOW
              </div>
            )}
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing-section" className="bg-slate-100 py-20 px-6">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-heading font-bold text-slate-900 mb-4">Simple, Transparent Pricing</h2>
            <div className="flex items-center justify-center gap-6">
               <span className={`text-sm font-bold ${!isAnnual ? 'text-blue-600' : 'text-slate-400'}`}>Monthly</span>
               <button 
                 onClick={handleToggle}
                 className={`w-14 h-7 rounded-full p-1 transition-all duration-300 relative ${isAnnual ? 'bg-blue-600' : 'bg-slate-300 hover:bg-slate-400'}`}
               >
                 <div className={`w-5 h-5 bg-white rounded-full transition-transform duration-300 shadow-md ${isAnnual ? 'translate-x-7' : 'translate-x-0'}`}></div>
               </button>
               <span className={`text-sm font-bold ${isAnnual ? 'text-blue-600' : 'text-slate-400'}`}>Yearly <span className="text-[10px] bg-emerald-100 text-emerald-600 px-1.5 py-0.5 rounded ml-1">SAVE 20%</span></span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
             {[1, 2, 3].map(i => (
               <div key={i} className={`bg-white p-8 rounded-3xl border-2 transition-all duration-300 ${i === 2 ? 'border-blue-500 scale-105 shadow-2xl z-10' : 'border-slate-100'}`}>
                  <div className="text-slate-500 text-sm font-bold uppercase tracking-widest mb-4">{i === 1 ? 'Starter' : i === 2 ? 'Pro' : 'Enterprise'}</div>
                  <div className="text-4xl font-black text-slate-900 mb-6 tracking-tighter">
                    ${isAnnual ? (i * 90) : (i * 9)}<span className="text-lg text-slate-400 font-medium">/{isAnnual ? 'yr' : 'mo'}</span>
                  </div>
                  <ul className="space-y-4 mb-8 text-slate-600 text-sm font-medium">
                    <li className="flex items-center gap-2">✓ Unlimited projects</li>
                    <li className="flex items-center gap-2">✓ Advanced analytics</li>
                    <li className="flex items-center gap-2">✓ Priority support</li>
                  </ul>
                  <button className={`w-full py-3 rounded-xl font-bold transition-all ${i === 2 ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30 hover:bg-blue-700' : 'bg-slate-50 text-slate-900 hover:bg-slate-100'}`}>
                    Select Plan
                  </button>
               </div>
             ))}
          </div>
        </section>

        {/* Contact Form */}
        <section className="py-24 px-6 bg-white">
          <div className="max-w-xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-heading font-black text-slate-900">Get in touch</h2>
              <p className="text-slate-500 mt-2">Need specialized solutions? We're here to help.</p>
            </div>
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                if (isFormFixed) {
                  const btn = e.currentTarget.querySelector('button');
                  if (btn) btn.innerHTML = "✓ SENT";
                  setTimeout(() => { if (btn) btn.innerHTML = "Send Message"; }, 3000);
                } else {
                  alert('FATAL ERROR: AJAX_SUBMIT_FAILED (500)');
                }
              }} 
              className="space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <input type="text" placeholder="Full Name" className="w-full px-5 py-3 rounded-2xl bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all" />
                 <input type="email" placeholder="Email" required className="w-full px-5 py-3 rounded-2xl bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all" />
              </div>
              <textarea placeholder="Tell us about your project..." required className="w-full px-5 py-3 rounded-2xl bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all h-40"></textarea>
              <button type="submit" className="w-full bg-slate-950 text-white py-4 rounded-2xl font-black text-lg shadow-xl shadow-slate-900/20 hover:scale-[0.98] transition-transform">
                Send Message
              </button>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
};
