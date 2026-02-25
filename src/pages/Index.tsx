import { HomeHeader } from '@/components/home/HomeHeader';
import { HeroSection } from '@/components/new-home/HeroSection';
import { RecognitionSection } from '@/components/new-home/RecognitionSection';
import { OrganizationalProblemSection } from '@/components/new-home/OrganizationalProblemSection';
import { WhatIsJuripassSection } from '@/components/new-home/WhatIsJuripassSection';
import { HowItWorksSection } from '@/components/new-home/HowItWorksSection';
import { ImpactSection } from '@/components/new-home/ImpactSection';
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
      </main>
      <Footer />
    </div>
  );
};

export default Index;
