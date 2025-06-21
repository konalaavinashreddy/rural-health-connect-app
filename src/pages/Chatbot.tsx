
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft, Send, Mic, Bot, User, Heart,
  Thermometer, Baby, Pill, Globe
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { commonTranslations } from '@/data/translations';

const Chatbot = () => {
  const { language, toggleLanguage, t } = useLanguage();
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: language === 'te' 
        ? "నమస్కారం! నేను మీ గ్రామీణ ఆరోగ్య సహాయకుడను. లక్షణాలు, ప్రథమ చికిత్స, వైద్యులను కనుగొనడం మరియు తెలుగు మరియు ఆంగ్లంలో ఆరోగ్య మార్గదర్శకత్వంలో నేను మీకు సహాయం చేయగలను. ఈ రోజు నేను మీకు ఏ ఆరోగ్య సమస్యతో సహాయం చేయగలను?"
        : "Namaste! I'm your Rural Health Assistant. I can help you with symptoms, first aid, finding doctors, and health guidance in Telugu and English. What health concern can I help you with today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');

  const chatbotTranslations = {
    ruralHealthAssistant: {
      en: "Rural Health Assistant",
      te: "గ్రామీణ ఆరోగ్య సహాయకుడు"
    },
    quickHealthQuestions: {
      en: "Quick Health Questions",
      te: "త్వరిత ఆరోగ్య ప్రశ్నలు"
    },
    typePlaceholder: {
      en: "Type your health question...",
      te: "మీ ఆరోగ్య ప్రశ్నను టైప్ చేయండి..."
    },
    emergencyNotice: {
      en: "⚠️ This chatbot is for informational purposes only. For emergencies, dial 108.",
      te: "⚠️ ఈ చాట్‌బాట్ కేవలం సమాచార ప్రయోజనాల కోసం మాత్రమే. అత్యవసర పరిస్థితుల కోసం, 108కు డయల్ చేయండి."
    }
  };

  const quickQuestions = [
    { 
      text: "I have fever, what should I do?", 
      telugu: "నాకు జ్వరం వచ్చింది, ఏమి చేయాలి?", 
      icon: Thermometer 
    },
    { 
      text: "Child health tips", 
      telugu: "పిల్లల ఆరోగ్య చిట్కాలు", 
      icon: Baby 
    },
    { 
      text: "Medicine reminder help", 
      telugu: "మందుల గుర్తుగా సహాయం", 
      icon: Pill 
    }
  ];

  const chatT = (key: string) => {
    const translation = chatbotTranslations[key];
    return translation ? (language === 'te' ? translation.te : translation.en) : key;
  };

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
    if (msg.includes('fever') || msg.includes('జ్వరం')) {
      return language === 'te' 
        ? 'ద్రవ పదార్థాలు తాగండి, విశ్రాంతి తీసుకోండి మరియు అవసరమైతే పారాసిటమాల్ తీసుకోండి।'
        : 'Drink fluids, rest, and take paracetamol if needed.';
    }
    if (msg.includes('child') || msg.includes('పిల్లల')) {
      return language === 'te'
        ? 'పిల్లలకు క్రమ వ్యాధిప్రతిరోధక టీకాలు మరియు పరిశుభ్రతను నిర్ధారించండి।'
        : 'Ensure regular vaccinations and hygiene for children.';
    }
    if (msg.includes('medicine') || msg.includes('మందు')) {
      return language === 'te'
        ? 'మందులను క్రమం తప్పకుండా తీసుకోవడానికి రిమైండర్లను సెట్ చేయండి। దాన్ని సెట్ చేయడంలో మీకు సహాయం కావాలా?'
        : 'Set reminders to take medicine regularly. Would you like help setting that?';
    }
    return language === 'te'
      ? 'దయచేసి మీ ఆరోగ్య సమస్యను మరింత స్పష్టంగా వివరించండి।'
      : 'Please describe your health concern more clearly.';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      <header className="bg-white border-b p-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link to="/home">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <h1 className="text-xl font-bold text-gray-800">{chatT('ruralHealthAssistant')}</h1>
        </div>
        <Button 
          onClick={toggleLanguage}
          className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2"
        >
          <Globe className="w-4 h-4" />
          {t('language', commonTranslations)}
        </Button>
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
            <CardTitle className="text-sm">{chatT('quickHealthQuestions')}</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-2">
            {quickQuestions.map((q, i) => (
              <Button
                key={i}
                variant="outline"
                onClick={() => setInputMessage(language === 'te' ? q.telugu : q.text)}
              >
                <q.icon className="w-4 h-4 mr-2" />
                {language === 'te' ? q.telugu : q.text}
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
              placeholder={chatT('typePlaceholder')}
              className="flex-1"
            />
            <Button onClick={handleSendMessage} disabled={!inputMessage.trim()}>
              <Send className="w-4 h-4" />
            </Button>
          </CardContent>
        </Card>

        <p className="text-center text-xs text-gray-500 mt-2">
          {chatT('emergencyNotice')}
        </p>
      </main>
    </div>
  );
};

export default Chatbot;
