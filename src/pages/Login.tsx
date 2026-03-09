import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Lock, Mail, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent, role: 'admin' | 'employee' = 'admin') => {
    e.preventDefault();
    console.log(`Attempting ${role} login with:`, { email, password });
    try {
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('userRole', role);
      console.log('Auth state set, navigating...');
      navigate(role === 'admin' ? '/dashboard' : '/employee');
    } catch (err) {
      console.error('LocalStorage error:', err);
      (window as any).isAuthenticated = true;
      (window as any).userRole = role;
      navigate(role === 'admin' ? '/dashboard' : '/employee');
    }
  };

  const handleSSOLogin = (role: 'admin' | 'employee' = 'admin') => {
    console.log(`SSO ${role} Login triggered`);
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('userRole', role);
    navigate(role === 'admin' ? '/dashboard' : '/employee');
  };

  return (
    <div className="min-h-screen bg-white flex">
      {/* Left Side: Form */}
      <div className="flex-1 flex items-center justify-center p-8 lg:p-16">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full max-w-md"
        >
          <div className="flex flex-col items-start mb-8">
            <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mb-4 shadow-lg shadow-blue-200">
              <Shield className="text-white w-6 h-6" />
            </div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Zerodha IT</h1>
            <p className="text-slate-500 mt-2">Enterprise IT Operations Portal</p>
          </div>

          <form onSubmit={(e) => handleLogin(e, 'admin')} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input 
                  type="text" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                  placeholder="name@company.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
                <span className="text-slate-600">Remember me</span>
              </label>
              <button type="button" className="text-blue-600 font-semibold hover:underline">Forgot password?</button>
            </div>

            <div className="grid grid-cols-1 gap-4">
              <button 
                type="submit"
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-200 transition-all flex items-center justify-center gap-2 group"
              >
                Login as IT Admin
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button 
                type="button"
                onClick={(e) => handleLogin(e as any, 'employee')}
                className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl shadow-lg shadow-slate-200 transition-all flex items-center justify-center gap-2 group"
              >
                Login to Employee Portal
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-slate-500 uppercase tracking-wider font-medium">Or continue with</span>
              </div>
            </div>

            <button 
              type="button"
              onClick={() => handleSSOLogin('admin')}
              className="w-full py-3 bg-white border border-slate-200 text-slate-700 font-semibold rounded-xl hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
            >
              <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
              Sign in with SSO
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-slate-500">
            Not authorized? <button className="text-blue-600 font-semibold hover:underline">Contact IT Admin</button>
          </p>

          <div className="mt-4 pt-4 border-t border-slate-100 text-center">
            <button 
              onClick={handleSSOLogin}
              className="text-xs text-slate-400 hover:text-blue-600 transition-colors"
            >
              Demo Access: Click here to bypass login
            </button>
          </div>
        </motion.div>
      </div>

      {/* Right Side: Image */}
      <div className="hidden lg:block lg:flex-1 relative overflow-hidden bg-slate-900">
        <img 
          src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=2070" 
          alt="IT Operations" 
          className="absolute inset-0 w-full h-full object-cover opacity-60"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
        <div className="absolute bottom-16 left-16 right-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-4xl font-bold text-white mb-4">Unified IT Asset Management</h2>
            <p className="text-slate-300 text-lg max-w-md">
              Streamline your enterprise operations with real-time tracking, automated patching, and integrated support ticketing.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
