import { HeroBanner } from "@/components/home/hero-banner";
import { FeatureSection } from "@/components/home/feature-section";
import { GallerySection } from "@/components/home/gallery-section";
import { NewsletterSection } from "@/components/home/newsletter-section";

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* 1. Hero Banner Section */}
      <HeroBanner />

      {/* 2. Feature Section */}
      <FeatureSection />

      {/* 3. Slot for Milestone C8: Dynamic Recent Upcoming Events Section (.limit(6)) */}

      {/* 4. Gallery Section */}
      <GallerySection />

      {/* 5. Newsletter Section */}
      <NewsletterSection />
    </div>
  );
}
