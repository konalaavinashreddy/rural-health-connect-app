
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Pill, Plus, Clock, Bell, Volume2, Trash2, Info, IndianRupee } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
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
      sideEffects: ['Nausea', 'Stomach upset']
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
      sideEffects: ['Swelling of feet', 'Dizziness']
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
      sideEffects: ['Heart palpitations if overdosed']
    }
  ]);

  const [testingSound, setTestingSound] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('Telugu');

  const handleTestSound = () => {
    setTestingSound(true);
    const message = selectedLanguage === 'Telugu' 
      ? 'మందు తీసుకోవాల్సిన సమయం వచ్చింది (Medicine time reminder)'
      : 'It\'s time to take your medicine';
    
    // Simulate voice reminder
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(message);
      utterance.lang = selectedLanguage === 'Telugu' ? 'te-IN' : 'en-US';
      speechSynthesis.speak(utterance);
    }
    
    setTimeout(() => setTestingSound(false), 3000);
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
              <h1 className="text-2xl font-bold text-gray-900">Medicine Reminders (మందుల రిమైండర్లు)</h1>
            </div>
            <Button className="button-primary">
              <Plus className="w-4 h-4 mr-2" />
              Add Medicine
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* My Medications */}
        <Card className="healthcare-card mb-6">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Pill className="w-6 h-6 text-green-500" />
              <span>My Medications (నా మందులు)</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {medicines.map((medicine) => (
                <div key={medicine.id} className="border border-gray-200 rounded-lg p-6 bg-white">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg text-gray-900 mb-1">{medicine.name}</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                        <div>
                          <p className="text-blue-600 font-medium">{medicine.dosage}</p>
                          <p className="text-sm text-gray-600">For: {medicine.condition}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <IndianRupee className="w-4 h-4 text-green-600" />
                          <span className="text-sm text-green-600 font-medium">{medicine.price}</span>
                        </div>
                      </div>
                      
                      <div className="mb-3">
                        <div className="flex items-center space-x-2 mb-2">
                          <Clock className="w-4 h-4 text-gray-500" />
                          <span className="text-sm font-medium text-gray-700">Timing:</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {medicine.timing.map((time, index) => (
                            <span key={index} className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full">
                              {time}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="mb-3 p-3 bg-yellow-50 rounded-lg">
                        <div className="flex items-start space-x-2">
                          <Info className="w-4 h-4 text-yellow-600 mt-0.5" />
                          <div>
                            <p className="text-sm font-medium text-yellow-800">Instructions:</p>
                            <p className="text-sm text-yellow-700">{medicine.instructions}</p>
                          </div>
                        </div>
                      </div>

                      {medicine.sideEffects && medicine.sideEffects.length > 0 && (
                        <div className="mb-4">
                          <p className="text-sm font-medium text-gray-700 mb-1">Side Effects:</p>
                          <div className="flex flex-wrap gap-1">
                            {medicine.sideEffects.map((effect, index) => (
                              <span key={index} className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded">
                                {effect}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteMedicine(medicine.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <Volume2 className="w-4 h-4 text-blue-500" />
                        <span className="text-sm font-medium">Voice Reminder (వాయిస్ రిమైండర్)</span>
                      </div>
                      <Switch
                        checked={medicine.voiceReminder}
                        onCheckedChange={() => toggleReminder(medicine.id, 'voice')}
                      />
                    </div>

                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <Bell className="w-4 h-4 text-green-500" />
                        <span className="text-sm font-medium">SMS Reminder</span>
                      </div>
                      <Switch
                        checked={medicine.smsReminder}
                        onCheckedChange={() => toggleReminder(medicine.id, 'sms')}
                      />
                    </div>

                    <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <Bell className="w-4 h-4 text-purple-500" />
                        <span className="text-sm font-medium">Push Notification</span>
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

        {/* Available Medicines in Telangana */}
        <Card className="healthcare-card mb-6">
          <CardHeader>
            <CardTitle>Common Medicines Available in Telangana (తెలంగాణలో లభించే సాధారణ మందులు)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {telanganaMedicines.map((medicine) => (
                <div key={medicine.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <h4 className="font-semibold text-gray-900 mb-1">{medicine.name}</h4>
                  <p className="text-sm text-gray-600 mb-2">{medicine.genericName}</p>
                  <p className="text-blue-600 font-medium mb-2">{medicine.dosage}</p>
                  <p className="text-sm text-gray-600 mb-2">For: {medicine.condition}</p>
                  <p className="text-green-600 font-medium text-sm">{medicine.price}</p>
                  <Button size="sm" className="button-secondary w-full mt-3">
                    <Plus className="w-3 h-3 mr-1" />
                    Add to My List
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Reminder Settings */}
        <Card className="healthcare-card">
          <CardHeader>
            <CardTitle>Reminder Settings (రిమైండర్ సెట్టింగ్‌లు)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <h3 className="font-medium text-gray-900 mb-4">Voice Language (వాయిస్ భాష)</h3>
                <div className="grid grid-cols-2 gap-4">
                  <Button 
                    variant={selectedLanguage === 'Telugu' ? 'default' : 'outline'}
                    className="h-12"
                    onClick={() => setSelectedLanguage('Telugu')}
                  >
                    తెలుగు (Telugu)
                  </Button>
                  <Button 
                    variant={selectedLanguage === 'English' ? 'default' : 'outline'}
                    className="h-12"
                    onClick={() => setSelectedLanguage('English')}
                  >
                    English
                  </Button>
                </div>
              </div>

              <div>
                <h3 className="font-medium text-gray-900 mb-2">Test Reminder Sound</h3>
                <Button
                  onClick={handleTestSound}
                  disabled={testingSound}
                  className="button-secondary"
                >
                  <Volume2 className="w-4 h-4 mr-2" />
                  {testingSound ? 'Playing...' : `Test ${selectedLanguage} Reminder`}
                </Button>
                <p className="text-sm text-gray-600 mt-2">
                  Test message: {selectedLanguage === 'Telugu' 
                    ? 'మందు తీసుకోవాల్సిన సమయం వచ్చింది' 
                    : 'It\'s time to take your medicine'}
                </p>
              </div>

              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                <h4 className="font-medium text-orange-800 mb-2">Important Health Information (ముఖ్యమైన ఆరోగ్య సమాచారం)</h4>
                <ul className="text-sm text-orange-700 space-y-1">
                  <li>• Always consult your doctor before starting any medication</li>
                  <li>• డాక్టర్ సలహా లేకుండా ఏ మందు అయినా వాడకండి</li>
                  <li>• Keep medicines away from children and direct sunlight</li>
                  <li>• మందులను పిల్లలకు దూరంగా, నేరుగా సూర్యకాంతి రాని చోట ఉంచండి</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Medicines;
