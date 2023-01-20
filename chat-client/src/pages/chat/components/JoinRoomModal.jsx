import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  VStack,
} from '@chakra-ui/react';
import { FiArrowRight } from 'react-icons/fi';
import { useChat } from '../logic/context';
import { useJoinRoomModalLogic } from '../logic/useJoinRoomModalLogic';

export function JoinRoomModal() {
  const { joinRoomController } = useChat();
  const {
    handleCreateRoom,
    handleJoinRoom,
    errors,
    isLoadingCreate,
    isLoadingJoin,
  } = useJoinRoomModalLogic();

  return (
    <Modal
      isCentered
      isOpen={joinRoomController.isOpen}
      onClose={joinRoomController.onClose}
    >
      <ModalOverlay />

      <ModalContent>
        <ModalHeader> Criar ou entrar em uma sala</ModalHeader>

        <ModalCloseButton />

        <ModalBody>
          <VStack spacing={10}>
            <form onSubmit={handleCreateRoom}>
              <Text>
                Crie uma nova sala e adicione amigos com o código para trocar
                uma ideia
              </Text>
              <FormControl isInvalid={!!errors.name}>
                <FormLabel> Nome da Sala </FormLabel>
                <HStack>
                  <Input name="name" placeholder="Nome da sala" />

                  <IconButton
                    isLoading={isLoadingCreate}
                    type="submit"
                    icon={<FiArrowRight />}
                  ></IconButton>
                </HStack>
                <FormErrorMessage> {errors.name} </FormErrorMessage>
              </FormControl>
            </form>

            <form onSubmit={handleJoinRoom}>
              <Text>
                Se quer entrar em uma sala já existente, copie e cole o código
                aqui
              </Text>
              <FormControl isInvalid={!!errors.code}>
                <FormLabel> Código da sala </FormLabel>
                <HStack>
                  <Input name="code" placeholder="Código para entrar na sala" />

                  <IconButton
                    isLoading={isLoadingJoin}
                    type="submit"
                    icon={<FiArrowRight />}
                  ></IconButton>
                </HStack>
                <FormErrorMessage> {errors.code} </FormErrorMessage>
              </FormControl>
            </form>
          </VStack>
        </ModalBody>

        <ModalFooter>
          <Button onClick={joinRoomController.onClose} variant={'ghost'}>
            Cancelar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
