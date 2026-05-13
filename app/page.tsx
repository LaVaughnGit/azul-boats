import Navbar from "@/components/navbar";
import Hero from "@/components/hero";
import Fleet from "@/components/fleet";
import Services from "@/components/services";
import HowItWorks from "@/components/how-it-works";
import Gallery from "@/components/gallery";
import Testimonials from "@/components/testimonials";
import FAQ from "@/components/faq";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <main style={{ backgroundColor: "#06061A" }}>
      <Navbar />
      <Hero />
      <Fleet />
      <Services />
      <HowItWorks />
      <Gallery />
      <Testimonials />
      <FAQ />
      <Footer />
    </main>
  );
}
