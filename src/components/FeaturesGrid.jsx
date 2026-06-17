import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';
import { 
  Briefcase, 
  Share2, 
  BookOpen, 
  FileText, 
  Users, 
  Map,
  ArrowRight
} from 'lucide-react';

const FeaturesGrid = () => {
  const { user, updateUser } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const features = [
    {
      icon: Briefcase,
      title: 'Internships',
      description: 'Discover exciting internship opportunities',
      points: 'Apply & Earn',
      path: '/internships'
    },
    {
      icon: Share2,
      title: 'Share Experience',
      description: 'Share your journey and inspire others',
      points: '+100 pts',
      path: '/share-experience'
    },
    {
      icon: BookOpen,
      title: 'Courses',
      description: 'Learn new skills with our courses',
      points: '+50 pts',
      path: '/courses'
    },
    {
      icon: FileText,
      title: 'Resume Builder',
      description: 'Create a professional resume',
      points: 'Build Now',
      path: '/resume-builder'
    },
    {
      icon: Users,
      title: 'Alumni Profiles',
      description: 'Connect with successful alumni',
      points: 'Explore',
      path: '/alumni'
    },
    {
      icon: Map,
      title: 'Roadmaps',
      description: 'Follow structured learning paths',
      points: 'Start Journey',
      path: '/roadmaps'
    }
  ];

  return (
    <section className="py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            What would you like to do today?
          </h2>
          <p className="text-lg text-white/80">
            Choose from our exciting features to enhance your learning experience
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="feature-card h-full cursor-pointer" onClick={() => navigate(feature.path)}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                        <Icon size={24} className="text-white" />
                      </div>
                      <Badge className="points-badge">
                        {feature.points}
                      </Badge>
                    </div>
                    <CardTitle className="text-white text-xl">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-white/80 mb-4">
                      {feature.description}
                    </p>
                    <Button 
                      variant="ghost" 
                      className="text-blue-400 hover:text-blue-300 hover:bg-blue-400/10 p-0"
                    >
                      Get Started
                      <ArrowRight size={16} className="ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturesGrid;