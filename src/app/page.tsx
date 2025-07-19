import FeaturesSection from "@/components/custom/features-section";
import Footer from "@/components/custom/footer";
import HeroSection from "@/components/custom/hero-section";
import Navbar from "@/components/custom/navbar";

export default function Home() {
  return (
   <div>
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <Footer />
   </div>
  );
}
