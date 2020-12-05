import React from 'react';
import { Link } from '@chakra-ui/react';
import { Headline, InfoText } from '../components';
import NextLink from 'next/link';
import { Index } from '../Routes';

const Default: React.FC = () => {
  return (
    <>
      <Headline>Invalid URL</Headline>
      <InfoText textAlign="center">
        You used invalid URL shortcut, keep in mind that Urlik URLs are case sensitive,{' '}
        <NextLink href={Index}>
          <Link color="red.500">back to the home page? </Link>
        </NextLink>
      </InfoText>
    </>
  );
};

export default Default;
