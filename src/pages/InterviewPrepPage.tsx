import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, FileText, Lightbulb, Clock, ChevronDown, ChevronUp } from 'lucide-react';
import FileUploader from '../components/FileUploader';
import Button from '../components/Button';

interface InterviewQuestion {
  id: number;
  question: string;
  category: string;
  suggestedAnswer?: string;
  isExpanded: boolean;
}

interface InterviewPrepConfig {
  jobTitle: string;
  industry: string;
  experienceLevel: 'entry' | 'mid' | 'senior';
  specificSkills: string;
}

const InterviewPrepPage: React.FC = () => {
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [formData, setFormData] = useState<InterviewPrepConfig>({
    jobTitle: '',
    industry: '',
    experienceLevel: 'mid',
    specificSkills: '',
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [questions, setQuestions] = useState<InterviewQuestion[]>([]);

  const handleResumeUpload = (file: File) => {
    setResumeFile(file);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleGenerateQuestions = (e: React.FormEvent) => {
    e.preventDefault();
    if (!resumeFile) return;
    
    setIsLoading(true);
    
    // Simulate API call for interview question generation
    setTimeout(() => {
      setIsLoading(false);
      // Mock generated questions
      setQuestions([
        {
          id: 1,
          question: "Tell me about yourself and your experience as a software developer.",
          category: "General",
          suggestedAnswer: "I'm a software developer with 5 years of experience specializing in front-end development. I've worked with React, TypeScript, and Node.js across multiple industries including fintech and e-commerce. In my current role at XYZ Company, I led the development of a customer-facing web portal that increased user engagement by 35%. My approach combines technical skills with a focus on user experience and business objectives.",
          isExpanded: false
        },
        {
          id: 2,
          question: "What experience do you have with React and TypeScript?",
          category: "Technical",
          suggestedAnswer: "I've been working with React for 4 years and TypeScript for 3 years. I've built several production applications using these technologies, including a dashboard for real-time analytics that processed data for over 10,000 daily users. I'm familiar with React hooks, context API, and Redux for state management. With TypeScript, I've implemented strict type checking and interfaces that reduced runtime errors by 40% in our codebase. I stay updated with the latest features through continuous learning and community involvement.",
          isExpanded: false
        },
        {
          id: 3,
          question: "Describe a challenging project you worked on and how you overcame obstacles.",
          category: "Behavioral",
          suggestedAnswer: "I led a project to rebuild our legacy e-commerce platform with modern technologies while maintaining all existing functionality. The main challenges were the tight deadline (3 months) and ensuring zero downtime during migration. I approached this by first creating a detailed component inventory, then implementing a phased migration strategy with comprehensive testing. I also established daily check-ins with stakeholders to address issues quickly. We successfully launched on time with improved performance metrics (40% faster page loads) and maintained 100% uptime during the transition.",
          isExpanded: false
        },
        {
          id: 4,
          question: "How do you stay updated with the latest front-end technologies and best practices?",
          category: "Professional Development",
          suggestedAnswer: "I maintain a structured approach to staying current. I allocate 5 hours weekly for learning through a combination of following key developers on Twitter/GitHub, participating in communities like Dev.to and Stack Overflow, attending monthly meetups, and completing quarterly courses on platforms like Frontend Masters. I also contribute to open-source projects and experiment with new technologies through personal projects. This regular practice has helped me identify and implement performance optimizations and accessibility improvements in my professional work.",
          isExpanded: false
        },
        {
          id: 5,
          question: "What's your approach to debugging complex issues in a web application?",
          category: "Technical",
          suggestedAnswer: "When facing complex bugs, I follow a systematic approach: First, I reproduce the issue consistently and document the exact steps. Then I isolate the problem by checking browser console logs, network requests, and state management. For particularly challenging issues, I use advanced debugging techniques like setting breakpoints, logging state changes, and using performance profiling tools. I also believe in collaborative debugging - sometimes explaining the issue to a colleague helps uncover solutions. Once resolved, I document the root cause and solution to help the team learn from the experience.",
          isExpanded: false
        },
        {
          id: 6,
          question: "How do you handle conflicting priorities or tight deadlines?",
          category: "Work Style",
          suggestedAnswer: "When facing conflicting priorities, I first clarify the business impact of each task to understand their true importance. I communicate transparently with stakeholders to reset expectations if needed. For tight deadlines, I break work into smaller deliverables to show progress and identify risks early. In a recent project where we had to implement three major features simultaneously, I proposed a phased approach with weekly releases instead of a single deadline. This allowed us to gather feedback earlier and ultimately deliver higher quality work that better met business needs.",
          isExpanded: false
        },
        {
          id: 7,
          question: "Where do you see yourself professionally in 5 years?",
          category: "Career Goals",
          suggestedAnswer: "In five years, I aim to have grown into a technical lead role where I can combine my technical expertise with mentoring junior developers and influencing product strategy. I'm particularly interested in specializing further in performance optimization and accessibility. I plan to achieve this by taking on increasingly complex projects, contributing to architectural decisions, and developing my leadership skills through both formal training and practical experience leading smaller initiatives. This role aligns with my passion for both technical excellence and helping others grow.",
          isExpanded: false
        },
      ]);
    }, 2000);
  };

  const toggleAnswer = (id: number) => {
    setQuestions(questions.map(q => 
      q.id === id ? { ...q, isExpanded: !q.isExpanded } : q
    ));
  };

  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
            >
              Interview Prep Assistant
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-xl text-gray-600"
            >
              Practice with AI-generated interview questions based on your resume
            </motion.p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="lg:col-span-1 bg-white rounded-xl shadow-md p-6 md:p-8 h-fit"
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Generate Interview Questions</h2>
              
              <form onSubmit={handleGenerateQuestions}>
                <div className="mb-6">
                  <FileUploader
                    acceptedFileTypes=".pdf,.doc,.docx"
                    maxFileSizeMB={5}
                    onFileUpload={handleResumeUpload}
                    label="Upload your resume"
                    helpText="We'll generate questions based on your profile"
                  />
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Job Title
                    </label>
                    <input
                      type="text"
                      name="jobTitle"
                      value={formData.jobTitle}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="e.g., Software Engineer"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Industry
                    </label>
                    <input
                      type="text"
                      name="industry"
                      value={formData.industry}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="e.g., Technology, Healthcare"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Experience Level
                    </label>
                    <select
                      name="experienceLevel"
                      value={formData.experienceLevel}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    >
                      <option value="entry">Entry Level (0-2 years)</option>
                      <option value="mid">Mid Level (3-5 years)</option>
                      <option value="senior">Senior Level (6+ years)</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Specific Skills (optional)
                    </label>
                    <textarea
                      name="specificSkills"
                      value={formData.specificSkills}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="e.g., React, TypeScript, Project Management"
                    ></textarea>
                  </div>
                </div>
                
                <div className="mt-6">
                  <Button
                    variant="primary"
                    size="lg"
                    fullWidth
                    type="submit"
                    icon={<MessageSquare size={18} />}
                    disabled={!resumeFile || !formData.jobTitle || !formData.industry}
                    loading={isLoading}
                  >
                    Generate Questions
                  </Button>
                </div>
              </form>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="lg:col-span-2 bg-white rounded-xl shadow-md p-6 md:p-8"
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Interview Questions</h2>
              
              {questions.length > 0 ? (
                <div className="space-y-4">
                  {questions.map((q) => (
                    <motion.div
                      key={q.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className="border border-gray-200 rounded-lg overflow-hidden"
                    >
                      <div 
                        className="p-4 bg-gray-50 flex justify-between items-start cursor-pointer"
                        onClick={() => toggleAnswer(q.id)}
                      >
                        <div>
                          <span className="inline-block px-2 py-1 text-xs font-medium bg-primary-100 text-primary-800 rounded-full mb-2">
                            {q.category}
                          </span>
                          <h3 className="font-medium text-gray-900">{q.question}</h3>
                        </div>
                        <button className="text-gray-500 mt-1 p-1">
                          {q.isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                        </button>
                      </div>
                      
                      {q.isExpanded && q.suggestedAnswer && (
                        <div className="p-4 border-t border-gray-200 bg-white">
                          <h4 className="font-medium text-gray-700 mb-2 flex items-center">
                            <Lightbulb size={16} className="text-accent-400 mr-2" />
                            Suggested Answer
                          </h4>
                          <p className="text-gray-600">{q.suggestedAnswer}</p>
                          
                          <div className="mt-4 pt-4 border-t border-gray-100">
                            <h4 className="font-medium text-gray-700 mb-2 flex items-center">
                              <Clock size={16} className="text-primary-600 mr-2" />
                              Answer Tips
                            </h4>
                            <ul className="text-sm text-gray-600 space-y-1">
                              <li>• Focus on specific examples that demonstrate your skills</li>
                              <li>• Keep your answer concise (1-2 minutes)</li>
                              <li>• Highlight measurable achievements when possible</li>
                            </ul>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-gray-500">
                  <MessageSquare size={48} className="mb-4 text-gray-400" />
                  <p className="text-center mb-2">Your interview questions will appear here</p>
                  <p className="text-center text-sm">Fill out the form and upload your resume to get started</p>
                </div>
              )}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-white rounded-xl shadow-md p-6 md:p-8 mt-8"
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Interview Success Tips</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-primary-50 p-5 rounded-lg">
                <h3 className="font-medium text-primary-800 mb-3">Before the Interview</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <span className="inline-block w-4 h-4 bg-primary-200 rounded-full mr-2 mt-1"></span>
                    <span>Research the company thoroughly</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-4 h-4 bg-primary-200 rounded-full mr-2 mt-1"></span>
                    <span>Practice answers to common questions</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-4 h-4 bg-primary-200 rounded-full mr-2 mt-1"></span>
                    <span>Prepare specific examples using the STAR method</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-4 h-4 bg-primary-200 rounded-full mr-2 mt-1"></span>
                    <span>Prepare thoughtful questions to ask</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-secondary-50 p-5 rounded-lg">
                <h3 className="font-medium text-secondary-800 mb-3">During the Interview</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <span className="inline-block w-4 h-4 bg-secondary-200 rounded-full mr-2 mt-1"></span>
                    <span>Listen carefully and ask for clarification if needed</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-4 h-4 bg-secondary-200 rounded-full mr-2 mt-1"></span>
                    <span>Be specific with examples from your experience</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-4 h-4 bg-secondary-200 rounded-full mr-2 mt-1"></span>
                    <span>Show enthusiasm and positive body language</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-4 h-4 bg-secondary-200 rounded-full mr-2 mt-1"></span>
                    <span>Be honest about your skills and experience</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-accent-50 p-5 rounded-lg">
                <h3 className="font-medium text-accent-700 mb-3">After the Interview</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <span className="inline-block w-4 h-4 bg-accent-200 rounded-full mr-2 mt-1"></span>
                    <span>Send a personalized thank-you email within 24 hours</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-4 h-4 bg-accent-200 rounded-full mr-2 mt-1"></span>
                    <span>Follow up if you don't hear back within the expected timeframe</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-4 h-4 bg-accent-200 rounded-full mr-2 mt-1"></span>
                    <span>Reflect on your performance and learn from each interview</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-4 h-4 bg-accent-200 rounded-full mr-2 mt-1"></span>
                    <span>Continue your job search until you accept an offer</span>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default InterviewPrepPage;