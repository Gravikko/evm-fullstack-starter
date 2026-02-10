import { useState } from 'react'
import { Download, Layers, ChevronRight, Github, Code } from 'lucide-react'

function XIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}
import { components } from './data/components'

function App() {
  const [activeId, setActiveId] = useState<number>(1)
  const activeComponent = components.find(c => c.id === activeId) || components[0]

  const handleDownload = (componentName: string) => {
    const link = document.createElement('a')
    link.href = `/downloads/${componentName}.zip`
    link.download = `${componentName}.zip`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="text-slate-800 flex flex-col min-h-screen relative overflow-x-hidden">
      {/* --- HEADER / PRESENTATION --- */}
      <header className="relative z-10 w-full max-w-7xl mx-auto pt-20 pb-16 px-6 flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/60 backdrop-blur-md border border-indigo-200 shadow-sm text-sm font-semibold text-indigo-700 mb-10">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-indigo-600"></span>
          </span>
          v2.0 Now Available
        </div>

        <h1 className="text-6xl md:text-7xl font-extrabold tracking-tight text-slate-900 mb-8 drop-shadow-sm leading-tight">
          Web3 <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-700 to-blue-600">Starter Kit</span>
        </h1>

        <p className="text-xl md:text-2xl text-slate-600 max-w-3xl leading-relaxed font-medium mb-10">
          A curated collection of production-ready dApp components.
          <br className="hidden md:block" />
          Copy, paste, and ship your next crypto project in record time.
        </p>

        <div className="flex gap-4 flex-wrap justify-center">
          <a href="https://github.com/gravikko/evm-fullstack-starter" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-slate-700 hover:text-indigo-700 font-semibold transition-colors bg-white/40 px-6 py-3 rounded-lg border border-transparent hover:border-indigo-200 hover:bg-white/60">
            <Github size={20} /> Star on GitHub
          </a>
        </div>
      </header>

      {/* --- MAIN WINDOW (The "Rectangle") --- */}
      <main className="relative z-10 flex-1 w-full max-w-[1400px] mx-auto px-6 sm:px-8 pb-24">
        {/* The Card Itself */}
        <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl shadow-indigo-200/50 border border-white/60 overflow-hidden flex flex-col md:flex-row h-[750px] transition-all duration-300">
          {/* SIDEBAR - Fixed width, no shrink */}
          <aside className="w-full md:w-80 bg-slate-50/60 border-r border-slate-200/60 flex flex-col flex-shrink-0">
            <div className="p-6 border-b border-slate-200/60 flex-shrink-0">
              <div className="flex items-center gap-2 text-slate-400 mb-4">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-amber-400" />
                <div className="w-3 h-3 rounded-full bg-emerald-400" />
              </div>
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest pl-1">Explorer</h3>
            </div>

            {/* Component List */}
            <nav className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-2">
              {components.map((comp) => {
                const Icon = comp.icon
                const isActive = activeId === comp.id
                return (
                  <button
                    key={comp.id}
                    onClick={() => setActiveId(comp.id)}
                    className={`w-full flex items-center gap-3 px-5 py-4 rounded-lg text-sm font-semibold transition-all duration-200 group ${
                      isActive
                        ? 'bg-white text-indigo-700 shadow-md shadow-indigo-100 scale-[1.02] ring-1 ring-black/5'
                        : 'text-slate-600 hover:bg-white/60 hover:text-slate-800'
                    }`}
                  >
                    <Icon size={18} className={isActive ? 'text-indigo-600' : 'text-slate-400 group-hover:text-slate-500'} strokeWidth={2.5} />
                    <span className="truncate">{comp.title}</span>
                    {isActive && <ChevronRight size={16} className="ml-auto text-indigo-400 flex-shrink-0" />}
                  </button>
                )
              })}
            </nav>
          </aside>

          {/* CONTENT AREA - Flex grow */}
          <section className="flex-1 flex flex-col bg-white/40 h-full overflow-hidden min-w-0">
            {/* Toolbar */}
            <div className="h-16 border-b border-slate-200/60 flex items-center justify-between px-8 bg-white/30 backdrop-blur-sm flex-shrink-0">
              <div className="flex items-center gap-2 text-sm text-slate-500 truncate">
                <span className="hover:text-indigo-700 cursor-pointer transition-colors">Library</span>
                <span className="text-slate-300">/</span>
                <span className="text-slate-900 font-medium">{activeComponent.name}</span>
              </div>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto custom-scrollbar p-8 md:p-12">
              <div className="max-w-3xl mx-auto">
                <div className="flex items-start justify-between mb-8 flex-wrap gap-6">
                  <div>
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 leading-tight">{activeComponent.title}</h2>
                    <div className="flex flex-wrap gap-2">
                      {activeComponent.chains.map(chain => (
                        <span key={chain} className="px-3 py-1.5 rounded-md bg-slate-100 border border-slate-200 text-slate-600 text-xs font-bold uppercase tracking-wide">
                          {chain}
                        </span>
                      ))}
                    </div>
                  </div>
                  <button
                    onClick={() => handleDownload(activeComponent.name)}
                    className="flex items-center gap-3 bg-slate-900 hover:bg-indigo-600 text-white px-8 py-4 rounded-lg font-semibold transition-all shadow-lg shadow-slate-200 hover:shadow-indigo-200 transform hover:-translate-y-0.5 whitespace-nowrap"
                  >
                    <Download size={18} />
                    Download Code
                  </button>
                </div>

                <p className="text-lg text-slate-600 leading-relaxed mb-12">
                  {activeComponent.description}
                </p>

                {/* Feature Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
                  {activeComponent.features.map((feat, i) => (
                    <div key={i} className="flex items-start gap-3 p-5 rounded-lg bg-white/60 border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                      <div className="mt-1 min-w-[20px] h-5 rounded-full bg-indigo-50 flex items-center justify-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                      </div>
                      <span className="text-slate-700 font-medium leading-relaxed">{feat}</span>
                    </div>
                  ))}
                </div>

                {/* Dependencies & Install */}
                <div className="space-y-8">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest mb-4 flex items-center gap-2">
                      <Layers size={16} /> Dependencies
                    </h3>
                    <div className="flex flex-wrap gap-3">
                      {activeComponent.dependencies.map(dep => (
                        <code key={dep} className="px-4 py-2 rounded-lg bg-indigo-50 text-indigo-700 font-mono text-sm border border-indigo-100">
                          npm i {dep}
                        </code>
                      ))}
                    </div>
                  </div>

                  <div className="pt-8 border-t border-slate-200/60">
                    <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest mb-4 flex items-center gap-2">
                      <Code size={16} /> Code Preview
                    </h3>
                    <div className="rounded-lg bg-slate-900 overflow-hidden shadow-inner">
                      <div className="flex items-center gap-2 px-4 py-3 bg-slate-800/80 border-b border-slate-700/50">
                        <div className="w-3 h-3 rounded-full bg-red-500/70" />
                        <div className="w-3 h-3 rounded-full bg-amber-500/70" />
                        <div className="w-3 h-3 rounded-full bg-emerald-500/70" />
                        <span className="ml-2 text-xs text-slate-500 font-mono">{activeComponent.name}/hook.ts</span>
                      </div>
                      <pre className="p-5 overflow-x-auto custom-scrollbar">
                        <code className="text-sm leading-relaxed text-slate-300 font-mono whitespace-pre">{activeComponent.codeSnippet}</code>
                      </pre>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* --- FOOTER --- */}
      <footer className="relative z-10 w-full bg-white/60 backdrop-blur-md border-t border-slate-200 mt-20 pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-2">
              <h4 className="text-xl font-bold text-slate-900 mb-6 leading-tight">Web3 Starter Kit</h4>
              <p className="text-slate-500 leading-relaxed max-w-sm">
                Open-source UI components for the modern web. Built for developers who want to ship faster without compromising on quality.
              </p>
            </div>
            <div>
              <h5 className="font-bold text-slate-900 mb-6">Resources</h5>
              <ul className="space-y-4 text-slate-500">
                <li><a href="https://github.com/gravikko/evm-fullstack-starter" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-600 transition-colors">GitHub Repository</a></li>
                <li><a href="https://github.com/gravikko/evm-fullstack-starter#readme" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-600 transition-colors">Documentation</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-bold text-slate-900 mb-6">Connect</h5>
              <div className="flex gap-4">
                <a href="https://x.com/gravikko" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-900 hover:text-white hover:border-transparent transition-all shadow-sm">
                  <XIcon size={18} />
                </a>
                <a href="https://github.com/gravikko/evm-fullstack-starter" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-900 hover:text-white hover:border-transparent transition-all shadow-sm">
                  <Github size={18} />
                </a>
              </div>
            </div>
          </div>
          <div className="pt-10 border-t border-slate-200 flex flex-col md:flex-row items-center justify-between text-sm text-slate-400">
            <p>&copy; 2026 Web3 Starter Kit. Open Source (MIT).</p>
            <p className="mt-4 md:mt-0">Designed for builders.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
