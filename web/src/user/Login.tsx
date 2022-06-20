import HalfWidthCenter from "../common/components/HalfWidthCenter";
import SubTitle from "../common/components/SubTitle";
import LoginForm from "./LoginForm";

export default function Login(){

    return(
        <>
            <HalfWidthCenter color="#FAD4D4" >
                <SubTitle text={"Iniciar sesión"}/>
                <LoginForm/>
            </HalfWidthCenter>
        </>
    )
}