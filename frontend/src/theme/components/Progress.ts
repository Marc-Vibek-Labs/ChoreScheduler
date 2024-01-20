import { defineStyleConfig } from '@chakra-ui/react';

export const Progress = defineStyleConfig({
  baseStyle: {
    track: {
      borderRadius: '18px'
    },
    filledTrack: {
      backgroundColor: 'primary.500'
    }
  }
});
