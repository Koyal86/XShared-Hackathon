import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Award, 
  BookOpen, 
  Share2, 
  TrendingUp, 
  Users, 
  Calendar,
  Target,
  Trophy,
  Star,
  Medal,
  Crown
} from 'lucide-react';

const DashboardPage = () => {
  const { user } = useAuth();
  const [recentActivities, setRecentActivities] = useState([]);

  const userStats = {
    totalPoints: user?.points || 0,
    coursesCompleted: user?.coursesCompleted || 0,
    contributions: user?.contributions || 0,
    rank: 42,
    weeklyGrowth: 15,
    monthlyGrowth: 45
  };

  const leaderboard = [
    { id: 1, name: 'Alex Chen', points: 2850, avatar: '', rank: 1, badge: 'crown' },
    { id: 2, name: 'Sarah Johnson', points: 2720, avatar: '', rank: 2, badge: 'gold' },
    { id: 3, name: 'Mike Rodriguez', points: 2650, avatar: '', rank: 3, badge: 'silver' },
    { id: 4, name: 'Emily Davis', points: 2580, avatar: '', rank: 4, badge: 'bronze' },
    { id: 5, name: 'David Kim', points: 2450, avatar: '', rank: 5, badge: 'star' },
    { id: 6, name: user?.name || 'You', points: userStats.totalPoints, avatar: user?.avatar || '', rank: userStats.rank, badge: 'medal', isCurrentUser: true }
  ];

  // Load activities from localStorage + merge with sample ones
  useEffect(() => {
    const stored = user?.id
      ? JSON.parse(localStorage.getItem(`xshared_activities_${user.id}`)) || []
      : [];

    const sample = [
      {
        type: 'course',
        title: 'Completed "Advanced JavaScript"',
        points: 50,
        time: '2 hours ago',
        icon: BookOpen
      },
      {
        type: 'share',
        title: 'Shared internship experience',
        points: 100,
        time: '1 day ago',
        icon: Share2
      },
      {
        type: 'answer',
        title: 'Answered 3 questions in Q&A',
        points: 30,
        time: '2 days ago',
        icon: Users
      },
      {
        type: 'course',
        title: 'Started "React Fundamentals"',
        points: 10,
        time: '3 days ago',
        icon: BookOpen
      }
    ];

    // Merge: user’s latest actions always first
    setRecentActivities([...stored, ...sample]);
  }, [user?.id]);

  const achievements = [
    { title: 'First Course', description: 'Complete your first course', earned: true, icon: BookOpen },
    { title: 'Helpful Member', description: 'Answer 10 questions', earned: true, icon: Users },
    { title: 'Storyteller', description: 'Share 5 experiences', earned: false, icon: Share2 },
    { title: 'Top Contributor', description: 'Reach top 10 leaderboard', earned: false, icon: Trophy }
  ];

  const contributionTypes = [
    { type: 'Courses', count: userStats.coursesCompleted, color: 'bg-blue-500' },
    { type: 'Experiences', count: userStats.contributions, color: 'bg-green-500' },
    { type: 'Q&A Answers', count: 8, color: 'bg-purple-500' },
    { type: 'Resources', count: 3, color: 'bg-orange-500' }
  ];

  const getBadgeIcon = (badge) => {
    switch (badge) {
      case 'crown': return <Crown size={20} className="text-yellow-400" />;
      case 'gold': return <Medal size={20} className="text-yellow-500" />;
      case 'silver': return <Medal size={20} className="text-gray-400" />;
      case 'bronze': return <Medal size={20} className="text-orange-600" />;
      case 'star': return <Star size={20} className="text-blue-400" />;
      default: return <Medal size={20} className="text-gray-500" />;
    }
  };

  return (
    <>
      <Helmet>
        <title>Dashboard - XShared Educational Platform</title>
        <meta name="description" content="Track your learning progress, view your contributions, and see how you rank in the XShared community leaderboard." />
        <meta property="og:title" content="Dashboard - XShared Educational Platform" />
        <meta property="og:description" content="Track your learning progress, view your contributions, and see how you rank in the XShared community leaderboard." />
      </Helmet>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            Your Dashboard
          </h1>
          <p className="text-white/80">
            Track your progress and see how you're contributing to the community
          </p>
        </motion.div>

        {/* Top Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          {[
            { label: 'Total Points', value: userStats.totalPoints, icon: Award, color: 'text-yellow-400' },
            { label: 'Courses Completed', value: userStats.coursesCompleted, icon: BookOpen, color: 'text-blue-400' },
            { label: 'Contributions', value: userStats.contributions, icon: Share2, color: 'text-green-400' },
            { label: 'Community Rank', value: `#${userStats.rank}`, icon: TrendingUp, color: 'text-purple-400' }
          ].map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="feature-card">
                  <CardContent className="p-6 text-center">
                    <Icon size={32} className={`${stat.color} mx-auto mb-3`} />
                    <div className="text-2xl font-bold text-white mb-1">
                      {stat.value}
                    </div>
                    <div className="text-sm text-white/70">
                      {stat.label}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* Contributions */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="feature-card">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Target className="mr-2" size={24} />
                    Your Contributions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    {contributionTypes.map((type, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <div className={`w-4 h-4 rounded-full ${type.color}`}></div>
                        <div>
                          <div className="text-white font-medium">{type.count}</div>
                          <div className="text-white/70 text-sm">{type.type}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Recent Activity */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Card className="feature-card">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Calendar className="mr-2" size={24} />
                    Recent Activity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivities.map((activity, index) => {
                      const Icon = activity.icon || Share2;
                      return (
                        <div key={index} className="flex items-center space-x-4 p-3 rounded-lg bg-white/5">
                          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                            <Icon size={20} className="text-white" />
                          </div>
                          <div className="flex-1">
                            <div className="text-white font-medium">{activity.title}</div>
                            <div className="text-white/70 text-sm">{activity.time}</div>
                          </div>
                          <Badge className="points-badge">
                            +{activity.points} pts
                          </Badge>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Achievements */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Card className="feature-card">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Trophy className="mr-2" size={24} />
                    Achievements
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    {achievements.map((achievement, index) => {
                      const Icon = achievement.icon;
                      return (
                        <div 
                          key={index} 
                          className={`p-4 rounded-lg border-2 ${
                            achievement.earned 
                              ? 'border-green-400 bg-green-400/10' 
                              : 'border-white/20 bg-white/5'
                          }`}
                        >
                          <Icon 
                            size={24} 
                            className={`mb-2 ${
                              achievement.earned ? 'text-green-400' : 'text-white/50'
                            }`} 
                          />
                          <div className={`font-medium mb-1 ${
                            achievement.earned ? 'text-white' : 'text-white/70'
                          }`}>
                            {achievement.title}
                          </div>
                          <div className="text-sm text-white/60">
                            {achievement.description}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-8">
            {/* Leaderboard */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="feature-card">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Trophy className="mr-2" size={24} />
                    Leaderboard
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {leaderboard.map((member, index) => (
                      <div 
                        key={member.id} 
                        className={`p-3 rounded-lg flex items-center space-x-3 ${
                          member.isCurrentUser ? 'ring-2 ring-blue-400' : ''
                        }`}
                      >
                        <div className="flex items-center space-x-2">
                          <span className="text-white/70 font-medium w-6">
                            #{member.rank}
                          </span>
                          {getBadgeIcon(member.badge)}
                        </div>
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={member.avatar} />
                          <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm">
                            {member.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className={`font-medium ${
                            member.isCurrentUser ? 'text-blue-400' : 'text-white'
                          }`}>
                            {member.name}
                          </div>
                        </div>
                        <Badge className="points-badge">
                          {member.points} pts
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Weekly Goals */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Card className="feature-card">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Target className="mr-2" size={24} />
                    Weekly Goals
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-white/80">Complete 2 courses</span>
                        <span className="text-white/60">1/2</span>
                      </div>
                      <div className="w-full bg-white/10 rounded-full h-2">
                        <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full" style={{ width: '50%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-white/80">Share 3 experiences</span>
                        <span className="text-white/60">2/3</span>
                      </div>
                      <div className="w-full bg-white/10 rounded-full h-2">
                        <div className="bg-gradient-to-r from-green-500 to-emerald-600 h-2 rounded-full" style={{ width: '67%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-white/80">Answer 5 questions</span>
                        <span className="text-white/60">3/5</span>
                      </div>
                      <div className="w-full bg-white/10 rounded-full h-2">
                        <div className="bg-gradient-to-r from-purple-500 to-pink-600 h-2 rounded-full" style={{ width: '60%' }}></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardPage;
