import { ReactNode, useEffect, useRef } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { BetaBanner } from './BetaBanner';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const stickyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const update = () => {
      const h = stickyRef.current?.offsetHeight ?? 0;
      document.documentElement.style.setProperty('--nav-block-h', `${h}px`);
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  return (
    <div className="flex min-h-screen flex-col">
      <div
        ref={stickyRef}
        className="sticky top-0 z-50 w-full shadow-[0_1px_3px_0_rgba(0,0,0,0.05)]"
      >
        <BetaBanner />
        <Header />
      </div>
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
