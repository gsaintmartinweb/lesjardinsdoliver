// components/EmailTemplate.tsx
import React from 'react';
import { Html, Head, Body, Container, Heading, Text } from '@react-email/components';

interface EmailTemplateProps {
  name: string;
  email: string;
  message: string;
}

const EmailTemplate: React.FC<EmailTemplateProps> = ({ name, email, message }) => {
  return (
    <Html>
      <Head />
      <Body>
        <Container>
          <Heading>Bonjour Sylvie,</Heading>
          <Text>Vous avez une nouvelle demande de contact depuis le site le jardin d Oliver:</Text>
          <Text><strong>Nom:</strong> {name}</Text>
          <Text><strong>Email:</strong> {email}</Text>
          <Text><strong>Message:</strong> {message}</Text>
        </Container>
      </Body>
    </Html>
  );
};

export default EmailTemplate;
