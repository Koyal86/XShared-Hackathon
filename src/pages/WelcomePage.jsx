import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { useAuth } from '@/contexts/AuthContext';
import WelcomeHero from '@/components/WelcomeHero';
import FeaturesGrid from '@/components/FeaturesGrid';
import QuickActions from '@/components/QuickActions';
import CommunityHighlights from '@/components/CommunityHighlights';

const WelcomePage = () => {
  const { user } = useAuth();

  return (
    <>
      <Helmet>
        <title>Welcome - XShared Educational Platform</title>
        <meta name="description" content="Welcome to XShared! Explore courses, share experiences, connect with peers, and accelerate your learning journey." />
        <meta property="og:title" content="Welcome - XShared Educational Platform" />
        <meta property="og:description" content="Welcome to XShared! Explore courses, share experiences, connect with peers, and accelerate your learning journey." />
      </Helmet>

      <div>
        <WelcomeHero user={user} />
        <FeaturesGrid />
        <QuickActions />
        <CommunityHighlights />
      </div>
    </>
  );
};

export default WelcomePage;