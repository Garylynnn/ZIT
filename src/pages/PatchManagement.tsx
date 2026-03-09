import React, { useState } from 'react';
import { 
  Shield, 
  CheckCircle2, 
  Clock, 
  Server, 
  Zap, 
  Play, 
  Settings,
  RefreshCw,
  AlertTriangle,
  ChevronRight,
  Search,
  Filter
} from 'lucide-react';
import { cn } from '../lib/utils';

const MOCK_PATCH_POLICIES = [
  { id: '1', name: 'Workstations - Critical', target: 'Workstations', schedule: 'Weekly', status: 'Active', lastRun: '2 days ago' },
  { id: '2', name: 'Servers - Security', target: 'Servers', schedule: 'Daily', status: 'Active', lastRun: '5 hours ago' },
  { id: '3', name: 'Linux Hardening', target: 'Linux Devices', schedule: 'Monthly', status: 'Paused', lastRun: '15 days ago' },
];

export default function PatchManagement() {
  const [activeTab, setActiveTab] = useState('Policies');

  return (
    <div className="flex flex-col h-full bg-white">
      <div className="px-8 py-6 border-b border-slate-200 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Patch Management (SaltStack)</h1>
          <p className="text-xs text-slate-500 mt-1">Orchestrate updates and security patches across your infrastructure</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 bg-[#007AFF] text-white rounded-md text-sm font-semibold hover:bg-blue-600 transition-all flex items-center gap-2">
            <RefreshCw className="w-4 h-4" />
            Run Salt Highstate
          </button>
        </div>
      </div>

      <div className="px-8 border-b border-slate-200 flex items-center gap-6">
        {['Policies', 'Compliance', 'Vulnerabilities', 'History'].map((tab) => (
          <button 
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              "py-4 text-sm font-medium transition-all relative",
              activeTab === tab ? "text-[#007AFF]" : "text-slate-500 hover:text-slate-900"
            )}
          >
            {tab}
            {activeTab === tab && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#007AFF]"></div>}
          </button>
        ))}
      </div>

      <div className="p-8 space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-900">Patch Policies</h2>
              <button className="text-[#007AFF] text-sm font-bold hover:underline flex items-center gap-1">
                <Plus className="w-4 h-4" />
                Add Policy
              </button>
            </div>

            <div className="border border-slate-200 rounded-md overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#F9FAFB] border-b border-slate-200">
                    <th className="px-4 py-3 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Policy Name</th>
                    <th className="px-4 py-3 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Target</th>
                    <th className="px-4 py-3 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Schedule</th>
                    <th className="px-4 py-3 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Status</th>
                    <th className="px-4 py-3 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Last Run</th>
                    <th className="px-4 py-3"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {MOCK_PATCH_POLICIES.map((policy) => (
                    <tr key={policy.id} className="hover:bg-slate-50 transition-all group">
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-3">
                          <Shield className="w-4 h-4 text-slate-400" />
                          <span className="text-sm font-bold text-slate-900">{policy.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-600">{policy.target}</td>
                      <td className="px-4 py-4 text-sm text-slate-600">{policy.schedule}</td>
                      <td className="px-4 py-4">
                        <div className={cn(
                          "inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase",
                          policy.status === 'Active' ? "bg-emerald-50 text-emerald-600" : "bg-slate-100 text-slate-500"
                        )}>
                          {policy.status}
                        </div>
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-500">{policy.lastRun}</td>
                      <td className="px-4 py-4 text-right">
                        <button className="p-1.5 hover:bg-slate-100 rounded transition-all">
                          <Settings className="w-4 h-4 text-slate-400" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-lg font-bold text-slate-900">Salt Status</h2>
            <div className="bg-white p-6 rounded-md border border-slate-200 shadow-sm space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded flex items-center justify-center">
                    <Zap className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">Salt Master</p>
                    <p className="text-xs text-emerald-600 font-medium">Connected</p>
                  </div>
                </div>
                <span className="text-xs text-slate-400">v3006.1</span>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-500">Connected Minions</span>
                  <span className="font-bold text-slate-900">1,242</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-500">Pending Keys</span>
                  <span className="font-bold text-amber-600">3</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-500">Last Global Sync</span>
                  <span className="font-bold text-slate-900">12 mins ago</span>
                </div>
              </div>

              <button className="w-full py-2 bg-slate-50 border border-slate-200 text-slate-600 text-xs font-bold rounded hover:bg-slate-100 transition-all">
                Manage Salt Keys
              </button>
            </div>

            <div className="bg-[#FFF9E6] p-6 rounded-md border border-amber-200 space-y-3">
              <div className="flex items-center gap-2 text-amber-700">
                <AlertTriangle className="w-5 h-5" />
                <h3 className="font-bold text-sm">Vulnerability Alert</h3>
              </div>
              <p className="text-xs text-amber-700 leading-relaxed">
                12 devices are missing critical security patch **KB5034765**. Salt state 'windows.security.patches' is ready for deployment.
              </p>
              <button className="text-amber-700 text-xs font-bold hover:underline">Deploy now</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Plus({ className }: { className?: string }) {
  return <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>;
}
