import React, { useState, useEffect, useRef } from 'react';
import { 
  Send, 
  Bot, 
  User, 
  Ticket, 
  X, 
  MessageSquare, 
  Plus, 
  Monitor, 
  Laptop, 
  Package,
  ChevronRight,
  Shield,
  Clock,
  CheckCircle2,
  AlertCircle,
  Server,
  Megaphone,
  ListTodo,
  Download,
  Cpu,
  HardDrive,
  Activity
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';
import { MOCK_DEVICES } from '../mockData';
import { GoogleGenAI } from "@google/genai";

interface Message {
  id: string;
  role: 'bot' | 'user';
  content: string;
  timestamp: string;
}

interface ChatSession {
  id: string;
  messages: Message[];
  assignedTo?: string;
  status: 'active' | 'closed';
  lastActivity: string;
}

const SUPPORT_AGENTS = ['Karthik S.', 'Priya R.', 'Ankit M.', 'Sneha K.'];

const ANNOUNCEMENTS = [
  {
    id: '1',
    title: 'Scheduled Network Maintenance',
    content: 'The office network will be down for maintenance this Sunday from 10 AM to 2 PM.',
    time: '2 hours ago',
    type: 'info'
  },
  {
    id: '2',
    title: 'New Security Policy',
    content: 'All employees are required to update their passwords by the end of this week.',
    time: 'Yesterday',
    type: 'warning'
  }
];

const MOCK_TASKS = [
  { id: '1', title: 'Update OS to v14.2', status: 'Pending', dueDate: '2024-03-25' },
  { id: '2', title: 'Complete Security Training', status: 'In Progress', dueDate: '2024-03-20' },
  { id: '3', title: 'Return Old Monitor', status: 'Completed', dueDate: '2024-03-15' },
];

export default function EmployeePortal() {
  // For demo, we assume the logged in user is Daniella Oliver
  const currentUserEmail = 'daniella.oliver@zerodha.com';
  const myDevices = MOCK_DEVICES.filter(d => d.emailId === currentUserEmail);
  
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [sessions, setSessions] = useState<ChatSession[]>(() => {
    const saved = localStorage.getItem('chatSessions');
    return saved ? JSON.parse(saved) : [
      {
        id: 'current',
        messages: [{ id: '1', role: 'bot', content: 'Hello! I am your Zerodha IT Assistant. How can I help you today?', timestamp: '10:30 AM' }],
        status: 'active',
        lastActivity: new Date().toISOString()
      }
    ];
  });

  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showRequirementModal, setShowRequirementModal] = useState(false);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState<any>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const currentSession = sessions.find(s => s.id === 'current') || sessions[0];
  const messages = currentSession.messages;

  useEffect(() => {
    localStorage.setItem('chatSessions', JSON.stringify(sessions));
  }, [sessions]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const updatedMessages = [...messages, userMsg];
    
    setSessions(prev => prev.map(s => 
      s.id === 'current' 
        ? { ...s, messages: updatedMessages, lastActivity: new Date().toISOString() } 
        : s
    ));

    const currentInput = input;
    setInput('');
    setIsTyping(true);

    try {
      const userMessageCount = updatedMessages.filter(m => m.role === 'user').length;
      let botResponse = "";
      let autoAssign = false;

      if (userMessageCount <= 2) {
        const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });
        const response = await ai.models.generateContent({
          model: "gemini-3-flash-preview",
          contents: currentInput,
          config: {
            systemInstruction: "You are a helpful IT support assistant for Zerodha. Be concise and professional. If the user asks about hardware or software changes, mention they can use the 'Raise Requirement' button. If the issue seems complex, suggest creating a ticket.",
          },
        });
        botResponse = response.text || "I'm sorry, I'm having trouble processing that right now.";
      } else {
        botResponse = "I've forwarded your request to our live support team. An engineer will be with you shortly. Thank you for your patience.";
        autoAssign = true;
      }

      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'bot',
        content: botResponse,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setSessions(prev => prev.map(s => {
        if (s.id === 'current') {
          const newMessages = [...s.messages, botMsg];
          const assignedTo = autoAssign && !s.assignedTo 
            ? SUPPORT_AGENTS[Math.floor(Math.random() * SUPPORT_AGENTS.length)] 
            : s.assignedTo;
          return { ...s, messages: newMessages, assignedTo, lastActivity: new Date().toISOString() };
        }
        return s;
      }));
    } catch (error) {
      console.error("AI Error:", error);
      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'bot',
        content: "I'm having some technical difficulties. Please try again later or raise a requirement.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setSessions(prev => prev.map(s => 
        s.id === 'current' 
          ? { ...s, messages: [...s.messages, botMsg], lastActivity: new Date().toISOString() } 
          : s
      ));
    } finally {
      setIsTyping(false);
    }
  };

  const handleCloseChat = () => {
    if (window.confirm('Are you sure you want to close this chat? It will be saved to your history.')) {
      const newHistorySession: ChatSession = {
        ...currentSession,
        id: `hist-${Date.now()}`,
        status: 'closed'
      };
      
      setSessions(prev => [
        ...prev.filter(s => s.id !== 'current'),
        newHistorySession,
        {
          id: 'current',
          messages: [{ id: '1', role: 'bot', content: 'Hello! I am your Zerodha IT Assistant. How can I help you today?', timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }],
          status: 'active',
          lastActivity: new Date().toISOString()
        }
      ]);
      setIsChatOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Employee IT Portal</h1>
            <p className="text-sm text-slate-500">Manage your assets and requests</p>
          </div>
          <button 
            onClick={() => setShowRequirementModal(true)}
            className="px-4 py-2 bg-[#007AFF] text-white rounded-md text-sm font-semibold hover:bg-blue-600 transition-all flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Raise Requirement
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* My Devices & Tasks */}
          <div className="lg:col-span-2 space-y-8">
            <div className="space-y-6">
              <h2 className="text-lg font-bold text-slate-900">My Assigned Assets</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {myDevices.length > 0 ? myDevices.map((device) => (
                  <div key={device.id} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4 hover:border-blue-200 transition-all group">
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 bg-[#EBF5FF] text-[#007AFF] rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                        {device.type === 'SERVER' ? <Server className="w-6 h-6" /> : <Laptop className="w-6 h-6" />}
                      </div>
                      <div className={cn(
                        "px-2 py-0.5 rounded-full text-[10px] font-bold uppercase",
                        device.status === 'Online' ? "bg-emerald-50 text-emerald-600" : "bg-slate-100 text-slate-500"
                      )}>
                        {device.status}
                      </div>
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900">{device.name}</h3>
                      <p className="text-xs text-slate-500">{device.assetTag}</p>
                    </div>
                    <div className="pt-4 border-t border-slate-100 space-y-2">
                      <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase">
                        <span>Security Score</span>
                        <span>{device.score}/100</span>
                      </div>
                      <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div className={cn(
                          "h-full transition-all duration-1000",
                          device.score > 80 ? "bg-emerald-500" : device.score > 50 ? "bg-amber-500" : "bg-red-500"
                        )} style={{ width: `${device.score}%` }}></div>
                      </div>
                    </div>
                    <button 
                      onClick={() => setSelectedDevice(device)}
                      className="w-full py-2 bg-slate-50 text-slate-600 text-xs font-bold rounded-lg hover:bg-slate-100 transition-all flex items-center justify-center gap-2"
                    >
                      View Full Specs
                      <ChevronRight className="w-3 h-3" />
                    </button>
                  </div>
                )) : (
                  <div className="col-span-2 bg-white p-12 rounded-xl border border-dashed border-slate-300 flex flex-col items-center justify-center text-slate-400">
                    <Monitor className="w-12 h-12 mb-4 opacity-20" />
                    <p className="text-sm font-medium">No assets assigned to your email yet.</p>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <ListTodo className="w-5 h-5 text-[#007AFF]" />
                  My Tasks
                </h2>
                <button 
                  onClick={() => setShowTaskModal(true)}
                  className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-600 hover:bg-slate-50 transition-all flex items-center gap-2"
                >
                  <Plus className="w-3 h-3" />
                  New Task
                </button>
              </div>
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm divide-y divide-slate-100">
                {MOCK_TASKS.map((task) => (
                  <div key={task.id} className="p-4 flex items-center justify-between hover:bg-slate-50 transition-all">
                    <div className="flex items-center gap-4">
                      <div className={cn(
                        "w-8 h-8 rounded-lg flex items-center justify-center",
                        task.status === 'Completed' ? "bg-emerald-50 text-emerald-600" : "bg-blue-50 text-blue-600"
                      )}>
                        {task.status === 'Completed' ? <CheckCircle2 className="w-4 h-4" /> : <Clock className="w-4 h-4" />}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-900">{task.title}</p>
                        <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Due: {task.dueDate}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={cn(
                        "px-2 py-1 rounded text-[10px] font-black uppercase tracking-wider",
                        task.status === 'Completed' ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"
                      )}>
                        {task.status}
                      </span>
                      <button className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-all">
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Announcements & Updates */}
          <div className="space-y-6">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Megaphone className="w-5 h-5 text-[#007AFF]" />
              Announcements
            </h2>
            <div className="space-y-4">
              {ANNOUNCEMENTS.map((ann) => (
                <div key={ann.id} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:border-blue-200 transition-all">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-bold text-slate-900">{ann.title}</h3>
                    <span className={cn(
                      "px-2 py-0.5 rounded text-[10px] font-bold uppercase",
                      ann.type === 'warning' ? "bg-amber-50 text-amber-600" : "bg-blue-50 text-blue-600"
                    )}>
                      {ann.type}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed mb-3">
                    {ann.content}
                  </p>
                  <div className="flex items-center gap-1 text-[10px] text-slate-400">
                    <Clock className="w-3 h-3" />
                    {ann.time}
                  </div>
                </div>
              ))}
            </div>

            <h2 className="text-lg font-bold text-slate-900 mt-8">Recent Updates</h2>
            <div className="bg-white p-6 rounded-md border border-slate-200 shadow-sm space-y-6">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-blue-50 text-blue-600 rounded">
                  <Shield className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900">Security Patch Applied</p>
                  <p className="text-xs text-slate-500">SaltStack successfully updated ZT-WKS-442</p>
                  <p className="text-[10px] text-slate-400 mt-1">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-2 bg-emerald-50 text-emerald-600 rounded">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900">Compliance Check Passed</p>
                  <p className="text-xs text-slate-500">OpenSCAP hardening verified</p>
                  <p className="text-[10px] text-slate-400 mt-1">Yesterday</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Chatbot */}
      <div className="fixed bottom-6 right-6 z-50">
        <AnimatePresence>
          {isChatOpen ? (
            <motion.div 
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              className="w-96 h-[500px] bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden"
            >
              {/* Chat Header */}
              <div className="p-4 bg-[#007AFF] text-white flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-bold">IT Support Assistant</p>
                    <p className="text-[10px] opacity-80">
                      {currentSession.assignedTo ? `Assigned to ${currentSession.assignedTo}` : '3 Members Online • Powered by Gemini'}
                    </p>
                  </div>
                </div>
                <button onClick={() => setIsChatOpen(false)} className="p-1 hover:bg-white/10 rounded">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50">
                {messages.map((msg) => (
                  <div key={msg.id} className={cn(
                    "flex gap-3 max-w-[85%]",
                    msg.role === 'user' ? "ml-auto flex-row-reverse" : ""
                  )}>
                    <div className={cn(
                      "w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0",
                      msg.role === 'bot' ? "bg-[#007AFF] text-white" : "bg-white border border-slate-200 text-slate-600 shadow-sm"
                    )}>
                      {msg.role === 'bot' ? <Bot className="w-3.5 h-3.5" /> : <User className="w-3.5 h-3.5" />}
                    </div>
                    <div className="space-y-1">
                      <div className={cn(
                        "p-3 rounded-xl text-xs leading-relaxed shadow-sm",
                        msg.role === 'bot' 
                          ? "bg-white border border-slate-100 text-slate-800 rounded-tl-none" 
                          : "bg-[#007AFF] text-white rounded-tr-none font-medium"
                      )}>
                        {msg.content}
                      </div>
                      <p className={cn("text-[8px] text-slate-400", msg.role === 'user' ? "text-right" : "")}>
                        {msg.timestamp}
                      </p>
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex gap-3">
                    <div className="w-6 h-6 bg-[#007AFF] rounded-full flex items-center justify-center text-white">
                      <Bot className="w-3.5 h-3.5" />
                    </div>
                    <div className="bg-white border border-slate-100 p-3 rounded-xl rounded-tl-none shadow-sm flex gap-1">
                      <span className="w-1 h-1 bg-slate-300 rounded-full animate-bounce"></span>
                      <span className="w-1 h-1 bg-slate-300 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                      <span className="w-1 h-1 bg-slate-300 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Chat Footer */}
              <div className="p-4 bg-white border-t border-slate-100">
                {messages.length > 2 && (
                  <button 
                    onClick={handleCloseChat}
                    className="w-full mb-3 py-2 bg-emerald-50 text-emerald-600 text-xs font-bold rounded-md hover:bg-emerald-100 transition-all flex items-center justify-center gap-2"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    Issue Fixed - Close Chat
                  </button>
                )}
                <div className="flex items-center gap-2">
                  <input 
                    type="text" 
                    placeholder="Describe your issue..."
                    className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs outline-none focus:ring-1 focus:ring-blue-500"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  />
                  <button 
                    onClick={handleSend}
                    disabled={!input.trim()}
                    className="p-2 bg-[#007AFF] text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.button
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              whileHover={{ scale: 1.1 }}
              onClick={() => setIsChatOpen(true)}
              className="w-14 h-14 bg-[#007AFF] text-white rounded-full shadow-2xl flex items-center justify-center hover:bg-blue-600 transition-all"
            >
              <MessageSquare className="w-6 h-6" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* Device Detail Modal */}
      <AnimatePresence>
        {selectedDevice && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedDevice(null)}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden"
            >
              <div className="p-6 bg-slate-900 text-white flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                    <Laptop className="w-7 h-7" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">{selectedDevice.name}</h2>
                    <p className="text-xs text-slate-400 uppercase tracking-widest font-bold">{selectedDevice.assetTag}</p>
                  </div>
                </div>
                <button onClick={() => setSelectedDevice(null)} className="p-2 hover:bg-white/10 rounded-lg transition-all">
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="p-8 grid grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Hardware Specifications</h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                        <Cpu className="w-4 h-4 text-blue-500" />
                        <div>
                          <p className="text-[10px] text-slate-400 font-bold uppercase">Processor</p>
                          <p className="text-sm font-bold text-slate-900">{selectedDevice.hardwareSpecs?.cpu || 'Apple M2 Pro'}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                        <Activity className="w-4 h-4 text-emerald-500" />
                        <div>
                          <p className="text-[10px] text-slate-400 font-bold uppercase">Memory (RAM)</p>
                          <p className="text-sm font-bold text-slate-900">{selectedDevice.hardwareSpecs?.ram || '16GB Unified'}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                        <HardDrive className="w-4 h-4 text-amber-500" />
                        <div>
                          <p className="text-[10px] text-slate-400 font-bold uppercase">Storage</p>
                          <p className="text-sm font-bold text-slate-900">{selectedDevice.hardwareSpecs?.storage || '512GB SSD'}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Software & Compliance</h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center p-3 border border-slate-100 rounded-xl">
                        <span className="text-xs font-bold text-slate-600">Operating System</span>
                        <span className="text-xs font-bold text-slate-900">{selectedDevice.os}</span>
                      </div>
                      <div className="flex justify-between items-center p-3 border border-slate-100 rounded-xl">
                        <span className="text-xs font-bold text-slate-600">Last Security Scan</span>
                        <span className="text-xs font-bold text-slate-900">Today, 09:45 AM</span>
                      </div>
                      <div className="flex justify-between items-center p-3 border border-slate-100 rounded-xl">
                        <span className="text-xs font-bold text-slate-600">Antivirus Status</span>
                        <span className="text-xs font-bold text-emerald-600">Active & Protected</span>
                      </div>
                      <div className="flex justify-between items-center p-3 border border-slate-100 rounded-xl">
                        <span className="text-xs font-bold text-slate-600">Warranty Ends</span>
                        <span className="text-xs font-bold text-slate-900">Dec 2025</span>
                      </div>
                      <div className="flex justify-between items-center p-3 border border-slate-100 rounded-xl">
                        <span className="text-xs font-bold text-slate-600">Purchase Date</span>
                        <span className="text-xs font-bold text-slate-900">Jan 2023</span>
                      </div>
                    </div>
                  </div>
                  <button className="w-full py-3 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-all flex items-center justify-center gap-2">
                    <Download className="w-4 h-4" />
                    Download Asset Report
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Create Task Modal */}
      <AnimatePresence>
        {showTaskModal && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowTaskModal(false)}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl p-8"
            >
              <h2 className="text-xl font-bold text-slate-900 mb-6">Create New Task</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Task Title</label>
                  <input 
                    type="text"
                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none"
                    placeholder="e.g. Update Slack to latest version"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Due Date</label>
                  <input 
                    type="date"
                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Description</label>
                  <textarea 
                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none h-24"
                    placeholder="Provide more details..."
                  />
                </div>
                <button 
                  onClick={() => {
                    alert("Task created successfully!");
                    setShowTaskModal(false);
                  }}
                  className="w-full py-3 bg-[#007AFF] text-white font-bold rounded-xl hover:bg-blue-600 transition-all"
                >
                  Create Task
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Requirement Modal */}
      <AnimatePresence>
        {showRequirementModal && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowRequirementModal(false)}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl p-8"
            >
              <h2 className="text-xl font-bold text-slate-900 mb-6">Raise Requirement</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Requirement Type</label>
                  <select className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none">
                    <option>Laptop Change</option>
                    <option>Software Installation</option>
                    <option>Permission Request</option>
                    <option>Hardware Upgrade</option>
                    <option>Access Request</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Reason / Description</label>
                  <textarea 
                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none h-32"
                    placeholder="Please explain why you need this..."
                  />
                </div>
                <button 
                  onClick={() => {
                    alert("Requirement raised successfully!");
                    setShowRequirementModal(false);
                  }}
                  className="w-full py-3 bg-[#007AFF] text-white font-bold rounded-xl hover:bg-blue-600 transition-all"
                >
                  Submit Request
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
