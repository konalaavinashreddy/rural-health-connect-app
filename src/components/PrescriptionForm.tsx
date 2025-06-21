
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const commonMedicines = [
  'Paracetamol 500mg',
  'Amoxicillin 500mg',
  'Metformin 500mg',
  'Aspirin 75mg',
  'Omeprazole 20mg',
  'Atorvastatin 20mg',
  'Lisinopril 10mg',
  'Ibuprofen 400mg',
  'Cetirizine 10mg',
  'Vitamin D3 1000IU'
];

const PrescriptionForm = () => {
  const [formData, setFormData] = useState({
    opid: '',
    patient_name: '',
    medicine_name: '',
    dosage: '',
    duration: '',
    time: '',
    instructions: '',
    prescribed_by: 'Dr. Current User' // This would come from login session
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleMedicineSelect = (medicine: string) => {
    setFormData(prev => ({ ...prev, medicine_name: medicine }));
    
    // Auto-fill dosage and instructions based on medicine
    const medicineDefaults: { [key: string]: { dosage: string; instructions: string } } = {
      'Paracetamol 500mg': { dosage: '1 tablet twice daily', instructions: 'Take after meals' },
      'Amoxicillin 500mg': { dosage: '1 capsule three times daily', instructions: 'Complete the full course' },
      'Metformin 500mg': { dosage: '1 tablet twice daily', instructions: 'Take with meals' },
      'Aspirin 75mg': { dosage: '1 tablet once daily', instructions: 'Take after breakfast' },
      'Omeprazole 20mg': { dosage: '1 capsule once daily', instructions: 'Take before meals' }
    };

    if (medicineDefaults[medicine]) {
      setFormData(prev => ({
        ...prev,
        dosage: medicineDefaults[medicine].dosage,
        instructions: medicineDefaults[medicine].instructions
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Validate required fields
    const requiredFields = ['opid', 'patient_name', 'medicine_name', 'dosage', 'duration', 'time'];
    const missingFields = requiredFields.filter(field => !formData[field as keyof typeof formData]);
    
    if (missingFields.length > 0) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      setIsLoading(false);
      return;
    }

    try {
      const { error } = await supabase
        .from('prescriptions')
        .insert([formData]);

      if (error) throw error;

      toast({
        title: "Success",
        description: `Prescription saved successfully for ${formData.opid}`,
      });

      // Reset form
      setFormData({
        opid: '',
        patient_name: '',
        medicine_name: '',
        dosage: '',
        duration: '',
        time: '',
        instructions: '',
        prescribed_by: 'Dr. Current User'
      });
    } catch (error) {
      console.error('Error inserting prescription:', error);
      toast({
        title: "Error",
        description: "Failed to save prescription. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Add Prescription</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="opid">OPID *</Label>
              <Input
                id="opid"
                value={formData.opid}
                onChange={(e) => handleInputChange('opid', e.target.value)}
                placeholder="OPID001"
                required
              />
            </div>
            <div>
              <Label htmlFor="patient_name">Patient Name *</Label>
              <Input
                id="patient_name"
                value={formData.patient_name}
                onChange={(e) => handleInputChange('patient_name', e.target.value)}
                placeholder="John Doe"
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="medicine_name">Medicine Name *</Label>
            <Select onValueChange={handleMedicineSelect} value={formData.medicine_name}>
              <SelectTrigger>
                <SelectValue placeholder="Select medicine" />
              </SelectTrigger>
              <SelectContent>
                {commonMedicines.map((medicine) => (
                  <SelectItem key={medicine} value={medicine}>
                    {medicine}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="dosage">Dosage *</Label>
              <Input
                id="dosage"
                value={formData.dosage}
                onChange={(e) => handleInputChange('dosage', e.target.value)}
                placeholder="1 tablet after lunch"
                required
              />
            </div>
            <div>
              <Label htmlFor="duration">Duration *</Label>
              <Input
                id="duration"
                value={formData.duration}
                onChange={(e) => handleInputChange('duration', e.target.value)}
                placeholder="5 days"
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="time">Time *</Label>
            <Input
              id="time"
              value={formData.time}
              onChange={(e) => handleInputChange('time', e.target.value)}
              placeholder="2:00 PM"
              required
            />
          </div>

          <div>
            <Label htmlFor="instructions">Instructions</Label>
            <Input
              id="instructions"
              value={formData.instructions}
              onChange={(e) => handleInputChange('instructions', e.target.value)}
              placeholder="Do not take on empty stomach"
            />
          </div>

          <div>
            <Label htmlFor="prescribed_by">Prescribed By</Label>
            <Input
              id="prescribed_by"
              value={formData.prescribed_by}
              onChange={(e) => handleInputChange('prescribed_by', e.target.value)}
              disabled
            />
          </div>

          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? 'Saving...' : 'Submit Prescription'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default PrescriptionForm;
