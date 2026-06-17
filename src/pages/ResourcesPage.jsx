import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { Search, Plus } from 'lucide-react';
import ResourcesSidebar from '@/components/resources/ResourcesSidebar';
import ResourcesGrid from '@/components/resources/ResourcesGrid';
import { useAuth } from '@/contexts/AuthContext';

const ResourcesPage = () => {
  const { toast } = useToast();
  const { user, updateUser } = useAuth(); 
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [showForm, setShowForm] = useState(false);
  const [resources, setResources] = useState([]);

  const [formData, setFormData] = useState({
    title: '',
    link: '',
    category: '',
    type: '',
    description: ''
  });

  // ✅ Load user’s saved resources from localStorage
  useEffect(() => {
    if (user?.id) {
      const saved = JSON.parse(localStorage.getItem(`xshared_resources_${user.id}`)) || [];
      setResources(saved);
    }
  }, [user?.id]);

  const handleSubmit = () => {
    if (!formData.title || !formData.link) {
      toast({ title: "⚠️ Please fill at least title and link" });
      return;
    }

    const newResource = {
      id: Date.now(),
      ...formData,
      author: user?.name || "Anonymous"
    };

    // ✅ Always prepend to top
    const updated = [newResource, ...resources];
    setResources(updated);

    // ✅ Save to localStorage
    if (user?.id) {
      localStorage.setItem(`xshared_resources_${user.id}`, JSON.stringify(updated));
    }

    // ✅ Add points + contributions + recent activity
    if (updateUser && user?.id) {
      updateUser({
        points: (user?.points || 0) + 50,
        contributions: (user?.contributions || 0) + 1,
      });

      const activities =
        JSON.parse(localStorage.getItem(`xshared_recent_${user.id}`)) || [];
      const newActivity = {
        type: "resource",
        title: `Submitted resource: ${formData.title}`,
        points: 50,
        time: "just now",
      };
      localStorage.setItem(
        `xshared_recent_${user.id}`,
        JSON.stringify([newActivity, ...activities])
      );
    }

    toast({
      title: "✅ Resource Submitted",
      description: "Your resource has been added to the library."
    });

    setFormData({ title: '', link: '', category: '', type: '', description: '' });
    setShowForm(false);
  };

  return (
    <>
      <Helmet>
        <title>Learning Resources - XShared Educational Platform</title>
        <meta name="description" content="Discover curated learning resources including courses, videos, articles, and tools to accelerate your professional growth on XShared." />
        <meta property="og:title" content="Learning Resources - XShared Educational Platform" />
        <meta property="og:description" content="Discover curated learning resources including courses, videos, articles, and tools to accelerate your professional growth on XShared." />
      </Helmet>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                Learning Resources
              </h1>
              <p className="text-white/80">
                Curated collection of courses, videos, articles, and tools
              </p>
            </div>
            <Button 
              onClick={() => setShowForm(true)}
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 mt-4 md:mt-0"
            >
              <Plus size={20} className="mr-2" />
              Submit Resource
            </Button>
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search resources, topics, or tags..."
                className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/50"
              />
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-4 gap-8">
          <ResourcesSidebar 
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            selectedType={selectedType}
            setSelectedType={setSelectedType}
            setSearchQuery={setSearchQuery}
          />
          
          <div className="lg:col-span-3">
            <ResourcesGrid 
              searchQuery={searchQuery}
              selectedCategory={selectedCategory}
              selectedType={selectedType}
              resources={resources}  // ✅ always most recent first
            />
          </div>
        </div>
      </div>

      {/* ✅ Modal Form */}
      {showForm && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-gray-900 p-6 rounded-xl w-full max-w-lg space-y-4">
            <h2 className="text-xl font-bold text-white mb-4">Submit New Resource</h2>

            <Input 
              placeholder="Resource Title" 
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
            <Input 
              placeholder="Link (https://...)" 
              value={formData.link}
              onChange={(e) => setFormData({ ...formData, link: e.target.value })}
            />
            <Input 
              placeholder="Category (e.g. Web Dev, AI)" 
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            />
            <Input 
              placeholder="Type (Course, Video, Article...)" 
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            />
            <Textarea
              placeholder="Short description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />

            <div className="flex justify-end space-x-3 mt-4">
              <Button variant="outline" onClick={() => setShowForm(false)}>Cancel</Button>
              <Button 
                className="bg-gradient-to-r from-blue-500 to-purple-600" 
                onClick={handleSubmit}
              >
                Submit
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ResourcesPage;
