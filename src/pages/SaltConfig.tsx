import React, { useState, useEffect } from 'react';
import { Server, Terminal, Shield, Check, Copy, AlertCircle, Zap, Activity, Key, Settings } from 'lucide-react';
import { cn } from '../lib/utils';

export default function SaltConfig() {
  const [copied, setCopied] = useState<string | null>(null);
  const [status, setStatus] = useState<any>(null);
  const [minions, setMinions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statusRes, minionsRes] = await Promise.all([
          fetch('/api/salt/status'),
          fetch('/api/salt/minions')
        ]);
        const statusData = await statusRes.json();
        const minionsData = await minionsRes.json();
        setStatus(statusData);
        setMinions(minionsData);
      } catch (error) {
        console.error('Error fetching Salt data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const masterInstallCmd = `sudo curl -fsSL https://bootstrap.saltproject.io -o install_salt.sh
sudo sh install_salt.sh -P -M`;

  const minionInstallCmd = `sudo curl -fsSL https://bootstrap.saltproject.io -o install_salt.sh
sudo sh install_salt.sh -P`;

  const masterConfig = `# /etc/salt/master
interface: 0.0.0.0
publish_port: 4505
ret_port: 4506
user: root
auto_accept: False`;

  const minionConfig = `# /etc/salt/minion
master: ${window.location.hostname || 'salt-master.local'}
id: ${Math.random().toString(36).substring(7)}`;

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">SaltStack Configuration</h1>
          <p className="text-slate-500">Manage your Salt Master and Minion deployments</p>
        </div>
        <div className="flex items-center gap-3">
          <div className={cn(
            "flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold",
            status?.master_status === 'Online' ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600"
          )}>
            <Activity className="w-3 h-3" />
            Master: {status?.master_status || 'Offline'}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Step 1: Master Setup */}
          <section className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
            <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Server className="w-4 h-4 text-blue-600" />
                <h2 className="font-semibold text-slate-800">1. Configure Salt Master</h2>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <p className="text-sm text-slate-600">Install the Salt Master on your central management server.</p>
              <div className="relative group">
                <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg text-sm font-mono overflow-x-auto">
                  {masterInstallCmd}
                </pre>
                <button 
                  onClick={() => handleCopy(masterInstallCmd, 'master-cmd')}
                  className="absolute top-3 right-3 p-2 bg-white/10 hover:bg-white/20 rounded-md transition-all text-white"
                >
                  {copied === 'master-cmd' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
              <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 flex gap-3">
                <AlertCircle className="w-5 h-5 text-blue-600 shrink-0" />
                <p className="text-xs text-blue-700 leading-relaxed">
                  Ensure ports <strong>4505</strong> and <strong>4506</strong> are open on your firewall to allow minions to communicate with the master.
                </p>
              </div>
            </div>
          </section>

          {/* Step 2: Minion Setup */}
          <section className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
            <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-600" />
                <h2 className="font-semibold text-slate-800">2. Add Salt Minions</h2>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <p className="text-sm text-slate-600">Run this on each device you want to manage. It will install the minion and point it to this master.</p>
              <div className="relative group">
                <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg text-sm font-mono overflow-x-auto">
                  {minionInstallCmd}
                </pre>
                <button 
                  onClick={() => handleCopy(minionInstallCmd, 'minion-cmd')}
                  className="absolute top-3 right-3 p-2 bg-white/10 hover:bg-white/20 rounded-md transition-all text-white"
                >
                  {copied === 'minion-cmd' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Configuration (/etc/salt/minion)</p>
                <div className="relative group">
                  <pre className="text-xs text-slate-700 font-mono">
                    {minionConfig}
                  </pre>
                  <button 
                    onClick={() => handleCopy(minionConfig, 'minion-conf')}
                    className="absolute top-0 right-0 p-1 text-slate-400 hover:text-slate-600"
                  >
                    {copied === 'minion-conf' ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Step 3: Key Management */}
          <section className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
            <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Key className="w-4 h-4 text-emerald-600" />
                <h2 className="font-semibold text-slate-800">3. Accept Minion Keys</h2>
              </div>
            </div>
            <div className="p-6">
              <p className="text-sm text-slate-600 mb-4">Once a minion is installed, you must accept its key on the master to start managing it.</p>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <div className="flex items-center gap-3">
                    <Terminal className="w-4 h-4 text-slate-400" />
                    <code className="text-xs font-mono text-slate-700">sudo salt-key -L</code>
                  </div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase">List Keys</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <div className="flex items-center gap-3">
                    <Terminal className="w-4 h-4 text-slate-400" />
                    <code className="text-xs font-mono text-slate-700">sudo salt-key -A -y</code>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-600 uppercase">Accept All</span>
                </div>
              </div>
            </div>
          </section>
        </div>

        <div className="space-y-6">
          {/* Minion Status Card */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
            <h3 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
              <Activity className="w-4 h-4 text-blue-500" />
              Deployment Status
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-500">Total Minions</span>
                <span className="text-sm font-bold text-slate-900">{status?.minions_count || 0}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-500">Accepted Keys</span>
                <span className="text-sm font-bold text-emerald-600">{status?.accepted_keys || 0}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-500">Pending Keys</span>
                <span className="text-sm font-bold text-amber-600">{status?.pending_keys || 0}</span>
              </div>
              <div className="pt-4 border-t border-slate-100">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Recent Minions</p>
                <div className="space-y-3">
                  {minions.map((m: any) => (
                    <div key={m.id} className="flex items-center justify-between group">
                      <div className="flex items-center gap-2">
                        <div className={cn(
                          "w-1.5 h-1.5 rounded-full",
                          m.status === 'Accepted' ? "bg-emerald-500" : "bg-amber-500"
                        )} />
                        <span className="text-xs font-medium text-slate-700 truncate max-w-[120px]">{m.id}</span>
                      </div>
                      <span className="text-[10px] text-slate-400">{m.last_seen}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="bg-slate-900 rounded-xl p-6 text-white shadow-lg">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <Shield className="w-4 h-4 text-blue-400" />
              Security Best Practices
            </h3>
            <ul className="space-y-3 text-xs text-slate-400 list-disc pl-4">
              <li>Always verify minion fingerprints before accepting keys.</li>
              <li>Use <code>salt-api</code> for secure external integration.</li>
              <li>Regularly rotate master and minion keys.</li>
              <li>Limit master access to specific IP ranges.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
