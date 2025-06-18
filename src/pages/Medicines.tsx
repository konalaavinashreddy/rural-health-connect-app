
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Pill, Plus, Clock, Bell, Volume2, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';

const Medicines = () => {
  const [medicines, setMedicines] = useState([
    {
      id: 1,
      name: 'Amoxicillin',
      dosage: '500mg',
      timing: ['08:00 AM'],
      voiceReminder: true,
      smsReminder: false,
      pushReminder: true
    },
    {
      id: 2,
      name: 'Insulin Glargine',
      dosage: '25 Units',
      timing: ['Before Dinner 06:30 PM'],
      voiceReminder: true,
      smsReminder: true,
      pushReminder: true
    },
    {
      id: 3,
      name: 'Latanoprost Eye Drops',
      dosage: '1 drop, both eyes',
      timing: ['Night 08:00 PM'],
      voiceReminder: false,
      smsReminder: false,
      pushReminder: true
    }
  ]);

  const [testingSound, setTestingSound] = useState(false);

  const handleTestSound = () => {
    setTestingSound(true);
    setTimeout(() => setTestingSound(false), 2000);
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
              <h1 className="text-2xl font-bold text-gray-900">Medicine Reminders</h1>
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
              <span>My Medications</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {medicines.map((medicine) => (
                <div key={medicine.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-lg text-gray-900">{medicine.name}</h3>
                      <p className="text-blue-600">{medicine.dosage}</p>
                      <div className="flex items-center space-x-2 mt-2">
                        <Clock className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-600">{medicine.timing.join(', ')}</span>
                      </div>
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
                        <span className="text-sm font-medium">Voice Reminder</span>
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

        {/* Reminder Settings */}
        <Card className="healthcare-card">
          <CardHeader>
            <CardTitle>Reminder Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <h3 className="font-medium text-gray-900 mb-2">Voice Language</h3>
                <div className="grid grid-cols-2 gap-4">
                  <Button variant="outline" className="h-12">
                    Telugu
                  </Button>
                  <Button variant="outline" className="h-12">
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
                  {testingSound ? 'Playing...' : 'Test Reminder Sound'}
                </Button>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h4 className="font-medium text-yellow-800 mb-2">Important Reminder</h4>
                <p className="text-sm text-yellow-700">
                  Certainly! Please provide your location so I can find doctors near you. For better results, enable location services or manually enter your area details.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Medicines;
