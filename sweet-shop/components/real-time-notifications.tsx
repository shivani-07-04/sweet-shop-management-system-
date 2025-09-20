"use client"

import { useState, useEffect } from "react"
import { CheckCircle, AlertTriangle, Info, X } from "lucide-react"
import { cn } from "@/lib/utils"

interface Notification {
  id: string
  type: "success" | "warning" | "info"
  title: string
  message: string
  timestamp: number
}

const notificationIcons = {
  success: CheckCircle,
  warning: AlertTriangle,
  info: Info,
}

const notificationStyles = {
  success: "bg-green-50 border-green-200 text-green-800",
  warning: "bg-orange-50 border-orange-200 text-orange-800",
  info: "bg-blue-50 border-blue-200 text-blue-800",
}

export function RealTimeNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([])

  useEffect(() => {
    // Simulate real-time notifications
    const simulateNotifications = () => {
      const sampleNotifications = [
        {
          id: "1",
          type: "success" as const,
          title: "Order Successful!",
          message: "Your order #1234 has been placed.",
          timestamp: Date.now(),
        },
        {
          id: "2",
          type: "info" as const,
          title: "New Feature",
          message: "Real-time inventory tracking is now available.",
          timestamp: Date.now() + 1000,
        },
        {
          id: "3",
          type: "warning" as const,
          title: "Low Stock Alert",
          message: "Caramel Apples is running low.",
          timestamp: Date.now() + 2000,
        },
      ]

      sampleNotifications.forEach((notification, index) => {
        setTimeout(() => {
          setNotifications((prev) => [notification, ...prev.slice(0, 4)])

          // Auto-dismiss after 5 seconds
          setTimeout(() => {
            setNotifications((prev) => prev.filter((n) => n.id !== notification.id))
          }, 5000)
        }, index * 300)
      })
    }

    simulateNotifications()
  }, [])

  const dismissNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id))
  }

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2 max-w-sm">
      {notifications.map((notification) => {
        const Icon = notificationIcons[notification.type]
        return (
          <div
            key={notification.id}
            className={cn(
              "flex items-start gap-3 p-4 rounded-lg border shadow-lg animate-in slide-in-from-right-full duration-300",
              notificationStyles[notification.type],
            )}
          >
            <div className="flex-shrink-0">
              <Icon className="h-5 w-5" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-sm">{notification.title}</h4>
              <p className="text-sm opacity-90 mt-1">{notification.message}</p>
            </div>
            <button
              onClick={() => dismissNotification(notification.id)}
              className="flex-shrink-0 opacity-60 hover:opacity-100 transition-opacity"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        )
      })}
    </div>
  )
}
