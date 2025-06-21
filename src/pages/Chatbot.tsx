import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft, Send, Mic, Bot, User, Heart,
  Thermometer, Baby, Pill
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Chatbot = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Namaste! I'm your Rural Health Assistant. I can help you with symptoms, first aid, finding doctors, and health guidance in Telugu and English. What health concern can I help you with today? \n\n\u0c28\u0c2e\u0c38\u0c4d\u0c15\u0c3e\u0c30\u0c02! \u0c28\u0c47\u0c28\u0c41 \u0c2e\u0c40 \u0c17\u0c4d\u0c30\u0c3e\u0c2e\u0c40\u0c23 \u0c06\u0c30\u0c4b\u0c17\u0c4d\u0c2f \u0c38\u0c39\u0c3e\u0c2f\u0c15\u0c41\u0c21\u0c28\u0c41. \u0c32\u0c15\u0c4d\u0c37\u0c23\u0c3e\u0c32\u0c41, \u0c2a\u0c4d\u0c30\u0c25\u0c2e\u0c1a\u0c3f\u0c15\u0c3f\u0c24\u0c4d\u0c38, \u0c35\u0c48\u0c27\u0c4d\u0c2f\u0c41\u0c32\u0c28\u0c41 \u0c15\u0c28\u0c41\u0c17\u0c4a\u0c28\u0c21\u0c02 \u0c2e\u0c30\u0c3f\u0c2f\u0c41 \u0c06\u0c30\u0c4b\u0c17\u0c4d\u0c2f \u0c2e\u0c3e\u0c30\u0c4d\u0c17\u0c26\u0c30\u0c4d\u0c36\u0c15\u0c24\u0c4d\u0c35\u0c02\u0c32\u0c4b \u0c28\u0c47\u0c28\u0c41 \u0c2e\u0c40\u0c15\u0c41 \u0c38\u0c39\u0c3e\u0c2f\u0c02 \u0c1a\u0c47\u0c2f\u0c17\u0c32\u0c28\u0c41\u0c02।",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('english');

  const quickQuestions = [
    { text: "I have fever, what should I do?", telugu: "\u0c28\u0c3e\u0c15\u0c41 \u0c1c\u0c4d\u0c35\u0c30\u0c02 \u0c35\u0c1a\u0c4d\u0c1a\u0c3f\u0c02\u0c26\u0c3f, \u0c0f\u0c2e\u0c3f \u0c1a\u0c47\u0c2f\u0c3e\u0c32\u0c3f?", icon: Thermometer },
    { text: "Child health tips", telugu: "\u0c2a\u0c3f\u0c32\u0c4d\u0c32\u0c32\u0c3e\u0c30\u0c4b\u0c17\u0c4d\u0c2f \u0c1a\u0c3f\u0c1f\u0c4d\u0c15\u0c3e\u0c32\u0c41", icon: Baby },
    { text: "Medicine reminder help", telugu: "\u0c2e\u0c02\u0c26\u0c41\u0c32 \u0c17\u0c41\u0c30\u0c4d\u0c24\u0c41\u0c17\u0c3e \u0c38\u0c39\u0c3e\u0c2f\u0c02", icon: Pill }
  ];

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const newUserMessage = {
      id: messages.length + 1,
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newUserMessage]);
    setInputMessage('');

    const botResponse = {
      id: messages.length + 2,
      text: getBotResponse(inputMessage),
      sender: 'bot',
      timestamp: new Date()
    };
    setTimeout(() => setMessages(prev => [...prev, botResponse]), 800);
  };

  const getBotResponse = (message) => {
    const msg = message.toLowerCase();
    if (msg.includes('fever') || msg.includes('జ్వరం')) return 'Drink fluids, rest, and take paracetamol if needed.';
    if (msg.includes('child')) return 'Ensure regular vaccinations and hygiene for children.';
    if (msg.includes('medicine')) return 'Set reminders to take medicine regularly. Would you like help setting that?';
    return 'Please describe your health concern more clearly.';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      <header className="bg-white border-b p-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link to="/">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <h1 className="text-xl font-bold text-gray-800">Rural Health Assistant</h1>
        </div>
        <div className="flex space-x-2">
          <Button variant={selectedLanguage === 'telugu' ? 'default' : 'outline'} onClick={() => setSelectedLanguage('telugu')}>తెలుగు</Button>
          <Button variant={selectedLanguage === 'english' ? 'default' : 'outline'} onClick={() => setSelectedLanguage('english')}>English</Button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-4">
        <Card className="mb-4">
          <CardContent className="max-h-[60vh] overflow-y-auto space-y-4 p-4">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[70%] p-3 rounded-lg ${msg.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-800'}`}>
                  <p className="whitespace-pre-line text-sm">{msg.text}</p>
                  <span className="block text-xs mt-1 text-right opacity-50">{msg.timestamp.toLocaleTimeString()}</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="mb-4">
          <CardHeader>
            <CardTitle className="text-sm">Quick Health Questions</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-2">
            {quickQuestions.map((q, i) => (
              <Button
                key={i}
                variant="outline"
                onClick={() => setInputMessage(selectedLanguage === 'telugu' ? q.telugu : q.text)}
              >
                <q.icon className="w-4 h-4 mr-2" />
                {selectedLanguage === 'telugu' ? q.telugu : q.text}
              </Button>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 flex items-center space-x-2">
            <Input
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder={selectedLanguage === 'telugu' ? 'మీ ఆరోగ్య ప్రశ్నను టైప్ చేయండి...' : 'Type your health question...'}
              className="flex-1"
            />
            <Button onClick={handleSendMessage} disabled={!inputMessage.trim()}>
              <Send className="w-4 h-4" />
            </Button>
          </CardContent>
        </Card>

        <p className="text-center text-xs text-gray-500 mt-2">
          ⚠️ This chatbot is for informational purposes only. For emergencies, dial 108.
        </p>
      </main>
    </div>
  );
};

export default Chatbot;
