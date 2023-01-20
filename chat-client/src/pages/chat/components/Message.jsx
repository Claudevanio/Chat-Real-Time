import { Avatar, Box, Flex, Text, useColorModeValue } from '@chakra-ui/react';

export function Message({ item }) {
  const lightColor = useColorModeValue('gray.500', 'gray.300');
  const bgMessage = !item.own
    ? useColorModeValue('secondary.300', 'secondary.400')
    : useColorModeValue('white', 'gray.600');
  const contentColor = !item.own
    ? useColorModeValue('white', 'white')
    : useColorModeValue('black', 'white');

  function getHoursFomDate(date) {
    date = new Date(date);

    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${hours}:${minutes}`;
  }

  return (
    <Flex
      justify={item.own ? 'end' : 'start'}
      direction={item.own ? 'row-reverse' : 'row'}
      gap="2"
      align="center"
    >
      <Avatar src={item.user.imageURL} size="sm" shadow="lg" />

      <Box>
        <Flex
          direction={item.own ? 'row-reverse' : 'row'}
          justify="space-between"
        >
          <Text>{item.user.name}</Text>
          <Text fontSize={'sm'} color={lightColor}>
            {getHoursFomDate(item.createdAt)}
          </Text>
        </Flex>
        <Box bg={bgMessage} py={2} px={4} minW={300} rounded="lg" shadow="lg">
          <Text color={contentColor}>{item.content}</Text>
        </Box>
      </Box>
    </Flex>
  );
}
