import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  GraduationCap, 
  Users, 
  Award, 
  BookOpen, 
  MessageCircle, 
  TrendingUp,
  Star,
  ArrowRight,
  CheckCircle
} from 'lucide-react';

const HomePage = () => {
  const features = [
    {
      icon: GraduationCap,
      title: 'Learn & Grow',
      description: 'Access comprehensive courses and educational resources to advance your career.'
    },
    {
      icon: Users,
      title: 'Connect & Share',
      description: 'Share experiences, connect with peers, and build your professional network.'
    },
    {
      icon: Award,
      title: 'Earn Rewards',
      description: 'Get points for contributions, course completions, and active participation.'
    },
    {
      icon: MessageCircle,
      title: 'Q&A Community',
      description: 'Ask questions, share knowledge, and help others in our vibrant community.'
    }
  ];

  const stats = [
    { number: '10K+', label: 'Active Learners' },
    { number: '500+', label: 'Courses Available' },
    { number: '50K+', label: 'Questions Answered' },
    { number: '1M+', label: 'Points Earned' }
  ];

  const benefits = [
    'Access to premium educational content',
    'Networking with industry professionals',
    'Career guidance and mentorship',
    'Skill-based learning paths',
    'Real-world project experience',
    'Certificate programs'
  ];

  return (
    <>
      <Helmet>
        <title>XShared - Educational Platform for Professional Growth</title>
        <meta name="description" content="Join XShared, the premier educational platform connecting students and professionals. Learn, share experiences, and grow your career with our comprehensive resources." />
        <meta property="og:title" content="XShared - Educational Platform for Professional Growth" />
        <meta property="og:description" content="Join XShared, the premier educational platform connecting students and professionals. Learn, share experiences, and grow your career with our comprehensive resources." />
      </Helmet>

      <div className="min-h-screen">
        {/* Header */}
        <header className="relative overflow-hidden">
          <nav className="relative z-10 flex justify-between items-center p-6 max-w-7xl mx-auto">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">X</span>
              </div>
              <span className="text-2xl font-bold text-white">XShared</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/login">
                <Button variant="ghost" className="text-white hover:bg-white/10">
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-white text-purple-600 hover:bg-white/90">
                  Get Started
                </Button>
              </Link>
            </div>
          </nav>

          {/* Hero Section */}
          <section className="hero-section relative py-20 px-6">
            <div className="max-w-7xl mx-auto text-center relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
                  Learn. Share.
                  <span className="block gradient-text">Grow Together.</span>
                </h1>
                <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto">
                  Join the premier educational platform connecting students and professionals. 
                  Share experiences, learn from experts, and accelerate your career growth.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/signup">
                    <Button size="lg" className="bg-white text-purple-600 hover:bg-white/90 px-8 py-4 text-lg">
                      Start Learning Today
                      <ArrowRight className="ml-2" size={20} />
                    </Button>
                  </Link>
                  <Link to="/login">
                    <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-4 text-lg">
                      Sign In
                    </Button>
                  </Link>
                </div>
              </motion.div>

              {/* Floating Elements */}
              <div className="absolute top-20 left-10 animate-float">
                <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <GraduationCap size={32} className="text-white" />
                </div>
              </div>
              <div className="absolute top-40 right-20 animate-float" style={{ animationDelay: '2s' }}>
                <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <Award size={24} className="text-white" />
                </div>
              </div>
              <div className="absolute bottom-20 left-20 animate-float" style={{ animationDelay: '4s' }}>
                <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <Users size={36} className="text-white" />
                </div>
              </div>
            </div>
          </section>
        </header>

        {/* Stats Section */}
        <section className="py-16 bg-white/5 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                    {stat.number}
                  </div>
                  <div className="text-white/80 font-medium">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Why Choose XShared?
              </h2>
              <p className="text-xl text-white/80 max-w-3xl mx-auto">
                Discover the features that make XShared the perfect platform for your educational journey.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <Card className="feature-card h-full">
                      <CardContent className="p-6 text-center">
                        <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Icon size={32} className="text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-3">
                          {feature.title}
                        </h3>
                        <p className="text-white/80">
                          {feature.description}
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 px-6 bg-white/5 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                  Unlock Your Potential
                </h2>
                <p className="text-xl text-white/80 mb-8">
                  Join thousands of learners who are advancing their careers through our comprehensive platform.
                </p>
                <div className="space-y-4">
                  {benefits.map((benefit, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className="flex items-center space-x-3"
                    >
                      <CheckCircle size={20} className="text-green-400 flex-shrink-0" />
                      <span className="text-white/90">{benefit}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="relative"
              >
                <div className="relative">
                  <img  
                    className="rounded-2xl shadow-2xl w-full" 
                    alt="Students collaborating on educational projects"
                   src="https://images.unsplash.com/photo-1592303637753-ce1e6b8a0ffb" />
                  <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center animate-pulse-slow">
                    <Star size={32} className="text-white" />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Ready to Start Your Journey?
              </h2>
              <p className="text-xl text-white/80 mb-8">
                Join XShared today and become part of a thriving community of learners and professionals.
              </p>
              <Link to="/signup">
                <Button size="lg" className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 px-12 py-4 text-lg">
                  Get Started Now
                  <ArrowRight className="ml-2" size={20} />
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-black/20 backdrop-blur-sm border-t border-white/10 py-12 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-4 gap-8">
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold">X</span>
                  </div>
                  <span className="text-xl font-bold text-white">XShared</span>
                </div>
                <p className="text-white/70">
                  Empowering learners and professionals to achieve their goals through education and collaboration.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-white mb-4">Platform</h3>
                <ul className="space-y-2 text-white/70">
                  <li>Courses</li>
                  <li>Community</li>
                  <li>Resources</li>
                  <li>Rewards</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-white mb-4">Support</h3>
                <ul className="space-y-2 text-white/70">
                  <li>Help Center</li>
                  <li>Contact Us</li>
                  <li>Privacy Policy</li>
                  <li>Terms of Service</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-white mb-4">Connect</h3>
                <ul className="space-y-2 text-white/70">
                  <li>LinkedIn</li>
                  <li>Twitter</li>
                  <li>Facebook</li>
                  <li>Instagram</li>
                </ul>
              </div>
            </div>
            <div className="border-t border-white/10 mt-8 pt-8 text-center text-white/70">
              <p>&copy; 2024 XShared. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default HomePage;