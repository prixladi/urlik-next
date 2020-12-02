import React from 'react';
import { Container } from '@chakra-ui/react';
import { NavBar } from '../components';

type Props = {
  children: React.ReactNode;
};

const Layout: React.FC<Props> = ({ children }: Props) => (
  <Container maxW="xl">
    <Container mb={[100, 120, 150, 190]} maxW="lg" centerContent>
      <NavBar />
    </Container>
    <Container padding={0} maxW={[330, 480, 700, 770]}>
      {children}
    </Container>
  </Container>
);

export default Layout;
