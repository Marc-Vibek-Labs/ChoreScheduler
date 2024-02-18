import { AuthFormLayout } from "../components";
import { LoginForm } from "../components/LoginForm";

export const Login = () => {
  return (
    <AuthFormLayout
      linkTo="register"
      header={"Welcome Back"}
      subText={"Or Log In With"}
      linkBottom={"Sign up for free"}
      textBottom={"Don’t have an account?"}
      coverImgSrc="/images/app_cover_image.png"
      subHeader={"Login to manage your account with Chore Scheduler."}
    >
      <LoginForm />
    </AuthFormLayout>
  );
};
