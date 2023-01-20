import { Flex, Heading, HStack, IconButton } from '@chakra-ui/react';
import { FiHash, FiMenu, FiPlus } from 'react-icons/fi';
import { useChat } from '../logic/context';

export function Header({ openMenu }) {
  const { joinRoomController, room } = useChat();

  return (
    <Flex h="full" align={'center'} px={4} justifyContent="space-between">
      <HStack>
        <FiHash />
        <Heading size={'md'}>{room ? room.name : 'ChatDevplay'}</Heading>
      </HStack>

      <HStack>
        <IconButton onClick={joinRoomController.onOpen} icon={<FiPlus />} />

        {openMenu ? <IconButton onClick={openMenu} icon={<FiMenu />} /> : null}
      </HStack>
    </Flex>
  );
}
