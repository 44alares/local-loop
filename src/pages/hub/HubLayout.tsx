import { Outlet } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { HubTabs } from '@/components/hub/HubTabs';
import { HubProvider } from '@/components/hub/HubContext';

export default function HubLayout() {
  return (
    <HubProvider>
      <div className="min-h-screen flex flex-col">
        <Header />
        <HubTabs />
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
      </div>
    </HubProvider>
  );
}
