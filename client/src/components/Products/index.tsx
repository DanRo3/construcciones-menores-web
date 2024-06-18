'use client'
import { CardProps } from "@/types/interfaces"
import Image from "next/image"

const cardsProducts: { url: string; title: string; basePrice: number; description: string; id: number }[] = [
    {
      url: "https://media.istockphoto.com/id/182177634/es/foto/almac%C3%A9n.jpg?s=612x612&w=0&k=20&c=soJ0qoGlKEecsKpJsPfLL8FbS2wSBHfZdMv2UkT3R7I=",
      title: "Cemento",
      basePrice: 20,
      description: "Cemento de fundición",
      id: 1,
    },
    {
      url: "https://media.istockphoto.com/id/1328522914/es/foto/cubo-de-primer-plano-con-rodillo-de-pintura.jpg?s=612x612&w=0&k=20&c=2f4ELMPXkx49lWVorpPzP4ix-Xhcvd1rh4_z4wtp6EM=",
      title: "Pintura",
      basePrice: 3,
      description: "Pinturas de vinil de todos los colores",
      id: 2,
    },
    {
      url: "https://media.istockphoto.com/id/1253655358/es/foto/caja-con-un-destornillador-y-boquillas-sobre-un-fondo-rosa.jpg?s=612x612&w=0&k=20&c=XS5-ZLYmE1meaID-jnHN-4ru6p0TfUlpJuhG6LQSh-8=",
      title: "Kit de Herramientas",
      basePrice: 48,
      description: "Conjunto completo de herramientas para trabajos de construcción",
      id: 3,
    },
    {
      url: "https://media.istockphoto.com/id/140806786/es/foto/agua-vertiendo-de-ba%C3%B1o-moderno-faucet.jpg?s=612x612&w=0&k=20&c=M6f9QMu7tQwxYO5T51aCb_XUt0QYym3y5QsVuNSDr9s=",
      title: "Grifo de Baño",
      basePrice: 12,
      description: "Grifos de baño de alta calidad para instalaciones modernas",
      id: 4,
    },
    {
      url: "https://media.istockphoto.com/id/1288466155/es/v%C3%ADdeo/herramienta-m%C3%BAltiple.jpg?s=640x640&k=20&c=cf3vkAjeS7GVgHD2g76t3gc_cXQ2FMkctZxd7ei4VAQ=",
      title: "Alicates Multifunción",
      basePrice: 23,
      description: "Alicates diseñados para diversas aplicaciones de instalación y reparación",
      id: 5,
    },
    
  ];

const Produts = () => {
  return (
    <div className="py-6 sm:py-8 lg:py-12">
        <div className="flex w-full text-center items-center justify-center mb-10">
            <span className="font-semibold text-5xl">
            Nuestros productos disponibles
            </span>
        </div>
        <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
            <div className="grid gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-3 xl:grid-cols-4">
                {cardsProducts.map((card)=>(
                    <CardProduct key={card.id} card={card}/>
                ))}            
                
            </div>
        </div>
    </div>
  )
}


const CardProduct:React.FC<CardProps> = ({ card }) => {
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
            >
            </div>
          </div>

          <div>
            <div className="hover:gray-800 mb-1 text-gray-500 dark:text-white transition duration-100 lg:text-lg">{card.title}</div>

            <div className="flex items-end gap-2">
              <span className="font-bold text-green lg:text-lg">${card.basePrice}</span>
            </div>
          </div>
        </div>
      </div>
    )
}


export default Produts
