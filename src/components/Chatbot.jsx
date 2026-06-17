import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MessageCircle, X, Send, Bot } from 'lucide-react';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hello! I'm the XShared assistant. How can I help you today?", sender: 'bot' }
  ]);
  const [inputValue, setInputValue] = useState('');

  const handleSendMessage = () => {
    if (inputValue.trim() === '') return;

    const newMessages = [...messages, { text: inputValue, sender: 'user' }];
    setMessages(newMessages);
    setInputValue('');

    setTimeout(() => {
      setMessages(prev => [...prev, { text: "Thanks for your message! This is a demo, and I can't process requests yet. But real AI capabilities are coming soon! 🚀", sender: 'bot' }]);
    }, 1000);
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="rounded-full w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg"
        >
          {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
        </Button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-24 right-6 w-80 h-[450px] bg-gray-900/80 backdrop-blur-lg border border-white/20 rounded-xl shadow-2xl flex flex-col z-50"
          >
            <div className="p-4 border-b border-white/20 flex items-center space-x-2">
              <Bot size={20} className="text-blue-400" />
              <h3 className="font-bold text-white">XShared Assistant</h3>
            </div>
            <div className="flex-1 p-4 space-y-4 overflow-y-auto scrollbar-hide">
              {messages.map((msg, index) => (
                <div key={index} className={`flex ${msg.sender === 'bot' ? 'justify-start' : 'justify-end'}`}>
                  <div className={`max-w-[80%] p-3 rounded-lg text-sm ${msg.sender === 'bot' ? 'bg-blue-500/30 text-white' : 'bg-white/20 text-white'}`}>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 border-t border-white/20">
              <div className="flex items-center space-x-2">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Ask something..."
                  className="bg-white/10 border-white/20 text-white"
                />
                <Button size="icon" onClick={handleSendMessage}>
                  <Send size={16} />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;