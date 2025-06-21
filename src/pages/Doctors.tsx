
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, Clock, Award, Filter, MapPin, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { telanganaDoctors, telanganaSpecialties, telanganaDistricts } from '@/data/telanganaData';
import { useLanguage } from '@/contexts/LanguageContext';
import { doctorsPageTranslations, commonTranslations } from '@/data/translations';

const Doctors = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const preSelectedHospital = location.state?.hospital;
  const urlSearchQuery = new URLSearchParams(location.search).get('search') || '';
  const stateSearchQuery = location.state?.searchQuery || '';
  const stateSpecialty = location.state?.specialty || '';
  const shouldClearSearch = location.state?.clearSearch || false;
  
  const [searchQuery, setSearchQuery] = useState(() => {
    if (shouldClearSearch) return '';
    return urlSearchQuery || stateSearchQuery;
  });
  const [selectedSpecialty, setSelectedSpecialty] = useState(stateSpecialty);
  const [selectedDistrict, setSelectedDistrict] = useState(preSelectedHospital?.district || '');

  // Update search query when URL parameters change
  useEffect(() => {
    const urlSearch = new URLSearchParams(location.search).get('search');
    if (urlSearch && !shouldClearSearch) {
      setSearchQuery(urlSearch);
    }
  }, [location.search, shouldClearSearch]);

  const filteredDoctors = telanganaDoctors.filter(doctor => 
    (searchQuery === '' || 
     doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
     doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
     doctor.hospital.toLowerCase().includes(searchQuery.toLowerCase()) ||
     doctor.district.toLowerCase().includes(searchQuery.toLowerCase())) &&
    (selectedSpecialty === '' || selectedSpecialty === 'all-specialties' || doctor.specialty === selectedSpecialty) &&
    (selectedDistrict === '' || selectedDistrict === 'all-districts' || doctor.district === selectedDistrict)
  );

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedSpecialty('');
    setSelectedDistrict('');
  };

  const handleDoctorCardClick = (doctorId: number) => {
    navigate(`/doctor/${doctorId.toString()}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-blue-100">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center space-x-4">
            <Link to="/home">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{t('telanganaDoctors', doctorsPageTranslations)}</h1>
              {selectedSpecialty && selectedSpecialty !== 'all-specialties' && (
                <p className="text-blue-600 text-sm">{t('showing', doctorsPageTranslations)}: {selectedSpecialty} {t('specialists', doctorsPageTranslations)}</p>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Search and Filters */}
        <Card className="healthcare-card mb-6">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Input
                  type="text"
                  placeholder={t('searchDoctorsHospitals', doctorsPageTranslations)}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-12 border-2 border-blue-100 focus:border-blue-300"
                />
              </div>
              <div>
                <Select value={selectedSpecialty} onValueChange={setSelectedSpecialty}>
                  <SelectTrigger className="h-12 border-2 border-blue-100 focus:border-blue-300">
                    <SelectValue placeholder={t('filterBySpecialty', doctorsPageTranslations)} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all-specialties">{t('allSpecialties', doctorsPageTranslations)}</SelectItem>
                    {telanganaSpecialties.map(specialty => (
                      <SelectItem key={specialty} value={specialty}>{specialty}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Select value={selectedDistrict} onValueChange={setSelectedDistrict}>
                  <SelectTrigger className="h-12 border-2 border-blue-100 focus:border-blue-300">
                    <SelectValue placeholder={t('filterByDistrict', doctorsPageTranslations)} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all-districts">{t('allDistricts', doctorsPageTranslations)}</SelectItem>
                    {telanganaDistricts.map(district => (
                      <SelectItem key={district} value={district}>{district}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            {/* Active Filters Display */}
            {(selectedSpecialty && selectedSpecialty !== 'all-specialties' || selectedDistrict && selectedDistrict !== 'all-districts' || searchQuery) && (
              <div className="mt-4 flex items-center gap-2 flex-wrap">
                <span className="text-sm text-gray-600">{t('activeFilters', doctorsPageTranslations)}</span>
                {selectedSpecialty && selectedSpecialty !== 'all-specialties' && (
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                    {selectedSpecialty}
                  </span>
                )}
                {selectedDistrict && selectedDistrict !== 'all-districts' && (
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                    {selectedDistrict}
                  </span>
                )}
                {searchQuery && (
                  <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                    {t('search', doctorsPageTranslations)} "{searchQuery}"
                  </span>
                )}
                <Button
                  onClick={handleClearFilters}
                  variant="outline"
                  size="sm"
                  className="ml-2"
                >
                  {t('clearAll', doctorsPageTranslations)}
                </Button>
              </div>
            )}

            {preSelectedHospital && (
              <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                <p className="text-blue-800 text-sm">
                  <strong>{t('showingDoctorsFrom', doctorsPageTranslations)}</strong> {preSelectedHospital.name}
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Results Count */}
        <div className="mb-4">
          <p className="text-gray-600">
            {filteredDoctors.length} {filteredDoctors.length !== 1 ? t('doctorsFound', doctorsPageTranslations) : t('doctorFound', doctorsPageTranslations)} {t('foundInTelangana', doctorsPageTranslations)}
            {selectedSpecialty && selectedSpecialty !== 'all-specialties' && ` ${t('for', doctorsPageTranslations)} ${selectedSpecialty}`}
          </p>
        </div>

        {/* Doctor Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredDoctors.map((doctor) => (
            <Card key={doctor.id} className="doctor-card">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {doctor.avatar}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-1">{doctor.name}</h3>
                    <p className="text-blue-600 font-medium mb-1">{doctor.specialty}</p>
                    <p className="text-gray-600 text-sm mb-2">{doctor.qualification}</p>
                    
                    <div className="flex items-center space-x-2 mb-2">
                      <MapPin className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-600">{doctor.hospital}</span>
                    </div>
                    
                    <div className="flex items-center space-x-2 mb-3">
                      <span className="text-sm text-gray-600">{t('district', commonTranslations)}:</span>
                      <span className="text-sm font-medium text-blue-600">{doctor.district}</span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="flex items-center space-x-2">
                        <Star className="w-4 h-4 text-yellow-500" />
                        <span className="text-sm font-medium">{doctor.rating}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Award className="w-4 h-4 text-green-500" />
                        <span className="text-sm">{doctor.experience} {t('years', doctorsPageTranslations)}</span>
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm text-gray-600">{t('successRate', commonTranslations)}</span>
                        <span className="text-sm font-medium">{doctor.successRate}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-green-500 h-2 rounded-full" 
                          style={{ width: `${doctor.successRate}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="mb-4">
                      <p className="text-sm text-gray-600 mb-2">{t('languages', doctorsPageTranslations)}</p>
                      <div className="flex flex-wrap gap-1">
                        {doctor.languages.map((lang, index) => (
                          <span key={index} className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded">
                            {lang}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-blue-500" />
                        <span className="text-sm text-gray-600">{t('nextAvailable', doctorsPageTranslations)}</span>
                      </div>
                      <span className="text-sm font-medium text-green-600">{doctor.nextAvailable}</span>
                    </div>

                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm text-gray-600">{t('consultationFee', doctorsPageTranslations)}</span>
                      <span className="text-lg font-bold text-green-600">₹{doctor.consultationFee}</span>
                    </div>
                    
                    <Button 
                      onClick={() => handleDoctorCardClick(doctor.id)}
                      className="button-primary w-full"
                    >
                      {t('viewDoctorProfile', doctorsPageTranslations)} - ₹{doctor.consultationFee}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredDoctors.length === 0 && (
          <Card className="healthcare-card">
            <CardContent className="p-8 text-center">
              <div className="flex flex-col items-center space-y-4">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                  <Filter className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">{t('noDoctorsFound', doctorsPageTranslations)}</h3>
                <p className="text-gray-600 max-w-md">
                  {selectedSpecialty && selectedSpecialty !== 'all-specialties'
                    ? `${t('no', commonTranslations)} ${selectedSpecialty} ${t('noSpecialistsFound', doctorsPageTranslations)}`
                    : t('noDoctorsFoundMatchingCriteria', doctorsPageTranslations)
                  }
                </p>
                <div className="space-y-2 text-sm text-gray-500">
                  <p>{t('tryAdjustingFilters', doctorsPageTranslations)}</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>{t('checkSpelling', doctorsPageTranslations)}</li>
                    <li>{t('tryBroaderSearch', doctorsPageTranslations)}</li>
                    <li>{t('clearFiltersToSeeAll', doctorsPageTranslations)}</li>
                  </ul>
                </div>
                <Button 
                  onClick={handleClearFilters}
                  className="button-secondary mt-4"
                >
                  {t('clearAllFilters', doctorsPageTranslations)}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Doctors;
