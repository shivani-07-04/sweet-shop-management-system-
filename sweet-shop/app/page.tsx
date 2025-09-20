import { Header } from "@/components/header"
import { EnhancedHeroSection } from "@/components/enhanced-hero-section"
import { FeaturedSweets } from "@/components/featured-sweets"
import { Categories } from "@/components/categories"
import { Footer } from "@/components/footer"
import { RealTimeNotifications } from "@/components/real-time-notifications"
import { DashboardMetrics } from "@/components/dashboard-metrics"
import { LiveActivityFeed } from "@/components/live-activity-feed"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <EnhancedHeroSection />
        <div className="container mx-auto px-4 py-12 space-y-16">
          <Categories />
          <FeaturedSweets />
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <DashboardMetrics />
            </div>
            <div className="lg:col-span-1">
              <LiveActivityFeed />
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <RealTimeNotifications />
    </div>
  )
}
