import React from 'react';
import * as CSS from 'csstype';
import { Text } from '@chakra-ui/react';

type Props = {
  textAlign?: CSS.Property.TextAlign;
  children: React.ReactNode;
};

const InfoText: React.FC<Props> = ({ textAlign, children }: Props) => (
  <Text textAlign={textAlign ?? 'justify'} fontSize={['1.3em', '1.4em', '1.4em', '1.5em']} fontWeight="300">
    {children}
  </Text>
);

export default InfoText;
