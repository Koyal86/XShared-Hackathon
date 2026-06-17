import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Plus, Heart, MessageCircle, Share, Bookmark } from 'lucide-react';
import { motion } from 'framer-motion';

const ProfileFeed = () => {
  const { user, updateUser } = useAuth();
  const { toast } = useToast();
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [newPostContent, setNewPostContent] = useState('');
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const storedPosts = JSON.parse(localStorage.getItem(`xshared_posts_${user?.id}`)) || [
        { id: 1, content: "Just completed my first React course! The journey was challenging but incredibly rewarding.", type: 'achievement', likes: 24, comments: 8, shares: 3, timestamp: '2 hours ago' },
        { id: 2, content: "Sharing my internship experience at TechCorp. The mentorship program was amazing.", type: 'experience', likes: 45, comments: 12, shares: 8, timestamp: '1 day ago' },
        { id: 3, content: "Question: What's the best way to prepare for technical interviews?", type: 'question', likes: 18, comments: 15, shares: 2, timestamp: '3 days ago' }
      ];
    setPosts(storedPosts);
  }, [user?.id]);
  
  const bookmarkedQuestions = user?.bookmarks || [];

  const handleCreatePost = () => {
    if (!newPostContent.trim()) {
      toast({ title: "Content required", description: "Please write something before posting.", variant: "destructive" });
      return;
    }

    const newPost = {
      id: Date.now(),
      content: newPostContent,
      type: 'experience',
      likes: 0,
      comments: 0,
      shares: 0,
      timestamp: 'just now',
    };

    const updatedPosts = [newPost, ...posts];
    setPosts(updatedPosts);
    localStorage.setItem(`xshared_posts_${user.id}`, JSON.stringify(updatedPosts));

    updateUser({ points: (user.points || 0) + 25, contributions: (user.contributions || 0) + 1 });
    toast({ title: "Post created!", description: "You earned 25 points for sharing with the community." });
    setNewPostContent('');
    setShowCreatePost(false);
  };

  const getPostTypeColor = (type) => {
    switch (type) {
      case 'achievement': return 'bg-green-500';
      case 'experience': return 'bg-blue-500';
      case 'question': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      <Card className="feature-card">
        <CardContent className="p-6">
          {showCreatePost ? (
            <div className="space-y-4">
              <Textarea value={newPostContent} onChange={(e) => setNewPostContent(e.target.value)} placeholder="Share your thoughts..." className="bg-white/10 border-white/20 text-white min-h-[100px]" />
              <div className="flex justify-end space-x-2">
                <Button size="sm" onClick={handleCreatePost}>Post</Button>
                <Button size="sm" variant="outline" onClick={() => setShowCreatePost(false)}>Cancel</Button>
              </div>
            </div>
          ) : (
            <Button onClick={() => setShowCreatePost(true)} className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
              <Plus size={20} className="mr-2" /> Create Post
            </Button>
          )}
        </CardContent>
      </Card>

      <div className="space-y-4">
        <h3 className="text-xl font-bold text-white">Your Posts</h3>
        {posts.map((post, index) => (
          <motion.div key={post.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: index * 0.1 }}>
            <Card className="post-card">
              <CardContent className="p-6">
                <div className="flex items-start space-x-3 mb-4">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={user?.avatar} />
                    <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">{user?.name?.charAt(0) || 'U'}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium text-white">{user?.name}</span>
                      <div className={`w-2 h-2 rounded-full ${getPostTypeColor(post.type)}`}></div>
                      <span className="text-xs text-white/60">{post.timestamp}</span>
                    </div>
                  </div>
                </div>
                <p className="text-white/90 mb-4">{post.content}</p>
                <div className="flex items-center space-x-6 text-white/60">
                  <button className="flex items-center space-x-1 hover:text-red-400 transition-colors"><Heart size={16} /><span>{post.likes}</span></button>
                  <button className="flex items-center space-x-1 hover:text-blue-400 transition-colors"><MessageCircle size={16} /><span>{post.comments}</span></button>
                  <button className="flex items-center space-x-1 hover:text-green-400 transition-colors"><Share size={16} /><span>{post.shares}</span></button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-bold text-white">Bookmarked Questions</h3>
        {bookmarkedQuestions.length > 0 ? bookmarkedQuestions.map((question, index) => (
          <motion.div key={question.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: index * 0.1 }}>
            <Card className="post-card">
              <CardContent className="p-6">
                <p className="text-white/90 font-semibold">{question.title}</p>
                <p className="text-white/70 text-sm mt-2 line-clamp-2">{question.content}</p>
              </CardContent>
            </Card>
          </motion.div>
        )) : (
          <Card className="post-card">
            <CardContent className="p-6 text-center text-white/60">
              <Bookmark size={24} className="mx-auto mb-2" />
              You haven't bookmarked any questions yet.
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ProfileFeed;