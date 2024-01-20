import { defineStyleConfig } from '@chakra-ui/react';

export const Checkbox = defineStyleConfig({
  baseStyle: {
    control: {
      backgroundColor: 'neutral.0',
      border: '1px solid #bdc1c7',
      borderRadius: '4px',
      width: '24px',
      height: '24px',
      fontFamily: 'DM Sans',
      fontWeight: '400',
      fontSize: '18px',
      _groupHover: {
        backgroundColor: 'primary.500'
      },
      _checked: {
        backgroundColor: 'primary.500',
        borderColor: 'none',
        _hover: {
          backgroundColor: 'primary.500',
          borderColor: 'none'
        }
      }
    }
  }
});
