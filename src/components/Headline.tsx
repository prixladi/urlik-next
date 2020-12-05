import { Heading } from '@chakra-ui/react';
import React from 'react';

type Props = {
  children: React.ReactNode;
};

const Headline: React.FC<Props> = ({ children }: Props) => (
  <Heading mb={5} textAlign="center" fontSize={['2.4em', '3em', '3em', '3.5em']} as="h1">
    {children}
  </Heading>
);

export default Headline;
