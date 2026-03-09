import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Monitor, 
  Ticket, 
  AlertCircle, 
  Package, 
  FileText, 
  Code, 
  Settings, 
  LogOut,
  Search,
  Bell,
  User,
  Building2,
  MessageSquare,
  Zap,
  BarChart3,
  Plus,
  ChevronDown,
  Folder,
  Star,
  Clock,
  History,
  Shield,
  Layers,
  Megaphone
} from 'lucide-react';
import { cn } from '../lib/utils';

const TOP_NAV_ITEMS = [
  { label: 'Employees', path: '/employees' },
  { label: 'Patch Update', path: '/patches' },
  { label: 'Alerts', path: '/alerts', badge: 22 },
  { label: 'Stock Management', path: '/stock' },
  { label: 'Tickets', path: '/tickets' },
  { label: 'Gatepass', path: '/gatepasses' },
  { label: 'Chatbot', path: '/chatbot' },
  { label: 'Salt Config', path: '/salt-config' },
];

const EMPLOYEE_SIDEBAR_ITEMS = [
  { icon: User, label: 'All Employees', path: '/employees' },
  { icon: Building2, label: 'Departments', path: '/departments' },
  { icon: Monitor, label: 'Asset Assignment', path: '/assignments' },
  { icon: FileText, label: 'Requirements', path: '/requirements' },
];

const PATCH_SIDEBAR_ITEMS = [
  { icon: Shield, label: 'Patch Overview', path: '/patches' },
  { icon: Clock, label: 'Scheduled Tasks', path: '/scripts' },
  { icon: Layers, label: 'Department Groups', path: '/groups' },
  { icon: Zap, label: 'Automation', path: '/automation' },
];

const ALERTS_SIDEBAR_ITEMS = [
  { icon: AlertCircle, label: 'Active Alerts', path: '/alerts' },
  { icon: Clock, label: 'Alert History', path: '/alerts/history' },
  { icon: Settings, label: 'Configurations', path: '/alerts/config' },
];

const STOCK_SIDEBAR_ITEMS = [
  { icon: Package, label: 'Inventory', path: '/stock' },
  { icon: Plus, label: 'Add Stock', path: '/stock/add' },
  { icon: BarChart3, label: 'Reports', path: '/stock/reports' },
];

const TICKETS_SIDEBAR_ITEMS = [
  { icon: Ticket, label: 'Open Tickets', path: '/tickets' },
  { icon: MessageSquare, label: 'My Tickets', path: '/tickets/mine' },
  { icon: Star, label: 'SLA Reports', path: '/tickets/sla' },
];

const EMPLOYEE_PORTAL_SIDEBAR_ITEMS = [
  { icon: User, label: 'My Dashboard', path: '/employee' },
  { icon: Monitor, label: 'My Assets', path: '/employee/assets' },
  { icon: Megaphone, label: 'Announcements', path: '/employee/announcements' },
  { icon: Plus, label: 'Raise Request', path: '/employee/request' },
];

const GATEPASS_SIDEBAR_ITEMS = [
  { icon: FileText, label: 'All Gatepasses', path: '/gatepasses' },
  { icon: Plus, label: 'New Gatepass', path: '/gatepasses/new' },
  { icon: Clock, label: 'Pending Approval', path: '/gatepasses/pending' },
];

const CHATBOT_SIDEBAR_ITEMS = [
  { icon: MessageSquare, label: 'Active Chat', path: '/chatbot' },
  { icon: History, label: 'Chat History', path: '/chatbot/history' },
  { icon: Building2, label: 'Knowledge Base', path: '/chatbot/kb' },
  { icon: Settings, label: 'Bot Settings', path: '/chatbot/settings' },
];

const DEFAULT_SIDEBAR_ITEMS = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
  { icon: Monitor, label: 'Devices', path: '/devices' },
  { icon: AlertCircle, label: 'Alerts', path: '/alerts' },
  { icon: Package, label: 'Stock', path: '/stock' },
  { icon: Ticket, label: 'Tickets', path: '/tickets' },
  { icon: FileText, label: 'Gatepass', path: '/gatepasses' },
  { icon: MessageSquare, label: 'Chatbot', path: '/chatbot' },
];

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const navigate = useNavigate();

  const getSidebarItems = () => {
    if (location.pathname.startsWith('/employees') || 
        location.pathname.startsWith('/install-agent') || 
        location.pathname.startsWith('/departments') || 
        location.pathname.startsWith('/assignments') || 
        location.pathname.startsWith('/requirements')) {
      return EMPLOYEE_SIDEBAR_ITEMS;
    }
    if (location.pathname.startsWith('/employee')) {
      return EMPLOYEE_PORTAL_SIDEBAR_ITEMS;
    }
    if (location.pathname.startsWith('/patches') || 
        location.pathname.startsWith('/scripts') || 
        location.pathname.startsWith('/updates') ||
        location.pathname.startsWith('/groups') ||
        location.pathname.startsWith('/automation')) {
      return PATCH_SIDEBAR_ITEMS;
    }
    if (location.pathname.startsWith('/alerts')) {
      return ALERTS_SIDEBAR_ITEMS;
    }
    if (location.pathname.startsWith('/stock')) {
      return STOCK_SIDEBAR_ITEMS;
    }
    if (location.pathname.startsWith('/tickets')) {
      return TICKETS_SIDEBAR_ITEMS;
    }
    if (location.pathname.startsWith('/gatepasses')) {
      return GATEPASS_SIDEBAR_ITEMS;
    }
    if (location.pathname.startsWith('/chatbot')) {
      return CHATBOT_SIDEBAR_ITEMS;
    }
    return DEFAULT_SIDEBAR_ITEMS;
  };

  const [isChangelogOpen, setIsChangelogOpen] = React.useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = React.useState(false);

  const sidebarItems = getSidebarItems();

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userRole');
    navigate('/login');
  };

  return (
    <div className="flex h-screen bg-white">
      {/* Sidebar */}
      <aside className="w-64 bg-[#F9FAFB] border-r border-slate-200 flex flex-col">
        <div className="h-14 flex items-center px-6 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-slate-900 rounded flex items-center justify-center">
              <Shield className="text-white w-4 h-4" />
            </div>
            <span className="text-lg font-bold text-slate-900 tracking-tight">Zerodha IT</span>
          </div>
        </div>

        {sidebarItems === EMPLOYEE_SIDEBAR_ITEMS && (
          <div className="p-4 pb-0">
            <Link 
              to="/install-agent"
              className="w-full py-2.5 bg-[#007AFF] hover:bg-blue-600 text-white text-sm font-semibold rounded-md shadow-sm transition-all flex items-center justify-center gap-2"
            >
              <Zap className="w-4 h-4" />
              Install new agent
            </Link>
          </div>
        )}
        <nav className="flex-1 px-2 py-8 space-y-6 overflow-y-auto">
          <div className="space-y-1">
            {sidebarItems.map((item) => (
              <Link
                key={item.label}
                to={item.path || '#'}
                className={cn(
                  "flex items-center justify-between px-3 py-1.5 rounded-md text-sm transition-all",
                  location.pathname === item.path
                    ? "bg-[#EBF5FF] text-[#007AFF] font-medium"
                    : "text-slate-600 hover:bg-slate-100"
                )}
              >
                <div className="flex items-center gap-3">
                  <item.icon className={cn("w-4 h-4", location.pathname === item.path ? "text-[#007AFF]" : "text-slate-400")} />
                  {item.label}
                </div>
              </Link>
            ))}
          </div>
        </nav>

        <div className="p-4 border-t border-slate-200">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-3 py-2 rounded-md text-sm text-slate-600 hover:bg-slate-100 transition-all"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Nav */}
        <header className="h-14 bg-white border-b border-slate-200 flex items-center justify-between px-6 z-10">
          <div className="flex items-center gap-8">
            <nav className="flex items-center gap-1">
              {TOP_NAV_ITEMS.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "px-3 py-1.5 rounded-md text-sm font-medium transition-all relative",
                    location.pathname.startsWith(item.path)
                      ? "text-[#007AFF] bg-[#EBF5FF]"
                      : "text-slate-600 hover:bg-slate-50"
                  )}
                >
                  {item.label}
                  {item.badge && (
                    <span className="ml-1.5 px-1.5 py-0.5 bg-[#007AFF] text-white text-[10px] font-bold rounded-full">
                      {item.badge}
                    </span>
                  )}
                </Link>
              ))}
              <Link
                to="/employee"
                className={cn(
                  "ml-4 px-3 py-1.5 rounded-md text-sm font-bold transition-all border border-blue-200",
                  location.pathname.startsWith('/employee')
                    ? "text-white bg-[#007AFF]"
                    : "text-[#007AFF] hover:bg-blue-50"
                )}
              >
                Employee Portal
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-4 text-sm font-medium text-slate-600">
              <button 
                onClick={() => setIsChangelogOpen(true)}
                className="hover:text-slate-900 cursor-pointer"
              >
                Changelog
              </button>
              <Settings 
                className="w-4 h-4 hover:text-slate-900 cursor-pointer" 
                onClick={() => setIsSettingsOpen(true)}
              />
            </div>
            <div className="w-8 h-8 bg-slate-900 rounded-full flex items-center justify-center border border-slate-200 overflow-hidden">
              <img src="https://picsum.photos/seed/user/32/32" alt="User" referrerPolicy="no-referrer" />
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto bg-white">
          {children}
        </main>

        {/* Changelog Modal */}
        {isChangelogOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden">
              <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                <h3 className="text-xl font-bold text-slate-900">System Changelog</h3>
                <button onClick={() => setIsChangelogOpen(false)} className="text-slate-400 hover:text-slate-600">
                  <Plus className="w-6 h-6 rotate-45" />
                </button>
              </div>
              <div className="p-6 space-y-6 max-h-[60vh] overflow-y-auto">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-[10px] font-bold rounded uppercase">v1.2.0</span>
                    <span className="text-xs text-slate-400">March 8, 2024</span>
                  </div>
                  <h4 className="font-semibold text-slate-800">New Agent Installation Flow</h4>
                  <ul className="text-sm text-slate-600 list-disc list-inside space-y-1">
                    <li>Integrated systemd service management</li>
                    <li>Added ClamAV and Salt-Minion auto-configuration</li>
                    <li>New split-screen login interface</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 bg-slate-100 text-slate-700 text-[10px] font-bold rounded uppercase">v1.1.0</span>
                    <span className="text-xs text-slate-400">March 1, 2024</span>
                  </div>
                  <h4 className="font-semibold text-slate-800">Inventory & Patching</h4>
                  <ul className="text-sm text-slate-600 list-disc list-inside space-y-1">
                    <li>Automated patch scheduling</li>
                    <li>Real-time stock tracking</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Settings Modal */}
        {isSettingsOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden">
              <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                <h3 className="text-xl font-bold text-slate-900">User Settings</h3>
                <button onClick={() => setIsSettingsOpen(false)} className="text-slate-400 hover:text-slate-600">
                  <Plus className="w-6 h-6 rotate-45" />
                </button>
              </div>
              <div className="p-6 space-y-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Profile Name</label>
                    <input type="text" defaultValue="IT Admin" className="w-full px-3 py-2 border border-slate-200 rounded-md text-sm" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Email Notifications</label>
                    <div className="flex items-center gap-2">
                      <input type="checkbox" defaultChecked className="rounded border-slate-300 text-blue-600" />
                      <span className="text-sm text-slate-600">Receive critical alert emails</span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">System Theme</label>
                    <select className="w-full px-3 py-2 border border-slate-200 rounded-md text-sm">
                      <option>Light Mode</option>
                      <option>Dark Mode (Beta)</option>
                      <option>System Default</option>
                    </select>
                  </div>
                </div>
                <div className="pt-4 border-t border-slate-100 flex justify-end">
                  <button 
                    onClick={() => setIsSettingsOpen(false)}
                    className="px-4 py-2 bg-blue-600 text-white text-sm font-bold rounded-md hover:bg-blue-700"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
