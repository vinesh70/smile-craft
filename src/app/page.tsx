"use client";
import { useEffect, useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import TrustBar from "@/components/sections/TrustBar";
import Services from "@/components/sections/Services";
import About from "@/components/sections/About";
import BeforeAfter from "@/components/sections/BeforeAfter";
import Doctors from "@/components/sections/Doctors";
import Process from "@/components/sections/Process";
import Testimonials from "@/components/sections/Testimonials";
import Pricing from "@/components/sections/Pricing";
import FAQ from "@/components/sections/FAQ";
import Booking from "@/components/sections/Booking";
import Contact from "@/components/sections/Contact";
import Preloader from "@/components/ui/Preloader";
import CustomCursor from "@/components/ui/CustomCursor";
import ScrollProgress from "@/components/ui/ScrollProgress";

export default function Home() {
  const [preloaderDone, setPreloaderDone] = useState(false);
  const [selectedService, setSelectedService] = useState<string | undefined>();
  const [apptDrawerOpen, setApptDrawerOpen] = useState(false);

  useEffect(() => {
    const initLenis = async () => {
      const { default: Lenis } = await import("lenis");
      const lenis = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });

      function raf(time: number) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);

      return lenis;
    };

    let lenisInstance: Awaited<ReturnType<typeof initLenis>>;
    initLenis().then((l) => {
      lenisInstance = l;
    });

    return () => {
      lenisInstance?.destroy();
    };
  }, []);

  const handleBookService = (serviceId: string) => {
    setSelectedService(serviceId);
    setTimeout(() => {
      document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <>
      <Preloader onDone={() => setPreloaderDone(true)} />
      <CustomCursor />
      <ScrollProgress />
      {preloaderDone && (
        <main>
          <Navbar apptOpen={apptDrawerOpen} onToggleAppt={setApptDrawerOpen} />
          <Hero
            onBookNow={() =>
              document
                .getElementById("booking")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          />
          <TrustBar />
          <Services onBookService={handleBookService} />
          <About />
          <BeforeAfter />
          <Doctors />
          <Process />
          <Testimonials />
          <Pricing />
          <FAQ />
          <Booking preselectedService={selectedService} onOpenMyAppointments={() => setApptDrawerOpen(true)} />
          <Contact />
          <Footer />
        </main>
      )}
    </>
  );
}
