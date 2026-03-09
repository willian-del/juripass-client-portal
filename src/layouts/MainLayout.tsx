import { Outlet, useLocation } from 'react-router-dom';
import { useEffect, lazy, Suspense } from 'react';
import { HomeHeader } from '@/components/home/HomeHeader';
import { Footer } from '@/components/ui/Footer';

const ChatWidget = lazy(() => import('@/components/chat/ChatWidget').then(m => ({ default: m.ChatWidget })));

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <HomeHeader />
      <ScrollToTop />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <Suspense fallback={null}>
        <ChatWidget />
      </Suspense>
    </div>
  );
}
