import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Download, MapPin, Pill, Clock, User, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { prescriptionsTranslations, commonTranslations } from '@/data/translations';

const Prescriptions = () => {
  const [activeTab, setActiveTab] = useState('current');
  const { t } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();

  // Get the return path from navigation state, default to home
  const returnTo = location.state?.returnTo || '/home';

  const handleBackClick = () => {
    navigate(returnTo);
  };

  const currentPrescriptions = [
    {
      id: 1,
      doctorName: 'Dr. Rajesh Kumar',
      date: '2024-06-18',
      medicines: [
        { name: 'Amoxicillin 500mg', dosage: '1 tablet', frequency: '3 times daily', duration: '7 days' },
        { name: 'Paracetamol 650mg', dosage: '1 tablet', frequency: 'When needed for fever', duration: '5 days' }
      ],
      hospital: 'NIMS Hospital',
      nextVisit: '2024-06-25'
    },
    {
      id: 2,
      doctorName: 'Dr. Priya Sharma',
      date: '2024-06-15',
      medicines: [
        { name: 'Iron Tablets', dosage: '1 tablet', frequency: 'Once daily after food', duration: '30 days' },
        { name: 'Folic Acid', dosage: '1 tablet', frequency: 'Once daily', duration: '30 days' }
      ],
      hospital: 'Apollo Hospital',
      nextVisit: '2024-07-15'
    }
  ];

  const nearbyPharmacies = [
    { name: 'Apollo Pharmacy', distance: '0.8 km', phone: '+91 98765 43210', address: 'Main Road, Hyderabad' },
    { name: 'Medplus', distance: '1.2 km', phone: '+91 98765 43211', address: 'Tank Bund, Hyderabad' },
    { name: 'Local Medical Store', distance: '0.5 km', phone: '+91 98765 43212', address: 'Old City, Hyderabad' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      <header className="bg-white shadow-sm border-b border-blue-100">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" onClick={handleBackClick}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-xl font-bold text-gray-900">{t('myPrescriptions', prescriptionsTranslations)}</h1>
              <p className="text-sm text-gray-600">నా ప్రిస్క్రిప్షన్లు</p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Tab Navigation */}
        <div className="flex space-x-1 mb-6 bg-gray-100 p-1 rounded-lg">
          <button
            onClick={() => setActiveTab('current')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'current' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600'
            }`}
          >
            {t('currentPrescriptions', prescriptionsTranslations)}
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'history' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600'
            }`}
          >
            {t('pastPrescriptions', prescriptionsTranslations)}
          </button>
        </div>

        {/* Current Prescriptions */}
        {activeTab === 'current' && (
          <div className="space-y-6">
            {currentPrescriptions.map((prescription) => (
              <Card key={prescription.id} className="healthcare-card">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{prescription.doctorName}</CardTitle>
                      <p className="text-sm text-gray-600">{prescription.hospital}</p>
                      <p className="text-sm text-blue-600">{t('prescribedOn', prescriptionsTranslations)}: {prescription.date}</p>
                    </div>
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      {t('download', prescriptionsTranslations)}
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                        <Pill className="w-4 h-4 mr-2 text-green-600" />
                        {t('prescribedMedicines', prescriptionsTranslations)}
                      </h4>
                      <div className="space-y-3">
                        {prescription.medicines.map((medicine, index) => (
                          <div key={index} className="bg-gray-50 p-3 rounded-lg">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                              <div>
                                <p className="font-medium text-gray-900">{medicine.name}</p>
                                <p className="text-sm text-gray-600">{t('dosage', prescriptionsTranslations)}: {medicine.dosage}</p>
                              </div>
                              <div>
                                <p className="text-sm text-gray-600">{t('frequency', prescriptionsTranslations)}: {medicine.frequency}</p>
                                <p className="text-sm text-gray-600">{t('duration', prescriptionsTranslations)}: {medicine.duration}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                      <div className="flex items-center text-sm text-gray-600">
                        <Clock className="w-4 h-4 mr-2" />
                        {t('nextVisit', prescriptionsTranslations)}: {prescription.nextVisit}
                      </div>
                      <Link to="/medicines">
                        <Button variant="outline" size="sm">
                          {t('setReminders', prescriptionsTranslations)}
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Nearby Pharmacies */}
        <Card className="healthcare-card mt-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <MapPin className="w-5 h-5 mr-2 text-green-600" />
              {t('nearbyPharmacies', prescriptionsTranslations)}
              <span className="ml-2 text-sm text-gray-600">దగ్గరి మందుల దుకాణాలు</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {nearbyPharmacies.map((pharmacy, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-900">{pharmacy.name}</h4>
                    <p className="text-sm text-gray-600">{pharmacy.address}</p>
                    <p className="text-sm text-blue-600">{pharmacy.distance} {t('away', prescriptionsTranslations)}</p>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Phone className="w-4 h-4 mr-1" />
                      {t('call', prescriptionsTranslations)}
                    </Button>
                    <Button variant="outline" size="sm">
                      <MapPin className="w-4 h-4 mr-1" />
                      {t('directions', prescriptionsTranslations)}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Prescriptions;
