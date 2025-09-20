"use client"

import { useState } from "react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, ShoppingCart, Heart, Eye } from "lucide-react"
import { cn } from "@/lib/utils"

const featuredSweets = [
  {
    id: 1,
    name: "Premium Dark Chocolate Truffles",
    category: "Chocolates",
    price: 24.99,
    originalPrice: 29.99,
    rating: 4.9,
    reviews: 127,
    image: "/dark-chocolate-truffles.png",
    stock: 12,
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
    stock: 25,
    isNew: true,
    isBestseller: false,
  },
  {
    id: 3,
    name: "Artisan Lollipop Collection",
    category: "Hard Candies",
    price: 18.99,
    originalPrice: 22.99,
    rating: 4.8,
    reviews: 156,
    image: "/colorful-artisan-lollipops.jpg",
    stock: 8,
    isNew: false,
    isBestseller: true,
  },
  {
    id: 4,
    name: "Strawberry Cream Fudge",
    category: "Chocolates",
    price: 16.99,
    originalPrice: null,
    rating: 4.6,
    reviews: 73,
    image: "/strawberry-cream-fudge.jpg",
    stock: 0,
    isNew: false,
    isBestseller: false,
  },
  {
    id: 5,
    name: "Sour Patch Mix",
    category: "Gummies",
    price: 9.99,
    originalPrice: null,
    rating: 4.5,
    reviews: 201,
    image: "/sour-patch-candy-mix.jpg",
    stock: 3,
    isNew: true,
    isBestseller: false,
  },
  {
    id: 6,
    name: "Luxury Gift Box",
    category: "Gift Sets",
    price: 49.99,
    originalPrice: 59.99,
    rating: 5.0,
    reviews: 45,
    image: "/luxury-candy-gift-box.jpg",
    stock: 15,
    isNew: false,
    isBestseller: true,
  },
]

export function FeaturedSweets() {
  const [sweets, setSweets] = useState(featuredSweets)
  const [favorites, setFavorites] = useState<Set<number>>(new Set())

  const getStockStatus = (stock: number) => {
    if (stock === 0) return { text: "Out of stock", color: "text-red-600" }
    if (stock <= 3) return { text: `${stock} left`, color: "text-orange-600" }
    return { text: `${stock} in stock`, color: "text-green-600" }
  }

  const handleAddToCart = (sweetId: number) => {
    setSweets((prev) =>
      prev.map((sweet) => (sweet.id === sweetId && sweet.stock > 0 ? { ...sweet, stock: sweet.stock - 1 } : sweet)),
    )
  }

  const toggleFavorite = (sweetId: number) => {
    setFavorites((prev) => {
      const newFavorites = new Set(prev)
      if (newFavorites.has(sweetId)) {
        newFavorites.delete(sweetId)
      } else {
        newFavorites.add(sweetId)
      }
      return newFavorites
    })
  }

  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-balance mb-4">Featured Sweets</h2>
          <p className="text-muted-foreground text-pretty max-w-2xl mx-auto">
            Discover our most popular and newest sweet treats, handpicked for their exceptional quality and taste.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sweets.map((sweet) => {
            const stockStatus = getStockStatus(sweet.stock)
            const isFavorite = favorites.has(sweet.id)

            return (
              <Card
                key={sweet.id}
                className="group overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={sweet.image || "/placeholder.svg"}
                    alt={sweet.name}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />

                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex flex-col gap-2">
                    {sweet.isNew && <Badge className="bg-green-500 hover:bg-green-600">New</Badge>}
                    {sweet.isBestseller && <Badge className="bg-primary hover:bg-primary/90">Bestseller</Badge>}
                    {sweet.stock === 0 && <Badge variant="destructive">Out of Stock</Badge>}
                  </div>

                  <Button
                    size="icon"
                    variant="secondary"
                    className={cn(
                      "absolute top-3 right-3 transition-all duration-300 bg-white/80 backdrop-blur-sm hover:bg-white hover:scale-110",
                      "opacity-0 group-hover:opacity-100",
                      isFavorite && "opacity-100 text-red-500",
                    )}
                    onClick={() => toggleFavorite(sweet.id)}
                  >
                    <Heart className={cn("h-4 w-4", isFavorite && "fill-current")} />
                  </Button>

                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Button size="sm" variant="secondary" className="bg-white/90 hover:bg-white">
                      <Eye className="h-4 w-4 mr-1" />
                      Quick View
                    </Button>
                  </div>
                </div>

                <CardContent className="p-4">
                  <div className="mb-2">
                    <Badge variant="outline" className="text-xs">
                      {sweet.category}
                    </Badge>
                  </div>

                  <h3 className="font-semibold text-lg mb-2 text-balance group-hover:text-primary transition-colors">
                    {sweet.name}
                  </h3>

                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium ml-1">{sweet.rating}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">({sweet.reviews} reviews)</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xl font-bold text-primary">${sweet.price}</span>
                      {sweet.originalPrice && (
                        <span className="text-sm text-muted-foreground line-through">${sweet.originalPrice}</span>
                      )}
                    </div>
                    <div className={cn("text-xs font-medium", stockStatus.color)}>{stockStatus.text}</div>
                  </div>
                </CardContent>

                <CardFooter className="p-4 pt-0">
                  <Button
                    className="w-full transition-all duration-200"
                    disabled={sweet.stock === 0}
                    onClick={() => handleAddToCart(sweet.id)}
                  >
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    {sweet.stock > 0 ? "Add to Cart" : "Out of Stock"}
                  </Button>
                </CardFooter>
              </Card>
            )
          })}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            View All Sweets
          </Button>
        </div>
      </div>
    </section>
  )
}
