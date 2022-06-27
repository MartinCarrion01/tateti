import {
  Button,
  Center,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCurrentMatch } from "../../store/matchStore";
import { abandonMatch } from "../../services/matchService";

export default function LeaveButton() {
  const match = useCurrentMatch();
  const navigate = useNavigate();
  const toast = useToast();
  const [label, setLabel] = useState<string>("Abandonar partida");
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleAbandonMatch = async () => {
    if (match) {
        abandonMatch(match.match_number)
          .then((data) => {
            navigate("/")
          })
          .catch((error) => {
            toast({
              title: "Ha ocurrido un error",
              status: "error",
              duration: 2000,
              isClosable: true,
            });
          });
      }
  };

  return (
    <>
      <Center width="75%" mt={3}>
        <Button
          colorScheme={match?.status !== "finalizado" ? "red" : "teal"}
          size="lg"
          onClick={(match?.status !== "finalizado") ? onOpen : () => navigate("/")}
        >
          {match?.status !== "finalizado" ? "Abandonar partida" : "Volver al inicio"}
        </Button>
      </Center>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Abandonar partida</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {match?.status !== "esperando" ? "¿Estás seguro que querés abandonar la partida? Si lo hacés, automaticamente se te cuenta como perdedor de la partida actual" : "¿Estás seguro que querés abandonar la partida? Si lo hacés, nadie se podra unir a tu partida"}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Volver a la partida
            </Button>
            <Button colorScheme="red" onClick={handleAbandonMatch}>Abandonar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
