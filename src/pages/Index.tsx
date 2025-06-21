import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Calendar, MessageCircle, Pill, MapPin, Stethoscope, ArrowRight, CheckCircle, Phone, Mail, Facebook, Twitter, Instagram, Youtube, Shield, FileText, Info, Apple, Droplets, Baby, ChefHat, LogOut, Globe, Star, Users, Heart, Clock, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { telanganaSpecialties } from '@/data/telanganaData';
import { useLanguage } from '@/contexts/LanguageContext';
import { commonTranslations, homeTranslations } from '@/data/translations';

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCondition, setSelectedCondition] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [searchSuggestions, setSearchSuggestions] = useState<any[]>([]);
  const navigate = useNavigate();
  const { language, toggleLanguage, t } = useLanguage();

  // Mock data for search suggestions
  const mockSearchData = [
    {
      type: 'doctor',
      name: 'Dr. Rajesh Kumar',
      specialty: 'Cardiologist',
      hospital: 'NIMS Hospital',
      rating: 4.8,
      available: 'Available Today'
    },
    {
      type: 'doctor',
      name: 'Dr. Priya Sharma',
      specialty: 'Pediatrician',
      hospital: 'Apollo Hospital',
      rating: 4.9,
      available: 'Available Today'
    },
    {
      type: 'specialty',
      name: 'General Medicine',
      doctorCount: 15,
      description: 'Primary healthcare services'
    },
    {
      type: 'specialty',
      name: 'Cardiology',
      doctorCount: 8,
      description: 'Heart and cardiovascular care'
    },
    {
      type: 'condition',
      name: 'Fever',
      nameTelugu: 'జ్వరం',
      type_label: 'Common Condition'
    },
    {
      type: 'condition',
      name: 'Diabetes',
      nameTelugu: 'మధుమేహం',
      type_label: 'Chronic Condition'
    },
    {
      type: 'hospital',
      name: 'Gandhi Hospital',
      location: 'Secunderabad',
      type_label: 'Government Hospital'
    }
  ];

  // Filter suggestions based on search query
  useEffect(() => {
    if (searchQuery.trim().length > 1) {
      const filtered = mockSearchData.filter(item => {
        const searchLower = searchQuery.toLowerCase();
        return (
          item.name.toLowerCase().includes(searchLower) ||
          (item.specialty && item.specialty.toLowerCase().includes(searchLower)) ||
          (item.description && item.description.toLowerCase().includes(searchLower)) ||
          (item.nameTelugu && item.nameTelugu.includes(searchQuery))
        );
      });
      setSearchSuggestions(filtered.slice(0, 5)); // Show max 5 suggestions
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
      setSearchSuggestions([]);
    }
  }, [searchQuery]);

  const handleLogout = () => {
    // Clear any stored authentication data
    localStorage.removeItem('auth-session');
    // Navigate to login page
    navigate('/');
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
      iconType: 'droplets',
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
      iconType: 'apple',
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
      iconType: 'heart',
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
      iconType: 'baby',
      recommendations: {
        do: ['Protein-rich diet: Eggs, dal', 'Milk & fruits daily', 'Variety of vegetables'],
        avoid: ['Junk food', 'Excess sugar', 'Carbonated drinks'],
        telugu: 'పిల్లల ఆరోగ్యానికి పోషకాహారం అవసరం'
      },
      bgColor: 'from-blue-50 to-cyan-50',
      borderColor: 'border-blue-200'
    }
  ];

  // Helper function to render icons based on type
  const renderIcon = (iconType: string) => {
    const iconProps = { className: "w-8 h-8" };
    switch (iconType) {
      case 'droplets':
        return <Droplets {...iconProps} className="w-8 h-8 text-red-500" />;
      case 'apple':
        return <Apple {...iconProps} className="w-8 h-8 text-green-500" />;
      case 'heart':
        return <Heart {...iconProps} className="w-8 h-8 text-pink-500" />;
      case 'baby':
        return <Baby {...iconProps} className="w-8 h-8 text-blue-500" />;
      default:
        return <Heart {...iconProps} className="w-8 h-8 text-gray-500" />;
    }
  };

  const filteredRecommendations = selectedCondition && selectedCondition !== 'all-conditions'
    ? foodRecommendations.filter(rec => rec.id === selectedCondition)
    : foodRecommendations;

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/doctors?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate('/doctors');
    }
    setShowSuggestions(false);
  };

  const handleSuggestionClick = (suggestion: any) => {
    if (suggestion.type === 'doctor') {
      navigate(`/doctors?search=${encodeURIComponent(suggestion.name)}`);
    } else if (suggestion.type === 'specialty') {
      navigate('/doctors', { state: { specialty: suggestion.name } });
    } else if (suggestion.type === 'condition' || suggestion.type === 'hospital') {
      navigate(`/doctors?search=${encodeURIComponent(suggestion.name)}`);
    }
    setSearchQuery('');
    setShowSuggestions(false);
  };

  const handleQuickSearch = (suggestion: string) => {
    setSearchQuery(suggestion);
    navigate(`/doctors?search=${encodeURIComponent(suggestion)}`);
  };

  const renderSuggestionIcon = (type: string) => {
    switch (type) {
      case 'doctor':
        return <User className="w-4 h-4 text-blue-600" />;
      case 'specialty':
        return <Stethoscope className="w-4 h-4 text-green-600" />;
      case 'condition':
        return <Heart className="w-4 h-4 text-red-600" />;
      case 'hospital':
        return <MapPin className="w-4 h-4 text-purple-600" />;
      default:
        return <Search className="w-4 h-4 text-gray-600" />;
    }
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

  const handleMoreDietTips = (condition: any) => {
    // Create a serializable version of condition without React components
    const serializableCondition = {
      id: condition.id,
      title: condition.title,
      titleTelugu: condition.titleTelugu,
      iconType: condition.iconType,
      recommendations: condition.recommendations,
      bgColor: condition.bgColor,
      borderColor: condition.borderColor
    };
    navigate('/diet-tips', { state: { condition: serializableCondition } });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      {/* Hero Banner */}
      <section className="relative bg-gradient-to-r from-blue-600 via-blue-700 to-green-600 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        
        {/* Enhanced Language Toggle and Logout Buttons */}
        <div className="absolute top-4 right-4 z-10 flex gap-3">
          <Button 
            onClick={toggleLanguage}
            className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 font-semibold transition-all duration-300 hover:scale-105"
          >
            <Globe className="w-5 h-5" />
            <span className="hidden sm:inline">
              {t('languageToggle', commonTranslations)}
            </span>
            <span className="sm:hidden">
              {language === 'en' ? 'EN' : 'తె'}
            </span>
          </Button>
          <Button 
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-2 transition-all duration-300 hover:scale-105"
          >
            <LogOut className="w-5 h-5" />
            <span className="hidden sm:inline">
              {t('logout', commonTranslations)}
            </span>
          </Button>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 py-16 md:py-24">
          <div className="text-center animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              {t('heroTitle', homeTranslations)}
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
              {t('heroSubtitle', homeTranslations)}
            </p>
            <Link to="/appointment">
              <Button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 text-xl rounded-full shadow-2xl hover:scale-105 transition-all duration-300">
                <Calendar className="w-6 h-6 mr-3" />
                {t('bookAppointment', commonTranslations)}
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
              {t('howItWorks', homeTranslations)}
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: 1, title: t('workflowSteps.book', homeTranslations), icon: Calendar, desc: 'Schedule appointment with doctor' },
              { step: 2, title: t('workflowSteps.consult', homeTranslations), icon: Stethoscope, desc: 'Video or in-person consultation' },
              { step: 3, title: t('workflowSteps.getMedicine', homeTranslations), icon: Pill, desc: 'Receive prescribed medicines' },
              { step: 4, title: t('workflowSteps.receiveReminders', homeTranslations), icon: MessageCircle, desc: 'Get medication reminders' }
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

      {/* Enhanced Main Search Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <Card className="healthcare-card">
            <CardContent className="p-8">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">{t('findHealthcare', homeTranslations)}</h2>
                <p className="text-gray-600">{language === 'te' ? 'వ్యాధి, వైద్యుడు లేదా లక్షణాలతో వెతకండి' : 'Search by disease, specialist, or symptoms'}</p>
              </div>
              
              <div className="relative">
                <div className="flex flex-col md:flex-row gap-4 mb-4">
                  <div className="flex-1 relative">
                    <Input
                      type="text"
                      placeholder={t('searchPlaceholder', homeTranslations)}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="h-14 text-lg border-2 border-blue-100 focus:border-blue-300 rounded-xl pr-4"
                      onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                      onFocus={() => searchQuery.length > 1 && setShowSuggestions(true)}
                      onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                    />
                    
                    {/* Search Suggestions Dropdown */}
                    {showSuggestions && searchSuggestions.length > 0 && (
                      <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg z-50 max-h-80 overflow-y-auto">
                        {searchSuggestions.map((suggestion, index) => (
                          <div
                            key={index}
                            className="p-4 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0 transition-colors"
                            onClick={() => handleSuggestionClick(suggestion)}
                          >
                            <div className="flex items-center space-x-3">
                              {renderSuggestionIcon(suggestion.type)}
                              <div className="flex-1">
                                <div className="flex items-center justify-between">
                                  <h4 className="font-medium text-gray-900">{suggestion.name}</h4>
                                  {suggestion.rating && (
                                    <div className="flex items-center space-x-1">
                                      <Star className="w-4 h-4 text-yellow-500" />
                                      <span className="text-sm text-gray-600">{suggestion.rating}</span>
                                    </div>
                                  )}
                                </div>
                                {suggestion.specialty && (
                                  <p className="text-sm text-blue-600">{suggestion.specialty}</p>
                                )}
                                {suggestion.hospital && (
                                  <p className="text-sm text-gray-600">{suggestion.hospital}</p>
                                )}
                                {suggestion.description && (
                                  <p className="text-sm text-gray-600">{suggestion.description}</p>
                                )}
                                {suggestion.doctorCount && (
                                  <p className="text-sm text-gray-600">{suggestion.doctorCount} doctors available</p>
                                )}
                                {suggestion.location && (
                                  <p className="text-sm text-gray-600">{suggestion.location}</p>
                                )}
                                {suggestion.available && (
                                  <div className="flex items-center space-x-1 mt-1">
                                    <Clock className="w-3 h-3 text-green-500" />
                                    <span className="text-xs text-green-600">{suggestion.available}</span>
                                  </div>
                                )}
                                {suggestion.type_label && (
                                  <span className="inline-block mt-1 px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                                    {suggestion.type_label}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <Button onClick={handleSearch} className="button-primary h-14 px-8 text-lg rounded-xl">
                    <Search className="w-5 h-5 mr-2" />
                    {t('search', commonTranslations)}
                  </Button>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2 justify-center">
                <span className="text-sm text-gray-600 mr-2">{t('quickSearch', homeTranslations)}</span>
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
              {t('expertDoctors', homeTranslations) || 'Our Expert Doctors'}
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
                  <p className="text-gray-600 text-sm mb-2">{doctor.experience} {t('experience', homeTranslations)}</p>
                  <p className="text-gray-600 text-sm mb-2">{doctor.hospital}</p>
                  <div className="bg-gray-50 rounded-lg p-3 mb-4">
                    <p className="text-xs text-gray-600 mb-1">{t('visitingHours', homeTranslations)}</p>
                    <p className="text-sm font-medium text-gray-800">{doctor.visitingTime}</p>
                  </div>
                  <Link to="/appointment" state={{ doctor, returnTo: '/home' }}>
                    <Button className="w-full button-primary rounded-xl">
                      <Calendar className="w-4 h-4 mr-2" />
                      {t('bookAppointment', commonTranslations)}
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
              {t('govSchemes', homeTranslations) || 'Government Health Schemes'}
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
                  <CardTitle className="text-lg text-gray-900">{language === 'te' ? scheme.telugu : scheme.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm mb-6">{scheme.description}</p>
                  <Link to="/scheme-details" state={{ scheme: scheme.title }}>
                    <Button className="w-full button-secondary rounded-xl">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      {t('learnMoreApply', homeTranslations) || 'Learn More & Apply'}
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
              {t('foodRecommendations', homeTranslations)}
            </h2>
            <p className="text-xl text-gray-600">
              {t('foodSubtitle', homeTranslations)}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-6">
              <Select value={selectedCondition} onValueChange={setSelectedCondition}>
                <SelectTrigger className="w-64 h-12 border-2 border-green-200">
                  <SelectValue placeholder={t('selectCondition', homeTranslations)} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-conditions">{t('allConditions', homeTranslations)}</SelectItem>
                  <SelectItem value="fever">{language === 'te' ? 'జ్వరం' : 'Fever'}</SelectItem>
                  <SelectItem value="diabetes">{language === 'te' ? 'మధుమేహం' : 'Diabetes'}</SelectItem>
                  <SelectItem value="pregnancy">{language === 'te' ? 'గర్భధారణ' : 'Pregnancy'}</SelectItem>
                  <SelectItem value="child-growth">{language === 'te' ? 'పిల్లల ఎదుగుదల' : 'Child Growth'}</SelectItem>
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
                      {renderIcon(condition.iconType)}
                    </div>
                  </div>
                  <CardTitle className="text-xl text-gray-900">
                    {language === 'te' ? condition.titleTelugu : condition.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-green-700 mb-2 flex items-center">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      {t('recommended', homeTranslations)}
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
                      {t('avoid', homeTranslations)}
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
                      {t('healthTip', homeTranslations)}
                    </p>
                    <p className="text-sm text-gray-800 mt-1">
                      {condition.recommendations.telugu}
                    </p>
                  </div>
                  
                  <Button 
                    onClick={() => handleMoreDietTips(condition)}
                    className="w-full button-primary mt-4"
                  >
                    <ChefHat className="w-4 h-4 mr-2" />
                    {t('moreDietTips', homeTranslations)}
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
                {t('viewAllConditions', homeTranslations)}
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
              {t('healthAssistant', homeTranslations) || 'Rural Health Assistant'}
            </h2>
            <p className="text-gray-600 text-lg">{t('instantAdvice', homeTranslations) || 'Get instant health advice in Telugu and English'}</p>
          </div>
          
          <Card className="healthcare-card max-w-2xl mx-auto">
            <CardContent className="p-8">
              <div className="mb-6">
                <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageCircle className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{t('healthSupport', homeTranslations) || '24/7 Health Support'}</h3>
                <p className="text-gray-600">{t('voiceTextChat', homeTranslations) || 'Voice and text chat in your language'}</p>
                <p className="text-sm text-gray-500 mt-2">✓ Symptoms checker ✓ First aid tips ✓ PHC guidance</p>
              </div>
              
              <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-xl p-8 mb-6">
                <p className="text-gray-500 text-sm mb-2">Rural Health Assistant Integration</p>
                <p className="text-xs text-gray-400">Smart health guidance for rural communities</p>
              </div>
              
              <Link to="/chatbot">
                <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-xl">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  {t('startHealthChat', homeTranslations) || 'Start Health Chat'}
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
              {t('findHospitals', homeTranslations) || 'Find Hospitals Near You'}
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
                    {t('viewFullMap', homeTranslations) || 'View Full Map'}
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
              <CardTitle className="text-center text-2xl">{t('healthStats', homeTranslations) || 'Telangana Healthcare Statistics'}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Stethoscope className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">500+</h3>
                  <p className="text-gray-600">{t('qualifiedDoctors', homeTranslations) || 'Qualified Doctors'}</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Heart className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">50+</h3>
                  <p className="text-gray-600">{t('hospitals', homeTranslations) || 'Hospitals'}</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Users className="w-8 h-8 text-purple-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">10K+</h3>
                  <p className="text-gray-600">{t('patientsServed', homeTranslations) || 'Patients Served'}</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Star className="w-8 h-8 text-orange-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">4.8</h3>
                  <p className="text-gray-600">{t('averageRating', homeTranslations) || 'Average Rating'}</p>
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
              <CardTitle>{t('medicalSpecialties', homeTranslations) || 'Available Medical Specialties in Telangana'}</CardTitle>
              <p className="text-gray-600 text-sm mt-2">{t('clickSpecialty', homeTranslations) || 'Click on any specialty to find doctors in that field'}</p>
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
                      <p className="text-xs text-gray-500">{t('viewDoctors', homeTranslations) || 'View Doctors'}</p>
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
              <h3 className="text-xl font-bold mb-4">{t('heroTitle', homeTranslations)}</h3>
              <p className="text-gray-300 text-sm mb-4">
                {t('aboutDescription', homeTranslations)}
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-4">{t('quickLinks', homeTranslations)}</h4>
              <ul className="space-y-2">
                <li><Link to="/doctors" className="text-gray-300 hover:text-white transition-colors">{t('findDoctors', commonTranslations)}</Link></li>
                <li><Link to="/appointment" className="text-gray-300 hover:text-white transition-colors">{t('bookAppointment', commonTranslations)}</Link></li>
                <li><Link to="/medicines" className="text-gray-300 hover:text-white transition-colors">{t('medicines', commonTranslations)}</Link></li>
                <li><Link to="/map" className="text-gray-300 hover:text-white transition-colors">{t('map', commonTranslations)}</Link></li>
              </ul>
            </div>

            {/* Legal Pages */}
            <div>
              <h4 className="text-lg font-semibold mb-4">{t('legal', commonTranslations)}</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-300 hover:text-white transition-colors flex items-center">
                    <Info className="w-4 h-4 mr-2" />
                    {t('aboutUs', commonTranslations)}
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-white transition-colors flex items-center">
                    <Shield className="w-4 h-4 mr-2" />
                    {t('privacyPolicy', commonTranslations)}
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-white transition-colors flex items-center">
                    <FileText className="w-4 h-4 mr-2" />
                    {t('termsOfService', commonTranslations)}
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-white transition-colors flex items-center">
                    <Phone className="w-4 h-4 mr-2" />
                    {t('contact', commonTranslations)}
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact & Social */}
            <div>
              <h4 className="text-lg font-semibold mb-4">{t('contactUs', commonTranslations)}</h4>
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
                <h5 className="font-semibold mb-3">{t('followUs', commonTranslations)}</h5>
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
              {t('allRightsReserved', homeTranslations)}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
