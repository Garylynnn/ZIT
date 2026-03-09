import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Monitor, 
  User, 
  MapPin, 
  Cpu, 
  HardDrive, 
  Database, 
  Shield, 
  Clock, 
  Activity,
  ChevronRight,
  Terminal,
  Ticket,
  AlertCircle,
  History,
  Settings,
  Home,
  FileText,
  Layers,
  ShieldCheck,
  ChevronDown,
  Flag,
  Tag,
  MoreHorizontal,
  Search
} from 'lucide-react';
import { useParams, Link } from 'react-router-dom';
import { MOCK_DEVICES } from '../mockData';
import { cn } from '../lib/utils';
import { motion } from 'motion/react';

export default function DeviceDetail() {
  const { id } = useParams();
  const device = MOCK_DEVICES.find(d => d.id === id);
  const [activeTab, setActiveTab] = useState('Manage');
  const [activeSidebar, setActiveSidebar] = useState('Processes');

  if (!device) return <div>Device not found</div>;

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Breadcrumbs & Header */}
      <div className="px-6 py-4 border-b border-slate-200">
        <div className="flex items-center gap-2 text-xs font-medium text-slate-400 mb-4">
          <Home className="w-3 h-3" />
          <ChevronRight className="w-3 h-3" />
          <span className="hover:text-slate-600 cursor-pointer">IT</span>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-[#007AFF] rounded flex items-center justify-center text-white">
              <Monitor className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-xl font-bold text-slate-900">{device.name}</h1>
                <div className="flex items-center gap-1.5 px-2 py-0.5 bg-[#EBF5FF] text-[#007AFF] text-[10px] font-bold rounded-full">
                  <div className="w-1.5 h-1.5 bg-[#007AFF] rounded-full"></div>
                  Managed
                </div>
                <div className="w-6 h-6 bg-slate-900 rounded-full flex items-center justify-center border border-slate-200 overflow-hidden">
                  <img src="https://picsum.photos/seed/user/24/24" alt="User" referrerPolicy="no-referrer" />
                </div>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <span className="px-1.5 py-0.5 border border-blue-200 text-[#007AFF] text-[9px] font-bold uppercase rounded">Workstation</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button className="px-4 py-1.5 bg-[#007AFF] text-white rounded-md text-xs font-bold hover:bg-blue-600">P2P</button>
            <div className="flex bg-white border border-slate-200 rounded-md overflow-hidden">
              <button className="p-1.5 hover:bg-slate-50 border-r border-slate-200"><Terminal className="w-4 h-4 text-slate-600" /></button>
              <button className="p-1.5 hover:bg-slate-50 flex items-center gap-1 px-2 text-xs font-bold text-slate-600">
                <ChevronDown className="w-3 h-3" />
              </button>
            </div>
            <div className="flex bg-white border border-slate-200 rounded-md overflow-hidden">
              <button className="p-1.5 hover:bg-slate-50 border-r border-slate-200"><Flag className="w-4 h-4 text-slate-600" /></button>
              <button className="p-1.5 hover:bg-slate-50 flex items-center gap-1 px-2 text-xs font-bold text-slate-600">
                <ChevronDown className="w-3 h-3" />
              </button>
            </div>
            <div className="flex bg-white border border-slate-200 rounded-md overflow-hidden">
              <button className="p-1.5 hover:bg-slate-50 border-r border-slate-200"><Tag className="w-4 h-4 text-slate-600" /></button>
              <button className="p-1.5 hover:bg-slate-50 flex items-center gap-1 px-2 text-xs font-bold text-slate-600">
                <ChevronDown className="w-3 h-3" />
              </button>
            </div>
            <div className="flex bg-white border border-slate-200 rounded-md overflow-hidden">
              <button className="px-3 py-1.5 hover:bg-slate-50 text-xs font-bold text-slate-600">Actions</button>
              <button className="p-1.5 hover:bg-slate-50 flex items-center gap-1 px-2 text-xs font-bold text-slate-600">
                <ChevronDown className="w-3 h-3" />
              </button>
            </div>
            <button className="px-4 py-1.5 bg-emerald-600 text-white rounded-md text-xs font-bold hover:bg-emerald-700 flex items-center gap-2">
              <User className="w-3.5 h-3.5" />
              Assign to Member
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="px-6 border-b border-slate-200 flex items-center gap-6">
        {['Overview', 'System', 'Manage', 'Applications', 'Updates', 'Alerts', 'Automations', 'Monitors', 'Policies', 'Permissions'].map((tab) => (
          <button 
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              "py-3 text-xs font-medium transition-all relative",
              activeTab === tab ? "text-[#007AFF]" : "text-slate-500 hover:text-slate-900"
            )}
          >
            {tab}
            {tab === 'Updates' && <span className="ml-1 px-1.5 py-0.5 bg-[#007AFF] text-white text-[9px] font-bold rounded-full">1</span>}
            {tab === 'Alerts' && <span className="ml-1 px-1.5 py-0.5 bg-[#007AFF] text-white text-[9px] font-bold rounded-full">1</span>}
            {activeTab === tab && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#007AFF]"></div>}
          </button>
        ))}
      </div>

      {/* Main Content Area with Sidebar */}
      <div className="flex-1 flex overflow-hidden">
        {/* Detail Sidebar */}
        <aside className="w-48 border-r border-slate-200 py-4">
          {['Overview', 'Hardware', 'Software', 'Terminal', 'File Explorer', 'Processes', 'Services'].map((item) => (
            <button
              key={item}
              onClick={() => setActiveSidebar(item)}
              className={cn(
                "w-full text-left px-6 py-2 text-xs font-medium transition-all",
                activeSidebar === item ? "bg-[#EBF5FF] text-[#007AFF]" : "text-slate-600 hover:bg-slate-50"
              )}
            >
              {item}
            </button>
          ))}
        </aside>

        {/* Content */}
        <div className="flex-1 p-8 overflow-y-auto bg-[#F9FAFB]">
          {activeSidebar === 'Overview' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-md border border-slate-200 shadow-sm">
                  <h3 className="text-sm font-bold text-slate-900 mb-4">User Information</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-500">Assigned User</span>
                      <span className="font-bold text-slate-900">{device.user}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-500">Email ID</span>
                      <span className="font-bold text-[#007AFF]">{device.emailId || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-500">Asset Name</span>
                      <span className="font-bold text-slate-900">{device.name}</span>
                    </div>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-md border border-slate-200 shadow-sm">
                  <h3 className="text-sm font-bold text-slate-900 mb-4">Security Status</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-500">ClamAV Status</span>
                      <span className="font-bold text-emerald-600">Active</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-500">OpenSCAP Compliance</span>
                      <span className="font-bold text-amber-600">85% Compliant</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-500">inotify Monitoring</span>
                      <span className="font-bold text-emerald-600">Enabled</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeSidebar === 'Hardware' && (
            <div className="bg-white rounded-md border border-slate-200 shadow-sm p-6">
              <h3 className="text-sm font-bold text-slate-900 mb-6">Hardware Specifications</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <Cpu className="w-5 h-5 text-slate-400" />
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase">Processor</p>
                      <p className="text-sm font-bold text-slate-900">{device.hardwareSpecs?.cpu || 'Intel Core i7'}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Database className="w-5 h-5 text-slate-400" />
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase">Memory (RAM)</p>
                      <p className="text-sm font-bold text-slate-900">{device.hardwareSpecs?.ram || '16GB DDR4'}</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <HardDrive className="w-5 h-5 text-slate-400" />
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase">Storage</p>
                      <p className="text-sm font-bold text-slate-900">{device.hardwareSpecs?.storage || '512GB SSD'}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Monitor className="w-5 h-5 text-slate-400" />
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase">Graphics (GPU)</p>
                      <p className="text-sm font-bold text-slate-900">{device.hardwareSpecs?.gpu || 'Integrated Graphics'}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeSidebar === 'Software' && (
            <div className="bg-white rounded-md border border-slate-200 shadow-sm overflow-hidden">
              <div className="p-4 border-b border-slate-200 bg-[#F9FAFB]">
                <h3 className="text-sm font-bold text-slate-900">Installed Software</h3>
              </div>
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-white border-b border-slate-200">
                    <th className="px-6 py-3 text-[10px] font-bold text-slate-400 uppercase">Software Name</th>
                    <th className="px-6 py-3 text-[10px] font-bold text-slate-400 uppercase">Version</th>
                    <th className="px-6 py-3 text-[10px] font-bold text-slate-400 uppercase">Publisher</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm">
                  {(device.installedSoftware || [
                    { name: 'Google Chrome', version: '118.0.5993.89' },
                    { name: 'Microsoft Teams', version: '1.6.00.27578' },
                    { name: 'Salt Minion', version: '3006.1' },
                    { name: 'ClamAV', version: '1.1.0' }
                  ]).map((sw, i) => (
                    <tr key={i} className="hover:bg-slate-50">
                      <td className="px-6 py-3 font-medium text-slate-900">{sw.name}</td>
                      <td className="px-6 py-3 text-slate-600">{sw.version}</td>
                      <td className="px-6 py-3 text-slate-500">Enterprise Managed</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeSidebar === 'Processes' && (
            <div className="bg-white rounded-md border border-slate-200 shadow-sm overflow-hidden">
              <div className="p-6 flex items-center justify-between border-b border-slate-200">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input 
                    type="text" 
                    placeholder="Search processes"
                    className="w-full pl-10 pr-4 py-1.5 bg-white border border-slate-200 rounded text-sm outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                <div className="flex items-center gap-8">
                  <div className="flex items-center gap-3">
                    <Cpu className="w-4 h-4 text-[#007AFF]" />
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase">CPU</p>
                      <p className="text-sm font-bold text-slate-900">0.3%</p>
                      <p className="text-[10px] text-slate-400">2 Cores at 3.19 GHz</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Database className="w-4 h-4 text-[#007AFF]" />
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase">Memory</p>
                      <p className="text-sm font-bold text-slate-900">38.5%</p>
                      <p className="text-[10px] text-slate-400">3.08 GB of 8 GB</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 border-b border-slate-200 bg-[#F9FAFB]">
                <button disabled className="px-3 py-1 bg-white border border-slate-200 rounded text-xs font-bold text-slate-300 cursor-not-allowed">
                  End Processes
                </button>
              </div>

              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-white border-b border-slate-200">
                    <th className="px-4 py-2 w-10"><input type="checkbox" className="rounded border-slate-300" /></th>
                    <th className="px-4 py-2 text-[10px] font-bold text-slate-400 uppercase">Name</th>
                    <th className="px-4 py-2 text-[10px] font-bold text-slate-400 uppercase">Process ID</th>
                    <th className="px-4 py-2 text-[10px] font-bold text-slate-400 uppercase">CPU</th>
                    <th className="px-4 py-2 text-[10px] font-bold text-slate-400 uppercase">Memory (Perc...</th>
                    <th className="px-4 py-2 text-[10px] font-bold text-slate-400 uppercase">User Name</th>
                    <th className="px-4 py-2 w-10"><Layers className="w-3 h-3 text-slate-400" /></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs text-slate-600">
                  {[
                    { name: 'AggregatorHost.exe', pid: 3848, cpu: '0%', mem: '0.1%', user: 'NT AUTHORITY\\SYSTEM' },
                    { name: 'ApplicationFrameHost.exe', pid: 7184, cpu: '0%', mem: '0.3%', user: 'DANIELLA-OLIVER\\level' },
                    { name: 'csrss.exe', pid: 516, cpu: '0%', mem: '0.1%', user: 'NT AUTHORITY\\SYSTEM' },
                    { name: 'csrss.exe', pid: 636, cpu: '0%', mem: '0.1%', user: 'NT AUTHORITY\\SYSTEM' },
                    { name: 'CTF Loader', pid: 3944, cpu: '0%', mem: '0.2%', user: 'DANIELLA-OLIVER\\level' },
                    { name: 'Desktop Window Manager', pid: 908, cpu: '0%', mem: '1.3%', user: 'Window Manager\\DWM-1' },
                    { name: 'dllhost.exe', pid: 1544, cpu: '0%', mem: '0.1%', user: 'NT AUTHORITY\\SYSTEM' },
                    { name: 'dllhost.exe', pid: 3992, cpu: '0%', mem: '0.2%', user: 'NT AUTHORITY\\SYSTEM' },
                    { name: 'dllhost.exe', pid: 5716, cpu: '0%', mem: '0.2%', user: 'DANIELLA-OLIVER\\level' },
                  ].map((proc, i) => (
                    <tr key={i} className="hover:bg-slate-50 transition-all group">
                      <td className="px-4 py-2"><input type="checkbox" className="rounded border-slate-300" /></td>
                      <td className="px-4 py-2 font-medium text-slate-900">{proc.name}</td>
                      <td className="px-4 py-2">{proc.pid}</td>
                      <td className="px-4 py-2 bg-[#FFF9E6]">{proc.cpu}</td>
                      <td className="px-4 py-2 bg-[#FFF9E6]">{proc.mem}</td>
                      <td className="px-4 py-2">{proc.user}</td>
                      <td className="px-4 py-2 text-right">
                        <MoreHorizontal className="w-4 h-4 text-slate-400 opacity-0 group-hover:opacity-100 cursor-pointer" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
