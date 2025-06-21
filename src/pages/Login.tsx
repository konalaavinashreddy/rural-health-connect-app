import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart, User, Stethoscope } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Mock credentials for patient login
  const mockCredentials = {
    username: 'patient123',
    password: 'password123'
  };

  // Check if user is already authenticated
  useEffect(() => {
    const checkAuthState = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          // User is already logged in, redirect to home
          navigate('/home', { replace: true });
          return;
        }
      } catch (error) {
        console.error('Error checking auth state:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthState();

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session?.user) {
        navigate('/home', { replace: true });
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handlePatientLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      if (username === mockCredentials.username && password === mockCredentials.password) {
        // Create a mock session in localStorage for demo purposes
        const mockSession = {
          user: { id: 'mock-user-id', email: 'patient123@example.com' },
          access_token: 'mock-token',
          expires_at: Date.now() + (24 * 60 * 60 * 1000) // 24 hours
        };
        localStorage.setItem('auth-session', JSON.stringify(mockSession));
        
        // Navigate to home page
        navigate('/home', { replace: true });
      } else {
        setError('Invalid username or password');
      }
    } catch (error) {
      setError('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDoctorLogin = () => {
    // Redirect to external doctor portal
    window.location.href = 'https://rural-health-connect-portal.lovable.app/';
  };

  // Show loading while checking auth state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Checking authentication...</p>
        </div>
      </div>
    );
  }

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
                      disabled={isLoading}
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
                      disabled={isLoading}
                    />
                  </div>
                  {error && (
                    <div className="text-red-500 text-sm text-center">{error}</div>
                  )}
                  <div className="text-xs text-gray-500 text-center">
                    Demo credentials: patient123 / password123
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full bg-primary hover:bg-primary/90"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Logging in...' : 'Login to Patient Portal'}
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
                  disabled={isLoading}
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
