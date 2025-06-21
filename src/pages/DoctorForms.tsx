
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PrescriptionForm from '@/components/PrescriptionForm';
import PatientVitalsForm from '@/components/PatientVitalsForm';

const DoctorForms = () => {
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
            <div>
              <h1 className="text-xl font-bold text-gray-900">Doctor Forms</h1>
              <p className="text-sm text-gray-600">Prescription & Patient Vitals</p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <Tabs defaultValue="prescription" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="prescription">Add Prescription</TabsTrigger>
            <TabsTrigger value="vitals">Record Vitals</TabsTrigger>
          </TabsList>
          
          <TabsContent value="prescription" className="mt-6">
            <PrescriptionForm />
          </TabsContent>
          
          <TabsContent value="vitals" className="mt-6">
            <PatientVitalsForm />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default DoctorForms;
