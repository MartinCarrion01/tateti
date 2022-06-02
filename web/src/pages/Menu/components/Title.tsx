import { Center, Heading } from "@chakra-ui/react"

interface Props {
    title: String
}

export default function Title(props: Props){
    return(
        <>
            <Center color='#FFF2F2'>
                <Heading as='h1' size='4xl' noOfLines={1}>{props.title}</Heading>
            </Center>
        </>
    )
}