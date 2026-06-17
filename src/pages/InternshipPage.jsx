import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Briefcase, Clock, Search, Upload } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Textarea } from '@/components/ui/textarea';

const InternshipPage = () => {
  const { toast } = useToast();

  // ✅ Default internships
  const defaultInternships = [
    {
      id: 1,
      title: 'Frontend Developer Intern',
      company: 'Tech Solutions Inc.',
      location: 'Remote',
      type: 'Internship',
      mode: 'Online',
      experience: 'Fresher',
      domain: 'Web Development',
      posted: '2 days ago',
      tags: ['React', 'JavaScript', 'CSS'],
    },
    {
      id: 2,
      title: 'UX/UI Design Intern',
      company: 'Creative Minds LLC',
      location: 'Bangalore',
      type: 'Part-time',
      mode: 'Offline',
      experience: '0–1 yr',
      domain: 'Design',
      posted: '5 days ago',
      tags: ['Figma', 'User Research', 'Prototyping'],
    },
    {
      id: 3,
      title: 'Data Science Intern',
      company: 'Analytics Pro',
      location: 'Pune',
      type: 'Internship',
      mode: 'Remote',
      experience: '0–1 yr',
      domain: 'Data Science',
      posted: '1 week ago',
      tags: ['Python', 'Pandas', 'Machine Learning'],
    }
  ];

  const [internships, setInternships] = useState([]);
  const [applyInternship, setApplyInternship] = useState(null);

  // 🔍 Filters
  const [preferences, setPreferences] = useState({
    domain: 'All',
    location: 'All',
    mode: 'All',
    experience: 'All',
  });
  const [recommended, setRecommended] = useState([]);

  const [applicationData, setApplicationData] = useState({
    resume: null,
    message: '',
  });

  const [resumeFile, setResumeFile] = useState(null);

  // ✅ Load internships
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('xshared_internships')) || [];
    const all = [...saved, ...defaultInternships];
    setInternships(all);
    setRecommended(all); // show all initially
  }, []);

  // ✅ Apply Internship
  const handleApply = () => {
    if (!applicationData.resume) {
      toast({ title: "⚠️ Please attach your resume" });
      return;
    }

    const newApplication = {
      internshipId: applyInternship.id,
      internshipTitle: applyInternship.title,
      company: applyInternship.company,
      resume: { name: applicationData.resume.name },
      message: applicationData.message,
      appliedAt: new Date().toISOString(),
    };

    const savedApplications = JSON.parse(localStorage.getItem('xshared_applications')) || [];
    localStorage.setItem('xshared_applications', JSON.stringify([newApplication, ...savedApplications]));

    toast({ title: "✅ Application Submitted", description: `Applied for ${applyInternship.title}` });

    setApplicationData({ resume: null, message: '' });
    setApplyInternship(null);
  };

  // 🔍 Smart Filters (no zero results)
  const findRecommended = () => {
    let filtered = internships.filter((i) => {
      return (
        (preferences.domain === 'All' || i.domain === preferences.domain) &&
        (preferences.location === 'All' || i.location === preferences.location) &&
        (preferences.mode === 'All' || i.mode === preferences.mode) &&
        (preferences.experience === 'All' || i.experience === preferences.experience)
      );
    });

    if (filtered.length === 0 && preferences.domain !== 'All') {
      filtered = internships.filter((i) => i.domain === preferences.domain);
      toast({
        title: "⚡ Showing Closest Matches",
        description: `No exact matches. Showing internships in ${preferences.domain}.`
      });
    } else if (filtered.length === 0 && preferences.location !== 'All') {
      filtered = internships.filter((i) => i.location === preferences.location);
      toast({
        title: "⚡ Showing Closest Matches",
        description: `No exact matches. Showing internships in ${preferences.location}.`
      });
    } else if (filtered.length === 0) {
      filtered = internships;
      toast({
        title: "⚡ No Exact Matches",
        description: "Showing all available internships instead."
      });
    } else {
      toast({
        title: "✨ Recommendations Updated",
        description: `${filtered.length} internships found.`
      });
    }

    setRecommended(filtered);
  };

  // ✅ Resume-driven recommendations
  const handleResumeUpload = (file) => {
    setResumeFile(file);

    const keywords = file.name.toLowerCase();
    const matched = internships.filter((i) =>
      i.tags.some(tag => keywords.includes(tag.toLowerCase())) ||
      keywords.includes(i.domain.toLowerCase())
    );

    if (matched.length > 0) {
      setRecommended(matched);
      toast({ title: "✨ Personalized Matches Found", description: `${matched.length} internships match your resume.` });
    } else {
      setRecommended(internships);
      toast({ title: "⚠️ No exact matches", description: "Showing all internships instead." });
    }
  };

  return (
    <>
      <Helmet>
        <title>Internships - XShared</title>
        <meta name="description" content="Find and apply for exciting internship opportunities on XShared." />
      </Helmet>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            Internship Opportunities
          </h1>
          <p className="text-white/80">
            Find your next big opportunity and kickstart your career.
          </p>
        </motion.div>

        {/* ✅ Resume Upload */}
        <div className="bg-gray-800 p-4 rounded-lg mb-6 space-y-3">
          <h2 className="text-lg font-semibold text-white flex items-center gap-2">
            <Upload size={18} /> Upload Resume for Personalized Matches
          </h2>
          <input
            type="file"
            accept=".pdf,.doc,.docx,.txt"
            className="text-white"
            onChange={(e) => e.target.files[0] && handleResumeUpload(e.target.files[0])}
          />
          {resumeFile && <p className="text-white/70 text-sm">Uploaded: {resumeFile.name}</p>}
        </div>

        {/* 🔍 Filters */}
        <div className="bg-gray-800 p-4 rounded-lg mb-6 space-y-3">
          <h2 className="text-lg font-semibold text-white">Filter Internships</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
            <select value={preferences.domain} onChange={(e) => setPreferences({ ...preferences, domain: e.target.value })} className="bg-white/10 border border-white/20 text-white p-2 rounded">
              <option>All</option>
              <option>Web Development</option>
              <option>Data Science</option>
              <option>AI/ML</option>
              <option>Design</option>
              <option>Marketing</option>
            </select>
            <select value={preferences.location} onChange={(e) => setPreferences({ ...preferences, location: e.target.value })} className="bg-white/10 border border-white/20 text-white p-2 rounded">
              <option>All</option>
              <option>Kolkata</option>
              <option>Bangalore</option>
              <option>Pune</option>
              <option>Hyderabad</option>
              <option>Remote</option>
            </select>
            <select value={preferences.mode} onChange={(e) => setPreferences({ ...preferences, mode: e.target.value })} className="bg-white/10 border border-white/20 text-white p-2 rounded">
              <option>All</option>
              <option>Online</option>
              <option>Offline</option>
              <option>Remote</option>
            </select>
            <select value={preferences.experience} onChange={(e) => setPreferences({ ...preferences, experience: e.target.value })} className="bg-white/10 border border-white/20 text-white p-2 rounded">
              <option>All</option>
              <option>Fresher</option>
              <option>0–1 yr</option>
              <option>1–3 yrs</option>
              <option>3+ yrs</option>
            </select>
          </div>
          <Button onClick={findRecommended} className="mt-3 bg-gradient-to-r from-green-500 to-emerald-600 w-full sm:w-auto">
            <Search size={16} className="mr-2" /> Find Internships
          </Button>
        </div>

        {/* Internship Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {recommended.map((internship, index) => (
            <motion.div
              key={internship.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 + 0.3 }}
            >
              <Card className="feature-card h-full">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-white">{internship.title}</h3>
                  <p className="text-white/80">{internship.company}</p>
                  <div className="flex flex-wrap gap-3 text-sm text-white/60 my-4">
                    <span><MapPin size={14} className="inline" /> {internship.location}</span>
                    <span><Briefcase size={14} className="inline" /> {internship.type}</span>
                    <span><Clock size={14} className="inline" /> {internship.posted}</span>
                    <span>Mode: {internship.mode}</span>
                    <span>Exp: {internship.experience}</span>
                    <span>Domain: {internship.domain}</span>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {(internship.tags || []).map((tag, idx) => (
                      <Badge key={idx} variant="outline" className="text-white/70 border-white/20">{tag}</Badge>
                    ))}
                  </div>
                  <Button className="w-full" onClick={() => setApplyInternship(internship)}>
                    Apply Now
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ✅ Apply Internship Modal */}
      {applyInternship && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-gray-900 p-6 rounded-xl w-full max-w-lg space-y-4">
            <h2 className="text-xl font-bold text-white">Apply for {applyInternship.title}</h2>
            <p className="text-white/70">{applyInternship.company}</p>

            <input
              type="file"
              accept=".pdf,.doc,.docx"
              className="text-white"
              onChange={(e) => setApplicationData({ ...applicationData, resume: e.target.files[0] || null })}
            />

            <Textarea
              placeholder="Cover message (optional)"
              value={applicationData.message}
              onChange={(e) => setApplicationData({ ...applicationData, message: e.target.value })}
            />

            <div className="flex justify-end space-x-3">
              <Button variant="outline" onClick={() => setApplyInternship(null)}>Cancel</Button>
              <Button className="bg-gradient-to-r from-green-500 to-emerald-600" onClick={handleApply}>Submit Application</Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default InternshipPage;
