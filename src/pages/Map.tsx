
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { telanganaHospitals } from '@/data/telanganaData';
import MapFilters from '@/components/MapFilters';
import HospitalMap from '@/components/HospitalMap';
import HospitalList from '@/components/HospitalList';
import HospitalDetails from '@/components/HospitalDetails';

const Map = () => {
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedType, setSelectedType] = useState('');

  const filteredHospitals = telanganaHospitals.filter(hospital => 
    (selectedDistrict === '' || selectedDistrict === 'all-districts' || hospital.district === selectedDistrict) &&
    (selectedType === '' || selectedType === 'all-types' || hospital.type === selectedType)
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      <header className="bg-white shadow-sm border-b border-blue-100">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center space-x-4">
            <Link to="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">Telangana Hospitals Map</h1>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <MapFilters
          selectedDistrict={selectedDistrict}
          selectedType={selectedType}
          onDistrictChange={setSelectedDistrict}
          onTypeChange={setSelectedType}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <HospitalMap
            hospitals={filteredHospitals}
            onHospitalSelect={setSelectedHospital}
          />

          <HospitalList
            hospitals={filteredHospitals}
            selectedHospital={selectedHospital}
            onHospitalSelect={setSelectedHospital}
          />
        </div>

        {selectedHospital && (
          <HospitalDetails hospital={selectedHospital} />
        )}
      </div>
    </div>
  );
};

export default Map;
