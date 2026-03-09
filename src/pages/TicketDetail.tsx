import React from 'react';
import { 
  ArrowLeft, 
  User, 
  Monitor, 
  Clock, 
  MessageSquare, 
  FileText, 
  CheckCircle2, 
  AlertCircle,
  MoreVertical,
  ChevronRight,
  Send,
  Paperclip,
  ShieldCheck,
  History,
  Zap
} from 'lucide-react';
import { useParams, Link } from 'react-router-dom';
import { MOCK_TICKETS } from '../mockData';
import { cn } from '../lib/utils';
import { motion } from 'motion/react';

export default function TicketDetail() {
  const { id } = useParams();
  const ticket = MOCK_TICKETS.find(t => t.id === id);

  if (!ticket) return <div>Ticket not found</div>;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/tickets" className="p-2 hover:bg-white rounded-lg border border-transparent hover:border-slate-200 transition-all">
            <ArrowLeft className="w-5 h-5 text-slate-500" />
          </Link>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-slate-900">{ticket.id}: {ticket.title}</h1>
              <span className={cn(
                "px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider",
                ticket.status === 'Open' ? "bg-blue-100 text-blue-700" : 
                ticket.status === 'In Progress' ? "bg-amber-100 text-amber-700" : "bg-emerald-100 text-emerald-700"
              )}>
                {ticket.status}
              </span>
            </div>
            <p className="text-sm text-slate-500 flex items-center gap-2 mt-1">
              User: <span className="font-bold text-blue-600">{ticket.user}</span> • 
              Priority: <span className={cn(
                "font-bold",
                ticket.priority === 'High' ? "text-red-600" : "text-amber-600"
              )}>{ticket.priority}</span>
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 transition-all">
            <User className="w-4 h-4" />
            Assign
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm font-medium hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-200">
            <CheckCircle2 className="w-4 h-4" />
            Resolve Ticket
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-8 border-b border-slate-200">
        {['Summary', 'Chat Transcript', 'Engineer Notes', 'Resolution', 'History'].map((tab, i) => (
          <button 
            key={tab} 
            className={cn(
              "pb-4 text-sm font-bold transition-all relative",
              i === 0 ? "text-blue-600" : "text-slate-400 hover:text-slate-600"
            )}
          >
            {tab}
            {i === 0 && <motion.div layoutId="activeTicketTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" />}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* AI Summary Card */}
          <div className="bg-blue-600 rounded-2xl p-6 text-white shadow-lg shadow-blue-200 relative overflow-hidden">
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-4">
                <ShieldCheck className="w-5 h-5" />
                <h3 className="font-bold uppercase tracking-wider text-xs">AI Incident Summary</h3>
              </div>
              <p className="text-sm leading-relaxed opacity-90">
                The user is reporting a VPN connection failure following a recent system update. 
                Initial diagnostics suggest a configuration mismatch in the NetBird client. 
                Recommended action: Reset client configuration and re-authenticate.
              </p>
            </div>
            <Zap className="absolute -bottom-4 -right-4 w-32 h-32 opacity-10" />
          </div>

          {/* Description */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 mb-4">Description</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              {ticket.description}
            </p>
          </div>

          {/* Discussion / Chat */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900">Discussion</h3>
              <span className="text-xs text-slate-500">3 messages</span>
            </div>
            <div className="p-6 space-y-6">
              {[
                { role: 'User', name: 'Gani', content: 'I tried restarting but it still says "Authentication Failed".', time: '10:45 AM' },
                { role: 'Engineer', name: 'Network Team', content: 'Checking the logs now. It seems your token expired.', time: '11:00 AM' },
              ].map((msg, i) => (
                <div key={i} className="flex gap-4">
                  <div className={cn(
                    "w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0",
                    msg.role === 'User' ? "bg-slate-100 text-slate-600" : "bg-blue-600 text-white"
                  )}>
                    <User className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-bold text-slate-900">{msg.name}</span>
                      <span className="text-[10px] text-slate-400 font-medium uppercase">{msg.role} • {msg.time}</span>
                    </div>
                    <p className="text-sm text-slate-600 bg-slate-50 p-3 rounded-xl rounded-tl-none">{msg.content}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 border-t border-slate-200">
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Add a comment or internal note..."
                  className="w-full pl-4 pr-24 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                />
                <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                  <button className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-200 rounded-lg transition-all">
                    <Paperclip className="w-4 h-4" />
                  </button>
                  <button className="p-1.5 bg-blue-600 text-white rounded-lg p-1.5 hover:bg-blue-700 transition-all">
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-8">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 mb-6">Ticket Details</h3>
            <div className="space-y-4">
              {[
                { label: 'Assignee', value: ticket.assignee, icon: User },
                { label: 'Linked Device', value: 'support.zbl-2047', icon: Monitor, link: true },
                { label: 'Created', value: ticket.createdAt, icon: Clock },
                { label: 'Last Updated', value: '5 mins ago', icon: History },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between py-2 border-b border-slate-50 last:border-0">
                  <div className="flex items-center gap-2">
                    <item.icon className="w-4 h-4 text-slate-400" />
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{item.label}</span>
                  </div>
                  {item.link ? (
                    <Link to="/devices/2" className="text-sm font-bold text-blue-600 hover:underline">{item.value}</Link>
                  ) : (
                    <span className="text-sm font-semibold text-slate-700">{item.value}</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 mb-6">Linked Assets</h3>
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 flex items-center gap-4">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center border border-slate-200">
                <Monitor className="w-6 h-6 text-slate-400" />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900">support.zbl-2047</p>
                <p className="text-xs text-slate-500">ZL-2047 • Online</p>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-300 ml-auto" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
