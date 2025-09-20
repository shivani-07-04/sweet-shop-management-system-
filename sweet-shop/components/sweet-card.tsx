import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, ShoppingCart, Heart } from "lucide-react"

interface Sweet {
  id: number
  name: string
  category: string
  price: number
  originalPrice?: number | null
  rating: number
  reviews: number
  image: string
  inStock: boolean
  quantity: number
  isNew: boolean
  isBestseller: boolean
}

interface SweetCardProps {
  sweet: Sweet
}

export function SweetCard({ sweet }: SweetCardProps) {
  return (
    <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300">
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
          {!sweet.inStock && <Badge variant="destructive">Out of Stock</Badge>}
        </div>

        {/* Wishlist Button */}
        <Button
          size="icon"
          variant="secondary"
          className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          <Heart className="h-4 w-4" />
        </Button>
      </div>

      <CardContent className="p-4">
        <div className="mb-2">
          <Badge variant="outline" className="text-xs">
            {sweet.category}
          </Badge>
        </div>

        <h3 className="font-semibold text-lg mb-2 text-balance">{sweet.name}</h3>

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
          {sweet.inStock && <span className="text-sm text-muted-foreground">{sweet.quantity} in stock</span>}
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button className="w-full" disabled={!sweet.inStock}>
          <ShoppingCart className="mr-2 h-4 w-4" />
          {sweet.inStock ? "Add to Cart" : "Out of Stock"}
        </Button>
      </CardFooter>
    </Card>
  )
}
