import React from 'react';
import { Zap, Play, Clock, Settings, Plus, MoreVertical, CheckCircle2, AlertCircle } from 'lucide-react';
import { cn } from '../lib/utils';

const MOCK_AUTOMATIONS = [
  { id: '1', name: 'Auto-Patch Critical Systems', trigger: 'On Patch Release', action: 'Deploy to Engineering Group', status: 'Active', lastRun: '2 hours ago' },
  { id: '2', name: 'Weekly System Cleanup', trigger: 'Every Sunday 02:00', action: 'Run Cleanup Script', status: 'Active', lastRun: '6 days ago' },
  { id: '3', name: 'New Employee Onboarding', trigger: 'Employee Created', action: 'Assign Default Assets', status: 'Inactive', lastRun: 'Never' },
  { id: '4', name: 'Low Stock Alert Notification', trigger: 'Stock < 10', action: 'Email IT Admin', status: 'Active', lastRun: '1 hour ago' },
];

export default function Automation() {
  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Automation</h1>
          <p className="text-slate-500">Automate repetitive IT tasks and workflows</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-all shadow-lg shadow-blue-200">
          <Plus className="w-4 h-4" />
          Create Automation
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {MOCK_AUTOMATIONS.map((auto) => (
          <div key={auto.id} className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-md transition-all flex items-center justify-between group">
            <div className="flex items-center gap-4">
              <div className={cn(
                "w-12 h-12 rounded-xl flex items-center justify-center",
                auto.status === 'Active' ? "bg-blue-50 text-blue-600" : "bg-slate-100 text-slate-400"
              )}>
                <Zap className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">{auto.name}</h3>
                <div className="flex items-center gap-4 mt-1">
                  <span className="text-xs text-slate-500 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    Trigger: {auto.trigger}
                  </span>
                  <span className="text-xs text-slate-500 flex items-center gap-1">
                    <Settings className="w-3 h-3" />
                    Action: {auto.action}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-8">
              <div className="text-right">
                <p className="text-xs text-slate-400 mb-1">Last Run</p>
                <p className="text-sm font-medium text-slate-600">{auto.lastRun}</p>
              </div>
              <div className={cn(
                "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider",
                auto.status === 'Active' ? "bg-emerald-50 text-emerald-600" : "bg-slate-100 text-slate-500"
              )}>
                {auto.status === 'Active' ? <CheckCircle2 className="w-3 h-3" /> : <AlertCircle className="w-3 h-3" />}
                {auto.status}
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all">
                  <Play className="w-4 h-4" />
                </button>
                <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-all">
                  <MoreVertical className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
