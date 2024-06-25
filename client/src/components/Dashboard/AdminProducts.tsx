"use client";
import CreateButton from "../Tables/CreateButton";
import ProductTable from "../Tables/ProductTable";

const AdminProducts = () => {
  const Producto: {
    url: string;
    title: string;
    price: number;
    id: number;
  }[] = [
    {
      url: "https://media.istockphoto.com/id/182177634/es/foto/almac%C3%A9n.jpg?s=612x612&w=0&k=20&c=soJ0qoGlKEecsKpJsPfLL8FbS2wSBHfZdMv2UkT3R7I=",
      title: "Cemento",
      price: 20,
      id: 1,
    },
    {
      url: "https://media.istockphoto.com/id/1328522914/es/foto/cubo-de-primer-plano-con-rodillo-de-pintura.jpg?s=612x612&w=0&k=20&c=2f4ELMPXkx49lWVorpPzP4ix-Xhcvd1rh4_z4wtp6EM=",
      title: "Pintura",
      price: 3,
      id: 2,
    },
    {
      url: "https://media.istockphoto.com/id/1253655358/es/foto/caja-con-un-destornillador-y-boquillas-sobre-un-fondo-rosa.jpg?s=612x612&w=0&k=20&c=XS5-ZLYmE1meaID-jnHN-4ru6p0TfUlpJuhG6LQSh-8=",
      title: "Kit de Herramientas",
      price: 48,
      id: 3,
    },
    {
      url: "https://media.istockphoto.com/id/140806786/es/foto/agua-vertiendo-de-ba%C3%B1o-moderno-faucet.jpg?s=612x612&w=0&k=20&c=M6f9QMu7tQwxYO5T51aCb_XUt0QYym3y5QsVuNSDr9s=",
      title: "Grifo de Baño",
      price: 12,
      id: 4,
    },
    {
      url: "https://media.istockphoto.com/id/1288466155/es/v%C3%ADdeo/herramienta-m%C3%BAltiple.jpg?s=640x640&k=20&c=cf3vkAjeS7GVgHD2g76t3gc_cXQ2FMkctZxd7ei4VAQ=",
      title: "Alicates Multifunción",
      price: 23,
      id: 5,
    },
  ];
  return (
    <>
      <ProductTable products={Producto} />
    </>
  );
};

export default AdminProducts;
