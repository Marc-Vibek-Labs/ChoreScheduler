// import localStorage from "../../../utils/localStorage";
import { AuthFormLayout } from "../components";
import { LoginForm } from "../components/LoginForm";

export const Login = () => {
  // const username = localStorage.getUsername();

  return (
    <AuthFormLayout
      linkTo="register"
      header={"Welcome Back"}
      subText={"Or Log in with"}
      linkBottom={"Sign up for free"}
      textBottom={"Don’t have an account?"}
      coverImgSrc="/images/auth_login.png"
      subHeader={"Login to manage your account with Chore Scheduler."}
    >
      <LoginForm defaultUsername={"username"} />
    </AuthFormLayout>
  );
};
