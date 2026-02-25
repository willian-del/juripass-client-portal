import { HomeHeader } from '@/components/home/HomeHeader';
import { HeroSection } from '@/components/new-home/HeroSection';
import { RecognitionSection } from '@/components/new-home/RecognitionSection';
import { OrganizationalProblemSection } from '@/components/new-home/OrganizationalProblemSection';
import { WhatIsJuripassSection } from '@/components/new-home/WhatIsJuripassSection';
import { HowItWorksSection } from '@/components/new-home/HowItWorksSection';
import { ImpactSection } from '@/components/new-home/ImpactSection';
import { MidCTASection } from '@/components/new-home/MidCTASection';
import { SegmentationSection } from '@/components/new-home/SegmentationSection';
import { HomeFAQSection } from '@/components/new-home/HomeFAQSection';
import { FinalCTASection } from '@/components/new-home/FinalCTASection';
import { Footer } from '@/components/ui/Footer';
const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <HomeHeader />
      <main>
        <HeroSection />
        <RecognitionSection />
        <OrganizationalProblemSection />
        <WhatIsJuripassSection />
        <HowItWorksSection />
        <ImpactSection />
        <MidCTASection />
        <SegmentationSection />
        <HomeFAQSection />
        <FinalCTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
