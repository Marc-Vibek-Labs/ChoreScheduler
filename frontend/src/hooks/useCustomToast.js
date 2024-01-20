import { Flex, Image, Text, useToast, UseToastOptions } from '@chakra-ui/react';

const AlertStatus = {
  INFO:'info',
  WARNING:'warning',
  SUCCESS:'success',
  ERROR:'error',
  LOADING:'loading'
}

const useCustomToast = () => {
  const toast = useToast();

  const addCustomToast = (options) => {
    const { title, description, status, ...otherOptions } = options;

    const getStatusIconFileName = () => {
      switch (status) {
        case AlertStatus.SUCCESS:
          return 'ic_toast-success';
        case AlertStatus.WARNING:
          return 'ic_toast-pending';
        default:
          return '';
      }
    };

    toast({
      ...otherOptions,
      containerStyle: {
        m: '10px 20px'
      },
      render: () => (
        <Flex
          bg="neutral.800"
          alignItems="center"
          minH="56px"
          gap="16px"
          px="20px"
          py="12px"
          borderRadius="8px"
          boxShadow="0px 2px 4px rgba(21, 23, 26, 0.24), 0px 4px 16px rgba(21, 23, 26, 0.16);"
        >
          {status && getStatusIconFileName() && <Image src={`/assets/images/icons/${getStatusIconFileName()}.svg`} w="32px" h="32px" />}
          <Text variant="subtitle" color="neutral.0" fontWeight={600}>
            {title}
          </Text>
        </Flex>
      )
    });
  };

  return { addCustomToast };
};

export default useCustomToast;
