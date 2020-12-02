import React from 'react';
import { Heading, Link } from '@chakra-ui/react';
import { InfoText } from '../components';
import NextLink from 'next/link';
import { _Index } from '../Routes';

const NotFound: React.FC = () => {
  return (
    <>
      <Heading mb={5} textAlign="center" fontSize={['2.4em', '3em', '3em', '3.5em']} as="h1">
        Page not found
      </Heading>
      <InfoText textAlign="center">
        Requested page was not found,{' '}
        <NextLink href={_Index}>
          <Link color="red.500">back to the home page? </Link>
        </NextLink>
      </InfoText>
    </>
  );
};

export default NotFound;
