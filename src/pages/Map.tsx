
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Clock, Phone, Navigation, Star, Calendar, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { telanganaHospitals, telanganaDistricts } from '@/data/telanganaData';
import HospitalMap from '@/components/HospitalMap';
import HospitalList from '@/components/HospitalList';
import { useLanguage } from '@/contexts/LanguageContext';
import { mapTranslations, commonTranslations } from '@/data/translations';

const Map = () => {
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const { t } = useLanguage();

  const filteredHospitals = telanganaHospitals.filter(hospital => 
    (selectedDistrict === '' || selectedDistrict === 'all-districts' || hospital.district === selectedDistrict) &&
    (selectedType === '' || selectedType === 'all-types' || hospital.type === selectedType)
  );

  const handleHospitalSelect = (hospital) => {
    setSelectedHospital(hospital);
    setSelectedLocation(null);
  };

  const handleLocationClick = (lat, lng, address) => {
    setSelectedLocation({ lat, lng, address });
    setSelectedHospital(null);
    console.log('Location selected:', lat, lng, address);
  };

  const openInGoogleMaps = (lat, lng) => {
    window.open(`https://www.google.com/maps?q=${lat},${lng}`, '_blank');
  };

  const getDirections = (lat, lng) => {
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      <header className="bg-white shadow-sm border-b border-blue-100">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center space-x-4">
            <Link to="/home">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">{t('telanganaHospitalsMap', mapTranslations)}</h1>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <Card className="healthcare-card mb-6">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Select value={selectedDistrict} onValueChange={setSelectedDistrict}>
                <SelectTrigger className="h-12 border-2 border-blue-100">
                  <SelectValue placeholder={t('selectDistrict', mapTranslations)} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-districts">{t('allDistricts', mapTranslations)}</SelectItem>
                  {telanganaDistricts.map(district => (
                    <SelectItem key={district} value={district}>{district}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger className="h-12 border-2 border-blue-100">
                  <SelectValue placeholder={t('hospitalType', mapTranslations)} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-types">{t('allTypes', mapTranslations)}</SelectItem>
                  <SelectItem value="Government">{t('government', mapTranslations)}</SelectItem>
                  <SelectItem value="Private">{t('private', mapTranslations)}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <HospitalMap 
            hospitals={filteredHospitals} 
            onHospitalSelect={handleHospitalSelect}
            onLocationClick={handleLocationClick}
          />
          <HospitalList 
            hospitals={filteredHospitals}
            selectedHospital={selectedHospital}
            onHospitalSelect={handleHospitalSelect}
          />
        </div>

        {selectedHospital && (
          <Card className="healthcare-card mt-8">
            <CardHeader>
              <CardTitle className="text-xl text-gray-900">
                {selectedHospital.name} - {t('detailedInformation', mapTranslations)}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">{t('contactInformation', commonTranslations)}</h4>
                  <p className="text-gray-600 mb-2"><strong>{t('address', mapTranslations)}:</strong> {selectedHospital.address}</p>
                  <p className="text-gray-600 mb-2"><strong>{t('district', commonTranslations)}:</strong> {selectedHospital.district}</p>
                  <p className="text-gray-600 mb-2"><strong>{t('phone', mapTranslations)}:</strong> {selectedHospital.phone}</p>
                  <p className="text-gray-600 mb-2"><strong>{t('hours', mapTranslations)}:</strong> {selectedHospital.hours}</p>
                  <p className="text-gray-600"><strong>{t('type', mapTranslations)}:</strong> {selectedHospital.type} {t('hospital', commonTranslations)}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">{t('availableSpecialties', mapTranslations)}</h4>
                  <div className="space-y-2">
                    {selectedHospital.specialties.map((specialty, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-gray-700">{specialty}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link to="/appointment" state={{ hospital: selectedHospital }}>
                  <Button className="button-primary">
                    <Calendar className="w-4 h-4 mr-2" />
                    {t('bookAppointment', commonTranslations)}
                  </Button>
                </Link>
                <Link to="/doctors" state={{ hospital: selectedHospital }}>
                  <Button className="button-secondary">
                    {t('findDoctors', commonTranslations)}
                  </Button>
                </Link>
                <Button 
                  className="button-secondary"
                  onClick={() => getDirections(selectedHospital.latitude, selectedHospital.longitude)}
                >
                  <Navigation className="w-4 h-4 mr-2" />
                  {t('getDirections', mapTranslations)}
                </Button>
                <Button 
                  className="button-secondary"
                  onClick={() => openInGoogleMaps(selectedHospital.latitude, selectedHospital.longitude)}
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  {t('openInMaps', mapTranslations)}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {selectedLocation && (
          <Card className="healthcare-card mt-8">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MapPin className="w-5 h-5 text-blue-600" />
                <span className="text-xl text-gray-900">{t('selectedLocationDetails', mapTranslations)}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">{t('locationInformation', mapTranslations)}</h4>
                  {selectedLocation.address && (
                    <p className="text-gray-600 mb-2"><strong>{t('address', mapTranslations)}:</strong> {selectedLocation.address}</p>
                  )}
                  <p className="text-gray-600 mb-2"><strong>{t('latitude', mapTranslations)}:</strong> {selectedLocation.lat.toFixed(6)}</p>
                  <p className="text-gray-600 mb-2"><strong>{t('longitude', mapTranslations)}:</strong> {selectedLocation.lng.toFixed(6)}</p>
                  <p className="text-gray-600 mb-2"><strong>{t('coordinates', mapTranslations)}:</strong> {selectedLocation.lat.toFixed(6)}, {selectedLocation.lng.toFixed(6)}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">{t('availableActions', mapTranslations)}</h4>
                  <div className="space-y-3">
                    <Button 
                      className="button-secondary w-full"
                      onClick={() => getDirections(selectedLocation.lat, selectedLocation.lng)}
                    >
                      <Navigation className="w-4 h-4 mr-2" />
                      {t('getDirectionsToLocation', mapTranslations)}
                    </Button>
                    <Button 
                      className="button-secondary w-full"
                      onClick={() => openInGoogleMaps(selectedLocation.lat, selectedLocation.lng)}
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      {t('openInGoogleMaps', mapTranslations)}
                    </Button>
                    <Button className="button-secondary w-full">
                      <MapPin className="w-4 h-4 mr-2" />
                      {t('findNearbyHospitals', mapTranslations)}
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Map;
