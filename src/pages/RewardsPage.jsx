import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { useAuth } from '@/contexts/AuthContext';
import RewardsHeader from '@/components/rewards/RewardsHeader';
import PointsActivities from '@/components/rewards/PointsActivities';
import Achievements from '@/components/rewards/Achievements';
import RewardsStore from '@/components/rewards/RewardsStore';
import QuizSection from '@/components/rewards/QuizSection';

const RewardsPage = () => {
  const { user } = useAuth();
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizDifficulty, setQuizDifficulty] = useState(null);

  const startQuiz = (difficulty) => {
    setQuizDifficulty(difficulty);
    setQuizStarted(true);
  };

  return (
    <>
      <Helmet>
        <title>Rewards & Achievements - XShared Educational Platform</title>
        <meta name="description" content="Earn points, unlock achievements, and redeem rewards on XShared. Track your progress and celebrate your learning milestones." />
        <meta property="og:title" content="Rewards & Achievements - XShared Educational Platform" />
        <meta property="og:description" content="Earn points, unlock achievements, and redeem rewards on XShared. Track your progress and celebrate your learning milestones." />
      </Helmet>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <RewardsHeader user={user} />
        
        {quizStarted ? (
          <QuizSection difficulty={quizDifficulty} setQuizStarted={setQuizStarted} />
        ) : (
          <>
            <PointsActivities />
            <Achievements />
            <RewardsStore startQuiz={startQuiz} />
          </>
        )}
      </div>
    </>
  );
};

export default RewardsPage;