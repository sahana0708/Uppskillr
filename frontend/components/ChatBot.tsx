'use client';

import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Loader2 } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

export const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi! I'm your Uppskillr assistant. How can I help you today?",
      isBot: true,
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();

    // Course-related responses
    if (lowerMessage.includes('course') || lowerMessage.includes('subject')) {
      return "We offer courses in Python Programming, Data Structures & Algorithms, and Web Development. You can browse all courses from the 'Browse Courses' section at Uppskillr!";
    }

    if (lowerMessage.includes('python')) {
      return "Our Python Programming course covers everything from basics to advanced concepts, including hands-on projects and real-world applications. It's perfect for beginners!";
    }

    if (lowerMessage.includes('web development') || lowerMessage.includes('web')) {
      return "The Web Development course teaches full-stack development with modern technologies including React, Node.js, and more. You'll build real projects!";
    }

    if (lowerMessage.includes('data structure') || lowerMessage.includes('algorithm') || lowerMessage.includes('dsa')) {
      return "Our Data Structures & Algorithms course includes comprehensive examples, practice problems, and interview preparation. Great for coding interviews!";
    }

    // Navigation help
    if (lowerMessage.includes('navigate') || lowerMessage.includes('use') || lowerMessage.includes('help')) {
      return "To navigate Uppskillr:\n1. Browse courses from the homepage\n2. Click on a course to see sections\n3. Watch videos sequentially\n4. Track progress in your profile\n\nIs there anything specific you'd like to know?";
    }

    if (lowerMessage.includes('login') || lowerMessage.includes('register') || lowerMessage.includes('signup')) {
      return "You can login or register using the buttons in the top-right corner of the navigation bar at Uppskillr. Registration is free!";
    }

    if (lowerMessage.includes('progress') || lowerMessage.includes('track')) {
      return "Your learning progress is automatically tracked as you complete videos. Visit your Profile page to see completed courses and ongoing learning!";
    }

    if (lowerMessage.includes('video') || lowerMessage.includes('watch')) {
      return "Videos must be watched sequentially. Complete each video to unlock the next one. Your progress is saved automatically every 10 seconds!";
    }

    // Greeting
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
      return "Hello! Welcome to Uppskillr. I'm here to help you with your learning journey. What would you like to know?";
    }

    // Default response
    return "Thanks for your question! I'm here to help you with courses, navigation, progress tracking, or any other LMS-related queries. Feel free to ask anything!";
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      isBot: false,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    // Simulate bot response delay
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getBotResponse(inputValue),
        isBot: true,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botResponse]);
      setIsLoading(false);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all transform hover:scale-110"
        aria-label="Chat with assistant"
      >
        {isOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <MessageCircle className="h-6 w-6" />
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-96 bg-white rounded-2xl shadow-2xl border border-pink-100 overflow-hidden flex flex-col max-h-[600px]">
          {/* Header */}
          <div className="bg-gradient-to-r from-pink-500 to-purple-500 p-4">
            <h3 className="text-white font-bold text-lg">Uppskillr Assistant</h3>
            <p className="text-pink-100 text-sm">Ask me anything about courses!</p>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 min-h-[400px]">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                    message.isBot
                      ? 'bg-white border border-pink-200 text-gray-800'
                      : 'bg-gradient-to-r from-pink-500 to-purple-500 text-white'
                  }`}
                >
                  <p className="text-sm whitespace-pre-line">{message.text}</p>
                  <p
                    className={`text-xs mt-1 ${
                      message.isBot ? 'text-gray-500' : 'text-pink-100'
                    }`}
                  >
                    {message.timestamp.toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white border border-pink-200 rounded-2xl px-4 py-3">
                  <Loader2 className="h-5 w-5 animate-spin text-pink-500" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="border-t border-pink-100 p-4 bg-white">
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your question..."
                className="flex-1 border border-pink-200 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent text-sm"
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isLoading}
                className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 disabled:opacity-50 disabled:cursor-not-allowed text-white p-2 rounded-full transition-all"
              >
                <Send className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
