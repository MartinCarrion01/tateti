import HalfWidthCenter from "../common/components/HalfWidthCenter";
import SubTitle from "../common/components/SubTitle";
import RegisterForm from "../user/RegisterForm";

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