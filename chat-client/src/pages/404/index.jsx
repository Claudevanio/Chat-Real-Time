import { Container, Heading, Text, Link, Center } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

export function NotFoundPage() {
  return (
    <Container h="100vh">
      <Center h="full" flexDirection="column" gap="4">
        <Heading>404 </Heading>
        <Text>Página não encontrada</Text>

        <RouterLink to="/">
          <Link>Voltar para página inicial</Link>
        </RouterLink>
      </Center>
    </Container>
  );
}
