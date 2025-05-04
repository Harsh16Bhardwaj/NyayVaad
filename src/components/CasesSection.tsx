import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Briefcase, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Link from 'next/link';
import { CaseStatus } from '@/generated/prisma';

interface Case {
  id: string;
  title: string;
  description: string;
  status: CaseStatus;
  opponent: string | null;
  createdAt: Date;
}

interface CasesSectionProps {
  cases: Case[];
  loading: boolean;
}

export default function CasesSection({ cases, loading }: CasesSectionProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<CaseStatus | 'ALL'>('ALL');

  const filteredCases = cases.filter(case_ => {
    const matchesSearch = case_.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         case_.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (case_.opponent?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false);
    
    const matchesStatus = statusFilter === 'ALL' || case_.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="w-8 h-8 text-purple-400 animate-spin" />
      </div>
    );
  }

  if (cases.length === 0) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-white/5 min-h-[250px] flex flex-col items-center justify-center text-center relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent" />
        <div className="relative z-10">
          <div className="w-16 h-16 bg-purple-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Briefcase className="w-8 h-8 text-purple-400" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-3">No Cases Yet</h3>
          <p className="text-gray-400 mb-6 max-w-md mx-auto">Start a conversation to create your first case and get legal assistance!</p>
          <Button
            variant="outline"
            className="bg-transparent border-purple-500/30 text-purple-400 hover:bg-purple-500/10 hover:text-purple-300 transition-all duration-300 group"
            onClick={() => window.location.href = '/chat'}
          >
            <Briefcase className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform duration-300" />
            Start New Case
          </Button>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            type="text"
            placeholder="Search cases..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-gray-900/50 border-gray-700/50 text-white placeholder-gray-400"
          />
        </div>
        <Select value={statusFilter} onValueChange={(value: CaseStatus | 'ALL') => setStatusFilter(value)}>
          <SelectTrigger className="w-[180px] bg-gray-900/50 border-gray-700/50 text-white">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">All Cases</SelectItem>
            <SelectItem value={CaseStatus.OPEN}>Open</SelectItem>
            <SelectItem value={CaseStatus.IN_PROGRESS}>In Progress</SelectItem>
            <SelectItem value={CaseStatus.CLOSED}>Closed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {filteredCases.map((case_) => (
          <Link href={`/dashboard/case/${case_.id}`} key={case_.id}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.02 }}
              className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-white/5 hover:border-purple-500/30 transition-all duration-300 cursor-pointer"
            >
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">{case_.title}</h3>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  case_.status === CaseStatus.OPEN || case_.status === CaseStatus.IN_PROGRESS
                    ? 'bg-green-500/20 text-green-400' 
                    : 'bg-gray-500/20 text-gray-400'
                }`}>
                  {case_.status}
                </span>
              </div>
              <p className="text-gray-400 text-sm mb-4 line-clamp-2">{case_.description}</p>
              {case_.opponent && (
                <div className="text-sm text-gray-500">
                  <span className="font-medium">Opponent:</span> {case_.opponent}
                </div>
              )}
              <div className="text-xs text-gray-500 mt-4">
                Created: {new Date(case_.createdAt).toLocaleDateString()}
              </div>
            </motion.div>
          </Link>
        ))}
      </div>
    </div>
  );
} 