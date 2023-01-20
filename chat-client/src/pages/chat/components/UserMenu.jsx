import {
  Divider,
  Flex,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  List,
  ListItem,
  Text,
  chakra,
  Skeleton,
  Stack,
  HStack,
} from '@chakra-ui/react';
import { FiHash, FiSearch } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { useChat } from '../logic/context';

export function UserMenu() {
  const {
    rooms,
    filter,
    setFilter,
    loadingRooms,
    getUserMenu,
    room: joinedRoom,
  } = useChat();
  const navigate = useNavigate();

  function onFilterSubmit(event) {
    event.preventDefault();

    getUserMenu(filter);
  }

  function onFilterChange({ target }) {
    setFilter(target.value);
  }

  return (
    <Flex direction="column" gap="4">
      <Flex>
        <chakra.form w="full" onSubmit={onFilterSubmit}>
          <InputGroup>
            <Input
              name="filter"
              value={filter}
              onChange={onFilterChange}
              placeholder="Pesquisar"
            />

            <InputRightElement>
              <IconButton
                type="submit"
                variant="gost"
                size="sm"
                aria-label="Search Rooms"
                icon={<FiSearch />}
              />
            </InputRightElement>
          </InputGroup>
        </chakra.form>
      </Flex>

      <Divider />

      <List spacing="2">
        {loadingRooms ? (
          Array.from({ length: 10 }, (_, index) => (
            <Skeleton rounded="lg" h="50" key={index} />
          ))
        ) : rooms && rooms.length ? (
          rooms.map((room) => {
            const isCurrentRoom = joinedRoom ? room.code === joinedRoom.code : false;

            return (
              <ListItem
                color="white"
                rounded="lg"
                _hover={{ bg: 'primary.700' }}
                transition={200}
                cursor="pointer"
                p="2"
                key={room.id}
                bg={isCurrentRoom ? 'primary.600' : 'primary.50'}
                onClick={() => navigate(`/${room.code}`)}
              >
                <Stack>
                  <Text
                    fontWeight={isCurrentRoom ? 'bold' : 'normal'}
                    fontSize="18"
                  >
                    {room.name}
                  </Text>

                  <HStack spacing={1}>
                    <FiHash />
                    <Text fontSize="14">{room.code}</Text>
                  </HStack>
                </Stack>
              </ListItem>
            );
          })
        ) : (
          <Text textAlign="center"> Não há nenhuma sala! </Text>
        )}
      </List>
    </Flex>
  );
}
