"use client";
import React, { useState } from "react";
import Link from "next/link";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    numberPhone: "",
    password: "",
    confirmPassword: "",
    termsAccepted: false,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const isFormComplete = () => {
    const {
      name,
      email,
      numberPhone,
      password,
      confirmPassword,
      termsAccepted,
    } = formData;
    return (
      name &&
      email &&
      numberPhone &&
      password &&
      confirmPassword &&
      termsAccepted
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      const errorMessage = "Las contraseñas no coinciden.";
      setError(errorMessage);
      console.error(errorMessage);
      return;
    }

    if (!formData.termsAccepted) {
      const errorMessage =
        "Debes aceptar los términos y condiciones para continuar.";
      setError(errorMessage);
      console.error(errorMessage);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch("urlApi", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Error al crear la cuenta");
      }

      const result = await response.json();
      console.log("Usuario creado", result);

      setFormData({
        name: "",
        email: "",
        numberPhone: "",
        password: "",
        confirmPassword: "",
        termsAccepted: false,
      });
    } catch (err: any) {
      setError(err.message);
      console.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative z-10 overflow-hidden pb-16 pt-36 md:pb-20 lg:pb-28 lg:pt-[180px]">
      <div className="container">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <div className="shadow-three mx-auto max-w-[500px] rounded bg-white px-6 py-10 dark:bg-dark sm:p-[60px]">
              <h3 className="mb-3 text-center text-2xl font-bold text-black dark:text-white sm:text-3xl">
                Construcciones Menores
              </h3>
              <h3 className="mb-3 text-center text-2xl font-bold text-black dark:text-white sm:text-3xl">
                Crea tu cuenta
              </h3>
              <div className="mb-8 flex items-center justify-center">
                <span className="hidden h-[1px] w-full max-w-[60px] bg-body-color/50 sm:block"></span>
                <p className="w-full px-5 text-center text-base font-medium text-body-color">
                  Completa correctamente todos los campos
                </p>
                <span className="hidden h-[1px] w-full max-w-[60px] bg-body-color/50 sm:block"></span>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="mb-8">
                  <label
                    htmlFor="name"
                    className="mb-3 block text-sm text-dark dark:text-white"
                  >
                    Nombre completo
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="Escribe tu nombre"
                    value={formData.name}
                    onChange={handleChange}
                    className="border-stroke dark:text-body-color-dark dark:shadow-two w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:focus:border-primary dark:focus:shadow-none"
                  />
                </div>
                <div className="mb-8">
                  <label
                    htmlFor="email"
                    className="mb-3 block text-sm text-dark dark:text-white"
                  >
                    Correo electrónico
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="Escribe tu dirección de correo"
                    value={formData.email}
                    onChange={handleChange}
                    className="border-stroke dark:text-body-color-dark dark:shadow-two w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:focus:border-primary dark:focus:shadow-none"
                  />
                </div>
                <div className="mb-8">
                  <label
                    htmlFor="numberPhone"
                    className="mb-3 block text-sm text-dark dark:text-white"
                  >
                    Número de teléfono
                  </label>
                  <input
                    type="number"
                    name="numberPhone"
                    required
                    placeholder="Introduce tu número de teléfono"
                    value={formData.numberPhone}
                    onChange={handleChange}
                    className="border-stroke dark:text-body-color-dark dark:shadow-two w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:focus:border-primary dark:focus:shadow-none"
                  />
                </div>
                <div className="mb-8">
                  <label
                    htmlFor="password"
                    className="mb-3 block text-sm text-dark dark:text-white"
                  >
                    Contraseña
                  </label>
                  <input
                    type="password"
                    name="password"
                    required
                    placeholder="Escribe tu contraseña"
                    value={formData.password}
                    onChange={handleChange}
                    className="border-stroke dark:text-body-color-dark dark:shadow-two w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:focus:border-primary dark:focus:shadow-none"
                  />
                </div>
                <div className="mb-8">
                  <label
                    htmlFor="confirmPassword"
                    className="mb-3 block text-sm text-dark dark:text-white"
                  >
                    Confirma la contraseña
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    required
                    placeholder="Confirma tu contraseña"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="border-stroke dark:text-body-color-dark dark:shadow-two w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:focus:border-primary dark:focus:shadow-none"
                  />
                </div>
                <div className="mb-8 flex items-center">
                  <input
                    type="checkbox"
                    id="termsAccepted"
                    name="termsAccepted"
                    checked={formData.termsAccepted}
                    onChange={handleChange}
                    className="h-5 w-5"
                  />
                  <label
                    htmlFor="termsAccepted"
                    className="ml-2 text-sm font-medium text-body-color"
                  >
                    Al crear una cuenta significa que aceptas los
                    <a href="#0" className="text-primary hover:underline">
                      {" "}
                      Términos y condiciones{" "}
                    </a>
                    , y nuestra
                    <a href="#0" className="text-primary hover:underline">
                      {" "}
                      Política de Privacidad{" "}
                    </a>
                  </label>
                </div>
                <div className="mb-6">
                  <button
                    className="shadow-submit dark:shadow-submit-dark flex w-full items-center justify-center rounded-full bg-primary px-9 py-4 text-base font-medium text-white duration-300 hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
                    type="submit"
                    disabled={loading || !isFormComplete()}
                  >
                    {loading ? "Creando cuenta..." : "Crear cuenta"}
                  </button>
                </div>
              </form>
              {error && <p className="text-center text-red-500">{error}</p>}
              <p className="text-center text-base font-medium text-body-color">
                ¿Ya tienes una cuenta?{" "}
                <Link href="/signin" className="text-primary hover:underline">
                  Iniciar sesión
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signup;
