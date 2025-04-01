
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import AboutSection from "@/components/AboutSection";
import ProductsSection from "@/components/ProductsSection";
import StatsSection from "@/components/StatsSection";
import WhyChooseUs from "@/components/WhyChooseUs";
import GallerySection from "@/components/GallerySection";
import CertificationSection from "@/components/CertificationSection";
import SDGSection from "@/components/SDGSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const HomePage = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <AboutSection />
      <ProductsSection />
      <StatsSection />
      <WhyChooseUs />
      <GallerySection />
      <CertificationSection />
      <SDGSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default HomePage;
