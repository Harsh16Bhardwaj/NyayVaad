'use client';

import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion } from 'framer-motion';
import { Loader2, FileText, AlertCircle } from 'lucide-react';
import HeroParallax from '@/components/ui/hero-parallax'; 

export default function SummarisePage() {
  const [file, setFile] = useState<File | null>(null);
  const [summary, setSummary] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      if (file.type === 'application/pdf') {
        setFile(file);
        setError(null);
        processPDF(file);
      } else {
        setError('Please upload a PDF file');
      }
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf']
    },
    maxFiles: 1
  });

  const processPDF = async (file: File) => {
    setLoading(true);
    setError(null);
    try {
      // TODO: Implement PDF processing logic
      // For now, we'll simulate a delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSummary('This is a sample summary of your PDF document. The actual implementation would process the PDF and generate a meaningful summary.');
    } catch (err) {
      setError('Failed to process PDF. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            PDF Summarizer
          </h1>
          <p className="mt-3 text-lg text-gray-500">
            Upload your PDF and get an instant summary
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upload Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-lg shadow-lg p-6"
          >
            <div
              {...getRootProps()}
              className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
                ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-500'}`}
            >
              <input {...getInputProps()} />
              {file ? (
                <div className="space-y-4">
                  <FileText className="mx-auto h-12 w-12 text-blue-500" />
                  <p className="text-sm text-gray-600">{file.name}</p>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setFile(null);
                      setSummary('');
                    }}
                    className="text-sm text-red-500 hover:text-red-700"
                  >
                    Remove file
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <FileText className="mx-auto h-12 w-12 text-gray-400" />
                  <p className="text-sm text-gray-600">
                    {isDragActive
                      ? 'Drop the PDF here'
                      : 'Drag and drop a PDF here, or click to select'}
                  </p>
                </div>
              )}
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-4 flex items-center text-red-500"
              >
                <AlertCircle className="h-5 w-5 mr-2" />
                <p className="text-sm">{error}</p>
              </motion.div>
            )}
          </motion.div>

          {/* Summary Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-lg shadow-lg p-6 min-h-[300px]"
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Summary</h2>
            {loading ? (
              <div className="flex items-center justify-center h-full">
                <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
              </div>
            ) : summary ? (
              <div className="prose max-w-none">
                <p className="text-gray-600">{summary}</p>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full text-gray-400">
                <p>Upload a PDF to see its summary</p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
} 