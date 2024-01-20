import { defineStyleConfig } from '@chakra-ui/react';

export const Tabs = defineStyleConfig({
  variants: {
    primary: {
      tab: {
        color: 'neutral.500',
        fontFamily: 'Inter',
        fontWeight: '600',
        fontSize: '18px',
        bg: 'neutral.200',
        borderRadius: '30px',
        _selected: {
          color: 'neutral.0',
          bg: 'primary.500'
        }
      },
      tablist: {
        gap: '8px'
      },
      tabpanel: {
        padding: 0,
        gap: '8px',
        display: 'flex',
        flexDirection: 'column',
        marginTop: '20px'
      }
    }
  }
});
