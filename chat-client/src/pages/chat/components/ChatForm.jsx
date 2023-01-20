import { Flex, IconButton, Input, chakra } from '@chakra-ui/react';
import { FiSend } from 'react-icons/fi';
import { useChat } from '../logic/context';

export function ChatForm() {
  const { sendMessage } = useChat();

  async function onSubmit(event) {
    event.preventDefault();

    await sendMessage(event.target.elements.content.value);
    event.target.elements.content.value = '';
  }

  return (
    <chakra.form h="full" onSubmit={onSubmit}>
      <Flex h="full" align={'center'} gap="2" px={4}>
        <Input placeholder="Digite a mensagem" name="content" />

        <IconButton type="submit" icon={<FiSend />} />
      </Flex>
    </chakra.form>
  );
}
