import { defineStyleConfig } from '@chakra-ui/react';

export const Table = defineStyleConfig({
  variants: {
    'loan-table': {
      th: {
        color: 'neutral.500',
        fontFamily: 'Inter, sans-serif',
        fontSize: '16px',
        fontWeight: '600',
        lineHeight: '19px',
        letterSpacing: '0.04em',
        padding: '16px 20px',
        borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
        '&:first-of-type': {
          pl: 0
        }
      },
      td: {
        color: 'neutral.800',
        fontFamily: 'DM SANS, sans-serif',
        fontSize: '18px',
        fontWeight: '500',
        lineHeight: '150%',
        padding: '20px',
        borderY: '1px solid rgba(0, 0, 0, 0.08)',
        '&:first-of-type': {
          pl: 0
        }
      }
    }
  }
});
