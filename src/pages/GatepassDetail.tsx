import React from 'react';
import { 
  ArrowLeft, 
  FileText, 
  User, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  UserCheck, 
  Lock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  History,
  Printer,
  Download,
  MoreVertical
} from 'lucide-react';
import { useParams, Link } from 'react-router-dom';
import { MOCK_GATEPASSES } from '../mockData';
import { cn } from '../lib/utils';
import { motion } from 'motion/react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export default function GatepassDetail() {
  const { id } = useParams();
  const gp = MOCK_GATEPASSES.find(g => g.id === id);

  if (!gp) return <div>Gatepass not found</div>;

  const generatePDF = () => {
    const doc = new jsPDF();
    
    // Header
    doc.setFontSize(22);
    doc.text('IT ASSET GATEPASS', 105, 20, { align: 'center' });
    doc.setFontSize(10);
    doc.text(`Gatepass ID: ${gp.id}`, 105, 28, { align: 'center' });
    doc.text(`Generated on: ${new Date().toLocaleString()}`, 105, 34, { align: 'center' });
    
    doc.setDrawColor(200, 200, 200);
    doc.line(20, 40, 190, 40);

    // Asset & Employee Info
    autoTable(doc, {
      startY: 50,
      head: [['Field', 'Details']],
      body: [
        ['Asset Name', gp.assetName],
        ['Asset ID', gp.assetId],
        ['Employee Name', gp.employeeName],
        ['Employee Email', gp.employeeEmail],
        ['Branch', gp.branch],
        ['Purpose', gp.purpose],
        ['Status', gp.status],
      ],
      theme: 'striped',
      headStyles: { fillColor: [37, 99, 235] },
    });

    // Signatures
    const finalY = (doc as any).lastAutoTable.finalY + 20;
    doc.setFontSize(12);
    doc.text('Signatures:', 20, finalY);

    doc.setFontSize(10);
    // Manager
    doc.text('Manager:', 20, finalY + 15);
    doc.text(gp.managerSign?.name || 'Pending', 20, finalY + 22);
    doc.text(gp.managerSign?.date || '', 20, finalY + 27);

    // Employee
    doc.text('Employee:', 80, finalY + 15);
    doc.text(gp.employeeSign?.name || 'Pending', 80, finalY + 22);
    doc.text(gp.employeeSign?.date || '', 80, finalY + 27);

    // Security
    doc.text('Security:', 140, finalY + 15);
    doc.text(gp.securitySign?.name || 'Pending', 140, finalY + 22);
    doc.text(gp.securitySign?.date || '', 140, finalY + 27);

    doc.save(`gatepass_${gp.id}.pdf`);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/gatepasses" className="p-2 hover:bg-white rounded-lg border border-transparent hover:border-slate-200 transition-all">
            <ArrowLeft className="w-5 h-5 text-slate-500" />
          </Link>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-slate-900">Gatepass: {gp.id}</h1>
              <span className={cn(
                "px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider",
                gp.status === 'Approved' ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"
              )}>
                {gp.status}
              </span>
            </div>
            <p className="text-sm text-slate-500 flex items-center gap-2 mt-1">
              Asset: <span className="font-bold text-slate-700">{gp.assetName}</span> • 
              Employee: <span className="font-bold text-blue-600">{gp.employeeName}</span>
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={generatePDF}
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-white rounded-lg border border-transparent hover:border-slate-200 transition-all"
          >
            <Printer className="w-5 h-5" />
          </button>
          <button 
            onClick={generatePDF}
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-white rounded-lg border border-transparent hover:border-slate-200 transition-all"
          >
            <Download className="w-5 h-5" />
          </button>
          <div className="h-8 w-px bg-slate-200 mx-2"></div>
          <button className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-all">
            Reject
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-all shadow-lg shadow-blue-200">
            Approve & Sign
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Main Info Card */}
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
              <div className="space-y-6">
                <div>
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Asset Details</h3>
                  <p className="text-sm font-bold text-slate-900">{gp.assetName}</p>
                  <p className="text-xs text-slate-500">ID: {gp.assetId}</p>
                </div>
                <div>
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Purpose of Movement</h3>
                  <p className="text-sm font-semibold text-slate-700">{gp.purpose}</p>
                </div>
              </div>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Employee Info</h3>
                  <p className="text-sm font-bold text-slate-900">{gp.employeeName}</p>
                  <p className="text-xs text-slate-500">{gp.employeeEmail}</p>
                </div>
                <div>
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Source Branch</h3>
                  <p className="text-sm font-semibold text-slate-700">{gp.branch}</p>
                </div>
              </div>
            </div>
            <FileText className="absolute -bottom-8 -right-8 w-48 h-48 text-slate-50 opacity-[0.03]" />
          </div>

          {/* Signature Blocks */}
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-slate-900">Mandatory Signatures</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Manager Signature */}
              <div className={cn(
                "p-6 rounded-2xl border transition-all",
                gp.managerSign ? "bg-emerald-50/50 border-emerald-100" : "bg-white border-slate-200"
              )}>
                <div className="flex items-center justify-between mb-6">
                  <div className={cn("p-2 rounded-lg", gp.managerSign ? "bg-emerald-100 text-emerald-600" : "bg-slate-100 text-slate-400")}>
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  {gp.managerSign && <CheckCircle2 className="w-5 h-5 text-emerald-500" />}
                </div>
                <h4 className="text-sm font-bold text-slate-900 mb-1">Manager Signature</h4>
                {gp.managerSign ? (
                  <div className="space-y-2">
                    <p className="text-xs font-medium text-slate-600 italic">"{gp.managerSign.remarks}"</p>
                    <div className="pt-4 border-t border-emerald-100">
                      <p className="text-xs font-bold text-slate-900">{gp.managerSign.name}</p>
                      <p className="text-[10px] text-slate-500">{gp.managerSign.date}</p>
                    </div>
                  </div>
                ) : (
                  <button className="mt-4 w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-bold rounded-lg transition-all">
                    Sign as Manager
                  </button>
                )}
              </div>

              {/* Employee Signature */}
              <div className={cn(
                "p-6 rounded-2xl border transition-all",
                gp.employeeSign ? "bg-emerald-50/50 border-emerald-100" : "bg-white border-slate-200"
              )}>
                <div className="flex items-center justify-between mb-6">
                  <div className={cn("p-2 rounded-lg", gp.employeeSign ? "bg-emerald-100 text-emerald-600" : "bg-slate-100 text-slate-400")}>
                    <UserCheck className="w-5 h-5" />
                  </div>
                  {gp.employeeSign && <CheckCircle2 className="w-5 h-5 text-emerald-500" />}
                </div>
                <h4 className="text-sm font-bold text-slate-900 mb-1">Employee Signature</h4>
                {gp.employeeSign ? (
                  <div className="space-y-2">
                    <p className="text-xs text-slate-500">Confirmed handover of asset.</p>
                    <div className="pt-4 border-t border-emerald-100">
                      <p className="text-xs font-bold text-slate-900">{gp.employeeSign.name}</p>
                      <p className="text-[10px] text-slate-500">{gp.employeeSign.date}</p>
                    </div>
                  </div>
                ) : (
                  <button className="mt-4 w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-bold rounded-lg transition-all">
                    Sign as Employee
                  </button>
                )}
              </div>

              {/* Security Signature */}
              <div className={cn(
                "p-6 rounded-2xl border transition-all",
                gp.securitySign ? "bg-emerald-50/50 border-emerald-100" : "bg-white border-slate-200"
              )}>
                <div className="flex items-center justify-between mb-6">
                  <div className={cn("p-2 rounded-lg", gp.securitySign ? "bg-emerald-100 text-emerald-600" : "bg-slate-100 text-slate-400")}>
                    <Lock className="w-5 h-5" />
                  </div>
                  {gp.securitySign && <CheckCircle2 className="w-5 h-5 text-emerald-500" />}
                </div>
                <h4 className="text-sm font-bold text-slate-900 mb-1">Security Signature</h4>
                {gp.securitySign ? (
                  <div className="space-y-2">
                    <p className="text-xs text-slate-500">Verified at exit gate.</p>
                    <div className="pt-4 border-t border-emerald-100">
                      <p className="text-xs font-bold text-slate-900">{gp.securitySign.name}</p>
                      <p className="text-[10px] text-slate-500">{gp.securitySign.date}</p>
                    </div>
                  </div>
                ) : (
                  <button className="mt-4 w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-bold rounded-lg transition-all">
                    Sign as Security
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Timeline */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900 mb-6">Movement Timeline</h3>
          <div className="space-y-6 relative">
            <div className="absolute left-4 top-2 bottom-2 w-0.5 bg-slate-100"></div>
            {[
              { title: 'Gatepass Created', time: '08:30 AM', status: 'completed' },
              { title: 'Manager Approved', time: '09:00 AM', status: 'completed' },
              { title: 'Employee Signed', time: '09:15 AM', status: 'completed' },
              { title: 'Security Verification', time: 'Pending', status: 'pending' },
              { title: 'Asset Out', time: 'Pending', status: 'pending' },
            ].map((step, i) => (
              <div key={i} className="flex gap-4 relative z-10">
                <div className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center border-4 border-white shadow-sm",
                  step.status === 'completed' ? "bg-emerald-500 text-white" : "bg-slate-200 text-slate-400"
                )}>
                  {step.status === 'completed' ? <CheckCircle2 className="w-4 h-4" /> : <Clock className="w-4 h-4" />}
                </div>
                <div>
                  <p className={cn("text-sm font-bold", step.status === 'completed' ? "text-slate-900" : "text-slate-400")}>{step.title}</p>
                  <p className="text-xs text-slate-500">{step.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
