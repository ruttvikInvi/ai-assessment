import api from './axios';

interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
}

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

interface ForgotPasswordData {
  email: string;
}

interface LoginResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}

interface RegisterResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}

interface ForgotPasswordResponse {
  message: string;
}

export const authService = {
  // Login user
  login: async (credentials: LoginCredentials): Promise<LoginResponse> => {
    const response = await api.post<LoginResponse>('https://second-brain-web.onrender.com/api/auth/login', credentials);
    return response.data;
  },

  // Register new user
  register: async (data: RegisterData): Promise<RegisterResponse> => {
    const response = await api.post<RegisterResponse>('https://second-brain-web.onrender.com/api/auth/register', data);
    return response.data;
  },

  // Request password reset
  forgotPassword: async (data: ForgotPasswordData): Promise<ForgotPasswordResponse> => {
    const response = await api.post<ForgotPasswordResponse>('https://second-brain-web.onrender.com/api/auth/forgot-password', data);
    return response.data;
  },
}; 