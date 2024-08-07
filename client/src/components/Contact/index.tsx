"use client";
import { useEffect, useRef, useState, ChangeEvent } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";
import { message } from "antd"; // Importar el componente message
import { useForm } from "@/hooks/useForm";

const Contact = () => {
  const mapRef = useRef(null);
  const { form, handleChange } = useForm({
    user_name: "",
    email: "",
    UserMessage: "",
  });

  const { user_name, email, UserMessage } = form;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitDisabled, setSubmitDisabled] = useState(false);

  useEffect(() => {
    if (!mapRef.current) return;

    const map = L.map(mapRef.current, {
      center: [23.08552, -82.41818],
      zoom: 20,
    });

    const circle = L.circle([23.08552, -82.41818], {
      color: "red",
      fillColor: "#f03",
      fillOpacity: 0.5,
      radius: 10,
    }).addTo(map);

    circle.bindPopup("Construcciones Menores.");

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    return () => {
      map.remove();
    };
  }, []);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user_name || !email || !UserMessage) {
      message.error("Por favor, completa todos los campos."); // Mostrar mensaje de error
      return;
    }

    setIsSubmitting(true);

    try {
      await axios.post("http://localhost:1338/feedback", {
        user_name: user_name,
        email: email,
        message: UserMessage,
      });

      message.success("Mensaje enviado exitosamente!");
      setSubmitDisabled(true);
      setTimeout(() => {
        setSubmitDisabled(false);
      }, 120000); // Deshabilitar el botón de enviar durante 2 minutos

      // Vaciar el formulario
      handleChange({
        target: {
          name: "user_name",
          value: "",
        },
      } as ChangeEvent<HTMLInputElement>);

      handleChange({
        target: {
          name: "email",
          value: "",
        },
      } as ChangeEvent<HTMLInputElement>);

      handleChange({
        target: {
          name: "UserMessage",
          value: "",
        },
      } as ChangeEvent<HTMLTextAreaElement>);
    } catch (error) {
      console.error(error);
      message.error("Hubo un error al enviar el formulario.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="overflow-hidden py-16 md:py-20 lg:py-28">
      <div className="container">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4 lg:w-7/12 xl:w-8/12">
            <div
              className="mb-12 rounded-sm bg-white px-8 py-11 shadow-three dark:shadow-none dark:bg-gray-dark sm:p-[55px] lg:mb-5 lg:px-8 xl:p-[55px]"
              data-wow-delay=".15s"
            >
              <h2 className="mb-3 text-2xl font-bold text-black dark:text-white sm:text-3xl lg:text-2xl xl:text-3xl">
                ¿Necesitas ayuda? Contáctanos
              </h2>
              <p className="mb-12 text-base font-medium text-body-color">
                Nuestro equipo de soporte se comunicará con usted lo antes
                posible por correo electrónico.
              </p>
              <form onSubmit={onSubmit}>
                <div className="-mx-4 flex flex-wrap">
                  <div className="w-full px-4 md:w-1/2">
                    <div className="mb-8">
                      <label
                        htmlFor="name"
                        className="mb-3 block text-sm font-medium text-dark dark:text-white"
                      >
                        Nombre
                      </label>
                      <input
                        type="text"
                        name="user_name"
                        placeholder="Escribe tu nombre"
                        value={user_name}
                        onChange={handleChange}
                        autoComplete="disabled"
                        className="border-stroke w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none"
                      />
                    </div>
                  </div>
                  <div className="w-full px-4 md:w-1/2">
                    <div className="mb-8">
                      <label
                        htmlFor="email"
                        className="mb-3 block text-sm font-medium text-dark dark:text-white"
                      >
                        Correo electrónico
                      </label>
                      <input
                        type="email"
                        name="email"
                        placeholder="Escribe tu correo"
                        value={email}
                        onChange={handleChange}
                        className="border-stroke w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none"
                      />
                    </div>
                  </div>
                  <div className="w-full px-4">
                    <div className="mb-8">
                      <label
                        htmlFor="message"
                        className="mb-3 block text-sm font-medium text-dark dark:text-white"
                      >
                        Mensaje
                      </label>
                      <textarea
                        name="UserMessage"
                        rows={5}
                        placeholder="Escribe tu inquietud"
                        value={UserMessage}
                        onChange={handleChange}
                        className="border-stroke w-full resize-none rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none"
                      ></textarea>
                    </div>
                  </div>
                  <div className="w-full px-4">
                    <button
                      type="submit"
                      disabled={isSubmitting || submitDisabled}
                      className={`rounded-full px-9 py-4 text-base font-medium text-white shadow-submit duration-300 ${
                        isSubmitting || submitDisabled
                          ? "bg-gray-500 cursor-not-allowed"
                          : "bg-primary hover:bg-primary/90"
                      } dark:shadow-submit-dark`}
                    >
                      Enviar feedback
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>

          {/* Mapa */}
          <div className="w-full px-4 lg:w-5/12 xl:w-4/12">
            <div className="">
              <div
                className="shadow-xl"
                id="map"
                ref={mapRef}
                style={{
                  height: "625px",
                  width: "350px",
                  borderRadius: "8px",
                  zIndex: "-1",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
