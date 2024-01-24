import { useForm } from "react-hook-form";
import * as yup from "yup";
import { Box, FormControl, FormLabel, Input, Button } from "@chakra-ui/react";

const schema = yup.object().shape({
  email: yup.string().required("Email is required").email("Email is invalid"),
  number: yup.number().required("Number is required"),
  name: yup.string().required("Name is required"),
  groupName: yup.string().required("Group name is required"),
});

function RegisterForm() {
  const { register, handleSubmit, errors } = useForm({
    validationSchema: schema,
  });

  const onSubmit = (data) => {
    console.log("data", data);
  };

  return (
    <Box as="form" onSubmit={handleSubmit(onSubmit)}>
      <FormControl isInvalid={errors.email}>
        <FormLabel>Email</FormLabel>
        <Input name="email" ref={register} />
      </FormControl>

      <FormControl isInvalid={errors.number}>
        <FormLabel>Number</FormLabel>
        <Input name="number" type="number" ref={register} />
      </FormControl>

      <Button type="submit">Submit</Button>
    </Box>
  );
}

export default RegisterForm;
