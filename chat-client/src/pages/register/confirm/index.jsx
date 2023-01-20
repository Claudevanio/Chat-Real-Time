import {
  Box,
  Button,
  Center,
  Heading,
  HStack,
  Link,
  PinInput,
  PinInputField,
  Stack,
  Text,
} from '@chakra-ui/react';
import { useConfirmRegisterLogic } from './logic';
import { Link as RouterLink } from 'react-router-dom';
import { CONFIRM_CODE_SIZE } from '../../../data/config';

export function ConfirmRegisterPage() {
  const { code, setCode, handleSubmit } = useConfirmRegisterLogic();

  return (
    <Stack>
      <Box>
        <Heading>Confirme seu cadastro</Heading>
        <Text>
          Você recebeu em seu email um código para confirmar o seucadastro
        </Text>
      </Box>

      <form onSubmit={handleSubmit}>
        <Stack>
          <HStack mb={6} justify={'space-between'}>
            <PinInput  type="alphanumeric" value={code} onChange={setCode}>
              {Array.from({ length: CONFIRM_CODE_SIZE }, (_, index) => (
                <PinInputField key={index } />
              ))}
            </PinInput>
          </HStack>

          <Button type="submit">Confirmar Cadastro</Button>
        </Stack>
      </form>

      <Center>
        <Link as={RouterLink} to="/register">
          Voltar para cadastro
        </Link>
      </Center>
    </Stack>
  );
}
