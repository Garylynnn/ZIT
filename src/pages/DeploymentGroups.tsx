import React from 'react';
import { MOCK_DEPLOYMENT_GROUPS } from '../mockData';
import { Layers, Monitor, Clock, Play, Pause, Archive, Plus, MoreVertical } from 'lucide-react';
import { cn } from '../lib/utils';

export default function DeploymentGroups() {
  const departmentGroups = [
    { id: '1', name: 'Engineering', status: 'Active', deviceCount: 450, lastUpdate: '2 hours ago', description: 'Development and QA machines in Bangalore and Mumbai' },
    { id: '2', name: 'Operations', status: 'Active', deviceCount: 120, lastUpdate: '1 day ago', description: 'Support and logistics team devices' },
    { id: '3', name: 'Finance', status: 'Paused', deviceCount: 85, lastUpdate: '3 days ago', description: 'High-security finance and accounts department systems' },
    { id: '4', name: 'HR & Admin', status: 'Archived', deviceCount: 42, lastUpdate: '2 weeks ago', description: 'General administration and HR portal access points' },
  ];

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Department Groups</h1>
          <p className="text-slate-500">Manage and monitor device groups organized by department</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-all shadow-lg shadow-blue-200">
          <Plus className="w-4 h-4" />
          Create Group
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {departmentGroups.map((group) => (
          <div key={group.id} className="bg-white rounded-2xl border border-slate-200 p-6 hover:shadow-md transition-all group">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center text-slate-600">
                  <Layers className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">{group.name}</h3>
                  <div className={cn(
                    "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider mt-1",
                    group.status === 'Active' ? "bg-emerald-50 text-emerald-600" : 
                    group.status === 'Paused' ? "bg-amber-50 text-amber-600" : "bg-slate-100 text-slate-500"
                  )}>
                    <div className={cn("w-1.5 h-1.5 rounded-full", 
                      group.status === 'Active' ? "bg-emerald-600" : 
                      group.status === 'Paused' ? "bg-amber-600" : "bg-slate-500"
                    )} />
                    {group.status}
                  </div>
                </div>
              </div>
              <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-all">
                <MoreVertical className="w-4 h-4" />
              </button>
            </div>

            <p className="text-sm text-slate-600 mb-8 leading-relaxed">
              {group.description}
            </p>

            <div className="grid grid-cols-2 gap-8 pt-6 border-t border-slate-100">
              <div className="flex items-center gap-3">
                <Monitor className="w-5 h-5 text-slate-400" />
                <div>
                  <p className="text-xs text-slate-500">Devices</p>
                  <p className="text-sm font-bold text-slate-900">{group.deviceCount}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-slate-400" />
                <div>
                  <p className="text-xs text-slate-500">Last Update</p>
                  <p className="text-sm font-bold text-slate-900">{group.lastUpdate}</p>
                </div>
              </div>
            </div>

            <div className="mt-8 flex items-center gap-3">
              <button className="flex-1 py-2 bg-slate-50 hover:bg-slate-100 text-slate-600 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-2">
                {group.status === 'Active' ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                {group.status === 'Active' ? 'Pause Group' : 'Resume Group'}
              </button>
              <button className="flex-1 py-2 bg-slate-50 hover:bg-slate-100 text-slate-600 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-2">
                <Archive className="w-3.5 h-3.5" />
                Archive
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
