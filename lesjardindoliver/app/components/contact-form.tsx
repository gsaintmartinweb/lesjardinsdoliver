"use client";
// app/contact/page.tsx
import React, { useState } from "react";
import MinimalistButton from "../components/minimalist-button";
import { toast } from "sonner";

const ContactForm: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, message }),
      });

      if (res.status === 200) {
        toast.success("Message envoyé avec succès");
        setName("");
        setEmail("");
        setMessage("");
        const data = await res.json();
        return Response.json(data);
      } else {
        toast.error("Erreur lors de l'envoi du message");
      }
    } catch (error) {
      console.error("Error submitting the form:", error);
      toast.error("Erreur lors de l'envoi du message");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[url('/images/bg-2.jpeg')] bg-cover">
      <div className="bg-white/30 backdrop-blur-md p-8 rounded-lg shadow-lg max-w-lg w-full">
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name" className="block text-black mb-2">
              Nom
            </label>
            <input
              type="text"
              id="name"
              value={name}
              className="w-full p-2 border border-gray-300 rounded-md text-black"
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mt-4">
            <label htmlFor="email" className="block text-black mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              className="w-full p-2 border border-gray-300 rounded-md text-black"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mt-4">
            <label htmlFor="message" className="block text-black mb-2">
              Message
            </label>
            <textarea
              id="message"
              value={message}
              className="w-full p-2 border border-gray-300 rounded-md text-black"
              onChange={(e) => setMessage(e.target.value)}
              required
            />
          </div>
          <div className="mt-6">
            <MinimalistButton
              label="Envoyer le message"
              type="submit"
              disabled={loading}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
