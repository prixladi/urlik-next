import { Box, Container, Link, Text, Flex } from '@chakra-ui/react';
import React from 'react';
import LogoLink from './LogoLink';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faGithub, faFacebook, faInstagram, faPinterest } from '@fortawesome/free-brands-svg-icons';

const Footer: React.FC = () => (
  <Box mb={'2em'} mt={'6em'} w={'100%'}>
    <hr />
    <Container mt={'2em'} centerContent>
      <LogoLink /> <br />
      <Flex gridGap="1em">
        <Link isExternal={true} href="https://twitter.com">
          <FontAwesomeIcon size="3x" icon={faTwitter} />
        </Link>
        <Link isExternal={true} href="https://facebook.com">
          <FontAwesomeIcon size="3x" icon={faFacebook} />
        </Link>
        <Link isExternal={true} href="https://intagram.com">
          <FontAwesomeIcon size="3x" icon={faInstagram} />
        </Link>
        <Link isExternal={true} href="https://pinterest.com">
          <FontAwesomeIcon size="3x" icon={faPinterest} />
        </Link>
        <Link isExternal={true} href="https://github.com">
          <FontAwesomeIcon size="3x" icon={faGithub} />
        </Link>
      </Flex>
      <br />
      <Text fontSize={['1.em', '1.1em', '1.1em', '1.2em']} fontWeight="300">
        Copyright 2020 ©{' '}
        <Link isExternal={true} href="http://ladislavprix.cz">
          Ladislav Prix
        </Link>
      </Text>
    </Container>
  </Box>
);

export default Footer;
