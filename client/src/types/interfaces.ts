export interface CardProps {
  card:{
    url: string;
    title: string;
    price: string;
    description?: string;
    id: number;
  }
}

// Cambia la interfaz Feedback en '@/types/interfaces' a:
export interface Feedback {
  id: number;
  name: string; // Cambiar a user_name si deseas reflejar el cambio en el backend
  email: string;
  message: string; // Cambiar a content si deseas reflejar el cambio en el backend
  created: string; // Cambiar a date si deseas reflejar el cambio en el backend
  // Añadir cualquier otro campo necesario
  isNew?: boolean;
  isRead?: boolean;
}

export interface Producto {
    url: string;
    title: string;
    price: string;
    id: number;
}

export interface ProductoServer{
  "id": number,
  "name":string,
   "price": number,
  "imgpath":string
}

export interface Pedido {
  id: number;
  id_servicio: number;
  user_id: number;
  phone: string;
  municipio: string;
  address_reference: string;
  fecha_inicio: string;
  fecha_culminacion: string;
  status: string;
}

export interface Servicio {
  id: number,
  title: string,
  price: string,
  description:string,
  url: string,
}

export type ServicioServer = {
  id_servicio: number;
  nombre: string;
  price: number;
  descripcion: string;
  img: string;
};

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
  phone: string;
  role: string;
}

type GenericModalData<T extends object> = T;

type ModalComponentType = 'Card' | 'Feedback' | 'Producto' | 'Pedido' | 'Servicio';

export type ExtendedModalDataType = {
  type: ModalComponentType;
  data: GenericModalData<any>;
};