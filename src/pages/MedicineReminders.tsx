
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowLeft, Plus, Bell, Clock, Pill, CheckCircle, Volume2, MessageSquare, Smartphone, Play, ShoppingCart, AlertTriangle, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';

const MedicineReminders = () => {
  const location = useLocation();
  const returnTo = location.state?.returnTo || '/';
  const autoEnableNotifications = location.state?.autoEnable || false;

  const [notifications, setNotifications] = useState({
    voice: false,
    sms: false,
    push: false
  });

  const [language, setLanguage] = useState('english');
  const [todaysMedicines] = useState([
    {
      id: 1,
      name: 'Metformin / మెట్‌ఫార్మిన్',
      dosage: '500mg',
      condition: 'Diabetes Type 2 / డయాబెటిస్ టైప్ 2',
      time: '08:00 AM',
      timeGroup: 'next2hours',
      taken: false,
      cost: '₹45 per 30 tablets',
      timings: ['Morning 8:00 AM', 'Evening 8:00 PM'],
      instructions: 'తిన్న తర్వాత తీసుకోండి (Take after meals)',
      sideEffects: ['Nausea', 'Stomach upset', 'వికారం', 'కడుపు నొప్పి']
    },
    {
      id: 2,
      name: 'Amlodipine / అమ్లోడిపైన్',
      dosage: '5mg',
      condition: 'High Blood Pressure / అధిక రక్తపోటు',
      time: '07:00 AM',
      timeGroup: 'next2hours',
      taken: true,
      cost: '₹32 per 30 tablets',
      timings: ['Morning 7:00 AM'],
      instructions: 'ఖాళీ కడుపుతో (Empty stomach)',
      sideEffects: ['Swelling of feet', 'Dizziness', 'కాళ్లు వాపు', 'తలదూరలు']
    },
    {
      id: 3,
      name: 'Thyronorm / థైరోనార్మ్',
      dosage: '50mcg',
      condition: 'Hypothyroid / హైపోథైరాయిడ్',
      time: '06:00 AM',
      timeGroup: 'next6hours',
      taken: false,
      cost: '₹28 per 30 tablets',
      timings: ['Early Morning 6:00 AM'],
      instructions: 'ఖాళీ కడుపుతో, 1 గంట తర్వాత భోజనం (Empty stomach, eat after 1 hour)',
      sideEffects: ['Heart palpitations', 'Nervousness', 'గుండె దడ', 'ఆందోళన']
    },
    {
      id: 4,
      name: 'Iron Tablets / ఐరన్ మాత్రలు',
      dosage: '100mg',
      condition: 'Anemia / రక్తహీనత',
      time: '06:30 PM',
      timeGroup: 'next14hours',
      taken: false,
      cost: '₹15 per 30 tablets',
      timings: ['Evening 6:30 PM'],
      instructions: 'భోజనం తర్వాత (After food)',
      sideEffects: ['Constipation', 'Dark stools', 'మలబద్దకం', 'నల్లని మలం']
    }
  ]);

  const [availableMedicines] = useState([
    { name: 'Metformin 500mg', price: '₹45', stock: 'In Stock' },
    { name: 'Amlodipine 5mg', price: '₹32', stock: 'In Stock' },
    { name: 'Paracetamol 650mg', price: '₹15', stock: 'In Stock' },
    { name: 'Thyronorm 50mcg', price: '₹28', stock: 'In Stock' },
    { name: 'Iron Tablets', price: '₹15', stock: 'Low Stock' },
    { name: 'Vitamin D3', price: '₹55', stock: 'In Stock' }
  ]);

  useEffect(() => {
    if (autoEnableNotifications) {
      setNotifications({
        voice: true,
        sms: true,
        push: true
      });
    }
  }, [autoEnableNotifications]);

  const markAsTaken = (id: number) => {
    // Update medicine status logic here
    console.log(`Medicine ${id} marked as taken`);
  };

  const toggleNotification = (type: string) => {
    setNotifications(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  const playTestVoice = () => {
    const message = language === 'telugu' 
      ? 'మీ మందు తీసుకోవాల్సిన సమయం వచ్చింది. మెట్‌ఫార్మిన్ 500mg తీసుకోండి.'
      : 'It is time to take your medicine. Please take Metformin 500mg.';
    
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(message);
      utterance.lang = language === 'telugu' ? 'te-IN' : 'en-US';
      speechSynthesis.speak(utterance);
    }
  };

  const groupedMedicines = {
    next2hours: todaysMedicines.filter(m => m.timeGroup === 'next2hours'),
    next6hours: todaysMedicines.filter(m => m.timeGroup === 'next6hours'),
    next14hours: todaysMedicines.filter(m => m.timeGroup === 'next14hours')
  };

  const takenCount = todaysMedicines.filter(m => m.taken).length;
  const pendingCount = todaysMedicines.filter(m => !m.taken).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-purple-50">
      <header className="bg-white shadow-sm border-b border-blue-100">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to={returnTo}>
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-5 h-5" />
                </Button>
              </Link>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Medicine Reminders</h1>
                <p className="text-sm text-gray-600">మందుల రిమైండర్లు</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-6 space-y-8">
        {/* Today's Summary */}
        <Card className="healthcare-card bg-gradient-to-r from-blue-500 to-purple-600 text-white">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <CheckCircle className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold">{takenCount}</h3>
                <p className="text-white/90">Completed Today</p>
                <p className="text-sm text-white/80">నేడు పూర్తయింది</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Clock className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold">{pendingCount}</h3>
                <p className="text-white/90">Pending Today</p>
                <p className="text-sm text-white/80">నేడు మిగిలినవి</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Bell className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold">{todaysMedicines.length}</h3>
                <p className="text-white/90">Total Reminders</p>
                <p className="text-sm text-white/80">మొత్తం రిమైండర్లు</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Today's Medicine Schedule */}
        <Card className="healthcare-card">
          <CardHeader>
            <CardTitle className="flex items-center text-2xl">
              <Clock className="w-6 h-6 mr-3 text-blue-600" />
              Today's Medicine Schedule / నేటి మందుల షెడ్యూల్
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* Next 2 Hours */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4 text-orange-600">
                Next 2 Hours / రాబోయే 2 గంటలు
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {groupedMedicines.next2hours.map((medicine) => (
                  <Card key={medicine.id} className={`p-4 border-l-4 ${medicine.taken ? 'border-green-500 bg-green-50' : 'border-orange-500 bg-orange-50'}`}>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Pill className={`w-6 h-6 ${medicine.taken ? 'text-green-600' : 'text-orange-600'}`} />
                        <span className="text-lg font-bold text-gray-800">{medicine.time}</span>
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900">{medicine.name}</h4>
                        <p className="text-sm text-gray-600">{medicine.dosage}</p>
                        <p className="text-sm text-blue-600">{medicine.condition}</p>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className={`text-sm font-medium ${medicine.taken ? 'text-green-600' : 'text-orange-600'}`}>
                          {medicine.taken ? '✅ Taken' : '❌ Not Taken'}
                        </span>
                        {!medicine.taken && (
                          <Button 
                            size="sm" 
                            onClick={() => markAsTaken(medicine.id)} 
                            className="bg-green-500 hover:bg-green-600 text-white"
                          >
                            Mark as Taken
                          </Button>
                        )}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Next 6 Hours */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4 text-blue-600">
                Next 6 Hours / రాబోయే 6 గంటలు
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {groupedMedicines.next6hours.map((medicine) => (
                  <Card key={medicine.id} className={`p-4 border-l-4 ${medicine.taken ? 'border-green-500 bg-green-50' : 'border-blue-500 bg-blue-50'}`}>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Pill className={`w-6 h-6 ${medicine.taken ? 'text-green-600' : 'text-blue-600'}`} />
                        <span className="text-lg font-bold text-gray-800">{medicine.time}</span>
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900">{medicine.name}</h4>
                        <p className="text-sm text-gray-600">{medicine.dosage}</p>
                        <p className="text-sm text-blue-600">{medicine.condition}</p>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className={`text-sm font-medium ${medicine.taken ? 'text-green-600' : 'text-blue-600'}`}>
                          {medicine.taken ? '✅ Taken' : '❌ Not Taken'}
                        </span>
                        {!medicine.taken && (
                          <Button 
                            size="sm" 
                            onClick={() => markAsTaken(medicine.id)} 
                            className="bg-green-500 hover:bg-green-600 text-white"
                          >
                            Mark as Taken
                          </Button>
                        )}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Next 14 Hours */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-purple-600">
                Later Today / ఈ రోజు తరువాత
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {groupedMedicines.next14hours.map((medicine) => (
                  <Card key={medicine.id} className={`p-4 border-l-4 ${medicine.taken ? 'border-green-500 bg-green-50' : 'border-purple-500 bg-purple-50'}`}>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Pill className={`w-6 h-6 ${medicine.taken ? 'text-green-600' : 'text-purple-600'}`} />
                        <span className="text-lg font-bold text-gray-800">{medicine.time}</span>
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900">{medicine.name}</h4>
                        <p className="text-sm text-gray-600">{medicine.dosage}</p>
                        <p className="text-sm text-blue-600">{medicine.condition}</p>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className={`text-sm font-medium ${medicine.taken ? 'text-green-600' : 'text-purple-600'}`}>
                          {medicine.taken ? '✅ Taken' : '❌ Not Taken'}
                        </span>
                        {!medicine.taken && (
                          <Button 
                            size="sm" 
                            onClick={() => markAsTaken(medicine.id)} 
                            className="bg-green-500 hover:bg-green-600 text-white"
                          >
                            Mark as Taken
                          </Button>
                        )}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* My Medications Section */}
        <Card className="healthcare-card">
          <CardHeader>
            <CardTitle className="flex items-center text-2xl">
              <Pill className="w-6 h-6 mr-3 text-green-600" />
              My Medications / నా మందులు
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {todaysMedicines.map((medicine) => (
                <Card key={medicine.id} className="p-6 border border-gray-200 hover:shadow-lg transition-shadow">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-bold text-gray-900">{medicine.name}</h3>
                      <span className="text-lg font-semibold text-green-600">{medicine.cost}</span>
                    </div>
                    
                    <div className="space-y-2">
                      <p><span className="font-semibold">Dosage:</span> {medicine.dosage}</p>
                      <p><span className="font-semibold">Condition:</span> {medicine.condition}</p>
                      <p><span className="font-semibold">Timings:</span> {medicine.timings.join(', ')}</p>
                    </div>

                    <div className="bg-blue-50 p-3 rounded-lg">
                      <p className="text-sm font-semibold text-blue-800 mb-1">Instructions / సూచనలు:</p>
                      <p className="text-sm text-blue-700">{medicine.instructions}</p>
                    </div>

                    <div className="bg-red-50 p-3 rounded-lg border-l-4 border-red-500">
                      <p className="text-sm font-semibold text-red-800 mb-1">
                        <AlertTriangle className="w-4 h-4 inline mr-1" />
                        Side Effects / దుష్ప్రభావాలు:
                      </p>
                      <p className="text-sm text-red-700">{medicine.sideEffects.join(', ')}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Notifications Panel */}
        <Card className="healthcare-card">
          <CardHeader>
            <CardTitle className="flex items-center text-2xl">
              <Bell className="w-6 h-6 mr-3 text-blue-600" />
              Notification Settings / నోటిఫికేషన్ సెట్టింగ్స్
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Volume2 className={`w-6 h-6 ${notifications.voice ? 'text-blue-600' : 'text-gray-400'}`} />
                  <div>
                    <p className="font-semibold">Voice Reminder</p>
                    <p className="text-sm text-gray-600">వాయిస్ రిమైండర్</p>
                  </div>
                </div>
                <Switch 
                  checked={notifications.voice}
                  onCheckedChange={() => toggleNotification('voice')}
                />
              </div>

              <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <MessageSquare className={`w-6 h-6 ${notifications.sms ? 'text-green-600' : 'text-gray-400'}`} />
                  <div>
                    <p className="font-semibold">SMS Reminder</p>
                    <p className="text-sm text-gray-600">SMS రిమైండర్</p>
                  </div>
                </div>
                <Switch 
                  checked={notifications.sms}
                  onCheckedChange={() => toggleNotification('sms')}
                />
              </div>

              <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Smartphone className={`w-6 h-6 ${notifications.push ? 'text-purple-600' : 'text-gray-400'}`} />
                  <div>
                    <p className="font-semibold">Push Notification</p>
                    <p className="text-sm text-gray-600">పుష్ నోటిఫికేషన్</p>
                  </div>
                </div>
                <Switch 
                  checked={notifications.push}
                  onCheckedChange={() => toggleNotification('push')}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Voice Settings */}
        <Card className="healthcare-card">
          <CardHeader>
            <CardTitle className="flex items-center text-2xl">
              <Volume2 className="w-6 h-6 mr-3 text-orange-600" />
              Voice Settings / వాయిస్ సెట్టింగ్స్
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Language / భాష
                  </label>
                  <div className="flex space-x-2">
                    <Button 
                      variant={language === 'english' ? 'default' : 'outline'}
                      onClick={() => setLanguage('english')}
                      className="flex-1"
                    >
                      English
                    </Button>
                    <Button 
                      variant={language === 'telugu' ? 'default' : 'outline'}
                      onClick={() => setLanguage('telugu')}
                      className="flex-1"
                    >
                      తెలుగు
                    </Button>
                  </div>
                </div>

                <Button 
                  onClick={playTestVoice}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white"
                >
                  <Play className="w-4 h-4 mr-2" />
                  Play Test Voice / టెస్ట్ వాయిస్ వినండి
                </Button>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Sample Message:</h4>
                <p className="text-sm text-gray-700">
                  {language === 'telugu' 
                    ? 'మీ మందు తీసుకోవాల్సిన సమయం వచ్చింది. మెట్‌ఫార్మిన్ 500mg తీసుకోండి.'
                    : 'It is time to take your medicine. Please take Metformin 500mg.'
                  }
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Available Medicines in Telangana */}
        <Card className="healthcare-card">
          <CardHeader>
            <CardTitle className="flex items-center text-2xl">
              <ShoppingCart className="w-6 h-6 mr-3 text-green-600" />
              Available Medicines in Telangana / తెలంగాణలో అందుబాటులో ఉన్న మందులు
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {availableMedicines.map((medicine, index) => (
                <Card key={index} className="p-4 border hover:shadow-lg transition-shadow">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Pill className="w-6 h-6 text-blue-600" />
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        medicine.stock === 'In Stock' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-orange-100 text-orange-800'
                      }`}>
                        {medicine.stock}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">{medicine.name}</h4>
                      <p className="text-lg font-semibold text-green-600">{medicine.price}</p>
                    </div>
                    <Button className="w-full bg-green-500 hover:bg-green-600 text-white">
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Buy Now
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Important Health Information */}
        <Card className="healthcare-card bg-red-50 border-red-200">
          <CardHeader>
            <CardTitle className="flex items-center text-2xl text-red-800">
              <Heart className="w-6 h-6 mr-3 text-red-600" />
              Important Health Information / ముఖ్యమైన ఆరోగ్య సమాచారం
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start space-x-3 p-3 bg-white rounded-lg border-l-4 border-red-500">
                  <AlertTriangle className="w-6 h-6 text-red-600 mt-1" />
                  <div>
                    <p className="font-semibold text-red-800">Always consult your doctor</p>
                    <p className="text-sm text-red-600">ఎల్లప్పుడూ మీ వైద్యుడిని సంప్రదించండి</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 p-3 bg-white rounded-lg border-l-4 border-red-500">
                  <AlertTriangle className="w-6 h-6 text-red-600 mt-1" />
                  <div>
                    <p className="font-semibold text-red-800">Keep medicines away from children</p>
                    <p className="text-sm text-red-600">మందులను పిల్లలకు దూరంగా ఉంచండి</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start space-x-3 p-3 bg-white rounded-lg border-l-4 border-red-500">
                  <AlertTriangle className="w-6 h-6 text-red-600 mt-1" />
                  <div>
                    <p className="font-semibold text-red-800">Avoid direct sunlight</p>
                    <p className="text-sm text-red-600">ప్రత్యక్ష సూర్యకాంతిని నివారించండి</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 p-3 bg-white rounded-lg border-l-4 border-red-500">
                  <AlertTriangle className="w-6 h-6 text-red-600 mt-1" />
                  <div>
                    <p className="font-semibold text-red-800">Don't skip doses</p>
                    <p className="text-sm text-red-600">డోస్‌లను వదిలేయవద్దు</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MedicineReminders;
