// src/components/qa/QAList.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import { Textarea } from '@/components/ui/textarea';
import { 
  ChevronUp, ChevronDown, MessageCircle, TrendingUp, Clock, 
  CheckCircle, Bookmark, Send 
} from 'lucide-react';

const initialQuestions = [
  { id: 1, title: 'How to prepare for technical interviews at FAANG companies?', content: 'I have been practicing coding problems but I want to know what else I should focus on for technical interviews at top tech companies.', author: 'Sarah Chen', authorAvatar: '', category: 'career', tags: ['interview', 'faang', 'preparation'], votes: 24, answers: 8, views: 156, timestamp: '2024-09-10T12:00:00Z', isAnswered: true, userVote: null, comments: [], isBookmarked: false },
  { id: 2, title: 'Best resources for learning React in 2024?', content: 'I am new to React and looking for comprehensive resources to learn it effectively. What would you recommend?', author: 'Mike Johnson', authorAvatar: '', category: 'technical', tags: ['react', 'javascript', 'learning'], votes: 18, answers: 12, views: 89, timestamp: '2024-09-10T08:00:00Z', isAnswered: true, userVote: null, comments: [], isBookmarked: false },
  { id: 3, title: 'How to balance internship with college coursework?', content: 'I just got an internship offer but I am worried about managing both internship responsibilities and my college studies.', author: 'Emily Davis', authorAvatar: '', category: 'internship', tags: ['internship', 'college', 'time-management'], votes: 15, answers: 6, views: 67, timestamp: '2024-09-09T14:00:00Z', isAnswered: false, userVote: null, comments: [], isBookmarked: false },
  { id: 4, title: 'What programming language should I learn first?', content: 'I am completely new to programming and want to start my journey. Which language would be best for a beginner?', author: 'Alex Rodriguez', authorAvatar: '', category: 'education', tags: ['programming', 'beginner', 'languages'], votes: 32, answers: 15, views: 234, timestamp: '2024-09-08T09:00:00Z', isAnswered: true, userVote: null, comments: [], isBookmarked: false }
];

const QuestionCard = ({ question, onVote, onBookmark, onComment }) => {
  const { user } = useAuth();
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState('');

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (commentText.trim()) {
      onComment(question.id, commentText);
      setCommentText('');
    }
  };

  const getCategoryColor = (category) => ({
    career: 'bg-blue-500',
    technical: 'bg-green-500',
    education: 'bg-purple-500',
    internship: 'bg-orange-500',
    general: 'bg-gray-500'
  }[category] || 'bg-gray-500');

  return (
    <Card className="question-card">
      <CardContent className="p-6">
        <div className="flex space-x-4">
          {/* Votes */}
          <div className="flex flex-col items-center space-y-2 min-w-[60px]">
            <button onClick={() => onVote(question.id, 'up')} className="p-2 rounded-full hover:bg-white/10">
              <ChevronUp size={20} className="text-white/70 hover:text-green-400" />
            </button>
            <span className="text-lg font-bold text-white">{question.votes}</span>
            <button onClick={() => onVote(question.id, 'down')} className="p-2 rounded-full hover:bg-white/10">
              <ChevronDown size={20} className="text-white/70 hover:text-red-400" />
            </button>
          </div>

          {/* Question content */}
          <div className="flex-1">
            <div className="flex items-start justify-between mb-3">
              <h3 className="text-xl font-semibold text-white hover:text-blue-400 cursor-pointer">
                {question.title}
              </h3>
              <div className="flex items-center gap-2">
                {question.isAnswered && <CheckCircle size={20} className="text-green-400 flex-shrink-0" />}
                <Button variant="ghost" size="icon" onClick={() => onBookmark(question.id)} className="h-8 w-8">
                  <Bookmark
                    size={16}
                    className={
                      question.isBookmarked
                        ? "text-yellow-400"
                        : "text-white/70"
                    }
                  />
                </Button>
              </div>
            </div>

            <p className="text-white/80 mb-4 line-clamp-2">{question.content}</p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge className={`${getCategoryColor(question.category)} text-white`}>
                {question.category}
              </Badge>
              {question.tags.map((tag, i) => (
                <Badge key={i} variant="outline" className="text-white/70 border-white/20">{tag}</Badge>
              ))}
            </div>

            {/* Meta */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 text-sm text-white/60">
                <button
                  onClick={() => setShowComments(!showComments)}
                  className="flex items-center space-x-1 hover:text-blue-400 transition-colors"
                >
                  <MessageCircle size={16} />
                  <span>{(question.comments && question.comments.length) || question.answers} answers</span>
                </button>
                <div className="flex items-center space-x-1">
                  <TrendingUp size={16} />
                  <span>{question.views} views</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock size={16} />
                  <span>{new Date(question.timestamp).toLocaleString()}</span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src={question.authorAvatar} />
                  <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs">
                    {question.author?.charAt(0) || 'U'}
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm text-white/80">{question.author}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Comments */}
        {showComments && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mt-4 pl-16 space-y-4"
          >
            {(question.comments || []).map((comment, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 bg-white/5 rounded-lg">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={comment.authorAvatar} />
                  <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs">
                    {comment.author?.charAt(0) || 'U'}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-white text-sm">{comment.author}</span>
                    <span className="text-xs text-white/60">{comment.timestamp}</span>
                  </div>
                  <p className="text-white/80 text-sm mt-1">{comment.text}</p>
                </div>
              </div>
            ))}

            <form onSubmit={handleCommentSubmit} className="flex items-center space-x-3 pt-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src={user?.avatar} />
                <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs">
                  {user?.name?.charAt(0) || "U"}
                </AvatarFallback>
              </Avatar>
              <Textarea
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Write a comment..."
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50 flex-1 resize-none h-10"
                rows={1}
              />
              <Button type="submit" size="icon" className="h-10 w-10">
                <Send size={16} />
              </Button>
            </form>
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
};

const QAList = ({ searchQuery = '', selectedCategory = 'all', sortBy = 'recent' }) => {
  const { user, updateUser } = useAuth();
  const { toast } = useToast();
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const storedQuestions = JSON.parse(localStorage.getItem('xshared_questions')) || initialQuestions;
    setQuestions(storedQuestions);
  }, []);

  const updateStoredQuestions = (updatedQuestions) => {
    setQuestions(updatedQuestions);
    try {
      localStorage.setItem('xshared_questions', JSON.stringify(updatedQuestions));
    } catch (e) {
      /* ignore localStorage errors */
    }
  };

  const handleVote = (questionId, voteType) => {
    const updatedQuestions = questions.map(q =>
      q.id === questionId
        ? { ...q, votes: q.votes + (voteType === 'up' ? 1 : -1) }
        : q
    );
    updateStoredQuestions(updatedQuestions);
    if (updateUser) updateUser({ points: (user?.points || 0) + 2 });
    toast({ title: "Vote recorded!", description: "You earned 2 points for participating." });
  };

  const handleComment = (questionId, commentText) => {
    const newComment = {
      author: user?.name || 'You',
      authorAvatar: user?.avatar || '',
      text: commentText,
      timestamp: new Date().toLocaleString(),
    };
    const updatedQuestions = questions.map(q =>
      q.id === questionId
        ? { ...q, comments: [...(q.comments || []), newComment] }
        : q
    );
    updateStoredQuestions(updatedQuestions);
    if (updateUser) updateUser({ points: (user?.points || 0) + 20, contributions: (user?.contributions || 0) + 1 });
    toast({ title: "Comment posted!", description: "You earned 20 points for helping." });
  };

  const handleBookmark = (questionId) => {
    // toggle isBookmarked on the question
    const updatedQuestions = questions.map(q =>
      q.id === questionId
        ? { ...q, isBookmarked: !q.isBookmarked }
        : q
    );
    updateStoredQuestions(updatedQuestions);

    // update user.bookmarks (store minimal bookmark info)
    try {
      const currentBookmarks = user?.bookmarks || [];
      const exists = currentBookmarks.some(b => b.id === questionId);

      let updatedBookmarks;
      if (exists) {
        updatedBookmarks = currentBookmarks.filter(b => b.id !== questionId);
      } else {
        const q = updatedQuestions.find(x => x.id === questionId);
        const bookmarkItem = { id: q.id, title: q.title, timestamp: q.timestamp };
        updatedBookmarks = [...currentBookmarks, bookmarkItem];
      }

      // update auth context user (partial update)
      if (updateUser) updateUser({ bookmarks: updatedBookmarks });

      // ALSO persist bookmarks into localStorage users list so profile page (which may read from localStorage) sees it
      const storedUsers = JSON.parse(localStorage.getItem('xshared_users') || '[]');
      if (storedUsers && storedUsers.length) {
        const userId = user?.id;
        const userIdx = storedUsers.findIndex(u => u.id === userId || u.email === user?.email);
        if (userIdx !== -1) {
          storedUsers[userIdx].bookmarks = updatedBookmarks;
          localStorage.setItem('xshared_users', JSON.stringify(storedUsers));
        } else {
          // if not found, optionally store current user as well (non-destructive)
          // NOTE: we don't override existing user if not present
        }
      }

      toast({ title: exists ? 'Bookmark removed' : 'Question bookmarked!' });
    } catch (err) {
      // fail silently but notify user
      toast({ title: 'Bookmark error', description: 'Could not save bookmark locally.' });
    }
  };

  const filteredQuestions = questions.filter(q =>
    (q.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.content?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (q.tags || []).some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))) &&
    (selectedCategory === 'all' || q.category === selectedCategory)
  );

  const sortedQuestions = [...filteredQuestions].sort((a, b) => {
    if (sortBy === 'votes') return (b.votes || 0) - (a.votes || 0);
    if (sortBy === 'answers') return ((b.comments?.length || b.answers || 0) - (a.comments?.length || a.answers || 0));
    return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
  });

  return (
    <div className="space-y-6">
      {sortedQuestions.map((question, index) => (
        <motion.div key={question.id} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: index * 0.05 }}>
          <QuestionCard question={question} onVote={handleVote} onBookmark={handleBookmark} onComment={handleComment} />
        </motion.div>
      ))}
      {sortedQuestions.length === 0 && (
        <div className="text-center py-12">
          <MessageCircle size={48} className="text-white/40 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">No questions found</h3>
          <p className="text-white/60">Try adjusting your search terms.</p>
        </div>
      )}
    </div>
  );
};

export default QAList;
