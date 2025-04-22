'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, X, ExternalLink, Sparkles, FileText, Scale, Gavel } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import SanSam from '@/../public/san-sam.png';

interface LegalTerm {
  word: string;
  description: string;
  usage: string[];
  category: 'contract' | 'criminal' | 'civil' | 'constitutional' | 'corporate';
  source?: string;
}

const legalTerms: LegalTerm[] = [
  {
    word: 'Estoppel',
    description: 'A principle preventing someone from contradicting prior actions or statements.',
    usage: [
      'Estoppel barred the tenant from denying the lease’s validity.',
      'The court used estoppel to prevent the defendant’s contradictory claim.'
    ],
    category: 'civil',
    source: 'https://indiankanoon.org/doc/123456/',
  },
  {
    word: 'Habeas Corpus',
    description: 'A legal action to challenge unlawful detention.',
    usage: [
      'The prisoner filed habeas corpus to contest his detention.',
      'The court granted habeas corpus, ordering immediate release.'
    ],
    category: 'constitutional',
    source: 'https://indiankanoon.org/doc/789012/',
  },
  {
    word: 'Prima Facie',
    description: 'Evidence sufficient to establish a fact unless disproved.',
    usage: [
      'The prosecution presented prima facie evidence of guilt.',
      'A prima facie case of discrimination was established.'
    ],
    category: 'civil',
  },
  {
    word: 'Mens Rea',
    description: 'The intent to commit a crime, a key element in criminal law.',
    usage: [
      'Mens rea was proven to secure the conviction.',
      'Lack of mens rea negated criminal liability.'
    ],
    category: 'criminal',
  },
  {
    word: 'Ultra Vires',
    description: 'Actions beyond one’s legal authority.',
    usage: [
      'The board’s ultra vires decision was voided.',
      'The contract was ultra vires and unenforceable.'
    ],
    category: 'corporate',
  },
  {
    word: 'Force Majeure',
    description: 'Unforeseeable events excusing contract performance.',
    usage: [
      'The company cited force majeure due to a flood.',
      'The pandemic triggered force majeure clauses.'
    ],
    category: 'contract',
  },
  {
    word: 'Locus Standi',
    description: 'The right to bring an action or appear in court.',
    usage: [
      'The petitioner lacked locus standi to challenge the law.',
      'The court confirmed the NGO’s locus standi.'
    ],
    category: 'constitutional',
  },
  {
    word: 'Res Ipsa Loquitur',
    description: 'A doctrine where negligence is inferred from the incident itself.',
    usage: [
      'Res ipsa loquitur applied to the medical malpractice case.',
      'The doctrine shifted the burden of proof to the defendant.'
    ],
    category: 'civil',
  },
  {
    word: 'Actus Reus',
    description: 'The physical act of a crime, complementing mens rea.',
    usage: [
      'The prosecution proved actus reus through video evidence.',
      'Actus reus was established, but intent was unclear.'
    ],
    category: 'criminal',
  },
  {
    word: 'Fiduciary Duty',
    description: 'An obligation to act in the best interest of another party.',
    usage: [
      'The director breached fiduciary duty to shareholders.',
      'Fiduciary duty required full disclosure of conflicts.'
    ],
    category: 'corporate',
  },
];

const wordOfTheDay: LegalTerm = {
  word: 'Injunction',
  description: 'A court order to prevent or compel an action.',
  usage: [
    'The court issued an injunction to stop the construction.',
    'An injunction was sought to protect trade secrets.',
  ],
  category: 'civil',
  source: 'https://indiankanoon.org/doc/345678/',
};

export default function FunPage() {
  const [selectedTerm, setSelectedTerm] = useState<LegalTerm | null>(null);

  const categoryStyles = {
    contract: 'bg-purple-900/20 border-purple-700/30 text-purple-400',
    criminal: 'bg-red-900/20 border-red-800/30 text-red-400',
    civil: 'bg-teal-900/20 border-teal-800/30 text-teal-400',
    constitutional: 'bg-indigo-900/20 border-indigo-700/30 text-indigo-400',
    corporate: 'bg-amber-900/20 border-amber-800/30 text-amber-400',
  };

  return (
    <div className="min-h-screen bg-gray-950 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 space-y-16">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h1 className="text-4xl font-bold text-gray-100 font-[var(--font-inter)] mb-4">
            Master Legal Terms
          </h1>
          <p className="text-lg text-gray-400 font-[var(--font-inter)] max-w-2xl mx-auto">
            Dive into essential legal terminology to empower your case, with insights from Indian Kanoon and our AI assistant.
          </p>
        </motion.div>

        {/* Word of the Day Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-purple-800/30 shadow-lg"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-gray-100 font-[var(--font-inter)] flex items-center">
              <Sparkles className="w-6 h-6 mr-2 text-purple-400" />
              Word of the Day
            </h2>
            <span className="text-gray-500 text-sm font-[var(--font-inter)]">
              {new Date().toLocaleDateString()}
            </span>
          </div>
          <h3 className="text-3xl font-bold text-purple-400 font-[var(--font-inter)] mb-4">
            {wordOfTheDay.word}
          </h3>
          <p className="text-gray-300 mb-6 font-[var(--font-inter)]">{wordOfTheDay.description}</p>
          <div className="space-y-3">
            {wordOfTheDay.usage.map((example, index) => (
              <p key={index} className="text-sm text-gray-400 italic font-[var(--font-inter)]">
                "{example}"
              </p>
            ))}
          </div>
          {wordOfTheDay.source && (
            <Link href={wordOfTheDay.source} target="_blank" className="text-indigo-400 text-sm flex items-center mt-4 hover:text-indigo-300">
              Learn more on Indian Kanoon <ExternalLink className="w-4 h-4 ml-1" />
            </Link>
          )}
        </motion.div>

        {/* Legal Terms Grid */}
        <div className="space-y-8">
          <h2 className="text-2xl font-semibold text-gray-100 font-[var(--font-inter)]">Explore Legal Terms</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {legalTerms.map((term) => (
              <motion.div
                key={term.word}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                whileHover={{ y: -3, boxShadow: '0 8px 16px rgba(0, 0, 0, 0.3)' }}
                onClick={() => setSelectedTerm(term)}
                className={`cursor-pointer rounded-xl p-6 bg-gray-900/50 border ${categoryStyles[term.category]} shadow-sm hover:shadow-lg transition-all`}
              >
                <h3 className="text-lg font-semibold text-gray-100 font-[var(--font-inter)] mb-2">{term.word}</h3>
                <p className="text-sm text-gray-400 line-clamp-2 font-[var(--font-inter)]">{term.description}</p>
                <FileText className="w-5 h-5 mt-2 text-gray-500" />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Additional Resources Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-purple-800/30 shadow-lg"
        >
          <h2 className="text-2xl font-semibold text-gray-100 font-[var(--font-inter)] mb-6">Legal Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-100 font-[var(--font-inter)] mb-2">Indian Kanoon</h3>
              <p className="text-sm text-gray-400 font-[var(--font-inter)] mb-4">
                Access Indian court judgments, statutes, and legal documents to support your case research.
              </p>
              <Link href="https://indiankanoon.org" target="_blank" className="text-indigo-400 text-sm flex items-center hover:text-indigo-300">
                Visit Indian Kanoon <ExternalLink className="w-4 h-4 ml-1" />
              </Link>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-100 font-[var(--font-inter)] mb-2">Consumer Protection Act</h3>
              <p className="text-sm text-gray-400 font-[var(--font-inter)] mb-4">
                Understand your rights under the Consumer Protection Act, 2019, for disputes like faulty services.
              </p>
              <Link href="https://indiankanoon.org/doc/123456/" target="_blank" className="text-indigo-400 text-sm flex items-center hover:text-indigo-300">
                Read the Act <ExternalLink className="w-4 h-4 ml-1" />
              </Link>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-100 font-[var(--font-inter)] mb-2">Legal Aid Services</h3>
              <p className="text-sm text-gray-400 font-[var(--font-inter)] mb-4">
                Discover free or low-cost legal aid services across India for case support.
              </p>
              <Link href="https://nalsa.gov.in" target="_blank" className="text-indigo-400 text-sm flex items-center hover:text-indigo-300">
                Explore Legal Aid <ExternalLink className="w-4 h-4 ml-1" />
              </Link>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-100 font-[var(--font-inter)] mb-2">San Sam</h3>
              <p className="text-sm text-gray-400 font-[var(--font-inter)] mb-4">
                Visit our partner site for advanced legal research tools and resources.
              </p>
              <Link href="https://harsh16bhardwaj.github.io/San_Sam/" target="_blank" className="text-indigo-400 text-sm flex items-center hover:text-indigo-300">
                Visit San Sam <ExternalLink className="w-4 h-4 ml-1" />
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Call to Action Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center"
        >
          <h2 className="text-2xl font-semibold text-gray-100 font-[var(--font-inter)] mb-4">
            Ready to Take Control?
          </h2>
          <p className="text-lg text-gray-400 font-[var(--font-inter)] mb-6 max-w-2xl mx-auto">
            Chat with our AI to apply these terms to your case or manage your legal tasks in the dashboard.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/chat">
              <motion.button
                whileHover={{ scale: 1.05, backgroundColor: '#6B21A8' }}
                whileTap={{ scale: 0.95 }}
                className="bg-purple-700 text-gray-100 font-[var(--font-inter)] px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition-all"
              >
                Chat Now
              </motion.button>
            </Link>
            <Link href="/dashboard">
              <motion.button
                whileHover={{ scale: 1.05, backgroundColor: '#4C1D95' }}
                whileTap={{ scale: 0.95 }}
                className="bg-indigo-700 text-gray-100 font-[var(--font-inter)] px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition-all"
              >
                View Dashboard
              </motion.button>
            </Link>
          </div>
        </motion.div>

        {/* Term Detail Modal */}
        <AnimatePresence>
          {selectedTerm && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-gray-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedTerm(null)}
            >
              <motion.div
                initial={{ scale: 0.95, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 20 }}
                className="bg-gray-900 rounded-2xl p-8 max-w-2xl w-full border border-purple-800/30 shadow-lg"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setSelectedTerm(null)}
                  className="absolute top-4 right-4 text-gray-400 hover:text-gray-100"
                >
                  <X size={24} />
                </button>
                <h3 className="text-2xl font-semibold text-gray-100 font-[var(--font-inter)] mb-4">
                  {selectedTerm.word}
                </h3>
                <p className="text-gray-300 mb-6 font-[var(--font-inter)]">{selectedTerm.description}</p>
                <div className="space-y-3">
                  <h4 className="text-lg font-semibold text-gray-100 font-[var(--font-inter)]">
                    Usage Examples
                  </h4>
                  {selectedTerm.usage.map((example, index) => (
                    <p key={index} className="text-sm text-gray-400 italic font-[var(--font-inter)]">
                      "{example}"
                    </p>
                  ))}
                </div>
                {selectedTerm.source && (
                  <Link href={selectedTerm.source} target="_blank" className="text-indigo-400 text-sm flex items-center mt-4 hover:text-indigo-300">
                    Learn more on Indian Kanoon <ExternalLink className="w-4 h-4 ml-1" />
                  </Link>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}