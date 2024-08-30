  export interface LoginResponse {
    message: string;
    UserType: string; // Identifica el tipo de usuario
    accesstoken: string;
    admin?: Admin; // Este campo estará presente si userType es 'admin'
    cliente?: Cliente; // Este campo estará presente si userType es 'cliente'
  }

  interface Admin {
    id?: number;
    nombre: string;
    usuario: string;
    passw: string;
    rol: string;
    foto?: null;
  }

  interface Cliente {
    id?: number;
    nombres: string;
    apellidos: string;
    edad: number;
    sexo: string;
    correo: string;
    usuario: string;
    passw: string;
    foto?: null;
  }
