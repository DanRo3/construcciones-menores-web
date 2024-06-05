'use client';
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

// Definición del tipo para los datos de la imagen
interface SquareData {
  id: number;
  src: string;
}

const shuffle = (array: SquareData[]): SquareData[] => {
  let currentIndex = array.length,
    randomIndex;

  while (currentIndex!== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
};


const squareData: SquareData[] = [
    {
      id: 1,
      src: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 2,
      src: "https://plus.unsplash.com/premium_photo-1682366278869-6c01b1517319?q=80&w=1587&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 3,
      src: "https://media.istockphoto.com/id/1010660296/es/foto/trabajador-de-la-construcci%C3%B3n-del.webp?b=1&s=170667a&w=0&k=20&c=zNzvfYyMqJfx8-wmL4huW6uOYyBEx1N7H4HUL83UgZ8=",
    },
    {
      id: 4,
      src: "https://media.istockphoto.com/id/1456256926/es/foto/trabajadores-de-la-construcci%C3%B3n-instalando-aislamiento.webp?b=1&s=170667a&w=0&k=20&c=aUZlq457K7vA9rgJy1Jayuq_srxtzRFMKzt-ZPNCDKI=",
    },
    {
      id: 5,
      src: "https://media.istockphoto.com/id/534500443/es/foto/colocaci%C3%B3n-de-baldosas-de-cer%C3%A1mica.webp?b=1&s=170667a&w=0&k=20&c=WLw9V3cS4lrXXhWqFmT-DSSpG4hvCnQ6iYtkjdjmFdk=",
    },
    {
      id: 6,
      src: "https://media.istockphoto.com/id/1311583923/es/foto/dise%C3%B1o-de-interiores-arquitectura-computadora-gener%C3%B3-imagen-de-ba%C3%B1o-visualizaci%C3%B3n.webp?b=1&s=170667a&w=0&k=20&c=8cfLduFWuC2VbxxCQojamC_20nosNGpz9R-JJPx6gVo=",
    },
    {
      id: 7,
      src: "https://media.istockphoto.com/id/492365437/es/foto/renovaci%C3%B3n-de-ba%C3%B1o.webp?b=1&s=170667a&w=0&k=20&c=auhUxVkUYW0F-CZoirR5cmT8OqxPC1T9IiF5leRWjv0=",
    },
    {
      id: 8,
      src: "https://plus.unsplash.com/premium_photo-1663091257768-8f089bf6b4fa?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8Y29uc3RydWNjaW9uZXMlMjBkZSUyMGJhJUMzJUIxb3N8ZW58MHx8MHx8fDA%3D",
    },
    {
      id: 9,
      src: "https://media.istockphoto.com/id/1487951578/es/foto/contratista-e-ingeniero-d%C3%A1ndose-la-mano-para-acordar-construir-una-casa-o-edificio-el.webp?b=1&s=170667a&w=0&k=20&c=D4qb0y6tv6gIyLdGH1C1lpVRm7Z17nInBlWYo0AMLgI=",
    },
    {
      id: 10,
      src: "https://media.istockphoto.com/id/1309112929/es/foto/renovaci%C3%B3n-de-la-habitaci%C3%B3n.webp?b=1&s=170667a&w=0&k=20&c=F4LgYGB3gQ6VFQ2fpS4_z46AaGZuVF5d-qFZo6UCvTU=",
    },
    {
      id: 11,
      src: "https://media.istockphoto.com/id/1254043859/photo/electrician-builder-at-work-installation-of-lamps-at-height-professional-in-overalls-with-an.jpg?s=612x612&w=0&k=20&c=VJc48Oirq2FoLSxpvq9zuirPlj7_-gteZ41nGKQXHvg=",
    },
    {
      id: 12,
      src: "https://media.istockphoto.com/id/913566768/photo/female-engineer-working-at-a-construction-site.jpg?s=612x612&w=0&k=20&c=5MAEHwYdi4XTE7XsluFRNweTy2rXYJznACo--UCQabI=",
    },
    {
      id: 13,
      src: "https://media.istockphoto.com/id/2154426481/photo/home-ownership-talking-and-looking-the-blueprint-in-their-house-under-construction.jpg?s=612x612&w=0&k=20&c=DaRSIQdn4zeL13XY7qsgI04vjHP-bwHtzFHgsz7SSgU=",
    },
    {
      id: 14,
      src: "https://media.istockphoto.com/id/1464814939/es/foto/instalaci%C3%B3n-de-pisos-de-remodelaci%C3%B3n-de-viviendas.webp?b=1&s=170667a&w=0&k=20&c=YqTSCcEHs6lqhCLM3uDxNffFEFdRIf02aeuD_eR0gF8=",
    },
    {
      id: 15,
      src: "https://media.istockphoto.com/id/1423549539/es/foto/el-hombre-est%C3%A1-instalando-el-tabl%C3%B3n-de-madera-del-suelo-de-parquet.webp?b=1&s=170667a&w=0&k=20&c=Qx2O_gmoenH2dQa4gS4Bxkc_GBmcaQ3W4dl7f4YZMgA=",
    },
    {
      id: 16,
      src: "https://media.istockphoto.com/id/1158040145/es/foto/azulejo-cer%C3%A1mica-azulejo-colocando-baldosas-de-pared-cer%C3%A1mica-en-posici%C3%B3n-sobre-adhesivo-con.webp?b=1&s=170667a&w=0&k=20&c=VGrzNMzTYW1NRrVCky46cFp-DD3JbGoYeIq1A5XuoFE=",
    },
  ];

const generateSquares = (): JSX.Element[] => {
  return shuffle(squareData).map((sq) => (
    <motion.div
      key={sq.id}
      layout
      transition={{ duration: 1.5, type: "spring" }}
      className="w-full h-full"
      style={{
        backgroundImage: `url(${sq.src})`,
        backgroundSize: "cover",
      }}
    />
  ));
};

export const ShuffleGrid: React.FC = () => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [squares, setSquares] = useState<JSX.Element[]>(generateSquares());

  useEffect(() => {
    shuffleSquares();

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const shuffleSquares = () => {
    setSquares(generateSquares());

    timeoutRef.current = setTimeout(shuffleSquares, 3000);
  };

  return (
    <div className="grid grid-cols-4 grid-rows-4 h-[450px] gap-1">
      {squares.map((sq) => sq)}
    </div>
  );
};
