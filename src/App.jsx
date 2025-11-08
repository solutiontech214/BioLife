import React, { useRef } from "react";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import AboutBioLife from "./components/AboutBioLife";
import ExoSkeletonStatus from "./components/ExoSkeletonStatus";
import Book from "./components/Book";
import Footer from "./components/Footer";
import TeamShowcase from "./components/TeamShowcase";
import JourneyTimeline from "./components/JourneyTimeline";

function App() {
  const homeRef = useRef(null);
  const aboutRef = useRef(null);
  const statusRef = useRef(null);
  const bookRef = useRef(null);

  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="bg-black text-white overflow-x-hidden">
      <Navbar
        onHomeClick={() => scrollToSection(homeRef)}
        onAboutClick={() => scrollToSection(aboutRef)}
        onStatusClick={() => scrollToSection(statusRef)}
        onBookClick={() => scrollToSection(bookRef)}
      />

      <section ref={homeRef}>
        <HeroSection />
      </section>

      <section ref={aboutRef}>
        <AboutBioLife />
      </section>

      <section ref={statusRef}>
        <ExoSkeletonStatus />
      </section>

      <section ref={bookRef}>
        <Book />
      </section>
      <section>
        <TeamShowcase />
      </section>
      <section>
        <JourneyTimeline />
      </section>

      <section>
        <Footer />
      </section>
    </div>
  );
}

export default App;
