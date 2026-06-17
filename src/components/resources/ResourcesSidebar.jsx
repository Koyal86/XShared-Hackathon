import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BookOpen, Video, FileText, Link, Filter, Star } from 'lucide-react';

const ResourcesSidebar = ({ selectedCategory, setSelectedCategory, selectedType, setSelectedType, setSearchQuery }) => {
  const resourceTypes = [
    { id: 'all', label: 'All Types', icon: FileText },
    { id: 'course', label: 'Courses', icon: BookOpen },
    { id: 'video', label: 'Videos', icon: Video },
    { id: 'article', label: 'Articles', icon: FileText },
    { id: 'tool', label: 'Tools', icon: Link }
  ];

  const popularTags = ['react', 'javascript', 'python', 'design', 'ui/ux', 'career', 'data-science', 'marketing'];

  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="lg:col-span-1 space-y-6"
    >
      <Card className="feature-card">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Filter className="mr-2" size={20} />
            Resource Types
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {resourceTypes.map((type) => {
              const Icon = type.icon;
              return (
                <button
                  key={type.id}
                  onClick={() => setSelectedType(type.id)}
                  className={`w-full text-left p-3 rounded-lg transition-all duration-200 flex items-center space-x-3 ${
                    selectedType === type.id
                      ? 'bg-blue-500/20 border border-blue-400'
                      : 'bg-white/5 hover:bg-white/10 border border-transparent'
                  }`}
                >
                  <Icon size={18} className="text-white/70" />
                  <span className="text-white font-medium">{type.label}</span>
                </button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <Card className="feature-card">
        <CardHeader>
          <CardTitle className="text-white">Popular Tags</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {popularTags.map((tag, index) => (
              <Badge 
                key={index} 
                variant="outline" 
                className="text-white/70 border-white/20 hover:bg-white/10 cursor-pointer"
                onClick={() => setSearchQuery(tag)}
              >
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="feature-card">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Star className="mr-2" size={20} />
            Featured
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <img  class="w-full h-32 object-cover rounded-lg" alt="Featured course on advanced web development" src="https://images.unsplash.com/photo-1675495667069-d18d7d78eeb2" />
            <h4 className="font-semibold text-white">Advanced Web Development</h4>
            <p className="text-sm text-white/80">Master modern web technologies</p>
            <Button size="sm" className="w-full">Learn More</Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ResourcesSidebar;