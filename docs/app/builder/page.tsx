'use client';

import React, { useState } from 'react';

const FRAMEWORKS = [
  { id: 'express', name: 'express', desc: 'classic, flexible' },
  { id: 'hono', name: 'hono', desc: 'ultrafast, modern' },
  { id: 'fastify', name: 'fastify', desc: 'performance-focused' },
];

const DATABASES = [
  { id: 'postgresql', name: 'postgresql', desc: 'relational' },
  { id: 'mongodb', name: 'mongodb', desc: 'nosql' },
  { id: 'mysql', name: 'mysql', desc: 'relational' },
];

const ORMS = [
  { id: 'prisma', name: 'prisma', desc: 'typesafe, auto-generated' },
  { id: 'drizzle', name: 'drizzle', desc: 'lightweight, sql-like' },
  { id: 'mongoose', name: 'mongoose', desc: 'mongodb-native odm' },
];

const RUNTIMES = [
  { id: 'node', name: 'node', desc: 'standard runtime' },
  { id: 'bun', name: 'bun', desc: 'fast all-in-one' },
];

const PACKAGE_MANAGERS = [
  { id: 'npm', name: 'npm', desc: 'default manager' },
  { id: 'pnpm', name: 'pnpm', desc: 'fast, disk efficient' },
  { id: 'yarn', name: 'yarn', desc: 'classic alternative' },
  { id: 'bun', name: 'bun', desc: 'native bun manager' },
];

export default function BuilderPage() {
  const [framework, setFramework] = useState('express');
  const [database, setDatabase] = useState('postgresql');
  const [orm, setOrm] = useState('prisma');
  const [runtime, setRuntime] = useState('node');
  const [packageManager, setPackageManager] = useState('npm');
  const [projectName, setProjectName] = useState('my-kodkod-app');
  const [copied, setCopied] = useState(false);

  // Filter incompatible combinations
  React.useEffect(() => {
    if (database === 'mongodb' && orm === 'drizzle') {
      setOrm('prisma');
    }
    if (database !== 'mongodb' && orm === 'mongoose') {
      setOrm('prisma');
    }
  }, [database, orm]);

  const command = `npx kodkod-stack@latest ${projectName} --framework ${framework} --database ${database} --orm ${orm} --runtime ${runtime} --package-manager ${packageManager}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0a0a0a] text-amber-700 dark:text-amber-400 font-mono py-12 selection:bg-amber-500/30">
      <div className="container mx-auto px-6 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <div className="text-amber-600/60 dark:text-amber-500/60 mb-2">
            <span className="text-amber-600 dark:text-amber-400">$</span> kodkod --interactive
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-amber-700 dark:text-amber-300">
            Stack Builder
          </h1>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Stack Selection */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white dark:bg-[#1a1a1a] border border-amber-500/30 dark:border-amber-500/20 rounded-lg overflow-hidden">
              {/* Terminal Header */}
              <div className="flex items-center gap-2 px-4 py-3 bg-gray-100 dark:bg-[#0d0d0d] border-b border-amber-500/20 dark:border-amber-500/10">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/70" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                  <div className="w-3 h-3 rounded-full bg-green-500/70" />
                </div>
                <span className="text-xs text-amber-600/50 dark:text-amber-500/50 ml-4">configuration</span>
              </div>

              <div className="p-6 space-y-6">
                {/* Project Name */}
                <div>
                  <label className="block text-amber-600/60 dark:text-amber-500/60 text-sm mb-2">
                    <span className="text-orange-600 dark:text-orange-400">#</span> project_name
                  </label>
                  <div className="flex items-center bg-gray-50 dark:bg-[#0d0d0d] border border-amber-500/30 dark:border-amber-500/20 rounded px-4 py-3">
                    <span className="text-amber-600 dark:text-amber-400 mr-2">$</span>
                    <input 
                      type="text" 
                      value={projectName}
                      onChange={(e) => setProjectName(e.target.value)}
                      className="flex-1 bg-transparent focus:outline-none text-amber-700 dark:text-amber-300"
                      placeholder="my-kodkod-app"
                    />
                  </div>
                </div>

                {/* Framework */}
                <div>
                  <label className="block text-amber-600/60 dark:text-amber-500/60 text-sm mb-3">
                    <span className="text-orange-600 dark:text-orange-400">#</span> framework
                  </label>
                  <div className="space-y-2">
                    {FRAMEWORKS.map((f) => (
                      <button
                        key={f.id}
                        onClick={() => setFramework(f.id)}
                        className={`w-full px-4 py-2 rounded border text-left transition-all text-sm ${
                          framework === f.id 
                            ? 'bg-amber-500/10 border-amber-500/50 dark:border-amber-500/40 text-amber-700 dark:text-amber-300' 
                            : 'bg-gray-50 dark:bg-[#0d0d0d] border-amber-500/20 dark:border-amber-500/10 text-amber-600/60 dark:text-amber-500/60 hover:border-amber-500/40 dark:hover:border-amber-500/30'
                        }`}
                      >
                        <span className="text-amber-600 dark:text-amber-400 mr-2">{framework === f.id ? '●' : '○'}</span>
                        <span className="font-bold">{f.name}</span>
                        <span className="text-amber-600/40 dark:text-amber-500/40 ml-2">// {f.desc}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Database */}
                <div>
                  <label className="block text-amber-600/60 dark:text-amber-500/60 text-sm mb-3">
                    <span className="text-orange-600 dark:text-orange-400">#</span> database
                  </label>
                  <div className="space-y-2">
                    {DATABASES.map((db) => (
                      <button
                        key={db.id}
                        onClick={() => setDatabase(db.id)}
                        className={`w-full px-4 py-2 rounded border text-left transition-all text-sm ${
                          database === db.id 
                            ? 'bg-amber-500/10 border-amber-500/50 dark:border-amber-500/40 text-amber-700 dark:text-amber-300' 
                            : 'bg-gray-50 dark:bg-[#0d0d0d] border-amber-500/20 dark:border-amber-500/10 text-amber-600/60 dark:text-amber-500/60 hover:border-amber-500/40 dark:hover:border-amber-500/30'
                        }`}
                      >
                        <span className="text-amber-600 dark:text-amber-400 mr-2">{database === db.id ? '●' : '○'}</span>
                        <span className="font-bold">{db.name}</span>
                        <span className="text-amber-600/40 dark:text-amber-500/40 ml-2">// {db.desc}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* ORM */}
                <div>
                  <label className="block text-amber-600/60 dark:text-amber-500/60 text-sm mb-3">
                    <span className="text-orange-600 dark:text-orange-400">#</span> orm
                  </label>
                  <div className="space-y-2">
                    {ORMS.map((o) => {
                      const isDisabled = (database === 'mongodb' && o.id === 'drizzle') || (database !== 'mongodb' && o.id === 'mongoose');
                      return (
                        <button
                          key={o.id}
                          disabled={isDisabled}
                          onClick={() => setOrm(o.id)}
                          className={`w-full px-4 py-2 rounded border text-left transition-all text-sm ${
                            orm === o.id 
                              ? 'bg-amber-500/10 border-amber-500/50 dark:border-amber-500/40 text-amber-700 dark:text-amber-300' 
                              : isDisabled
                                ? 'bg-gray-100 dark:bg-[#080808] border-gray-200 dark:border-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed opacity-50'
                                : 'bg-gray-50 dark:bg-[#0d0d0d] border-amber-500/20 dark:border-amber-500/10 text-amber-600/60 dark:text-amber-500/60 hover:border-amber-500/40 dark:hover:border-amber-500/30'
                          }`}
                        >
                          <span className={`${isDisabled ? 'text-gray-300 dark:text-gray-700' : 'text-amber-600 dark:text-amber-400'} mr-2 truncate`}>{orm === o.id ? '●' : '○'}</span>
                          <span className="font-bold">{o.name}</span>
                          <span className="text-amber-600/40 dark:text-amber-500/40 ml-2">// {o.desc}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Runtime */}
                <div>
                  <label className="block text-amber-600/60 dark:text-amber-500/60 text-sm mb-3">
                    <span className="text-orange-600 dark:text-orange-400">#</span> runtime
                  </label>
                  <div className="flex gap-4">
                    {RUNTIMES.map((r) => (
                      <button
                        key={r.id}
                        onClick={() => setRuntime(r.id)}
                        className={`flex-1 px-4 py-2 rounded border text-left transition-all text-sm ${
                          runtime === r.id 
                            ? 'bg-amber-500/10 border-amber-500/50 dark:border-amber-500/40 text-amber-700 dark:text-amber-300' 
                            : 'bg-gray-50 dark:bg-[#0d0d0d] border-amber-500/20 dark:border-amber-500/10 text-amber-600/60 dark:text-amber-500/60 hover:border-amber-500/40 dark:hover:border-amber-500/30'
                        }`}
                      >
                        <span className="text-amber-600 dark:text-amber-400 mr-2">{runtime === r.id ? '●' : '○'}</span>
                        <span className="font-bold">{r.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Package Manager */}
                <div>
                  <label className="block text-amber-600/60 dark:text-amber-500/60 text-sm mb-3">
                    <span className="text-orange-600 dark:text-orange-400">#</span> package_manager
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    {PACKAGE_MANAGERS.map((pm) => (
                      <button
                        key={pm.id}
                        onClick={() => setPackageManager(pm.id)}
                        className={`px-4 py-2 rounded border text-left transition-all text-sm ${
                          packageManager === pm.id 
                            ? 'bg-amber-500/10 border-amber-500/50 dark:border-amber-500/40 text-amber-700 dark:text-amber-300' 
                            : 'bg-gray-50 dark:bg-[#0d0d0d] border-amber-500/20 dark:border-amber-500/10 text-amber-600/60 dark:text-amber-500/60 hover:border-amber-500/40 dark:hover:border-amber-500/30'
                        }`}
                      >
                        <span className="text-amber-600 dark:text-amber-400 mr-2">{packageManager === pm.id ? '●' : '○'}</span>
                        <span className="font-bold">{pm.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Generated Command (Sticky) */}
          <div className="lg:col-span-1">
            <div className="lg:sticky lg:top-20">
              <div className="bg-white dark:bg-[#1a1a1a] border border-amber-500/30 dark:border-amber-500/20 rounded-lg overflow-hidden">
                {/* Terminal Header */}
                <div className="flex items-center gap-2 px-4 py-3 bg-gray-100 dark:bg-[#0d0d0d] border-b border-amber-500/20 dark:border-amber-500/10">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/70" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                    <div className="w-3 h-3 rounded-full bg-green-500/70" />
                  </div>
                  <span className="text-xs text-amber-600/50 dark:text-amber-500/50 ml-4">output</span>
                </div>

                <div className="p-4">
                  <label className="block text-amber-600/60 dark:text-amber-500/60 text-xs mb-3">
                    <span className="text-orange-600 dark:text-orange-400">#</span> generated_command
                  </label>
                  
                  <div className="bg-gray-50 dark:bg-[#0d0d0d] border border-amber-500/30 dark:border-amber-500/20 rounded p-4">
                    <code className="text-amber-700 dark:text-amber-300 text-sm break-all leading-relaxed block">
                      <span className="text-amber-600 dark:text-amber-400">$</span> npx kodkod-stack@latest {projectName} \<br />
                      <span className="text-amber-600/60 dark:text-amber-500/60 ml-4">--framework</span> <span className="text-orange-600 dark:text-orange-400">{framework}</span> \<br />
                      <span className="text-amber-600/60 dark:text-amber-500/60 ml-4">--database</span> <span className="text-orange-600 dark:text-orange-400">{database}</span> \<br />
                      <span className="text-amber-600/60 dark:text-amber-500/60 ml-4">--orm</span> <span className="text-orange-600 dark:text-orange-400">{orm}</span> \<br />
                      <span className="text-amber-600/60 dark:text-amber-500/60 ml-4">--runtime</span> <span className="text-orange-600 dark:text-orange-400">{runtime}</span> \<br />
                      <span className="text-amber-600/60 dark:text-amber-500/60 ml-4">--package-manager</span> <span className="text-orange-600 dark:text-orange-400">{packageManager}</span>
                    </code>
                  </div>

                  <button 
                    onClick={handleCopy}
                    className="w-full mt-4 px-4 py-3 bg-amber-600 dark:bg-amber-500 text-white dark:text-black font-bold rounded hover:bg-amber-500 dark:hover:bg-amber-400 transition-all flex items-center justify-center gap-2"
                  >
                    {copied ? (
                      <>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Copied!
                      </>
                    ) : (
                      <>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                        Copy
                      </>
                    )}
                  </button>

                  <p className="text-amber-600/40 dark:text-amber-500/40 text-xs mt-4 text-center">
                    Paste in your terminal to start
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
