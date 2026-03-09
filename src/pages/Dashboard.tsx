import React from 'react';
import { 
  Monitor, 
  Ticket, 
  AlertCircle, 
  Package, 
  FileText, 
  TrendingUp, 
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  MessageSquare
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell
} from 'recharts';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';

const TICKET_TREND_DATA = [
  { name: 'Mon', tickets: 12 },
  { name: 'Tue', tickets: 19 },
  { name: 'Wed', tickets: 15 },
  { name: 'Thu', tickets: 22 },
  { name: 'Fri', tickets: 30 },
  { name: 'Sat', tickets: 10 },
  { name: 'Sun', tickets: 8 },
];

const STOCK_BY_BRANCH = [
  { name: 'HO Bangalore', stock: 450 },
  { name: 'Support Office', stock: 320 },
  { name: 'Mumbai', stock: 280 },
  { name: 'Chennai', stock: 190 },
];

const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444'];

const STAT_CARDS = [
  { label: 'Total Devices', value: '1,284', icon: Monitor, color: 'blue', trend: '+12%' },
  { label: 'Open Tickets', value: '42', icon: Ticket, color: 'indigo', trend: '-5%' },
  { label: 'Active Alerts', value: '22', icon: AlertCircle, color: 'red', trend: '+2%' },
  { label: 'Chat-to-Tickets', value: '8', icon: MessageSquare, color: 'emerald', trend: '+3' },
  { label: 'Low Stock Items', value: '7', icon: Package, color: 'amber', trend: '0%' },
];

export default function Dashboard() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Zerodha IT Dashboard</h1>
          <p className="text-slate-500">Welcome back. Here's what's happening today.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 transition-all">
            Download Report
          </button>
          <button className="px-4 py-2 bg-[#007AFF] text-white rounded-lg text-sm font-medium hover:bg-blue-600 transition-all shadow-sm">
            New Ticket
          </button>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        {STAT_CARDS.map((card, i) => (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all group"
          >
            <div className="flex items-start justify-between mb-4">
              <div className={cn(
                "p-3 rounded-xl",
                card.color === 'blue' && "bg-blue-50 text-blue-600",
                card.color === 'indigo' && "bg-indigo-50 text-indigo-600",
                card.color === 'red' && "bg-red-50 text-red-600",
                card.color === 'amber' && "bg-amber-50 text-amber-600",
                card.color === 'emerald' && "bg-emerald-50 text-emerald-600",
              )}>
                <card.icon className="w-6 h-6" />
              </div>
              <div className={cn(
                "flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full",
                card.trend.startsWith('+') ? "bg-emerald-50 text-emerald-600" : 
                card.trend.startsWith('-') ? "bg-red-50 text-red-600" : "bg-slate-50 text-slate-600"
              )}>
                {card.trend.startsWith('+') ? <ArrowUpRight className="w-3 h-3" /> : 
                 card.trend.startsWith('-') ? <ArrowDownRight className="w-3 h-3" /> : null}
                {card.trend}
              </div>
            </div>
            <p className="text-sm font-medium text-slate-500">{card.label}</p>
            <h3 className="text-2xl font-bold text-slate-900 mt-1">{card.value}</h3>
          </motion.div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-slate-900">Ticket Trends</h3>
            <select className="bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium px-2 py-1 outline-none">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
            </select>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={TICKET_TREND_DATA}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 12, fill: '#64748B' }}
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 12, fill: '#64748B' }}
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #E2E8F0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="tickets" 
                  stroke="#3B82F6" 
                  strokeWidth={3} 
                  dot={{ r: 4, fill: '#3B82F6', strokeWidth: 2, stroke: '#fff' }}
                  activeDot={{ r: 6, strokeWidth: 0 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-slate-900">Stock by Branch</h3>
            <button className="text-blue-600 text-xs font-bold hover:underline">View All Inventory</button>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={STOCK_BY_BRANCH} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#F1F5F9" />
                <XAxis type="number" hide />
                <YAxis 
                  dataKey="name" 
                  type="category" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 12, fill: '#64748B' }}
                  width={100}
                />
                <Tooltip 
                  cursor={{ fill: '#F8FAFC' }}
                  contentStyle={{ backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #E2E8F0' }}
                />
                <Bar dataKey="stock" radius={[0, 4, 4, 0]} barSize={32}>
                  {STOCK_BY_BRANCH.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Activity Feed */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-200 flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-900">Recent Activity</h3>
          <button className="text-slate-500 text-sm hover:text-slate-900 transition-all">View History</button>
        </div>
        <div className="divide-y divide-slate-100">
          {[
            { user: 'Gani', action: 'created a gatepass', target: 'GP-2031', time: '10 mins ago', icon: FileText, color: 'blue' },
            { user: 'System', action: 'triggered an alert', target: 'Antivirus Disabled', time: '25 mins ago', icon: AlertCircle, color: 'red' },
            { user: 'Priya', action: 'resolved ticket', target: 'IT-1982', time: '1 hour ago', icon: Ticket, color: 'emerald' },
            { user: 'Network Team', action: 'updated device', target: 'AD Server', time: '2 hours ago', icon: Monitor, color: 'indigo' },
          ].map((activity, i) => (
            <div key={i} className="p-4 flex items-center gap-4 hover:bg-slate-50 transition-all">
              <div className={cn(
                "p-2 rounded-lg",
                activity.color === 'blue' && "bg-blue-50 text-blue-600",
                activity.color === 'red' && "bg-red-50 text-red-600",
                activity.color === 'emerald' && "bg-emerald-50 text-emerald-600",
                activity.color === 'indigo' && "bg-indigo-50 text-indigo-600",
              )}>
                <activity.icon className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-slate-600">
                  <span className="font-bold text-slate-900">{activity.user}</span> {activity.action} <span className="font-semibold text-blue-600">{activity.target}</span>
                </p>
              </div>
              <div className="flex items-center gap-1 text-xs text-slate-400">
                <Clock className="w-3 h-3" />
                {activity.time}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
