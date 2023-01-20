import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Grid,
  GridItem,
  useColorModeValue,
  useDisclosure,
  useMediaQuery,
} from '@chakra-ui/react';
import { NAVBAR_HEIGHT } from '../../data/config';
import { ChatContextProvider } from './logic/context';
import { Header } from './components/Header';
import { Messages } from './components/Messages';
import { JoinRoomModal } from './components/JoinRoomModal';
import { UserMenu } from './components/UserMenu';
import { ChatForm } from './components/ChatForm';

export function ChatPage() {
  const blocksBg = useColorModeValue('gray.50', 'gray.700');
  const menuController = useDisclosure();
  const [isMobile] = useMediaQuery('(max-width: 768px)');

  return (
    <ChatContextProvider>
      <Grid
        templateColumns={isMobile ? '1fr' : '300px 1fr'}
        templateRows="50px 1fr 60px"
        h={`calc(100vh - ${NAVBAR_HEIGHT})`}
        gap="2"
        pb="2"
      >
        <JoinRoomModal />

        {/* Menu */}
        {isMobile ? (
          <Drawer
            isOpen={menuController.isOpen}
            onClose={menuController.onClose}
          >
            <DrawerOverlay />

            <DrawerContent>
              <DrawerCloseButton />
              <DrawerHeader>Menu</DrawerHeader>

              <DrawerBody>
                <UserMenu />
              </DrawerBody>
            </DrawerContent>
          </Drawer>
        ) : (
          <GridItem
            overflowY="auto"
            rowSpan={3}
            bg={blocksBg}
            p="2"
            h="full"
            rounded="base"
          >
            <UserMenu />
          </GridItem>
        )}

        {/* Header */}
        <GridItem rounded={'base'} bg={blocksBg}>
          <Header openMenu={isMobile ? menuController.onOpen : null} />
        </GridItem>

        {/* Messages */}
        <GridItem overflowY={'auto'} bg={blocksBg} rounded="base">
          <Messages />
        </GridItem>

        {/* Chat Form */}
        <GridItem bg={blocksBg} rounded="base">
          <ChatForm />
        </GridItem>
      </Grid>
    </ChatContextProvider>
  );
}
