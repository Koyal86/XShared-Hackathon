import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { BookOpen, Video, FileText, Link, ExternalLink, Star, Clock, Users } from 'lucide-react';

const ResourcesGrid = ({ searchQuery, selectedCategory, selectedType }) => {
  const { toast } = useToast();

  const resources = [
    { id: 1, title: 'Complete React Developer Course', description: 'Master React from basics to advanced concepts with hands-on projects', type: 'course', category: 'programming', author: 'Sarah Chen', rating: 4.8, students: 12500, duration: '40 hours', level: 'Intermediate', tags: ['react', 'javascript', 'frontend'], isPremium: false, url: '#' },
    { id: 2, title: 'UI/UX Design Fundamentals', description: 'Learn the principles of user interface and user experience design', type: 'course', category: 'design', author: 'Mike Johnson', rating: 4.9, students: 8900, duration: '25 hours', level: 'Beginner', tags: ['ui', 'ux', 'design', 'figma'], isPremium: true, url: '#' },
    { id: 3, title: 'Data Science with Python', description: 'Comprehensive guide to data analysis and machine learning', type: 'video', category: 'data-science', author: 'Dr. Emily Rodriguez', rating: 4.7, students: 15600, duration: '60 hours', level: 'Advanced', tags: ['python', 'data-science', 'machine-learning'], isPremium: false, url: '#' },
    { id: 4, title: 'Career Development Guide', description: 'Essential tips for advancing your professional career', type: 'article', category: 'career', author: 'Alex Thompson', rating: 4.6, students: 5200, duration: '2 hours', level: 'All Levels', tags: ['career', 'professional-development', 'networking'], isPremium: false, url: '#' },
    { id: 5, title: 'Figma Design Tool', description: 'Professional design tool for UI/UX designers', type: 'tool', category: 'design', author: 'Figma Team', rating: 4.9, students: 25000, duration: 'Lifetime', level: 'All Levels', tags: ['figma', 'design', 'prototyping'], isPremium: false, url: '#' },
    { id: 6, title: 'Digital Marketing Strategies', description: 'Modern approaches to digital marketing and growth', type: 'course', category: 'marketing', author: 'Lisa Wang', rating: 4.5, students: 7800, duration: '30 hours', level: 'Intermediate', tags: ['marketing', 'digital', 'growth', 'seo'], isPremium: true, url: '#' }
  ];

  const filteredResources = resources.filter(resource => 
    (resource.title.toLowerCase().includes(searchQuery.toLowerCase()) || resource.description.toLowerCase().includes(searchQuery.toLowerCase())) &&
    (selectedCategory === 'all' || resource.category === selectedCategory) &&
    (selectedType === 'all' || resource.type === selectedType)
  );

  const getTypeIcon = (type) => ({ course: BookOpen, video: Video, article: FileText, tool: Link }[type] || FileText);
  const getTypeColor = (type) => ({ course: 'bg-blue-500', video: 'bg-red-500', article: 'bg-green-500', tool: 'bg-purple-500' }[type] || 'bg-gray-500');
  const getLevelColor = (level) => ({ 'Beginner': 'bg-green-500', 'Intermediate': 'bg-yellow-500', 'Advanced': 'bg-red-500', 'All Levels': 'bg-blue-500' }[level] || 'bg-gray-500');

  const handleResourceClick = () => toast({ title: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀" });

  return (
    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}>
      <div className="flex items-center justify-between mb-6">
        <div className="text-white/80">{filteredResources.length} resources found</div>
        <select className="bg-white/10 border border-white/20 rounded-md px-3 py-2 text-white text-sm">
          <option value="popular">Most Popular</option>
          <option value="recent">Most Recent</option>
          <option value="rating">Highest Rated</option>
        </select>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        {filteredResources.map((resource, index) => {
          const TypeIcon = getTypeIcon(resource.type);
          return (
            <motion.div key={resource.id} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: index * 0.1 }}>
              <Card className="feature-card h-full cursor-pointer" onClick={handleResourceClick}>
                <div className="relative">
                  <img  class="w-full h-48 object-cover rounded-t-lg" alt={resource.title} src="https://images.unsplash.com/photo-1677696795233-5ef097695f12" />
                  <div className="absolute top-3 left-3"><Badge className={`${getTypeColor(resource.type)} text-white`}><TypeIcon size={14} className="mr-1" />{resource.type}</Badge></div>
                  {resource.isPremium && <div className="absolute top-3 right-3"><Badge className="bg-yellow-500 text-black">Premium</Badge></div>}
                </div>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-3"><h3 className="text-lg font-semibold text-white line-clamp-2">{resource.title}</h3></div>
                  <p className="text-white/80 text-sm mb-4 line-clamp-2">{resource.description}</p>
                  <div className="flex items-center space-x-4 text-sm text-white/60 mb-4">
                    <div className="flex items-center space-x-1"><Star size={14} className="text-yellow-400" /><span>{resource.rating}</span></div>
                    <div className="flex items-center space-x-1"><Users size={14} /><span>{resource.students.toLocaleString()}</span></div>
                    <div className="flex items-center space-x-1"><Clock size={14} /><span>{resource.duration}</span></div>
                  </div>
                  <div className="flex items-center justify-between mb-4">
                    <Badge className={`${getLevelColor(resource.level)} text-white text-xs`}>{resource.level}</Badge>
                    <span className="text-white/70 text-sm">by {resource.author}</span>
                  </div>
                  <div className="flex flex-wrap gap-1 mb-4">{resource.tags.slice(0, 3).map((tag, i) => <Badge key={i} variant="outline" className="text-xs text-white/60 border-white/20">{tag}</Badge>)}</div>
                  <div className="flex space-x-2">
                    <Button size="sm" className="flex-1">{resource.type === 'tool' ? 'Use Tool' : 'Start Learning'}</Button>
                    <Button size="sm" variant="outline" className="text-white border-white/20"><ExternalLink size={16} /></Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>
      {filteredResources.length === 0 && (
        <div className="text-center py-12">
          <BookOpen size={48} className="text-white/40 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">No resources found</h3>
          <p className="text-white/60 mb-4">Try adjusting your search terms or filters</p>
          <Button onClick={() => {}} variant="outline" className="text-white border-white/20">Clear Filters</Button>
        </div>
      )}
    </motion.div>
  );
};

export default ResourcesGrid;