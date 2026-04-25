export interface User {
  id: string
  email: string
  name: string
  role: string
  is_verified: boolean
  avatar_url?: string
}

export interface AuthResponse {
  status: string
  message: string
  data: {
    user: User
    access_token: string
  }
}

export interface LoginRequest {
  email: string
  password: string
}

export interface RegisterRequest {
  email: string
  password: string
  name: string
  role: 'student' | 'researcher' | 'supervisor'
}
