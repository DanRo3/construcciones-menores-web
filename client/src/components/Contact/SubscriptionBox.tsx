"use client";

import { message } from "antd";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useState } from "react";

const NewsLatterBox = () => {
  const { theme } = useTheme();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:1338/subscribirse", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email }), // 1
      });

      if (response.status !== 200) {
        // 3
        throw new Error("Error al enviar el correo");
      }

      message.success("Gracias por suscribirte!"); // 4
      setEmail("");
    } catch (error: unknown) {
      // 2
      setErrorMessage(
        (error as Error).message || "Ocurrió un error desconocido."
      );
      console.error((error as Error).message);
      message.error(`${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative z-10 bg-white p-8 shadow-three dark:bg-gray-dark sm:p-11 lg:p-8 xl:p-11">
      <div className="bg-white dark:bg-gray-dark py-6 sm:py-8 lg:py-12">
        <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
          <div className="flex flex-col items-center rounded-lg bg-gray-100 dark:bg-[#131313] p-4 sm:p-8 lg:flex-row lg:justify-between">
            <div className="mb-4 sm:mb-8 lg:mb-0">
              <h2 className="text-center text-xl font-bold text-indigo-500 sm:text-2xl lg:text-left lg:text-3xl">
                Conozca actualizaciones de nuestros servicios
              </h2>
              <p className="text-center text-gray-500 lg:text-left">
                Suscríbete a nuestro boletín
              </p>
            </div>

            <div className="flex flex-col items-center lg:items-end">
              <form
                onSubmit={handleSubmit}
                className="mb-3 flex w-full max-w-md gap-2"
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  required
                  className="bg-gray-white w-full flex-1 rounded-full border border-gray-300 px-3 py-2 text-gray-800 placeholder-gray-400 outline-none ring-indigo-300 transition duration-100 focus:ring"
                />
                <button
                  className="inline-block rounded-full bg-indigo-500 px-8 py-2 text-center text-sm font-semibold text-white outline-none ring-indigo-300 transition duration-100 hover:bg-indigo-600 focus-visible:ring active:bg-indigo-700 md:text-base"
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? "Enviando..." : "Enviar"}
                </button>
              </form>

              <p className="text-center text-xs text-gray-400 lg:text-left">
                Al suscribirse, acepta nuestros{" "}
                <Link
                  href="#"
                  className="underline transition duration-100 hover:text-indigo-500 active:text-indigo-600"
                >
                  {" "}
                  Términos de servicio{" "}
                </Link>{" "}
                y{" "}
                <Link
                  href="#"
                  className="underline transition duration-100 hover:text-indigo-500 active:text-indigo-600"
                >
                  Política de privacidad
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </div>

      <div>
        <span className="absolute left-2 top-7">
          <svg
            width="57"
            height="65"
            viewBox="0 0 57 65"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              opacity="0.5"
              d="M0.407629 15.9573L39.1541 64.0714L56.4489 0.160793L0.407629 15.9573Z"
              fill="url(#paint0_linear_1028_600)"
            />
            <defs>
              <linearGradient
                id="paint0_linear_1028_600"
                x1="-18.3187"
                y1="55.1044"
                x2="37.161"
                y2="15.3509"
                gradientUnits="userSpaceOnUse"
              >
                <stop
                  stopColor={theme === "light" ? "#4A6CF7" : "#fff"}
                  stopOpacity="0.62"
                />
                <stop
                  offset="1"
                  stopColor={theme === "light" ? "#4A6CF7" : "#fff"}
                  stopOpacity="0"
                />
              </linearGradient>
            </defs>
          </svg>
        </span>

        <span className="absolute bottom-24 left-1.5">
          <svg
            width="39"
            height="32"
            viewBox="0 0 39 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              opacity="0.5"
              d="M14.7137 31.4215L38.6431 4.24115L6.96581e-07 0.624124L14.7137 31.4215Z"
              fill="url(#paint0_linear_1028_601)"
            />
            <defs>
              <linearGradient
                id="paint0_linear_1028_601"
                x1="39.1948"
                y1="38.335"
                x2="10.6982"
                y2="10.2511"
                gradientUnits="userSpaceOnUse"
              >
                <stop
                  stopColor={theme === "light" ? "#4A6CF7" : "#fff"}
                  stopOpacity="0.62"
                />
                <stop
                  offset="1"
                  stopColor={theme === "light" ? "#4A6CF7" : "#fff"}
                  stopOpacity="0"
                />
              </linearGradient>
            </defs>
          </svg>
        </span>

        <span className="absolute right-2 top-[140px]">
          <svg
            width="38"
            height="38"
            viewBox="0 0 38 38"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              opacity="0.5"
              d="M10.6763 35.3091C23.3976 41.6367 38.1681 31.7045 37.107 17.536C36.1205 4.3628 21.9407 -3.46901 10.2651 2.71063C-2.92254 9.69061 -2.68321 28.664 10.6763 35.3091Z"
              fill="url(#paint0_linear_1028_602)"
            />
            <defs>
              <linearGradient
                id="paint0_linear_1028_602"
                x1="-0.571054"
                y1="-37.1717"
                x2="28.7937"
                y2="26.7564"
                gradientUnits="userSpaceOnUse"
              >
                <stop
                  stopColor={theme === "light" ? "#4A6CF7" : "#fff"}
                  stopOpacity="0.62"
                />
                <stop
                  offset="1"
                  stopColor={theme === "light" ? "#4A6CF7" : "#fff"}
                  stopOpacity="0"
                />
              </linearGradient>
            </defs>
          </svg>
        </span>

        <span className="absolute right-0 top-0">
          <svg
            width="162"
            height="91"
            viewBox="0 0 162 91"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g opacity="0.3">
              <path
                opacity="0.45"
                d="M1 89.9999C8 77.3332 27.7 50.7999 50.5 45.9999C79 39.9999 95 41.9999 106 30.4999C117 18.9999 126 -3.50014 149 -3.50014C172 -3.50014 187 4.99991 193 8.49991"
                stroke="url(#paint0_linear_1028_603)"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                opacity="0.45"
                d="M150 74.5C138.667 74.1666 114.1 72.2 111 64.5C107 55.5 139.5 53.5 144.5 42.5C149.5 31.5 137.5 21.5 124 23.5C113 25 109.5 32 96 33.5C84.5 34.5 74 33 66 38.5C59.7376 42.8278 50.5 48.5 50.5 48.5"
                stroke="url(#paint1_linear_1028_603)"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                opacity="0.45"
                d="M156.5 87C144.833 85.3333 121.9 79.9 118.5 70.5C113.5 56 150.5 64 155 53C160 41 143.5 35 132 38.5C123.5 41.5 126.5 50 112 53.5C100.5 56.2 87.5 51.5 80.5 58C74.681 63.4344 65.3333 69.5 65.3333 69.5"
                stroke="url(#paint2_linear_1028_603)"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </g>
            <defs>
              <linearGradient
                id="paint0_linear_1028_603"
                x1="97.5"
                y1="-16.0001"
                x2="12"
                y2="84"
                gradientUnits="userSpaceOnUse"
              >
                <stop
                  stopColor={theme === "light" ? "#4A6CF7" : "#fff"}
                  stopOpacity="0.62"
                />
                <stop
                  offset="1"
                  stopColor={theme === "light" ? "#4A6CF7" : "#fff"}
                  stopOpacity="0"
                />
              </linearGradient>
              <linearGradient
                id="paint1_linear_1028_603"
                x1="115.5"
                y1="16.4999"
                x2="42.5"
                y2="66"
                gradientUnits="userSpaceOnUse"
              >
                <stop
                  stopColor={theme === "light" ? "#4A6CF7" : "#fff"}
                  stopOpacity="0.62"
                />
                <stop
                  offset="1"
                  stopColor={theme === "light" ? "#4A6CF7" : "#fff"}
                  stopOpacity="0"
                />
              </linearGradient>
              <linearGradient
                id="paint2_linear_1028_603"
                x1="121.5"
                y1="29"
                x2="48.5"
                y2="78.5"
                gradientUnits="userSpaceOnUse"
              >
                <stop
                  stopColor={theme === "light" ? "#4A6CF7" : "#fff"}
                  stopOpacity="0.62"
                />
                <stop
                  offset="1"
                  stopColor={theme === "light" ? "#4A6CF7" : "#fff"}
                  stopOpacity="0"
                />
              </linearGradient>
            </defs>
          </svg>
        </span>
      </div>
    </div>
  );
};

export default NewsLatterBox;
