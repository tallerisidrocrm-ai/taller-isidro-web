import TopBar from './components/TopBar';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import InsuranceBanner from './components/InsuranceBanner';
import Bodywork from './components/Bodywork';
import Services from './components/Services';
import Team from './components/Team';
import Metrics from './components/Metrics';
import Contact from './components/Contact';
import Blog from './components/Blog';
import OilBanner from './components/OilBanner';

import Testimonials from './components/Testimonials';
import Map from './components/Map';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';

function App() {
  return (
    <div className="app">
      {/* <TopBar /> */}
      <Header />
      <main>
        <Hero />
        <About />
        <InsuranceBanner />
        <Bodywork />
        <Services />
        <Metrics />
        <Testimonials />
        {/* <Team /> */}
        <Contact />
        <OilBanner />
        <Blog />
      </main>
      <Map />
      <Footer />
      <WhatsAppButton />
    </div>
  );
}

export default App;
