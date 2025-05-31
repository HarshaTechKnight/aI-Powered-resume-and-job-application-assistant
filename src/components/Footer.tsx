import React from 'react';
import { Heart, Linkedin, Twitter, Github } from 'lucide-react';
import Logo from './Logo';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 pt-12 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-1">
            <div className="flex items-center mb-4">
              <Logo />
              <span className="ml-2 text-xl font-bold text-primary-800">KareerSakhi</span>
            </div>
            <p className="text-gray-600 mb-4">
              Your AI-powered career companion for perfecting resumes, cover letters, and interview skills.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-500 hover:text-primary-700 transition-colors duration-200"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
              <a
                href="#"
                className="text-gray-500 hover:text-primary-700 transition-colors duration-200"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="#"
                className="text-gray-500 hover:text-primary-700 transition-colors duration-200"
                aria-label="GitHub"
              >
                <Github size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">Features</h3>
            <ul className="space-y-2">
              <li>
                <a href="/resume-scoring" className="text-gray-600 hover:text-primary-700 transition-colors duration-200">
                  Resume Scoring
                </a>
              </li>
              <li>
                <a href="/job-matching" className="text-gray-600 hover:text-primary-700 transition-colors duration-200">
                  Job Description Matching
                </a>
              </li>
              <li>
                <a href="/cover-letter" className="text-gray-600 hover:text-primary-700 transition-colors duration-200">
                  Cover Letter Generator
                </a>
              </li>
              <li>
                <a href="/interview-prep" className="text-gray-600 hover:text-primary-700 transition-colors duration-200">
                  Interview Prep Assistant
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-600 hover:text-primary-700 transition-colors duration-200">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-primary-700 transition-colors duration-200">
                  Career Tips
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-primary-700 transition-colors duration-200">
                  Resume Templates
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-primary-700 transition-colors duration-200">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-600 hover:text-primary-700 transition-colors duration-200">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-primary-700 transition-colors duration-200">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-primary-700 transition-colors duration-200">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-primary-700 transition-colors duration-200">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} KareerSakhi. All rights reserved.
          </p>
          <div className="flex items-center text-gray-500 text-sm">
            <span>Made with</span>
            <Heart size={14} className="mx-1 text-error-500" />
            <span>in India</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;