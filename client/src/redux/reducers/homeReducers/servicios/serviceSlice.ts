import { Servicio } from "@/types/interfaces";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ServiceState {
  services: Servicio[];
}

const initialState: ServiceState = {
  services: [
    {
      url: "https://media.istockphoto.com/id/468996060/es/foto/trabajador-de-construcci%C3%B3n-de-la-casa-de-alba%C3%B1iler%C3%ADa-wal.jpg?s=612x612&w=0&k=20&c=9AARfQCtfEnnNMf4Ri3YlvTuGybab02PgH34FVKYVSM=",
      title: "Construccion de muros",
      price: 20,
      description: "Levantamiento de paredes y muros",
      id: 1,
    },
    {
      url: "https://media.istockphoto.com/id/1221306297/es/foto/el-hombre-vierte-pintura-en-la-bandeja-y-sumerge-el-rodillo-trabajador-profesional-de-la.jpg?s=612x612&w=0&k=20&c=_qILsrUuQiFUVL7BE8I-gwXxp_pY8T0VJdv6Tpd4Ab8=",
      title: "Servicio de pintura",
      price: 3,
      description: "Pintura para interiores y fachadas",
      id: 2,
    },
    {
      url: "https://media.istockphoto.com/id/1083735696/es/foto/perito-en-casco-y-chaqueta-de-alta-visibilidad-con-tableta-digital-realizando-inspecci%C3%B3n-de.jpg?s=612x612&w=0&k=20&c=iXRH7zHgmMuCGr4vMYAecxzEbXXkVh8fa9q876sprzw=",
      title: "Servicio de defectación",
      price: 20,
      description: "Revisión de estructuras y muros",
      id: 3,
    },
  ],
};

export const ServiciceSlice = createSlice({
    name: 'serviceClient',
    initialState,
    reducers: {}
})

export default ServiciceSlice.reducer;