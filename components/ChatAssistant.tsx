import React, { useState, useRef, useEffect } from 'react';
import { generateRangerResponse } from '../services/geminiService';
import { ChatMessage } from '../types';
import { Send, Bot, User, Loader2, X } from 'lucide-react';

interface ChatAssistantProps {
  contextAnimalName?: string;
  isOpen: boolean;
  onClose: () => void;
}

const ChatAssistant: React.FC<ChatAssistantProps> = ({ contextAnimalName, isOpen, onClose }) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'model',
      text: 'Привет! Я ваш виртуальный гид по комплексу «Лаура». Спрашивайте меня о животных или заповеднике! 🌲',
      timestamp: new Date()
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // If context changes (user clicked "Ask Guide" on a new animal), prompt user or auto-suggest
  useEffect(() => {
    if (contextAnimalName && isOpen) {
       // Optional: We could auto-send a message here, but it might be intrusive. 
       // Instead, we just rely on the visual cue that the chat opened.
    }
  }, [contextAnimalName, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const responseText = await generateRangerResponse(userMsg.text, contextAnimalName);
      
      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: responseText,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMsg]);
    } catch (error) {
       const errorMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: 'Простите, сейчас я не могу ответить. Проверьте соединение или API ключ.',
        timestamp: new Date(),
        isError: true
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="flex flex-col h-full bg-forest-50">
      {/* Header */}
      <div className="bg-forest-600 text-white p-4 flex justify-between items-center shadow-md shrink-0">
        <div className="flex items-center gap-2">
          <div className="bg-white/20 p-1.5 rounded-full">
            <Bot size={20} />
          </div>
          <div>
            <h3 className="font-bold text-sm">Гид Заповедника</h3>
            {contextAnimalName && (
              <p className="text-xs text-forest-100 truncate max-w-[150px]">О: {contextAnimalName}</p>
            )}
          </div>
        </div>
        <button onClick={onClose} className="hover:bg-white/10 p-1 rounded transition">
          <X size={20} />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div 
            key={msg.id} 
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`
              max-w-[85%] rounded-2xl p-3 shadow-sm text-sm leading-relaxed
              ${msg.role === 'user' 
                ? 'bg-wood-500 text-white rounded-br-none' 
                : 'bg-white text-wood-900 border border-forest-100 rounded-bl-none'}
              ${msg.isError ? 'bg-red-50 border-red-200 text-red-600' : ''}
            `}>
              {msg.text}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
             <div className="bg-white text-forest-500 border border-forest-100 rounded-2xl rounded-bl-none p-3 shadow-sm flex items-center gap-2">
               <Loader2 size={16} className="animate-spin" />
               <span className="text-xs">Думаю...</span>
             </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-3 bg-white border-t border-forest-100 shrink-0">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder={contextAnimalName ? `Спросите о: ${contextAnimalName}...` : "Задайте вопрос..."}
            className="flex-1 bg-forest-50 border border-forest-200 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-forest-400 text-wood-900 placeholder:text-wood-300"
          />
          <button 
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className="bg-forest-600 hover:bg-forest-700 disabled:bg-gray-300 text-white p-2 rounded-full transition-colors shadow-sm"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatAssistant;