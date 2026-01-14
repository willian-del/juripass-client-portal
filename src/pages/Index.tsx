import { HomeHeader } from '@/components/home/HomeHeader';
import { HeroSection } from '@/components/home/HeroSection';
import { ProblemSection } from '@/components/home/ProblemSection';
import { SolutionSection } from '@/components/home/SolutionSection';
import { BenefitsSection } from '@/components/home/BenefitsSection';
import { EmployeeBenefitsSection } from '@/components/home/EmployeeBenefitsSection';
import { CoverageSection } from '@/components/home/CoverageSection';
import { TestimonialsSection } from '@/components/home/TestimonialsSection';
import { BlogSection } from '@/components/home/BlogSection';
import { CTASection } from '@/components/home/CTASection';
import { Footer } from '@/components/ui/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <HomeHeader />
      <HeroSection />
      <ProblemSection />
      <SolutionSection />
      <BenefitsSection />
      <EmployeeBenefitsSection />
      <CoverageSection />
      <TestimonialsSection />
      <BlogSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;
