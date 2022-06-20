interface Props{
    children?: JSX.Element | JSX.Element[]
}

export default function Form(props: Props){
    return(
        <form>
            {props.children}
        </form>
    )
}