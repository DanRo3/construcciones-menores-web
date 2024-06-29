"use client";
import { useAppSelector } from "@/hooks/useStore";
import { CardProps, Producto } from "@/types/interfaces";
import Image from "next/image";

const Produts = () => {
  const cardsProducts: Producto[] = useAppSelector(
    (state) => state.productClient.products
  );
  return (
    <div className="py-6 sm:py-8 lg:py-12">
      <div className="flex w-full text-center items-center justify-center mb-10">
        <span className="font-semibold text-5xl">
          Nuestros productos disponibles
        </span>
      </div>
      <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
        <div className="grid gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-3 xl:grid-cols-4">
          {cardsProducts.map((card) => (
            <CardProduct key={card.id} card={card} />
          ))}
        </div>
      </div>
    </div>
  );
};

const CardProduct: React.FC<CardProps> = ({ card }) => {
  return (
    <div key={card.id}>
      <div>
        <div className="group relative mb-2 block h-80 overflow-hidden rounded-lg bg-gray-100 lg:mb-3">
          <div
            style={{
              backgroundImage: `url(${card.url})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            className="h-full w-full object-cover object-center transition duration-200 group-hover:scale-110"
          ></div>
        </div>

        <div>
          <div className="hover:gray-800 mb-1 text-gray-500 dark:text-white transition duration-100 lg:text-lg">
            {card.title}
          </div>

          <div className="flex items-end gap-2">
            <span className="font-bold text-green lg:text-lg">
              ${card.price}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Produts;
