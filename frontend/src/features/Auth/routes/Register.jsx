import { AuthFormLayout } from "../components/AuthFormLayout";
import { RegisterForm } from "../components/RegisterForm";

export const Register = () => {
  return (
    <AuthFormLayout
      linkTo="login"
      linkBottom={"Log in"}
      subText={"Or Sign-up with"}
      header={"Create An Account"}
      textBottom={"Already have an account?"}
      coverImgSrc="/assets/images/auth/img_signup_web.png"
      subHeader={"Register a free account with Chore Scheduler."}
    >
      <RegisterForm />
    </AuthFormLayout>
  );
};
