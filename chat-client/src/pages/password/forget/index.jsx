import {
  Box,
  Button,
  // Center,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Link,
  Stack,
  Text,
} from '@chakra-ui/react';
import { useForgetPassLogic } from './logic';
import { Link as RouterLink } from 'react-router-dom';

export function ForgetPasswordPage() {
  const { handleSubmit, error, isLoading } = useForgetPassLogic();

  return (
    <Stack>
      <Box>
        <Heading>Recuperação de senha</Heading>
        <Text>Preencha seu e-mail para enviarmos um link para recuperação</Text>
      </Box>

      <form onSubmit={handleSubmit}>
        <Stack>
          <FormControl isInvalid={error}>
            <FormLabel>E-mail</FormLabel>
            <Input type="email" name="email" placeholder="E-mail"></Input>
            <FormErrorMessage> Preencha o e-mail </FormErrorMessage>
          </FormControl>

          <Button type="submit" isLoading={isLoading}>
            {' '}
            Enviar e-mail
          </Button>
        </Stack>
      </form>

      <Stack display={'flex'} direction="row" justifyContent="space-between">
        <Link as={RouterLink} to="/register">
          Ainda não possuo uma conta
        </Link>

        <Link as={RouterLink} to="/login">
          Fazer login
        </Link>
      </Stack>
    </Stack>
  );
}
