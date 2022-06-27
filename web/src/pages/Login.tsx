import HalfWidthCenter from "../components/common/HalfWidthCenter";
import SubTitle from "../components/common/SubTitle";
import LoginForm from "../components/user/LoginForm";
import RegisterPrompt from "../components/user/RegisterPrompt";

export default function Login() {
  return (
    <>
      <HalfWidthCenter>
        <SubTitle text={"Iniciar sesión"} />
        <LoginForm />
        <RegisterPrompt />
      </HalfWidthCenter>
    </>
  );
}
