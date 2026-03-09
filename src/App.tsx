import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import DevicesList from './pages/DevicesList';
import DeviceDetail from './pages/DeviceDetail';
import TicketsList from './pages/TicketsList';
import TicketDetail from './pages/TicketDetail';
import Chatbot from './pages/Chatbot';
import StockList from './pages/StockList';
import AlertsList from './pages/AlertsList';
import ScriptsPage from './pages/ScriptsPage';
import PatchManagement from './pages/PatchManagement';
import EmployeePortal from './pages/EmployeePortal';
import Employees from './pages/Employees';
import Departments from './pages/Departments';
import AssetAssignments from './pages/AssetAssignments';
import Requirements from './pages/Requirements';
import DeploymentGroups from './pages/DeploymentGroups';
import Automation from './pages/Automation';
import InstallAgent from './pages/InstallAgent';
import GatepassList from './pages/GatepassList';
import GatepassDetail from './pages/GatepassDetail';
import SaltConfig from './pages/SaltConfig';
import MainLayout from './components/MainLayout';

const ProtectedRoute = ({ children, role }: { children: React.ReactNode, role?: 'admin' | 'employee' }) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true' || (window as any).isAuthenticated === true;
  const userRole = localStorage.getItem('userRole') || (window as any).userRole || 'admin';

  if (!isAuthenticated) return <Navigate to="/login" replace />;
  
  if (role && userRole !== role) {
    return <Navigate to={userRole === 'admin' ? '/dashboard' : '/employee'} replace />;
  }

  return <MainLayout>{children}</MainLayout>;
};

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        
        <Route path="/dashboard" element={<ProtectedRoute role="admin"><Dashboard /></ProtectedRoute>} />
        <Route path="/employees" element={<ProtectedRoute role="admin"><Employees /></ProtectedRoute>} />
        <Route path="/departments" element={<ProtectedRoute role="admin"><Departments /></ProtectedRoute>} />
        <Route path="/assignments" element={<ProtectedRoute role="admin"><AssetAssignments /></ProtectedRoute>} />
        <Route path="/requirements" element={<ProtectedRoute role="admin"><Requirements /></ProtectedRoute>} />
        <Route path="/install-agent" element={<ProtectedRoute role="admin"><InstallAgent /></ProtectedRoute>} />
        <Route path="/salt-config" element={<ProtectedRoute role="admin"><SaltConfig /></ProtectedRoute>} />
        <Route path="/devices" element={<ProtectedRoute role="admin"><DevicesList /></ProtectedRoute>} />
        <Route path="/devices/:id" element={<ProtectedRoute role="admin"><DeviceDetail /></ProtectedRoute>} />
        <Route path="/alerts" element={<ProtectedRoute role="admin"><AlertsList /></ProtectedRoute>} />
        <Route path="/tickets" element={<ProtectedRoute role="admin"><TicketsList /></ProtectedRoute>} />
        <Route path="/tickets/:id" element={<ProtectedRoute role="admin"><TicketDetail /></ProtectedRoute>} />
        <Route path="/chatbot" element={<ProtectedRoute role="admin"><Chatbot /></ProtectedRoute>} />
        <Route path="/chatbot/history" element={<ProtectedRoute role="admin"><Chatbot /></ProtectedRoute>} />
        <Route path="/chatbot/kb" element={<ProtectedRoute role="admin"><Chatbot /></ProtectedRoute>} />
        <Route path="/chatbot/settings" element={<ProtectedRoute role="admin"><Chatbot /></ProtectedRoute>} />
        <Route path="/stock" element={<ProtectedRoute role="admin"><StockList /></ProtectedRoute>} />
        <Route path="/updates" element={<ProtectedRoute role="admin"><PatchManagement /></ProtectedRoute>} />
        <Route path="/patches" element={<ProtectedRoute role="admin"><PatchManagement /></ProtectedRoute>} />
        <Route path="/employee" element={<ProtectedRoute role="employee"><EmployeePortal /></ProtectedRoute>} />
        <Route path="/gatepasses" element={<ProtectedRoute role="admin"><GatepassList /></ProtectedRoute>} />
        <Route path="/gatepasses/:id" element={<ProtectedRoute role="admin"><GatepassDetail /></ProtectedRoute>} />
        <Route path="/scripts" element={<ProtectedRoute role="admin"><ScriptsPage /></ProtectedRoute>} />
        <Route path="/automation" element={<ProtectedRoute role="admin"><Automation /></ProtectedRoute>} />
        <Route path="/groups" element={<ProtectedRoute role="admin"><DeploymentGroups /></ProtectedRoute>} />
        <Route path="/alerts/history" element={<ProtectedRoute><AlertsList /></ProtectedRoute>} />
        <Route path="/alerts/config" element={<ProtectedRoute><AlertsList /></ProtectedRoute>} />
        <Route path="/stock/add" element={<ProtectedRoute><StockList /></ProtectedRoute>} />
        <Route path="/stock/reports" element={<ProtectedRoute><StockList /></ProtectedRoute>} />
        <Route path="/gatepasses/new" element={<ProtectedRoute><GatepassList /></ProtectedRoute>} />
        <Route path="/gatepasses/pending" element={<ProtectedRoute><GatepassList /></ProtectedRoute>} />
        
        {/* Fallbacks */}
        <Route path="/" element={<Navigate to="/devices" replace />} />
        <Route path="*" element={<ProtectedRoute><div className="flex flex-col items-center justify-center h-full text-slate-500">
          <h2 className="text-2xl font-bold mb-2">Coming Soon</h2>
          <p>This module is currently under development.</p>
        </div></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
}
