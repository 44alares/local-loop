import { ReactNode, useEffect, useRef } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { BetaBanner } from './BetaBanner';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const bannerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const update = () => {
      const h = bannerRef.current?.offsetHeight ?? 0;
      document.documentElement.style.setProperty('--beta-banner-h', `${h}px`);
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  return (
    <div className="flex min-h-screen flex-col">
      <div ref={bannerRef}>
        <BetaBanner />
      </div>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
