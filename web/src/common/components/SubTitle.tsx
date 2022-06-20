import { Center, Heading } from "@chakra-ui/react"

interface Props {
    text: String
}

export default function SubTitle(props: Props){
    return(
        <>
            <Center color='#FFF2F2'>
                <Heading as='h3' noOfLines={1}>{props.text}</Heading>
            </Center>
        </>
    )
}