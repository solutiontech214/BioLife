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
  const teamRef = useRef(null);
  const journeyRef = useRef(null);

  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="bg-[#EAF8FF] text-slate-800 overflow-x-hidden">
      <Navbar
        onHomeClick={() => scrollToSection(homeRef)}
        onAboutClick={() => scrollToSection(aboutRef)}
        onStatusClick={() => scrollToSection(statusRef)}
        onBookClick={() => scrollToSection(bookRef)}
        onTeamClick={() => scrollToSection(teamRef)}
        onJourneyClick={() => scrollToSection(journeyRef)}
      />

      {/* Home */}
      <section ref={homeRef} data-name="Home" className="pt-28">
        <HeroSection />
      </section>

      {/* About */}
      <section ref={aboutRef}>
        <AboutBioLife />
      </section>

      {/* Exoskeleton Status */}
      <section ref={statusRef}>
        <ExoSkeletonStatus />
      </section>

      {/* Booking Section (Important: relative for motion scroll fix) */}
    <section ref={bookRef} className="relative z-[100]">
  <Book />
</section>


     
      {/* Journey Timeline */}
      <section ref={journeyRef}>
        <JourneyTimeline />
      </section>
 {/* Team Showcase */}
      <section ref={teamRef}>
        <TeamShowcase />
      </section>

      {/* Footer */}
      <section>
        <Footer />
      </section>
    </div>
  );
}

export default App;
