import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import { Link } from 'react-router-dom';
import { Plus, BookOpen, MessageCircle } from 'lucide-react';

const QuickActions = () => {
  const { user, updateUser } = useAuth();
  const { toast } = useToast();

  return (
    <section className="py-16 px-6 bg-white/5 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Quick Actions
          </h2>
          <p className="text-lg text-white/80">
            Jump into the most popular activities
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Share Your Story */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Card className="feature-card text-center">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Plus size={32} className="text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  Share Your Story
                </h3>
                <p className="text-white/80 mb-4">
                  Tell the community about your experiences and earn 100 points
                </p>
                <Link to="/share-experience">
                  <Button
                    className="bg-green-500 hover:bg-green-600"
                    onClick={() => {
                      updateUser({
                        points: (user.points || 0),
                        contributions: (user.contributions || 0),
                      });
                      toast({
                        title: 'Story shared!',
                        description: 'Welcome to our Share-Experience page.',
                      });
                    }}
                  >
                    Share Now
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </motion.div>

          {/* Start Learning */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="feature-card text-center">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen size={32} className="text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  Start Learning
                </h3>
                <p className="text-white/80 mb-4">
                  Begin a new course and earn 50 points upon completion
                </p>
                <Link to="/courses">
                  <Button
                    className="bg-blue-500 hover:bg-blue-600"
                    onClick={() => {
                      updateUser({
                        points: (user.points || 0),
                        coursesCompleted: (user.coursesCompleted || 0),
                      });
                      toast({
                        title: 'Course started!',
                        description: 'Welcome to our Course page.',
                      });
                    }}
                  >
                    Start Course
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </motion.div>

          {/* Ask Questions */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card className="feature-card text-center">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageCircle size={32} className="text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  Ask Questions
                </h3>
                <p className="text-white/80 mb-4">
                  Get help from the community and help others learn
                </p>
                <Link to="/qa">
                  <Button
                    className="bg-purple-500 hover:bg-purple-600"
                    onClick={() =>
                      toast({
                        title: 'Question asked!',
                        description:
                          'Welcome to our Q&A page.',
                      })
                    }
                  >
                    Ask Now
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default QuickActions;
