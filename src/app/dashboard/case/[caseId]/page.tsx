'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useParams } from 'next/navigation';
import { 
  Briefcase, 
  Calendar, 
  FileText, 
  Loader2, 
  MessageSquare,
  ArrowLeft,
  Gavel,
  User
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import ProtectedPage from '@/components/ProtectedPage';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/app/store';
import { fetchCaseById } from '../../../../app/store/slices/caseSlice';
import { CaseStatus } from '@/generated/prisma';

interface Case {
  id: string;
  title: string;
  description: string;
  status: CaseStatus;
  opponent: string | null;
  timeline: string[];
  evidence: boolean;
  agreement: boolean;
  finalAnalysis: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export default function CaseDetailPage() {
  const { caseId } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const { currentCase, loading, error } = useSelector((state: RootState) => state.cases);

  useEffect(() => {
    if (caseId) {
      dispatch(fetchCaseById(caseId as string));
    }
  }, [dispatch, caseId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="w-8 h-8 text-purple-400 animate-spin" />
      </div>
    );
  }

  if (error || !currentCase) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="text-red-400 mb-4">Error loading case details</div>
        <Link href="/dashboard">
          <Button variant="outline" className="bg-transparent border-purple-500/30 text-purple-400 hover:bg-purple-500/10 hover:text-purple-300">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
        </Link>
      </div>
    );
  }

  const case_ = currentCase as Case;

  return (
    <ProtectedPage>
      <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-800 to-gray-950 pt-24 pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <Link href="/dashboard">
              <Button variant="ghost" className="text-gray-400 hover:text-white">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-white/5"
          >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">{case_.title}</h1>
                <div className="flex items-center space-x-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    case_.status === CaseStatus.OPEN || case_.status === CaseStatus.IN_PROGRESS
                      ? 'bg-green-500/20 text-green-400' 
                      : 'bg-gray-500/20 text-gray-400'
                  }`}>
                    {case_.status}
                  </span>
                  <span className="text-gray-400 text-sm">
                    Created: {new Date(case_.createdAt).toLocaleDateString('en-US')}
                  </span>
                </div>
              </div>
              <div className="mt-4 md:mt-0 flex space-x-4">
                <Button
                  variant="outline"
                  className="bg-transparent border-purple-500/30 text-purple-400 hover:bg-purple-500/10 hover:text-purple-300"
                  onClick={() => window.location.href = '/chat'}
                >
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Chat with AI
                </Button>
                <Button
                  variant="outline"
                  className="bg-transparent border-purple-500/30 text-purple-400 hover:bg-purple-500/10 hover:text-purple-300"
                  onClick={() => window.open('https://ecourts.gov.in/ecourts_home/', '_blank')}
                >
                  <Gavel className="w-4 h-4 mr-2" />
                  Court Portal
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="bg-gray-800/50 rounded-lg p-6">
                  <h2 className="text-xl font-semibold text-white mb-4">Case Details</h2>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium text-purple-400 mb-2">Description</h3>
                      <p className="text-gray-300">{case_.description}</p>
                    </div>
                    {case_.opponent && (
                      <div>
                        <h3 className="text-sm font-medium text-purple-400 mb-2">Opponent</h3>
                        <p className="text-gray-300">{case_.opponent}</p>
                      </div>
                    )}
                    <div>
                      <h3 className="text-sm font-medium text-purple-400 mb-2">Evidence</h3>
                      <p className="text-gray-300">{case_.evidence ? 'Available' : 'Not Available'}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-purple-400 mb-2">Agreement</h3>
                      <p className="text-gray-300">{case_.agreement ? 'Yes' : 'No'}</p>
                    </div>
                  </div>
                </div>

                {case_.finalAnalysis && (
                  <div className="bg-gray-800/50 rounded-lg p-6">
                    <h2 className="text-xl font-semibold text-white mb-4">Final Analysis</h2>
                    <p className="text-gray-300">{case_.finalAnalysis}</p>
                  </div>
                )}
              </div>

              <div className="space-y-6">
                <div className="bg-gray-800/50 rounded-lg p-6">
                  <h2 className="text-xl font-semibold text-white mb-4">Timeline</h2>
                  <div className="space-y-4">
                    {case_.timeline.map((event, index) => (
                      <div key={index} className="flex items-start space-x-4">
                        <div className="w-2 h-2 rounded-full bg-purple-500 mt-2" />
                        <div>
                          <p className="text-gray-300">{event}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-gray-800/50 rounded-lg p-6">
                  <h2 className="text-xl font-semibold text-white mb-4">Quick Actions</h2>
                  <div className="grid grid-cols-2 gap-4">
                    <Button
                      variant="outline"
                      className="bg-transparent border-purple-500/30 text-purple-400 hover:bg-purple-500/10 hover:text-purple-300"
                      onClick={() => window.open('https://www.canva.com/templates/search/legal-documents/', '_blank')}
                    >
                      <FileText className="w-4 h-4 mr-2" />
                      Documents
                    </Button>
                    <Button
                      variant="outline"
                      className="bg-transparent border-purple-500/30 text-purple-400 hover:bg-purple-500/10 hover:text-purple-300"
                      onClick={() => window.open('https://www.linkedin.com/search/results/people/?keywords=Indian%20Lawyer', '_blank')}
                    >
                      <User className="w-4 h-4 mr-2" />
                      Find Lawyer
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </ProtectedPage>
  );
} 