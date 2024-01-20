import { defineStyleConfig } from '@chakra-ui/react';

export const Badge = defineStyleConfig({
  baseStyle: {
    padding: '6px 14px',
    borderRadius: '16px',
    width: '146px',
    textAlign: 'center',
    fontFamily: 'Inter, sans-serif',
    fontSize: '18px',
    fontWeight: '600',
    lineHeight: '19px',
    letterSpacing: '0.04em',
    textTransform: 'uppercase'
  },
  sizes: {
    sm: {
      fontSize: '12px',
      lineHeight: '120%',
      px: '12px',
      py: '4px',
      h: '22px',
      minW: '99px',
      w: 'auto'
    }
  },
  variants: {
    approved: {
      color: 'positive.700',
      backgroundColor: 'positive.100'
    },
    pending: {
      color: 'secondary.900',
      backgroundColor: 'secondary.200',
      w: 'auto'
    },
    declined: {
      color: 'negative.600',
      backgroundColor: 'negative.50'
    },
    completed: {
      color: 'primary.700',
      backgroundColor: 'primary.100'
    },
    draft: {
      color: 'neutral.600',
      backgroundColor: 'neutral.200'
    },
    awaiting: {
      color: 'warning.700',
      backgroundColor: 'warning.200'
    },
    submitted: {
      color: 'info.600',
      backgroundColor: 'info.100'
    },
    active: {
      color: 'info.700',
      backgroundColor: 'info.100'
    }
  }
});
