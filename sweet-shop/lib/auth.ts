export interface User {
  id: string
  fullName: string
  email: string
  phone: string
  address: string
  role: "customer" | "admin"
  createdAt: Date
}

export interface AuthToken {
  userId: string
  email: string
  role: "customer" | "admin"
  exp: number
}

export const getToken = (): string | null => {
  if (typeof window === "undefined") return null
  return localStorage.getItem("token")
}

export const getUser = (): User | null => {
  if (typeof window === "undefined") return null
  const userStr = localStorage.getItem("user")
  return userStr ? JSON.parse(userStr) : null
}

export const isAuthenticated = (): boolean => {
  const token = getToken()
  if (!token) return false

  try {
    const decoded = JSON.parse(atob(token)) as AuthToken
    return decoded.exp > Date.now()
  } catch {
    return false
  }
}

export const isAdmin = (): boolean => {
  const user = getUser()
  return user?.role === "admin"
}

export const logout = (): void => {
  if (typeof window === "undefined") return
  localStorage.removeItem("token")
  localStorage.removeItem("user")
  window.location.href = "/auth/login"
}

export const verifyToken = (token: string): AuthToken | null => {
  try {
    const decoded = JSON.parse(atob(token)) as AuthToken
    if (decoded.exp <= Date.now()) {
      return null
    }
    return decoded
  } catch (error) {
    return null
  }
}
