import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"

const categories = [
  { id: "chocolates", label: "Chocolates", count: 120 },
  { id: "gummies", label: "Gummies", count: 85 },
  { id: "hard-candies", label: "Hard Candies", count: 95 },
  { id: "ice-cream", label: "Ice Cream", count: 45 },
  { id: "beverages", label: "Beverages", count: 30 },
  { id: "gift-sets", label: "Gift Sets", count: 25 },
]

const brands = [
  { id: "sweet-delights", label: "Sweet Delights", count: 45 },
  { id: "candy-co", label: "Candy Co.", count: 38 },
  { id: "premium-treats", label: "Premium Treats", count: 29 },
  { id: "artisan-sweets", label: "Artisan Sweets", count: 22 },
]

export function SweetFilters() {
  return (
    <div className="space-y-6">
      {/* Price Range */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Price Range</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Slider defaultValue={[0, 100]} max={100} step={1} className="w-full" />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>$0</span>
            <span>$100+</span>
          </div>
        </CardContent>
      </Card>

      {/* Categories */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Categories</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {categories.map((category) => (
            <div key={category.id} className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox id={category.id} />
                <Label htmlFor={category.id} className="text-sm">
                  {category.label}
                </Label>
              </div>
              <span className="text-xs text-muted-foreground">({category.count})</span>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Brands */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Brands</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {brands.map((brand) => (
            <div key={brand.id} className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox id={brand.id} />
                <Label htmlFor={brand.id} className="text-sm">
                  {brand.label}
                </Label>
              </div>
              <span className="text-xs text-muted-foreground">({brand.count})</span>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Availability */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Availability</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center space-x-2">
            <Checkbox id="in-stock" />
            <Label htmlFor="in-stock" className="text-sm">
              In Stock Only
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="on-sale" />
            <Label htmlFor="on-sale" className="text-sm">
              On Sale
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="new-arrivals" />
            <Label htmlFor="new-arrivals" className="text-sm">
              New Arrivals
            </Label>
          </div>
        </CardContent>
      </Card>

      {/* Clear Filters */}
      <Button variant="outline" className="w-full bg-transparent">
        Clear All Filters
      </Button>
    </div>
  )
}
