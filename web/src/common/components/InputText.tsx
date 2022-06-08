import { Box, FormControl, FormErrorMessage, FormLabel, Input } from "@chakra-ui/react";

interface Props{
    label: string,
    name: string;
    value: string;
    setValue: (e: any) => void;
    password?: boolean;
}

export default function InputText(props: Props){

    return(
        <>
            <Box bg='white' w='75%' alignItems="center" mb="5">
                <FormControl isInvalid={true}>
                    <FormLabel>{props.label}</FormLabel>
                    <Input name={props.name} value={props.value} onChange={e => props.setValue(e.target.value)} type={props.password ? "password" : "text"}/>
                    <FormErrorMessage>Error</FormErrorMessage>
                </FormControl> 
            </Box>
        </>
    )
}