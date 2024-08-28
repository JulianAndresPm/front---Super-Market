export interface LoginResponse {
  message: string;
  admin: {
    // Define las propiedades del objeto admin según tu estructura de datos
    id?: number;
    nombre: string;
    usuario: string;
    passw: string;
    rol: string;
    foto?: null;
  };
  accesstoken: string;
}
