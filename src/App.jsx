import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import { AuthProvider } from '@/contexts/AuthContext';
import HomePage from '@/pages/HomePage';
import LoginPage from '@/pages/LoginPage';
import SignUpPage from '@/pages/SignUpPage';
import WelcomePage from '@/pages/WelcomePage';
import DashboardPage from '@/pages/DashboardPage';
import ProfilePage from '@/pages/ProfilePage';
import QAPage from '@/pages/QAPage';
import RewardsPage from '@/pages/RewardsPage';
import ResourcesPage from '@/pages/ResourcesPage';
import InternshipPage from '@/pages/InternshipPage';
import ShareExperiencePage from '@/pages/ShareExperiencePage';
import ShareExperienceWizard from '@/pages/ShareExperienceWizard';   // ✅ add this
import CoursesPage from '@/pages/CoursesPage';
import ResumeBuilderPage from '@/pages/ResumeBuilderPage';
import AlumniPage from '@/pages/AlumniPage';
import AlumniProfilePage from '@/pages/AlumniProfilePage';
import RoadmapsPage from '@/pages/RoadmapsPage';
import { FireworksProvider } from '@/contexts/FireworksContext';
import Fireworks from '@/components/Fireworks';
import MainLayout from '@/components/MainLayout';
import Chatbot from '@/components/Chatbot';

function App() {
  return (
    <AuthProvider>
      <FireworksProvider>
        <Router>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />

            {/* Routes wrapped in MainLayout */}
            <Route element={<MainLayout />}>
              <Route path="/welcome" element={<WelcomePage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/qa" element={<QAPage />} />
              <Route path="/rewards" element={<RewardsPage />} />
              <Route path="/resources" element={<ResourcesPage />} />
              <Route path="/internships" element={<InternshipPage />} />

              {/* Both share experience pages */}
              <Route path="/share-experience" element={<ShareExperiencePage />} />
              <Route path="/share-experience/wizard" element={<ShareExperienceWizard />} />  {/* ✅ new */}

              <Route path="/courses" element={<CoursesPage />} />
              <Route path="/resume-builder" element={<ResumeBuilderPage />} />
              <Route path="/alumni" element={<AlumniPage />} />
              <Route path="/alumni/:id" element={<AlumniProfilePage />} />
              <Route path="/roadmaps" element={<RoadmapsPage />} />
            </Route>
          </Routes>

          {/* Global UI components */}
          <Toaster />
          <Fireworks />
          <Chatbot />
        </Router>
      </FireworksProvider>
    </AuthProvider>
  );
}

export default App;
