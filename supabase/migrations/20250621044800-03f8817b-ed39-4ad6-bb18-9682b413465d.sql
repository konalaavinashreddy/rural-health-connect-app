
-- Create prescriptions table
CREATE TABLE public.prescriptions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  opid TEXT NOT NULL,
  patient_name TEXT NOT NULL,
  medicine_name TEXT NOT NULL,
  dosage TEXT NOT NULL,
  duration TEXT NOT NULL,
  time TEXT NOT NULL,
  instructions TEXT,
  prescribed_by TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create patient_vitals table
CREATE TABLE public.patient_vitals (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  opid TEXT NOT NULL,
  temperature DECIMAL(4,1),
  bp_systolic INTEGER,
  bp_diastolic INTEGER,
  sugar_level DECIMAL(5,1),
  recorded_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add Row Level Security (RLS) to ensure proper access control
ALTER TABLE public.prescriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.patient_vitals ENABLE ROW LEVEL SECURITY;

-- Create policies for prescriptions table (allowing all operations for now - can be restricted later)
CREATE POLICY "Allow all operations on prescriptions" 
  ON public.prescriptions 
  FOR ALL 
  USING (true) 
  WITH CHECK (true);

-- Create policies for patient_vitals table (allowing all operations for now - can be restricted later)
CREATE POLICY "Allow all operations on patient_vitals" 
  ON public.patient_vitals 
  FOR ALL 
  USING (true) 
  WITH CHECK (true);

-- Create indexes for better performance
CREATE INDEX idx_prescriptions_opid ON public.prescriptions(opid);
CREATE INDEX idx_prescriptions_created_at ON public.prescriptions(created_at);
CREATE INDEX idx_patient_vitals_opid ON public.patient_vitals(opid);
CREATE INDEX idx_patient_vitals_recorded_at ON public.patient_vitals(recorded_at);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for prescriptions table
CREATE TRIGGER update_prescriptions_updated_at 
    BEFORE UPDATE ON public.prescriptions 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();
