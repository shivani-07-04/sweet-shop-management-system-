"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles } from "lucide-react"

export function EnhancedHeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-primary via-secondary to-accent text-white">
      <div className="absolute inset-0 bg-black/10" />

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute top-20 left-10 w-4 h-4 bg-white/20 rounded-full animate-bounce"
          style={{ animationDelay: "0s" }}
        />
        <div
          className="absolute top-40 right-20 w-6 h-6 bg-white/15 rounded-full animate-bounce"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute bottom-32 left-1/4 w-3 h-3 bg-white/25 rounded-full animate-bounce"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="absolute top-60 right-1/3 w-5 h-5 bg-white/10 rounded-full animate-bounce"
          style={{ animationDelay: "0.5s" }}
        />
      </div>

      <div className="relative container mx-auto px-4 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="flex items-center gap-2 text-white/90">
              <Sparkles className="h-5 w-5" />
              <span className="text-sm font-medium">Premium Sweet Collection</span>
            </div>

            <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
              Indulge in Sweet
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white to-white/80">
                Delights
              </span>
            </h1>

            <p className="text-lg lg:text-xl text-white/90 max-w-lg leading-relaxed">
              Discover our exquisite collection of handcrafted sweets, made with the finest ingredients and a whole lot
              of love. From classic favorites to innovative creations, we have something for every sweet tooth.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90 font-semibold group">
                Explore Our Collection
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10 font-semibold bg-transparent"
              >
                View Menu
              </Button>
            </div>
          </div>

          <div className="relative">
            <div className="relative z-10">
              <img
                src="/colorful-candy-shop-display-with-various-sweets-an.jpg"
                alt="Sweet Shop Display"
                className="w-full max-w-md mx-auto rounded-2xl shadow-2xl animate-float"
              />
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-white/10 rounded-full blur-xl" />
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-white/5 rounded-full blur-2xl" />
          </div>
        </div>
      </div>
    </section>
  )
}
;<style jsx>{`
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
  }
  
  .animate-float {
    animation: float 3s ease-in-out infinite;
  }
`}</style>
