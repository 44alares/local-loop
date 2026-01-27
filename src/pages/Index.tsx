import { Layout } from '@/components/layout/Layout';
import { HeroSection } from '@/components/home/HeroSection';
import { TrendingProducts } from '@/components/home/TrendingProducts';
import { UserTypeCTA } from '@/components/home/UserTypeCTA';
import { HowItWorks } from '@/components/home/HowItWorks';
import { PricingTransparency } from '@/components/home/PricingTransparency';

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <TrendingProducts />
      <UserTypeCTA />
      <HowItWorks />
      <PricingTransparency />
    </Layout>
  );
};

export default Index;
