export interface RegisterResponse {
    id: number;
    message: string;
}

export interface LoginResponse {
   access_token: string;
   refresh_token: string;
}

export interface TokenPayload {
    userId: number;
}

export interface ForgotPasswordResponse {
    encryptData: string;
  }