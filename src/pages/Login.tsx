
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Stethoscope, User } from 'lucide-react';

const Login = () => {
  const [userType, setUserType] = useState('patient');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');

    // Simulate loading delay
    await new Promise(resolve => setTimeout(resolve, 500));

    // Validate credentials
    let isValid = false;
    let redirectUrl = '';

    if (userType === 'doctor') {
      isValid = username === 'doctor01' && password === 'test123';
      redirectUrl = 'https://rural-health-connect-portal.lovable.app/';
    } else {
      isValid = username === 'patient01' && password === 'demo123';
      redirectUrl = 'https://rural-health-connect-app.lovable.app/';
    }

    if (isValid) {
      window.location.href = redirectUrl;
    } else {
      setErrorMessage('Invalid login. Please try again.');
    }

    setIsLoading(false);
  };

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
                  setUserType(value);
                  setErrorMessage('');
                  setUsername('');
                  setPassword('');
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
              <Label htmlFor="username" className="text-sm font-medium text-gray-700">
                Username / Email
              </Label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder={userType === 'doctor' ? 'doctor01' : 'patient01'}
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
                placeholder={userType === 'doctor' ? 'test123' : 'demo123'}
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
                ? 'Doctor: doctor01 / test123' 
                : 'Patient: patient01 / demo123'
              }
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
