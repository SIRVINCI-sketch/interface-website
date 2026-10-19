import Nav from './components/Nav';
import Hero from './components/Hero';
import Ticker from './components/Ticker';
import Intro from './components/Intro';
import Works from './components/Works';
import Cta from './components/Cta';
import Footer from './components/Footer';
import NoiseOverlay from './components/NoiseOverlay';
import { useRevealObserver } from './hooks/useRevealObserver';

export default function App() {
  const { observe } = useRevealObserver();

  return (
    <>
      <NoiseOverlay />
      <Nav />
      <main id="top">
        <Hero />
        <Ticker />
        <Intro observe={observe} />
        <Works observe={observe} />
        <Cta observe={observe} />
      </main>
      <Footer />
    </>
  );
}
