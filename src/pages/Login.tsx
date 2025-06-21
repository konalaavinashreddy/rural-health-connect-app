
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart, User, Stethoscope, Globe } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { language, toggleLanguage } = useLanguage();

  // Mock credentials for patient login
  const mockCredentials = {
    username: 'patient123',
    password: 'password123'
  };

  const loginTranslations = {
    welcomeTitle: {
      en: "Welcome to Rural Health Connect",
      te: "గ్రామీణ ఆరోగ్య కనెక్ట్‌కు స్వాగతం"
    },
    welcomeSubtitle: {
      en: "Connecting rural communities with quality healthcare",
      te: "గ్రామీణ కమ్యూనిటీలను నాణ్యమైన ఆరోగ్య సేవలతో కలుపుతోంది"
    },
    patientLogin: {
      en: "Patient Login",
      te: "రోగి లాగిన్"
    },
    doctorLogin: {
      en: "Doctor Login", 
      te: "వైద్య లాగిన్"
    },
    patientPortal: {
      en: "Patient Portal",
      te: "రోగి పోర్టల్"
    },
    doctorPortal: {
      en: "Doctor Portal",
      te: "వైద్య పోర్టల్"
    },
    enterCredentials: {
      en: "Enter your credentials to access your health records",
      te: "మీ ఆరోగ్య రికార్డులను యాక్సెస్ చేయడానికి మీ వివరాలను నమోదు చేయండి"
    },
    username: {
      en: "Username",
      te: "వినియోగదారు పేరు"
    },
    password: {
      en: "Password", 
      te: "పాస్‌వర్డ్"
    },
    enterUsername: {
      en: "Enter your username",
      te: "మీ వినియోగదారు పేరును నమోదు చేయండి"
    },
    enterPassword: {
      en: "Enter your password",
      te: "మీ పాస్‌వర్డ్‌ను నమోదు చేయండి"
    },
    loginToPatientPortal: {
      en: "Login to Patient Portal",
      te: "రోగి పోర్టల్‌కు లాగిన్ చేయండి"
    },
    loggingIn: {
      en: "Logging in...",
      te: "లాగిన్ అవుతోంది..."
    },
    accessDoctorPortal: {
      en: "Access Doctor Portal",
      te: "వైద్య పోర్టల్‌ను యాక్సెస్ చేయండి"
    },
    demoCredentials: {
      en: "Demo credentials: patient123 / password123",
      te: "డెమో వివరాలు: patient123 / password123"
    },
    accessProfessional: {
      en: "Access the professional healthcare management system",
      te: "వృత్తిపరమైన ఆరోగ్య నిర్వహణ వ్యవస్థను యాక్సెస్ చేయండి"
    },
    clickBelow: {
      en: "Click below to access the doctor portal directly",
      te: "వైద్య పోర్టల్‌ను నేరుగా యాక్సెస్ చేయడానికి క్రింద క్లిక్ చేయండి"
    },
    improvingHealthcare: {
      en: "Improving healthcare access in rural communities",
      te: "గ్రామీణ కమ్యూనిటీలలో ఆరోగ్య సేవల ప్రాప్యతను మెరుగుపరుస్తోంది"
    },
    invalidCredentials: {
      en: "Invalid username or password",
      te: "చెల్లని వినియోగదారు పేరు లేదా పాస్‌వర్డ్"
    },
    loginFailed: {
      en: "Login failed. Please try again.",
      te: "లాగిన్ విఫలమైంది. దయచేసి మళ్లీ ప్రయత్నించండి."
    }
  };

  const t = (key: string) => {
    const translation = loginTranslations[key];
    return translation ? (language === 'te' ? translation.te : translation.en) : key;
  };

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
        navigate('/home');
      } else {
        setError(t('invalidCredentials'));
      }
    } catch (error) {
      setError(t('loginFailed'));
    } finally {
      setIsLoading(false);
    }
  };

  const handleDoctorLogin = () => {
    // Redirect to external doctor portal
    window.location.href = 'https://rural-health-connect-portal.lovable.app/';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Language Toggle */}
        <div className="flex justify-end mb-4">
          <Button 
            onClick={toggleLanguage}
            className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2"
          >
            <Globe className="w-4 h-4" />
            {language === 'te' ? 'తెలుగు' : 'English'}
          </Button>
        </div>

        {/* Logo and Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-primary rounded-full p-3">
              <Heart className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{t('welcomeTitle')}</h1>
          <p className="text-gray-600">{t('welcomeSubtitle')}</p>
        </div>

        {/* Login Tabs */}
        <Card className="shadow-lg">
          <Tabs defaultValue="patient" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="patient" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                {t('patientLogin')}
              </TabsTrigger>
              <TabsTrigger value="doctor" className="flex items-center gap-2">
                <Stethoscope className="h-4 w-4" />
                {t('doctorLogin')}
              </TabsTrigger>
            </TabsList>

            {/* Patient Login Tab */}
            <TabsContent value="patient">
              <CardHeader>
                <CardTitle className="text-center text-primary">{t('patientPortal')}</CardTitle>
                <CardDescription className="text-center">
                  {t('enterCredentials')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handlePatientLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="username">{t('username')}</Label>
                    <Input
                      id="username"
                      type="text"
                      placeholder={t('enterUsername')}
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                      disabled={isLoading}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">{t('password')}</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder={t('enterPassword')}
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
                    {t('demoCredentials')}
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full bg-primary hover:bg-primary/90"
                    disabled={isLoading}
                  >
                    {isLoading ? t('loggingIn') : t('loginToPatientPortal')}
                  </Button>
                </form>
              </CardContent>
            </TabsContent>

            {/* Doctor Login Tab */}
            <TabsContent value="doctor">
              <CardHeader>
                <CardTitle className="text-center text-accent">{t('doctorPortal')}</CardTitle>
                <CardDescription className="text-center">
                  {t('accessProfessional')}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center text-gray-600 mb-4">
                  {t('clickBelow')}
                </div>
                <Button 
                  onClick={handleDoctorLogin}
                  className="w-full bg-accent hover:bg-accent/90"
                  disabled={isLoading}
                >
                  {t('accessDoctorPortal')}
                </Button>
              </CardContent>
            </TabsContent>
          </Tabs>
        </Card>

        {/* Footer */}
        <div className="text-center mt-6 text-sm text-gray-500">
          <p>{t('improvingHealthcare')}</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
