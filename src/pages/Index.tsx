import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { HomeHeader } from '@/components/home/HomeHeader';
import { HeroSection } from '@/components/home/HeroSection';
import { ProblemSection } from '@/components/home/ProblemSection';
import { SolutionSection } from '@/components/home/SolutionSection';
import { BenefitsSection } from '@/components/home/BenefitsSection';
import { CoverageSection } from '@/components/home/CoverageSection';

import { TestimonialsSection } from '@/components/home/TestimonialsSection';
import { BlogSection } from '@/components/home/BlogSection';
import { CTASection } from '@/components/home/CTASection';
import { LoginModal } from '@/components/home/LoginModal';
import { Footer } from '@/components/ui/Footer';

const Index = () => {
  const navigate = useNavigate();
  const { user, isLoading } = useAuth();
  const [loginModalOpen, setLoginModalOpen] = useState(false);

  useEffect(() => {
    if (!isLoading && user) {
      navigate('/dashboard');
    }
  }, [user, isLoading, navigate]);

  // Show loading state while checking auth
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-primary">
        <div className="flex flex-col items-center gap-6 animate-fade-in">
          <div className="flex items-center gap-3">
            <div className="h-2 w-2 bg-white rounded-full animate-bounce [animation-delay:-0.3s]" />
            <div className="h-2 w-2 bg-white rounded-full animate-bounce [animation-delay:-0.15s]" />
            <div className="h-2 w-2 bg-white rounded-full animate-bounce" />
          </div>
        </div>
      </div>
    );
  }

  // If user is not logged in, show the institutional homepage
  return (
    <div className="min-h-screen bg-background">
      <HomeHeader onLoginClick={() => setLoginModalOpen(true)} />
      <HeroSection />
      <ProblemSection />
      <SolutionSection />
      <BenefitsSection />
      <CoverageSection />
      
      <TestimonialsSection />
      <BlogSection />
      <CTASection />
      <Footer />
      <LoginModal open={loginModalOpen} onOpenChange={setLoginModalOpen} />
    </div>
  );
};

export default Index;
