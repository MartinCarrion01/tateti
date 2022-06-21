import HalfWidthCenter from "../common/components/HalfWidthCenter";
import SubTitle from "../common/components/SubTitle";
import LoginForm from "../user/LoginForm";
import RegisterPrompt from "../user/RegisterPrompt";

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
