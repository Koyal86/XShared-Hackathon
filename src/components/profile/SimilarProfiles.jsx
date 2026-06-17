import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Users, GraduationCap, Briefcase } from 'lucide-react';

const SimilarProfiles = () => {
  const similarProfiles = [
    { id: 1, name: 'Sarah Chen', points: 2850, userType: 'student', avatar: '', university: 'MIT' },
    { id: 2, name: 'Mike Johnson', points: 2720, userType: 'professional', avatar: '', company: 'Google' },
    { id: 3, name: 'Emily Davis', points: 2650, userType: 'student', avatar: '', university: 'Stanford' },
    { id: 4, name: 'Alex Rodriguez', points: 2580, userType: 'professional', avatar: '', company: 'Microsoft' }
  ];

  return (
    <Card className="feature-card">
      <CardHeader>
        <CardTitle className="text-white flex items-center">
          <Users className="mr-2" size={20} />
          Similar Profiles
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {similarProfiles.map((profile) => (
            <div key={profile.id} className="flex items-center space-x-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors cursor-pointer">
              <Avatar className="h-10 w-10">
                <AvatarImage src={profile.avatar} />
                <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                  {profile.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="font-medium text-white">{profile.name}</div>
                <div className="text-sm text-white/70 flex items-center space-x-1">
                  {profile.userType === 'student' ? (
                    <>
                      <GraduationCap size={12} />
                      <span>{profile.university}</span>
                    </>
                  ) : (
                    <>
                      <Briefcase size={12} />
                      <span>{profile.company}</span>
                    </>
                  )}
                </div>
              </div>
              <Badge className="points-badge text-xs">
                {profile.points}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SimilarProfiles;