"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, Users, Calendar, FileCheck, Handshake, Save, X, Edit3, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";

interface CaseContextFormProps {
  sessionId: string;
  onSave?: () => void;
}

interface CaseContextData {
  description: string;
  opponent: string;
  timeline: string;
  evidence: boolean;
  agreement: boolean;
}

export default function CaseContextForm({ sessionId, onSave }: CaseContextFormProps) {
  const [formData, setFormData] = useState<CaseContextData>({
    description: "",
    opponent: "",
    timeline: "",
    evidence: false,
    agreement: false,
  });

  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [hasExistingData, setHasExistingData] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);

  // Fetch existing case context on mount
  useEffect(() => {
    fetchCaseContext();
  }, [sessionId]);

  const fetchCaseContext = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/case-context?sessionId=${sessionId}`);
      
      if (response.ok) {
        const data = await response.json();
        if (data.case) {
          setFormData({
            description: data.case.description || "",
            opponent: data.case.opponent || "",
            timeline: Array.isArray(data.case.timeline) ? data.case.timeline.join("\n") : "",
            evidence: data.case.evidence || false,
            agreement: data.case.agreement || false,
          });
          setHasExistingData(true);
          setIsExpanded(false); // Collapse if data exists
        }
      }
    } catch (error) {
      console.error("Error fetching case context:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.description.trim()) {
      toast.error("Case description is required", {
        position: "bottom-left",
        duration: 3000,
      });
      return;
    }

    setIsSaving(true);

    try {
      const timelineArray = formData.timeline
        .split("\n")
        .map(item => item.trim())
        .filter(item => item.length > 0);

      // Use PATCH if updating existing case, POST if creating new
      const method = hasExistingData && isEditing ? "PATCH" : "POST";
      
      const response = await fetch("/api/case-context", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId,
          description: formData.description,
          opponent: formData.opponent,
          timeline: timelineArray,
          evidence: formData.evidence,
          agreement: formData.agreement,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        toast.success(hasExistingData ? "Case context updated!" : "Case context saved!", {
          position: "bottom-left",
          duration: 3000,
          icon: "✓",
        });
        setHasExistingData(true);
        setIsEditing(false);
        setIsExpanded(false);
        onSave?.();
      } else {
        const error = await response.json();
        toast.error(error.error || "Failed to save case context", {
          position: "bottom-left",
          duration: 4000,
        });
      }
    } catch (error) {
      console.error("Error saving case context:", error);
      toast.error("An unexpected error occurred", {
        position: "bottom-left",
        duration: 4000,
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
    setIsExpanded(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    if (hasExistingData) {
      fetchCaseContext(); // Reset to saved data
    }
  };

  if (isLoading) {
    return (
      <div className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-sm border border-white/10 rounded-xl p-6">
        <div className="animate-pulse flex space-x-4">
          <div className="flex-1 space-y-4 py-1">
            <div className="h-4 bg-gray-700 rounded w-3/4"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-700 rounded"></div>
              <div className="h-4 bg-gray-700 rounded w-5/6"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const isFormDisabled = hasExistingData && !isEditing;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-sm border border-white/10 rounded-xl shadow-2xl overflow-hidden"
    >
      {/* Header */}
      <div 
        className="flex items-center justify-between p-4 border-b border-white/10 cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-3">
          <FileText className="w-5 h-5 text-purple-400" />
          <h2 className="text-lg font-semibold text-white">
            Case Context {hasExistingData && !isEditing && "(Saved)"}
          </h2>
        </div>
        <div className="flex items-center gap-2">
          {hasExistingData && !isEditing && (
            <Button
              size="sm"
              variant="outline"
              onClick={(e) => {
                e.stopPropagation();
                handleEdit();
              }}
              className="bg-transparent border-purple-500/30 text-purple-400 hover:bg-purple-500/10"
            >
              <Edit3 className="w-4 h-4 mr-1" />
              Edit
            </Button>
          )}
          {isExpanded ? (
            <ChevronUp className="w-5 h-5 text-gray-400" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-400" />
          )}
        </div>
      </div>

      {/* Form Content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.form
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            onSubmit={handleSubmit}
            className="p-6 space-y-4"
          >
            {/* Description */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
                <FileText className="w-4 h-4 text-purple-400" />
                Case Description *
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Describe your legal case in detail. Include what happened, when, and any relevant circumstances..."
                disabled={isFormDisabled}
                required
                rows={4}
                className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:border-purple-500/50 focus:outline-none focus:ring-2 focus:ring-purple-500/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              />
            </div>

            {/* Opponent */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
                <Users className="w-4 h-4 text-purple-400" />
                Opposing Party
              </label>
              <input
                type="text"
                value={formData.opponent}
                onChange={(e) => setFormData({ ...formData, opponent: e.target.value })}
                placeholder="Name of the opposing party or organization (if applicable)"
                disabled={isFormDisabled}
                className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:border-purple-500/50 focus:outline-none focus:ring-2 focus:ring-purple-500/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              />
            </div>

            {/* Timeline */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
                <Calendar className="w-4 h-4 text-purple-400" />
                Timeline of Events
              </label>
              <textarea
                value={formData.timeline}
                onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                placeholder="Enter key dates and events (one per line)&#10;Example:&#10;2023-01-15: Contract was signed&#10;2023-03-20: First payment was due&#10;2023-05-10: Dispute arose"
                disabled={isFormDisabled}
                rows={5}
                className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:border-purple-500/50 focus:outline-none focus:ring-2 focus:ring-purple-500/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-mono text-sm"
              />
            </div>

            {/* Evidence & Agreement Checkboxes */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-4 bg-black/40 border border-white/10 rounded-lg">
                <input
                  type="checkbox"
                  id="evidence"
                  checked={formData.evidence}
                  onChange={(e) => setFormData({ ...formData, evidence: e.target.checked })}
                  disabled={isFormDisabled}
                  className="w-5 h-5 rounded border-white/20 bg-black/40 text-purple-500 focus:ring-2 focus:ring-purple-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
                />
                <label htmlFor="evidence" className="flex items-center gap-2 text-sm text-gray-300 cursor-pointer">
                  <FileCheck className="w-4 h-4 text-purple-400" />
                  I have documented evidence (contracts, emails, photos, etc.)
                </label>
              </div>

              <div className="flex items-center gap-3 p-4 bg-black/40 border border-white/10 rounded-lg">
                <input
                  type="checkbox"
                  id="agreement"
                  checked={formData.agreement}
                  onChange={(e) => setFormData({ ...formData, agreement: e.target.checked })}
                  disabled={isFormDisabled}
                  className="w-5 h-5 rounded border-white/20 bg-black/40 text-purple-500 focus:ring-2 focus:ring-purple-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
                />
                <label htmlFor="agreement" className="flex items-center gap-2 text-sm text-gray-300 cursor-pointer">
                  <Handshake className="w-4 h-4 text-purple-400" />
                  Written or verbal settlement/agreement exists
                </label>
              </div>
            </div>

            {/* Action Buttons */}
            {(!hasExistingData || isEditing) && (
              <div className="flex gap-3 pt-4">
                <Button
                  type="submit"
                  disabled={isSaving}
                  className="flex-1 bg-gradient-to-r from-purple-600 to-teal-500 hover:from-purple-700 hover:to-teal-600 text-white font-medium py-3 rounded-lg transition-all duration-300 shadow-lg hover:shadow-purple-500/50"
                >
                  {isSaving ? (
                    <span className="flex items-center gap-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      Saving...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Save className="w-4 h-4" />
                      {hasExistingData ? "Update Context" : "Save Context"}
                    </span>
                  )}
                </Button>
                
                {hasExistingData && isEditing && (
                  <Button
                    type="button"
                    onClick={handleCancel}
                    variant="outline"
                    className="px-6 bg-transparent border-gray-500/30 text-gray-400 hover:bg-gray-500/10"
                  >
                    <X className="w-4 h-4 mr-1" />
                    Cancel
                  </Button>
                )}
              </div>
            )}
          </motion.form>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
