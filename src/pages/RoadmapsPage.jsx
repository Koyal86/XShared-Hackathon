import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Map, CheckCircle, Lock } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const RoadmapsPage = () => {
  const { toast } = useToast();

  const roadmaps = [
    {
      id: 1,
      title: 'Frontend Developer',
      description: 'Master the skills to become a modern frontend developer.',
      steps: ['HTML, CSS, & JS', 'React', 'State Management', 'Testing', 'Deployment'],
      isPremium: false,
      progress: 60
    },
    {
      id: 2,
      title: 'Backend Developer',
      description: 'Learn to build robust server-side applications and APIs.',
      steps: ['Node.js & Express', 'Databases (SQL/NoSQL)', 'Authentication', 'APIs', 'DevOps'],
      isPremium: false,
      progress: 20
    },
    {
      id: 3,
      title: 'Full-Stack Developer',
      description: 'Become a versatile developer who can handle both frontend and backend.',
      steps: ['Frontend Basics', 'Backend Basics', 'Full-Stack Frameworks', 'Databases', 'Deployment'],
      isPremium: true,
      progress: 0
    },
    {
      id: 4,
      title: 'DevOps Engineer',
      description: 'Master the tools and practices for continuous integration and delivery.',
      steps: ['Linux & Scripting', 'CI/CD', 'Docker & Kubernetes', 'Cloud Platforms', 'Monitoring'],
      isPremium: true,
      progress: 0
    }
  ];

  return (
    <>
      <Helmet>
        <title>Learning Roadmaps - XShared</title>
        <meta name="description" content="Follow structured learning roadmaps to achieve your career goals." />
      </Helmet>
      <div className="max-w-7xl mx-auto px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            Learning Roadmaps
          </h1>
          <p className="text-white/80">
            Your guided path to mastering new skills and achieving career goals.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {roadmaps.map((roadmap, index) => (
            <motion.div
              key={roadmap.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="feature-card h-full">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-white flex items-center">
                      <Map className="mr-2" />
                      {roadmap.title}
                    </CardTitle>
                    {roadmap.isPremium && (
                      <div className="bg-yellow-500 p-1.5 rounded-full">
                        <Lock size={14} className="text-black" />
                      </div>
                    )}
                  </div>
                  <p className="text-white/80 pt-2">{roadmap.description}</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 mb-4">
                    {roadmap.steps.map((step, stepIndex) => (
                      <div key={stepIndex} className="flex items-center space-x-2">
                        <CheckCircle size={16} className={roadmap.progress > (stepIndex * 20) ? "text-green-400" : "text-white/30"} />
                        <span className={roadmap.progress > (stepIndex * 20) ? "text-white" : "text-white/50"}>{step}</span>
                      </div>
                    ))}
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-2.5 mb-4">
                    <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-2.5 rounded-full" style={{ width: `${roadmap.progress}%` }}></div>
                  </div>
                  <Button className="w-full" disabled={roadmap.isPremium} onClick={() => toast({ title: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀" })}>
                    {roadmap.isPremium ? 'Unlock with Premium' : 'Continue Learning'}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );
};

export default RoadmapsPage;