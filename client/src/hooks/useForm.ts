import { useState, ChangeEvent } from "react";

export function useForm<T extends Record<string, string | number>>(initState: T) {
  const [form, setForm] = useState(initState);

  const handleChange = ({ target }: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
}
