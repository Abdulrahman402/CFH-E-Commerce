import { Request } from "express";

export interface AuthenticatedRequest extends Request {
  user?: { id: string };
}
export interface UserPayload {
  id: string;
}

export interface ValidatedToken {
  valid: boolean;
  payload: UserPayload;
}

export interface InvalidToken {
  valid: boolean;
  payload: null;
}

export type ValidationResult = ValidatedToken | InvalidToken;
