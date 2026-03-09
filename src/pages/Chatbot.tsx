import React, { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { 
  Send, 
  Bot, 
  User, 
  Ticket, 
  UserPlus, 
  XCircle,
  Sparkles,
  Paperclip,
  Mic,
  History as HistoryIcon,
  Settings as SettingsIcon,
  BookOpen,
  CheckCircle2,
  Clock,
  ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';
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

const SYSTEM_INSTRUCTION = `You are a helpful IT Support Assistant for Zerodha, India's largest stock broker. 
Your goal is to help employees with technical issues.
Common topics: VPN (NetBird), Password Resets, Asset Requests, Software Installation, and Network issues.
Be professional, concise, and helpful.
If you cannot solve an issue after 2 attempts, suggest creating a ticket or escalating to a human engineer.
Current context: The user is an employee at Zerodha.`;

const SUPPORT_AGENTS = ['Karthik S.', 'Priya R.', 'Ankit M.', 'Sneha K.'];

export default function Chatbot() {
  const location = useLocation();
  const [sessions, setSessions] = useState<ChatSession[]>(() => {
    const saved = localStorage.getItem('chatSessions');
    return saved ? JSON.parse(saved) : [
      {
        id: 'current',
        messages: [{ id: '1', role: 'bot', content: 'Hi, welcome to Zerodha IT Support. How can I help you today? I can help with VPN issues, password resets, or checking asset status.', timestamp: '10:30 AM' }],
        status: 'active',
        lastActivity: new Date().toISOString()
      }
    ];
  });

  const [currentSessionId, setCurrentSessionId] = useState('current');
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showTransferModal, setShowTransferModal] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const currentSession = sessions.find(s => s.id === currentSessionId) || sessions[0];
  const messages = currentSession.messages;

  const handleTransfer = (agent: string) => {
    setSessions(prev => prev.map(s => 
      s.id === currentSessionId 
        ? { 
            ...s, 
            assignedTo: agent,
            messages: [
              ...s.messages,
              {
                id: Date.now().toString(),
                role: 'bot',
                content: `Chat has been transferred to ${agent}. They will review the context and assist you shortly.`,
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
              }
            ]
          } 
        : s
    ));
    setShowTransferModal(false);
  };

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
    
    // Update session
    setSessions(prev => prev.map(s => 
      s.id === currentSessionId 
        ? { ...s, messages: updatedMessages, lastActivity: new Date().toISOString() } 
        : s
    ));

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
          contents: input,
          config: {
            systemInstruction: SYSTEM_INSTRUCTION,
          }
        });
        botResponse = response.text || "I'm sorry, I encountered an error processing your request.";
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
        if (s.id === currentSessionId) {
          const newMessages = [...s.messages, botMsg];
          const assignedTo = autoAssign && !s.assignedTo 
            ? SUPPORT_AGENTS[Math.floor(Math.random() * SUPPORT_AGENTS.length)] 
            : s.assignedTo;
          return { ...s, messages: newMessages, assignedTo, lastActivity: new Date().toISOString() };
        }
        return s;
      }));

    } catch (error) {
      console.error("Gemini API Error:", error);
      const errorMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'bot',
        content: "I'm having trouble connecting to my brain right now. Please try again in a moment or create a support ticket.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setSessions(prev => prev.map(s => 
        s.id === currentSessionId 
          ? { ...s, messages: [...s.messages, errorMsg], lastActivity: new Date().toISOString() } 
          : s
      ));
    } finally {
      setIsTyping(false);
    }
  };

  const handleCloseChat = () => {
    if (window.confirm('Are you sure you want to close this chat?')) {
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
          messages: [{ id: '1', role: 'bot', content: 'Hi, welcome to Zerodha IT Support. How can I help you today?', timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }],
          status: 'active',
          lastActivity: new Date().toISOString()
        }
      ]);
      setCurrentSessionId('current');
    }
  };

  // View logic based on route
  if (location.pathname === '/chatbot/history') {
    const historySessions = sessions.filter(s => s.status === 'closed');
    return (
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <HistoryIcon className="w-6 h-6 text-blue-600" />
            Chat History
          </h1>
        </div>
        <div className="grid grid-cols-1 gap-4">
          {historySessions.length === 0 ? (
            <div className="text-center py-12 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
              <Clock className="w-12 h-12 text-slate-300 mx-auto mb-4" />
              <p className="text-slate-500">No previous chat sessions found.</p>
            </div>
          ) : (
            historySessions.sort((a, b) => new Date(b.lastActivity).getTime() - new Date(a.lastActivity).getTime()).map(session => (
              <div key={session.id} className="p-4 bg-white border border-slate-200 rounded-xl hover:shadow-md transition-all cursor-pointer group">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center text-slate-500">
                      <Bot className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900">Session {session.id.slice(-4)}</h3>
                      <p className="text-xs text-slate-500">{new Date(session.lastActivity).toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-1 bg-slate-100 text-slate-600 text-[10px] font-bold uppercase rounded">Closed</span>
                  </div>
                </div>
                <p className="text-sm text-slate-600 line-clamp-1 italic">
                  "{session.messages[session.messages.length - 1].content}"
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    );
  }

  if (location.pathname === '/chatbot/settings') {
    return (
      <div className="p-6 space-y-6">
        <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
          <SettingsIcon className="w-6 h-6 text-blue-600" />
          Bot Settings
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 bg-white border border-slate-200 rounded-2xl space-y-4">
            <h3 className="font-bold text-slate-900 flex items-center gap-2">
              <Bot className="w-5 h-5 text-blue-600" />
              AI Configuration
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Model Name</label>
                <select className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-slate-50">
                  <option>gemini-3-flash-preview</option>
                  <option>gemini-3.1-pro-preview</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Response Temperature</label>
                <input type="range" className="w-full" defaultValue="70" />
                <div className="flex justify-between text-[10px] text-slate-400">
                  <span>Precise</span>
                  <span>Creative</span>
                </div>
              </div>
            </div>
          </div>
          <div className="p-6 bg-white border border-slate-200 rounded-2xl space-y-4">
            <h3 className="font-bold text-slate-900 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              Auto-Assignment
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Enable Auto-Assignment</span>
                <div className="w-10 h-5 bg-blue-600 rounded-full relative">
                  <div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full shadow-sm"></div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Escalation Threshold</label>
                <select className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-slate-50">
                  <option>After 2 messages</option>
                  <option>After 5 messages</option>
                  <option>Immediate</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (location.pathname === '/chatbot/kb') {
    return (
      <div className="p-6 space-y-6">
        <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
          <BookOpen className="w-6 h-6 text-blue-600" />
          Knowledge Base
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {['VPN Setup', 'NetBird Guide', 'Password Policy', 'Asset Requests', 'Software List', 'Network Troubleshooting'].map(topic => (
            <div key={topic} className="p-4 bg-white border border-slate-200 rounded-xl hover:border-blue-300 transition-all cursor-pointer">
              <h3 className="font-bold text-slate-900 mb-1">{topic}</h3>
              <p className="text-xs text-slate-500">Last updated 2 days ago</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-160px)] flex flex-col bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-200">
            <Bot className="text-white w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              AI IT Assistant
              <span className="flex items-center gap-1 px-2 py-0.5 bg-blue-100 text-blue-600 text-[10px] font-black uppercase rounded-full tracking-wider">
                <Sparkles className="w-3 h-3" />
                Powered by Gemini
              </span>
            </h2>
            <p className="text-xs text-slate-500 flex items-center gap-1">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
              {currentSession.assignedTo ? `Assigned to ${currentSession.assignedTo}` : 'Always active • Ready to help'}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={handleCloseChat}
            className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
            title="Close Chat"
          >
            <XCircle className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/30">
        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className={cn(
                "flex gap-4 max-w-[80%]",
                msg.role === 'user' ? "ml-auto flex-row-reverse" : ""
              )}
            >
              <div className={cn(
                "w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm",
                msg.role === 'bot' ? "bg-blue-600 text-white" : "bg-white border border-slate-200 text-slate-600"
              )}>
                {msg.role === 'bot' ? <Bot className="w-5 h-5" /> : <User className="w-5 h-5" />}
              </div>
              <div className="space-y-1">
                <div className={cn(
                  "p-4 rounded-2xl text-sm leading-relaxed shadow-sm",
                  msg.role === 'bot' 
                    ? "bg-white border border-slate-100 text-slate-800 rounded-tl-none" 
                    : "bg-blue-600 text-white rounded-tr-none font-medium"
                )}>
                  {msg.content}
                </div>
                <p className={cn(
                  "text-[10px] text-slate-400 font-medium",
                  msg.role === 'user' ? "text-right" : ""
                )}>
                  {msg.timestamp}
                </p>
              </div>
            </motion.div>
          ))}
          {isTyping && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex gap-4"
            >
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white shadow-sm">
                <Bot className="w-5 h-5" />
              </div>
              <div className="bg-white border border-slate-100 p-4 rounded-2xl rounded-tl-none shadow-sm flex gap-1">
                <span className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce"></span>
                <span className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                <span className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce [animation-delay:0.4s]"></span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t border-slate-200">
        <div className="flex items-center gap-3 mb-4">
          <button className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg text-xs font-bold hover:bg-blue-100 transition-all">
            <Ticket className="w-3.5 h-3.5" />
            Create Ticket
          </button>
          <button 
            onClick={() => setShowTransferModal(true)}
            className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 text-slate-600 rounded-lg text-xs font-bold hover:bg-slate-100 transition-all"
          >
            <UserPlus className="w-3.5 h-3.5" />
            {currentSession.assignedTo ? 'Transfer Chat' : 'Assign Engineer'}
          </button>
          <button 
            onClick={handleCloseChat}
            className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 text-slate-600 rounded-lg text-xs font-bold hover:bg-slate-100 transition-all"
          >
            <XCircle className="w-3.5 h-3.5" />
            Close Chat
          </button>
        </div>
        <div className="relative flex items-center gap-2">
          <div className="flex-1 relative">
            <input 
              type="text" 
              placeholder="Type your message here..."
              className="w-full pl-4 pr-24 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
              <button className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-200 rounded-lg transition-all">
                <Paperclip className="w-4 h-4" />
              </button>
              <button className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-200 rounded-lg transition-all">
                <Mic className="w-4 h-4" />
              </button>
            </div>
          </div>
          <button 
            onClick={handleSend}
            disabled={!input.trim()}
            className="p-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-blue-200"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
      {/* Transfer Modal */}
      <AnimatePresence>
        {showTransferModal && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowTransferModal(false)}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-sm bg-white rounded-2xl shadow-2xl p-6"
            >
              <h2 className="text-lg font-bold text-slate-900 mb-4">Transfer Chat</h2>
              <p className="text-sm text-slate-500 mb-6">Select an IT team member to transfer this conversation to.</p>
              <div className="space-y-2">
                {SUPPORT_AGENTS.filter(a => a !== currentSession.assignedTo).map(agent => (
                  <button
                    key={agent}
                    onClick={() => handleTransfer(agent)}
                    className="w-full p-3 text-left hover:bg-slate-50 rounded-xl border border-slate-100 transition-all flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center font-bold text-xs">
                        {agent.split(' ').map(n => n[0]).join('')}
                      </div>
                      <span className="text-sm font-bold text-slate-700">{agent}</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-blue-500 transition-all" />
                  </button>
                ))}
              </div>
              <button 
                onClick={() => setShowTransferModal(false)}
                className="w-full mt-6 py-2 text-slate-500 text-sm font-bold hover:text-slate-700"
              >
                Cancel
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
