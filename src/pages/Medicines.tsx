
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Pill, Plus, Clock, Bell, Volume2, Trash2, Info, IndianRupee, Mic, MicOff, Heart, Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { telanganaMedicines } from '@/data/telanganaData';

const Medicines = () => {
  const [medicines, setMedicines] = useState([
    {
      id: 1,
      name: 'Metformin (మెట్‌ఫార్మిన్)',
      dosage: '500mg',
      timing: ['Morning 8:00 AM', 'Evening 8:00 PM'],
      condition: 'Diabetes Type 2',
      instructions: 'తిన్న తర్వాత తీసుకోండి (Take after meals)',
      voiceReminder: true,
      smsReminder: false,
      pushReminder: true,
      price: '₹45 per 30 tablets',
      sideEffects: ['Nausea', 'Stomach upset'],
      nextDue: '2 hours',
      taken: 15,
      total: 30,
      teluguInstructions: 'రోజుకు రెండుసార్లు, ఆహారం తర్వాత తీసుకోండి. మీ రక్తంలో చక్కెర తగ్గిస్తుంది.',
      teluguName: 'మెట్‌ఫార్మిన్'
    },
    {
      id: 2,
      name: 'Amlodipine (అమ్లోడిపైన్)',
      dosage: '5mg',
      timing: ['Morning 7:00 AM'],
      condition: 'High Blood Pressure',
      instructions: 'రోజుకు ఒకసారి, ఖాళీ కడుపుతో (Once daily, empty stomach)',
      voiceReminder: true,
      smsReminder: true,
      pushReminder: true,
      price: '₹32 per 30 tablets',
      sideEffects: ['Swelling of feet', 'Dizziness'],
      nextDue: '6 hours',
      taken: 22,
      total: 30,
      teluguInstructions: 'రోజుకు ఒకసారి ఉదయం ఖాళీ కడుపుతో తీసుకోండి. మీ రక్తపోటు నియంత్రిస్తుంది.',
      teluguName: 'అమ్లోడిపైన్'
    },
    {
      id: 3,
      name: 'Thyronorm (థైరోనార్మ్)',
      dosage: '75mcg',
      timing: ['Morning 6:00 AM (Empty stomach)'],
      condition: 'Hypothyroidism',
      instructions: 'ఖాళీ కడుపుతో, నీటితో (Empty stomach with water)',
      voiceReminder: true,
      smsReminder: false,
      pushReminder: true,
      price: '₹52 per 120 tablets',
      sideEffects: ['Heart palpitations if overdosed'],
      nextDue: '14 hours',
      taken: 45,
      total: 120,
      teluguInstructions: 'ఉదయం లేచిన వెంటనే ఖాళీ కడుపుతో నీటితో తీసుకోండి. థైరాయిడ్ గ్రంధి పనితనం మెరుగుపరుస్తుంది.',
      teluguName: 'థైరోనార్మ్'
    }
  ]);

  const [testingSound, setTestingSound] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('Telugu');
  const [isListening, setIsListening] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update current time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  // Enhanced Telugu voice synthesis with better pronunciation
  const speakTelugu = (text: string, medicine?: any) => {
    if ('speechSynthesis' in window) {
      // Cancel any ongoing speech
      speechSynthesis.cancel();
      
      // Create Telugu message
      let teluguMessage = '';
      if (medicine) {
        teluguMessage = `మందు తీసుకోవాల్సిన సమయం వచ్చింది. ${medicine.teluguName} మందు తీసుకోండి. ${medicine.teluguInstructions}`;
      } else {
        teluguMessage = text;
      }
      
      const utterance = new SpeechSynthesisUtterance(teluguMessage);
      
      // Enhanced Telugu voice settings
      utterance.lang = 'te-IN';
      utterance.rate = 0.8; // Slower for better comprehension
      utterance.pitch = 1.1; // Slightly higher pitch
      utterance.volume = 1.0;
      
      // Fallback to Hindi if Telugu not available
      utterance.onerror = () => {
        const hindiUtterance = new SpeechSynthesisUtterance(teluguMessage);
        hindiUtterance.lang = 'hi-IN';
        hindiUtterance.rate = 0.8;
        speechSynthesis.speak(hindiUtterance);
      };
      
      speechSynthesis.speak(utterance);
      
      // Visual feedback
      setTestingSound(true);
      setTimeout(() => setTestingSound(false), 4000);
    }
  };

  const handleTestSound = (medicine?: any) => {
    if (selectedLanguage === 'Telugu') {
      speakTelugu('మందు తీసుకోవాల్సిన సమయం వచ్చింది. ఆరోగ్యంగా ఉండండి.', medicine);
    } else {
      const message = 'It\'s time to take your medicine. Stay healthy.';
      const utterance = new SpeechSynthesisUtterance(message);
      utterance.lang = 'en-US';
      speechSynthesis.speak(utterance);
      setTestingSound(true);
      setTimeout(() => setTestingSound(false), 3000);
    }
  };

  const toggleReminder = (id: number, type: 'voice' | 'sms' | 'push') => {
    setMedicines(medicines.map(med => {
      if (med.id === id) {
        return {
          ...med,
          [`${type}Reminder`]: !med[`${type}Reminder`]
        };
      }
      return med;
    }));
  };

  const deleteMedicine = (id: number) => {
    setMedicines(medicines.filter(med => med.id !== id));
  };

  const markAsTaken = (id: number) => {
    setMedicines(medicines.map(med => {
      if (med.id === id) {
        return {
          ...med,
          taken: Math.min(med.taken + 1, med.total)
        };
      }
      return med;
    }));
  };

  const getTimeIcon = () => {
    const hour = currentTime.getHours();
    if (hour >= 6 && hour < 18) {
      return <Sun className="w-5 h-5 text-yellow-500" />;
    }
    return <Moon className="w-5 h-5 text-blue-400" />;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-yellow-50">
      {/* Rural-friendly header with nature colors */}
      <header className="bg-gradient-to-r from-green-600 to-blue-600 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to="/">
                <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
                  <ArrowLeft className="w-5 h-5" />
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-white">మందుల రిమైండర్లు</h1>
                <p className="text-green-100 text-sm">Medicine Reminders</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              {getTimeIcon()}
              <span className="text-white font-medium">
                {currentTime.toLocaleTimeString('en-IN', { 
                  hour: '2-digit', 
                  minute: '2-digit',
                  hour12: true 
                })}
              </span>
              <Button className="bg-white text-green-600 hover:bg-gray-100 font-semibold">
                <Plus className="w-4 h-4 mr-2" />
                కొత్త మందు (Add Medicine)
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Today's Schedule - Rural friendly design */}
        <Card className="mb-8 bg-gradient-to-r from-orange-100 to-yellow-100 border-2 border-orange-200 shadow-xl">
          <CardHeader className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white rounded-t-lg">
            <CardTitle className="flex items-center space-x-3">
              <Clock className="w-8 h-8" />
              <div>
                <span className="text-2xl">నేటి మందుల షెడ్యూల్</span>
                <p className="text-orange-100 text-sm font-normal">Today's Medicine Schedule</p>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {medicines.map((medicine) => (
                <div key={medicine.id} className="bg-white rounded-xl p-4 border-2 border-orange-200 shadow-lg hover:shadow-xl transition-all">
                  <div className="flex items-center justify-between mb-3">
                    <Badge variant="outline" className="bg-green-100 text-green-700 border-green-300 text-sm px-3 py-1">
                      Next: {medicine.nextDue}
                    </Badge>
                    <Button
                      size="sm"
                      onClick={() => handleTestSound(medicine)}
                      className="bg-blue-500 hover:bg-blue-600 text-white p-2"
                      disabled={testingSound}
                    >
                      {testingSound ? <Volume2 className="w-4 h-4 animate-pulse" /> : <Volume2 className="w-4 h-4" />}
                    </Button>
                  </div>
                  <h3 className="font-bold text-lg text-gray-800 mb-2">{medicine.teluguName}</h3>
                  <p className="text-gray-600 text-sm mb-3">{medicine.dosage} - {medicine.condition}</p>
                  
                  {/* Progress indicator */}
                  <div className="mb-3">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">తీసుకున్నవి (Taken)</span>
                      <span className="font-semibold text-blue-600">{medicine.taken}/{medicine.total}</span>
                    </div>
                    <Progress 
                      value={(medicine.taken / medicine.total) * 100} 
                      className="h-3 bg-gray-200"
                    />
                  </div>
                  
                  <Button
                    onClick={() => markAsTaken(medicine.id)}
                    className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2"
                  >
                    <Heart className="w-4 h-4 mr-2" />
                    తీసుకున్నాను (Mark as Taken)
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* My Medications with enhanced rural design */}
        <Card className="healthcare-card mb-8 border-2 border-blue-200 shadow-xl">
          <CardHeader className="bg-gradient-to-r from-blue-500 to-green-500 text-white rounded-t-lg">
            <CardTitle className="flex items-center space-x-3">
              <Pill className="w-8 h-8" />
              <div>
                <span className="text-2xl">నా మందులు</span>
                <p className="text-blue-100 text-sm font-normal">My Medications</p>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-8">
              {medicines.map((medicine) => (
                <div key={medicine.id} className="bg-gradient-to-r from-white to-blue-50 border-2 border-blue-200 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all">
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="bg-blue-500 text-white p-3 rounded-full">
                          <Pill className="w-6 h-6" />
                        </div>
                        <div>
                          <h3 className="font-bold text-xl text-gray-900">{medicine.name}</h3>
                          <p className="text-blue-600 font-semibold text-lg">{medicine.dosage}</p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div className="bg-white p-4 rounded-lg border-2 border-gray-200">
                          <p className="text-sm text-gray-600 mb-1">లక్షణం (Condition):</p>
                          <p className="font-semibold text-gray-800">{medicine.condition}</p>
                          <div className="flex items-center space-x-2 mt-2">
                            <IndianRupee className="w-4 h-4 text-green-600" />
                            <span className="text-green-600 font-semibold">{medicine.price}</span>
                          </div>
                        </div>
                        
                        <div className="bg-white p-4 rounded-lg border-2 border-gray-200">
                          <div className="flex items-center space-x-2 mb-2">
                            <Clock className="w-5 h-5 text-orange-500" />
                            <span className="font-semibold text-gray-700">సమయం (Timing):</span>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {medicine.timing.map((time, index) => (
                              <Badge key={index} className="bg-orange-100 text-orange-700 border-orange-300 px-3 py-1">
                                {time}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Telugu Instructions - Enhanced */}
                      <div className="mb-6 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-200 rounded-lg">
                        <div className="flex items-start space-x-3">
                          <Info className="w-6 h-6 text-yellow-600 mt-1" />
                          <div>
                            <p className="font-semibold text-yellow-800 mb-2">సూచనలు (Instructions):</p>
                            <p className="text-gray-700 text-lg leading-relaxed">{medicine.teluguInstructions}</p>
                            <p className="text-gray-600 text-sm mt-2 italic">{medicine.instructions}</p>
                          </div>
                        </div>
                      </div>

                      {medicine.sideEffects && medicine.sideEffects.length > 0 && (
                        <div className="mb-6 p-4 bg-red-50 border-2 border-red-200 rounded-lg">
                          <p className="font-semibold text-red-800 mb-2">దుష్ప్రభావాలు (Side Effects):</p>
                          <div className="flex flex-wrap gap-2">
                            {medicine.sideEffects.map((effect, index) => (
                              <Badge key={index} variant="destructive" className="px-3 py-1">
                                {effect}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex flex-col space-y-3">
                      <Button
                        onClick={() => handleTestSound(medicine)}
                        disabled={testingSound}
                        className="bg-purple-500 hover:bg-purple-600 text-white p-3"
                        size="sm"
                      >
                        {testingSound ? <Volume2 className="w-5 h-5 animate-pulse" /> : <Volume2 className="w-5 h-5" />}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteMedicine(medicine.id)}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50 p-3"
                      >
                        <Trash2 className="w-5 h-5" />
                      </Button>
                    </div>
                  </div>

                  {/* Reminder Settings - Enhanced */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-100 to-blue-200 rounded-lg border-2 border-blue-300">
                      <div className="flex items-center space-x-3">
                        <Volume2 className="w-6 h-6 text-blue-600" />
                        <div>
                          <span className="font-semibold text-blue-800">వాయిస్ రిమైండర్</span>
                          <p className="text-blue-600 text-xs">Voice Reminder</p>
                        </div>
                      </div>
                      <Switch
                        checked={medicine.voiceReminder}
                        onCheckedChange={() => toggleReminder(medicine.id, 'voice')}
                      />
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gradient-to-r from-green-100 to-green-200 rounded-lg border-2 border-green-300">
                      <div className="flex items-center space-x-3">
                        <Bell className="w-6 h-6 text-green-600" />
                        <div>
                          <span className="font-semibold text-green-800">SMS రిమైండర్</span>
                          <p className="text-green-600 text-xs">SMS Reminder</p>
                        </div>
                      </div>
                      <Switch
                        checked={medicine.smsReminder}
                        onCheckedChange={() => toggleReminder(medicine.id, 'sms')}
                      />
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-100 to-purple-200 rounded-lg border-2 border-purple-300">
                      <div className="flex items-center space-x-3">
                        <Bell className="w-6 h-6 text-purple-600" />
                        <div>
                          <span className="font-semibold text-purple-800">పుష్ నోటిఫికేషన్</span>
                          <p className="text-purple-600 text-xs">Push Notification</p>
                        </div>
                      </div>
                      <Switch
                        checked={medicine.pushReminder}
                        onCheckedChange={() => toggleReminder(medicine.id, 'push')}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Available Medicines */}
        <Card className="healthcare-card mb-8 border-2 border-green-200 shadow-xl">
          <CardHeader className="bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-t-lg">
            <CardTitle className="flex items-center space-x-3">
              <Pill className="w-8 h-8" />
              <div>
                <span className="text-2xl">తెలంగాణలో లభించే మందులు</span>
                <p className="text-green-100 text-sm font-normal">Available Medicines in Telangana</p>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {telanganaMedicines.map((medicine) => (
                <div key={medicine.id} className="bg-gradient-to-br from-white to-green-50 border-2 border-green-200 rounded-xl p-6 hover:shadow-xl transition-all hover:scale-105">
                  <div className="mb-4">
                    <h4 className="font-bold text-lg text-gray-900 mb-2">{medicine.name}</h4>
                    <p className="text-gray-600 text-sm mb-2">{medicine.genericName}</p>
                    <Badge className="bg-blue-100 text-blue-700 border-blue-300">{medicine.dosage}</Badge>
                  </div>
                  <p className="text-gray-700 mb-3">లక్షణం: {medicine.condition}</p>
                  <p className="text-green-600 font-bold text-lg mb-4">{medicine.price}</p>
                  <Button className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-semibold py-3">
                    <Plus className="w-4 h-4 mr-2" />
                    నా జాబితాకు జోడించు
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Enhanced Voice Settings */}
        <Card className="healthcare-card border-2 border-orange-200 shadow-xl">
          <CardHeader className="bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-t-lg">
            <CardTitle className="flex items-center space-x-3">
              <Mic className="w-8 h-8" />
              <div>
                <span className="text-2xl">వాయిస్ సెట్టింగ్‌లు</span>
                <p className="text-orange-100 text-sm font-normal">Voice Settings</p>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-8">
              <div>
                <h3 className="font-bold text-xl text-gray-900 mb-6">భాష ఎంపిక (Language Selection)</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Button 
                    variant={selectedLanguage === 'Telugu' ? 'default' : 'outline'}
                    className={`h-16 text-lg font-semibold border-2 ${
                      selectedLanguage === 'Telugu' 
                        ? 'bg-gradient-to-r from-blue-500 to-green-500 text-white border-blue-500' 
                        : 'border-blue-300 hover:bg-blue-50'
                    }`}
                    onClick={() => setSelectedLanguage('Telugu')}
                  >
                    <span className="text-2xl mr-3">🎭</span>
                    తెలుగు (Telugu)
                  </Button>
                  <Button 
                    variant={selectedLanguage === 'English' ? 'default' : 'outline'}
                    className={`h-16 text-lg font-semibold border-2 ${
                      selectedLanguage === 'English' 
                        ? 'bg-gradient-to-r from-blue-500 to-green-500 text-white border-blue-500' 
                        : 'border-blue-300 hover:bg-blue-50'
                    }`}
                    onClick={() => setSelectedLanguage('English')}
                  >
                    <span className="text-2xl mr-3">🗣️</span>
                    English
                  </Button>
                </div>
              </div>

              <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-200 rounded-xl p-6">
                <h3 className="font-bold text-lg text-gray-900 mb-4">వాయిస్ టెస్ట్ (Voice Test)</h3>
                <div className="flex flex-col sm:flex-row gap-4 items-center">
                  <Button
                    onClick={() => handleTestSound()}
                    disabled={testingSound}
                    className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-3 px-6 text-lg"
                  >
                    {testingSound ? (
                      <>
                        <Volume2 className="w-6 h-6 mr-3 animate-pulse" />
                        వినుతున్నాం... (Playing...)
                      </>
                    ) : (
                      <>
                        <Volume2 className="w-6 h-6 mr-3" />
                        {selectedLanguage} రిమైండర్ టెస్ట్ చేయండి
                      </>
                    )}
                  </Button>
                  <div className="text-center">
                    <p className="text-lg font-semibold text-gray-700">
                      టెస్ట్ మెసేజ్ (Test Message):
                    </p>
                    <p className="text-blue-600 font-bold text-lg">
                      {selectedLanguage === 'Telugu' 
                        ? 'మందు తీసుకోవాల్సిన సమయం వచ్చింది. ఆరోగ్యంగా ఉండండి.' 
                        : 'It\'s time to take your medicine. Stay healthy.'}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-red-50 to-orange-50 border-2 border-red-200 rounded-xl p-6">
                <h4 className="font-bold text-red-800 mb-4 text-xl flex items-center">
                  <Heart className="w-6 h-6 mr-3 text-red-500" />
                  ముఖ్యమైన ఆరోగ్య సమాచారం (Important Health Information)
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <ul className="text-red-700 space-y-3 text-lg">
                    <li className="flex items-start space-x-3">
                      <span className="text-red-500 font-bold">•</span>
                      <span>ఎల్లప్పుడూ వైద్యుడి సలహా తీసుకోండి</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <span className="text-red-500 font-bold">•</span>
                      <span>మందులను పిల్లలకు దూరంగా ఉంచండి</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <span className="text-red-500 font-bold">•</span>
                      <span>సూర్యకాంతి రాని చోట భద్రపరచండి</span>
                    </li>
                  </ul>
                  <ul className="text-red-700 space-y-3">
                    <li className="flex items-start space-x-3">
                      <span className="text-red-500 font-bold">•</span>
                      <span>Always consult your doctor</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <span className="text-red-500 font-bold">•</span>
                      <span>Keep medicines away from children</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <span className="text-red-500 font-bold">•</span>
                      <span>Store away from direct sunlight</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Medicines;
