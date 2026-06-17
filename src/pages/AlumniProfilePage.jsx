import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import { getAlumniById } from '@/pages/AlumniPage';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Briefcase, Heart, UserPlus, UserCheck,
  MessageCircle, Linkedin, ArrowLeft, X, Send, Bot
} from 'lucide-react';
import { Input } from '@/components/ui/input';

const AlumniProfilePage = () => {
  const { id } = useParams();
  const { user, updateUser } = useAuth();
  const { toast } = useToast();
  const [alumnus, setAlumnus] = useState(null);

  // Chat state
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "👋 Hi! You can chat with this alumnus here (demo mode).", sender: 'bot' }
  ]);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    const data = getAlumniById(id);
    setAlumnus(data);
  }, [id]);

  const handleFollow = (alumniId) => {
    const currentFollowed = user.followedAlumni || [];
    let updatedFollowed;
    if (currentFollowed.includes(alumniId)) {
      updatedFollowed = currentFollowed.filter(id => id !== alumniId);
      toast({ title: "Unfollowed" });
    } else {
      updatedFollowed = [...currentFollowed, alumniId];
      toast({ title: "Followed!" });
    }
    updateUser({ followedAlumni: updatedFollowed });
  };

  const isFollowing = (alumniId) => user?.followedAlumni?.includes(alumniId);

  const handleSendMessage = () => {
    if (inputValue.trim() === '') return;

    const newMessages = [...messages, { text: inputValue, sender: 'user' }];
    setMessages(newMessages);
    setInputValue('');

    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        { text: "📌 Thanks for your message! This is a demo chat. Real messaging is coming soon!", sender: 'bot' }
      ]);
    }, 1000);
  };

  if (!alumnus) {
    return <div className="text-center py-12 text-white">Loading profile...</div>;
  }

  return (
    <>
      <Helmet>
        <title>{alumnus.name} - Alumni Profile</title>
        <meta name="description" content={`View the profile of ${alumnus.name} on XShared.`} />
      </Helmet>

      <div className="max-w-5xl mx-auto px-6 py-8">
        <Link to="/alumni" className="flex items-center space-x-2 text-white/80 hover:text-white mb-6">
          <ArrowLeft size={16} />
          <span>Back to Alumni Network</span>
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Card className="profile-card">
            <CardContent className="p-8">
              {/* Header like user profile */}
              <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                <Avatar className="h-32 w-32">
                  <AvatarImage src={alumnus.avatar} />
                  <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-600 text-white text-4xl">
                    {alumnus.name?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 text-center md:text-left">
                  <h2 className="text-3xl font-bold text-white">{alumnus.name}</h2>
                  <p className="text-white/80 text-lg">{alumnus.domain}</p>
                  <div className="flex items-center justify-center md:justify-start space-x-2 mt-2">
                    <Briefcase size={16} className="text-white/60" />
                    <span className="text-white">{alumnus.company}</span>
                  </div>
                  <p className="text-white/90 mt-4">{alumnus.bio}</p>
                </div>
              </div>

              {/* Stats like user profile */}
              <div className="grid grid-cols-3 gap-4 text-center mt-8">
                <div>
                  <p className="text-2xl font-bold text-white">{alumnus.points}</p>
                  <p className="text-white/60 text-sm">Points</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">24</p>
                  <p className="text-white/60 text-sm">Contributions</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">12</p>
                  <p className="text-white/60 text-sm">Followers</p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-8">
                <Button size="sm" onClick={() => setIsChatOpen(true)}>
                  <MessageCircle size={16} className="mr-2" /> Chat
                </Button>
                <Button size="sm" variant="outline" onClick={() => handleFollow(alumnus.id)}>
                  {isFollowing(alumnus.id) ? <UserCheck size={16} className="mr-2" /> : <UserPlus size={16} className="mr-2" />}
                  {isFollowing(alumnus.id) ? 'Following' : 'Follow'}
                </Button>
                {/* ✅ LinkedIn button only if valid http link */}
                {alumnus.linkedin?.startsWith("http") && (
                  <a href={alumnus.linkedin} target="_blank" rel="noopener noreferrer">
                    <Button variant="outline">
                      <Linkedin className="mr-2" size={16} /> LinkedIn
                    </Button>
                  </a>
                )}
                <Button variant="outline" onClick={() => toast({ title: "🚧 This feature isn't implemented yet" })}>
                  <Heart className="mr-2" size={16} /> Like Profile
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Responsive Chat Modal */}
      <AnimatePresence>
        {isChatOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 md:inset-auto md:bottom-24 md:right-6 w-full md:w-80 h-full md:h-[450px] bg-gray-900/95 backdrop-blur-lg border border-white/20 rounded-none md:rounded-xl shadow-2xl flex flex-col z-50"
          >
            {/* Header */}
            <div className="p-4 border-b border-white/20 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Bot size={20} className="text-blue-400" />
                <h3 className="font-bold text-white">Chat with {alumnus.name}</h3>
              </div>
              <Button size="icon" variant="ghost" onClick={() => setIsChatOpen(false)}>
                <X size={16} />
              </Button>
            </div>

            {/* Messages */}
            <div className="flex-1 p-4 space-y-4 overflow-y-auto">
              {messages.map((msg, index) => (
                <div key={index} className={`flex ${msg.sender === 'bot' ? 'justify-start' : 'justify-end'}`}>
                  <div className={`max-w-[80%] p-3 rounded-lg text-sm ${msg.sender === 'bot' ? 'bg-blue-500/30 text-white' : 'bg-white/20 text-white'}`}>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-white/20">
              <div className="flex items-center space-x-2">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Type your message..."
                  className="bg-white/10 border-white/20 text-white"
                />
                <Button size="icon" onClick={handleSendMessage}>
                  <Send size={16} />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AlumniProfilePage;
