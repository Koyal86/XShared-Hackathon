import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <footer className="bg-black/20 backdrop-blur-sm border-t border-white/10 py-12 px-6 mt-16">
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto"
      >
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">X</span>
              </div>
              <span className="text-xl font-bold text-white">XShared</span>
            </div>
            <p className="text-white/70">
              Empowering learners and professionals to achieve their goals through education and collaboration.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-white mb-4">Platform</h3>
            <ul className="space-y-2 text-white/70">
              <li><Link to="/courses" className="hover:text-white">Courses</Link></li>
              <li><Link to="/qa" className="hover:text-white">Community</Link></li>
              <li><Link to="/resources" className="hover:text-white">Resources</Link></li>
              <li><Link to="/rewards" className="hover:text-white">Rewards</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-white mb-4">Support</h3>
            <ul className="space-y-2 text-white/70">
              <li><button className="hover:text-white">Help Center</button></li>
              <li><button className="hover:text-white">Contact Us</button></li>
              <li><button className="hover:text-white">Privacy Policy</button></li>
              <li><button className="hover:text-white">Terms of Service</button></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-white mb-4">Connect</h3>
            <ul className="space-y-2 text-white/70">
              <li><button className="hover:text-white">LinkedIn</button></li>
              <li><button className="hover:text-white">Twitter</button></li>
              <li><button className="hover:text-white">Facebook</button></li>
              <li><button className="hover:text-white">Instagram</button></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10 mt-8 pt-8 text-center text-white/70">
          <p>&copy; 2024 XShared. All rights reserved.</p>
        </div>
      </motion.div>
    </footer>
  );
};

export default Footer;