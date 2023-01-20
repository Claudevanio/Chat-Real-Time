import { Box, Button, Center, Skeleton, Stack, Text } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { useChat } from '../logic/context';
import { Message } from './Message';

export function Messages() {
  const { joinRoomController, messages, loadingMessages, messagesEndRef } =
    useChat();
  const params = useParams();

  return (
    <Box h="full" p={3}>
      {!params.roomId ? (
        <Center h="full">
          <Stack>
            <Text>Entre em alguma sala para começar</Text>

            <Button onClick={joinRoomController.onOpen}>
              Criar ou entrar em uma sala
            </Button>
          </Stack>
        </Center>
      ) : loadingMessages ? (
        Array.from({ length: 10 }, (_, index) => (
          <Skeleton m={4} rounded={'lg'} h="30" key={index} />
        ))
      ) : !messages.length ? (
        <Center h="full">
          <Stack>
            <Text>Não há mensagens nesta sala! </Text>
          </Stack>
        </Center>
      ) : (
        <Stack spacing={3}>
          {messages.map((message) => (
            <Message item={message} key={message.id} />
          ))}
          <div ref={messagesEndRef}></div>
        </Stack>
      )}
    </Box>
  );
}
