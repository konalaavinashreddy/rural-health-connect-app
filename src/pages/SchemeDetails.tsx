
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowLeft, FileText, CheckCircle, Users, Heart, Phone, Mail, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { commonTranslations } from '@/data/translations';

const SchemeDetails = () => {
  const location = useLocation();
  const { t, language } = useLanguage();
  const schemeName = location.state?.scheme || 'Arogya Sri Health Insurance';

  const schemeTranslations = {
    // Page titles and headers
    schemeDetails: {
      en: "Scheme Details",
      te: "పథక వివరాలు"
    },
    keyBenefits: {
      en: "Key Benefits",
      te: "ముఖ్య లాభాలు"
    },
    eligibilityCriteria: {
      en: "Eligibility Criteria",
      te: "అర్హత ప్రమాణాలు"
    },
    requiredDocuments: {
      en: "Required Documents",
      te: "అవసరమైన పత్రాలు"
    },
    howToApply: {
      en: "How to Apply",
      te: "ఎలా దరఖాస్తు చేయాలి"
    },
    needHelp: {
      en: "Need Help?",
      te: "సహాయం కావాలా?"
    },
    helpline: {
      en: "Helpline",
      te: "హెల్ప్‌లైన్"
    },
    emailSupport: {
      en: "Email Support",
      te: "ఇమెయిల్ మద్దతు"
    },
    readyToApply: {
      en: "Ready to Apply?",
      te: "దరఖాస్తు చేయడానికి సిద్ధంగా ఉన్నారా?"
    },
    visitNearestCenter: {
      en: "Visit your nearest government health center or Mee Seva center to start your application.",
      te: "మీ దరఖాస్తును ప్రారంభించడానికి మీ సమీపంలోని ప్రభుత్వ ఆరోగ్య కేంద్రం లేదా మీ సేవ కేంద్రాన్ని సందర్శించండి."
    },
    findNearestCenter: {
      en: "Find Nearest Center",
      te: "సమీప కేంద్రాన్ని కనుగొనండి"
    },
    callHelpline: {
      en: "Call Helpline",
      te: "హెల్ప్‌లైన్‌కు కాల్ చేయండి"
    },
    downloadForm: {
      en: "Download Form",
      te: "ఫారమ్ డౌన్‌లోడ్ చేయండి"
    },
    tollFree: {
      en: "Toll Free",
      te: "టోల్ ఫ్రీ"
    }
  };

  const schemeData = {
    'Arogya Sri Health Insurance': {
      title: {
        en: 'Arogya Sri Health Insurance',
        te: 'ఆరోగ్య శ్రీ ఆరోగ్య భీమా'
      },
      description: {
        en: 'Free health insurance coverage up to ₹5 lakhs for eligible families under the state government health insurance scheme.',
        te: 'రాష్ట్র ప్రభుత్వ ఆరోగ్య భీమా పథకం కింద అర్హత కలిగిన కుటుంబాలకు ₹5 లక్షల వరకు ఉచిత ఆరోగ్య భీమా కవరేజ్.'
      },
      benefits: {
        en: [
          'Free treatment up to ₹5 lakhs per family per year',
          'Covers over 1,500 medical procedures',
          'No age limit for family members',
          'Cashless treatment at empaneled hospitals',
          'Pre and post hospitalization coverage'
        ],
        te: [
          'సంవత్సరానికి కుటుంబానికి ₹5 లక్షల వరకు ఉచిత చికిత్స',
          '1,500కు మించిన వైద్య ప్రక్రియలను కవర్ చేస్తుంది',
          'కుటుంబ సభ్యులకు వయస్సు పరిమితి లేదు',
          'ఎంపేనల్ చేసిన ఆసుపత్రులలో క్యాష్‌లెస్ చికిత్స',
          'ఆసుపత్రిలో చేరడానికి ముందు మరియు తర్వాత కవరేజ్'
        ]
      },
      eligibility: {
        en: [
          'BPL (Below Poverty Line) families',
          'Annual income less than ₹5 lakhs',
          'Families with white ration card',
          'SC/ST families automatically eligible'
        ],
        te: [
          'BPL (దారిద్య్ర రేఖకు దిగువ) కుటుంబాలు',
          'వార్షిక ఆదాయం ₹5 లక్షల కంటే తక్కువ',
          'తెల్ల రేషన్ కార్డు ఉన్న కుటుంబాలు',
          'SC/ST కుటుంబాలు స్వయంచాలకంగా అర్హులు'
        ]
      },
      documents: {
        en: [
          'Ration Card',
          'Income Certificate',
          'Aadhar Card of all family members',
          'Bank Account Details',
          'Passport size photographs'
        ],
        te: [
          'రేషన్ కార్డు',
          'ఆదాయ ధృవీకరణ పత్రం',
          'అన్ని కుటుంబ సభ్యుల ఆధార్ కార్డు',
          'బ్యాంక్ ఖాతా వివరాలు',
          'పాస్‌పోర్ట్ సైజ్ ఫోటోలు'
        ]
      },
      applicationProcess: {
        en: [
          'Visit nearest Mee Seva center',
          'Fill application form with required documents',
          'Biometric verification of family members',
          'Pay processing fee (if applicable)',
          'Receive insurance card within 15 days'
        ],
        te: [
          'సమీపంలోని మీ సేవ కేంద్రాన్ని సందర్శించండి',
          'అవసరమైన పత్రాలతో దరఖాస్తు ఫారమ్ నింపండి',
          'కుటుంబ సభ్యుల బయోమెట్రిక్ ధృవీకరణ',
          'ప్రాసెసింగ్ ఫీజు చెల్లించండి (వర్తించినట్లయితే)',
          '15 రోజుల్లో భీమా కార్డు అందుకోండి'
        ]
      }
    },
    'Mother & Child Care Kit Scheme': {
      title: {
        en: 'Mother & Child Care Kit Scheme',
        te: 'తల్లి మరియు శిశు సంరక్షణ కిట్ పథకం'
      },
      description: {
        en: 'Free nutritional kits and medical support for expecting mothers and newborns to ensure healthy pregnancy and child development.',
        te: 'ఆరోగ్యకరమైన గర్భధారణ మరియు పిల్లల అభివృద్ధిని నిర్ధారించడానికి గర్భిణీ తల్లులు మరియు నవజాత శిశువులకు ఉచిత పోషకాహార కిట్‌లు మరియు వైద్య మద్దతు.'
      },
      benefits: {
        en: [
          'Free nutrition kit worth ₹12,000',
          'Regular health checkups during pregnancy',
          'Free delivery at government hospitals',
          'Post-delivery care for mother and child',
          'Vaccination support for newborns'
        ],
        te: [
          '₹12,000 విలువైన ఉచిత పోషకాహార కిట్',
          'గర్భధారణ సమయంలో క్రమం తప్పకుండా ఆరోగ్య పరీక్షలు',
          'ప్రభుత్వ ఆసుపత్రులలో ఉచిత డెలివరీ',
          'ప్రసవం తర్వాత తల్లి మరియు శిశువు సంరక్షణ',
          'నవజాత శిశువులకు టీకా మద్దతు'
        ]
      },
      eligibility: {
        en: [
          'Pregnant women of all income groups',
          'First two pregnancies covered',
          'Regular antenatal checkups mandatory',
          'Delivery must be in government hospital'
        ],
        te: [
          'అన్ని ఆదాయ వర్గాల గర్భిణీ మహిళలు',
          'మొదటి రెండు గర్భధారణలు కవర్ చేయబడతాయి',
          'క్రమం తప్పకుండా ప్రీనేటల్ చెకప్‌లు తప్పనిసరి',
          'ప్రభుత్వ ఆసుపత్రిలో డెలివరీ తప్పనిసరి'
        ]
      },
      documents: {
        en: [
          'Pregnancy confirmation certificate',
          'Aadhar Card',
          'Bank Account Details',
          'Previous pregnancy records (if any)',
          'Address proof'
        ],
        te: [
          'గర్భధారణ ధృవీకరణ పత్రం',
          'ఆధార్ కార్డు',
          'బ్యాంక్ ఖాతా వివరాలు',
          'మునుపటి గర్భధారణ రికార్డులు (ఏవైనా ఉంటే)',
          'చిరునామా రుజువు'
        ]
      },
      applicationProcess: {
        en: [
          'Register at nearest PHC or CHC',
          'Complete antenatal registration',
          'Attend regular checkups as scheduled',
          'Kit will be provided during 7th month',
          'Complete delivery at registered hospital'
        ],
        te: [
          'సమీపంలోని PHC లేదా CHCలో నమోదు చేసుకోండి',
          'ప్రీనేటల్ రిజిస్ట్రేషన్ పూర్తి చేయండి',
          'షెడ్యూల్ చేసిన విధంగా క్రమం తప్పకుండా చెకప్‌లకు హాజరు కండి',
          '7వ నెలలో కిట్ అందించబడుతుంది',
          'నమోదు చేసుకున్న ఆసుపత్రిలో డెలివరీ పూర్తి చేయండి'
        ]
      }
    },
    'Free Medicine Scheme': {
      title: {
        en: 'Free Medicine Scheme',
        te: 'ఉచిత మందుల పథకం'
      },
      description: {
        en: 'Essential medicines available free of cost at all government hospitals and primary health centers across the state.',
        te: 'రాష్ట్రవ్యాప్తంగా అన్ని ప్రభుత్వ ఆసుపత్రులు మరియు ప్రాథమిక ఆరోగ్య కేంద్రాలలో అవసరమైన మందులు ఉచితంగా అందుబాటులో ఉన్నాయి.'
      },
      benefits: {
        en: [
          'Over 600 essential medicines available free',
          'No cost for prescribed medicines',
          'Available at all government hospitals',
          'Quality assured medicines',
          'Special provisions for chronic diseases'
        ],
        te: [
          '600కు మించిన అవసరమైన మందులు ఉచితంగా అందుబాటులో',
          'ప్రిస్క్రైబ్ చేసిన మందులకు ఎటువంటి ఖర్చు లేదు',
          'అన్ని ప్రభుత్వ ఆసుపత్రులలో అందుబాటులో',
          'నాణ్యత హామీ ఉన్న మందులు',
          'దీర్ఘకాలిక వ్యాధులకు ప్రత్యేక నిబంధనలు'
        ]
      },
      eligibility: {
        en: [
          'All citizens can avail this scheme',
          'Valid prescription from government doctor required',
          'Treatment at government healthcare facilities',
          'No income restrictions'
        ],
        te: [
          'అన్ని పౌరులు ఈ పథకాన్ని ఉపయోగించుకోవచ్చు',
          'ప్రభుత్వ వైద్యుని నుండి చెల్లుబాటు అయ్యే ప్రిస్క్రిప్షన్ అవసరం',
          'ప్రభుత్వ ఆరోగ్య సంస్థలలో చికిత్స',
          'ఆదాయ పరిమితులు లేవు'
        ]
      },
      documents: {
        en: [
          'Valid prescription from government doctor',
          'Patient identity proof',
          'Previous medical records (if any)'
        ],
        te: [
          'ప్రభుత్వ వైద్యుని నుండి చెల్లుబాటు అయ్యే ప్రిస్క్రిప్షన్',
          'రోగి గుర్తింపు రుజువు',
          'మునుపటి వైద్య రికార్డులు (ఏవైనా ఉంటే)'
        ]
      },
      applicationProcess: {
        en: [
          'Visit government hospital/PHC',
          'Consult with doctor and get prescription',
          'Collect medicines from hospital pharmacy',
          'No separate application required',
          'Show prescription and identity proof'
        ],
        te: [
          'ప్రభుత్వ ఆసుపత్రి/PHCని సందర్శించండి',
          'వైద్యుడిని సంప్రదించి ప్రిస్క్రిప్షన్ తీసుకోండి',
          'ఆసుపత్రి ఫార్మసీ నుండి మందులు సేకరించండి',
          'ప్రత్యేక దరఖాస్తు అవసరం లేదు',
          'ప్రిస్క్రిప్షన్ మరియు గుర్తింపు రుజువు చూపించండి'
        ]
      }
    }
  };

  const currentScheme = schemeData[schemeName] || schemeData['Arogya Sri Health Insurance'];

  const schemeT = (key: string) => {
    const translation = schemeTranslations[key];
    return translation ? (language === 'te' ? translation.te : translation.en) : key;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      <header className="bg-white shadow-sm border-b border-blue-100">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center space-x-4">
            <Link to="/home">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-xl font-bold text-gray-900">
                {language === 'te' ? currentScheme.title.te : currentScheme.title.en}
              </h1>
              <p className="text-sm text-blue-600">
                {language === 'te' ? currentScheme.title.en : currentScheme.title.te}
              </p>
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
                <CardTitle className="text-2xl">
                  {language === 'te' ? currentScheme.title.te : currentScheme.title.en}
                </CardTitle>
                <p className="text-blue-600 font-medium">
                  {language === 'te' ? currentScheme.title.en : currentScheme.title.te}
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 text-lg leading-relaxed">
              {language === 'te' ? currentScheme.description.te : currentScheme.description.en}
            </p>
          </CardContent>
        </Card>

        {/* Benefits */}
        <Card className="healthcare-card mb-6">
          <CardHeader>
            <CardTitle className="flex items-center">
              <CheckCircle className="w-5 h-5 mr-2 text-green-600" />
              {schemeT('keyBenefits')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {(language === 'te' ? currentScheme.benefits.te : currentScheme.benefits.en).map((benefit, index) => (
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
              {schemeT('eligibilityCriteria')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {(language === 'te' ? currentScheme.eligibility.te : currentScheme.eligibility.en).map((criteria, index) => (
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
              {schemeT('requiredDocuments')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {(language === 'te' ? currentScheme.documents.te : currentScheme.documents.en).map((document, index) => (
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
            <CardTitle>{schemeT('howToApply')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {(language === 'te' ? currentScheme.applicationProcess.te : currentScheme.applicationProcess.en).map((step, index) => (
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
            <CardTitle>{schemeT('needHelp')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-3 p-4 bg-blue-50 rounded-lg">
                <Phone className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="font-medium text-gray-900">{schemeT('helpline')}</p>
                  <p className="text-blue-600">104 ({schemeT('tollFree')})</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-4 bg-green-50 rounded-lg">
                <Mail className="w-5 h-5 text-green-600" />
                <div>
                  <p className="font-medium text-gray-900">{schemeT('emailSupport')}</p>
                  <p className="text-green-600">schemes@telangana.gov.in</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Apply Now Section */}
        <Card className="healthcare-card">
          <CardContent className="p-6 text-center">
            <h3 className="text-xl font-bold text-gray-900 mb-4">{schemeT('readyToApply')}</h3>
            <p className="text-gray-600 mb-6">{schemeT('visitNearestCenter')}</p>
            <div className="space-y-3">
              <Button className="w-full md:w-auto button-primary">
                <ExternalLink className="w-4 h-4 mr-2" />
                {schemeT('findNearestCenter')}
              </Button>
              <div className="flex flex-col md:flex-row gap-2 md:gap-4 justify-center">
                <Button variant="outline" className="w-full md:w-auto">
                  <Phone className="w-4 h-4 mr-2" />
                  {schemeT('callHelpline')}
                </Button>
                <Button variant="outline" className="w-full md:w-auto">
                  <FileText className="w-4 h-4 mr-2" />
                  {schemeT('downloadForm')}
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
