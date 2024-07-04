"use client";
import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useForm } from "@/hooks/useForm";
import axios from "axios";
import { message } from "antd"; // Importar el componente message

const Contact = () => {
  const mapRef = useRef(null);
  const { form, handleChange } = useForm({
    name: "",
    email: "",
    message: "",
  });

  const { name, email, message: userMessage } = form;
  const [isSubmitting, setIsSubmitting] = useState(false);

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

    if (!name || !email || !userMessage) {
      message.error("Por favor, completa todos los campos."); // Mostrar mensaje de error
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await axios.post("URL_API", form);

      message.success("Mensaje enviado exitosamente!"); // Mostrar mensaje de éxito
    } catch (error) {
      console.error(error);
      message.error("Hubo un error al enviar el formulario."); // Mostrar mensaje de error
    } finally {
      setTimeout(() => {
        setIsSubmitting(false);
      }, 60000);
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
                        name="name"
                        placeholder="Escribe tu nombre"
                        value={name}
                        onChange={handleChange}
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
                        name="message"
                        rows={5}
                        placeholder="Escribe tu inquietud"
                        value={userMessage}
                        onChange={handleChange}
                        className="border-stroke w-full resize-none rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none"
                      ></textarea>
                    </div>
                  </div>
                  <div className="w-full px-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="rounded-full bg-primary px-9 py-4 text-base font-medium text-white shadow-submit duration-300 hover:bg-primary/90 dark:shadow-submit-dark"
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
