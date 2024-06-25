export interface CardProps {
  card:{
    url: string;
    title: string;
    price: number;
    description: string;
    id: number;
  }
}
export interface Producto {
    url: string;
    title: string;
    price: number;
    id: number;
}
export interface Servicio {
    url: string;
    title: string;
    price: number;
    description:string;
    id: number;
}

export type ModalDataType = {
  title: string;
  description: string;
  price: number;
};

export type ExtendedModalDataType = ModalDataType & { type?: string };

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
  profileImage: string;
  phoneNumber?: number; // Asegúrate de que esta línea esté actualizada
}
