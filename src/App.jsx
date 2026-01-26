import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import TopBar from './components/TopBar';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import InsuranceBanner from './components/InsuranceBanner';
import Bodywork from './components/Bodywork';
import Services from './components/Services';
import Metrics from './components/Metrics';
import Team from './components/Team';
import Contact from './components/Contact';
import Blog from './components/Blog';
import OilBanner from './components/OilBanner';
import Testimonials from './components/Testimonials';
import Map from './components/Map';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import StatisticsPage from './components/StatisticsPage';

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
      <Team />
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
      {!isStatsPage && <TopBar />}
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/estadisticas" element={<StatisticsPage />} />
        </Routes>
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
