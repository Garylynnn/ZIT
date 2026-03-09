import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Plus, 
  ArrowRightLeft, 
  ExternalLink,
  MoreVertical,
  AlertCircle,
  CheckCircle2,
  Clock,
  BarChart3,
  Download
} from 'lucide-react';
import { MOCK_STOCK } from '../mockData';
import { cn } from '../lib/utils';
import { useLocation, Link } from 'react-router-dom';
import { exportToCSV, exportToPDF } from '../lib/exportUtils';

export default function StockList() {
  const location = useLocation();
  const [search, setSearch] = useState('');
  
  const handleExportCSV = () => {
    const data = MOCK_STOCK.map(({ id, name, category, branch, available, reserved, issued, status }) => ({
      ID: id,
      Name: name,
      Category: category,
      Branch: branch,
      Available: available,
      Reserved: reserved,
      Issued: issued,
      Status: status
    }));
    exportToCSV(data, 'stock_inventory_report.csv');
  };

  const handleExportPDF = () => {
    const data = MOCK_STOCK.map(({ name, category, branch, available, status }) => ({
      Name: name,
      Category: category,
      Branch: branch,
      Available: available,
      Status: status
    }));
    exportToPDF(data, 'IT Stock Inventory Report', 'stock_inventory_report.pdf');
  };

  const view = location.pathname === '/stock/add' ? 'add' : 
               location.pathname === '/stock/reports' ? 'reports' : 'inventory';

  if (view === 'add') {
    return (
      <div className="p-8 max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-900">Add New Stock</h1>
          <p className="text-slate-500">Register new assets into the inventory</p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-8 space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Item Name</label>
              <input type="text" className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm" placeholder="e.g. Dell Latitude 5440" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Category</label>
              <select className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm">
                <option>Laptop</option>
                <option>Peripherals</option>
                <option>Networking</option>
                <option>Accessories</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Branch</label>
              <select className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm">
                <option>HO Bangalore</option>
                <option>Mumbai Branch</option>
                <option>Delhi Office</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Initial Quantity</label>
              <input type="number" className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm" placeholder="0" />
            </div>
          </div>

          <div className="pt-6 border-t border-slate-100 flex gap-4">
            <Link 
              to="/stock"
              className="flex-1 px-4 py-2 bg-slate-100 text-slate-600 rounded-lg text-sm font-bold hover:bg-slate-200 transition-all text-center"
            >
              Cancel
            </Link>
            <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-bold hover:bg-blue-700 transition-all">
              Save Item
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (view === 'reports') {
    return (
      <div className="p-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Stock Reports</h1>
            <p className="text-slate-500">Analytics and inventory distribution insights</p>
          </div>
          <Link 
            to="/stock"
            className="px-4 py-2 bg-slate-100 text-slate-600 rounded-lg text-sm font-bold hover:bg-slate-200 transition-all"
          >
            Back to Inventory
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-2xl border border-slate-200">
            <p className="text-sm text-slate-500 mb-1">Total Assets</p>
            <p className="text-3xl font-bold text-slate-900">1,284</p>
            <p className="text-xs text-emerald-600 mt-2 font-bold">+12% from last month</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-200">
            <p className="text-sm text-slate-500 mb-1">Low Stock Items</p>
            <p className="text-3xl font-bold text-amber-600">18</p>
            <p className="text-xs text-slate-400 mt-2 font-bold">Needs reordering</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-200">
            <p className="text-sm text-slate-500 mb-1">Issued Assets</p>
            <p className="text-3xl font-bold text-blue-600">842</p>
            <p className="text-xs text-slate-400 mt-2 font-bold">65% utilization rate</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-8 h-64 flex items-center justify-center text-slate-400 italic">
          Stock distribution chart will be displayed here
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Branch Stock</h1>
          <p className="text-slate-500">Inventory management across all office locations</p>
        </div>
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
            className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 transition-all flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            PDF
          </button>
          <Link 
            to="/stock/reports"
            className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 transition-all"
          >
            <BarChart3 className="w-4 h-4" />
            Reports
          </Link>
          <Link 
            to="/stock/add"
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-all shadow-lg shadow-blue-200"
          >
            <Plus className="w-4 h-4" />
            Add Stock
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search items, categories..."
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-100 transition-all">
              <Filter className="w-4 h-4" />
              Branch
            </button>
            <button className="flex items-center gap-2 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-100 transition-all">
              Category
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Item Name</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Branch</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">Available</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">Reserved</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">Issued</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {MOCK_STOCK.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50 transition-all group">
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-slate-900">{item.name}</span>
                      <span className="text-xs text-slate-500">ID: {item.id}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-slate-600">{item.category}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-slate-600">{item.branch}</span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="text-sm font-bold text-slate-900">{item.available}</span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="text-sm text-slate-600">{item.reserved}</span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="text-sm text-slate-600">{item.issued}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className={cn(
                      "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold",
                      item.status === 'Healthy' ? "bg-emerald-50 text-emerald-600" : 
                      item.status === 'Low Stock' ? "bg-amber-50 text-amber-600" : "bg-red-50 text-red-600"
                    )}>
                      {item.status === 'Healthy' ? <CheckCircle2 className="w-3 h-3" /> : 
                       item.status === 'Low Stock' ? <Clock className="w-3 h-3" /> : <AlertCircle className="w-3 h-3" />}
                      {item.status}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg text-xs font-bold hover:bg-blue-100 transition-all">
                        Issue Asset
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
