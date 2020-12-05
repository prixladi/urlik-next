import React, { useEffect, useState } from 'react';
import { Button, Flex, Menu, MenuButton, MenuItem, MenuList, Text, useDisclosure } from '@chakra-ui/react';
import LoginModal from './LoginModal';
import { authorityManager } from '../clients';
import { useRouter } from 'next/router';
import { Management } from '../Routes';
import LogoLink from './LogoLink';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { authService } from '../services';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt, faTasks } from '@fortawesome/free-solid-svg-icons';

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
      <Flex align="right" mr={['0.5em', 0, 0, 0]}>
        <Menu>
          <MenuButton as={Button} colorScheme="green" borderRadius="0" rightIcon={<ChevronDownIcon />}>
            Logged In
          </MenuButton>
          <MenuList>
            <MenuItem
              onClick={() => {
                router.push(Management);
              }}
            >
              <Flex gridGap="0.9em">
                <FontAwesomeIcon size="lg" icon={faTasks} /> <Text>Management</Text>
              </Flex>
            </MenuItem>

            <MenuItem
              onClick={async () => {
                await authService.logout(router);
              }}
            >
              <Flex gridGap="0.9em">
                <FontAwesomeIcon size="lg" icon={faSignOutAlt} /> <Text>Sign out</Text>
              </Flex>
            </MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    );
  }

  return (
    <>
      <Flex align="right" mr={['0.5em', 0, 0, 0]}>
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
        <LogoLink />
      </Flex>

      <ProfileSide />
    </Flex>
  </>
);

export default NavBar;
