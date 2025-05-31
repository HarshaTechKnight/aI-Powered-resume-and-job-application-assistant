import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, CheckCircle, X, AlertCircle, Info } from 'lucide-react';
import FileUploader from '../components/FileUploader';
import Button from '../components/Button';
import ScoreGauge from '../components/ScoreGauge';
import ProgressBar from '../components/ProgressBar';

interface FeedbackItem {
  type: 'success' | 'warning' | 'error';
  section: string;
  message: string;
}

interface ScoreResults {
  overall: number;
  sections: {
    keywords: number;
    formatting: number;
    skills: number;
    experience: number;
  };
  feedback: FeedbackItem[];
}

const ResumeScoringPage: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [results, setResults] = useState<ScoreResults | null>(null);

  const handleFileUpload = (uploadedFile: File) => {
    setFile(uploadedFile);
    setResults(null);
  };

  const handleAnalyzeResume = () => {
    if (!file) return;
    
    setIsLoading(true);
    
    // Simulate API call for resume analysis
    setTimeout(() => {
      setIsLoading(false);
      // Mock results
      setResults({
        overall: 78,
        sections: {
          keywords: 85,
          formatting: 90,
          skills: 70,
          experience: 65,
        },
        feedback: [
          {
            type: 'success',
            section: 'Formatting',
            message: 'Your resume has a clean, ATS-friendly format. Great job!'
          },
          {
            type: 'success',
            section: 'Keywords',
            message: 'Good use of industry-relevant keywords throughout your resume.'
          },
          {
            type: 'warning',
            section: 'Skills',
            message: 'Consider adding more technical skills relevant to your target positions.'
          },
          {
            type: 'error',
            section: 'Experience',
            message: 'Your job descriptions focus too much on responsibilities rather than achievements.'
          },
          {
            type: 'warning',
            section: 'Education',
            message: 'Your education section could be more detailed with relevant coursework.'
          },
        ]
      });
    }, 2000);
  };

  const resetAnalysis = () => {
    setFile(null);
    setResults(null);
  };

  const getFeedbackIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle size={20} className="text-success-500" />;
      case 'warning':
        return <AlertCircle size={20} className="text-accent-400" />;
      case 'error':
        return <X size={20} className="text-error-500" />;
      default:
        return <Info size={20} className="text-gray-500" />;
    }
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
              AI Resume Scoring
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-xl text-gray-600"
            >
              Get your resume scored for ATS compatibility and receive personalized feedback
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
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Upload Your Resume</h2>
                <p className="text-gray-600 mb-6">
                  Our AI will analyze your resume for ATS compatibility, keyword optimization, formatting, and provide personalized feedback.
                </p>
                <div className="mb-6">
                  <FileUploader
                    acceptedFileTypes=".pdf,.doc,.docx"
                    maxFileSizeMB={5}
                    onFileUpload={handleFileUpload}
                    label="Upload your resume"
                    helpText="Drop your resume here, or click to browse"
                  />
                </div>
                <div className="flex justify-center">
                  <Button
                    variant="primary"
                    size="lg"
                    icon={<FileText size={18} />}
                    disabled={!file}
                    loading={isLoading}
                    onClick={handleAnalyzeResume}
                  >
                    Analyze Resume
                  </Button>
                </div>
              </>
            ) : (
              <>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">Resume Analysis Results</h2>
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
                    <ScoreGauge score={results.overall} size="lg" label="Overall ATS Score" />
                  </div>
                  
                  <div className="md:col-span-2 space-y-4">
                    <h3 className="text-lg font-medium text-gray-900 mb-3">Section Scores</h3>
                    <ProgressBar 
                      percentage={results.sections.keywords} 
                      label="Keywords" 
                      color="primary"
                    />
                    <ProgressBar 
                      percentage={results.sections.formatting} 
                      label="Formatting" 
                      color="success"
                    />
                    <ProgressBar 
                      percentage={results.sections.skills} 
                      label="Skills Matching" 
                      color="accent"
                    />
                    <ProgressBar 
                      percentage={results.sections.experience} 
                      label="Experience Relevance" 
                      color="secondary"
                    />
                  </div>
                </div>

                <div className="mt-8">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Personalized Feedback</h3>
                  <div className="space-y-3">
                    {results.feedback.map((item, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.1 * index }}
                        className={`p-4 rounded-lg flex items-start ${
                          item.type === 'success'
                            ? 'bg-success-50'
                            : item.type === 'warning'
                            ? 'bg-accent-50'
                            : 'bg-error-50'
                        }`}
                      >
                        <span className="mr-3 mt-0.5">{getFeedbackIcon(item.type)}</span>
                        <div>
                          <h4 className="font-medium text-gray-900">{item.section}</h4>
                          <p className="text-gray-700">{item.message}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 p-4 bg-primary-50 rounded-lg">
                  <h3 className="text-lg font-medium text-primary-800 mb-2">Next Steps</h3>
                  <p className="text-gray-700 mb-4">
                    Based on your analysis, we recommend the following actions to improve your resume:
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-gray-700">
                    <li>Add more quantifiable achievements to your experience section</li>
                    <li>Include additional relevant technical skills</li>
                    <li>Enhance your education section with relevant coursework</li>
                    <li>Optimize formatting for better ATS readability</li>
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
            <h2 className="text-xl font-semibold text-gray-900 mb-4">How Our AI Resume Scoring Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-4 rounded-lg bg-primary-50">
                <h3 className="font-medium text-primary-800 mb-2">ATS Compatibility</h3>
                <p className="text-gray-700">
                  We analyze your resume's format, structure, and content to ensure it passes through Applicant Tracking Systems.
                </p>
              </div>
              <div className="p-4 rounded-lg bg-secondary-50">
                <h3 className="font-medium text-secondary-800 mb-2">Keyword Optimization</h3>
                <p className="text-gray-700">
                  Our AI identifies industry-specific keywords and suggests improvements to match job requirements.
                </p>
              </div>
              <div className="p-4 rounded-lg bg-accent-50">
                <h3 className="font-medium text-accent-700 mb-2">Personalized Feedback</h3>
                <p className="text-gray-700">
                  Receive actionable suggestions to improve specific sections of your resume.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ResumeScoringPage;