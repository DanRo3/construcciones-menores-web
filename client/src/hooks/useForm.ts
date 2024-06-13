'use client';
import { useState, ChangeEvent } from "react";


export function useForm<T extends Object> (initState: T) {
  const [form, setForm] = useState(initState);

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
