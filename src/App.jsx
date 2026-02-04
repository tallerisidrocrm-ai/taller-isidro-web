// Build trigger: v1.0.2 - Statistics update
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import React, { Suspense, lazy } from 'react';
import TopBar from './components/TopBar';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import InsuranceBanner from './components/InsuranceBanner';
import Bodywork from './components/Bodywork';
import Services from './components/Services';
import Metrics from './components/Metrics';

import Contact from './components/Contact';
import Blog from './components/Blog';
import OilBanner from './components/OilBanner';
import Testimonials from './components/Testimonials';
import Map from './components/Map';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import SEO from './components/SEO';

// Lazy load components that are not part of the initial viewport or the main route
const StatisticsPage = lazy(() => import('./components/StatisticsPage'));

const LoadingFallback = () => (
  <div style={{
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#111',
    color: '#FFC107'
  }}>
    <div className="loader">Cargando...</div>
  </div>
);

function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <InsuranceBanner />
      <Bodywork />
      <Services />
      <Metrics />
      <Testimonials />

      <Contact />
      <OilBanner />
      <Blog />
      <Map />
    </>
  );
}

function AppContent() {
  const location = useLocation();
  const isStatsPage = location.pathname === '/estadisticas';

  return (
    <div className="app">
      <SEO />
      {!isStatsPage && <TopBar />}
      <Header />
      <main>
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/estadisticas" element={<StatisticsPage />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
      {!isStatsPage && <WhatsAppButton />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
