
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Plus, Bell, Clock, Pill, Edit, Trash2, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const MedicineReminders = () => {
  const [reminders, setReminders] = useState([
    {
      id: 1,
      medicine: 'Amoxicillin 500mg',
      time: '08:00',
      frequency: 'Daily',
      taken: true,
      nextDose: '08:00 Tomorrow'
    },
    {
      id: 2,
      medicine: 'Paracetamol 650mg',
      time: '14:00',
      frequency: 'When needed',
      taken: false,
      nextDose: 'As needed'
    },
    {
      id: 3,
      medicine: 'Iron Tablets',
      time: '18:30',
      frequency: 'Daily',
      taken: false,
      nextDose: 'Today 18:30'
    }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newReminder, setNewReminder] = useState({
    medicine: '',
    time: '',
    frequency: 'Daily'
  });

  const markAsTaken = (id: number) => {
    setReminders(reminders.map(reminder => 
      reminder.id === id ? { ...reminder, taken: true } : reminder
    ));
  };

  const deleteReminder = (id: number) => {
    setReminders(reminders.filter(reminder => reminder.id !== id));
  };

  const addReminder = () => {
    if (newReminder.medicine && newReminder.time) {
      const newId = Math.max(...reminders.map(r => r.id)) + 1;
      setReminders([...reminders, {
        id: newId,
        medicine: newReminder.medicine,
        time: newReminder.time,
        frequency: newReminder.frequency,
        taken: false,
        nextDose: `Today ${newReminder.time}`
      }]);
      setNewReminder({ medicine: '', time: '', frequency: 'Daily' });
      setShowAddForm(false);
    }
  };

  const upcomingReminders = reminders.filter(r => !r.taken);
  const completedToday = reminders.filter(r => r.taken);

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
              <div>
                <h1 className="text-xl font-bold text-gray-900">Medicine Reminders</h1>
                <p className="text-sm text-gray-600">మందుల రిమైండర్లు</p>
              </div>
            </div>
            <Button onClick={() => setShowAddForm(true)} className="button-primary">
              <Plus className="w-4 h-4 mr-2" />
              Add Reminder
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Today's Summary */}
        <Card className="healthcare-card mb-6">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">{completedToday.length}</h3>
                <p className="text-gray-600">Completed Today</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Clock className="w-8 h-8 text-orange-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">{upcomingReminders.length}</h3>
                <p className="text-gray-600">Pending Today</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Bell className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">{reminders.length}</h3>
                <p className="text-gray-600">Total Reminders</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Add New Reminder Form */}
        {showAddForm && (
          <Card className="healthcare-card mb-6">
            <CardHeader>
              <CardTitle>Add New Reminder</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Medicine Name</label>
                  <Input
                    type="text"
                    placeholder="Enter medicine name..."
                    value={newReminder.medicine}
                    onChange={(e) => setNewReminder({...newReminder, medicine: e.target.value})}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Time</label>
                    <Input
                      type="time"
                      value={newReminder.time}
                      onChange={(e) => setNewReminder({...newReminder, time: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Frequency</label>
                    <select 
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={newReminder.frequency}
                      onChange={(e) => setNewReminder({...newReminder, frequency: e.target.value})}
                    >
                      <option value="Daily">Daily</option>
                      <option value="Twice Daily">Twice Daily</option>
                      <option value="Thrice Daily">Thrice Daily</option>
                      <option value="Weekly">Weekly</option>
                      <option value="When needed">When needed</option>
                    </select>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button onClick={addReminder} className="button-primary">
                    Add Reminder
                  </Button>
                  <Button variant="outline" onClick={() => setShowAddForm(false)}>
                    Cancel
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Upcoming Reminders */}
        <Card className="healthcare-card mb-6">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="w-5 h-5 mr-2 text-orange-600" />
              Upcoming Reminders
            </CardTitle>
          </CardHeader>
          <CardContent>
            {upcomingReminders.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No pending reminders for today!</p>
            ) : (
              <div className="space-y-3">
                {upcomingReminders.map((reminder) => (
                  <div key={reminder.id} className="flex items-center justify-between p-4 bg-orange-50 rounded-lg border border-orange-200">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                        <Pill className="w-5 h-5 text-orange-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{reminder.medicine}</h4>
                        <p className="text-sm text-gray-600">{reminder.time} • {reminder.frequency}</p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" onClick={() => markAsTaken(reminder.id)} className="bg-green-500 hover:bg-green-600">
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Taken
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => deleteReminder(reminder.id)}>
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Completed Today */}
        {completedToday.length > 0 && (
          <Card className="healthcare-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <CheckCircle className="w-5 h-5 mr-2 text-green-600" />
                Completed Today
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {completedToday.map((reminder) => (
                  <div key={reminder.id} className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{reminder.medicine}</h4>
                        <p className="text-sm text-gray-600">Taken at {reminder.time}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default MedicineReminders;
