import { defineStyleConfig } from '@chakra-ui/react';
import { FontFamily } from '../../utils/constants';

export const Button = defineStyleConfig({
  baseStyle: {
    bg: 'primary.500',
    color: '#fff',
    fontWeight: '600',
    borderRadius: '6px',
    _active: {
      bg: 'primary.700'
    },
    _hover: {
      bg: 'primary.600'
    },
    fontFamily: FontFamily.INTER
  },
  sizes: {
    lg: {
      h: '56px',
      minW: '173px',
      fontSize: '20px',
      lineHeight: '120%'
    }
  },
  variants: {
    secondary: {
      bg: 'secondary.400',
      color: 'secondary.900',
      _active: {
        bg: 'secondary.800'
      },
      _hover: {
        bg: 'secondary.600'
      },
      _disabled: {
        opacity: 1,
        bg: 'secondary.100',
        color: 'secondary.300',
        _hover: {
          bg: 'secondary.100 !important'
        }
      }
    },
    primary: {
      _loading: {
        bg: 'primary.200',
        color: 'primary.500',
        _hover: {
          bg: 'primary.200 !important',
          color: 'primary.500'
        }
      },
      _disabled: {
        bg: 'neutral.200',
        color: 'neutral.300'
      }
    },
    outline: {
      borderStyle: 'solid',
      borderWidth: '1.2px',
      borderColor: 'primary.500',
      borderRadius: '6px',
      bg: 'transparent',
      color: 'primary.500',
      _hover: {
        backgroundColor: 'rgba(0, 150, 123, 0.3)',
        borderColor: 'primary.600',
        color: 'primary.600'
      },
      _active: {
        backgroundColor: 'rgba(0, 150, 123, 0.3)',
        borderColor: 'primary.700',
        color: 'primary.700'
      }
    },
    primaryOutline: {
      border: 'solid 2px #00967b4d',
      bg: 'transparent',
      color: 'primary.500',
      _active: {
        bg: '#00967b4d',
        color: 'primary.700'
      },
      _hover: {
        border: 'solid 2px primary.700',
        bg: '#00967b4d',
        color: 'primary.700'
      }
    },
    secondaryOutline: {
      border: 'solid 2px #b15d00',
      bg: 'transparent',
      color: 'secondary.900',
      _active: {
        bg: '#00967b4d',
        color: 'secondary.700'
      },
      _hover: {
        border: 'solid 2px primary.700',
        bg: '#00000021'
      }
    },
    ghostOutline: {
      border: 'solid 1.2px #fff',
      bg: 'transparent',
      color: 'primary.500',
      _active: {
        bg: '#00967b4d',
        color: 'primary.700'
      },
      _hover: {
        bg: '#FFFFFF4D',
        color: 'primary.700'
      }
    },
    transparent: {
      bg: 'transparent',
      _active: {
        bg: 'transparent'
      },
      _hover: {
        bg: 'transparent'
      }
    },
    filter: {
      color: 'neutral.500',
      bg: 'neutral.200',
      fontFamily: FontFamily.INTER,
      fontWeight: 600,
      fontSize: '18px',
      lineHeight: '120%',
      px: '16px',
      py: '11px',
      h: '44px',
      _hover: {
        bg: 'neutral.250'
      },
      _pressed: {
        bg: 'neutral.300'
      },
      _active: {
        bg: 'primary.400',
        color: 'neutral.0'
      }
    }
  },
  defaultProps: {
    variant: 'primary'
  }
});
