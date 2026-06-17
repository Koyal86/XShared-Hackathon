import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';

const CommunityHighlights = () => {
  const highlights = [
    {
      title: "New Course: Advanced React Patterns",
      description: "Learn advanced React concepts and patterns",
      author: "Sarah Chen",
      time: "2 hours ago"
    },
    {
      title: "Internship Success Story",
      description: "How I landed my dream internship at Google",
      author: "Mike Johnson",
      time: "5 hours ago"
    },
    {
      title: "Q&A: Career Transition Tips",
      description: "Expert advice on switching careers",
      author: "Dr. Emily Rodriguez",
      time: "1 day ago"
    }
  ];

  return (
    <section className="py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Community Highlights
          </h2>
          <p className="text-lg text-white/80">
            See what's happening in the XShared community
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {highlights.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="feature-card">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-white/80 mb-4">
                    {item.description}
                  </p>
                  <div className="flex items-center justify-between text-sm text-white/60">
                    <span>by {item.author}</span>
                    <span>{item.time}</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CommunityHighlights;