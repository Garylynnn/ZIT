import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  Plus, 
  FileText, 
  CheckCircle2, 
  Clock, 
  XCircle,
  MoreVertical,
  ChevronRight,
  ShieldCheck,
  UserCheck,
  User,
  MapPin
} from 'lucide-react';
import { MOCK_GATEPASSES, MOCK_EMPLOYEES, MOCK_DEVICES } from '../mockData';
import { cn } from '../lib/utils';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export default function GatepassList() {
  const location = useLocation();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  
  // Form State
  const [selectedEmployeeId, setSelectedEmployeeId] = useState('');
  const [selectedAssetId, setSelectedAssetId] = useState('');
  const [fromBranch, setFromBranch] = useState('HO Bangalore');
  const [toBranch, setToBranch] = useState('');
  const [purpose, setPurpose] = useState('');

  const selectedEmployee = useMemo(() => 
    MOCK_EMPLOYEES.find(e => e.id === selectedEmployeeId),
    [selectedEmployeeId]
  );

  const availableAssets = useMemo(() => {
    if (!selectedEmployee) return [];
    // In a real app, we'd filter MOCK_DEVICES by the employee's assigned assets
    // For now, we'll use the assets listed in the employee object
    return selectedEmployee.assets;
  }, [selectedEmployee]);

  const handleCreateGatepass = () => {
    if (!selectedEmployeeId || !selectedAssetId || !toBranch || !purpose) {
      alert('Please fill in all required fields');
      return;
    }

    const asset = availableAssets.find(a => a.id === selectedAssetId);
    
    // In a real app, this would be an API call
    alert(`Gatepass generated successfully for ${selectedEmployee?.name} moving ${asset?.name} to ${toBranch}`);
    navigate('/gatepasses');
  };
  
  const view = location.pathname === '/gatepasses/new' ? 'new' : 
               location.pathname === '/gatepasses/pending' ? 'pending' : 'all';

  if (view === 'new') {
    return (
      <div className="p-8 max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-900">Create New Gatepass</h1>
          <p className="text-slate-500">Authorize asset movement for employees</p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-8 space-y-6 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Select Employee</label>
              <select 
                value={selectedEmployeeId}
                onChange={(e) => {
                  setSelectedEmployeeId(e.target.value);
                  setSelectedAssetId(''); // Reset asset when employee changes
                }}
                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select employee...</option>
                {MOCK_EMPLOYEES.map(emp => (
                  <option key={emp.id} value={emp.id}>{emp.name} ({emp.email})</option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Asset to Move</label>
              <select 
                value={selectedAssetId}
                onChange={(e) => setSelectedAssetId(e.target.value)}
                disabled={!selectedEmployeeId}
                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
              >
                <option value="">{selectedEmployeeId ? 'Select assigned asset...' : 'Select employee first'}</option>
                {availableAssets.map(asset => (
                  <option key={asset.id} value={asset.id}>{asset.name} ({asset.type})</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">From Branch</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <select 
                  value={fromBranch}
                  onChange={(e) => setFromBranch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option>HO Bangalore</option>
                  <option>Support Office - Bangalore</option>
                  <option>Mumbai Branch</option>
                  <option>Remote</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">To Branch / Destination</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input 
                  type="text"
                  placeholder="Enter destination..."
                  value={toBranch}
                  onChange={(e) => setToBranch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Purpose of Movement</label>
            <textarea 
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
              className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm h-24 outline-none focus:ring-2 focus:ring-blue-500" 
              placeholder="e.g. Remote work, Repair, Office transfer..."
            ></textarea>
          </div>

          <div className="pt-6 border-t border-slate-100 flex gap-4">
            <Link 
              to="/gatepasses"
              className="flex-1 px-4 py-2 bg-slate-100 text-slate-600 rounded-lg text-sm font-bold hover:bg-slate-200 transition-all text-center"
            >
              Cancel
            </Link>
            <button 
              onClick={handleCreateGatepass}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200"
            >
              Generate Gatepass
            </button>
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
            {view === 'pending' ? 'Pending Approvals' : 'Gatepasses'}
          </h1>
          <p className="text-slate-500">
            {view === 'pending' ? 'Gatepasses awaiting manager or security sign-off' : 'Track and authorize asset movement across locations'}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link 
            to="/gatepasses/new"
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-all shadow-lg shadow-blue-200"
          >
            <Plus className="w-4 h-4" />
            Create Gatepass
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search by ID, asset, employee..."
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-100 transition-all">
              <Filter className="w-4 h-4" />
              Status
            </button>
            <button className="flex items-center gap-2 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-100 transition-all">
              Branch
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Gatepass ID</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Asset / Item</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Employee</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Branch</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">Signatures</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {MOCK_GATEPASSES.map((gp) => (
                <tr key={gp.id} className="hover:bg-slate-50 transition-all group cursor-pointer">
                  <td className="px-6 py-4">
                    <Link to={`/gatepasses/${gp.id}`} className="text-sm font-bold text-blue-600 hover:underline">{gp.id}</Link>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-slate-900">{gp.assetName}</span>
                      <span className="text-xs text-slate-500">{gp.purpose}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 bg-slate-100 rounded-full flex items-center justify-center">
                        <User className="w-4 h-4 text-slate-400" />
                      </div>
                      <span className="text-sm text-slate-600">{gp.employeeName}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-slate-600">{gp.branch}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-2">
                      <div title="Manager" className={cn("p-1.5 rounded-lg", gp.managerSign ? "bg-emerald-50 text-emerald-600" : "bg-slate-50 text-slate-300")}>
                        <ShieldCheck className="w-4 h-4" />
                      </div>
                      <div title="Employee" className={cn("p-1.5 rounded-lg", gp.employeeSign ? "bg-emerald-50 text-emerald-600" : "bg-slate-50 text-slate-300")}>
                        <UserCheck className="w-4 h-4" />
                      </div>
                      <div title="Security" className={cn("p-1.5 rounded-lg", gp.securitySign ? "bg-emerald-50 text-emerald-600" : "bg-slate-50 text-slate-300")}>
                        <FileText className="w-4 h-4" />
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className={cn(
                      "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold",
                      gp.status === 'Approved' ? "bg-emerald-50 text-emerald-600" : 
                      gp.status === 'Pending Manager Approval' ? "bg-amber-50 text-amber-600" : "bg-slate-100 text-slate-500"
                    )}>
                      {gp.status === 'Approved' ? <CheckCircle2 className="w-3 h-3" /> : 
                       gp.status === 'Rejected' ? <XCircle className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                      {gp.status}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                      <Link to={`/gatepasses/${gp.id}`} className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all">
                        <ChevronRight className="w-4 h-4" />
                      </Link>
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
