"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, Package } from "lucide-react"

interface Metrics {
  todayRevenue: number
  todayOrders: number
  weeklyRevenue: number
  weeklyOrders: number
  lowStockItems: number
  outOfStock: number
  totalProducts: number
  categories: number
}

export function DashboardMetrics() {
  const [metrics, setMetrics] = useState<Metrics>({
    todayRevenue: 1248,
    todayOrders: 42,
    weeklyRevenue: 8452,
    weeklyOrders: 167,
    lowStockItems: 18,
    outOfStock: 3,
    totalProducts: 124,
    categories: 12,
  })

  useEffect(() => {
    // Simulate real-time metric updates
    const interval = setInterval(() => {
      setMetrics((prev) => ({
        ...prev,
        todayRevenue: prev.todayRevenue + Math.floor(Math.random() * 50),
        todayOrders: prev.todayOrders + (Math.random() > 0.7 ? 1 : 0),
      }))
    }, 10000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-foreground">Shop Dashboard</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Sales Overview */}
        <Card className="bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Sales Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-background/50 rounded-lg">
                <div className="text-2xl font-bold text-primary animate-pulse">
                  ${metrics.todayRevenue.toLocaleString()}
                </div>
                <div className="text-sm text-muted-foreground">Today's Revenue</div>
              </div>
              <div className="text-center p-4 bg-background/50 rounded-lg">
                <div className="text-2xl font-bold text-primary animate-pulse">{metrics.todayOrders}</div>
                <div className="text-sm text-muted-foreground">Today's Orders</div>
              </div>
              <div className="text-center p-4 bg-background/50 rounded-lg">
                <div className="text-2xl font-bold text-secondary">${metrics.weeklyRevenue.toLocaleString()}</div>
                <div className="text-sm text-muted-foreground">Weekly Revenue</div>
              </div>
              <div className="text-center p-4 bg-background/50 rounded-lg">
                <div className="text-2xl font-bold text-secondary">{metrics.weeklyOrders}</div>
                <div className="text-sm text-muted-foreground">Weekly Orders</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Inventory Status */}
        <Card className="bg-gradient-to-br from-accent/5 to-muted/5 border-accent/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5 text-accent" />
              Inventory Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-background/50 rounded-lg">
                <div className="text-2xl font-bold text-orange-600">{metrics.lowStockItems}</div>
                <div className="text-sm text-muted-foreground">Low Stock Items</div>
              </div>
              <div className="text-center p-4 bg-background/50 rounded-lg">
                <div className="text-2xl font-bold text-red-600">{metrics.outOfStock}</div>
                <div className="text-sm text-muted-foreground">Out of Stock</div>
              </div>
              <div className="text-center p-4 bg-background/50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">{metrics.totalProducts}</div>
                <div className="text-sm text-muted-foreground">Total Products</div>
              </div>
              <div className="text-center p-4 bg-background/50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{metrics.categories}</div>
                <div className="text-sm text-muted-foreground">Categories</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
