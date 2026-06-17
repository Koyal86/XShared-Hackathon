import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import { BookOpen, Users, Award, Star, Zap, Gift, HelpCircle, Lock } from 'lucide-react';

const RewardsStore = ({ startQuiz }) => {
  const { user } = useAuth();
  const { toast } = useToast();

  const rewards = [
    { id: 1, title: 'Premium Course Access', description: 'Unlock premium courses for 1 month', cost: 500, icon: BookOpen, available: true },
    { id: 2, title: 'Mentorship Session', description: '1-on-1 session with industry expert', cost: 1000, icon: Users, available: true },
    { id: 3, title: 'Certificate Template', description: 'Custom certificate design', cost: 200, icon: Award, available: true },
    { id: 4, title: 'Profile Badge', description: 'Exclusive profile badge', cost: 150, icon: Star, available: true },
    { id: 5, title: 'Early Access', description: 'Early access to new features', cost: 300, icon: Zap, available: true },
    { id: 6, title: 'Gift Card', description: '$25 Amazon gift card', cost: 2500, icon: Gift, available: false }
  ];

  const handleRedeemReward = (reward) => {
    if ((user?.points || 0) < reward.cost) {
      toast({ title: "Insufficient points", description: `You need ${reward.cost - (user?.points || 0)} more points.`, variant: "destructive" });
      return;
    }
    toast({ title: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀" });
  };

  const handleHardQuizClick = () => {
    if (user?.isPremium) {
      startQuiz('hard');
    } else {
      toast({
        title: "Premium Feature",
        description: "Hard quizzes and their exclusive rewards are for premium members only. Upgrade to unlock!",
        variant: "destructive"
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">Rewards Store</h2>
        <div className="text-white/80">Your Points: <span className="font-bold text-yellow-400">{user?.points || 0}</span></div>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="feature-card bg-gradient-to-br from-blue-500/30 to-purple-500/30">
          <CardContent className="p-6 flex flex-col items-center justify-center text-center h-full">
            <HelpCircle size={32} className="text-white mb-4" />
            <h3 className="text-lg font-bold text-white mb-2">Test Your Knowledge</h3>
            <p className="text-white/80 text-sm mb-4">Take a quiz to earn points, certificates, and other cool rewards!</p>
            <div className="flex flex-col sm:flex-row gap-2 w-full">
              <Button size="sm" className="flex-1" onClick={() => startQuiz('easy')}>Easy</Button>
              <Button size="sm" className="flex-1" onClick={() => startQuiz('medium')}>Medium</Button>
              <Button size="sm" className="flex-1 relative" onClick={handleHardQuizClick}>
                {!user?.isPremium && <Lock size={12} className="absolute top-1 right-1 text-yellow-300" />}
                Hard
              </Button>
            </div>
          </CardContent>
        </Card>
        {rewards.map((reward, index) => {
          const Icon = reward.icon;
          const canAfford = (user?.points || 0) >= reward.cost;
          return (
            <motion.div key={reward.id} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: index * 0.1 }}>
              <Card className={`feature-card ${!reward.available ? 'opacity-50' : ''}`}>
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                      <Icon size={24} className="text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-white mb-1">{reward.title}</h3>
                      <p className="text-white/80 text-sm">{reward.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <Badge className="points-badge">{reward.cost} pts</Badge>
                    <Button size="sm" onClick={() => handleRedeemReward(reward)} disabled={!canAfford || !reward.available} className={`${canAfford && reward.available ? 'bg-gradient-to-r from-green-500 to-emerald-600' : 'bg-gray-500 cursor-not-allowed'}`}>
                      {!reward.available ? 'Coming Soon' : canAfford ? 'Redeem' : 'Need More'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default RewardsStore;