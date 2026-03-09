import React, { useState } from 'react';
import { Shield, Terminal, Copy, Check, Server, Cpu, Key, Zap } from 'lucide-react';
import { cn } from '../lib/utils';

export default function InstallAgent() {
  const [copied, setCopied] = useState<string | null>(null);
  const [apiToken] = useState('zt-prod-' + Math.random().toString(36).substring(2, 15).toUpperCase());

  const installCommand = `curl -sSL https://agent.zerodha.it/install.sh | sudo bash -s -- \\
  --token ${apiToken} \\
  --master ${window.location.hostname || 'salt-master.local'} \\
  --with-clamav \\
  --with-salt-minion \\
  --enable-systemd`;

  const systemdConfig = `[Unit]
Description=Zerodha IT Management Agent
After=network.target clamav-daemon.service salt-minion.service
Wants=clamav-daemon.service salt-minion.service

[Service]
Type=simple
ExecStart=/usr/bin/zit-agent --token ${apiToken}
Restart=always
RestartSec=10
StandardOutput=syslog
StandardError=syslog
SyslogIdentifier=zit-agent

[Install]
WantedBy=multi-user.target`;

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900 mb-2">Install New Agent</h1>
        <p className="text-slate-500">Deploy the Zerodha IT management agent with integrated security and configuration management.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Quick Install */}
          <section className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
            <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-slate-500" />
                <h2 className="font-semibold text-slate-800">Quick Installation</h2>
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-0.5 rounded">Linux / macOS</span>
            </div>
            <div className="p-6">
              <p className="text-sm text-slate-600 mb-4">Run this command on the target machine to install the agent with ClamAV and Salt-Minion integration.</p>
              <div className="relative group">
                <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg text-sm font-mono overflow-x-auto">
                  {installCommand}
                </pre>
                <button 
                  onClick={() => handleCopy(installCommand, 'cmd')}
                  className="absolute top-3 right-3 p-2 bg-white/10 hover:bg-white/20 rounded-md transition-all text-white"
                >
                  {copied === 'cmd' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </section>

          {/* Systemd Configuration */}
          <section className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
            <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Server className="w-4 h-4 text-slate-500" />
                <h2 className="font-semibold text-slate-800">Systemd Service Unit</h2>
              </div>
            </div>
            <div className="p-6">
              <p className="text-sm text-slate-600 mb-4">The agent runs as a systemd service, ensuring it starts after ClamAV and Salt-Minion.</p>
              <div className="relative group">
                <pre className="bg-slate-50 text-slate-700 p-4 rounded-lg text-xs font-mono border border-slate-200 overflow-x-auto max-h-64">
                  {systemdConfig}
                </pre>
                <button 
                  onClick={() => handleCopy(systemdConfig, 'systemd')}
                  className="absolute top-3 right-3 p-2 bg-slate-200 hover:bg-slate-300 rounded-md transition-all text-slate-600"
                >
                  {copied === 'systemd' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </section>
        </div>

        <div className="space-y-6">
          {/* Integration Details */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
            <h3 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
              <Shield className="w-4 h-4 text-blue-500" />
              Integrations
            </h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="mt-1 p-1.5 bg-emerald-50 rounded-md">
                  <Check className="w-3 h-3 text-emerald-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-900">ClamAV Antivirus</p>
                  <p className="text-xs text-slate-500">Real-time scanning and threat detection integrated.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-1 p-1.5 bg-emerald-50 rounded-md">
                  <Check className="w-3 h-3 text-emerald-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-900">Salt-Minion</p>
                  <p className="text-xs text-slate-500">Automated configuration management and state enforcement.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-1 p-1.5 bg-emerald-50 rounded-md">
                  <Check className="w-3 h-3 text-emerald-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-900">Systemd Service</p>
                  <p className="text-xs text-slate-500">Automatic restarts and dependency management.</p>
                </div>
              </div>
            </div>
          </div>

          {/* API Token */}
          <div className="bg-blue-600 rounded-xl p-6 text-white shadow-lg shadow-blue-200">
            <div className="flex items-center gap-2 mb-4">
              <Key className="w-4 h-4 opacity-80" />
              <h3 className="font-semibold">Deployment Token</h3>
            </div>
            <p className="text-xs text-blue-100 mb-4 leading-relaxed">
              This token is unique to this installation session. Do not share it publicly.
            </p>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 flex items-center justify-between border border-white/20">
              <code className="text-sm font-mono">{apiToken}</code>
              <button onClick={() => handleCopy(apiToken, 'token')} className="hover:text-blue-200">
                {copied === 'token' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="bg-slate-50 border border-dashed border-slate-300 rounded-xl p-6">
            <div className="flex items-center gap-2 mb-2 text-slate-700">
              <Zap className="w-4 h-4" />
              <span className="text-sm font-semibold">Need help?</span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              Contact the IT Infrastructure team for automated bulk deployments via Ansible or Terraform.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
