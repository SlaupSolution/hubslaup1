import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/home/HeroSection";
import HowItWorks from "@/components/home/HowItWorks";
import VehiclesShowcase from "@/components/home/VehiclesShowcase";
import ChargingStations from "@/components/home/ChargingStations";
import RegistrationForms from "@/components/home/RegistrationForms";
import CallToAction from "@/components/home/CallToAction";
import { useEffect } from "react";

const Home = () => {
  // Scroll to section if URL has hash
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const element = document.querySelector(hash);
      if (element) {
        setTimeout(() => {
          window.scrollTo({
            top: (element as HTMLElement).offsetTop - 80,
            behavior: "smooth",
          });
        }, 100);
      }
    }
  }, []);

  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <HowItWorks />
        <VehiclesShowcase />
        <ChargingStations />
        <RegistrationForms />
        <CallToAction />
      </main>
      <Footer />
    </>
  );
};

export default Home;
