import { Request } from "express";

export interface RegisterResponse {
    id: number;
    message: string;
}

export interface LoginResponse {
    id: number;
    message: string;
}

export interface TokenPayload {
    userId: number;
}