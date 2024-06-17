export interface CardProps {
    card: {
      url: string;
      title: string;
      basePrice: number;
      description: string;
      id: number;
    };
}

export type ModalDataType = {
  title: string;
  description: string;
  basePrice: number;
};

export type ExtendedModalDataType = ModalDataType & { type?: string };