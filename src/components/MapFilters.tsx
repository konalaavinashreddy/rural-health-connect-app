
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { telanganaDistricts } from '@/data/telanganaData';

interface MapFiltersProps {
  selectedDistrict: string;
  selectedType: string;
  onDistrictChange: (district: string) => void;
  onTypeChange: (type: string) => void;
}

const MapFilters: React.FC<MapFiltersProps> = ({
  selectedDistrict,
  selectedType,
  onDistrictChange,
  onTypeChange,
}) => {
  return (
    <Card className="healthcare-card mb-6">
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Select value={selectedDistrict} onValueChange={onDistrictChange}>
            <SelectTrigger className="h-12 border-2 border-blue-100">
              <SelectValue placeholder="Select District" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all-districts">All Districts</SelectItem>
              {telanganaDistricts.map(district => (
                <SelectItem key={district} value={district}>{district}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={selectedType} onValueChange={onTypeChange}>
            <SelectTrigger className="h-12 border-2 border-blue-100">
              <SelectValue placeholder="Hospital Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all-types">All Types</SelectItem>
              <SelectItem value="Government">Government</SelectItem>
              <SelectItem value="Private">Private</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
};

export default MapFilters;
