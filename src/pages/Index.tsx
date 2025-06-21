import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Calendar, MessageCircle, Pill, MapPin, Stethoscope, Clock, Star, Users, Heart, Home, User, ArrowRight, CheckCircle, Phone, Mail, Facebook, Twitter, Instagram, Youtube, Shield, FileText, Info, Apple, Droplets, Baby, ChefHat, LogOut, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { commonDiseases, telanganaSpecialties } from '@/data/telanganaData';

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCondition, setSelectedCondition] = useState('');
  const [languageToggle, setLanguageToggle] = useState(false); // false = English, true = Telugu
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear any stored authentication data
    localStorage.removeItem('auth-session');
    // Navigate to login page
    navigate('/');
  };

  // Translation object for all content
  const translations = {
    // Hero section
    heroTitle: {
      en: "Rural Health Connect",
      te: "గ్రామీణ ఆరోగ్య కనెక్ట్"
    },
    heroSubtitle: {
      en: "Complete healthcare solution for rural Telangana",
      te: "తెలంగాణ గ్రామీణ ప్రాంతాలకు పూర్తి ఆరోగ్య సేవలు"
    },
    bookAppointment: {
      en: "Book Appointment Now",
      te: "ఇప్పుడే అపాయింట్మెంట్ బుక్ చేయండి"
    },
    
    // How it works section
    howItWorks: {
      en: "How It Works",
      te: "ఇది ఎలా పనిచేస్తుంది"
    },
    workflowSteps: {
      book: { en: "Book", te: "బుక్ చేయండి" },
      consult: { en: "Consult", te: "సంప్రదించండి" },
      getMedicine: { en: "Get Medicine", te: "మందులు తీసుకోండి" },
      receiveReminders: { en: "Receive Reminders", te: "రిమైండర్లు పొందండి" }
    },
    
    // Search section
    findHealthcare: {
      en: "Find Healthcare Near You",
      te: "మీ దగ్గర ఆరోగ్య సేవలను కనుగొనండి"
    },
    searchPlaceholder: {
      en: "Search by disease or specialist...",
      te: "వ్యాధి లేదా స్పెషలిస్ట్ వెతకండి..."
    },
    search: {
      en: "Search",
      te: "వెతకండి"
    },
    quickSearch: {
      en: "Quick search:",
      te: "వేగవంతమైన వెతుకులాట:"
    },
    
    // Doctor profiles section
    expertDoctors: {
      en: "Our Expert Doctors",
      te: "మా నిపుణ వైద్యులు"
    },
    experience: {
      en: "experience",
      te: "అనుభవం"
    },
    visitingHours: {
      en: "Visiting Hours:",
      te: "సందర్శన సమయం:"
    },
    
    // Government schemes section
    govSchemes: {
      en: "Government Health Schemes",
      te: "ప్రభుత్వ ఆరోగ్య పథకాలు"
    },
    learnMoreApply: {
      en: "Learn More & Apply",
      te: "మరింత తెలుసుకోండి మరియు దరఖాస్తు చేయండి"
    },
    
    // Food recommendations section
    foodRecommendations: {
      en: "Food Recommendations by Health Condition",
      te: "ఆరోగ్య పరిస్థితి ఆధారంగా ఆహార సిఫార్సులు"
    },
    foodSubtitle: {
      en: "Customized diet tips for better recovery and health – based on your illness",
      te: "మీ అనారోగ్యం ఆధారంగా మెరుగైన కోలుకునే సామర్థ్యం మరియు ఆరోగ్యం కోసం అనుకూలీకరించిన ఆహార చిట్కాలు"
    },
    selectCondition: {
      en: "Select Health Condition",
      te: "ఆరోగ్య పరిస్థితిని ఎంచుకోండి"
    },
    allConditions: {
      en: "All Conditions",
      te: "అన్ని పరిస్థితులు"
    },
    recommended: {
      en: "Recommended:",
      te: "సిఫార్సు చేయబడినవి:"
    },
    avoid: {
      en: "Avoid:",
      te: "తప్పించాల్సినవి:"
    },
    healthTip: {
      en: "Health Tip:",
      te: "ఆరోగ్య చిట్కా:"
    },
    moreDietTips: {
      en: "More Diet Tips",
      te: "మరిన్ని ఆహార చిట్కాలు"
    },
    viewAllConditions: {
      en: "View All Conditions",
      te: "అన్ని పరిస్థితులను చూడండి"
    },
    
    // Chatbot section
    healthAssistant: {
      en: "Rural Health Assistant",
      te: "గ్రామీణ ఆరోగ్య సహాయకుడు"
    },
    instantAdvice: {
      en: "Get instant health advice in Telugu and English",
      te: "తెలుగు మరియు ఆంగ్లంలో తక్షణ ఆరోగ్య సలహా పొందండి"
    },
    healthSupport: {
      en: "24/7 Health Support",
      te: "24/7 ఆరోగ్య సహాయం"
    },
    voiceTextChat: {
      en: "Voice and text chat in your language",
      te: "మీ భాషలో వాయిస్ మరియు టెక్స్ట్ చాట్"
    },
    startHealthChat: {
      en: "Start Health Chat",
      te: "ఆరోగ్య చాట్ ప్రారంభించండి"
    },
    
    // Map section
    findHospitals: {
      en: "Find Hospitals Near You",
      te: "మీ దగ్గర ఆసుపత్రులను కనుగొనండి"
    },
    viewFullMap: {
      en: "View Full Map",
      te: "పూర్తి మ్యాప్ చూడండి"
    },
    
    // Statistics section
    healthStats: {
      en: "Telangana Healthcare Statistics",
      te: "తెలంగాణ ఆరోగ్య సంరక్షణ గణాంకాలు"
    },
    qualifiedDoctors: {
      en: "Qualified Doctors",
      te: "అర్హత కలిగిన వైద్యులు"
    },
    hospitals: {
      en: "Hospitals",
      te: "ఆసుపత్రులు"
    },
    patientsServed: {
      en: "Patients Served",
      te: "రోగులకు సేవలు అందించారు"
    },
    averageRating: {
      en: "Average Rating",
      te: "సగటు రేటింగ్"
    },
    
    // Specialties section
    medicalSpecialties: {
      en: "Available Medical Specialties in Telangana",
      te: "తెలంగాణలో అందుబాటులో ఉన్న వైద్య విభాగాలు"
    },
    clickSpecialty: {
      en: "Click on any specialty to find doctors in that field",
      te: "ఆ రంగంలో వైద్యులను కనుగొనడానికి ఏదైనా స్పెషలిటీని క్లిక్ చేయండి"
    },
    viewDoctors: {
      en: "View Doctors",
      te: "వైద్యులను చూడండి"
    },
    
    // Footer
    aboutDescription: {
      en: "Providing comprehensive healthcare solutions for rural Telangana communities.",
      te: "గ్రామీణ తెలంగాణ కమ్యూనిటీలకు సమగ్ర ఆరోగ్య సేవల పరిష్కారాలను అందిస్తోంది."
    },
    quickLinks: {
      en: "Quick Links",
      te: "త్వరిత లింకులు"
    },
    findDoctors: {
      en: "Find Doctors",
      te: "వైద్యులను కనుగొనండి"
    },
    trackMedicines: {
      en: "Track Medicines",
      te: "మందులను ట్రాక్ చేయండి"
    },
    hospitalMap: {
      en: "Hospital Map",
      te: "ఆసుపత్రి మ్యాప్"
    },
    legal: {
      en: "Legal",
      te: "చట్టపరమైన"
    },
    aboutUs: {
      en: "About Us",
      te: "మా గురించి"
    },
    privacyPolicy: {
      en: "Privacy Policy",
      te: "గోప్యతా విధానం"
    },
    termsOfService: {
      en: "Terms of Service",
      te: "సేవా నియమాలు"
    },
    contact: {
      en: "Contact",
      te: "సంప్రదించండి"
    },
    contactUs: {
      en: "Contact Us",
      te: "మమ్మల్ని సంప్రదించండి"
    },
    followUs: {
      en: "Follow Us",
      te: "మమ్మల్ని అనుసరించండి"
    },
    allRightsReserved: {
      en: "© 2024 Rural Health Connect. All rights reserved. | Made with ❤️ for rural Telangana",
      te: "© 2024 గ్రామీణ ఆరోగ్య కనెక్ట్. అన్ని హక్కులు రిజర్వ్ చేయబడ్డాయి. | గ్రామీణ తెలంగాణ కోసం ❤️ తో తయారు చేయబడింది"
    },
    logout: {
      en: "Logout",
      te: "లాగ్ అవుట్"
    }
  };

  // Helper function to get translated text with proper typing
  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = translations;
    
    // Navigate through the nested object
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        console.warn(`Translation key not found: ${key}`);
        return key; // Return the key itself if translation not found
      }
    }
    
    // Check if the final value has the expected language structure
    if (value && typeof value === 'object' && 'en' in value && 'te' in value) {
      return languageToggle ? value.te : value.en;
    }
    
    // If it's a direct string value, return it
    if (typeof value === 'string') {
      return value;
    }
    
    console.warn(`Invalid translation structure for key: ${key}`);
    return key;
  };

  const quickSearchSuggestions = [
    'Fever', 'Diabetes', 'Heart Disease', 'Blood Pressure', 'Kidney Stones'
  ];

  const doctorProfiles = [
    {
      name: 'Dr. Rajesh Kumar',
      photo: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face',
      specialty: 'Cardiologist',
      experience: '15 years',
      visitingTime: 'Mon-Wed, 10:00 AM - 4:00 PM',
      rating: 4.8,
      hospital: 'NIMS Hospital'
    },
    {
      name: 'Dr. Priya Sharma',
      photo: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face',
      specialty: 'Pediatrician',
      experience: '12 years',
      visitingTime: 'Tue-Thu, 11:00 AM - 5:00 PM',
      rating: 4.9,
      hospital: 'Apollo Hospital'
    },
    {
      name: 'Dr. Venkatesh Naidu',
      photo: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=150&h=150&fit=crop&crop=face',
      specialty: 'General Physician',
      experience: '20 years',
      visitingTime: 'Mon-Fri, 9:00 AM - 3:00 PM',
      rating: 4.7,
      hospital: 'Gandhi Hospital'
    }
  ];

  const governmentSchemes = [
    {
      title: 'Arogya Sri Health Insurance',
      description: 'Free health insurance up to ₹5 lakhs for eligible families',
      eligibility: 'BPL families',
      telugu: 'ఆరోగ్య శ్రీ ఆరోగ్య భీమా'
    },
    {
      title: 'Mother & Child Care Kit Scheme',
      description: 'Free nutritional kits and medical support for expecting mothers',
      eligibility: 'Pregnant women',
      telugu: 'తల్లి మరియు శిశు సంరక్షణ కిట్ పథకం'
    },
    {
      title: 'Free Medicine Scheme',
      description: 'Essential medicines available free at government hospitals',
      eligibility: 'All citizens',
      telugu: 'ఉచిత మందుల పథకం'
    }
  ];

  const foodRecommendations = [
    {
      id: 'fever',
      title: 'Fever',
      titleTelugu: 'జ్వరం',
      icon: <Droplets className="w-8 h-8 text-red-500" />,
      recommendations: {
        do: ['Light khichdi, dal rice', 'Coconut water for hydration', 'Warm herbal teas'],
        avoid: ['Spicy/oily food', 'Heavy meals', 'Cold drinks'],
        telugu: 'జ్వరం సమయంలో తేలికపాటి ఆహారం తీసుకోండి'
      },
      bgColor: 'from-red-50 to-orange-50',
      borderColor: 'border-red-200'
    },
    {
      id: 'diabetes',
      title: 'Diabetes',
      titleTelugu: 'మధుమేహం',
      icon: <Apple className="w-8 h-8 text-green-500" />,
      recommendations: {
        do: ['Low GI foods: Oats, leafy greens', 'Include protein & fiber', 'Small frequent meals'],
        avoid: ['Sugar, white rice', 'Processed foods', 'Sugary drinks'],
        telugu: 'చక్కెర నియంత్రణకు తక్కువ GI ఆహారం తీసుకోండి'
      },
      bgColor: 'from-green-50 to-emerald-50',
      borderColor: 'border-green-200'
    },
    {
      id: 'pregnancy',
      title: 'Pregnancy',
      titleTelugu: 'గర్భధారణ',
      icon: <Heart className="w-8 h-8 text-pink-500" />,
      recommendations: {
        do: ['Iron & folic-rich foods: Palak, citrus fruits', 'Milk, eggs for calcium', 'Regular hydration'],
        avoid: ['Papaya, raw meat', 'Alcohol, caffeine', 'Raw eggs'],
        telugu: 'గర్భిణులు పోషకాహారాన్ని తీసుకోవాలి'
      },
      bgColor: 'from-pink-50 to-purple-50',
      borderColor: 'border-pink-200'
    },
    {
      id: 'child-growth',
      title: 'Child Growth',
      titleTelugu: 'పిల్లల ఎదుగుదల',
      icon: <Baby className="w-8 h-8 text-blue-500" />,
      recommendations: {
        do: ['Protein-rich diet: Eggs, dal', 'Milk & fruits daily', 'Variety of vegetables'],
        avoid: ['Junk food', 'Excess sugar', 'Carbonated drinks'],
        telugu: 'పిల్లల ఆరోగ్యానికి పోషకాహారం అవసరం'
      },
      bgColor: 'from-blue-50 to-cyan-50',
      borderColor: 'border-blue-200'
    }
  ];

  const filteredRecommendations = selectedCondition && selectedCondition !== 'all-conditions'
    ? foodRecommendations.filter(rec => rec.id === selectedCondition)
    : foodRecommendations;

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/doctors?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate('/doctors');
    }
  };

  const handleQuickSearch = (suggestion: string) => {
    setSearchQuery(suggestion);
    navigate(`/doctors?search=${encodeURIComponent(suggestion)}`);
  };

  const handleWorkflowClick = (step: number) => {
    switch (step) {
      case 1: // Book
        navigate('/appointment', { state: { returnTo: '/home' } });
        break;
      case 2: // Consult
        navigate('/doctors', { state: { returnTo: '/home' } });
        break;
      case 3: // Get Medicine - Fixed to go to prescriptions
        navigate('/prescriptions', { state: { returnTo: '/home' } });
        break;
      case 4: // Receive Reminders - Fixed to go to medicine reminders
        navigate('/medicine-reminders', { 
          state: { 
            returnTo: '/home', 
            autoEnable: true 
          } 
        });
        break;
      default:
        break;
    }
  };

  const handleSpecialtyClick = (specialty: string) => {
    // Navigate to doctors page with specialty filter and clear any existing search
    navigate('/doctors', { 
      state: { 
        specialty: specialty,
        clearSearch: true 
      } 
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      {/* Hero Banner */}
      <section className="relative bg-gradient-to-r from-blue-600 via-blue-700 to-green-600 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        
        {/* Language Toggle and Logout Buttons */}
        <div className="absolute top-4 right-4 z-10 flex gap-3">
          <Button 
            onClick={() => setLanguageToggle(!languageToggle)}
            className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2"
          >
            <Globe className="w-4 h-4" />
            {languageToggle ? 'తెలుగు' : 'English'}
          </Button>
          <Button 
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2"
          >
            <LogOut className="w-4 h-4" />
            {t('logout')}
          </Button>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 py-16 md:py-24">
          <div className="text-center animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              {t('heroTitle')}
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
              {t('heroSubtitle')}
            </p>
            <Link to="/appointment">
              <Button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 text-xl rounded-full shadow-2xl hover:scale-105 transition-all duration-300">
                <Calendar className="w-6 h-6 mr-3" />
                {t('bookAppointment')}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t('howItWorks')}
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: 1, title: t('workflowSteps.book'), icon: Calendar, desc: 'Schedule appointment with doctor' },
              { step: 2, title: t('workflowSteps.consult'), icon: Stethoscope, desc: 'Video or in-person consultation' },
              { step: 3, title: t('workflowSteps.getMedicine'), icon: Pill, desc: 'Receive prescribed medicines' },
              { step: 4, title: t('workflowSteps.receiveReminders'), icon: MessageCircle, desc: 'Get medication reminders' }
            ].map((item, index) => (
              <div 
                key={index} 
                className="text-center group cursor-pointer"
                onClick={() => handleWorkflowClick(item.step)}
              >
                <div className="relative mb-6">
                  <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center mx-auto shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <item.icon className="w-10 h-10 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {item.step}
                  </div>
                  {index < 3 && (
                    <div className="hidden md:block absolute top-10 left-full w-full">
                      <ArrowRight className="w-8 h-8 text-gray-300 mx-auto" />
                    </div>
                  )}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Search */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <Card className="healthcare-card">
            <CardContent className="p-8">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">{t('findHealthcare')}</h2>
                <p className="text-gray-600">{languageToggle ? 'వ్యాధి, వైద్యుడు లేదా లక్షణాలతో వెతకండి' : 'Search by disease, specialist, or symptoms'}</p>
              </div>
              <div className="flex flex-col md:flex-row gap-4 mb-4">
                <div className="flex-1">
                  <Input
                    type="text"
                    placeholder={t('searchPlaceholder')}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="h-14 text-lg border-2 border-blue-100 focus:border-blue-300 rounded-xl"
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  />
                </div>
                <Button onClick={handleSearch} className="button-primary h-14 px-8 text-lg rounded-xl">
                  <Search className="w-5 h-5 mr-2" />
                  {t('search')}
                </Button>
              </div>
              
              <div className="flex flex-wrap gap-2 justify-center">
                <span className="text-sm text-gray-600 mr-2">{t('quickSearch')}</span>
                {quickSearchSuggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickSearch(suggestion)}
                    className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full hover:bg-blue-200 transition-colors"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Doctor Profiles Section */}
      <section className="py-16 bg-gradient-to-r from-blue-50 to-green-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t('expertDoctors')}
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {doctorProfiles.map((doctor, index) => (
              <Card key={index} className="healthcare-card hover:shadow-2xl transition-all duration-300 group">
                <CardContent className="p-6 text-center">
                  <div className="relative mb-6">
                    <img
                      src={doctor.photo}
                      alt={doctor.name}
                      className="w-24 h-24 rounded-full mx-auto object-cover shadow-lg group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                      {doctor.rating} ★
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{doctor.name}</h3>
                  <p className="text-blue-600 font-semibold mb-2">{doctor.specialty}</p>
                  <p className="text-gray-600 text-sm mb-2">{doctor.experience} {t('experience')}</p>
                  <p className="text-gray-600 text-sm mb-2">{doctor.hospital}</p>
                  <div className="bg-gray-50 rounded-lg p-3 mb-4">
                    <p className="text-xs text-gray-600 mb-1">{t('visitingHours')}</p>
                    <p className="text-sm font-medium text-gray-800">{doctor.visitingTime}</p>
                  </div>
                  <Link to="/appointment" state={{ doctor, returnTo: '/home' }}>
                    <Button className="w-full button-primary rounded-xl">
                      <Calendar className="w-4 h-4 mr-2" />
                      {t('bookAppointment')}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Government Schemes Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t('govSchemes')}
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {governmentSchemes.map((scheme, index) => (
              <Card key={index} className="healthcare-card hover:shadow-xl transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                      <Heart className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full font-medium">
                      {scheme.eligibility}
                    </span>
                  </div>
                  <CardTitle className="text-lg text-gray-900">{languageToggle ? scheme.telugu : scheme.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm mb-6">{scheme.description}</p>
                  <Link to="/scheme-details" state={{ scheme: scheme.title }}>
                    <Button className="w-full button-secondary rounded-xl">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      {t('learnMoreApply')}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Food Recommendations Section */}
      <section className="py-16 bg-gradient-to-r from-green-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t('foodRecommendations')}
            </h2>
            <p className="text-xl text-gray-600">
              {t('foodSubtitle')}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-6">
              <Select value={selectedCondition} onValueChange={setSelectedCondition}>
                <SelectTrigger className="w-64 h-12 border-2 border-green-200">
                  <SelectValue placeholder={t('selectCondition')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-conditions">{t('allConditions')}</SelectItem>
                  <SelectItem value="fever">{languageToggle ? 'జ్వరం' : 'Fever'}</SelectItem>
                  <SelectItem value="diabetes">{languageToggle ? 'మధుమేహం' : 'Diabetes'}</SelectItem>
                  <SelectItem value="pregnancy">{languageToggle ? 'గర్భధారణ' : 'Pregnancy'}</SelectItem>
                  <SelectItem value="child-growth">{languageToggle ? 'పిల్లల ఎదుగుదల' : 'Child Growth'}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredRecommendations.map((condition, index) => (
              <Card key={index} className={`healthcare-card hover:shadow-2xl transition-all duration-300 group bg-gradient-to-br ${condition.bgColor} border-2 ${condition.borderColor}`}>
                <CardHeader className="text-center pb-4">
                  <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                      {condition.icon}
                    </div>
                  </div>
                  <CardTitle className="text-xl text-gray-900">
                    {languageToggle ? condition.titleTelugu : condition.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-green-700 mb-2 flex items-center">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      {t('recommended')}
                    </h4>
                    <ul className="space-y-1">
                      {condition.recommendations.do.map((item, idx) => (
                        <li key={idx} className="text-sm text-gray-700 flex items-start">
                          <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-red-700 mb-2 flex items-center">
                      <span className="w-4 h-4 mr-2 text-red-500">❌</span>
                      {t('avoid')}
                    </h4>
                    <ul className="space-y-1">
                      {condition.recommendations.avoid.map((item, idx) => (
                        <li key={idx} className="text-sm text-gray-700 flex items-start">
                          <span className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="bg-white/70 rounded-lg p-3 mt-4">
                    <p className="text-xs text-gray-600 font-medium">
                      {t('healthTip')}
                    </p>
                    <p className="text-sm text-gray-800 mt-1">
                      {condition.recommendations.telugu}
                    </p>
                  </div>
                  
                  <Button className="w-full button-primary mt-4">
                    <ChefHat className="w-4 h-4 mr-2" />
                    {t('moreDietTips')}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {selectedCondition && selectedCondition !== 'all-conditions' && (
            <div className="text-center mt-8">
              <Button 
                onClick={() => setSelectedCondition('')}
                className="button-secondary"
              >
                {t('viewAllConditions')}
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Voice + Text Chatbot Section */}
      <section className="py-16 bg-gradient-to-r from-purple-50 to-pink-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t('healthAssistant')}
            </h2>
            <p className="text-gray-600 text-lg">{t('instantAdvice')}</p>
          </div>
          
          <Card className="healthcare-card max-w-2xl mx-auto">
            <CardContent className="p-8">
              <div className="mb-6">
                <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageCircle className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{t('healthSupport')}</h3>
                <p className="text-gray-600">{t('voiceTextChat')}</p>
                <p className="text-sm text-gray-500 mt-2">✓ Symptoms checker ✓ First aid tips ✓ PHC guidance</p>
              </div>
              
              <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-xl p-8 mb-6">
                <p className="text-gray-500 text-sm mb-2">Rural Health Assistant Integration</p>
                <p className="text-xs text-gray-400">Smart health guidance for rural communities</p>
              </div>
              
              <Link to="/chatbot">
                <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-xl">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  {t('startHealthChat')}
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Google Map Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t('findHospitals')}
            </h2>
          </div>
          
          <Card className="healthcare-card">
            <CardContent className="p-6">
              {/* Google Map Placeholder */}
              <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-xl h-96 flex items-center justify-center mb-6">
                <div className="text-center">
                  <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500 font-medium">Google Maps Integration</p>
                  <p className="text-gray-400 text-sm">Interactive map showing nearby hospitals</p>
                </div>
              </div>
              
              <div className="text-center">
                <Link to="/map">
                  <Button className="button-primary rounded-xl">
                    <MapPin className="w-4 h-4 mr-2" />
                    {t('viewFullMap')}
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Health Statistics */}
      <section className="py-16 bg-gradient-to-r from-blue-50 to-green-50">
        <div className="max-w-7xl mx-auto px-4">
          <Card className="healthcare-card">
            <CardHeader>
              <CardTitle className="text-center text-2xl">{t('healthStats')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Stethoscope className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">500+</h3>
                  <p className="text-gray-600">{t('qualifiedDoctors')}</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Heart className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">50+</h3>
                  <p className="text-gray-600">{t('hospitals')}</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Users className="w-8 h-8 text-purple-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">10K+</h3>
                  <p className="text-gray-600">{t('patientsServed')}</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Star className="w-8 h-8 text-orange-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">4.8</h3>
                  <p className="text-gray-600">{t('averageRating')}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Available Specialties */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <Card className="healthcare-card">
            <CardHeader>
              <CardTitle>{t('medicalSpecialties')}</CardTitle>
              <p className="text-gray-600 text-sm mt-2">{t('clickSpecialty')}</p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
                {telanganaSpecialties.map((specialty, index) => (
                  <button
                    key={index}
                    onClick={() => handleSpecialtyClick(specialty)}
                    className="p-4 bg-gradient-to-r from-blue-50 to-green-50 rounded-xl hover:shadow-lg transition-all duration-300 cursor-pointer text-center hover:scale-105 hover:from-blue-100 hover:to-green-100 border border-gray-200 hover:border-blue-300"
                  >
                    <div className="flex flex-col items-center space-y-2">
                      <Stethoscope className="w-6 h-6 text-blue-600" />
                      <p className="text-sm font-medium text-gray-900">{specialty}</p>
                      <p className="text-xs text-gray-500">{t('viewDoctors')}</p>
                    </div>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Professional Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* About Section */}
            <div>
              <h3 className="text-xl font-bold mb-4">{t('heroTitle')}</h3>
              <p className="text-gray-300 text-sm mb-4">
                {t('aboutDescription')}
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-4">{t('quickLinks')}</h4>
              <ul className="space-y-2">
                <li><Link to="/doctors" className="text-gray-300 hover:text-white transition-colors">{t('findDoctors')}</Link></li>
                <li><Link to="/appointment" className="text-gray-300 hover:text-white transition-colors">{t('bookAppointment')}</Link></li>
                <li><Link to="/medicines" className="text-gray-300 hover:text-white transition-colors">{t('trackMedicines')}</Link></li>
                <li><Link to="/map" className="text-gray-300 hover:text-white transition-colors">{t('hospitalMap')}</Link></li>
              </ul>
            </div>

            {/* Legal Pages */}
            <div>
              <h4 className="text-lg font-semibold mb-4">{t('legal')}</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-300 hover:text-white transition-colors flex items-center">
                    <Info className="w-4 h-4 mr-2" />
                    {t('aboutUs')}
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-white transition-colors flex items-center">
                    <Shield className="w-4 h-4 mr-2" />
                    {t('privacyPolicy')}
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-white transition-colors flex items-center">
                    <FileText className="w-4 h-4 mr-2" />
                    {t('termsOfService')}
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-white transition-colors flex items-center">
                    <Phone className="w-4 h-4 mr-2" />
                    {t('contact')}
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact & Social */}
            <div>
              <h4 className="text-lg font-semibold mb-4">{t('contactUs')}</h4>
              <div className="space-y-3 mb-6">
                <div className="flex items-center">
                  <Phone className="w-4 h-4 mr-3 text-blue-400" />
                  <span className="text-gray-300">+91 180 123 4567</span>
                </div>
                <div className="flex items-center">
                  <Mail className="w-4 h-4 mr-3 text-blue-400" />
                  <span className="text-gray-300">help@ruralhealthconnect.in</span>
                </div>
              </div>
              
              <div>
                <h5 className="font-semibold mb-3">{t('followUs')}</h5>
                <div className="flex space-x-3">
                  <a href="#" className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors">
                    <Facebook className="w-5 h-5" />
                  </a>
                  <a href="#" className="w-10 h-10 bg-blue-400 rounded-full flex items-center justify-center hover:bg-blue-500 transition-colors">
                    <Twitter className="w-5 h-5" />
                  </a>
                  <a href="#" className="w-10 h-10 bg-pink-600 rounded-full flex items-center justify-center hover:bg-pink-700 transition-colors">
                    <Instagram className="w-5 h-5" />
                  </a>
                  <a href="#" className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center hover:bg-red-700 transition-colors">
                    <Youtube className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-700 pt-8 text-center">
            <p className="text-gray-400 text-sm">
              {t('allRightsReserved')}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
