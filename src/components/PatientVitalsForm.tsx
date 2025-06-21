
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const PatientVitalsForm = () => {
  const [formData, setFormData] = useState({
    opid: '',
    temperature: '',
    bp_systolic: '',
    bp_diastolic: '',
    sugar_level: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Validate required fields
    if (!formData.opid) {
      toast({
        title: "Validation Error",
        description: "OPID is required",
        variant: "destructive"
      });
      setIsLoading(false);
      return;
    }

    try {
      // Convert string values to numbers where needed
      const vitalsData = {
        opid: formData.opid,
        temperature: formData.temperature ? parseFloat(formData.temperature) : null,
        bp_systolic: formData.bp_systolic ? parseInt(formData.bp_systolic) : null,
        bp_diastolic: formData.bp_diastolic ? parseInt(formData.bp_diastolic) : null,
        sugar_level: formData.sugar_level ? parseFloat(formData.sugar_level) : null,
        recorded_at: new Date().toISOString()
      };

      const { error } = await supabase
        .from('patient_vitals')
        .insert([vitalsData]);

      if (error) throw error;

      toast({
        title: "Success",
        description: `Vitals recorded successfully for ${formData.opid}`,
      });

      // Reset form
      setFormData({
        opid: '',
        temperature: '',
        bp_systolic: '',
        bp_diastolic: '',
        sugar_level: ''
      });
    } catch (error) {
      console.error('Error inserting patient vitals:', error);
      toast({
        title: "Error",
        description: "Failed to record vitals. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Record Patient Vitals</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="temperature">Temperature (°F)</Label>
              <Input
                id="temperature"
                type="number"
                step="0.1"
                value={formData.temperature}
                onChange={(e) => handleInputChange('temperature', e.target.value)}
                placeholder="98.6"
              />
            </div>
            <div>
              <Label htmlFor="sugar_level">Sugar Level (mg/dL)</Label>
              <Input
                id="sugar_level"
                type="number"
                step="0.1"
                value={formData.sugar_level}
                onChange={(e) => handleInputChange('sugar_level', e.target.value)}
                placeholder="110"
              />
            </div>
          </div>

          <div>
            <Label>Blood Pressure</Label>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label htmlFor="bp_systolic" className="text-sm text-gray-600">Systolic</Label>
                <Input
                  id="bp_systolic"
                  type="number"
                  value={formData.bp_systolic}
                  onChange={(e) => handleInputChange('bp_systolic', e.target.value)}
                  placeholder="120"
                />
              </div>
              <div>
                <Label htmlFor="bp_diastolic" className="text-sm text-gray-600">Diastolic</Label>
                <Input
                  id="bp_diastolic"
                  type="number"
                  value={formData.bp_diastolic}
                  onChange={(e) => handleInputChange('bp_diastolic', e.target.value)}
                  placeholder="80"
                />
              </div>
            </div>
          </div>

          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? 'Recording...' : 'Record Vitals'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default PatientVitalsForm;
