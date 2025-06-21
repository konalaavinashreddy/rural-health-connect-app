
import React from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle, AlertCircle, Clock, Utensils, Home, Droplets, Apple, Heart, Baby } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';

const DietTips = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { language } = useLanguage();
  const condition = location.state?.condition;

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

  // If no condition data, redirect to home
  if (!condition) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center">
        <Card className="max-w-md mx-auto">
          <CardContent className="p-8 text-center">
            <h2 className="text-xl font-bold mb-4">No Diet Information Available</h2>
            <p className="text-gray-600 mb-6">Please select a health condition from the home page.</p>
            <Link to="/home">
              <Button className="w-full">
                <Home className="w-4 h-4 mr-2" />
                Go to Home
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const detailedInfo = {
    fever: {
      mealTiming: {
        en: "Eat small, frequent meals every 2-3 hours",
        te: "ప్రతి 2-3 గంటలకు చిన్న భోజనం తీసుకోండి"
      },
      hydration: {
        en: "Drink 8-10 glasses of water daily, include coconut water and herbal teas",
        te: "రోజుకు 8-10 గ్లాసుల నీరు తాగండి, కొబ్బరి నీరు మరియు మూలికా టీలు చేర్చండి"
      },
      supplements: {
        en: "Vitamin C rich foods: Amla, oranges, guava",
        te: "విటమిన్ సి అధికంగా ఉన్న ఆహారం: ఉసిరి, నారింజ, జామ"
      },
      cooking: {
        en: "Steam or boil vegetables, avoid deep frying",
        te: "కూరగాయలను ఆవిరిపై వండండి, నూనెలో వేయించవద్దు"
      }
    },
    diabetes: {
      mealTiming: {
        en: "Eat at regular intervals, don't skip meals",
        te: "నిర్దిష్ట సమయాలలో భోజనం చేయండి, భోజనం వదలకండి"
      },
      hydration: {
        en: "Drink plenty of water, avoid sugary drinks",
        te: "చాలా నీరు తాగండి, చక్కెర పానీయాలను తరుగుండి"
      },
      supplements: {
        en: "Include fiber-rich foods: Brown rice, oats, quinoa",
        te: "ఫైబర్ అధికంగా ఉన్న ఆహారం: గోధుమ బియ్యం, వోట్స్, క్వినోవా"
      },
      cooking: {
        en: "Use minimal oil, prefer steaming and grilling",
        te: "తక్కువ నూనె వాడండి, ఆవిరి మరియు గ్రిల్లింగ్ చేయండి"
      }
    },
    pregnancy: {
      mealTiming: {
        en: "Eat small frequent meals to avoid nausea",
        te: "వాంతులు రాకుండా చిన్న భోజనం తరచుగా తీసుకోండి"
      },
      hydration: {
        en: "Drink 10-12 glasses of water daily, include fresh fruit juices",
        te: "రోజుకు 10-12 గ్లాసుల నీరు తాగండి, తాజా పండ్ల రసాలు చేర్చండి"
      },
      supplements: {
        en: "Folic acid rich: Spinach, lentils, fortified cereals",
        te: "ఫోలిక్ యాసిడ్ అధికంగా: పాలకూర, పప్పులు, బలపరిచిన ధాన్యాలు"
      },
      cooking: {
        en: "Cook meat thoroughly, wash vegetables properly",
        te: "మాంసాన్ని బాగా వండండి, కూరగాయలను సరిగ్గా కడుక్కోండి"
      }
    },
    'child-growth': {
      mealTiming: {
        en: "3 main meals + 2 healthy snacks daily",
        te: "రోజుకు 3 ప్రధాన భోజనాలు + 2 ఆరోగ్యకరమైన స్నాక్స్"
      },
      hydration: {
        en: "Ensure adequate water intake, limit fruit juices",
        te: "తగినంత నీరు తాగేలా చూడండి, పండ్ల రసాలను పరిమితం చేయండి"
      },
      supplements: {
        en: "Calcium rich: Milk, yogurt, cheese, green leafy vegetables",
        te: "కాల్షియం అధికంగా: పాలు, పెరుగు, చీజ్, ఆకుకూరలు"
      },
      cooking: {
        en: "Make colorful meals to attract children",
        te: "పిల్లలను ఆకర్షించడానికి రంగురంగుల భోజనం చేయండి"
      }
    }
  };

  const currentInfo = detailedInfo[condition.id as keyof typeof detailedInfo];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button 
              variant="ghost" 
              onClick={() => navigate(-1)}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              {language === 'te' ? 'వెనుకకు' : 'Back'}
            </Button>
            <Link to="/home">
              <Button variant="outline" className="flex items-center gap-2">
                <Home className="w-4 h-4" />
                {language === 'te' ? 'హోమ్' : 'Home'}
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Title Section */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg">
              {renderIcon(condition.iconType)}
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            {language === 'te' ? condition.titleTelugu : condition.title}
          </h1>
          <p className="text-xl text-gray-600">
            {language === 'te' ? 'వివరణాత్మక ఆహార చిట్కాలు' : 'Detailed Diet Tips'}
          </p>
        </div>

        <div className="space-y-6">
          {/* Meal Timing */}
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <Clock className="w-6 h-6 text-blue-600 mr-3" />
                <h3 className="text-xl font-semibold text-blue-900">
                  {language === 'te' ? 'భోజన సమయం' : 'Meal Timing'}
                </h3>
              </div>
              <p className="text-blue-800 leading-relaxed">
                {language === 'te' ? currentInfo.mealTiming.te : currentInfo.mealTiming.en}
              </p>
            </CardContent>
          </Card>

          {/* Hydration */}
          <Card className="bg-cyan-50 border-cyan-200">
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <Utensils className="w-6 h-6 text-cyan-600 mr-3" />
                <h3 className="text-xl font-semibold text-cyan-900">
                  {language === 'te' ? 'నీరు తాగడం' : 'Hydration'}
                </h3>
              </div>
              <p className="text-cyan-800 leading-relaxed">
                {language === 'te' ? currentInfo.hydration.te : currentInfo.hydration.en}
              </p>
            </CardContent>
          </Card>

          {/* Supplements */}
          <Card className="bg-green-50 border-green-200">
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <CheckCircle className="w-6 h-6 text-green-600 mr-3" />
                <h3 className="text-xl font-semibold text-green-900">
                  {language === 'te' ? 'పోషకాలు' : 'Nutritional Focus'}
                </h3>
              </div>
              <p className="text-green-800 leading-relaxed">
                {language === 'te' ? currentInfo.supplements.te : currentInfo.supplements.en}
              </p>
            </CardContent>
          </Card>

          {/* Cooking Methods */}
          <Card className="bg-orange-50 border-orange-200">
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <AlertCircle className="w-6 h-6 text-orange-600 mr-3" />
                <h3 className="text-xl font-semibold text-orange-900">
                  {language === 'te' ? 'వంట పద్ధతులు' : 'Cooking Methods'}
                </h3>
              </div>
              <p className="text-orange-800 leading-relaxed">
                {language === 'te' ? currentInfo.cooking.te : currentInfo.cooking.en}
              </p>
            </CardContent>
          </Card>

          {/* Original Recommendations Summary */}
          <Card className="bg-gray-50 border-gray-200">
            <CardHeader>
              <CardTitle className="text-gray-900">
                {language === 'te' ? 'సారాంశం' : 'Quick Summary'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-green-700 mb-3 flex items-center">
                    <CheckCircle className="w-5 h-5 mr-2" />
                    {language === 'te' ? 'తీసుకోవాల্સినవి:' : 'Include:'}
                  </h4>
                  <ul className="space-y-2">
                    {condition.recommendations.do.map((item, idx) => (
                      <li key={idx} className="text-gray-700 flex items-start">
                        <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-red-700 mb-3 flex items-center">
                    <span className="w-5 h-5 mr-2 text-red-500">❌</span>
                    {language === 'te' ? 'తరుगుండవाल्सินవি:' : 'Avoid:'}
                  </h4>
                  <ul className="space-y-2">
                    {condition.recommendations.avoid.map((item, idx) => (
                      <li key={idx} className="text-gray-700 flex items-start">
                        <span className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Disclaimer */}
          <Card className="bg-yellow-50 border-yellow-200">
            <CardContent className="p-6">
              <p className="text-yellow-800">
                <strong>{language === 'te' ? 'గమనిక:' : 'Note:'}</strong> {' '}
                {language === 'te' 
                  ? 'ఈ సలహాలు సాధారణ మార్గదर్శకాలు మాత్రమే. వైద్యుని సలహా తీసుకోవాలి.'
                  : 'These are general guidelines. Always consult with a healthcare provider for personalized advice.'
                }
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DietTips;
