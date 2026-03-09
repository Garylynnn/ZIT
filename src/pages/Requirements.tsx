import React from 'react';
import { MOCK_REQUIREMENTS } from '../mockData';
import { FileText, Clock, CheckCircle2, XCircle, AlertCircle, Plus } from 'lucide-react';
import { cn } from '../lib/utils';

export default function Requirements() {
  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Requirements</h1>
          <p className="text-slate-500">Manage hardware, software, and access requests</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-all shadow-lg shadow-blue-200">
          <Plus className="w-4 h-4" />
          New Requirement
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Employee</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Type</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Description</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Priority</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {MOCK_REQUIREMENTS.map((req) => (
              <tr key={req.id} className="hover:bg-slate-50 transition-all group">
                <td className="px-6 py-4">
                  <span className="font-semibold text-slate-900">{req.employeeName}</span>
                </td>
                <td className="px-6 py-4">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-700">
                    {req.type}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-slate-600 max-w-xs truncate">
                  {req.description}
                </td>
                <td className="px-6 py-4">
                  <div className={cn(
                    "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold",
                    req.priority === 'Critical' ? "bg-red-50 text-red-600" : 
                    req.priority === 'High' ? "bg-orange-50 text-orange-600" : "bg-blue-50 text-blue-600"
                  )}>
                    {req.priority}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className={cn(
                    "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold",
                    req.status === 'Fulfilled' ? "bg-emerald-50 text-emerald-600" : 
                    req.status === 'Pending' ? "bg-amber-50 text-amber-600" : "bg-slate-50 text-slate-600"
                  )}>
                    {req.status === 'Fulfilled' ? <CheckCircle2 className="w-3 h-3" /> : 
                     req.status === 'Pending' ? <Clock className="w-3 h-3" /> : <AlertCircle className="w-3 h-3" />}
                    {req.status}
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-slate-500">
                  {req.createdAt}
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg text-xs font-bold hover:bg-blue-100 transition-all">
                    Review
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
