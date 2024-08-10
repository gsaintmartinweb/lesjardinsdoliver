// app/contact/page.tsx

import React from "react";
import ContactForm from "../components/contact-form";
import { Layout } from "../components/layout";

const Contact: React.FC = () => {
  return (
    <Layout>
        <ContactForm />
    </Layout>
  );
};

export default Contact;
