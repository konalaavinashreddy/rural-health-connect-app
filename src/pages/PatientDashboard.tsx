
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, Calendar, Pill, FileText, MessageCircle, Map } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PatientDashboard = () => {
  const navigate = useNavigate();

  const dashboardItems = [
    {
      title: "Book Appointment",
      description: "Schedule appointments with healthcare providers",
      icon: Calendar,
      path: "/appointment",
      color: "bg-blue-500"
    },
    {
      title: "Medicines",
      description: "View and manage your medications",
      icon: Pill,
      path: "/medicines",
      color: "bg-green-500"
    },
    {
      title: "Prescriptions",
      description: "Access your digital prescriptions",
      icon: FileText,
      path: "/prescriptions",
      color: "bg-purple-500"
    },
    {
      title: "Health Chatbot",
      description: "Get instant health guidance",
      icon: MessageCircle,
      path: "/chatbot",
      color: "bg-orange-500"
    },
    {
      title: "Find Healthcare",
      description: "Locate nearby hospitals and clinics",
      icon: Map,
      path: "/map",
      color: "bg-red-500"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-primary rounded-full p-3">
              <Heart className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Patient Dashboard</h1>
          <p className="text-gray-600">Welcome to Rural Health Connect</p>
          <Button 
            variant="outline" 
            onClick={() => navigate('/')}
            className="mt-4"
          >
            Logout
          </Button>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dashboardItems.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <Card 
                key={index} 
                className="hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => navigate(item.path)}
              >
                <CardHeader className="text-center">
                  <div className={`${item.color} rounded-full p-3 w-12 h-12 mx-auto mb-4 flex items-center justify-center`}>
                    <IconComponent className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-lg">{item.title}</CardTitle>
                  <CardDescription>{item.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full">
                    Access {item.title}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;
