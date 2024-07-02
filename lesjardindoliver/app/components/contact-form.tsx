"use client";
import React, { useState } from 'react';
import axios from 'axios';
import MinimalistButton from './minimalist-button';

const ContactForm: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await axios.post('/api/contact', { name, email, message });

      if (res.status === 200) {
        console.log('Form submitted successfully');
        setName('');
        setEmail('');
        setMessage('');
      } else {
        console.error('Failed to submit the form');
      }
    } catch (error) {
      console.error('Failed to submit the form', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name" className='text-black'>Name</label>
        <input
          type="text"
          id="name"
          value={name}
          className='text-black'
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="email" className='text-black'>Email</label>
        <input
          type="email"
          id="email"
          className='text-black'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="message" className='text-black'>Message</label>
        <textarea
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          color='black'
          className='text-black'
          required
        />
      </div>
      <MinimalistButton label='Envoyer le message' type='submit' />
      <style jsx>{`
        form {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          max-width: 500px;
          margin: 0 auto;
        }

        label {
          margin-bottom: 0.5rem;
        }

        input, textarea {
          width: 100%;
          padding: 0.5rem;
          border: 1px solid #ccc;
          border-radius: 4px;
        }

        button {
          padding: 0.75rem;
          border: none;
          background-color: #0070f3;
          color: white;
          border-radius: 4px;
          cursor: pointer;
        }

        button:hover {
          background-color: #005bb5;
        }
      `}</style>
    </form>
  );
};

export default ContactForm;
