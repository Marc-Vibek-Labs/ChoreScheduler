import { switchAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/react';

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(switchAnatomy.keys);

const baseStyle = definePartsStyle({
  container: {},
  thumb: {
    h: '18px',
    w: '18px',
    boxShadow: '0px 2px 2px rgba(0, 0, 0, 0.12)'
  },
  track: {
    h: '18px',
    w: '32px'
  }
});

export const Switch = defineMultiStyleConfig({ baseStyle });
