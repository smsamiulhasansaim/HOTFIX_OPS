
import React, { useState, useEffect, useCallback } from 'react';
import { INITIAL_TASKS } from './constants';
import { BugStatus, BugTask, AppState, BugCategory } from './types';
import { SitePreview } from './components/SitePreview';
import { Console } from './components/Console';
import { geminiService } from './services/geminiService';

const App: React.FC = () => {
  const [state, setState] = useState<AppState>({
    tasks: INITIAL_TASKS,
    activeTaskId: null,
    isAnalyzing: false,
    isApplyingFix: false,
    history: [
      'BOOTING HOTFIX CORE...',
      'ESTABLISHING PRODUCTION BRIDGE [OK]',
      'PULLING TELEMETRY FROM CLUSTER-01...',
      'SYSTEM ADVISORY: 4 ACTIVE PRODUCTION INCIDENTS.'
    ],
  });

  const [analysisResult, setAnalysisResult] = useState<{diagnosis: string, fix: string, impact: string} | null>(null);

  const activeTask = state.tasks.find(t => t.id === state.activeTaskId);

  const addLog = useCallback((msg: string) => {
    setState(prev => ({ ...prev, history: [...prev.history, msg] }));
  }, []);

  const handleSelectTask = (id: string) => {
    setState(prev => ({ ...prev, activeTaskId: id }));
    setAnalysisResult(null);
    addLog(`ATTACHING DEBUGGER TO INCIDENT [${id}]`);
  };

  const handleAnalyze = async () => {
    if (!activeTask) return;
    setState(prev => ({ ...prev, isAnalyzing: true }));
    addLog(`AI DIAGNOSTIC INITIATED: ANALYZING BUG PATTERN...`);
    
    const result = await geminiService.diagnoseBug(activeTask);
    setAnalysisResult(result);
    setState(prev => ({ ...prev, isAnalyzing: false }));
    addLog(`AI_CORE RESPONSE: ROOT_CAUSE FOUND.`);
  };

  const handleApplyFix = () => {
    if (!activeTask) return;
    setState(prev => ({ ...prev, isApplyingFix: true }));
    addLog(`PUSHING HOTFIX PATCH TO REMOTE REPO...`);

    setTimeout(() => {
      setState(prev => ({
        ...prev,
        isApplyingFix: false,
        tasks: prev.tasks.map(t => t.id === activeTask.id ? { ...t, status: BugStatus.FIXED } : t),
        activeTaskId: null
      }));
      setAnalysisResult(null);
      addLog(`HOTFIX DEPLOYMENT SUCCESSFUL. CACHE PURGED.`);
    }, 1500);
  };

  const getCategoryIcon = (cat: BugCategory) => {
    switch (cat) {
      case BugCategory.LAYOUT: return '📐';
      case BugCategory.JAVASCRIPT: return '⚡';
      case BugCategory.FORM: return '📝';
      case BugCategory.BACKEND: return '⚙️';
      case BugCategory.RESPONSIVENESS: return '📱';
    }
  };

  const getCategoryColor = (cat: BugCategory) => {
    switch (cat) {
      case BugCategory.LAYOUT: return 'text-purple-400 bg-purple-400/10 border-purple-500/20';
      case BugCategory.JAVASCRIPT: return 'text-yellow-400 bg-yellow-400/10 border-yellow-500/20';
      case BugCategory.FORM: return 'text-blue-400 bg-blue-400/10 border-blue-500/20';
      case BugCategory.BACKEND: return 'text-rose-400 bg-rose-400/10 border-rose-500/20';
      case BugCategory.RESPONSIVENESS: return 'text-emerald-400 bg-emerald-400/10 border-emerald-500/20';
    }
  };

  return (
    <div className="h-screen flex flex-col bg-[#020617] text-slate-100 selection:bg-blue-500/30 overflow-hidden">
      {/* Navbar / Command Bar */}
      <header className="h-16 border-b border-slate-800 flex items-center px-6 bg-[#020617]/50 backdrop-blur-xl z-50 shrink-0">
        <div className="flex items-center gap-4 w-full">
          <div className="flex items-center gap-3">
             <div className="relative">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center shadow-lg shadow-blue-500/20 overflow-hidden">
                   <div className="absolute inset-0 bg-white/10 animate-pulse"></div>
                   <svg className="w-6 h-6 text-white relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                   </svg>
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-rose-500 rounded-full border-2 border-[#020617] animate-ping"></div>
             </div>
             <div>
                <h1 className="text-lg font-black font-heading tracking-tight leading-none">HOTFIX<span className="text-blue-500">_OPS</span></h1>
                <p className="text-[10px] text-slate-500 font-mono tracking-widest uppercase mt-0.5 opacity-70">Senior Engineer Workspace v4.2</p>
             </div>
          </div>
          
          <div className="ml-auto flex items-center gap-8">
            <div className="hidden md:flex flex-col items-end">
               <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Network Health</span>
               <div className="flex gap-1 items-center mt-1">
                 {[1,2,3,4,5].map(i => <div key={i} className={`w-1 h-3 rounded-full ${i < 5 ? 'bg-emerald-500' : 'bg-slate-700'}`}></div>)}
               </div>
            </div>
            <div className="h-8 w-px bg-slate-800"></div>
            <div className="flex flex-col items-end">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Incidents Active</span>
              <span className="text-sm text-rose-500 font-black animate-pulse flex items-center gap-2">
                {state.tasks.filter(t => t.status !== BugStatus.FIXED).length} HIGH PRIORITY
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Workspace */}
      <main className="flex-1 flex overflow-hidden p-6 gap-6 bg-[#020617] relative">
        {/* Subtle Background Elements */}
        <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none"></div>
        
        {/* Left: Operations Panel */}
        <div className="w-[400px] flex flex-col gap-6 shrink-0 relative z-10">
          
          {/* Incident List */}
          <div className="flex-1 flex flex-col bg-[#0a0f1e]/80 border border-slate-800/50 rounded-2xl overflow-hidden shadow-2xl backdrop-blur-md">
            <div className="px-5 py-4 border-b border-slate-800 flex justify-between items-center bg-slate-900/20">
              <h2 className="text-xs font-black text-slate-400 tracking-widest uppercase">Production Queue</h2>
              <span className="px-2 py-0.5 bg-slate-800 rounded text-[9px] font-bold text-slate-500">V.ROLLOUT_ACTIVE</span>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
              {state.tasks.map(task => (
                <button
                  key={task.id}
                  onClick={() => handleSelectTask(task.id)}
                  disabled={task.status === BugStatus.FIXED}
                  className={`w-full text-left p-4 rounded-xl border transition-all duration-300 group relative ${
                    state.activeTaskId === task.id 
                      ? 'bg-blue-600/10 border-blue-500/40 shadow-xl shadow-blue-500/5' 
                      : task.status === BugStatus.FIXED 
                        ? 'bg-emerald-500/5 border-emerald-500/10 opacity-50 grayscale'
                        : 'bg-slate-900/40 border-slate-800 hover:border-slate-600'
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className={`px-2 py-0.5 rounded border text-[9px] font-black uppercase tracking-tighter ${getCategoryColor(task.category)}`}>
                      {getCategoryIcon(task.category)} {task.category}
                    </span>
                    <div className="flex items-center gap-1.5">
                      <div className={`w-1.5 h-1.5 rounded-full ${task.status === BugStatus.FIXED ? 'bg-emerald-500' : 'bg-rose-500 animate-pulse'}`}></div>
                      <span className={`text-[9px] font-black uppercase ${task.status === BugStatus.FIXED ? 'text-emerald-500' : 'text-rose-500'}`}>
                        {task.status}
                      </span>
                    </div>
                  </div>
                  <h3 className="font-bold text-slate-200 group-hover:text-white mb-1 transition-colors">{task.title}</h3>
                  <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed font-medium">{task.description}</p>
                  
                  {state.activeTaskId === task.id && (
                    <div className="absolute bottom-0 left-0 h-1 bg-blue-500 w-full animate-in slide-in-from-left duration-500"></div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Diagnosis & Hotfix UI */}
          <div className="shrink-0 transition-all duration-500">
            {activeTask ? (
              <div className="bg-slate-900/90 border border-blue-500/40 rounded-2xl p-5 shadow-2xl animate-in slide-in-from-bottom-6 duration-500 backdrop-blur-lg">
                <div className="flex items-center gap-3 mb-5">
                   <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400 border border-blue-500/20">
                     <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0012 18.75c-1.03 0-1.9-.4-2.593-1.003l-.547-.547z" /></svg>
                   </div>
                   <h2 className="font-black text-slate-100 uppercase tracking-widest text-sm">Issue Intelligence</h2>
                </div>
                
                <div className="space-y-4">
                  <div className="p-3.5 bg-black/60 rounded-xl border border-white/5 font-mono text-[11px] leading-relaxed relative overflow-hidden group">
                    <div className="text-slate-600 mb-2 flex items-center gap-1.5 font-bold tracking-widest uppercase text-[9px]">
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-600"></span> Technical Telemetry
                    </div>
                    <div className="text-slate-400 italic">"{activeTask.technicalDetails}"</div>
                    <div className="absolute top-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20"><path d="M7 9a2 2 0 012-2h6a2 2 0 012 2v6a2 2 0 01-2 2H9a2 2 0 01-2-2V9z"></path><path d="M5 5a2 2 0 012-2h6a2 2 0 012 2v2H7a4 4 0 00-4 4v6H5V5z"></path></svg>
                    </div>
                  </div>

                  {!analysisResult ? (
                    <button 
                      onClick={handleAnalyze}
                      disabled={state.isAnalyzing}
                      className="w-full bg-blue-600 hover:bg-blue-500 py-3.5 rounded-xl font-black text-sm tracking-widest uppercase flex items-center justify-center gap-3 transition-all transform active:scale-95 disabled:opacity-50 shadow-lg shadow-blue-500/20"
                    >
                      {state.isAnalyzing ? (
                        <><div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div> INITIALIZING SCAN...</>
                      ) : (
                        <><svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg> RUN AI DIAGNOSTIC</>
                      )}
                    </button>
                  ) : (
                    <div className="space-y-4 animate-in zoom-in-95 duration-300">
                      <div className="p-4 bg-emerald-500/5 border border-emerald-500/20 rounded-xl">
                        <div className="text-[9px] text-emerald-500 font-black uppercase tracking-[0.2em] mb-1.5">Root Cause Diagnosis</div>
                        <div className="text-sm text-emerald-300/90 leading-relaxed font-medium">
                          {analysisResult.diagnosis}
                        </div>
                      </div>

                      <div className="p-4 bg-slate-950/80 border border-white/5 rounded-xl font-mono text-[11px] relative">
                         <div className="text-[9px] text-blue-500 font-black uppercase tracking-[0.2em] mb-2 flex justify-between items-center">
                           <span>Proposed Hotfix</span>
                           <span className="text-[8px] px-1 bg-blue-500/20 rounded">JS/CSS</span>
                         </div>
                         <div className="text-blue-200/90 break-all">{analysisResult.fix}</div>
                      </div>

                      <button 
                        onClick={handleApplyFix}
                        disabled={state.isApplyingFix}
                        className="w-full bg-emerald-600 hover:bg-emerald-500 py-4 rounded-xl font-black text-sm tracking-widest uppercase flex items-center justify-center gap-3 transition-all transform active:scale-95 shadow-lg shadow-emerald-500/20"
                      >
                        {state.isApplyingFix ? (
                          <><div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div> COMMITTING...</>
                        ) : (
                          <><svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg> DEPLOY PATCH</>
                        )}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="p-8 text-center bg-slate-900/40 border border-slate-800 border-dashed rounded-3xl opacity-60">
                <svg className="w-12 h-12 text-slate-700 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <p className="text-sm font-medium text-slate-500 uppercase tracking-widest">Select an incident to begin troubleshooting</p>
              </div>
            )}
          </div>
          
          <Console logs={state.history} />
        </div>

        {/* Right: Live Environment Monitor */}
        <div className="flex-1 flex flex-col min-w-0 bg-[#0a0f1e] rounded-3xl border border-slate-800 shadow-3xl relative overflow-hidden group">
          <div className="absolute top-6 left-1/2 -translate-x-1/2 px-5 py-2 bg-slate-950/80 backdrop-blur-xl rounded-full text-[10px] font-mono font-bold text-slate-400 border border-white/5 z-40 flex items-center gap-3 shadow-2xl">
            <span className="flex h-2 w-2 relative">
               <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
               <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="tracking-widest uppercase">Environment: Staging-Rollout-V2</span>
            <div className="h-3 w-px bg-slate-800"></div>
            <span className="text-blue-500">127.0.0.1:8080</span>
          </div>

          {/* Site Simulation Component */}
          <div className="flex-1 overflow-hidden p-4 lg:p-6 transition-all duration-700 group-hover:scale-[1.005]">
             <SitePreview tasks={state.tasks} />
          </div>

          {/* Environment Overlays */}
          <div className="absolute inset-0 pointer-events-none border-[20px] border-slate-950/20 z-10"></div>
        </div>
      </main>

      {/* Footer / Status HUD */}
      <footer className="h-10 border-t border-slate-800 px-6 flex items-center justify-between text-[10px] font-mono font-bold uppercase tracking-[0.2em] bg-[#020617] text-slate-600 z-50 shrink-0">
        <div className="flex gap-8 items-center">
          <div className="flex items-center gap-2">
            <span className="text-blue-500 opacity-50">Auth:</span> <span className="text-slate-400">SR_DEV_SESSION_01</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-blue-500 opacity-50">Region:</span> <span className="text-slate-400">US-EAST-1</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-blue-500 opacity-50">API:</span> <span className="text-emerald-500 animate-pulse">CONNECTED</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
           <div className="flex gap-1.5 items-center">
             <span className="opacity-50">Load Balance:</span>
             <div className="flex gap-0.5">
               <div className="w-1.5 h-3 bg-blue-500/80"></div>
               <div className="w-1.5 h-3 bg-blue-500/80"></div>
               <div className="w-1.5 h-3 bg-blue-500/20"></div>
             </div>
           </div>
           <span className="text-slate-400">T: {new Date().toLocaleTimeString()}</span>
        </div>
      </footer>
    </div>
  );
};

export default App;
