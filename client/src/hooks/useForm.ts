'use client';
import React, { useState, ChangeEvent } from "react";

// Definimos una interfaz para el estado inicial del formulario
interface FormState {
  email?: string;
  pass?: string;
}

// La función useForm ahora acepta un objeto que cumple con la interfaz FormState
export function useForm (initState: FormState) {
  const [form, setForm] = useState<FormState>(initState);

  const handleChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = target;

    setForm((prevForm) => ({
     ...prevForm,
      [name]: value,
    }));
  };

  return {
    form,
    handleChange,
  };
};
