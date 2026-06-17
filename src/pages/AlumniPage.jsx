import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Filter } from 'lucide-react';
import { Link } from 'react-router-dom';

const alumni = [
  { id: 1, name: 'John Carter', domain: 'Software Engineering', company: 'Google', points: 12500, avatar: '', bio: 'Senior Software Engineer at Google, passionate about building scalable systems.', linkedin: 'https://www.linkedin.com/in/john-carter' },
  { id: 2, name: 'Michael Johnson', domain: 'Product Management', company: 'Microsoft', points: 11800, avatar: '', bio: 'Product Manager focused on developer tools and cloud services.', linkedin: 'https://www.linkedin.com/in/mike-johnson' },
  { id: 3, name: 'David Wilson', domain: 'UX/UI Design', company: 'Figma', points: 10500, avatar: '', bio: 'Lead Designer creating intuitive and beautiful user experiences.', linkedin: 'https://www.linkedin.com/in/david-wilson' },
  { id: 4, name: 'Emily Davis', domain: 'Data Science', company: 'Netflix', points: 9800, avatar: '', bio: 'Data Scientist using machine learning to personalize content recommendations.', linkedin: 'https://www.linkedin.com/in/emily-davis' },
  { id: 5, name: 'Sophia Martinez', domain: 'Marketing', company: 'HubSpot', points: 9400, avatar: '', bio: 'Marketing strategist at HubSpot, helping brands grow with inbound and digital campaigns.', linkedin: 'https://www.linkedin.com/in/sophia-martinez' },
];

export const getAlumniById = (id) => alumni.find(a => a.id === parseInt(id));

const AlumniPage = () => {
  const domains = ['All', 'Software Engineering', 'Product Management', 'UX/UI Design', 'Data Science', 'Marketing'];

  const [selectedDomain, setSelectedDomain] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // ✅ Filter alumni by domain + search
  const filteredAlumni = alumni.filter((a) => {
    const matchesDomain = selectedDomain === 'All' || a.domain === selectedDomain;
    const matchesSearch =
      a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.company.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDomain && matchesSearch;
  });

  return (
    <>
      <Helmet>
        <title>Alumni Network - XShared</title>
        <meta name="description" content="Connect with successful alumni from the XShared community." />
      </Helmet>
      <div className="max-w-7xl mx-auto px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            Alumni Network
          </h1>
          <p className="text-white/80">
            Connect with and learn from our successful alumni.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar filter */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-1"
          >
            <Card className="feature-card">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Filter className="mr-2" />
                  Filter Alumni
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Input
                  placeholder="Search by name or company"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="mb-4 bg-white/10 border-white/20 text-white placeholder:text-white/50"
                />
                <div className="space-y-2">
                  {domains.map((domain) => (
                    <Button
                      key={domain}
                      variant={selectedDomain === domain ? 'default' : 'ghost'}
                      className={`w-full justify-start ${
                        selectedDomain === domain
                          ? 'bg-blue-500 text-white'
                          : 'text-white/80 hover:bg-white/10 hover:text-white'
                      }`}
                      onClick={() => setSelectedDomain(domain)}
                    >
                      {domain}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Alumni list */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:col-span-3"
          >
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAlumni.length > 0 ? (
                filteredAlumni.map((alumnus) => (
                  <Link to={`/alumni/${alumnus.id}`} key={alumnus.id}>
                    <Card className="feature-card h-full text-center">
                      <CardContent className="p-6">
                        <Avatar className="w-20 h-20 mx-auto mb-4">
                          <AvatarImage src={alumnus.avatar} />
                          <AvatarFallback className="text-2xl bg-gradient-to-r from-blue-500 to-purple-600">
                            {alumnus.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <h3 className="text-lg font-bold text-white">{alumnus.name}</h3>
                        <p className="text-sm text-white/70">{alumnus.domain}</p>
                        <p className="text-sm text-white/70">at {alumnus.company}</p>
                      </CardContent>
                    </Card>
                  </Link>
                ))
              ) : (
                <p className="text-white/70">No alumni found.</p>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default AlumniPage;
