import React, { useState } from 'react';
import { 
  Search, 
  Plus, 
  Play, 
  Terminal, 
  Clock, 
  CheckCircle2, 
  MoreVertical,
  Code,
  Monitor
} from 'lucide-react';
import { cn } from '../lib/utils';

const MOCK_SCRIPTS = [
  { id: '1', name: 'Restart VPN Service', type: 'Bash', target: 'Support Group', lastRun: 'Today 10:30 AM', result: 'Success' },
  { id: '2', name: 'Clear System Temp', type: 'PowerShell', target: 'All Windows', lastRun: 'Yesterday 04:00 PM', result: 'Success' },
  { id: '3', name: 'Update Antivirus', type: 'Python', target: 'Servers', lastRun: '2 days ago', result: 'Failed' },
];

export default function ScriptsPage() {
  const [search, setSearch] = useState('');

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Operational Scripts</h1>
          <p className="text-slate-500">Automate tasks and maintain device health</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-all shadow-lg shadow-blue-200">
            <Plus className="w-4 h-4" />
            New Script
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-200">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search scripts..."
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Script Name</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Target Scope</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Last Run</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Result</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {MOCK_SCRIPTS.map((script) => (
                <tr key={script.id} className="hover:bg-slate-50 transition-all group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-slate-100 text-slate-500 rounded-lg">
                        <Code className="w-5 h-5" />
                      </div>
                      <span className="text-sm font-bold text-slate-900">{script.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2 py-1 rounded uppercase tracking-wider">{script.type}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <Monitor className="w-4 h-4" />
                      {script.target}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1 text-sm text-slate-600">
                      <Clock className="w-3 h-3" />
                      {script.lastRun}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className={cn(
                      "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold",
                      script.result === 'Success' ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600"
                    )}>
                      {script.result === 'Success' ? <CheckCircle2 className="w-3 h-3" /> : <Terminal className="w-3 h-3" />}
                      {script.result}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="flex items-center gap-2 px-3 py-1.5 bg-blue-600 text-white rounded-lg text-xs font-bold hover:bg-blue-700 transition-all">
                        <Play className="w-3 h-3" />
                        Run
                      </button>
                      <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-all">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
