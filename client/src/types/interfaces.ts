export interface CardProps {
  card:{
    url: string;
    title: string;
    price: string;
    description?: string;
    id: number;
  }
}

export interface Feedback {
  id: number;
  name: string;
  email: string;
  content: string;
  isNew: boolean;
  isRead: boolean;
  date: string,
}

export interface Producto {
    url: string;
    title: string;
    price: string;
    id: number;
}

export interface Pedido {
  id: number;
  service:string;
  customerName: string;
  phoneNumber: string;
  addressDescription: string;
  municipio: string;
  dateRange: string[]; 
}

export interface Servicio {
  id: string,
  title: string,
  price: string,
  description:string,
  url: string,
}

export type ModalDataType = {
  title?: string;
  description?: string;
  price?: number;
  id?:number
};

export type ExtendedModalDataType = ModalDataType & { type?: string;url?: string;} & Pedido & {
  url?: string;
  title?: string;
  price?: number;
  description?: string;
  id: number;
  service?: string;
  customerName?: string;
  phoneNumber?: number;
  addressDescription?: string;
  dateRange?: [string, string];
}


export interface PedidoForm {
  phoneNumber: number | undefined;
  municipio: string;
  descripcion: string;
  dateRange: [Date | null, Date | null];
}

export interface User {
  id: number;
  name: string;
  email: string;
  profileImage?: string;
  phoneNumber?: number;
  rol:string;
}
