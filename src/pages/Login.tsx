
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart, User, Stethoscope } from 'lucide-react';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Mock credentials for patient login
  const mockCredentials = {
    username: 'patient123',
    password: 'password123'
  };

  const handlePatientLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (username === mockCredentials.username && password === mockCredentials.password) {
      // Navigate to Patient Dashboard
      navigate('/patient-dashboard');
    } else {
      setError('Invalid username or password');
    }
  };

  const handleDoctorLogin = () => {
    // Redirect to external doctor portal
    window.location.href = 'https://rural-health-connect-portal.lovable.app/';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo and Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-primary rounded-full p-3">
              <Heart className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome to Rural Health Connect</h1>
          <p className="text-gray-600">Connecting rural communities with quality healthcare</p>
        </div>

        {/* Login Tabs */}
        <Card className="shadow-lg">
          <Tabs defaultValue="patient" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="patient" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Patient Login
              </TabsTrigger>
              <TabsTrigger value="doctor" className="flex items-center gap-2">
                <Stethoscope className="h-4 w-4" />
                Doctor Login
              </TabsTrigger>
            </TabsList>

            {/* Patient Login Tab */}
            <TabsContent value="patient">
              <CardHeader>
                <CardTitle className="text-center text-primary">Patient Portal</CardTitle>
                <CardDescription className="text-center">
                  Enter your credentials to access your health records
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handlePatientLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="username">Username</Label>
                    <Input
                      id="username"
                      type="text"
                      placeholder="Enter your username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  {error && (
                    <div className="text-red-500 text-sm text-center">{error}</div>
                  )}
                  <div className="text-xs text-gray-500 text-center">
                    Demo credentials: patient123 / password123
                  </div>
                  <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
                    Login to Patient Portal
                  </Button>
                </form>
              </CardContent>
            </TabsContent>

            {/* Doctor Login Tab */}
            <TabsContent value="doctor">
              <CardHeader>
                <CardTitle className="text-center text-accent">Doctor Portal</CardTitle>
                <CardDescription className="text-center">
                  Access the professional healthcare management system
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center text-gray-600 mb-4">
                  Click below to access the doctor portal directly
                </div>
                <Button 
                  onClick={handleDoctorLogin}
                  className="w-full bg-accent hover:bg-accent/90"
                >
                  Access Doctor Portal
                </Button>
              </CardContent>
            </TabsContent>
          </Tabs>
        </Card>

        {/* Footer */}
        <div className="text-center mt-6 text-sm text-gray-500">
          <p>Improving healthcare access in rural communities</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
