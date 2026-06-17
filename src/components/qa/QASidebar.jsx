import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Filter, Award } from 'lucide-react';

const QASidebar = ({ selectedCategory, setSelectedCategory }) => {
  const categories = [
    { id: 'all', label: 'All Questions', count: 156 },
    { id: 'career', label: 'Career', count: 45 },
    { id: 'technical', label: 'Technical', count: 38 },
    { id: 'education', label: 'Education', count: 32 },
    { id: 'internship', label: 'Internships', count: 25 },
    { id: 'general', label: 'General', count: 16 }
  ];

  const topContributors = [
    { name: 'Dr. Sarah Wilson', answers: 45, points: 890 },
    { name: 'Mike Chen', answers: 38, points: 760 },
    { name: 'Emily Rodriguez', answers: 32, points: 640 },
    { name: 'Alex Johnson', answers: 28, points: 560 }
  ];

  return (
    <motion.div
      className="lg:col-span-1"
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <Card className="feature-card">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Filter className="mr-2" size={20} />
            Categories
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`w-full text-left p-3 rounded-lg transition-all duration-200 ${
                  selectedCategory === category.id
                    ? 'bg-blue-500/20 border border-blue-400'
                    : 'bg-white/5 hover:bg-white/10 border border-transparent'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-white font-medium">{category.label}</span>
                  <Badge variant="outline" className="text-xs">
                    {category.count}
                  </Badge>
                </div>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="feature-card mt-6">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Award className="mr-2" size={20} />
            Top Contributors
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {topContributors.map((contributor, index) => (
              <div key={index} className="flex items-center space-x-3">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm">
                    {contributor.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="text-white font-medium text-sm">{contributor.name}</div>
                  <div className="text-white/60 text-xs">{contributor.answers} answers</div>
                </div>
                <Badge className="points-badge text-xs">
                  {contributor.points}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default QASidebar;