import React from 'react';
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  UseDisclosureReturn,
  Text,
} from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import GoogleButton from './GoogleButton';

type Props = UseDisclosureReturn;

const LoginModal: React.FC<Props> = ({ isOpen, onClose }: Props) => (
  <Modal size="sm" closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
    <ModalOverlay />
    <ModalContent borderRadius="0.2em">
      <ModalHeader letterSpacing={'-.1rem'} textAlign="center" as="h2" fontSize="2.4em" fontWeight="800">
        Urlik
      </ModalHeader>
      <ModalCloseButton />
      <ModalBody fontSize="1.4em" fontWeight="300">
        Sign in using one of the methods listed below.
      </ModalBody>
      <GoogleButton
        onSuccess={onClose}
        render={(props) => (
          <Button
            onClick={props.onClick}
            disabled={props.disabled}
            isLoading={props.isLoading}
            borderRadius="0"
            m={5}
            height="2.8em"
            fontSize="1.4em"
            colorScheme="blue"
          >
            <Text mr={2}>Login With Google</Text> <FontAwesomeIcon icon={faGoogle} />
          </Button>
        )}
      />
    </ModalContent>
  </Modal>
);

export default LoginModal;
