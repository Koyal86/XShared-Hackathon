import React from 'react';
import { motion } from 'framer-motion';
import { Award, BookOpen, Share2, TrendingUp } from 'lucide-react';

const WelcomeHero = ({ user }) => {
  const stats = [
    { label: 'Your Points', value: user?.points || 0, icon: Award },
    { label: 'Courses Completed', value: user?.coursesCompleted || 0, icon: BookOpen },
    { label: 'Contributions', value: user?.contributions || 0, icon: Share2 },
    { label: 'Rank', value: '#42', icon: TrendingUp }
  ];

  return (
    <section className="relative py-16 px-6 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Welcome back, {user?.name}! 👋
          </h1>
          <p className="text-xl md:text-2xl text-white/80 mb-8 max-w-3xl mx-auto">
            Ready to continue your learning journey? Explore new opportunities, 
            share your experiences, and connect with our amazing community.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="stats-card rounded-lg p-4 text-center min-w-[120px]"
                >
                  <Icon size={24} className="text-blue-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-sm text-white/70">{stat.label}</div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WelcomeHero;