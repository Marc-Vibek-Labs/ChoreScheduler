import { defineStyleConfig } from '@chakra-ui/react';

export const Heading = defineStyleConfig({
  variants: {
    displayOne: {
      fontSize: '52px',
      lineHeight: '120%',
      letterSpacing: '-0.02em'
    },
    displayTwo: {
      fontSize: '44px',
      lineHeight: '120%',
      letterSpacing: '-0.04em'
    },
    displayThree: {
      fontSize: '38px',
      lineHeight: '110%',
      letterSpacing: '-0.02em'
    },
    headlineOne: {
      fontSize: '34px',
      lineHeight: '120%',
      letterSpacing: '-0.02em'
    },
    headlineTwo: {
      fontSize: '28px',
      lineHeight: '120%',
      letterSpacing: '-0.02em'
    },
    titleOne: {
      fontSize: '24px',
      lineHeight: '120%',
      letterSpacing: '-0.02em'
    },
    titleTwo: {
      fontSize: '20px',
      lineHeight: '120%',
      letterSpacing: '-0.02em'
    },
    titleThree: {
      fontSize: '18px',
      lineHeight: '120%',
      letterSpacing: '-0.02em'
    },
    titleFour: {
      fontSize: '10px',
      lineHeight: '120%',
      letterSpacing: '-0.02em'
    },
    subtitleSemiBold: {
      fontSize: '14px',
      lineHeight: '120%',
      letterSpacing: '-0.02em'
    }
  }
});

export const Text = defineStyleConfig({
  variants: {
    body: {
      fontSize: '18px',
      lineHeight: '160%'
    },
    bodyTwo: {
      fontSize: '16px',
      lineHeight: '150%'
    },
    overlineOne: {
      fontSize: '16px',
      lineHeight: '19px',
      letterSpacing: '0.04em'
    },
    overlineTwo: {
      fontSize: '12px',
      lineHeight: '15px',
      letterSpacing: '0.04em'
    },
    caption: {
      fontSize: '14px',
      lineHeight: '18px',
      fontFamily: 'DM Sans',
      fontWeight: '400'
    },
    subtitle: {
      fontSize: '16px',
      lineHeight: '120%'
    },
    largeSubtitle: {
      fontSize: '18px',
      lineHeight: '120%'
    }
  }
});
