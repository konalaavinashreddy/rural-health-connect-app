
import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Navigation } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

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

interface HospitalDetailsProps {
  hospital: Hospital;
}

const HospitalDetails: React.FC<HospitalDetailsProps> = ({ hospital }) => {
  return (
    <Card className="healthcare-card mt-8">
      <CardHeader>
        <CardTitle className="text-xl text-gray-900">
          {hospital.name} - Detailed Information
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Contact Information</h4>
            <p className="text-gray-600 mb-2"><strong>Address:</strong> {hospital.address}</p>
            <p className="text-gray-600 mb-2"><strong>District:</strong> {hospital.district}</p>
            <p className="text-gray-600 mb-2"><strong>Phone:</strong> {hospital.phone}</p>
            <p className="text-gray-600 mb-2"><strong>Hours:</strong> {hospital.hours}</p>
            <p className="text-gray-600"><strong>Type:</strong> {hospital.type} Hospital</p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Available Specialties</h4>
            <div className="space-y-2">
              {hospital.specialties.map((specialty, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-gray-700">{specialty}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-6 flex space-x-4">
          <Link to="/appointment" state={{ hospital }}>
            <Button className="button-primary">
              <Calendar className="w-4 h-4 mr-2" />
              Book Appointment
            </Button>
          </Link>
          <Link to="/doctors" state={{ hospital }}>
            <Button className="button-secondary">
              Find Doctors
            </Button>
          </Link>
          <Button className="button-secondary">
            <Navigation className="w-4 h-4 mr-2" />
            Get Directions
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default HospitalDetails;
