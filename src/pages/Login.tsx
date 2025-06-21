
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Stethoscope, User } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const Login = () => {
  const [userType, setUserType] = useState<'patient' | 'doctor'>('patient');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { login, user } = useAuth();
  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      if (user.role === 'patient') {
        navigate('/patient-dashboard');
      } else {
        navigate('/doctor-dashboard');
      }
    }
  }, [user, navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');

    const success = await login(email, password, userType);

    if (success) {
      if (userType === 'patient') {
        navigate('/patient-dashboard');
      } else {
        navigate('/doctor-dashboard');
      }
    } else {
      setErrorMessage('Invalid login credentials. Please try again.');
    }

    setIsLoading(false);
  };

  // Set default demo credentials when user type changes
  useEffect(() => {
    if (userType === 'patient') {
      setEmail('patient@example.com');
      setPassword('1234');
    } else {
      setEmail('doctor@example.com');
      setPassword('1234');
    }
  }, [userType]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-[350px] shadow-lg">
        <CardHeader className="text-center pb-4">
          <CardTitle className="text-2xl font-bold text-gray-800 mb-2">
            Rural Health Connect
          </CardTitle>
          <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Stethoscope className="w-6 h-6 text-white" />
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* User Type Toggle */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">Login as:</Label>
            <ToggleGroup
              type="single"
              value={userType}
              onValueChange={(value) => {
                if (value) {
                  setUserType(value as 'patient' | 'doctor');
                  setErrorMessage('');
                }
              }}
              className="grid w-full grid-cols-2"
            >
              <ToggleGroupItem
                value="patient"
                className="data-[state=on]:bg-blue-600 data-[state=on]:text-white"
              >
                <User className="w-4 h-4 mr-2" />
                Patient
              </ToggleGroupItem>
              <ToggleGroupItem
                value="doctor"
                className="data-[state=on]:bg-blue-600 data-[state=on]:text-white"
              >
                <Stethoscope className="w-4 h-4 mr-2" />
                Doctor
              </ToggleGroupItem>
            </ToggleGroup>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={userType === 'doctor' ? 'doctor@example.com' : 'patient@example.com'}
                required
                className="rounded-lg"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="1234"
                required
                className="rounded-lg"
              />
            </div>

            {errorMessage && (
              <div className="text-red-600 text-sm text-center bg-red-50 p-2 rounded-lg">
                {errorMessage}
              </div>
            )}

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-2 font-medium transition-colors"
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </Button>
          </form>

          {/* Demo Credentials Helper */}
          <div className="text-xs text-gray-500 text-center space-y-1">
            <p className="font-medium">Demo Credentials:</p>
            <p>
              {userType === 'doctor' 
                ? 'Doctor: doctor@example.com / 1234' 
                : 'Patient: patient@example.com / 1234'
              }
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
