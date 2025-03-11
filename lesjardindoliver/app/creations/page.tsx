// app/creations/page.tsx

import React from "react";
import { Layout } from "../components/layout";

import PhotoGallery from "../components/image-gallery";

const Creations: React.FC = () => {
  return (
    <Layout>
      <div>
        <PhotoGallery />
      </div>
    </Layout>
  );
};

export default Creations;
