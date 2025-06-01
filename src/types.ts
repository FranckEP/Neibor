export interface Propietario {
  apartamento: string;
  nombre: string;
  celular: string;
  correo: string;
}

export interface TablaInfo {
  id: string;
  nombre: string;
  tipo: "Torre" | "Etapa";
  propietarios: Propietario[];
}
