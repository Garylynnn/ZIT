import React from 'react';
import { MOCK_DEPARTMENTS } from '../mockData';
import { Building2, Users, Monitor, ChevronRight } from 'lucide-react';

export default function Departments() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Departments</h1>
        <p className="text-slate-500">Manage organizational departments and asset distribution</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {MOCK_DEPARTMENTS.map((dept) => (
          <div key={dept.id} className="bg-white rounded-2xl border border-slate-200 p-6 hover:shadow-md transition-all group">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
                <Building2 className="w-6 h-6" />
              </div>
              <button className="text-slate-400 hover:text-blue-600 transition-colors">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
            
            <h3 className="text-lg font-bold text-slate-900 mb-1">{dept.name}</h3>
            <p className="text-sm text-slate-500 mb-6">Head: {dept.head}</p>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-100">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-slate-400" />
                <div>
                  <p className="text-xs text-slate-500">Employees</p>
                  <p className="text-sm font-bold text-slate-900">{dept.employeeCount}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Monitor className="w-4 h-4 text-slate-400" />
                <div>
                  <p className="text-xs text-slate-500">Assets</p>
                  <p className="text-sm font-bold text-slate-900">{dept.assetsCount}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
