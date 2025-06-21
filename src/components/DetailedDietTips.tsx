
import React from 'react';
import { X, CheckCircle, AlertCircle, Clock, Utensils } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';

interface DetailedDietTipsProps {
  condition: {
    id: string;
    title: string;
    titleTelugu: string;
    icon: React.ReactNode;
    recommendations: {
      do: string[];
      avoid: string[];
      telugu: string;
    };
  };
  onClose: () => void;
}

const DetailedDietTips: React.FC<DetailedDietTipsProps> = ({ condition, onClose }) => {
  const { language } = useLanguage();

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
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center space-x-3">
            {condition.icon}
            <CardTitle className="text-xl">
              {language === 'te' ? condition.titleTelugu : condition.title} - 
              {language === 'te' ? ' వివరణాత్మక ఆహార చిట్కాలు' : ' Detailed Diet Tips'}
            </CardTitle>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Meal Timing */}
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="flex items-center mb-2">
              <Clock className="w-5 h-5 text-blue-600 mr-2" />
              <h3 className="font-semibold text-blue-900">
                {language === 'te' ? 'భోజన సమయం' : 'Meal Timing'}
              </h3>
            </div>
            <p className="text-sm text-blue-800">
              {language === 'te' ? currentInfo.mealTiming.te : currentInfo.mealTiming.en}
            </p>
          </div>

          {/* Hydration */}
          <div className="bg-cyan-50 rounded-lg p-4">
            <div className="flex items-center mb-2">
              <Utensils className="w-5 h-5 text-cyan-600 mr-2" />
              <h3 className="font-semibold text-cyan-900">
                {language === 'te' ? 'నీరు తాగడం' : 'Hydration'}
              </h3>
            </div>
            <p className="text-sm text-cyan-800">
              {language === 'te' ? currentInfo.hydration.te : currentInfo.hydration.en}
            </p>
          </div>

          {/* Supplements */}
          <div className="bg-green-50 rounded-lg p-4">
            <div className="flex items-center mb-2">
              <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
              <h3 className="font-semibold text-green-900">
                {language === 'te' ? 'పోషకాలు' : 'Nutritional Focus'}
              </h3>
            </div>
            <p className="text-sm text-green-800">
              {language === 'te' ? currentInfo.supplements.te : currentInfo.supplements.en}
            </p>
          </div>

          {/* Cooking Methods */}
          <div className="bg-orange-50 rounded-lg p-4">
            <div className="flex items-center mb-2">
              <AlertCircle className="w-5 h-5 text-orange-600 mr-2" />
              <h3 className="font-semibold text-orange-900">
                {language === 'te' ? 'వంట పద్ధతులు' : 'Cooking Methods'}
              </h3>
            </div>
            <p className="text-sm text-orange-800">
              {language === 'te' ? currentInfo.cooking.te : currentInfo.cooking.en}
            </p>
          </div>

          {/* Original Recommendations Summary */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-3">
              {language === 'te' ? 'సారాంశం' : 'Quick Summary'}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium text-green-700 mb-2 flex items-center">
                  <CheckCircle className="w-4 h-4 mr-1" />
                  {language === 'te' ? 'తీసుకోవాల్సినవి:' : 'Include:'}
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
                <h4 className="font-medium text-red-700 mb-2 flex items-center">
                  <span className="w-4 h-4 mr-1 text-red-500">❌</span>
                  {language === 'te' ? 'తరుగుండవాల్సినవి:' : 'Avoid:'}
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
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <p className="text-sm text-yellow-800">
              <strong>{language === 'te' ? 'గమనిక:' : 'Note:'}</strong> {' '}
              {language === 'te' 
                ? 'ఈ సలహాలు సాధారణ మార్గదర్शకాలు మాత్రమే. వైద్యుని సలహా తీసుకోవాలి.'
                : 'These are general guidelines. Always consult with a healthcare provider for personalized advice.'
              }
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DetailedDietTips;
