import { AuthFormLayout } from "../components/AuthFormLayout";
import { RegisterForm } from "../components/RegisterForm";

export const Register = () => {
  return (
    <AuthFormLayout
      linkTo="login"
      linkBottom={"Log in"}
      subText={"Or Sign Up With"}
      header={"Create An Account"}
      coverImgSrc="/images/app_cover_image.png"
      textBottom={"Already have an account?"}
      subHeader={"Register a free account with Chore Scheduler."}
    >
      <RegisterForm />
    </AuthFormLayout>
  );
};
