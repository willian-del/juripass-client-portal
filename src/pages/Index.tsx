import { lazy, Suspense } from 'react';
import { HeroSection } from '@/components/new-home/HeroSection';
import { RecognitionSection } from '@/components/new-home/RecognitionSection';

const OrganizationalProblemSection = lazy(() => import('@/components/new-home/OrganizationalProblemSection').then(m => ({ default: m.OrganizationalProblemSection })));
const WhatIsJuripassSection = lazy(() => import('@/components/new-home/WhatIsJuripassSection').then(m => ({ default: m.WhatIsJuripassSection })));
const HowItWorksSection = lazy(() => import('@/components/new-home/HowItWorksSection').then(m => ({ default: m.HowItWorksSection })));
const ImpactSection = lazy(() => import('@/components/new-home/ImpactSection').then(m => ({ default: m.ImpactSection })));
const MidCTASection = lazy(() => import('@/components/new-home/MidCTASection').then(m => ({ default: m.MidCTASection })));
const SegmentationSection = lazy(() => import('@/components/new-home/SegmentationSection').then(m => ({ default: m.SegmentationSection })));
const HomeFAQSection = lazy(() => import('@/components/new-home/HomeFAQSection').then(m => ({ default: m.HomeFAQSection })));
const FinalCTASection = lazy(() => import('@/components/new-home/FinalCTASection').then(m => ({ default: m.FinalCTASection })));

const Index = () => {
  return (
    <>
      <HeroSection />
      <RecognitionSection />
      <Suspense fallback={null}>
        <OrganizationalProblemSection />
        <WhatIsJuripassSection />
        <HowItWorksSection />
        <ImpactSection />
        <MidCTASection />
        <SegmentationSection />
        <HomeFAQSection />
        <FinalCTASection />
      </Suspense>
    </>
  );
};

export default Index;
