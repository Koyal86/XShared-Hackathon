import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Zap, BookOpen, Share2, MessageCircle, Users, TrendingUp, Target } from 'lucide-react';

const PointsActivities = () => {
  const activities = [
    { activity: 'Complete a course', points: 50, icon: BookOpen, color: 'text-blue-400' },
    { activity: 'Share an experience', points: 100, icon: Share2, color: 'text-green-400' },
    { activity: 'Answer a question', points: 20, icon: MessageCircle, color: 'text-purple-400' },
    { activity: 'Ask a question', points: 10, icon: MessageCircle, color: 'text-orange-400' },
    { activity: 'Vote on Q&A', points: 2, icon: TrendingUp, color: 'text-yellow-400' },
    { activity: 'Create a post', points: 25, icon: Share2, color: 'text-pink-400' },
    { activity: 'Join community event', points: 30, icon: Users, color: 'text-indigo-400' },
    { activity: 'Complete profile', points: 15, icon: Target, color: 'text-cyan-400' }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="mb-12"
    >
      <Card className="feature-card">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Zap className="mr-2" size={24} />
            How to Earn Points
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {activities.map((activity, index) => {
              const Icon = activity.icon;
              return (
                <div key={index} className="flex items-center space-x-3 p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                  <Icon size={24} className={activity.color} />
                  <div>
                    <div className="text-white font-medium text-sm">{activity.activity}</div>
                    <Badge className="points-badge text-xs mt-1">
                      +{activity.points} pts
                    </Badge>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default PointsActivities;