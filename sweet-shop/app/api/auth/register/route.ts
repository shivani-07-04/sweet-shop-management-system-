import { type NextRequest, NextResponse } from "next/server"

// Simple in-memory user storage for demo purposes
const users: Array<{
  id: string
  fullName: string
  email: string
  phone: string
  address: string
  password: string
  role: "customer" | "admin"
  createdAt: Date
}> = []

// Simple hash function for demo (in production, use proper hashing)
function simpleHash(password: string): string {
  let hash = 0
  for (let i = 0; i < password.length; i++) {
    const char = password.charCodeAt(i)
    hash = (hash << 5) - hash + char
    hash = hash & hash // Convert to 32-bit integer
  }
  return hash.toString()
}

export async function POST(request: NextRequest) {
  try {
    const { fullName, email, phone, address, password } = await request.json()

    // Validate required fields
    if (!fullName || !email || !phone || !address || !password) {
      return NextResponse.json({ message: "All fields are required" }, { status: 400 })
    }

    // Check if user already exists
    const existingUser = users.find((user) => user.email === email)
    if (existingUser) {
      return NextResponse.json({ message: "User with this email already exists" }, { status: 400 })
    }

    // Hash password (simple demo hash)
    const hashedPassword = simpleHash(password)

    // Create new user
    const newUser = {
      id: Date.now().toString(),
      fullName,
      email,
      phone,
      address,
      password: hashedPassword,
      role: "customer" as const,
      createdAt: new Date(),
    }

    users.push(newUser)

    // Create simple token (in production, use proper JWT)
    const token = btoa(
      JSON.stringify({
        userId: newUser.id,
        email: newUser.email,
        role: newUser.role,
        exp: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 days
      }),
    )

    // Return user data without password
    const { password: _, ...userWithoutPassword } = newUser

    return NextResponse.json({
      message: "User registered successfully",
      token,
      user: userWithoutPassword,
    })
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
