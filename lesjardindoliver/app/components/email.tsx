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
          <Heading>Hello,</Heading>
          <Text>You have a new contact form submission:</Text>
          <Text><strong>Name:</strong> {name}</Text>
          <Text><strong>Email:</strong> {email}</Text>
          <Text><strong>Message:</strong> {message}</Text>
        </Container>
      </Body>
    </Html>
  );
};

export default EmailTemplate;
