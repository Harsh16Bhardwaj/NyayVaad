'use client';
import { useUser } from '@clerk/nextjs';
import { supabase } from '@/lib/supabase';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Sparkles, Home } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import Scale from '@/../public/scale.jpg';
export default function OnboardingPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    language: 'English',
    profession: 'Cannot Disclose',
    legalKnowledge: 'NONE',
    involvements: [] as string[],
    jailTimeYears: 0,
    warningSeverity: 'Low',
    pendingCaseType: 'None',
    fines: '',
  });
  const [step, setStep] = useState(1);
  const [error, setError] = useState('');

  useEffect(() => {
    const userSync = async () => {
      const { isSignedIn, user } = useUser();
  
      if (isSignedIn && user?.id) {
        const { data, error } = await supabase
          .from('users')
          .select('*')
          .eq('id', user.id)
          .single();
  
        if (data) {
          alert("USER FOUND");
        } else if (!data && !error) {
          const { error: insertError } = await supabase.from('users').insert([
            {
              id: user.id,
              email: user.emailAddresses[0]?.emailAddress,
            }
          ]);
  
          if (insertError) {
            console.error("Error inserting user:", insertError);
          } else {
            alert("USER CREATED");
          }
        } else {
          console.error("Error fetching user:", error);
        }
      }
    };
  
    userSync();
  }, []);
  
  const handleSubmit = async () => {
    if (!formData.language || !formData.profession || !formData.legalKnowledge) {
      setError('Please fill all required fields');
      return;
    }

    try {
      const res = await fetch('/api/onboarding', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        router.push('/dashboard');
      } else {
        setError('Failed to save preferences');
      }
    } catch {
      setError('An error occurred');
    }
  };

  const nextStep = () => {
    if (step === 1 && !formData.language) return setError('Please select a language');
    if (step === 2 && !formData.name) return setError('Please enter your name');
    if (step === 3 && !formData.profession) return setError('Please select a profession');
    if (step === 4 && !formData.legalKnowledge) return setError('Please select legal knowledge');
    setError('');
    setStep(step + 1);
  };

  const prevStep = () => {
    setError('');
    setStep(step - 1);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold text-gray-100">Start Your Legal Journey</h3>
              <h4 className="text-xl font-semibold text-teal-300 mt-1">Preferred Language</h4>
              <p className="text-gray-400 text-base mt-1">Select your preferred language for personalized communication and legal assistance.</p>
            </div>
            <Select
              value={formData.language}
              onValueChange={(value) => setFormData({ ...formData, language: value })}
            >
              <SelectTrigger className="bg-gray-900 text-gray-100 border-purple-800 text-lg hover:shadow-[0_0_10px_rgba(139,92,246,0.5)] transition-shadow">
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent className="bg-gray-900 text-gray-100 border-purple-800">
                {['English', 'Hindi', 'Tamil', 'Telugu', 'Bengali', 'Marathi', 'Gujarati', 'Kannada', 'Malayalam', 'Punjabi', 'Assamese'].map((lang) => (
                  <SelectItem key={lang} value={lang} className="text-base">{lang}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold text-gray-100">Getting to Know You</h3>
              <h4 className="text-xl font-semibold text-teal-300 mt-1">What should we call you?</h4>
              <p className="text-gray-400 text-base mt-1">We'd love to address you by your preferred name.</p>
            </div>
            <Input
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Enter your name"
              className="bg-gray-900 text-gray-100 border-purple-800 text-lg hover:shadow-[0_0_10px_rgba(139,92,246,0.5)] transition-shadow"
            />
          </div>
        );
      case 3:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold text-gray-100">Tell Us About You</h3>
              <h4 className="text-xl font-semibold text-teal-300 mt-1">Profession</h4>
              <p className="text-gray-400 text-base mt-1">Your profession helps us tailor legal advice to your unique needs.</p>
            </div>
            <Select
              value={formData.profession}
              onValueChange={(value) => setFormData({ ...formData, profession: value })}
            >
              <SelectTrigger className="bg-gray-900 text-gray-100 border-purple-800 text-lg hover:shadow-[0_0_10px_rgba(139,92,246,0.5)] transition-shadow">
                <SelectValue placeholder="Select profession" />
              </SelectTrigger>
              <SelectContent className="bg-gray-900 text-gray-100 border-purple-800">
                {['Cannot Disclose', 'Teacher', 'Doctor', 'Engineer', 'Shopkeeper', 'Farmer', 'Student', 'Homemaker', 'Business Owner', 'Government Employee'].map((job) => (
                  <SelectItem key={job} value={job} className="text-base">{job}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        );
      case 4:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold text-gray-100">Your Legal Expertise</h3>
              <h4 className="text-xl font-semibold text-teal-300 mt-1">Legal Knowledge</h4>
              <p className="text-gray-400 text-base mt-1">Share your familiarity with legal matters to customize your experience.</p>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {['NONE', 'BASIC', 'INTERMEDIATE', 'LAWYER'].map((level) => (
                <button
                  key={level}
                  onClick={() => setFormData({ ...formData, legalKnowledge: level })}
                  className={`px-3 py-2 text-base text-gray-200 rounded-lg border ${formData.legalKnowledge === level ? 'bg-gradient-to-br from-teal-950 via-gray-700 to-gray-950 border-purple-600' : 'bg-gray-900 border-purple-800'} hover:shadow-[0_0_10px_rgba(139,92,246,0.5)] transition-shadow`}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>
        );
      case 5:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold text-gray-100">Your Legal History</h3>
              <h4 className="text-xl font-semibold text-teal-300 mt-1">Prior Legal Involvements</h4>
              <p className="text-gray-400 text-base mt-1">Help us understand any past legal interactions to better assist you.</p>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {['Jail Time', 'Police Warning', 'Pending Case', 'Fines'].map((item) => (
                <div key={item} className="flex items-center space-x-2">
                  <Checkbox
                    checked={formData.involvements.includes(item)}
                    onCheckedChange={(checked) => {
                      const involvements = checked
                        ? [...formData.involvements, item]
                        : formData.involvements.filter((i) => i !== item);
                      setFormData({ ...formData, involvements });
                    }}
                    className="border-purple-800"
                  />
                  <label className="text-gray-100 text-base">{item}</label>
                </div>
              ))}
            </div>
            {formData.involvements.includes('Jail Time') && (
              <div className="space-y-3">
                <label className="text-gray-100 text-base">Jail Time (Years)</label>
                <Slider
                  value={[formData.jailTimeYears]}
                  onValueChange={([value]) => setFormData({ ...formData, jailTimeYears: value })}
                  min={1}
                  max={50}
                  step={1}
                  className="w-full text-purple-600"
                />
                <p className="text-gray-400 text-sm">{formData.jailTimeYears} years</p>
              </div>
            )}
            {formData.involvements.includes('Police Warning') && (
              <div className="space-y-3">
                <label className="text-gray-100 text-base">Warning Severity</label>
                <Select
                  value={formData.warningSeverity}
                  onValueChange={(value) => setFormData({ ...formData, warningSeverity: value })}
                >
                  <SelectTrigger className="bg-gray-900 text-gray-100 border-purple-800 text-lg hover:shadow-[0_0_10px_rgba(139,92,246,0.5)] transition-shadow">
                    <SelectValue placeholder="Select severity" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-900 text-gray-100 border-purple-800">
                    {['Low', 'Moderate', 'High'].map((severity) => (
                      <SelectItem key={severity} value={severity} className="text-base">{severity}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
            {formData.involvements.includes('Pending Case') && (
              <div className="space-y-3">
                <label className="text-gray-100 text-base">Case Type</label>
                <Select
                  value={formData.pendingCaseType}
                  onValueChange={(value) => setFormData({ ...formData, pendingCaseType: value })}
                >
                  <SelectTrigger className="bg-gray-900 text-gray-100 border-purple-800 text-lg hover:shadow-[0_0_10px_rgba(139,92,246,0.5)] transition-shadow">
                    <SelectValue placeholder="Select case type" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-900 text-gray-100 border-purple-800">
                    {['None', 'Civil', 'Criminal'].map((type) => (
                      <SelectItem key={type} value={type} className="text-base">{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
            {formData.involvements.includes('Fines') && (
              <div className="space-y-3">
                <label className="text-gray-100 text-base">Fine Amount (e.g., 5000 INR)</label>
                <Input
                  value={formData.fines}
                  onChange={(e) => setFormData({ ...formData, fines: e.target.value })}
                  placeholder="Enter fine amount"
                  className="bg-gray-900 text-gray-100 border-purple-800 text-lg hover:shadow-[0_0_10px_rgba(139,92,246,0.5)] transition-shadow"
                />
              </div>
            )}
          </div>
        );
      case 6:
        return (
          <div className="space-y-6 text-center">
            <h3 className="text-2xl font-bold text-gray-100">Ready to Begin!</h3>
            <p className="text-gray-400 text-base">Your preferences are set. Dive into NyayVaad and let's tackle your legal needs!</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-gradient-to-r to-gray-950/50 from-gray-900/50 overflow-hidden z-50">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={Scale}
          alt="Legal Scale"
          fill
          className="object-cover"
          style={{ transform: 'scaleX(-1)' }}
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/10 to-gray-950/70 backdrop-blur-sm" />
      </div>

      {/* Starfield Background */}
      <canvas className="absolute inset-0 z-0" id="starfield"></canvas>

      {/* Header */}
      <header className="fixed top-0 left-0 w-full bg-gray-950/50 backdrop-blur-sm py-4 z-20">
        <div className="max-w-7xl mx-auto px-8 flex items-center justify-between">
          <Link href="/" className="flex items-center text-gray-100 hover:text-purple-400 transition-colors">
            <Home className="w-6 h-6 mr-2" />
            <span className="text-lg font-medium">Home</span>
          </Link>
          <h1 className="text-3xl font-bold text-gray-100 glow flex items-center">
            <Sparkles className="w-6 h-6 mr-2 text-purple-400" />
            NyayVaad
            <Sparkles className="w-6 h-6 ml-2 text-purple-400" />
          </h1>
          <div className="w-24"></div> {/* Spacer for flex justify-between */}
        </div>
      </header>

      {/* Main Content */}
      <div className="flex h-full pt-16">
        {/* Form Container */}
        <div className="w-full max-w-2xl mx-auto flex items-center justify-center px-8 py-12">
          {/* Back Button */}
          <Link 
              href="/" 
              className="absolute mt-32 ml-60 cursor-pointer hover:bg-red-500 px-3 hover:text-white rounded-md py-1.5 top-4 left-4 flex items-center text-gray-300 hover:text-purple-400 transition-colors"
            >
              <ArrowLeft className="w-5 h-5  mr-1" />
              <span className="text-sm font-medium ">Back to Home</span>
            </Link>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full bg-gradient-to-br from-gray-900/60 via-gray-800/60 to-gray-900/60 backdrop-blur-md rounded-2xl p-8 border border-gray-700/50 shadow-[0_0_20px_rgba(139,92,246,0.3)] z-10"
          >
            

            {/* Progress Bar */}
            <div className="mb-6">
              <div className="flex justify-between mb-2">
                {Array.from({ length: 6 }, (_, i) => (
                  <motion.div
                    key={i}
                    className={`w-1/6 h-2 rounded-full ${i + 1 <= step ? 'bg-gradient-to-r from-teal-600 to-indigo-600' : 'bg-gray-700'}`}
                    initial={{ scale: 0.8 }}
                    animate={{ scale: i + 1 <= step ? 1 : 0.8 }}
                    transition={{ duration: 0.3 }}
                  />
                ))}
              </div>
              <p className="text-gray-400 text-base text-center">Step {step} of 6</p>
            </div>

            {/* Form Content */}
            {error && <p className="text-red-400 mb-4 text-center text-base">{error}</p>}
            <div className="bg-gray-900/30 backdrop-blur-sm rounded-xl p-6 border border-gray-700/30">
              {renderStep()}
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              {step > 1 && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={prevStep}
                  className="bg-gradient-to-bl border cursor-pointer flex border-transparent from-[#0F2027] hover:border hover:border-teal-200 duration-150 ease-in-out via-[#203A43] font-medium to-[#2C5364] text-gray-100 px-6 py-3 rounded-lg shadow-md hover:shadow-[0_0_15px_rgba(139,92,246,0.5)] text-base"
                >
                  <ArrowLeft className="w-5 h-5 mr-1" />
                  Back
                </motion.button>
              )}
              {step < 6 ? (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={nextStep}
                  className="bg-gradient-to-bl border border-transparent cursor-pointer from-[#0F2027] hover:border hover:border-teal-200 duration-150 ease-in-out via-[#203A43] font-medium to-[#2C5364] text-gray-100 px-6 py-3 rounded-lg shadow-md hover:shadow-[0_0_15px_rgba(139,92,246,0.5)] text-base"
                >
                  Next
                </motion.button>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSubmit}
                  className="bg-gradient-to-r from-teal-950 cursor-pointer via-gray-700 to-gray-950 text-gray-100 px-6 py-3 rounded-lg shadow-md hover:shadow-[0_0_15px_rgba(139,92,246,0.5)] text-base"
                >
                  Submit
                </motion.button>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Starfield Script */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
          const canvas = document.getElementById('starfield');
          const ctx = canvas.getContext('2d');
          canvas.width = window.innerWidth;
          canvas.height = window.innerHeight;
          const stars = [];
          for (let i = 0; i < 150; i++) {
            stars.push({
              x: Math.random() * canvas.width,
              y: Math.random() * canvas.height,
              radius: Math.random() * 1.5,
              opacity: Math.random() * 0.5 + 0.3,
            });
          }
          function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            stars.forEach(star => {
              ctx.beginPath();
              ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
              ctx.fillStyle = \`rgba(255, 255, 255, \${star.opacity})\`;
              ctx.fill();
            });
            requestAnimationFrame(animate);
          }
          animate();
        `,
        }}
      />
    </div>
  );
}