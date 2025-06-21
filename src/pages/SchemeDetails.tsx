
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowLeft, FileText, CheckCircle, Users, Heart, Phone, Mail, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const SchemeDetails = () => {
  const location = useLocation();
  const schemeName = location.state?.scheme || 'Health Scheme';

  const schemeData = {
    'Arogya Sri Health Insurance': {
      title: 'Arogya Sri Health Insurance',
      telugu: 'ఆరోగ్య శ్రీ ఆరోగ్య భీమా',
      description: 'Free health insurance coverage up to ₹5 lakhs for eligible families under the state government health insurance scheme.',
      benefits: [
        'Free treatment up to ₹5 lakhs per family per year',
        'Covers over 1,500 medical procedures',
        'No age limit for family members',
        'Cashless treatment at empaneled hospitals',
        'Pre and post hospitalization coverage'
      ],
      eligibility: [
        'BPL (Below Poverty Line) families',
        'Annual income less than ₹5 lakhs',
        'Families with white ration card',
        'SC/ST families automatically eligible'
      ],
      documents: [
        'Ration Card',
        'Income Certificate',
        'Aadhar Card of all family members',
        'Bank Account Details',
        'Passport size photographs'
      ],
      applicationProcess: [
        'Visit nearest Mee Seva center',
        'Fill application form with required documents',
        'Biometric verification of family members',
        'Pay processing fee (if applicable)',
        'Receive insurance card within 15 days'
      ]
    },
    'Mother & Child Care Kit Scheme': {
      title: 'Mother & Child Care Kit Scheme',
      telugu: 'తల్లి మరియు శిశు సంరక్షణ కిట్ పథకం',
      description: 'Free nutritional kits and medical support for expecting mothers and newborns to ensure healthy pregnancy and child development.',
      benefits: [
        'Free nutrition kit worth ₹12,000',
        'Regular health checkups during pregnancy',
        'Free delivery at government hospitals',
        'Post-delivery care for mother and child',
        'Vaccination support for newborns'
      ],
      eligibility: [
        'Pregnant women of all income groups',
        'First two pregnancies covered',
        'Regular antenatal checkups mandatory',
        'Delivery must be in government hospital'
      ],
      documents: [
        'Pregnancy confirmation certificate',
        'Aadhar Card',
        'Bank Account Details',
        'Previous pregnancy records (if any)',
        'Address proof'
      ],
      applicationProcess: [
        'Register at nearest PHC or CHC',
        'Complete antenatal registration',
        'Attend regular checkups as scheduled',
        'Kit will be provided during 7th month',
        'Complete delivery at registered hospital'
      ]
    },
    'Free Medicine Scheme': {
      title: 'Free Medicine Scheme',
      telugu: 'ఉచిత మందుల పథకం',
      description: 'Essential medicines available free of cost at all government hospitals and primary health centers across the state.',
      benefits: [
        'Over 600 essential medicines available free',
        'No cost for prescribed medicines',
        'Available at all government hospitals',
        'Quality assured medicines',
        'Special provisions for chronic diseases'
      ],
      eligibility: [
        'All citizens can avail this scheme',
        'Valid prescription from government doctor required',
        'Treatment at government healthcare facilities',
        'No income restrictions'
      ],
      documents: [
        'Valid prescription from government doctor',
        'Patient identity proof',
        'Previous medical records (if any)'
      ],
      applicationProcess: [
        'Visit government hospital/PHC',
        'Consult with doctor and get prescription',
        'Collect medicines from hospital pharmacy',
        'No separate application required',
        'Show prescription and identity proof'
      ]
    }
  };

  const currentScheme = schemeData[schemeName] || schemeData['Arogya Sri Health Insurance'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      <header className="bg-white shadow-sm border-b border-blue-100">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center space-x-4">
            <Link to="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-xl font-bold text-gray-900">{currentScheme.title}</h1>
              <p className="text-sm text-blue-600">{currentScheme.telugu}</p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Scheme Overview */}
        <Card className="healthcare-card mb-6">
          <CardHeader>
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-2xl">{currentScheme.title}</CardTitle>
                <p className="text-blue-600 font-medium">{currentScheme.telugu}</p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 text-lg leading-relaxed">{currentScheme.description}</p>
          </CardContent>
        </Card>

        {/* Benefits */}
        <Card className="healthcare-card mb-6">
          <CardHeader>
            <CardTitle className="flex items-center">
              <CheckCircle className="w-5 h-5 mr-2 text-green-600" />
              Key Benefits
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {currentScheme.benefits.map((benefit, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">{benefit}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Eligibility */}
        <Card className="healthcare-card mb-6">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="w-5 h-5 mr-2 text-blue-600" />
              Eligibility Criteria
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {currentScheme.eligibility.map((criteria, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-700">{criteria}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Required Documents */}
        <Card className="healthcare-card mb-6">
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="w-5 h-5 mr-2 text-purple-600" />
              Required Documents
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {currentScheme.documents.map((document, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <FileText className="w-4 h-4 text-purple-600" />
                  <span className="text-gray-700">{document}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Application Process */}
        <Card className="healthcare-card mb-6">
          <CardHeader>
            <CardTitle>How to Apply</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {currentScheme.applicationProcess.map((step, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                    {index + 1}
                  </div>
                  <p className="text-gray-700 pt-1">{step}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card className="healthcare-card mb-6">
          <CardHeader>
            <CardTitle>Need Help?</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-3 p-4 bg-blue-50 rounded-lg">
                <Phone className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="font-medium text-gray-900">Helpline</p>
                  <p className="text-blue-600">104 (Toll Free)</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-4 bg-green-50 rounded-lg">
                <Mail className="w-5 h-5 text-green-600" />
                <div>
                  <p className="font-medium text-gray-900">Email Support</p>
                  <p className="text-green-600">schemes@telangana.gov.in</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Apply Now Section */}
        <Card className="healthcare-card">
          <CardContent className="p-6 text-center">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Ready to Apply?</h3>
            <p className="text-gray-600 mb-6">Visit your nearest government health center or Mee Seva center to start your application.</p>
            <div className="space-y-3">
              <Button className="w-full md:w-auto button-primary">
                <ExternalLink className="w-4 h-4 mr-2" />
                Find Nearest Center
              </Button>
              <div className="flex flex-col md:flex-row gap-2 md:gap-4 justify-center">
                <Button variant="outline" className="w-full md:w-auto">
                  <Phone className="w-4 h-4 mr-2" />
                  Call Helpline
                </Button>
                <Button variant="outline" className="w-full md:w-auto">
                  <FileText className="w-4 h-4 mr-2" />
                  Download Form
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SchemeDetails;
