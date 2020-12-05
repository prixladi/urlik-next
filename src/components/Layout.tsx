import React from 'react';
import { Box, Container } from '@chakra-ui/react';
import { Footer, NavBar } from '../components';

type Props = {
  children: React.ReactNode;
};

const Layout: React.FC<Props> = ({ children }: Props) => (
  <Box ml={['0.5em', 0, 0, 0]} mr={['0.5em', 0, 0, 0]}>
    <Container mb={[100, 120, 150, 190]} centerContent>
      <NavBar />
    </Container>
    <Container padding={0} maxW={[330, 480, 700, 770]}>
      {children}
    </Container>
    <Footer />
  </Box>
);

export default Layout;
