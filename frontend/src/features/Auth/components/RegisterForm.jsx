import { useState } from "react";
import { AxiosError } from "axios";
// import { FontFamily } from "../../../utils/constants";
// import { InputField, Form } from "../../../components/Form";
import { Button, Link, Checkbox, useToast, Text } from "@chakra-ui/react";
// import { RegisterCredentialsDTO, useRegisterMutation } from "../api/register";

const termsOfUseUrl = `https://ilending.snappymob.dev/privacy-policy/`;
// const schema = z
//   .object({
//     firstName: z.string().min(1, "Required"),
//     lastName: z.string().min(1, "Required"),
//     username: z.string().min(1, "Required.").email("Invalid email address."),
//     password: z
//       .string()
//       .min(8, "Must contain at least 8 characters.")
//       .regex(
//         /(?=.*?[A-Z])(?=.*?[a-z])(?=.*\d)(?=.*?[#?!@$%^&*-])/,
//         "Must contain at one number, one uppercase letter, one lowercase letter, and one special character"
//       ),
//     confirmPassword: z.string().min(8, "Must contain at least 8 characters."),
//   })
//   .refine((data) => data.password === data.confirmPassword, {
//     message: "The passwords don't match",
//     path: ["confirmPassword"],
//   });

export const RegisterForm = () => {
  const [hasAgreedToTerms, setHasAgreedToTerms] = useState(false);
  const toast = useToast();

  // const mutation = useRegisterMutation();

  const submitHandler = (data) => {
    if (hasAgreedToTerms) {
      const requestData = {
        username: data.username,
        password: data.password,
        firstName: data.firstName,
        lastName: data.lastName,
      };

      // mutation.mutate(requestData);
    } else {
      toast({
        title: "Warning",
        status: "warning",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  return (
    <></>
    // <Form<RegisterValues, typeof schema>
    //   onSubmit={submitHandler}
    //   schema={schema}
    //   options={{
    //     shouldUnregister: true,
    //     mode: 'onChange'
    //   }}
    // >
    //   {({ register, formState }) => (
    //     <>
    //       <InputField
    //         id="firstName"
    //         label={t('First Name') as string}
    //         isRequired={true}
    //         type="text"
    //         placeholder="John"
    //         error={formState.errors.firstName}
    //         registration={register('firstName')}
    //       />

    //       <InputField
    //         id="lastName"
    //         label={t('Last Name') as string}
    //         isRequired={true}
    //         type="text"
    //         placeholder="Doe"
    //         error={formState.errors.lastName}
    //         registration={register('lastName')}
    //       />

    //       <InputField
    //         id="username"
    //         label={t('Email') as string}
    //         isRequired={true}
    //         type="email"
    //         placeholder="johndoe@gmail.com"
    //         error={formState.errors.username}
    //         registration={register('username')}
    //       />
    //       <InputField
    //         id="password"
    //         label={t('Password') as string}
    //         isRequired={true}
    //         type="password"
    //         bottomLabel={t('Password must be at least 8 characters long, with Uppercases, lowercases, numbers, and symbols.') as string}
    //         error={formState.errors.password}
    //         registration={register('password')}
    //       />
    //       <InputField
    //         id="confirmPassword"
    //         label={t('Confirm Password') as string}
    //         isRequired={true}
    //         type="password"
    //         error={formState.errors.confirmPassword}
    //         registration={register('confirmPassword')}
    //       />
    //       <Checkbox isChecked={hasAgreedToTerms} onChange={() => setHasAgreedToTerms((prev) => !prev)} display="flex" marginTop="35px">
    //         <Text fontFamily={FontFamily.DM_SANS} fontWeight="400" variant="body">
    //           {t('I have read and agreed to the')} <Link href={termsOfUseUrl} isExternal color="primary.500">{t('Terms of Use')}</Link>
    //         </Text>
    //       </Checkbox>
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
    //         {t('Create account & continue')}
    //       </Button>
    //     </>
    //   )}
    // </Form>
  );
};
