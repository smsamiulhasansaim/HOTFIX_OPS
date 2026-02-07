
import React from 'react';

interface ConsoleProps {
  logs: string[];
}

export const Console: React.FC<ConsoleProps> = ({ logs }) => {
  const scrollRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <div className="bg-[#050505] border border-slate-800 rounded-lg overflow-hidden h-72 flex flex-col font-mono text-[11px] glow-border">
      <div className="bg-[#1a1a1a] px-3 py-1.5 flex items-center justify-between border-b border-white/5">
        <div className="flex items-center gap-2">
          <svg className="w-3 h-3 text-slate-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M2 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm3.293 1.293a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 01-1.414-1.414L7.586 10 5.293 7.707a1 1 0 010-1.414zM11 12a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
          </svg>
          <span className="text-slate-400 font-bold tracking-tight uppercase">Debug Output</span>
        </div>
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-slate-700"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-slate-700"></div>
        </div>
      </div>
      <div ref={scrollRef} className="p-4 overflow-y-auto flex-1 space-y-1.5 custom-scrollbar bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] bg-fixed opacity-90">
        {logs.map((log, i) => {
          const isSuccess = log.includes('SUCCESS') || log.includes('FIXED');
          const isError = log.includes('ERROR') || log.includes('Critical');
          const isDiagnostic = log.includes('AI Diagnostic') || log.includes('Gemini');
          
          return (
            <div key={i} className="flex gap-2 animate-in fade-in slide-in-from-left-2 duration-300">
              <span className="text-slate-600 shrink-0">[{new Date().toLocaleTimeString([], { hour12: false })}]</span>
              <span className="text-blue-500 shrink-0">❯</span>
              <span className={`
                ${isSuccess ? 'text-emerald-400 font-bold' : 
                  isError ? 'text-rose-500 font-bold animate-pulse' : 
                  isDiagnostic ? 'text-cyan-400 italic' : 
                  'text-slate-300'}
              `}>
                {log}
              </span>
            </div>
          );
        })}
        {logs.length === 0 && <div className="text-slate-700 italic">Awaiting telemetry...</div>}
        <div className="flex gap-2">
           <span className="text-blue-500">❯</span>
           <span className="w-2 h-4 bg-blue-500/50 animate-pulse"></span>
        </div>
      </div>
    </div>
  );
};
