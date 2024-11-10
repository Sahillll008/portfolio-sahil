import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Wand2 } from 'lucide-react';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-[#0A1828]/90 backdrop-blur-sm py-4' : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center">
          <Wand2 className="text-[#FFB86C] mr-2" />
          <span className="text-xl font-bold">Portfolio</span>
        </div>
        <nav>
          <ul className="flex space-x-8">
            <li>
              <button 
                onClick={() => scrollToSection('about')}
                className="hover:text-[#FFB86C] transition-colors"
              >
                About
              </button>
            </li>
            <li>
              <button 
                onClick={() => scrollToSection('projects')}
                className="hover:text-[#FFB86C] transition-colors"
              >
                Projects
              </button>
            </li>
            <li>
              <button 
                onClick={() => scrollToSection('contact')}
                className="hover:text-[#FFB86C] transition-colors"
              >
                Contact
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </motion.header>
  );
};

export default Header;