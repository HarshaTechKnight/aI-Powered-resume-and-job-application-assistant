import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, ChevronRight, AlertCircle, CheckCircle, Briefcase } from 'lucide-react';
import FileUploader from '../components/FileUploader';
import Button from '../components/Button';
import ScoreGauge from '../components/ScoreGauge';
import ProgressBar from '../components/ProgressBar';

interface MatchResult {
  overallMatch: number;
  keywordMatch: number;
  skillsMatch: number;
  experienceMatch: number;
  missingKeywords: string[];
  missingSkills: string[];
  matchedKeywords: string[];
}

const JobMatchingPage: React.FC = () => {
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [results, setResults] = useState<MatchResult | null>(null);

  const handleResumeUpload = (file: File) => {
    setResumeFile(file);
    setResults(null);
  };

  const handleJobDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setJobDescription(e.target.value);
    setResults(null);
  };

  const handleAnalyzeMatch = () => {
    if (!resumeFile || !jobDescription.trim()) return;
    
    setIsLoading(true);
    
    // Simulate API call for job matching
    setTimeout(() => {
      setIsLoading(false);
      // Mock results
      setResults({
        overallMatch: 72,
        keywordMatch: 75,
        skillsMatch: 68,
        experienceMatch: 80,
        missingKeywords: ['blockchain', 'docker', 'kubernetes', 'CI/CD'],
        missingSkills: ['AWS', 'microservices architecture', 'Jenkins'],
        matchedKeywords: ['React', 'JavaScript', 'TypeScript', 'Node.js', 'REST API', 'Git']
      });
    }, 2000);
  };

  const resetAnalysis = () => {
    setResumeFile(null);
    setJobDescription('');
    setResults(null);
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
              Job Description Matching
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-xl text-gray-600"
            >
              See how well your resume matches the job you're applying for
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-xl shadow-md p-6 md:p-8 mb-8"
          >
            {!results ? (
              <>
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Match Your Resume to a Job Description</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <FileUploader
                      acceptedFileTypes=".pdf,.doc,.docx"
                      maxFileSizeMB={5}
                      onFileUpload={handleResumeUpload}
                      label="Upload your resume"
                      helpText="Drop your resume here, or click to browse"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Paste Job Description
                    </label>
                    <textarea
                      className="w-full h-[200px] px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="Copy and paste the job description here..."
                      value={jobDescription}
                      onChange={handleJobDescriptionChange}
                    ></textarea>
                  </div>
                </div>
                
                <div className="flex justify-center">
                  <Button
                    variant="primary"
                    size="lg"
                    icon={<Briefcase size={18} />}
                    disabled={!resumeFile || !jobDescription.trim()}
                    loading={isLoading}
                    onClick={handleAnalyzeMatch}
                  >
                    Analyze Match
                  </Button>
                </div>
              </>
            ) : (
              <>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">Job Match Analysis Results</h2>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={resetAnalysis}
                  >
                    Start New Analysis
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                  <div className="flex flex-col items-center justify-center">
                    <ScoreGauge score={results.overallMatch} size="lg" label="Overall Match Score" />
                  </div>
                  
                  <div className="md:col-span-2 space-y-4">
                    <h3 className="text-lg font-medium text-gray-900 mb-3">Detailed Match Analysis</h3>
                    <ProgressBar 
                      percentage={results.keywordMatch} 
                      label="Keyword Match" 
                      color="primary"
                    />
                    <ProgressBar 
                      percentage={results.skillsMatch} 
                      label="Skills Match" 
                      color="secondary"
                    />
                    <ProgressBar 
                      percentage={results.experienceMatch} 
                      label="Experience Match" 
                      color="accent"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                  <div className="bg-error-50 p-4 rounded-lg">
                    <div className="flex items-center mb-3">
                      <AlertCircle size={20} className="text-error-500 mr-2" />
                      <h3 className="text-lg font-medium text-gray-900">Missing Keywords</h3>
                    </div>
                    <p className="text-gray-700 mb-3">
                      Consider adding these keywords from the job description:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {results.missingKeywords.map((keyword, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-white text-error-700 text-sm rounded-lg border border-error-200"
                        >
                          {keyword}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="bg-success-50 p-4 rounded-lg">
                    <div className="flex items-center mb-3">
                      <CheckCircle size={20} className="text-success-500 mr-2" />
                      <h3 className="text-lg font-medium text-gray-900">Matched Keywords</h3>
                    </div>
                    <p className="text-gray-700 mb-3">
                      Your resume already includes these important keywords:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {results.matchedKeywords.map((keyword, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-white text-success-700 text-sm rounded-lg border border-success-200"
                        >
                          {keyword}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-8 p-4 bg-primary-50 rounded-lg">
                  <h3 className="text-lg font-medium text-primary-800 mb-2">Recommendations</h3>
                  <p className="text-gray-700 mb-4">
                    Based on your analysis, here's how you can improve your resume for this job:
                  </p>
                  <ul className="space-y-2 text-gray-700">
                    {results.missingSkills.map((skill, index) => (
                      <li key={index} className="flex items-start">
                        <ChevronRight size={18} className="text-primary-600 mr-2 mt-0.5" />
                        <span>Add experience or skills related to <strong>{skill}</strong></span>
                      </li>
                    ))}
                    <li className="flex items-start">
                      <ChevronRight size={18} className="text-primary-600 mr-2 mt-0.5" />
                      <span>Highlight your experience with {results.matchedKeywords.slice(0, 3).join(', ')} more prominently</span>
                    </li>
                    <li className="flex items-start">
                      <ChevronRight size={18} className="text-primary-600 mr-2 mt-0.5" />
                      <span>Quantify your achievements to strengthen your experience section</span>
                    </li>
                  </ul>
                </div>
              </>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white rounded-xl shadow-md p-6 md:p-8"
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Why Job Matching Matters</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-4 rounded-lg bg-primary-50">
                <h3 className="font-medium text-primary-800 mb-2">Higher Response Rate</h3>
                <p className="text-gray-700">
                  Resumes that closely match job descriptions are 60% more likely to get a response from employers.
                </p>
              </div>
              <div className="p-4 rounded-lg bg-secondary-50">
                <h3 className="font-medium text-secondary-800 mb-2">ATS Optimization</h3>
                <p className="text-gray-700">
                  Most companies use ATS software that filters resumes based on keyword matching.
                </p>
              </div>
              <div className="p-4 rounded-lg bg-accent-50">
                <h3 className="font-medium text-accent-700 mb-2">Targeted Applications</h3>
                <p className="text-gray-700">
                  Customizing your resume for each job shows your genuine interest and relevance.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default JobMatchingPage;