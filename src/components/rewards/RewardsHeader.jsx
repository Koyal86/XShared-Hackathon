import React from 'react';
import { motion } from 'framer-motion';
import { Award } from 'lucide-react';

const RewardsHeader = ({ user }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="text-center mb-12"
    >
      <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
        Rewards & Achievements
      </h1>
      <p className="text-xl text-white/80 mb-8">
        Earn points, unlock achievements, and redeem amazing rewards
      </p>
      
      <div className="inline-flex items-center space-x-4 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 backdrop-blur-sm rounded-2xl p-6 border border-yellow-400/30">
        <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
          <Award size={32} className="text-white" />
        </div>
        <div>
          <div className="text-3xl font-bold text-white">{user?.points || 0}</div>
          <div className="text-yellow-200">Total Points</div>
        </div>
      </div>
    </motion.div>
  );
};

export default RewardsHeader;