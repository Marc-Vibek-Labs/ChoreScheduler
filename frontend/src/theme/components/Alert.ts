import { alertAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/react';

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(alertAnatomy.keys);

const baseStyle = definePartsStyle({
  container: {
    paddingInlineStart: '40px',
    paddingInlineEnd: '40px',
    pt: '32px',
    pb: '12px',
    fontSize: '24px',
    lineHeight: '120%'
  }
});

export const Alert = defineMultiStyleConfig({ baseStyle });
