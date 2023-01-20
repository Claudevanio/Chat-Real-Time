import {
  Box,
  Button,
  Center,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Link,
  Stack,
  Text,
} from '@chakra-ui/react';
import { useResetPassLogic } from './logic';
import { Link as RouterLink } from 'react-router-dom';
import { PasswordInput } from '../../../components/PasswordInput';

export function ResetPasswordPage() {
  const { handleSubmit, errors } = useResetPassLogic();

  return (
    <Stack>
      <Box>
        <Heading>Recuperação de senha</Heading>
        <Text>Digite a sua nova senha para concluir a recuperação</Text>
      </Box>

      <form onSubmit={handleSubmit}>
        <Stack>
          <FormControl isInvalid={!!errors.password}>
            <FormLabel>Senha</FormLabel>
            <PasswordInput name="password" placeholder="Senha"></PasswordInput>
            <FormErrorMessage> {errors.password} </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.confirmPassword}>
            <FormLabel>Confirmar senha</FormLabel>
            <PasswordInput
              name="confirmPassword"
              placeholder="Confirmar Senha"
            ></PasswordInput>
            <FormErrorMessage> {errors.confirmPassword} </FormErrorMessage>
          </FormControl>

          <Button type="submit">Resetar a senha</Button>
        </Stack>
      </form>

      <Center>
        <Link as={RouterLink} to="/login">
          Ainda não possuo uma conta
        </Link>
      </Center>
    </Stack>
  );
}
