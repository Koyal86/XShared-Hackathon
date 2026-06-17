import React, { useState, useRef } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { FileText, Download, Lock } from 'lucide-react';
import { jsPDF } from "jspdf";

/* ---------- Templates ---------- */

// Classic Template
const ClassicTemplate = ({ name, email, phone, linkedin, summary, experience, education, skills }) => (
  <div className="p-8 bg-white text-black font-sans">
    <div className="text-center border-b-2 border-gray-300 pb-4 mb-4">
      <h1 className="text-4xl font-bold">{name || 'Your Name'}</h1>
      <p className="text-sm text-gray-600">
        {email || 'your.email@example.com'} | {phone || '123-456-7890'} | {linkedin || 'linkedin.com/in/yourprofile'}
      </p>
    </div>
    <h2 className="text-xl font-bold border-b border-gray-300 pb-1 mb-2">Summary</h2>
    <p>{summary || 'A brief professional summary about you.'}</p>
    <h2 className="mt-4 text-xl font-bold border-b border-gray-300 pb-1 mb-2">Experience</h2>
    <p>{experience || 'Your work experience.'}</p>
    <h2 className="mt-4 text-xl font-bold border-b border-gray-300 pb-1 mb-2">Education</h2>
    <p>{education || 'Your educational background.'}</p>
    <h2 className="mt-4 text-xl font-bold border-b border-gray-300 pb-1 mb-2">Skills</h2>
    <p>{skills || 'A list of your skills.'}</p>
  </div>
);

// Modern Template
const ModernTemplate = ({ name, email, phone, linkedin, summary, experience, education, skills }) => (
  <div className="p-8 bg-gray-100 text-gray-900 font-sans">
    <div className="flex justify-between items-center border-b-4 border-blue-500 pb-2 mb-4">
      <h1 className="text-3xl font-bold text-blue-600">{name || 'Your Name'}</h1>
      <p className="text-sm">
        {email || 'your.email@example.com'} • {phone || '123-456-7890'} • {linkedin || 'linkedin.com/in/yourprofile'}
      </p>
    </div>
    <h2 className="text-lg font-semibold text-blue-500">Summary</h2>
    <p className="mb-2">{summary || 'A brief professional summary about you.'}</p>
    <h2 className="text-lg font-semibold text-blue-500">Experience</h2>
    <p className="mb-2">{experience || 'Your work experience.'}</p>
    <h2 className="text-lg font-semibold text-blue-500">Education</h2>
    <p className="mb-2">{education || 'Your educational background.'}</p>
    <h2 className="text-lg font-semibold text-blue-500">Skills</h2>
    <p>{skills || 'A list of your skills.'}</p>
  </div>
);

// Creative Template
const CreativeTemplate = ({ name, email, phone, linkedin, summary, experience, education, skills }) => (
  <div className="p-8 bg-gradient-to-br from-purple-600 to-blue-500 text-white font-sans">
    <h1 className="text-4xl font-extrabold">{name || 'Your Name'}</h1>
    <p className="text-sm mb-4">
      {email || 'your.email@example.com'} | {phone || '123-456-7890'} | {linkedin || 'linkedin.com/in/yourprofile'}
    </p>
    <div className="bg-white/20 p-4 rounded-lg mb-4">
      <h2 className="text-lg font-bold">Summary</h2>
      <p>{summary || 'A brief professional summary about you.'}</p>
    </div>
    <div className="bg-white/20 p-4 rounded-lg mb-4">
      <h2 className="text-lg font-bold">Experience</h2>
      <p>{experience || 'Your work experience.'}</p>
    </div>
    <div className="bg-white/20 p-4 rounded-lg mb-4">
      <h2 className="text-lg font-bold">Education</h2>
      <p>{education || 'Your educational background.'}</p>
    </div>
    <div className="bg-white/20 p-4 rounded-lg">
      <h2 className="text-lg font-bold">Skills</h2>
      <p>{skills || 'A list of your skills.'}</p>
    </div>
  </div>
);

/* ---------- Main Page ---------- */

const ResumeBuilderPage = () => {
  const { toast } = useToast();
  const [selectedTemplate, setSelectedTemplate] = useState(1);
  const resumeRef = useRef();
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', linkedin: '', summary: '', experience: '', education: '', skills: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const templates = [
    { id: 1, name: 'Classic', isPremium: false },
    { id: 2, name: 'Modern', isPremium: false },
    { id: 3, name: 'Creative', isPremium: false },
    { id: 4, name: 'Executive', isPremium: true },
    { id: 5, name: 'Minimalist', isPremium: true },
    { id: 6, name: 'Professional', isPremium: true },
  ];

  const handleTemplateSelect = (template) => {
    if (template.isPremium) {
      toast({
        title: "Premium Template",
        description: "This is a premium template. Upgrade to unlock.",
        variant: "destructive"
      });
    } else {
      setSelectedTemplate(template.id);
    }
  };

  const handleDownload = () => {
    const doc = new jsPDF();
    doc.html(resumeRef.current, {
      callback: function (doc) {
        doc.save('resume.pdf');
      },
      x: 10,
      y: 10,
      width: 190,
      windowWidth: 794
    });
    toast({ title: "Downloading Resume", description: "Your resume is being generated." });
  };

  return (
    <>
      <Helmet>
        <title>Resume Builder - XShared</title>
        <meta name="description" content="Build a professional resume with our easy-to-use builder." />
      </Helmet>
      <div className="max-w-7xl mx-auto px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Resume Builder</h1>
          <p className="text-white/80">Create a standout resume in minutes.</p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column: Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <Card className="feature-card">
              <CardHeader>
                <CardTitle className="text-white">Your Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input name="name" value={formData.name} onChange={handleInputChange} placeholder="Full Name" className="bg-white/10 border-white/20 text-white placeholder:text-white/50" />
                <Input name="email" value={formData.email} onChange={handleInputChange} placeholder="Email" type="email" className="bg-white/10 border-white/20 text-white placeholder:text-white/50" />
                <Input name="phone" value={formData.phone} onChange={handleInputChange} placeholder="Phone Number" type="tel" className="bg-white/10 border-white/20 text-white placeholder:text-white/50" />
                <Input name="linkedin" value={formData.linkedin} onChange={handleInputChange} placeholder="LinkedIn Profile URL" className="bg-white/10 border-white/20 text-white placeholder:text-white/50" />
                <Textarea name="summary" value={formData.summary} onChange={handleInputChange} placeholder="Professional Summary" className="bg-white/10 border-white/20 text-white placeholder:text-white/50" />
                <Textarea name="experience" value={formData.experience} onChange={handleInputChange} placeholder="Work Experience" className="bg-white/10 border-white/20 text-white placeholder:text-white/50" />
                <Textarea name="education" value={formData.education} onChange={handleInputChange} placeholder="Education" className="bg-white/10 border-white/20 text-white placeholder:text-white/50" />
                <Textarea name="skills" value={formData.skills} onChange={handleInputChange} placeholder="Skills" className="bg-white/10 border-white/20 text-white placeholder:text-white/50" />
                <Button className="w-full" onClick={handleDownload}>
                  <Download className="mr-2" size={16} /> Download Resume
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Right Column: Templates & Preview */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:col-span-1"
          >
            <Card className="feature-card">
              <CardHeader>
                <CardTitle className="text-white">Choose a Template</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-4">
                {templates.map(template => (
                  <div
                    key={template.id}
                    className={`relative p-2 border-2 rounded-lg cursor-pointer ${selectedTemplate === template.id ? 'border-blue-400' : 'border-white/20'}`}
                    onClick={() => handleTemplateSelect(template)}
                  >
                    <div className="bg-white/10 h-24 flex items-center justify-center rounded">
                      <FileText size={32} className="text-white/50" />
                    </div>
                    <p className="text-center text-sm mt-2 text-white">{template.name}</p>
                    {template.isPremium && (
                      <div className="absolute top-1 right-1 bg-yellow-500 p-1 rounded-full">
                        <Lock size={12} className="text-black" />
                      </div>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Preview */}
            <div className="mt-8 feature-card p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-white mb-2 text-center">Preview</h3>
              <div ref={resumeRef}>
                {selectedTemplate === 1 && <ClassicTemplate {...formData} />}
                {selectedTemplate === 2 && <ModernTemplate {...formData} />}
                {selectedTemplate === 3 && <CreativeTemplate {...formData} />}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default ResumeBuilderPage;
