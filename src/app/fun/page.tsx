'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, X, ExternalLink, Sparkles } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import SanSam from '@/../public/san-sam.png'

interface LegalTerm {
  word: string;
  description: string;
  usage: string[];
  category: 'contract' | 'criminal' | 'civil' | 'constitutional' | 'corporate';
}

const legalTerms: LegalTerm[] = [
  {
    word: 'Estoppel',
    description: 'A legal principle that prevents someone from asserting something contrary to what is implied by their previous actions or statements.',
    usage: [
      'The tenant was prevented by estoppel from denying the validity of the lease.',
      'The court applied the doctrine of estoppel to stop the defendant from changing their story.'
    ],
    category: 'civil'
  },
  {
    word: 'Habeas Corpus',
    description: 'A legal action through which a person can seek relief from unlawful detention.',
    usage: [
      'The prisoner filed a writ of habeas corpus challenging his detention.',
      'The court granted the habeas corpus petition and ordered his release.'
    ],
    category: 'constitutional'
  },
  // Add more terms here...
];

const wordOfTheDay = {
  word: 'Force Majeure',
  description: 'An unforeseeable circumstance that prevents someone from fulfilling a contract.',
  usage: [
    'The company invoked the force majeure clause due to the natural disaster.',
    'The pandemic was considered a force majeure event in many contracts.',
    'The court upheld the force majeure defense in the breach of contract case.'
  ],
  category: 'contract'
};

export default function FunPage() {
  const [selectedTerm, setSelectedTerm] = useState<LegalTerm | null>(null);

  const categoryColors = {
    contract: 'from-blue-500 to-cyan-500',
    criminal: 'from-red-500 to-pink-500',
    civil: 'from-green-500 to-emerald-500',
    constitutional: 'from-purple-500 to-indigo-500',
    corporate: 'from-orange-500 to-yellow-500'
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Word of the Day Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-auto max-w-3xl mb-16"
        >
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-500/20 to-indigo-500/20 border border-purple-500/20 p-8">
            <motion.div
              className="absolute inset-0 opacity-30"
              animate={{
                background: [
                  'radial-gradient(circle at 0% 0%, purple 0%, transparent 50%)',
                  'radial-gradient(circle at 100% 100%, indigo 0%, transparent 50%)',
                  'radial-gradient(circle at 0% 100%, purple 0%, transparent 50%)',
                  'radial-gradient(circle at 100% 0%, indigo 0%, transparent 50%)',
                  'radial-gradient(circle at 0% 0%, purple 0%, transparent 50%)',
                ]
              }}
              transition={{ duration: 10, repeat: Infinity }}
            />
            <div className="relative">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-white font-[var(--font-josefin-sans)] flex items-center">
                  <Sparkles className="w-6 h-6 mr-2 text-purple-400" />
                  Word of the Day
                </h2>
                <span className="text-purple-400 text-sm font-[var(--font-poppins)]">
                  {new Date().toLocaleDateString()}
                </span>
              </div>
              <h3 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400 mb-4 font-[var(--font-josefin-sans)]">
                {wordOfTheDay.word}
              </h3>
              <p className="text-gray-300 mb-4 font-[var(--font-poppins)]">{wordOfTheDay.description}</p>
              <div className="space-y-2">
                {wordOfTheDay.usage.map((example, index) => (
                  <p key={index} className="text-sm text-gray-400 italic font-[var(--font-poppins)]">
                    "{example}"
                  </p>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Legal Terms Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-16">
          {legalTerms.map((term, index) => (
            <motion.div
              key={term.word}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => setSelectedTerm(term)}
              className={`cursor-pointer group relative overflow-hidden rounded-xl bg-gradient-to-br ${categoryColors[term.category]} bg-opacity-20 border border-white/10 p-6 hover:border-white/20 transition-all duration-300`}
            >
              <div className="absolute inset-0 bg-black opacity-40 transition-opacity group-hover:opacity-30" />
              <div className="relative">
                <h3 className="text-xl font-bold text-white mb-2 font-[var(--font-josefin-sans)]">{term.word}</h3>
                <p className="text-sm text-gray-300 line-clamp-2 font-[var(--font-poppins)]">{term.description}</p>
                <BookOpen className="absolute bottom-0 right-0 w-5 h-5 text-white/40 transform transition-transform group-hover:scale-110" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Website Plugin Section */}
        <Link href="https://harsh16bhardwaj.github.io/San_Sam/" target="_blank" rel="noopener noreferrer">
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="relative overflow-hidden rounded-2xl bg-gradient-to-br  from-gray-900 via-teal-700 to-gray-800 border border-blue-500/20 p-8 group cursor-pointer"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-gray-800 via-gray-600 to-gray-800 opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
            <div className="relative flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-white mb-2 font-[var(--font-josefin-sans)]">
                  Discover More Legal Resources
                </h2>
                <p className="text-gray-300 font-[var(--font-poppins)]">
                  Visit our companion site for comprehensive legal research tools and resources
                </p>
                <Image src={SanSam} alt="Nyayvaad" className=' rounded-2xl mt-10 ' />
              </div>
              <ExternalLink className="w-8 h-8 text-white/60 transform transition-transform group-hover:scale-110 group-hover:text-white" />
            </div>
          </motion.div>
        </Link>

        {/* Term Detail Modal */}
        <AnimatePresence>
          {selectedTerm && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedTerm(null)}
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className="relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 max-w-2xl w-full border border-white/10"
                onClick={e => e.stopPropagation()}
              >
                <button
                  onClick={() => setSelectedTerm(null)}
                  className="absolute top-4 right-4 text-gray-400 hover:text-white"
                >
                  <X size={24} />
                </button>
                <h3 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400 mb-4 font-[var(--font-josefin-sans)]">
                  {selectedTerm.word}
                </h3>
                <p className="text-gray-300 mb-6 font-[var(--font-poppins)]">{selectedTerm.description}</p>
                <div className="space-y-3">
                  <h4 className="text-lg font-semibold text-white mb-2 font-[var(--font-josefin-sans)]">Usage Examples:</h4>
                  {selectedTerm.usage.map((example, index) => (
                    <p key={index} className="text-gray-400 italic font-[var(--font-poppins)]">"{example}"</p>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
} 