"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, Eye, Heart, Users } from "lucide-react"
import { cn } from "@/lib/utils"

interface Activity {
  id: string
  type: "purchase" | "view" | "favorite" | "visitor"
  message: string
  timestamp: number
  product?: string
  location?: string
}

export function LiveActivityFeed() {
  const [activities, setActivities] = useState<Activity[]>([])

  useEffect(() => {
    // Simulate real-time activity updates
    const generateActivity = (): Activity => {
      const types = ["purchase", "view", "favorite", "visitor"] as const
      const type = types[Math.floor(Math.random() * types.length)]

      const products = [
        "Dark Chocolate Truffles",
        "Rainbow Gummy Bears",
        "Artisan Lollipops",
        "Strawberry Fudge",
        "Sour Patch Mix",
      ]

      const locations = ["New York", "Los Angeles", "Chicago", "Miami", "Seattle"]

      const messages = {
        purchase: `Someone just purchased ${products[Math.floor(Math.random() * products.length)]}`,
        view: `${products[Math.floor(Math.random() * products.length)]} is being viewed`,
        favorite: `${products[Math.floor(Math.random() * products.length)]} was added to favorites`,
        visitor: `New visitor from ${locations[Math.floor(Math.random() * locations.length)]}`,
      }

      return {
        id: Date.now().toString(),
        type,
        message: messages[type],
        timestamp: Date.now(),
        product: type !== "visitor" ? products[Math.floor(Math.random() * products.length)] : undefined,
        location: type === "visitor" ? locations[Math.floor(Math.random() * locations.length)] : undefined,
      }
    }

    // Add initial activities
    const initialActivities = Array.from({ length: 5 }, generateActivity)
    setActivities(initialActivities)

    // Simulate real-time updates
    const interval = setInterval(() => {
      const newActivity = generateActivity()
      setActivities((prev) => [newActivity, ...prev.slice(0, 9)]) // Keep only 10 most recent
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const getActivityIcon = (type: Activity["type"]) => {
    switch (type) {
      case "purchase":
        return <ShoppingCart className="h-4 w-4 text-green-600" />
      case "view":
        return <Eye className="h-4 w-4 text-blue-600" />
      case "favorite":
        return <Heart className="h-4 w-4 text-red-600" />
      case "visitor":
        return <Users className="h-4 w-4 text-purple-600" />
    }
  }

  const getActivityColor = (type: Activity["type"]) => {
    switch (type) {
      case "purchase":
        return "bg-green-50 border-green-200"
      case "view":
        return "bg-blue-50 border-blue-200"
      case "favorite":
        return "bg-red-50 border-red-200"
      case "visitor":
        return "bg-purple-50 border-purple-200"
    }
  }

  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          Live Activity
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className={cn(
              "flex items-start gap-3 p-3 rounded-lg border transition-all duration-300 animate-in slide-in-from-right-full",
              getActivityColor(activity.type),
            )}
          >
            <div className="flex-shrink-0 mt-0.5">{getActivityIcon(activity.type)}</div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground">{activity.message}</p>
              <p className="text-xs text-muted-foreground mt-1">{new Date(activity.timestamp).toLocaleTimeString()}</p>
            </div>
            {activity.type === "purchase" && (
              <Badge variant="secondary" className="text-xs">
                Sale
              </Badge>
            )}
          </div>
        ))}

        {activities.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <Users className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">Waiting for activity...</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
