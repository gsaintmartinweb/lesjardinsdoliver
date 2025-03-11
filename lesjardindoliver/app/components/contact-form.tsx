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
      <div className=" absolute top-20 right-2 w-auto h-36 bg-slate-100 rounded-md p-4 text-amber-900">
        <p> Sylvie Roux</p>
        <div className="flex items-center"> <svg
          width="20"
          height="20"
          viewBox="0 0 15 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4 2.5C4 2.22386 4.22386 2 4.5 2H10.5C10.7761 2 11 2.22386 11 2.5V12.5C11 12.7761 10.7761 13 10.5 13H4.5C4.22386 13 4 12.7761 4 12.5V2.5ZM4.5 1C3.67157 1 3 1.67157 3 2.5V12.5C3 13.3284 3.67157 14 4.5 14H10.5C11.3284 14 12 13.3284 12 12.5V2.5C12 1.67157 11.3284 1 10.5 1H4.5ZM6 11.65C5.8067 11.65 5.65 11.8067 5.65 12C5.65 12.1933 5.8067 12.35 6 12.35H9C9.1933 12.35 9.35 12.1933 9.35 12C9.35 11.8067 9.1933 11.65 9 11.65H6Z"
            fill="currentColor"
            fillRule="evenodd"
            clipRule="evenodd"
          ></path>
        </svg>
        <p> 06 06 06 06 06</p></div>
       
      </div>
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
