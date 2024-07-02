// app/about/page.tsx

import React from "react";
import { Layout } from "../components/layout";
import PhotoGrid from "../components/photogrid";

const About: React.FC = () => {
  const size = 500;
  const photos = [
    {
      src: "/images/straws.jpeg",
      description: "Photo 1 description is taht can be a long text withoiut any issues ",
      width: size,
      height: size,
    },
    {
      src: "/images/cherry.jpeg",
      description: "Photo 2 description",
      width: size,
      height: size,
    },
    {
      src: "/images/lemon.jpeg",
      description: "Photo 3 description",
      width: size,
      height: size,
    },
    {
      src: "/images/fruit.jpeg",
      description: "Photo 4 description",
      width: size,
      height: size,
    },
    {
      src: "/images/orange-flower.jpeg",
      description: "Photo 4 description",
      width: size,
      height: size,
    },
    {
      src: "/images/red-flower.jpeg",
      description: "Photo 4 description",
      width: size,
      height: size,
    },
    {
      src: "/images/blue-flower.jpeg",
      description: "Photo 4 description",
      width: size,
      height: size,
    },
    {
      src: "/images/orange-plant.jpeg",
      description: "Photo 4 description",
      width: size,
      height: size,
    },
    // Add more photos as needed
  ];
  return (
    <Layout>
      <div>
{/*         <h1 className="text-2xl font-bold text-center text-black my-8">Mes créations</h1>
 */}        <PhotoGrid photos={photos} />
      </div>
    </Layout>
  );
};

export default About;
