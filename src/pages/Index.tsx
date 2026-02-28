import { lazy, Suspense } from 'react';
import { HeroSection } from '@/components/new-home/HeroSection';
import { RecognitionSection } from '@/components/new-home/RecognitionSection';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { SEOHead, organizationJsonLd, websiteJsonLd } from '@/components/ui/SEOHead';

const OrganizationalProblemSection = lazy(() => import('@/components/new-home/OrganizationalProblemSection').then(m => ({ default: m.OrganizationalProblemSection })));
const WhatIsJuripassSection = lazy(() => import('@/components/new-home/WhatIsJuripassSection').then(m => ({ default: m.WhatIsJuripassSection })));
const HowItWorksSection = lazy(() => import('@/components/new-home/HowItWorksSection').then(m => ({ default: m.HowItWorksSection })));
const ImpactSection = lazy(() => import('@/components/new-home/ImpactSection').then(m => ({ default: m.ImpactSection })));
const MidCTASection = lazy(() => import('@/components/new-home/MidCTASection').then(m => ({ default: m.MidCTASection })));
const SegmentationSection = lazy(() => import('@/components/new-home/SegmentationSection').then(m => ({ default: m.SegmentationSection })));
const HomeFAQSection = lazy(() => import('@/components/new-home/HomeFAQSection').then(m => ({ default: m.HomeFAQSection })));
const BlogHighlightSection = lazy(() => import('@/components/new-home/BlogHighlightSection').then(m => ({ default: m.BlogHighlightSection })));
const FinalCTASection = lazy(() => import('@/components/new-home/FinalCTASection').then(m => ({ default: m.FinalCTASection })));

const Index = () => {
  return (
    <>
      <SEOHead
        title="Juripass — Programa de Acolhimento Jurídico para Empresas | Gestão de RH"
        description="Canal externo e confidencial para acolher colaboradores em questões pessoais sensíveis. Ferramenta de gestão de RH alinhada à Nova NR-01 para prevenção de riscos psicossociais."
        jsonLd={[organizationJsonLd, websiteJsonLd]}
      />
      <HeroSection />
      <ScrollReveal>
        <RecognitionSection />
      </ScrollReveal>
      <Suspense fallback={null}>
        <ScrollReveal>
          <OrganizationalProblemSection />
        </ScrollReveal>
        <ScrollReveal>
          <WhatIsJuripassSection />
        </ScrollReveal>
        <ScrollReveal>
          <HowItWorksSection />
        </ScrollReveal>
        <ScrollReveal>
          <ImpactSection />
        </ScrollReveal>
        <ScrollReveal>
          <MidCTASection />
        </ScrollReveal>
        <ScrollReveal>
          <SegmentationSection />
        </ScrollReveal>
        <ScrollReveal>
          <HomeFAQSection />
        </ScrollReveal>
        <ScrollReveal>
          <FinalCTASection />
        </ScrollReveal>
      </Suspense>
    </>
  );
};

export default Index;
