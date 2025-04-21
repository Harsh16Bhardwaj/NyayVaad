'use client';

import { SignInButton, SignUpButton } from "@clerk/nextjs";
import { X } from "lucide-react";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-neutral-800 p-8 rounded-xl max-w-md w-full mx-4 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          <X size={24} />
        </button>
        
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-white mb-2">Welcome to NyayVaad</h2>
          <p className="text-gray-400">Please sign in to continue</p>
        </div>

        <div className="space-y-4">
          <SignInButton mode="modal">
            <button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 px-4 rounded-lg transition-colors">
              Sign In
            </button>
          </SignInButton>
          
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-neutral-800 text-gray-400">or</span>
            </div>
          </div>

          <SignUpButton mode="modal">
            <button className="w-full border border-purple-600 text-purple-400 hover:bg-purple-600/10 font-medium py-3 px-4 rounded-lg transition-colors">
              Create Account
            </button>
          </SignUpButton>
        </div>
      </div>
    </div>
  );
} 