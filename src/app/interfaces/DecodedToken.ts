import { Cliente } from "./cliente";

export interface DecodedToken {
    usuario: Number;
    rol: string;
    exp: number;  // Si estás usando expiración en el token
    info?: Cliente | null;
  
  }
  