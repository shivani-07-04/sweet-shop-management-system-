"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { SweetCard } from "@/components/sweet-card"
import { SweetFilters } from "@/components/sweet-filters"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter } from "lucide-react"

// Mock data - in real app this would come from API
const mockSweets = [
  {
    id: 1,
    name: "Premium Dark Chocolate Truffles",
    category: "Chocolates",
    price: 24.99,
    originalPrice: 29.99,
    rating: 4.9,
    reviews: 127,
    image: "/dark-chocolate-truffles.png",
    inStock: true,
    quantity: 15,
    isNew: false,
    isBestseller: true,
  },
  {
    id: 2,
    name: "Rainbow Gummy Bears",
    category: "Gummies",
    price: 12.99,
    originalPrice: null,
    rating: 4.7,
    reviews: 89,
    image: "/colorful-gummy-bears.jpg",
    inStock: true,
    quantity: 32,
    isNew: true,
    isBestseller: false,
  },
  // Add more mock data as needed
]

export default function SweetsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("name")
  const [showFilters, setShowFilters] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">All Sweets</h1>
          <p className="text-muted-foreground">Discover our complete collection of premium sweets and confections</p>
        </div>

        {/* Search and Sort */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search for sweets..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="flex gap-2">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Name A-Z</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
                <SelectItem value="newest">Newest First</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" onClick={() => setShowFilters(!showFilters)} className="md:hidden">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Filters Sidebar */}
          <div className={`${showFilters ? "block" : "hidden"} md:block w-full md:w-64 flex-shrink-0`}>
            <SweetFilters />
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockSweets.map((sweet) => (
                <SweetCard key={sweet.id} sweet={sweet} />
              ))}
            </div>

            {/* Load More */}
            <div className="text-center mt-12">
              <Button variant="outline" size="lg">
                Load More Sweets
              </Button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
