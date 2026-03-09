import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { 
  Search, 
  Filter, 
  AlertCircle, 
  CheckCircle2, 
  Clock, 
  MoreVertical,
  ChevronRight,
  Monitor,
  MapPin,
  Settings,
  Bell
} from 'lucide-react';
import { MOCK_ALERTS } from '../mockData';
import { cn } from '../lib/utils';

export default function AlertsList() {
  const location = useLocation();
  const [search, setSearch] = useState('');
  
  const view = location.pathname === '/alerts/history' ? 'history' : 
               location.pathname === '/alerts/config' ? 'config' : 'active';

  if (view === 'config') {
    return (
      <div className="p-8 max-w-4xl mx-auto">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Alert Configurations</h1>
            <p className="text-slate-500">Customize alert thresholds and notification settings</p>
          </div>
          <Link 
            to="/alerts"
            className="px-4 py-2 bg-slate-100 text-slate-600 rounded-lg text-sm font-bold hover:bg-slate-200 transition-all"
          >
            Back to Active Alerts
          </Link>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 divide-y divide-slate-100">
          <div className="p-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-red-50 text-red-600 rounded-xl flex items-center justify-center">
                <AlertCircle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">Critical System Alerts</h3>
                <p className="text-xs text-slate-500">Triggered when core infrastructure services fail</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Enabled</span>
              <div className="w-10 h-5 bg-blue-600 rounded-full relative cursor-pointer">
                <div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full"></div>
              </div>
            </div>
          </div>
          <div className="p-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center">
                <Bell className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">Low Stock Notifications</h3>
                <p className="text-xs text-slate-500">Alert when inventory falls below 10% threshold</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Enabled</span>
              <div className="w-10 h-5 bg-blue-600 rounded-full relative cursor-pointer">
                <div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full"></div>
              </div>
            </div>
          </div>
          <div className="p-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
                <Monitor className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">Device Offline Alerts</h3>
                <p className="text-xs text-slate-500">Triggered when a managed device is offline for {'>'} 1 hour</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Disabled</span>
              <div className="w-10 h-5 bg-slate-200 rounded-full relative cursor-pointer">
                <div className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            {view === 'history' ? 'Alert History' : 'Active Alerts'}
          </h1>
          <p className="text-slate-500">
            {view === 'history' ? 'View past security and system notifications' : 'Real-time monitoring and security notifications'}
          </p>
        </div>
        <div className="flex items-center gap-3">
          {view === 'active' ? (
            <button className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 transition-all">
              Acknowledge All
            </button>
          ) : (
            <Link 
              to="/alerts"
              className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 transition-all"
            >
              View Active
            </Link>
          )}
          <Link 
            to="/alerts/config"
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-all shadow-lg shadow-blue-200"
          >
            <Settings className="w-4 h-4" />
            Config
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search by type, device, branch..."
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-100 transition-all">
              <Filter className="w-4 h-4" />
              Severity
            </button>
            <button className="flex items-center gap-2 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-100 transition-all">
              Status
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Alert Type</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Severity</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Device</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">Branch</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Time</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {MOCK_ALERTS.map((alert) => (
                <tr key={alert.id} className="hover:bg-slate-50 transition-all group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        "p-2 rounded-lg",
                        alert.severity === 'High' ? "bg-red-50 text-red-600" : "bg-amber-50 text-amber-600"
                      )}>
                        <AlertCircle className="w-5 h-5" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-slate-900">{alert.type}</span>
                        <span className="text-xs text-slate-500">{alert.id}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={cn(
                      "px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider",
                      alert.severity === 'High' ? "bg-red-100 text-red-700" : "bg-amber-100 text-amber-700"
                    )}>
                      {alert.severity}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <Link to={`/devices/${alert.deviceId}`} className="flex items-center gap-2 text-sm text-blue-600 font-bold hover:underline">
                      <Monitor className="w-4 h-4" />
                      {alert.deviceName}
                    </Link>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center gap-1 text-sm text-slate-600">
                      <MapPin className="w-3 h-3" />
                      {alert.branch}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1 text-sm text-slate-600">
                      <Clock className="w-3 h-3" />
                      {alert.time}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className={cn(
                      "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold",
                      alert.status === 'Open' ? "bg-red-50 text-red-600" : 
                      alert.status === 'Acknowledged' ? "bg-amber-50 text-amber-600" : "bg-emerald-50 text-emerald-600"
                    )}>
                      {alert.status}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg text-xs font-bold hover:bg-blue-100 transition-all">
                        Acknowledge
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
