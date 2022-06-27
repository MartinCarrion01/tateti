import HalfWidthCenter from "../components/common/HalfWidthCenter";
import SubTitle from "../components/common/SubTitle";
import RegisterForm from "../components/user/RegisterForm";

export default function Register() {
    return (
      <>
        <HalfWidthCenter>
          <SubTitle text={"Registrarse"} />
          <RegisterForm />
        </HalfWidthCenter>
      </>
    );
  }