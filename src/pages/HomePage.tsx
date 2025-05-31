import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Briefcase, FileEdit, MessageSquare, ArrowRight } from 'lucide-react';
import FeatureCard from '../components/FeatureCard';
import Button from '../components/Button';

const HomePage: React.FC = () => {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-800 to-primary-900 pt-24 pb-16 md:pt-32 md:pb-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row items-center">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="md:w-1/2 md:pr-8 mb-8 md:mb-0"
            >
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4">
                <span className="text-accent-400">AI-Powered</span> Resume & Job Application Assistant
              </h1>
              <p className="text-primary-100 text-lg md:text-xl mb-8">
                Optimize your resume, match job descriptions, get personalized feedback, generate cover letters, and prepare for interviews—all in one place.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Button 
                  variant="accent" 
                  size="lg" 
                  icon={<ArrowRight size={18} />} 
                  iconPosition="right"
                >
                  Try it Now
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-white text-white hover:bg-white hover:text-primary-800"
                >
                  Learn More
                </Button>
              </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="md:w-1/2"
            >
              <img 
                src="https://images.pexels.com/photos/3755755/pexels-photo-3755755.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="Professional using KareerSakhi" 
                className="rounded-lg shadow-xl w-full"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
            >
              Our <span className="text-primary-800">Features</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-xl text-gray-600 max-w-3xl mx-auto"
            >
              Everything you need to perfect your job application and land your dream role
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard
              icon={FileText}
              title="AI Resume Scoring"
              description="Get your resume scored based on ATS compatibility with actionable feedback to improve it."
              linkTo="/resume-scoring"
              iconBgColor="bg-primary-100"
              delay={0.1}
            />
            <FeatureCard
              icon={Briefcase}
              title="Job Description Matching"
              description="Match your resume with job descriptions to increase your chances of getting selected."
              linkTo="/job-matching"
              iconBgColor="bg-secondary-100"
              delay={0.2}
            />
            <FeatureCard
              icon={FileEdit}
              title="Cover Letter Generator"
              description="Generate tailored cover letters that highlight your skills and experience for specific roles."
              linkTo="/cover-letter"
              iconBgColor="bg-accent-100"
              delay={0.3}
            />
            <FeatureCard
              icon={MessageSquare}
              title="Interview Prep Assistant"
              description="Prepare for interviews with AI-generated questions and suggested answers based on your profile."
              linkTo="/interview-prep"
              iconBgColor="bg-success-100"
              delay={0.4}
            />
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
            >
              How It <span className="text-primary-800">Works</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-xl text-gray-600 max-w-3xl mx-auto"
            >
              Three simple steps to optimize your job application process
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'Upload Your Resume',
                description: 'Upload your existing resume in PDF, DOC, or DOCX format to get started.',
              },
              {
                step: '02',
                title: 'Choose Your Service',
                description: 'Select from our range of AI-powered services to improve your job application materials.',
              },
              {
                step: '03',
                title: 'Get Instant Feedback',
                description: 'Receive instant analysis and actionable recommendations to enhance your chances of success.',
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                className="bg-white rounded-xl shadow-md p-6 relative"
              >
                <div className="bg-primary-800 text-white text-xl font-bold w-12 h-12 rounded-full flex items-center justify-center absolute -top-5 left-6">
                  {item.step}
                </div>
                <div className="pt-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
            >
              What Our Users <span className="text-primary-800">Say</span>
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Arjun Patel',
                role: 'Software Engineer',
                content: 'The AI resume scoring helped me identify key weaknesses in my resume. After implementing the suggestions, I received interview calls from 3 top tech companies!',
                image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
              },
              {
                name: 'Priya Sharma',
                role: 'Marketing Manager',
                content: 'The job description matching feature is a game-changer. It helped me customize my resume for each application, significantly improving my response rate.',
                image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
              },
              {
                name: 'Raj Mehta',
                role: 'Data Analyst',
                content: 'The interview prep assistant helped me prepare for tough technical questions. The AI-generated mock interviews boosted my confidence significantly.',
                image: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
              },
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                className="bg-white rounded-xl shadow-md p-6"
              >
                <div className="flex items-center mb-4">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">"{testimonial.content}"</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-primary-800 to-primary-900">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-3xl md:text-4xl font-bold text-white mb-6"
            >
              Ready to Supercharge Your Job Search?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-xl text-primary-100 mb-8"
            >
              Join thousands of job seekers who have improved their application success rate with KareerSakhi.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Button 
                variant="accent" 
                size="lg" 
                icon={<ArrowRight size={18} />} 
                iconPosition="right"
              >
                Get Started For Free
              </Button>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;