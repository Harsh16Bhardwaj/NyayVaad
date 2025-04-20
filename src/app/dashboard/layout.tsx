import { ReactNode } from 'react';
import { inter, playfair, spaceGrotesk } from '../fonts';

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className={`${inter.variable} ${playfair.variable} ${spaceGrotesk.variable} min-h-screen bg-gray-950`}>
      <div className="fixed top-0 left-0 right-0 h-16 bg-gray-900/80 backdrop-blur-sm border-b border-gray-800 z-50">
        <div className="max-w-7xl mx-auto px-8 h-full flex items-center justify-between">
          <h1 className="text-xl font-bold text-white font-[var(--font-playfair)]">NyaayVaad</h1>
          <div className="flex items-center space-x-4">
            <button className="text-gray-400 hover:text-white transition-colors">
              Profile
            </button>
            <button className="text-gray-400 hover:text-white transition-colors">
              Settings
            </button>
          </div>
        </div>
      </div>
      <div className="pt-16">
        {children}
      </div>
      <footer className="bg-gray-900/80 backdrop-blur-sm border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-8 py-4">
          <p className="text-sm text-gray-400 text-center">
            © 2024 NyaayVaad. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
} 