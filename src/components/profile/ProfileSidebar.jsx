import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Edit, Save, X, MapPin, Briefcase, GraduationCap } from 'lucide-react';

const ProfileSidebar = () => {
  const { user, updateUser } = useAuth();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    name: user?.name || '',
    bio: user?.bio || 'Aspiring developer and lifelong learner.',
    location: user?.location || 'Earth',
    company: user?.company || '',
    university: user?.university || ''
  });

  const handleEditSave = () => {
    updateUser(editData);
    setIsEditing(false);
    toast({
      title: "Profile updated!",
      description: "Your profile information has been saved successfully.",
    });
  };

  return (
    <Card className="profile-card">
      <CardContent className="p-6">
        <div className="text-center mb-6">
          <Avatar className="h-24 w-24 mx-auto mb-4">
            <AvatarImage src={user?.avatar} />
            <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-600 text-white text-2xl">
              {user?.name?.charAt(0) || 'U'}
            </AvatarFallback>
          </Avatar>
          
          {isEditing ? (
            <div className="space-y-3">
              <Input
                value={editData.name}
                onChange={(e) => setEditData({...editData, name: e.target.value})}
                className="bg-white/10 border-white/20 text-white text-center"
              />
              <div className="flex space-x-2">
                <Button size="sm" onClick={handleEditSave} className="flex-1">
                  <Save size={16} className="mr-1" /> Save
                </Button>
                <Button size="sm" variant="outline" onClick={() => setIsEditing(false)} className="flex-1">
                  <X size={16} className="mr-1" /> Cancel
                </Button>
              </div>
            </div>
          ) : (
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">{user?.name}</h2>
              <Badge className={`mb-3 ${user?.userType === 'student' ? 'bg-blue-500' : 'bg-purple-500'}`}>
                {user?.userType === 'student' ? 'Student' : 'Professional'}
              </Badge>
              <Button size="sm" variant="outline" onClick={() => setIsEditing(true)} className="text-white border-white/20">
                <Edit size={16} className="mr-1" /> Edit Profile
              </Button>
            </div>
          )}
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-white/80">Points</span>
            <Badge className="points-badge">{user?.points || 0}</Badge>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-white/80">Joined</span>
            <span className="text-white">{new Date(user?.joinDate || Date.now()).toLocaleDateString()}</span>
          </div>

          {isEditing ? (
            <div className="space-y-3">
              <div>
                <label className="text-sm text-white/80 mb-1 block">Bio</label>
                <Textarea value={editData.bio} onChange={(e) => setEditData({...editData, bio: e.target.value})} placeholder="Tell us about yourself..." className="bg-white/10 border-white/20 text-white" />
              </div>
              <div>
                <label className="text-sm text-white/80 mb-1 block">Location</label>
                <Input value={editData.location} onChange={(e) => setEditData({...editData, location: e.target.value})} placeholder="Your location" className="bg-white/10 border-white/20 text-white" />
              </div>
              {user?.userType === 'student' ? (
                <div>
                  <label className="text-sm text-white/80 mb-1 block">University</label>
                  <Input value={editData.university} onChange={(e) => setEditData({...editData, university: e.target.value})} placeholder="Your university" className="bg-white/10 border-white/20 text-white" />
                </div>
              ) : (
                <div>
                  <label className="text-sm text-white/80 mb-1 block">Company</label>
                  <Input value={editData.company} onChange={(e) => setEditData({...editData, company: e.target.value})} placeholder="Your company" className="bg-white/10 border-white/20 text-white" />
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-3">
              <div>
                <span className="text-white/80 text-sm block mb-1">Bio</span>
                <p className="text-white">{editData.bio}</p>
              </div>
              {editData.location && (
                <div className="flex items-center space-x-2">
                  <MapPin size={16} className="text-white/60" />
                  <span className="text-white">{editData.location}</span>
                </div>
              )}
              {user?.userType === 'student' && editData.university && (
                <div className="flex items-center space-x-2">
                  <GraduationCap size={16} className="text-white/60" />
                  <span className="text-white">{editData.university}</span>
                </div>
              )}
              {user?.userType === 'professional' && editData.company && (
                <div className="flex items-center space-x-2">
                  <Briefcase size={16} className="text-white/60" />
                  <span className="text-white">{editData.company}</span>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-white/20">
          <div className="text-center">
            <div className="text-xl font-bold text-white">{user?.coursesCompleted || 0}</div>
            <div className="text-xs text-white/70">Courses</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold text-white">{user?.contributions || 0}</div>
            <div className="text-xs text-white/70">Posts</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold text-white">42</div>
            <div className="text-xs text-white/70">Rank</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileSidebar;