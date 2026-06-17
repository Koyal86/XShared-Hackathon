import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Share2, MessageCircle, Trophy, Crown, Users } from 'lucide-react';

const Achievements = () => {
  const achievements = [
    { id: 1, title: 'First Steps', description: 'Complete your first course', icon: BookOpen, points: 50, earned: true, rarity: 'common', progress: 100 },
    { id: 2, title: 'Knowledge Sharer', description: 'Share 5 experiences', icon: Share2, points: 250, earned: false, rarity: 'uncommon', progress: 40 },
    { id: 3, title: 'Community Helper', description: 'Answer 25 questions', icon: MessageCircle, points: 500, earned: false, rarity: 'rare', progress: 32 },
    { id: 4, title: 'Course Master', description: 'Complete 10 courses', icon: Trophy, points: 750, earned: false, rarity: 'epic', progress: 30 },
    { id: 5, title: 'Top Contributor', description: 'Reach top 10 leaderboard', icon: Crown, points: 1000, earned: false, rarity: 'legendary', progress: 15 },
    { id: 6, title: 'Mentor', description: 'Help 50 community members', icon: Users, points: 1500, earned: false, rarity: 'legendary', progress: 8 }
  ];

  const getRarityColor = (rarity) => ({
    common: 'border-gray-400 bg-gray-400/10', uncommon: 'border-green-400 bg-green-400/10', rare: 'border-blue-400 bg-blue-400/10', epic: 'border-purple-400 bg-purple-400/10', legendary: 'border-yellow-400 bg-yellow-400/10'
  }[rarity] || 'border-gray-400 bg-gray-400/10');

  const getRarityText = (rarity) => rarity.charAt(0).toUpperCase() + rarity.slice(1);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="mb-12"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">Achievements</h2>
        <Badge variant="outline" className="text-white border-white/20">
          {achievements.filter(a => a.earned).length} / {achievements.length} Unlocked
        </Badge>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {achievements.map((achievement, index) => {
          const Icon = achievement.icon;
          return (
            <motion.div key={achievement.id} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: index * 0.1 }}>
              <Card className={`feature-card border-2 ${getRarityColor(achievement.rarity)} ${achievement.earned ? 'ring-2 ring-green-400' : ''}`}>
                <CardContent className="p-6 text-center">
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${achievement.earned ? 'bg-gradient-to-r from-green-500 to-emerald-600' : 'bg-white/10'}`}>
                    <Icon size={32} className={achievement.earned ? 'text-white' : 'text-white/50'} />
                  </div>
                  <h3 className={`text-lg font-bold mb-2 ${achievement.earned ? 'text-white' : 'text-white/70'}`}>{achievement.title}</h3>
                  <p className="text-white/80 text-sm mb-4">{achievement.description}</p>
                  <div className="flex items-center justify-between mb-3">
                    <Badge className={`text-xs ${getRarityColor(achievement.rarity)}`}>{getRarityText(achievement.rarity)}</Badge>
                    <Badge className="points-badge text-xs">{achievement.points} pts</Badge>
                  </div>
                  {!achievement.earned && (
                    <div>
                      <div className="w-full bg-white/10 rounded-full h-2 mb-2">
                        <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full" style={{ width: `${achievement.progress}%` }}></div>
                      </div>
                      <div className="text-xs text-white/60">{achievement.progress}% Complete</div>
                    </div>
                  )}
                  {achievement.earned && (
                    <div className="flex items-center justify-center space-x-1 text-green-400"><Trophy size={16} /><span className="text-sm font-medium">Unlocked!</span></div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default Achievements;