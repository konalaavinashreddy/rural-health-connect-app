
import React from 'react';
import { Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface Hospital {
  id: number;
  name: string;
  address: string;
  district: string;
  distance: string;
  rating: number;
  specialties: string[];
  hours: string;
  phone: string;
  type: string;
  latitude: number;
  longitude: number;
}

interface HospitalListProps {
  hospitals: Hospital[];
  selectedHospital: Hospital | null;
  onHospitalSelect: (hospital: Hospital) => void;
}

const HospitalList: React.FC<HospitalListProps> = ({
  hospitals,
  selectedHospital,
  onHospitalSelect,
}) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900">Hospitals in Telangana</h2>
        <span className="text-sm text-gray-600">{hospitals.length} hospitals found</span>
      </div>
      {hospitals.map((hospital) => (
        <Card 
          key={hospital.id} 
          className={`healthcare-card cursor-pointer transition-all duration-200 ${
            selectedHospital?.id === hospital.id ? 'ring-2 ring-blue-500 bg-blue-50' : ''
          }`}
          onClick={() => onHospitalSelect(hospital)}
        >
          <CardContent className="p-6">
            <div className="flex justify-between items-start mb-3">
              <div>
                <div className="flex items-center space-x-2 mb-1">
                  <h3 className="text-lg font-semibold text-gray-900">{hospital.name}</h3>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    hospital.type === 'Government' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                  }`}>
                    {hospital.type}
                  </span>
                </div>
                <p className="text-gray-600 text-sm">{hospital.address}</p>
                <p className="text-blue-600 text-sm font-medium">{hospital.district}</p>
              </div>
              <div className="text-right">
                <div className="flex items-center space-x-1 mb-1">
                  <Star className="w-4 h-4 text-yellow-500" />
                  <span className="text-sm font-medium">{hospital.rating}</span>
                </div>
                <span className="text-blue-600 font-medium text-sm">{hospital.distance}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default HospitalList;
