import { extendTheme } from '@chakra-ui/react';

const fonts = { mono: '\'Menlo\', monospace' };

const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: '#ffffff',
      },
    },
  },
  fonts,
});

export default theme;
