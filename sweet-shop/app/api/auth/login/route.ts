import { type NextRequest, NextResponse } from "next/server"

// Simple hash function for demo (same as in register)
function simpleHash(password: string): string {
  let hash = 0
  for (let i = 0; i < password.length; i++) {
    const char = password.charCodeAt(i)
    hash = (hash << 5) - hash + char
    hash = hash & hash // Convert to 32-bit integer
  }
  return hash.toString()
}

// Demo users (in production, this would be from a database)
const users: Array<{
  id: string
  fullName: string
  email: string
  phone: string
  address: string
  password: string
  role: "customer" | "admin"
  createdAt: Date
}> = [
  // Default admin user for testing
  {
    id: "1",
    fullName: "Admin User",
    email: "admin@sweetshop.com",
    phone: "+1234567890",
    address: "123 Sweet Street, Candy City",
    password: simpleHash("admin123"),
    role: "admin",
    createdAt: new Date(),
  },
  // Default customer user for testing
  {
    id: "2",
    fullName: "John Doe",
    email: "customer@sweetshop.com",
    phone: "+1987654321",
    address: "456 Candy Lane, Sugar Town",
    password: simpleHash("customer123"),
    role: "customer",
    createdAt: new Date(),
  },
]

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    // Validate required fields
    if (!email || !password) {
      return NextResponse.json({ message: "Email and password are required" }, { status: 400 })
    }

    // Find user by email
    const user = users.find((u) => u.email === email)
    if (!user) {
      return NextResponse.json({ message: "Invalid email or password" }, { status: 401 })
    }

    // Verify password
    const hashedPassword = simpleHash(password)
    if (hashedPassword !== user.password) {
      return NextResponse.json({ message: "Invalid email or password" }, { status: 401 })
    }

    // Create simple token (in production, use proper JWT)
    const token = btoa(
      JSON.stringify({
        userId: user.id,
        email: user.email,
        role: user.role,
        exp: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 days
      }),
    )

    // Return user data without password
    const { password: _, ...userWithoutPassword } = user

    return NextResponse.json({
      message: "Login successful",
      token,
      user: userWithoutPassword,
    })
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
