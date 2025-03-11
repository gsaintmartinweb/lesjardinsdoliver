"use client";
import React from "react";
import FeatureCard from "./feature-card";
import { title } from "process";

const features = [
  {
    title: "Plantes d'intérieurs et d'extérieurs",
    description: "Discover our wide range of indoor and outdoor plants.",
    imageSrc: "https://source.unsplash.com/random/300x300?plants",
    isClickable: false,
  },
  {
    title: "Arbres, arbustes et arbres fruitiers",
    description: "Beautiful trees and fruit trees for your garden.",
    imageSrc: "https://source.unsplash.com/random/300x300?trees",
    isClickable: false,
  },
  {
    title: "Compositions et créations artisanales",
    description: "Handcrafted compositions and artisanal creations.",
    imageSrc: "https://source.unsplash.com/random/300x300?floral-arrangement",
    isClickable: false,
  },
  {
    title: "Petit terrariums",
    description: "Small terrariums to bring nature indoors.",
    imageSrc: "https://source.unsplash.com/random/300x300?terrarium",
    isClickable: false,
  },
  {
    title: "Mini jardins",
    description: "Miniature gardens to enhance your space.",
    imageSrc: "https://source.unsplash.com/random/300x300?mini-garden",
    isClickable: false,
  },
  {
    title: "Livraison Gratuite dès 20€ d'achat",
    description: "Enjoy free delivery on orders over 20€.",
    imageSrc: "https://source.unsplash.com/random/300x300?delivery",
    isClickable: false,
  },
  {
    title:
      "Cliquez ici pour voir ou me retrouver dans les marchés aux alentours",
    description: "Enjoy free delivery on orders over 20€.",
    imageSrc: "https://source.unsplash.com/random/300x300?delivery",
    isClickable: true,
  },
  {
    title: "Cliquez ici pour voir les plantes",
    description: "Enjoy free delivery on orders over 20€.",
    imageSrc: "https://source.unsplash.com/random/300x300?delivery",
    isClickable: true,
    link: "/plantes",
  },
  {
    title: "Cliquez ici pour voir mes créations",
    description: "Enjoy free delivery on orders over 20€.",
    imageSrc: "https://source.unsplash.com/random/300x300?delivery",
    isClickable: true,
    link: "/creations",
  },
];

const FeatureGallery: React.FC = () => {
  const handleCardClick = (title: string) => {
    const currentFeature = features.find((feature) => feature.title === title);

    if (currentFeature?.isClickable) {
      if (currentFeature?.link) {
        window.location.href = currentFeature?.link;
      }

      // open MOdal
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-2 p-6">
      {features.map((feature, index) => (
        <FeatureCard
          key={index}
          title={feature.title}
          onClick={() => handleCardClick(feature.title)}
          isClickable={feature.isClickable}
        />
      ))}
    </div>
  );
};

export default FeatureGallery;
