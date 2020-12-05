import { Heading, Link } from '@chakra-ui/react';
import React from 'react';
import { Index } from '../Routes';

const LogoLink: React.FC = () => (
  <Heading as="h2" size="xl" letterSpacing={'-.1rem'}>
    <Link href={Index}>Urlik</Link>
  </Heading>
);

export default LogoLink;
