import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Download, 
  Plus, 
  MoreVertical, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle,
  ChevronRight,
  Star,
  Monitor,
  Server,
  Laptop,
  X
} from 'lucide-react';
import { MOCK_DEVICES } from '../mockData';
import { cn } from '../lib/utils';
import { Link } from 'react-router-dom';
import { exportToCSV, exportToPDF } from '../lib/exportUtils';
import { ShieldCheck } from 'lucide-react';

export default function DevicesList() {
  const [search, setSearch] = useState('');
  const [saltMinions, setSaltMinions] = useState<string[]>([]);

  React.useEffect(() => {
    fetch('/api/salt/minions')
      .then(res => res.json())
      .then(data => setSaltMinions(data.map((m: any) => m.id)))
      .catch(err => console.error('Error fetching minions:', err));
  }, []);

  const handleExportCSV = () => {
    const data = MOCK_DEVICES.map(({ id, name, assetTag, status, group, type, os, score, reachability }) => ({
      ID: id,
      Name: name,
      Tag: assetTag,
      Status: status,
      Group: group,
      Type: type,
      OS: os,
      Score: score,
      Reachability: `${reachability}%`
    }));
    exportToCSV(data, 'devices_report.csv');
  };

  const handleExportPDF = () => {
    const data = MOCK_DEVICES.map(({ name, assetTag, status, group, type, os, score }) => ({
      Name: name,
      Tag: assetTag,
      Status: status,
      Group: group,
      Type: type,
      OS: os,
      Score: score
    }));
    exportToPDF(data, 'IT Devices Inventory Report', 'devices_report.pdf');
  };

  return (
    <div className="flex flex-col h-full">
      <div className="px-8 py-6 border-b border-slate-200 flex items-center justify-between">
        <h1 className="text-xl font-bold text-slate-900">All Devices</h1>
        <div className="flex items-center gap-3">
          <button 
            onClick={handleExportCSV}
            className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 transition-all flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            CSV
          </button>
          <button 
            onClick={handleExportPDF}
            className="px-4 py-2 bg-slate-900 text-white rounded-lg text-sm font-medium hover:bg-slate-800 transition-all flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            PDF Report
          </button>
        </div>
      </div>

      <div className="p-8 space-y-6">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-xl">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search devices"
                className="w-full pl-10 pr-4 py-2 bg-[#F9FAFB] border border-slate-200 rounded-md text-sm outline-none focus:ring-1 focus:ring-blue-500 transition-all"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <button className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 rounded-md text-sm font-medium text-slate-600 hover:bg-slate-50 transition-all">
              <Filter className="w-4 h-4" />
              Filters
            </button>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 px-2 py-1 bg-[#EBF5FF] border border-blue-200 rounded text-xs font-medium text-[#007AFF]">
              Platform
              <span className="font-bold ml-1">Windows</span>
              <X className="w-3 h-3 ml-1 cursor-pointer" />
            </div>
            <button className="text-xs font-bold text-[#007AFF] hover:underline ml-auto">Clear Filters <span className="bg-[#007AFF] text-white px-1.5 py-0.5 rounded-full text-[10px]">1</span></button>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button className="px-3 py-1.5 bg-white border border-slate-200 rounded-md text-xs font-medium text-slate-600 hover:bg-slate-50 flex items-center gap-2">
              Actions <ChevronRight className="w-3 h-3 rotate-90" />
            </button>
            <div className="h-4 w-px bg-slate-200 mx-1"></div>
            <button className="p-2 text-slate-400 hover:text-slate-600"><Star className="w-4 h-4" /></button>
            <button className="p-2 text-slate-400 hover:text-slate-600"><Plus className="w-4 h-4" /></button>
            <button className="p-2 text-slate-400 hover:text-slate-600"><XCircle className="w-4 h-4" /></button>
          </div>
        </div>

        <div className="border border-slate-200 rounded-md overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#F9FAFB] border-b border-slate-200">
                <th className="px-4 py-3 w-10"><input type="checkbox" className="rounded border-slate-300" /></th>
                <th className="px-4 py-3 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Device</th>
                <th className="px-4 py-3 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Device group</th>
                <th className="px-4 py-3 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Tags</th>
                <th className="px-4 py-3 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Security score</th>
                <th className="px-4 py-3 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Reachability</th>
                <th className="px-4 py-3 w-10"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {MOCK_DEVICES.map((device) => (
                <tr key={device.id} className="hover:bg-slate-50 transition-all group cursor-pointer">
                  <td className="px-4 py-4"><input type="checkbox" className="rounded border-slate-300" /></td>
                  <td className="px-4 py-4">
                    <Link to={`/devices/${device.id}`} className="flex items-center gap-3">
                      <div className={cn(
                        "w-10 h-10 rounded flex items-center justify-center text-white",
                        device.type === 'SERVER' ? "bg-[#FF4D4D]" : "bg-[#007AFF]"
                      )}>
                        {device.type === 'SERVER' ? <Server className="w-5 h-5" /> : <Laptop className="w-5 h-5" />}
                      </div>
                      <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-slate-900">{device.name}</span>
                          {saltMinions.includes(device.name) && (
                            <div className="flex items-center gap-0.5 px-1.5 py-0.5 bg-emerald-50 text-emerald-600 rounded-full border border-emerald-100">
                              <ShieldCheck className="w-2.5 h-2.5" />
                              <span className="text-[9px] font-bold uppercase tracking-wider">Salt Managed</span>
                            </div>
                          )}
                        </div>
                        <div className="flex items-center gap-1 mt-0.5">
                          <Monitor className="w-3 h-3 text-slate-400" />
                          <span className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">{device.os.split(' ')[0]}</span>
                        </div>
                      </div>
                    </Link>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <div className={cn("w-2 h-2 rounded-full", device.status === 'Online' ? "bg-emerald-500" : "bg-slate-300")}></div>
                      <span className="text-xs font-medium text-slate-700">{device.status}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <span className="text-xs text-slate-600">Servers / {device.group}</span>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-1">
                      <span className="px-1.5 py-0.5 border border-red-200 text-red-600 text-[9px] font-bold uppercase rounded">Server</span>
                      <span className="px-1.5 py-0.5 border border-amber-200 text-amber-600 text-[9px] font-bold uppercase rounded">USB</span>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <div className="flex gap-0.5">
                        {[1, 2, 3, 4, 5].map((i) => (
                          <div key={i} className={cn("w-1 h-3 rounded-sm", i <= 4 ? "bg-emerald-500" : "bg-slate-200")}></div>
                        ))}
                      </div>
                      <span className="text-xs font-bold text-slate-700">{device.score} / 100</span>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex flex-col gap-1">
                      <div className="w-32 h-1 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-400" style={{ width: `${device.reachability}%` }}></div>
                      </div>
                      <div className="flex items-center justify-between text-[10px] text-slate-400 font-medium">
                        <span>{device.reachability.toFixed(1)}% Reachable</span>
                        <span>7 ms</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Star className="w-4 h-4 text-slate-400 hover:text-amber-400" />
                      <MoreVertical className="w-4 h-4 text-slate-400" />
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
