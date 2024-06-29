export interface CardProps {
  card:{
    url: string;
    title: string;
    price: number;
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
    price: number;
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
    url: string;
    title: string;
    price: number;
    description:string;
    id: number;
}

export type ModalDataType = {
  title?: string;
  description?: string;
  price?: number;
  id?:number
};

export type ExtendedModalDataType = ModalDataType & { type?: string;url?: string;} & Pedido

export interface ServiceValues {
  InputNumber: number; 
  TreeSelect: string; 
  TextArea: string; 
  RangePicker: [Date | null, Date | null];
}

export interface User {
  id: number;
  name: string;
  email: string;
  profileImage?: string;
  phoneNumber?: number;
}
