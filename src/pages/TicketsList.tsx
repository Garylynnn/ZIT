import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Plus, 
  Ticket, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  MoreVertical,
  ChevronRight,
  User,
  Download
} from 'lucide-react';
import { MOCK_TICKETS } from '../mockData';
import { cn } from '../lib/utils';
import { Link } from 'react-router-dom';
import { exportToCSV, exportToPDF } from '../lib/exportUtils';

export default function TicketsList() {
  const [search, setSearch] = useState('');

  const handleExportCSV = () => {
    const data = MOCK_TICKETS.map(({ id, title, user, priority, status, assignee, createdAt }) => ({
      ID: id,
      Title: title,
      User: user,
      Priority: priority,
      Status: status,
      Assignee: assignee,
      Created: createdAt
    }));
    exportToCSV(data, 'tickets_report.csv');
  };

  const handleExportPDF = () => {
    const data = MOCK_TICKETS.map(({ id, title, user, priority, status, assignee }) => ({
      ID: id,
      Title: title,
      User: user,
      Priority: priority,
      Status: status,
      Assignee: assignee
    }));
    exportToPDF(data, 'IT Support Tickets Report', 'tickets_report.pdf');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Support Tickets</h1>
          <p className="text-slate-500">Manage and resolve IT support requests</p>
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
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-all shadow-lg shadow-blue-200">
            <Plus className="w-4 h-4" />
            New Ticket
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search by ID, title, user..."
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-100 transition-all">
              <Filter className="w-4 h-4" />
              Priority
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
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Ticket ID</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Title</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">User</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Priority</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Assignee</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {MOCK_TICKETS.map((ticket) => (
                <tr key={ticket.id} className="hover:bg-slate-50 transition-all group cursor-pointer">
                  <td className="px-6 py-4">
                    <Link to={`/tickets/${ticket.id}`} className="text-sm font-bold text-blue-600 hover:underline">{ticket.id}</Link>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{ticket.title}</span>
                      <span className="text-xs text-slate-500">Created: {ticket.createdAt}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 bg-slate-100 rounded-full flex items-center justify-center">
                        <User className="w-4 h-4 text-slate-400" />
                      </div>
                      <span className="text-sm text-slate-600">{ticket.user}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className={cn(
                      "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold",
                      ticket.priority === 'High' ? "bg-red-50 text-red-600" : 
                      ticket.priority === 'Medium' ? "bg-amber-50 text-amber-600" : "bg-blue-50 text-blue-600"
                    )}>
                      {ticket.priority}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className={cn(
                      "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold",
                      ticket.status === 'Open' ? "bg-blue-50 text-blue-600" : 
                      ticket.status === 'In Progress' ? "bg-amber-50 text-amber-600" : "bg-emerald-50 text-emerald-600"
                    )}>
                      {ticket.status === 'Open' ? <AlertCircle className="w-3 h-3" /> : 
                       ticket.status === 'In Progress' ? <Clock className="w-3 h-3" /> : <CheckCircle2 className="w-3 h-3" />}
                      {ticket.status}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-slate-600">{ticket.assignee}</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                      <Link to={`/tickets/${ticket.id}`} className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all">
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
