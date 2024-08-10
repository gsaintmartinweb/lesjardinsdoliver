// app/creations/page.tsx

import React from "react";
import { Layout } from "../components/layout";
import PhotoGrid, { Creation } from "../components/photogrid";



const Creations: React.FC = () => {
  const size = 500;
  const creations: Creation[] = [
    {
      src: "/images/head.JPG",
      title: "L'olivier",
      description:
        "Olivier (Olea europaea) - L'emblème du sud de la France, très résistant à la sécheresse.",
      advice: "Les oliviers sont un plante aromatique qui se trouve dans les régions montagneuses de la France. Ils sont souvent utilisés pour fabriquer des vins, des cidres et des jus de fruits. Ils sont également utilisés pour préparer des sauces et des condiments.",
      width: size,
      height: size,
      price: "1€",
    },
    {
      src: "/images/IMG_5036.JPG",
      title: "Menthe",
      description: "Menthe verte (Mentha spicata) - Communément utilisée dans la cuisine pour les infusions, sauces, et desserts.",
      advice: "Le cyprès est un plante aromatique qui se trouve dans les régions montagneuses de la France. Il est souvent utilisé pour fabriquer des vins, des cidres et des jus de fruits. Il est également utilisé pour préparer des sauces et des condiments.",
      width: size,
      height: size,
      price: "10€",
    },
    {
      src: "/images/IMG_5037.JPG",
      title: "Romarin",
      description: "Romarin (Rosmarinus officinalis) - Une plante aromatique résistante à la sécheresse.",
      advice: "Le romarin est un plante aromatique résistante à la sécheresse. Il est souvent utilisé pour fabriquer des vins, des cidres et des jus de fruits. Il est également utilisé pour préparer des sauces et des condiments.",
      width: size,
      height: size,
      price: "12€",
    },
    {
      src: "/images/IMG_5038.JPG",
      title: "Mimosa",
      description: "Mimosa (Acacia dealbata) - Connu pour ses fleurs jaunes parfumées en hiver.",
      advice: "La mimosa est une plante aromatique qui se trouve dans les régions montagneuses de la France. Elle est souvent utilisée pour fabriquer des vins, des cidres et des jus de fruits. Elle est également utilisée pour préparer des sauces et des condiments.",
      width: size,
      height: size,
      price: "10€",
    },
    {
      src: "/images/IMG_5039.JPG",
      title: "Thym",
      description: "Thym (Thymus vulgaris) - Une autre herbe méditerranéenne couramment cultivée.",
      advice: "Le thym est une herbe méditerranéenne couramment cultivée. Elle est souvent utilisée pour fabriquer des vins, des cidres et des jus de fruits. Elle est également utilisée pour préparer des sauces et des condiments.",
      width: size,
      height: size,
      price: "10€",
    },
    {
      src: "/images/IMG_5040.JPG",
      title: "Laurier-rose",
      description: "Laurier-rose (Nerium oleander) - Très populaire pour ses fleurs colorées, bien que toxique.",
      advice: "Le laurier-rose est une plante aromatique qui se trouve dans les régions montagneuses de la France. Il est souvent utilisé pour fabriquer des vins, des cidres et des jus de fruits. Il est également utilisé pour préparer des sauces et des condiments.",
      width: size,
      height: size,
      price: "10€",
    },
    {
      src: "/images/IMG_5041.JPG",
      title: "Bougainvillier",
      description: "Bougainvillier (Bougainvillea) - Plante grimpante avec des bractées colorées.",
      advice: "Le bougainvillier est une plante aromatique qui se trouve dans les régions montagneuses de la France. Il est souvent utilisé pour fabriquer des vins, des cidres et des jus de fruits. Il est également utilisé pour préparer des sauces et des condiments.",
      width: size,
      height: size,
      price: "10€",
    },
    {
      src: "/images/IMG_5042.JPG",
      title: "Jasmin",
      description: "Jasmin (Jasminum officinale, Jasminum grandiflorum) - Connu pour ses fleurs blanches et son parfum enivrant.",
      advice: "Le jasmin est une plante aromatique qui se trouve dans les régions montagneuses de la France. Il est souvent utilisé pour fabriquer des vins, des cidres et des jus de fruits. Il est également utilisé pour préparer des sauces et des condiments.",
      width: size,
      height: size,
      price: "110€",
    },
    // Add more photos as needed
  ];
  return (
    <Layout>
      <div>
        {/*         <h1 className="text-2xl font-bold text-center text-black my-8">Mes créations</h1>
         */}{" "}
        <PhotoGrid creations={creations} />
      </div>
    </Layout>
  );
};

export default Creations;
