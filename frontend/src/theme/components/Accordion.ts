import { accordionAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/react';
const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(accordionAnatomy.keys);

const baseStyle = definePartsStyle({
  panel: {
    p: 0,
    paddingInlineStart: 0,
    paddingInlineEnd: 0
  },
  container: {
    border: 0,
    width: '100%',
    padding: 0
  },
  button: {
    padding: 0,
    border: 'none',
    _hover: {
      backgroundColor: 'transparent'
    }
  }
});

export const Accordion = defineMultiStyleConfig({ baseStyle });
