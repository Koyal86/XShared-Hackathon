import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import { Eye, EyeOff, GraduationCap, Briefcase } from 'lucide-react';
import Footer from '@/components/Footer';

const SignUpPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '', userType: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleUserTypeSelect = (type) => setFormData({ ...formData, userType: type });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (formData.password !== formData.confirmPassword) {
        toast({ title: "Password mismatch", description: "Passwords do not match.", variant: "destructive" });
        return;
      }
      if (!formData.userType) {
        toast({ title: "User type required", description: "Please select student or professional.", variant: "destructive" });
        return;
      }

      await new Promise(resolve => setTimeout(resolve, 1000));
      const newUser = { id: Date.now(), name: formData.name, email: formData.email, userType: formData.userType, points: 0, avatar: '', joinDate: new Date().toISOString(), contributions: 0, coursesCompleted: 0 };
      const users = JSON.parse(localStorage.getItem('xshared_users') || '[]');
      users.push(newUser);
      localStorage.setItem('xshared_users', JSON.stringify(users));
      login(newUser);
      toast({ title: "Welcome to XShared!", description: "Your account has been created successfully." });
      navigate('/welcome');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Sign Up - XShared Educational Platform</title>
      </Helmet>

      {/* Minimal Header (Logo only) */}
      <header className="flex items-center justify-center py-6">
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xl">X</span>
          </div>
          <span className="text-2xl font-bold text-white">XShared</span>
        </Link>
      </header>

      {/* Sign Up Form */}
      <div className="min-h-[70vh] flex items-center justify-center p-4 relative overflow-hidden">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="w-full max-w-md relative z-10">
          <Card className="glass-effect border-white/20">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold text-white">Join XShared</CardTitle>
              <p className="text-white/80">Start your learning journey today</p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <Input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Full Name" required className="bg-white/10 border-white/20 text-white placeholder:text-white/50" />
                <Input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required className="bg-white/10 border-white/20 text-white placeholder:text-white/50" />
                
                <div className="relative">
                  <Input type={showPassword ? 'text' : 'password'} name="password" value={formData.password} onChange={handleChange} placeholder="Password" required className="bg-white/10 border-white/20 text-white placeholder:text-white/50 pr-10" />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white">{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}</button>
                </div>
                
                <div className="relative">
                  <Input type={showConfirmPassword ? 'text' : 'password'} name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="Confirm Password" required className="bg-white/10 border-white/20 text-white placeholder:text-white/50 pr-10" />
                  <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white">{showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}</button>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <button type="button" onClick={() => handleUserTypeSelect('student')} className={`p-4 rounded-lg border-2 transition-all ${formData.userType === 'student' ? 'border-blue-400 bg-blue-400/20' : 'border-white/20 bg-white/5 hover:bg-white/10'}`}>
                    <GraduationCap size={24} className="text-white mx-auto mb-2" />
                    <div className="text-white font-medium">Student</div>
                  </button>
                  <button type="button" onClick={() => handleUserTypeSelect('professional')} className={`p-4 rounded-lg border-2 transition-all ${formData.userType === 'professional' ? 'border-purple-400 bg-purple-400/20' : 'border-white/20 bg-white/5 hover:bg-white/10'}`}>
                    <Briefcase size={24} className="text-white mx-auto mb-2" />
                    <div className="text-white font-medium">Professional</div>
                  </button>
                </div>

                <Button type="submit" className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700" disabled={loading}>
                  {loading ? 'Creating Account...' : 'Create Account'}
                </Button>

                <div className="text-center">
                  <span className="text-white/80">Already have an account? </span>
                  <Link to="/login" className="text-blue-400 hover:text-blue-300 font-medium">Sign in</Link>
                </div>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Footer */}
      <Footer />
    </>
  );
};

export default SignUpPage;
