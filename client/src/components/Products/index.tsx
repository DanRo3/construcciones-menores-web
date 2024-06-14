'use client'
import { CardProps } from "@/types/interfaces"
import Image from "next/image"

const cardsProducts: { url: string; title: string; basePrice: number; description: string; id: number }[] = [
    {
      url: "https://media.istockphoto.com/id/182177634/es/foto/almac%C3%A9n.jpg?s=612x612&w=0&k=20&c=soJ0qoGlKEecsKpJsPfLL8FbS2wSBHfZdMv2UkT3R7I=",
      title: "Cemento",
      basePrice: 20,
      description: "Todo tipo de cementos",
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
      url: "https://media.istockphoto.com/id/596042932/es/foto/conjunto-de-herramientas-de-trabajo-de-la-mano-sobre-fondo-gris.jpg?s=612x612&w=0&k=20&c=KFPIvtYGal_ZyadcyUY44Y28DbdfEcPVtjOXnl-Vn7E=",
      title: "Herramientas",
      basePrice: 0,
      description: "Todo tipo de herramientas",
      id: 3,
    },
    {
      url: "https://media.istockphoto.com/id/1440019701/es/foto/primer-plano-del-fontanero-reparando-el-lavabo-con-herramienta-en-el-ba%C3%B1o.jpg?s=612x612&w=0&k=20&c=oRJF-IwtxBUUff5PFEiNEOfCaDaueRngG5_oG79B3JM=",
      title: "Accesorios",
      basePrice: 0,
      description: "Todo tipos de accesorios",
      id: 4,
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
        <div  className="group relative flex h-64 shadow-6 dark:shadow-signUp items-end overflow-hidden rounded-lg bg-gray-100 p-4">
            <div
            style={{
                backgroundImage: `url(${card.url})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
            className="absolute inset-0 z-0 transition-transform duration-300 group-hover:scale-110"
            >

            </div>
    
            <div className="relative flex w-full flex-col rounded-lg bg-transparent backdrop-blur-md p-4 text-center">
                <span className="text-white">{card.title}</span>
                <span className="text-lg font-bold text-white lg:text-xl">{card.description}</span>
            </div>
        </div>
      </div>
    )
}


export default Produts
