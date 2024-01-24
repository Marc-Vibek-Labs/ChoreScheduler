import { AxiosError } from "axios";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
// import localStorage from "../../../utils/localStorage";
// import { InputField, Form } from "../../../components/Form";
import { Flex, Button, Link, Checkbox, Text } from "@chakra-ui/react";

export const LoginForm = ({ defaultUsername }) => {
  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    if (defaultUsername) {
      setRememberMe(true);
    }
  }, [defaultUsername]);

  // const mutation = useLoginMutation();

  // const submitHandler = (data) => {
  //   if (rememberMe) {
  //     localStorage.setUsername(data.username);
  //   } else {
  //     localStorage.clearUsername();
  //   }
  //   // mutation.mutate(data);
  // };

  return (
    <></>
    // <Form<LoginValues, typeof schema>
    //   onSubmit={submitHandler}
    //   schema={schema}
    //   options={{
    //     mode: 'onChange'
    //   }}
    // >
    //   {({ register, formState }) => (
    //     <>
    //       <InputField
    //         id="username"
    //         label={t('Email')}
    //         isRequired={true}
    //         type="email"
    //         defaultValue={defaultUsername}
    //         placeholder="johndoe@gmail.com"
    //         error={formState.errors.username}
    //         registration={register('username')}
    //       />
    //       <InputField
    //         id="password"
    //         label={t('Password')}
    //         isRequired={true}
    //         type="password"
    //         placeholder="********"
    //         error={formState.errors.password}
    //         registration={register('password')}
    //       />
    //       <Flex flexDir="row" alignItems="center" justifyContent="space-between" marginTop="35px">
    //         <Checkbox colorScheme="primary" isChecked={rememberMe} onChange={() => setRememberMe((prev) => !prev)}>
    //           {t('Remember me')}
    //         </Checkbox>
    //         <Link as={NavLink} fontWeight="bold" color="primary.500" to="/auth/forgot-password">
    //           {t('Forgot your password?')}
    //         </Link>
    //       </Flex>
    //       {mutation.isError && mutation.error instanceof AxiosError && (
    //         <Text mt="35px" color="red.500">
    //           {t(mutation.error.response?.data?.message, { ns: 'error' })}
    //         </Text>
    //       )}
    //       <Button
    //         mt="40px"
    //         type="submit"
    //         size="lg"
    //         variant="primary"
    //         width="100%"
    //         isLoading={mutation.isLoading}
    //         loadingText={t('Submitting...') as string}
    //         disabled={!formState.isDirty || !formState.isValid}
    //       >
    //         {t('Log in')}
    //       </Button>
    //     </>
    //   )}
    // </Form>
  );
};
