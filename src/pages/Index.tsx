import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/sections/HeroSection';
import MissionSection from '@/components/sections/MissionSection';
import ProjectsPreview from '@/components/sections/ProjectsPreview';
import NewsSection from '@/components/sections/NewsSection';
import EventsSection from '@/components/sections/EventsSection';
import SupportersSection from '@/components/sections/SupportersSection';
import useScrollAnimation from '@/hooks/useScrollAnimation';

const Index = () => {
  useScrollAnimation();
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <MissionSection />
        <ProjectsPreview />
        <NewsSection />
        <EventsSection />
        <SupportersSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
