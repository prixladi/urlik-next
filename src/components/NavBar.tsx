import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button, Flex, Heading, useDisclosure } from '@chakra-ui/react';
import LoginModal from './LoginModal';
import { authorityManager } from '../clients';
import { useRouter } from 'next/router';
import { _Index, _Management } from '../Routes';

const ProfileSide = () => {
  const disclosure = useDisclosure();
  const router = useRouter();
  const [loggedIn, setLoggedIn] = useState(null as boolean | null);

  useEffect(() => {
    setLoggedIn(authorityManager.isUserLoggedIn());
  }, [router]);

  // Don't render on server, because of google button
  if (loggedIn == null) {
    return null;
  }

  if (loggedIn) {
    return (
      <>
        <Flex align="right" mr={['1em', 0, 0, 0]}>
          <Button
            colorScheme="green"
            borderRadius="0"
            onClick={() => {
              router.push(_Management);
            }}
          >
            Management
          </Button>
        </Flex>
      </>
    );
  }

  return (
    <>
      <Flex align="right" mr={['1em', 0, 0, 0]}>
        <Button colorScheme="blue" borderRadius="0" onClick={disclosure.onOpen}>
          Sign in
        </Button>
      </Flex>
      <LoginModal {...disclosure} />
    </>
  );
};

const NavBar: React.FC = () => (
  <>
    <Flex
      w={[330, 480, 700, 770]}
      position="fixed"
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      pt="1.5rem"
      bg="transparent"
    >
      <Flex align="left" ml={['1em', 0, 0, 0]}>
        <Heading as="h2" size="xl" letterSpacing={'-.1rem'}>
          <Link href={_Index}>Urlik</Link>
        </Heading>
      </Flex>

      <ProfileSide />
    </Flex>
  </>
);

export default NavBar;
