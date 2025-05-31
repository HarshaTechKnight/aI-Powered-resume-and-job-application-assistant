import React, { useRef, useState } from 'react';
import { Upload, File, X } from 'lucide-react';
import { motion } from 'framer-motion';

interface FileUploaderProps {
  acceptedFileTypes?: string;
  maxFileSizeMB?: number;
  onFileUpload: (file: File) => void;
  label?: string;
  helpText?: string;
}

const FileUploader: React.FC<FileUploaderProps> = ({
  acceptedFileTypes = '.pdf,.doc,.docx',
  maxFileSizeMB = 5,
  onFileUpload,
  label = 'Upload your file',
  helpText = 'Drag and drop your file here, or click to browse',
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const maxFileSizeBytes = maxFileSizeMB * 1024 * 1024;

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const validateFile = (file: File): boolean => {
    // Check file size
    if (file.size > maxFileSizeBytes) {
      setError(`File is too large. Maximum size is ${maxFileSizeMB}MB`);
      return false;
    }

    // Check file type
    const fileExtension = file.name.split('.').pop()?.toLowerCase();
    const acceptedTypes = acceptedFileTypes
      .split(',')
      .map((type) => type.trim().replace('.', '').toLowerCase());

    if (fileExtension && !acceptedTypes.includes(fileExtension)) {
      setError(`File type not supported. Accepted types: ${acceptedFileTypes}`);
      return false;
    }

    setError(null);
    return true;
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFile = e.dataTransfer.files[0];
      handleFileSelection(droppedFile);
    }
  };

  const handleFileSelection = (selectedFile: File) => {
    if (validateFile(selectedFile)) {
      setFile(selectedFile);
      onFileUpload(selectedFile);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFileSelection(e.target.files[0]);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const removeFile = () => {
    setFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="w-full">
      {label && <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>}
      
      <motion.div
        className={`border-2 border-dashed rounded-lg p-6 transition-colors duration-200 ${
          isDragging
            ? 'border-primary-500 bg-primary-50'
            : file
            ? 'border-success-500 bg-success-50'
            : 'border-gray-300 hover:border-primary-400 bg-white'
        } ${error ? 'border-error-500' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
        whileHover={{ scale: 1.01 }}
        transition={{ type: 'spring', stiffness: 300 }}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept={acceptedFileTypes}
          className="hidden"
          data-testid="file-input"
        />

        <div className="flex flex-col items-center justify-center space-y-3">
          {file ? (
            <div className="flex items-center space-x-2 w-full">
              <div className="bg-success-100 p-2 rounded-lg">
                <File size={24} className="text-success-600" />
              </div>
              <div className="flex-1 truncate">
                <p className="text-sm font-medium text-gray-700 truncate" title={file.name}>
                  {file.name}
                </p>
                <p className="text-xs text-gray-500">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  removeFile();
                }}
                className="p-1 rounded-full hover:bg-gray-200 transition-colors"
                aria-label="Remove file"
              >
                <X size={18} className="text-gray-500" />
              </button>
            </div>
          ) : (
            <>
              <div className="bg-primary-100 p-3 rounded-full">
                <Upload size={24} className="text-primary-600" />
              </div>
              <div className="text-center space-y-1">
                <p className="text-sm font-medium text-gray-700">{helpText}</p>
                <p className="text-xs text-gray-500">
                  Accepted file types: {acceptedFileTypes} (Max {maxFileSizeMB}MB)
                </p>
              </div>
            </>
          )}
        </div>
      </motion.div>

      {error && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-2 text-sm text-error-600"
        >
          {error}
        </motion.p>
      )}
    </div>
  );
};

export default FileUploader;