import { useState,ChangeEvent } from "react";


export const useForm = (initState:any) => {

    const [form, setForm] = useState(initState);
    const handleChange = ({target}:ChangeEvent<HTMLInputElement>) =>{
        const {name,value} = target;

        setForm({
            ...form,
            [name]:value
        });
    }

  return {
    form,
    handleChange
  }
    
}

