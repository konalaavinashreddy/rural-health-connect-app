
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Send, Mic, Bot, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Chatbot = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm your HealthBot AI assistant. I can help you find doctors, book appointments, and answer health questions in Telugu and English. How can I assist you today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('english');

  const quickQuestions = [
    "I have fever, what should I do?",
    "Find a cardiologist near me",
    "Book an appointment",
    "Show my medicine reminders"
  ];

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      const newMessage = {
        id: messages.length + 1,
        text: inputMessage,
        sender: 'user',
        timestamp: new Date()
      };

      setMessages([...messages, newMessage]);
      setInputMessage('');

      // Simulate bot response
      setTimeout(() => {
        const botResponse = {
          id: messages.length + 2,
          text: getBotResponse(inputMessage),
          sender: 'bot',
          timestamp: new Date()
        };
        setMessages(prev => [...prev, botResponse]);
      }, 1000);
    }
  };

  const getBotResponse = (userMessage: string) => {
    const message = userMessage.toLowerCase();
    
    if (message.includes('fever')) {
      return "For fever, here are some immediate steps: 1) Rest and stay hydrated 2) Take paracetamol if needed 3) Monitor your temperature. If fever persists above 101°F for more than 2 days, please consult a doctor. Would you like me to help you find a nearby doctor?";
    } else if (message.includes('cardiologist') || message.includes('heart')) {
      return "I can help you find cardiologists in your area. We have Dr. Michael Lee (4.9★, 15 years exp) available tomorrow at 10:30 AM. Would you like to book an appointment?";
    } else if (message.includes('appointment') || message.includes('book')) {
      return "I'd be happy to help you book an appointment! Please let me know: 1) What type of doctor do you need? 2) Any specific symptoms or concerns? 3) Your preferred date/time?";
    } else if (message.includes('medicine') || message.includes('reminder')) {
      return "Your current medicine reminders: Amoxicillin (8:00 AM - Due), Insulin (6:30 PM), Eye drops (8:00 PM). Would you like to add a new medicine or modify existing reminders?";
    } else {
      return "I understand your concern. To provide the best assistance, could you please specify: 1) Your symptoms 2) How long you've been experiencing them 3) Any specific area of concern? I'm here to help guide you to the right healthcare solution.";
    }
  };

  const handleQuickQuestion = (question: string) => {
    setInputMessage(question);
  };

  const toggleVoiceInput = () => {
    setIsListening(!isListening);
    // Voice input functionality would be implemented here
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      <header className="bg-white shadow-sm border-b border-blue-100">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to="/">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-5 h-5" />
                </Button>
              </Link>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center">
                  <Bot className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">HealthBot AI</h1>
                  <p className="text-sm text-green-500">Online</p>
                </div>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button
                variant={selectedLanguage === 'telugu' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedLanguage('telugu')}
              >
                తెలుగు
              </Button>
              <Button
                variant={selectedLanguage === 'english' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedLanguage('english')}
              >
                English
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8 h-[calc(100vh-120px)] flex flex-col">
        {/* Chat Messages */}
        <Card className="healthcare-card flex-1 mb-4 flex flex-col">
          <CardContent className="p-6 flex-1 overflow-y-auto">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-start space-x-3 max-w-[80%] ${message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${message.sender === 'user' ? 'bg-blue-500' : 'bg-green-500'}`}>
                      {message.sender === 'user' ? (
                        <User className="w-4 h-4 text-white" />
                      ) : (
                        <Bot className="w-4 h-4 text-white" />
                      )}
                    </div>
                    <div className={`rounded-lg p-4 ${message.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-900'}`}>
                      <p className="text-sm">{message.text}</p>
                      <p className={`text-xs mt-2 ${message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'}`}>
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Questions */}
        <Card className="healthcare-card mb-4">
          <CardHeader>
            <CardTitle className="text-sm">Quick Questions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {quickQuestions.map((question, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => handleQuickQuestion(question)}
                  className="text-left justify-start h-auto p-3 whitespace-normal"
                >
                  {question}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Message Input */}
        <Card className="healthcare-card">
          <CardContent className="p-4">
            <div className="flex space-x-2">
              <Input
                type="text"
                placeholder="Type your health question here..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                className="flex-1 h-12 border-2 border-blue-100 focus:border-blue-300"
              />
              <Button
                onClick={toggleVoiceInput}
                variant={isListening ? "default" : "outline"}
                size="icon"
                className="h-12 w-12"
              >
                <Mic className={`w-5 h-5 ${isListening ? 'text-white' : 'text-blue-500'}`} />
              </Button>
              <Button
                onClick={handleSendMessage}
                className="button-primary h-12 px-6"
                disabled={!inputMessage.trim()}
              >
                <Send className="w-5 h-5" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Chatbot;
