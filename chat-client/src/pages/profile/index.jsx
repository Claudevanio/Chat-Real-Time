import {
  Avatar,
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  HStack,
  Input,
  Link,
  Skeleton,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { FiChevronLeft } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { PasswordInput } from '../../components/PasswordInput';
import { useProfileLogic } from './logic';

export function ProfilePage() {
  const navigate = useNavigate();
  const blockbg = useColorModeValue('gray.50', 'gray.700');
  const {
    avatarInputRef,
    handleSelectAvatar,
    handleUpdateName,
    handleUpdatePassword,
    nameError,
    passwordErrors,
    user,
  } = useProfileLogic();

  return (
    <Stack>
      <Link onClick={() => navigate(-1)}>
        <HStack>
          <FiChevronLeft />
          <Text> Voltar</Text>
        </HStack>
      </Link>

      <Heading> Perfil </Heading>

      <Box rounded={'lg'} bg={blockbg}>
        {user ? (
          <Tabs>
            <TabList>
              <Tab>Editar Perfil</Tab>
              <Tab>Alterar Senha</Tab>
            </TabList>

            <TabPanels p={10}>
              <TabPanel>
                <form onSubmit={handleUpdateName}>
                  <Stack spacing={6}>
                    <HStack align={'center'}>
                      <Avatar src={user.imageURL} />

                      <Stack>
                        <Heading size={'md'}> {user.name} </Heading>

                        <Button
                          variant="link"
                          onClick={() =>
                            avatarInputRef.current &&
                            avatarInputRef.current.click()
                          }
                        >
                          Alterar foto do perfil
                        </Button>
                      </Stack>
                    </HStack>

                    <Input
                      hidden
                      type="file"
                      id="avatar"
                      name="avatar"
                      ref={avatarInputRef}
                      onChange={handleSelectAvatar}
                    />

                    <FormControl isInvalid={!!nameError}>
                      <FormLabel> Nome </FormLabel>
                      <Input
                        defaultValue={user.name}
                        name="name"
                        placeholder="Nome"
                      />
                      <FormErrorMessage> {nameError} </FormErrorMessage>
                    </FormControl>

                    <FormControl isDisabled={true}>
                      <FormLabel> E-mail </FormLabel>
                      <Input
                        name="email"
                        defaultValue={user.email}
                        placeholder="E-mail"
                      ></Input>
                    </FormControl>

                    <Button type="submit" alignSelf={'start'}>
                      Salvar
                    </Button>
                  </Stack>
                </form>
              </TabPanel>

              <TabPanel>
                <form onSubmit={handleUpdatePassword}>
                  <Stack spacing={6}>
                    <HStack align={'center'}>
                      <Avatar src={user.imageURL} />

                      <Heading size={'md'}> {user.name} </Heading>
                    </HStack>

                    <FormControl isInvalid={!!passwordErrors.oldPassword}>
                      <FormLabel> Senha Atual </FormLabel>
                      <PasswordInput
                        name="oldPassword"
                        placeholder="Senha Atual"
                      />
                      <FormErrorMessage>
                        {passwordErrors.oldPassword}
                      </FormErrorMessage>
                    </FormControl>

                    <FormControl isInvalid={!!passwordErrors.newPassword}>
                      <FormLabel> Nova senha </FormLabel>
                      <PasswordInput
                        name="newPassword"
                        placeholder="Nova senha"
                      />
                      <FormErrorMessage>
                        {passwordErrors.newPassword}
                      </FormErrorMessage>
                    </FormControl>

                    <FormControl isInvalid={!!passwordErrors.confirmPassword}>
                      <FormLabel> Confirmar nova senha </FormLabel>
                      <PasswordInput
                        name="confirmPassword"
                        placeholder="Confirmar nova senha"
                      />
                      <FormErrorMessage>
                        {passwordErrors.confirmPassword}
                      </FormErrorMessage>
                    </FormControl>

                    <HStack justify={'space-between'}>
                      <Button type="submit" alignSelf={'start'}>
                        Alterar senha
                      </Button>

                      <Link onClick={() => navigate('/password/forget')}>
                        Esqueceu sua senha?
                      </Link>
                    </HStack>
                  </Stack>
                </form>
              </TabPanel>
            </TabPanels>
          </Tabs>
        ) : (
          <Skeleton />
        )}
      </Box>
    </Stack>
  );
}
