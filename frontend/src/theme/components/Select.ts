import { defineStyleConfig } from '@chakra-ui/react';

export const Select = defineStyleConfig({
  variants: {
    primary: {
      field: {
        padding: '9px 12px 9px 16px',
        height: 'auto',
        bg: 'neutral.0',
        lineHeight: 4,
        fontSize: '16px',
        borderRadius: '4px',
        border: '1px solid #BDC1C7',
        _focus: {
          border: '1px solid #00967B',
          color: 'neutral.800'
        },
        _hover: {
          borderColor: 'teal.300'
        }
      },
      _option: {
        appearance: 'none'
      },
      icon: {
        color: 'neutral.800'
      }
    }
  },
  defaultProps: {
    variant: 'primary'
  }
});
