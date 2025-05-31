import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Copy, Check, FileEdit, Download, X } from 'lucide-react';
import FileUploader from '../components/FileUploader';
import Button from '../components/Button';

interface CoverLetterFormData {
  jobTitle: string;
  company: string;
  recruiterName: string;
  companyDetails: string;
  keyPoints: string;
  tone: 'professional' | 'conversational' | 'enthusiastic';
}

const CoverLetterPage: React.FC = () => {
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [formData, setFormData] = useState<CoverLetterFormData>({
    jobTitle: '',
    company: '',
    recruiterName: '',
    companyDetails: '',
    keyPoints: '',
    tone: 'professional',
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [coverLetter, setCoverLetter] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);

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

  const handleGenerateCoverLetter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!resumeFile) return;
    
    setIsLoading(true);
    
    // Simulate API call for cover letter generation
    setTimeout(() => {
      setIsLoading(false);
      // Mock generated cover letter
      setCoverLetter(`Dear ${formData.recruiterName || 'Hiring Manager'},

I am writing to express my interest in the ${formData.jobTitle} position at ${formData.company}. With my background in software development and experience with React, TypeScript, and Node.js, I believe I would be a valuable addition to your team.

${formData.companyDetails ? `I am particularly drawn to ${formData.company} because ${formData.companyDetails}. Your company's commitment to innovation and excellence aligns perfectly with my professional values.` : ''}

Throughout my career, I have developed strong skills in building responsive web applications, collaborating with cross-functional teams, and delivering high-quality code. My experience includes:
• Leading the development of a customer-facing web portal that increased user engagement by 35%
• Implementing modern frontend architectures using React and TypeScript
• Optimizing application performance and ensuring code quality through comprehensive testing

${formData.keyPoints ? formData.keyPoints : ''}

I am excited about the opportunity to bring my technical skills and passion for creating exceptional user experiences to ${formData.company}. I am confident that my background and enthusiasm make me a strong candidate for this position.

Thank you for considering my application. I look forward to the possibility of discussing how my skills and experiences align with your needs.

Sincerely,
[Your Name]`);
    }, 2000);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(coverLetter);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const element = document.createElement('a');
    const file = new Blob([coverLetter], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `Cover_Letter_${formData.company.replace(/\s+/g, '_')}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
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
              Cover Letter Generator
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-xl text-gray-600"
            >
              Create a personalized cover letter tailored to your dream job
            </motion.p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-xl shadow-md p-6 md:p-8"
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Generate Your Cover Letter</h2>
              
              <form onSubmit={handleGenerateCoverLetter}>
                <div className="mb-6">
                  <FileUploader
                    acceptedFileTypes=".pdf,.doc,.docx"
                    maxFileSizeMB={5}
                    onFileUpload={handleResumeUpload}
                    label="Upload your resume"
                    helpText="We'll use your resume to personalize your cover letter"
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
                      Company Name
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="e.g., Acme Inc."
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Recruiter's Name (optional)
                    </label>
                    <input
                      type="text"
                      name="recruiterName"
                      value={formData.recruiterName}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="e.g., Jane Smith"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Why This Company? (optional)
                    </label>
                    <textarea
                      name="companyDetails"
                      value={formData.companyDetails}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="What attracts you to this company? E.g., their innovative products, culture, mission..."
                    ></textarea>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Key Points to Highlight (optional)
                    </label>
                    <textarea
                      name="keyPoints"
                      value={formData.keyPoints}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="Specific achievements, skills, or experiences relevant to this job"
                    ></textarea>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Tone
                    </label>
                    <select
                      name="tone"
                      value={formData.tone}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    >
                      <option value="professional">Professional</option>
                      <option value="conversational">Conversational</option>
                      <option value="enthusiastic">Enthusiastic</option>
                    </select>
                  </div>
                </div>
                
                <div className="mt-6">
                  <Button
                    variant="primary"
                    size="lg"
                    fullWidth
                    type="submit"
                    icon={<FileEdit size={18} />}
                    disabled={!resumeFile || !formData.jobTitle || !formData.company}
                    loading={isLoading}
                  >
                    Generate Cover Letter
                  </Button>
                </div>
              </form>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white rounded-xl shadow-md p-6 md:p-8 flex flex-col"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-900">Your Cover Letter</h2>
                {coverLetter && (
                  <div className="flex space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      icon={copied ? <Check size={16} /> : <Copy size={16} />}
                      onClick={handleCopy}
                    >
                      {copied ? 'Copied!' : 'Copy'}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      icon={<Download size={16} />}
                      onClick={handleDownload}
                    >
                      Download
                    </Button>
                  </div>
                )}
              </div>
              
              {coverLetter ? (
                <div className="flex-grow bg-gray-50 p-4 rounded-lg overflow-auto whitespace-pre-line">
                  {coverLetter}
                </div>
              ) : (
                <div className="flex-grow flex flex-col items-center justify-center bg-gray-50 p-6 rounded-lg text-gray-500">
                  <FileText size={48} className="mb-4 text-gray-400" />
                  <p className="text-center mb-2">Your generated cover letter will appear here</p>
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
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Cover Letter Writing Tips</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium text-primary-800 mb-2">Do's</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <Check size={18} className="text-success-500 mr-2 mt-0.5" />
                    <span>Customize each cover letter for the specific job</span>
                  </li>
                  <li className="flex items-start">
                    <Check size={18} className="text-success-500 mr-2 mt-0.5" />
                    <span>Address the hiring manager by name if possible</span>
                  </li>
                  <li className="flex items-start">
                    <Check size={18} className="text-success-500 mr-2 mt-0.5" />
                    <span>Highlight relevant achievements and skills</span>
                  </li>
                  <li className="flex items-start">
                    <Check size={18} className="text-success-500 mr-2 mt-0.5" />
                    <span>Keep it concise (one page maximum)</span>
                  </li>
                  <li className="flex items-start">
                    <Check size={18} className="text-success-500 mr-2 mt-0.5" />
                    <span>Show enthusiasm for the company and role</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-medium text-error-700 mb-2">Don'ts</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <X size={18} className="text-error-500 mr-2 mt-0.5" />
                    <span>Use generic templates without personalization</span>
                  </li>
                  <li className="flex items-start">
                    <X size={18} className="text-error-500 mr-2 mt-0.5" />
                    <span>Repeat your entire resume in paragraph form</span>
                  </li>
                  <li className="flex items-start">
                    <X size={18} className="text-error-500 mr-2 mt-0.5" />
                    <span>Include irrelevant experiences or skills</span>
                  </li>
                  <li className="flex items-start">
                    <X size={18} className="text-error-500 mr-2 mt-0.5" />
                    <span>Use overly formal or stiff language</span>
                  </li>
                  <li className="flex items-start">
                    <X size={18} className="text-error-500 mr-2 mt-0.5" />
                    <span>Forget to proofread for errors</span>
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

export default CoverLetterPage;