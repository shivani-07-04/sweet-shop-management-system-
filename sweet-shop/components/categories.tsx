import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Cake, Cookie, IceCream, Candy, Coffee, Gift } from "lucide-react"

const categories = [
  {
    name: "Chocolates",
    icon: Cake,
    count: 120,
    color: "bg-amber-100 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400",
  },
  {
    name: "Gummies",
    icon: Candy,
    count: 85,
    color: "bg-pink-100 text-pink-700 dark:bg-pink-900/20 dark:text-pink-400",
  },
  {
    name: "Hard Candies",
    icon: Cookie,
    count: 95,
    color: "bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400",
  },
  {
    name: "Ice Cream",
    icon: IceCream,
    count: 45,
    color: "bg-cyan-100 text-cyan-700 dark:bg-cyan-900/20 dark:text-cyan-400",
  },
  {
    name: "Beverages",
    icon: Coffee,
    count: 30,
    color: "bg-orange-100 text-orange-700 dark:bg-orange-900/20 dark:text-orange-400",
  },
  {
    name: "Gift Sets",
    icon: Gift,
    count: 25,
    color: "bg-purple-100 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400",
  },
]

export function Categories() {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-balance mb-4">Browse by Category</h2>
          <p className="text-muted-foreground text-pretty max-w-2xl mx-auto">
            Explore our carefully curated selection of sweets, organized by type to help you find exactly what you're
            craving.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category) => {
            const IconComponent = category.icon
            return (
              <Card
                key={category.name}
                className="group cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <CardContent className="p-6 text-center">
                  <div
                    className={`inline-flex items-center justify-center w-12 h-12 rounded-lg mb-4 ${category.color} group-hover:scale-110 transition-transform duration-300`}
                  >
                    <IconComponent className="h-6 w-6" />
                  </div>
                  <h3 className="font-semibold text-sm mb-2 text-balance">{category.name}</h3>
                  <Badge variant="secondary" className="text-xs">
                    {category.count} items
                  </Badge>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
