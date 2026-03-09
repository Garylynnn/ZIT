import React, { useState } from 'react';
import { MOCK_EMPLOYEES } from '../mockData';
import { Employee } from '../types';
import { 
  User, 
  Mail, 
  Building2, 
  Monitor, 
  Cpu, 
  HardDrive, 
  Layers, 
  ChevronRight,
  Search,
  ArrowLeft
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

export default function Employees() {
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredEmployees = MOCK_EMPLOYEES.filter(emp => 
    emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    emp.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    emp.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (selectedEmployee) {
    return (
      <div className="p-8 max-w-5xl mx-auto">
        <button 
          onClick={() => setSelectedEmployee(null)}
          className="flex items-center gap-2 text-slate-500 hover:text-slate-900 mb-8 transition-all group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Employees
        </button>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-8 bg-slate-50 border-b border-slate-200 flex items-center gap-6">
            <div className="w-20 h-20 bg-blue-600 rounded-2xl flex items-center justify-center text-white text-3xl font-bold">
              {selectedEmployee.name.charAt(0)}
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-900">{selectedEmployee.name}</h1>
              <div className="flex items-center gap-4 mt-2 text-slate-500">
                <div className="flex items-center gap-1.5">
                  <Mail className="w-4 h-4" />
                  {selectedEmployee.email}
                </div>
                <div className="flex items-center gap-1.5">
                  <Building2 className="w-4 h-4" />
                  {selectedEmployee.department}
                </div>
              </div>
            </div>
          </div>

          <div className="p-8">
            <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              <Monitor className="w-5 h-5 text-blue-600" />
              Assigned Assets
            </h2>

            <div className="space-y-6">
              {selectedEmployee.assets.map((asset) => (
                <div key={asset.id} className="border border-slate-200 rounded-xl p-6 hover:border-blue-200 transition-all">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="text-lg font-bold text-slate-900">{asset.name}</h3>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 mt-1">
                        {asset.type}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 text-slate-900 font-semibold">
                        <Cpu className="w-4 h-4 text-slate-400" />
                        Hardware Specs
                      </div>
                      <p className="text-sm text-slate-600 pl-7 leading-relaxed">
                        {asset.hardware}
                      </p>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center gap-3 text-slate-900 font-semibold">
                        <HardDrive className="w-4 h-4 text-slate-400" />
                        Operating System
                      </div>
                      <p className="text-sm text-slate-600 pl-7">
                        {asset.os}
                      </p>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center gap-3 text-slate-900 font-semibold">
                        <Layers className="w-4 h-4 text-slate-400" />
                        Installed Software
                      </div>
                      <div className="flex flex-wrap gap-2 pl-7">
                        {asset.software.map((sw) => (
                          <span key={sw} className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-md">
                            {sw}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Employees</h1>
          <p className="text-slate-500">Manage employee assets and information</p>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text"
            placeholder="Search employees..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all w-64"
          />
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Employee</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Email ID</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Department</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredEmployees.map((emp) => (
              <tr 
                key={emp.id} 
                onClick={() => setSelectedEmployee(emp)}
                className="hover:bg-slate-50 cursor-pointer transition-all group"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center font-bold">
                      {emp.name.charAt(0)}
                    </div>
                    <span className="font-semibold text-slate-900">{emp.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-slate-600">{emp.email}</td>
                <td className="px-6 py-4">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-700">
                    {emp.department}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-blue-600 group-hover:translate-x-1 transition-all inline-block" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
