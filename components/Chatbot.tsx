
import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, X, Bot, User, Loader2 } from 'lucide-react';
import { geminiChat } from '../services/geminiService';

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'ai', content: string }[]>([
    { role: 'ai', content: '你好！我是辣啦的 AI 助手。想多了解辣啦的作品、XP 或是擺攤經驗嗎？儘管問我吧噴！' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await geminiChat(userMsg);
      setMessages(prev => [...prev, { role: 'ai', content: response }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'ai', content: '哎呀，連線好像出了一點問題，請再試一次噴！' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-[60] font-rounded">
      {isOpen ? (
        <div className="bg-white rounded-2xl shadow-2xl w-[320px] md:w-[360px] h-[450px] flex flex-col border-[3px] border-slate-900 overflow-hidden animate-in fade-in slide-in-from-bottom-6 duration-300">
          {/* Header */}
          <div className="bg-slate-900 text-white p-3 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 bg-orange-500 text-white rounded-lg flex items-center justify-center font-black text-xs rotate-3">P</div>
              <span className="font-bold text-sm tracking-tight">辣啦 AI 助手</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-white/10 p-1 rounded-lg transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#FFFBF7]">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] rounded-xl p-3 text-xs font-bold leading-relaxed shadow-sm ${
                  m.role === 'user' ? 'bg-orange-500 text-white rounded-tr-none' : 'bg-white text-slate-700 rounded-tl-none border-2 border-slate-100'
                }`}>
                  {m.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white rounded-xl rounded-tl-none p-2 border-2 border-slate-100 shadow-sm">
                  <Loader2 className="w-4 h-4 animate-spin text-orange-500" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 bg-white border-t-2 border-slate-100 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="輸入訊息噴..."
              className="flex-1 bg-slate-50 border-2 border-transparent rounded-xl px-3 py-1.5 text-xs focus:ring-2 focus:ring-orange-400 focus:bg-white focus:outline-none transition-all"
            />
            <button
              onClick={handleSend}
              disabled={isLoading}
              className="bg-orange-500 hover:bg-orange-600 text-white p-1.5 rounded-xl transition-colors disabled:opacity-50 shadow-[2px_2px_0px_#1e293b] active:translate-y-0.5 active:shadow-none"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-orange-500 hover:bg-orange-600 text-white p-3.5 rounded-2xl shadow-xl flex items-center gap-2 font-black transition-all hover:scale-105 active:scale-95 group border-[3px] border-slate-900"
        >
          <MessageSquare className="w-5 h-5 group-hover:animate-bounce" />
          <span className="hidden md:block pr-1 text-xs">問問 AI 助手</span>
        </button>
      )}
    </div>
  );
};

export default Chatbot;
