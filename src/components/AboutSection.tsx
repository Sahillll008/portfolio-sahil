import React from 'react';
import { motion } from 'framer-motion';
import { Scroll, Wand2, Shield } from 'lucide-react';

const AboutSection = () => {
  return (
    <section className="min-h-screen py-20 relative" id="about">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-[#1A1B26]/80 backdrop-blur-lg rounded-lg p-8 shadow-2xl border border-[#FFB86C]/20"
        >
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="md:w-1/3">
              <div className="relative w-64 h-64">
                <div className="absolute inset-0 rounded-full border-4 border-[#FFB86C] shadow-lg overflow-hidden">
                  <img
                    src="https://i.imgur.com/Hy7Hy7H.jpg"
                    alt="Sahil Mujumdar"
                    className="w-full h-full object-cover object-center"
                  />
                </div>
                <div className="absolute inset-0 rounded-full bg-gradient-to-t from-[#FFB86C]/20 to-transparent pointer-events-none" />
              </div>
            </div>
            <div className="md:w-2/3">
              <div className="flex items-center mb-6">
                <Scroll className="text-[#FFB86C] mr-3" />
                <h2 className="text-4xl font-bold font-[Cinzel] text-[#FFB86C]">About Me</h2>
              </div>
              <p className="text-lg mb-6 text-gray-300 leading-relaxed">
                Greetings! I'm Sahil Mujumdar, a Data Analyst and Cyber Security Specialist with a passion for unraveling complex data mysteries and fortifying digital defenses. Like a skilled wizard wielding both defensive and analytical spells, I combine the precision of data analysis with the vigilance of cybersecurity.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-start">
                  <Wand2 className="text-[#FFB86C] mr-3 mt-1" />
                  <div>
                    <h3 className="text-xl font-bold mb-2">Analytical Expertise</h3>
                    <p className="text-gray-400">Transforming raw data into meaningful insights using advanced analytical tools and techniques.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Shield className="text-[#FFB86C] mr-3 mt-1" />
                  <div>
                    <h3 className="text-xl font-bold mb-2">Security Guardian</h3>
                    <p className="text-gray-400">Protecting digital assets with state-of-the-art cybersecurity measures and protocols.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;