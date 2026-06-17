import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { Plus, Search } from 'lucide-react';
import QASidebar from '@/components/qa/QASidebar';
import QACreate from '@/components/qa/QACreate';
import QAList from '@/components/qa/QAList';
import { useAuth } from '@/contexts/AuthContext';

const initialQuestions = [
  {
    id: 1,
    title: 'How to prepare for technical interviews at FAANG companies?',
    content: 'I have been practicing coding problems but I want to know what else I should focus on for technical interviews at top tech companies.',
    author: 'Sarah Chen',
    authorAvatar: '',
    category: 'career',
    tags: ['interview', 'faang', 'preparation'],
    votes: 24,
    answers: 8,
    views: 156,
    timestamp: new Date().toISOString(),
    isAnswered: true,
    comments: []
  },
  {
    id: 2,
    title: 'Best resources for learning React in 2024?',
    content: 'I am new to React and looking for comprehensive resources to learn it effectively. What would you recommend?',
    author: 'Mike Johnson',
    authorAvatar: '',
    category: 'technical',
    tags: ['react', 'javascript', 'learning'],
    votes: 18,
    answers: 12,
    views: 89,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
    isAnswered: true,
    comments: []
  }
];

const QAPage = () => {
  const { toast } = useToast();
  const { user, updateUser } = useAuth();
  const [showCreateQuestion, setShowCreateQuestion] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('recent');

  // central questions state; load from localStorage if present
  const [questions, setQuestions] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('xshared_questions')) || initialQuestions;
    } catch {
      return initialQuestions;
    }
  });

  // persist questions to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem('xshared_questions', JSON.stringify(questions));
    } catch (e) {
      /* ignore storage errors */
    }
  }, [questions]);

  // add a new question (called from QACreate)
  const handleAddQuestion = ({ title, content, category, tags = [] }) => {
    if (!title || !content) {
      toast({ title: 'Missing fields', description: 'Title and content are required.', variant: 'destructive' });
      return;
    }

    const newQuestion = {
      id: Date.now(),
      title,
      content,
      category: category || 'general',
      tags: Array.isArray(tags) ? tags : (tags || '').split(',').map(t => t.trim()).filter(Boolean),
      author: user?.name || 'You',
      authorAvatar: user?.avatar || '',
      votes: 0,
      answers: 0,
      views: 0,
      timestamp: new Date().toISOString(),
      isAnswered: false,
      comments: []
    };

    setQuestions(prev => [newQuestion, ...prev]);

    // award points to logged-in user (fallbacks handled inside updateUser)
    if (updateUser) updateUser({ points: (user?.points || 0) + 10, contributions: (user?.contributions || 0) + 1 });

    toast({ title: 'Question posted!', description: 'You earned 10 points for asking a question.' });
    setShowCreateQuestion(false);
  };

  const handleVote = (questionId, voteType) => {
    setQuestions(prev => prev.map(q => q.id === questionId ? { ...q, votes: q.votes + (voteType === 'up' ? 1 : -1) } : q));
    if (updateUser) updateUser({ points: (user?.points || 0) + 2 });
    toast({ title: 'Vote recorded', description: 'Thanks for participating — +2 points.' });
  };

  const handleComment = (questionId, commentText) => {
    if (!commentText || !commentText.trim()) return;
    const comment = {
      author: user?.name || 'You',
      authorAvatar: user?.avatar || '',
      text: commentText,
      timestamp: new Date().toISOString()
    };
    setQuestions(prev => prev.map(q => q.id === questionId ? { ...q, comments: [...q.comments, comment], answers: (q.answers || 0) + 1 } : q));
    if (updateUser) updateUser({ points: (user?.points || 0) + 20, contributions: (user?.contributions || 0) + 1 });
    toast({ title: 'Comment posted', description: 'You earned 20 points for helping.' });
  };

  const handleBookmark = (question) => {
    const currentBookmarks = user?.bookmarks || [];
    const exists = currentBookmarks.some(b => b.id === question.id);
    const updated = exists ? currentBookmarks.filter(b => b.id !== question.id) : [...currentBookmarks, question];
    if (updateUser) updateUser({ bookmarks: updated });
    toast({ title: exists ? 'Bookmark removed' : 'Question bookmarked!' });
  };

  return (
    <>
      <Helmet>
        <title>Q&A Community - XShared Educational Platform</title>
      </Helmet>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Q&A Community</h1>
              <p className="text-white/80">Ask questions, share knowledge, and help others learn</p>
            </div>

            <Button onClick={() => setShowCreateQuestion(true)} className="bg-gradient-to-r from-blue-500 to-purple-600 mt-4 md:mt-0">
              <Plus size={20} className="mr-2" /> Ask Question
            </Button>
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60" />
              <Input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search questions, tags, or content..." className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/50" />
            </div>

            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="bg-white/10 border border-white/20 rounded-md px-3 py-2 text-white">
              <option value="recent">Most Recent</option>
              <option value="votes">Most Voted</option>
              <option value="answers">Most Answered</option>
            </select>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-4 gap-8">
          <QASidebar selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />

          <div className="lg:col-span-3">
            {showCreateQuestion && (
              <QACreate setShowCreateQuestion={setShowCreateQuestion} onAddQuestion={handleAddQuestion} />
            )}

            <QAList
              questions={questions}
              searchQuery={searchQuery}
              selectedCategory={selectedCategory}
              sortBy={sortBy}
              onVote={handleVote}
              onComment={handleComment}
              onBookmark={handleBookmark}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default QAPage;
