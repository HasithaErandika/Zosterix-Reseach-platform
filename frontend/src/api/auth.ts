import { apiClient } from './client'
import { LoginRequest, RegisterRequest, AuthResponse } from '../types/auth'

export const authApi = {
  login: async (data: LoginRequest) => {
    const response = await apiClient.post<AuthResponse>('/api/v1/auth/login', data)
    return response.data
  },
  
  register: async (data: RegisterRequest) => {
    const response = await apiClient.post<AuthResponse>('/api/v1/auth/register', data)
    return response.data
  },
  
  logout: async () => {
    await apiClient.post('/api/v1/auth/logout')
  },
  
  refresh: async () => {
    const response = await apiClient.post<AuthResponse>('/api/v1/auth/refresh')
    return response.data
  }
}
