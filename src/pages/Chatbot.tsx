
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Send, Mic, Bot, User, Heart, Thermometer, Baby, Pill } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Chatbot = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Namaste! I'm your Rural Health Assistant. I can help you with symptoms, first aid, finding doctors, and health guidance in Telugu and English. What health concern can I help you with today? \n\nనమస్కారం! నేను మీ గ్రామీణ ఆరోగ్య సహాయకుడను. లక్షణాలు, ప్రథమచికిత్స, వైద్యులను కనుగొనడం మరియు ఆరోగ్య మార్గదర్శకత్వంలో నేను మీకు సహాయం చేయగలను।",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('english');

  const quickQuestions = [
    {
      text: "I have fever, what should I do?",
      telugu: "నాకు జ్వరం వచ్చింది, ఏమి చేయాలి?",
      icon: Thermometer
    },
    {
      text: "Find a doctor near me",
      telugu: "నా దగ్గర వైద్యుడిని కనుగొనండి",
      icon: Heart
    },
    {
      text: "Child health tips",
      telugu: "పిల్లల ఆరోగ్య చిట్కాలు",
      icon: Baby
    },
    {
      text: "Medicine reminder help",
      telugu: "మందుల రిమైండర్ సహాయం",
      icon: Pill
    }
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
    
    if (message.includes('fever') || message.includes('జ్వరం')) {
      return "For fever management:\n\n🌡️ **Immediate Steps:**\n• Rest and drink plenty of fluids\n• Take paracetamol 650mg if fever above 100°F\n• Use cool cloth on forehead\n• Monitor temperature every 2 hours\n\n⚠️ **Seek immediate medical help if:**\n• Fever above 103°F (39.4°C)\n• Difficulty breathing\n• Severe headache or vomiting\n• Fever for more than 3 days\n\nWould you like me to help you find the nearest PHC or doctor?";
    } else if (message.includes('child') || message.includes('baby') || message.includes('పిల్లల')) {
      return "**Child Health Guidelines:**\n\n👶 **For Infants (0-1 year):**\n• Exclusive breastfeeding for 6 months\n• Regular vaccination schedule\n• Monitor weight gain monthly\n\n🧒 **For Toddlers (1-3 years):**\n• Balanced diet with iron-rich foods\n• Proper hygiene practices\n• Regular growth monitoring\n\n**Warning Signs - Visit doctor immediately:**\n• High fever, difficulty breathing\n• Persistent vomiting or diarrhea\n• Unusual lethargy or irritability\n\nNeed specific child health information or want to find a pediatrician?";
    } else if (message.includes('doctor') || message.includes('find') || message.includes('వైద్యుడు')) {
      return "I can help you find the right healthcare provider! 🏥\n\n**Available Options:**\n• General Physicians - For common health issues\n• Specialists - Heart, diabetes, women's health\n• Emergency Care - 24/7 services\n• PHC Centers - Primary healthcare in your area\n\n**To find the best match:**\n1. Tell me your symptoms or health concern\n2. Your preferred location\n3. Any urgency level\n\nOr click here to browse all doctors: Would you like me to help you book an appointment?";
    } else if (message.includes('medicine') || message.includes('reminder') || message.includes('మందు')) {
      return "**Medicine Management Help:** 💊\n\n**Setting up reminders:**\n• Add medicine name and timing\n• Set frequency (daily, twice, etc.)\n• Enable notifications\n\n**Taking medicines safely:**\n• Follow prescribed dosage exactly\n• Take with/without food as instructed\n• Complete full course even if feeling better\n\n**Common mistakes to avoid:**\n• Don't share medicines with others\n• Don't stop suddenly without consulting doctor\n• Check expiry dates regularly\n\nWould you like me to help you set up medicine reminders or need guidance about a specific medication?";
    } else if (message.includes('emergency') || message.includes('urgent') || message.includes('pain')) {
      return "🚨 **Emergency Health Guidance:**\n\n**Call 108 immediately for:**\n• Chest pain or heart attack symptoms\n• Difficulty breathing\n• Severe bleeding\n• Unconsciousness\n• Severe allergic reactions\n\n**First Aid Tips:**\n• Keep patient calm and comfortable\n• Don't give food/water if unconscious\n• Apply pressure to stop bleeding\n• Keep airways clear\n\n**24/7 Emergency Contacts:**\n• Ambulance: 108\n• Medical Emergency: 102\n• Women Helpline: 181\n\nIs this a current emergency? Should I help you contact emergency services?";
    } else if (message.includes('pregnant') || message.includes('pregnancy') || message.includes('గర్భిణీ')) {
      return "**Pregnancy Care Guidance:** 🤱\n\n**Essential Care Steps:**\n• Regular antenatal checkups (monthly)\n• Take iron and folic acid tablets daily\n• Eat nutritious food - green vegetables, fruits\n• Avoid alcohol, smoking completely\n\n**Government Support Available:**\n• Free delivery at government hospitals\n• Mother & Child Care Kit (₹12,000 value)\n• Free medicines and checkups\n\n**Warning Signs - Contact doctor immediately:**\n• Heavy bleeding\n• Severe headaches\n• Decreased baby movements\n• High fever or severe vomiting\n\nWould you like information about government pregnancy schemes or finding an OB-GYN doctor?";
    } else {
      return "I understand you need health guidance. Let me help you better! 🏥\n\n**I can assist with:**\n• Symptom checking and first aid\n• Finding doctors and hospitals\n• Medicine information and reminders\n• Government health schemes\n• Pregnancy and child health\n• Emergency guidance\n\n**Please tell me:**\n1. Your specific health concern or symptoms\n2. How urgent is the situation?\n3. Any preferred language (English/Telugu)\n\nOr choose from the quick options below to get started.";
    }
  };

  const handleQuickQuestion = (question: any) => {
    const text = selectedLanguage === 'telugu' ? question.telugu : question.text;
    setInputMessage(text);
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
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">Rural Health Assistant</h1>
                  <p className="text-sm text-green-500">Online • గ్రామీణ ఆరోగ్య సహాయకుడు</p>
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
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${message.sender === 'user' ? 'bg-blue-500' : 'bg-gradient-to-r from-green-500 to-blue-500'}`}>
                      {message.sender === 'user' ? (
                        <User className="w-4 h-4 text-white" />
                      ) : (
                        <Heart className="w-4 h-4 text-white" />
                      )}
                    </div>
                    <div className={`rounded-lg p-4 ${message.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-900'}`}>
                      <p className="text-sm whitespace-pre-line">{message.text}</p>
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
            <CardTitle className="text-sm">Quick Health Questions</CardTitle>
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
                  <question.icon className="w-4 h-4 mr-2 flex-shrink-0" />
                  <span className="text-left">
                    {selectedLanguage === 'telugu' ? question.telugu : question.text}
                  </span>
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
                placeholder={selectedLanguage === 'telugu' ? "మీ ఆరోగ్య ప్రశ్న టైప్ చేయండి..." : "Type your health question here..."}
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
            <p className="text-xs text-gray-500 mt-2 text-center">
              ⚠️ This is AI guidance only. For emergencies, call 108. Always consult a doctor for serious conditions.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Chatbot;
