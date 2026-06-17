import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import { Eye, EyeOff } from 'lucide-react';
import Footer from '@/components/Footer';

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      const users = JSON.parse(localStorage.getItem('xshared_users') || '[]');
      const user = users.find(u => u.email === formData.email);

      if (user) {
        login(user);
        toast({ title: "Welcome back!", description: "You have successfully logged in." });
        navigate('/welcome');
      } else {
        const demoUser = {
          id: Date.now(),
          name: 'Demo User',
          email: formData.email,
          userType: 'student',
          points: 150,
          avatar: '',
          joinDate: new Date().toISOString(),
          contributions: 5,
          coursesCompleted: 3
        };
        login(demoUser);
        toast({ title: "Welcome!", description: "Demo account created successfully." });
        navigate('/welcome');
      }
    } catch {
      toast({ title: "Login failed", description: "Please check your credentials.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Login - XShared Educational Platform</title>
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

      {/* Login Form */}
      <div className="min-h-[70vh] flex items-center justify-center p-4 relative overflow-hidden">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="w-full max-w-md relative z-10">
          <Card className="glass-effect border-white/20">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold text-white">Welcome Back</CardTitle>
              <p className="text-white/80">Sign in to continue your learning journey</p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <Input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter your email" required className="bg-white/10 border-white/20 text-white placeholder:text-white/50" />
                
                <div className="relative">
                  <Input type={showPassword ? 'text' : 'password'} name="password" value={formData.password} onChange={handleChange} placeholder="Enter your password" required className="bg-white/10 border-white/20 text-white placeholder:text-white/50 pr-10" />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white">
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>

                <Button type="submit" className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700" disabled={loading}>
                  {loading ? 'Signing in...' : 'Sign In'}
                </Button>

                <div className="text-center">
                  <span className="text-white/80">Don't have an account? </span>
                  <Link to="/signup" className="text-blue-400 hover:text-blue-300 font-medium">Sign up</Link>
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

export default LoginPage;
