import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import ProfileSidebar from '@/components/profile/ProfileSidebar';
import ProfileFeed from '@/components/profile/ProfileFeed';
import SimilarProfiles from '@/components/profile/SimilarProfiles';

const ProfilePage = () => {
  return (
    <>
      <Helmet>
        <title>Profile - XShared Educational Platform</title>
        <meta name="description" content="View and edit your XShared profile, see your posts, and connect with similar learners in the community." />
        <meta property="og:title" content="Profile - XShared Educational Platform" />
        <meta property="og:description" content="View and edit your XShared profile, see your posts, and connect with similar learners in the community." />
      </Helmet>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          <motion.div
            className="lg:col-span-1"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <ProfileSidebar />
          </motion.div>

          <motion.div
            className="lg:col-span-1"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <ProfileFeed />
          </motion.div>

          <motion.div
            className="lg:col-span-1"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <SimilarProfiles />
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;