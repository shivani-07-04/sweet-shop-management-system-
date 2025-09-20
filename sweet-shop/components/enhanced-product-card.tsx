"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Heart, Eye } from "lucide-react"
import { cn } from "@/lib/utils"

interface Product {
  id: string
  name: string
  description: string
  price: number
  image: string
  stock: number
  category: string
  isPopular?: boolean
  isNew?: boolean
  isSeasonal?: boolean
}

interface EnhancedProductCardProps {
  product: Product
  onAddToCart?: (productId: string) => void
  onToggleFavorite?: (productId: string) => void
}

export function EnhancedProductCard({ product, onAddToCart, onToggleFavorite }: EnhancedProductCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)
  const [currentStock, setCurrentStock] = useState(product.stock)

  const getStockStatus = () => {
    if (currentStock === 0) return { text: "Out of stock", color: "text-red-600" }
    if (currentStock <= 3) return { text: `${currentStock} in stock`, color: "text-orange-600" }
    return { text: `${currentStock} in stock`, color: "text-green-600" }
  }

  const stockStatus = getStockStatus()

  const handleAddToCart = () => {
    if (currentStock > 0) {
      setCurrentStock((prev) => prev - 1)
      onAddToCart?.(product.id)
    }
  }

  const handleToggleFavorite = () => {
    setIsFavorite(!isFavorite)
    onToggleFavorite?.(product.id)
  }

  return (
    <Card
      className={cn(
        "group overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1",
        "bg-gradient-to-b from-card to-card/80",
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden">
        <img
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          className={cn("w-full h-48 object-cover transition-transform duration-300", isHovered && "scale-105")}
        />

        {/* Product Tags */}
        <div className="absolute top-3 left-3 flex flex-col gap-1">
          {product.isPopular && <Badge className="bg-primary text-primary-foreground">Popular</Badge>}
          {product.isNew && <Badge className="bg-green-500 text-white">New</Badge>}
          {product.isSeasonal && <Badge className="bg-orange-500 text-white">Seasonal</Badge>}
        </div>

        {/* Favorite Button */}
        <button
          onClick={handleToggleFavorite}
          className={cn(
            "absolute top-3 right-3 p-2 rounded-full bg-white/80 backdrop-blur-sm transition-all duration-200",
            "opacity-0 group-hover:opacity-100 hover:bg-white hover:scale-110",
            isFavorite && "opacity-100 text-red-500",
          )}
        >
          <Heart className={cn("h-4 w-4", isFavorite && "fill-current")} />
        </button>

        {/* Hover Overlay */}
        <div
          className={cn(
            "absolute inset-0 bg-black/20 flex items-center justify-center transition-opacity duration-300",
            isHovered ? "opacity-100" : "opacity-0",
          )}
        >
          <div className="flex gap-2">
            <Button size="sm" variant="secondary" className="bg-white/90 hover:bg-white">
              <Eye className="h-4 w-4 mr-1" />
              Quick View
            </Button>
          </div>
        </div>
      </div>

      <CardContent className="p-4">
        <div className="space-y-2">
          <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors">
            {product.name}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2">{product.description}</p>

          <div className="flex items-center justify-between pt-2">
            <div className="space-y-1">
              <div className="text-xl font-bold text-primary">${product.price.toFixed(2)}</div>
              <div className={cn("text-xs font-medium", stockStatus.color)}>{stockStatus.text}</div>
            </div>

            <Button
              onClick={handleAddToCart}
              disabled={currentStock === 0}
              className={cn("transition-all duration-200", currentStock === 0 && "opacity-50 cursor-not-allowed")}
            >
              <ShoppingCart className="h-4 w-4 mr-1" />
              Add to Cart
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
