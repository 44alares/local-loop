import { ReactNode } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { BetaBanner } from './BetaBanner';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <BetaBanner />
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
