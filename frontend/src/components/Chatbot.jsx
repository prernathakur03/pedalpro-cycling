import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, User, MessageCircle, ExternalLink } from 'lucide-react';

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: 'Hello! Welcome to PedalPro Cycling Worli. How can I help you today? Please tap a question below.'
    }
  ]);
  const chatEndRef = useRef(null);

  const WHATSAPP_NUMBER = "919920455722";

  // Predefined Questions and Answers
  const predefinedQA = [
    {
      id: 1,
      question: "What are your rental rates?",
      answer: "Our rates start at ₹100/hr for Non-Gear cycles and ₹150/hr for Premium Gear cycles. Special 2-hour discount packages are also available!"
    },
    {
      id: 2,
      question: "What documents do I need to submit?",
      answer: "You need to show any original ID proof (College ID (if applicable), Aadhaar Card, Driving License, or Passport) when picking up the cycle."
    },
    {
      id: 3,
      question: "Where is the pick-up point?",
      answer: "Our pick-up point is located directly at Worli Seaface Promenade, Mumbai. Exact location coordinates are shared upon WhatsApp booking confirmation."
    },
    {
      id: 4,
      question: "What are your operating timings?",
      answer: "We are open daily from 5:00 AM in the morning to 1:00 AM at night for sunrise, evening, and night seaface rides."
    },
    {
      id: 5,
      question: "Are helmets provided?",
      answer: "Yes! Protective helmets and cycle locks are included free of cost with every cycle rental."
    }
  ];

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSelectQuestion = (item) => {
    // Append User Question
    setMessages((prev) => [...prev, { sender: 'user', text: item.question }]);

    // Append Bot Answer after brief pause
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          sender: 'bot',
          text: item.answer,
          showWhatsAppFallback: true
        }
      ]);
    }, 400);
  };

  const getWhatsAppLink = (customText = "Hi PedalPro, I have an enquiry regarding cycle rentals.") => {
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(customText)}`;
  };

  return (
    <div className="fixed bottom-24 right-6 z-50">
      {/* Floating Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-sky-500 hover:bg-sky-400 text-white p-4 rounded-full shadow-2xl flex items-center gap-2 group transition-all duration-300 transform hover:scale-105"
          aria-label="Open Chatbot"
        >
          <MessageSquare className="w-6 h-6" />
          <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 ease-in-out whitespace-nowrap text-sm font-bold">
            Chat with us
          </span>
        </button>
      )}

      {/* Chatbox Panel */}
      {isOpen && (
        <div className="w-[340px] sm:w-[380px] h-[520px] bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-300">
          
          {/* Header */}
          <div className="p-4 bg-slate-800/90 border-b border-slate-700/80 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-sky-500/20 text-sky-400 rounded-xl">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">PedalPro Support</h3>
                <p className="text-[11px] text-emerald-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  Instant Answers
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-700/60 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Container */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 text-xs sm:text-sm">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'bot' && (
                  <div className="w-7 h-7 rounded-full bg-sky-500/20 border border-sky-400/30 text-sky-400 flex items-center justify-center shrink-0">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div className="space-y-2 max-w-[80%]">
                  <div
                    className={`p-3 rounded-2xl ${
                      msg.sender === 'user'
                        ? 'bg-sky-500 text-white rounded-tr-none'
                        : 'bg-slate-800 text-slate-200 border border-slate-700/60 rounded-tl-none'
                    }`}
                  >
                    {msg.text}
                  </div>

                  {/* Fallback WhatsApp Prompt if answer doesn't resolve query */}
                  {msg.showWhatsAppFallback && (
                    <div className="text-[11px] text-slate-400 pl-1">
                      Didn't find what you were looking for?{' '}
                      <a
                        href={getWhatsAppLink(`Hi PedalPro, I asked: "${messages[index - 1]?.text || 'enquiry'}" and need more details.`)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-emerald-400 hover:underline font-semibold inline-flex items-center gap-0.5 mt-1"
                      >
                        Chat directly on WhatsApp <ExternalLink className="w-3 h-3 inline" />
                      </a>
                    </div>
                  )}
                </div>

                {msg.sender === 'user' && (
                  <div className="w-7 h-7 rounded-full bg-slate-700 text-slate-300 flex items-center justify-center shrink-0">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>

          {/* Predefined Questions Buttons */}
          <div className="p-3 bg-slate-950/80 border-t border-slate-800 space-y-1.5">
            <p className="text-[11px] font-semibold text-slate-400 px-1 mb-1">
              Select a question to ask:
            </p>
            <div className="max-h-36 overflow-y-auto space-y-1.5 pr-1 scrollbar-thin">
              {predefinedQA.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleSelectQuestion(item)}
                  className="w-full text-left text-xs p-2.5 rounded-xl bg-slate-800/80 hover:bg-sky-500/20 border border-slate-700/60 hover:border-sky-500/40 text-slate-200 hover:text-sky-300 transition-colors duration-150 flex items-center justify-between"
                >
                  <span className="truncate">{item.question}</span>
                  <Send className="w-3 h-3 text-slate-500 shrink-0 ml-1" />
                </button>
              ))}
            </div>

            {/* Direct WhatsApp Callout Button */}
            <a
              href={getWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full mt-2 py-2 px-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Need something else? WhatsApp Us</span>
            </a>
          </div>

        </div>
      )}
    </div>
  );
}