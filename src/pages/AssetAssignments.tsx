import React, { useState } from 'react';
import { MOCK_EMPLOYEES } from '../mockData';
import { Monitor, User, Building2, ChevronRight, Search, Plus, X } from 'lucide-react';

export default function AssetAssignments() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const allAssignments = MOCK_EMPLOYEES.flatMap(emp => 
    emp.assets.map(asset => ({
      ...asset,
      employeeName: emp.name,
      employeeEmail: emp.email,
      department: emp.department
    }))
  );

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Asset Assignments</h1>
          <p className="text-slate-500">Track which assets are assigned to which employees</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-all shadow-lg shadow-blue-200"
        >
          <Plus className="w-4 h-4" />
          New Assignment
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
              <h3 className="text-xl font-bold text-slate-900">Assign Asset</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Select Employee</label>
                <select className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm">
                  <option>Search employee...</option>
                  {MOCK_EMPLOYEES.map(emp => (
                    <option key={emp.id}>{emp.name} ({emp.id})</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Select Asset</label>
                <select className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm">
                  <option>Search available assets...</option>
                  <option>Dell Latitude 5440 (SN: 5XJ2K1)</option>
                  <option>MacBook Pro M3 (SN: ABC123XYZ)</option>
                  <option>Logitech MX Master 3S</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Assignment Date</label>
                <input type="date" className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm" defaultValue={new Date().toISOString().split('T')[0]} />
              </div>
              <div className="pt-4 flex gap-3">
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 px-4 py-2 bg-slate-100 text-slate-600 rounded-lg text-sm font-bold hover:bg-slate-200 transition-all"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-bold hover:bg-blue-700 transition-all"
                >
                  Assign Asset
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-200">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search assignments..."
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
          </div>
        </div>

        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Asset</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Assigned To</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Department</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Type</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {allAssignments.map((assignment) => (
              <tr key={assignment.id} className="hover:bg-slate-50 transition-all group">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center">
                      <Monitor className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-bold text-slate-900">{assignment.name}</p>
                      <p className="text-xs text-slate-500">ID: {assignment.id}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-slate-100 text-slate-600 rounded-full flex items-center justify-center text-xs font-bold">
                      {assignment.employeeName.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-900">{assignment.employeeName}</p>
                      <p className="text-xs text-slate-500">{assignment.employeeEmail}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-slate-600">{assignment.department}</span>
                </td>
                <td className="px-6 py-4">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-700">
                    {assignment.type}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-slate-400 hover:text-blue-600 transition-colors">
                    <ChevronRight className="w-5 h-5" />
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
