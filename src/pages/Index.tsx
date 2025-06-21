
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Calendar, MessageCircle, Pill, MapPin, Stethoscope, Clock, Star, Users, Heart, Home, User, ArrowRight, CheckCircle, Phone, Mail, Facebook, Twitter, Instagram, Youtube, Shield, FileText, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { commonDiseases, telanganaSpecialties } from '@/data/telanganaData';

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

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
      title: 'KCR Kits for Pregnant Women',
      description: 'Free nutritional kits and medical support for expecting mothers',
      eligibility: 'Pregnant women',
      telugu: 'గర్భిణీ మహిళలకు KCR కిట్స్'
    },
    {
      title: 'Free Medicine Scheme',
      description: 'Essential medicines available free at government hospitals',
      eligibility: 'All citizens',
      telugu: 'ఉచిత మందుల పథకం'
    }
  ];

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

  const handleStepClick = (stepNumber: number) => {
    switch (stepNumber) {
      case 1: // Book
        navigate('/appointment');
        break;
      case 2: // Consult
        navigate('/doctors');
        break;
      case 3: // Get Medicine
        navigate('/prescriptions');
        break;
      case 4: // Receive Reminders
        navigate('/medicine-reminders');
        break;
      default:
        break;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      {/* Hero Banner */}
      <section className="relative bg-gradient-to-r from-blue-600 via-blue-700 to-green-600 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-16 md:py-24">
          <div className="text-center animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Rural Health Connect
              <br />
              <span className="text-2xl md:text-3xl text-blue-100">గ్రామీణ ఆరోగ్య కనెక్ట్</span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Complete healthcare solution for rural Telangana
              <br />
              <span className="text-lg">తెలంగాణ గ్రామీణ ప్రాంతాలకు పూర్తి ఆరోగ్య సేవలు</span>
            </p>
            <Link to="/appointment">
              <Button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 text-xl rounded-full shadow-2xl hover:scale-105 transition-all duration-300">
                <Calendar className="w-6 h-6 mr-3" />
                Book Appointment Now
                <br />
                <span className="text-sm">ఇప్పుడే అపాయింట్మెంట్ బుక్ చేయండి</span>
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
              How It Works
              <br />
              <span className="text-xl text-gray-600">ఇది ఎలా పనిచేస్తుంది</span>
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: 1, title: 'Book', telugu: 'బుక్ చేయండి', icon: Calendar, desc: 'Schedule appointment with doctor' },
              { step: 2, title: 'Consult', telugu: 'సంప్రదించండి', icon: Stethoscope, desc: 'Video or in-person consultation' },
              { step: 3, title: 'Get Medicine', telugu: 'మందులు తీసుకోండి', icon: Pill, desc: 'Receive prescribed medicines' },
              { step: 4, title: 'Receive Reminders', telugu: 'రిమైండర్లు పొందండి', icon: MessageCircle, desc: 'Get medication reminders' }
            ].map((item, index) => (
              <div 
                key={index} 
                className="text-center group cursor-pointer"
                onClick={() => handleStepClick(item.step)}
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
                <p className="text-blue-600 font-medium mb-2">{item.telugu}</p>
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
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">Find Healthcare Near You</h2>
                <p className="text-gray-600">Search by disease, specialist, or symptoms (వ్యాధి, వైద్యుడు లేదా లక్షణాలతో వెతకండి)</p>
              </div>
              <div className="flex flex-col md:flex-row gap-4 mb-4">
                <div className="flex-1">
                  <Input
                    type="text"
                    placeholder="Search by disease or specialist (వ్యాధి లేదా స్పెషలిస్ట్ వెతకండి)..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="h-14 text-lg border-2 border-blue-100 focus:border-blue-300 rounded-xl"
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  />
                </div>
                <Button onClick={handleSearch} className="button-primary h-14 px-8 text-lg rounded-xl">
                  <Search className="w-5 h-5 mr-2" />
                  Search
                </Button>
              </div>
              
              <div className="flex flex-wrap gap-2 justify-center">
                <span className="text-sm text-gray-600 mr-2">Quick search:</span>
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
              Our Expert Doctors
              <br />
              <span className="text-xl text-gray-600">మా నిపుణ వైద్యులు</span>
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
                  <p className="text-gray-600 text-sm mb-2">{doctor.experience} experience</p>
                  <p className="text-gray-600 text-sm mb-2">{doctor.hospital}</p>
                  <div className="bg-gray-50 rounded-lg p-3 mb-4">
                    <p className="text-xs text-gray-600 mb-1">Visiting Hours:</p>
                    <p className="text-sm font-medium text-gray-800">{doctor.visitingTime}</p>
                  </div>
                  <Link to="/appointment" state={{ doctor, returnTo: '/' }}>
                    <Button className="w-full button-primary rounded-xl">
                      <Calendar className="w-4 h-4 mr-2" />
                      Book Appointment
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
              Government Health Schemes
              <br />
              <span className="text-xl text-gray-600">ప్రభుత్వ ఆరోగ్య పథకాలు</span>
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
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
            ].map((scheme, index) => (
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
                  <CardTitle className="text-lg text-gray-900">{scheme.title}</CardTitle>
                  <p className="text-blue-600 font-medium text-sm">{scheme.telugu}</p>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm mb-6">{scheme.description}</p>
                  <Link to="/scheme-details" state={{ scheme: scheme.title }}>
                    <Button className="w-full button-secondary rounded-xl">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Learn More & Apply
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Voice + Text Chatbot Section */}
      <section className="py-16 bg-gradient-to-r from-purple-50 to-pink-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Rural Health Assistant
              <br />
              <span className="text-xl text-gray-600">గ్రామీణ ఆరోగ్య సహాయకుడు</span>
            </h2>
            <p className="text-gray-600 text-lg">Get instant health advice in Telugu and English</p>
          </div>
          
          <Card className="healthcare-card max-w-2xl mx-auto">
            <CardContent className="p-8">
              <div className="mb-6">
                <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageCircle className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">24/7 Health Support</h3>
                <p className="text-gray-600">Voice and text chat in your language</p>
                <p className="text-sm text-gray-500 mt-2">✓ Symptoms checker ✓ First aid tips ✓ PHC guidance</p>
              </div>
              
              <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-xl p-8 mb-6">
                <p className="text-gray-500 text-sm mb-2">Rural Health Assistant Integration</p>
                <p className="text-xs text-gray-400">Smart health guidance for rural communities</p>
              </div>
              
              <Link to="/chatbot">
                <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-xl">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Start Health Chat / ఆరోగ్య చాట్ ప్రారంభించండి
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
              Find Hospitals Near You
              <br />
              <span className="text-xl text-gray-600">మీ దగ్గర ఆసుపత్రులను కనుగొనండి</span>
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
                    View Full Map / పూర్తి మ్యాప్ చూడండి
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
              <CardTitle className="text-center text-2xl">Telangana Healthcare Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Stethoscope className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">500+</h3>
                  <p className="text-gray-600">Qualified Doctors</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Heart className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">50+</h3>
                  <p className="text-gray-600">Hospitals</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Users className="w-8 h-8 text-purple-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">10K+</h3>
                  <p className="text-gray-600">Patients Served</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Star className="w-8 h-8 text-orange-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">4.8</h3>
                  <p className="text-gray-600">Average Rating</p>
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
              <CardTitle>Available Medical Specialties in Telangana</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
                {telanganaSpecialties.map((specialty, index) => (
                  <button
                    key={index}
                    onClick={() => navigate('/doctors', { state: { specialty } })}
                    className="p-3 bg-gradient-to-r from-blue-50 to-green-50 rounded-xl hover:shadow-md transition-shadow cursor-pointer text-center hover:scale-105 duration-300"
                  >
                    <p className="text-sm font-medium text-gray-900">{specialty}</p>
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
              <h3 className="text-xl font-bold mb-4">Rural Health Connect</h3>
              <p className="text-gray-300 text-sm mb-4">
                Providing comprehensive healthcare solutions for rural Telangana communities.
              </p>
              <p className="text-gray-300 text-sm">
                గ్రామీణ తెలంగాణ కమ్యూనిటీలకు సమగ్ర ఆరోగ్య సేవలు అందిస్తోంది.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><Link to="/doctors" className="text-gray-300 hover:text-white transition-colors">Find Doctors</Link></li>
                <li><Link to="/appointment" className="text-gray-300 hover:text-white transition-colors">Book Appointment</Link></li>
                <li><Link to="/medicines" className="text-gray-300 hover:text-white transition-colors">Track Medicines</Link></li>
                <li><Link to="/map" className="text-gray-300 hover:text-white transition-colors">Hospital Map</Link></li>
              </ul>
            </div>

            {/* Legal Pages */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-300 hover:text-white transition-colors flex items-center">
                    <Info className="w-4 h-4 mr-2" />
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-white transition-colors flex items-center">
                    <Shield className="w-4 h-4 mr-2" />
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-white transition-colors flex items-center">
                    <FileText className="w-4 h-4 mr-2" />
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-white transition-colors flex items-center">
                    <Phone className="w-4 h-4 mr-2" />
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact & Social */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
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
                <h5 className="font-semibold mb-3">Follow Us</h5>
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
              © 2024 Rural Health Connect. All rights reserved. | Made with ❤️ for rural Telangana
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
