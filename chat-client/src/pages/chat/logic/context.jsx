import { useDisclosure, useToast } from '@chakra-ui/react';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import { api } from '../../../services/api';
import { ws } from '../../../services/ws';

export const ChatContext = createContext({});

export const useChat = () => useContext(ChatContext);

export function ChatContextProvider({ children }) {
  const { user } = useAuth();
  const params = useParams();
  const joinRoomController = useDisclosure();
  const toast = useToast({ position: 'top' });
  const navigate = useNavigate();

  const [rooms, setRooms] = useState();
  const [room, setRoom] = useState();
  const [messages, setMessages] = useState([]);
  const [filter, setFilter] = useState('');
  const [loadingRooms, setLoadingRooms] = useState(false);
  const [loadingMessages, setLoadingMessages] = useState(false);

  const messagesEndRef = useRef(null);

  function parseMessages(messages, user) {
    if (Array.isArray(messages)) {
      return messages.map((message) => parseMessages(message, user));
    }

    const parsedMessage = { ...messages, own: messages.userId === user.id };
    return parsedMessage;
  }

  const scrollDown = useCallback(() => {
    const target = messagesEndRef.current;
    if (!target) return;

    target.scrollIntoView();
  }, [messagesEndRef]);

  const getUserMenu = useCallback(
    async (filter) => {
      if (!user) return;

      setLoadingRooms(true);
      try {
        const { data: response } = await api.get(
          `/users/${user.id}/find-rooms`,
          { params: { filter } }
        );

        setLoadingRooms(false);
        setRooms(response);

        return response;
      } catch (error) {
        setLoadingRooms(false);
        toast({
          title: 'Houve um erro para buscar as salas!',
          status: 'error',
        });
      }
    },
    [user]
  );

  const joinRoom = useCallback(
    (room) => {
      if (!user) return;
      return new Promise((resolve) => {
        ws.send('join-room', { user, roomCode: room }, (response) => {
          if (response.error) {
            toast({
              title: `Erro ao entrar na sala: ${response.error}`,
              status: 'error',
            });
            navigate('/');
          }

          if (response.room) setRoom(response.room);

          resolve();
        });
      });
    },
    [user]
  );

  const getRoomMessages = useCallback(
    async (room) => {
      if (!user) return;
      console.log(room);

      setLoadingMessages(true);
      const { data: response } = await api.get(`/rooms/${room}/messages`);
      setLoadingMessages(false);

      setMessages(parseMessages(response, user));
      return response;
    },
    [user]
  );

  const sendMessage = useCallback(
    async (message) => {
      if (!user || !room) return;

      return new Promise((resolve) => {
        ws.send(
          'send-message',
          {
            user,
            roomCode: room.code,
            message,
          },
          (response) => {
            if (response.message) {
              setMessages((prevMessage) => [
                ...prevMessage,
                parseMessages(response.message, user),
              ]);
            }

            resolve();
          }
        );
      });
    },
    [user, room]
  );

  const onReceiveMessage = useCallback(
    (message) => {
      if (!user) return;

      setMessages((prevMessages) => [
        ...prevMessages,
        parseMessages(message, user),
      ]);
    },
    [user]
  );

  const onUserJoined = useCallback(
    (user) => {
      if (!user) return;

      toast({ title: `${user.name} entrou!` });
    },
    [user]
  );

  /**
   * Buscar o menu inicial
   */
  useEffect(() => {
    if (!user) return;

    getUserMenu();
  }, [user]);

  /**
   * Entrar na sala
   */
  useEffect(() => {
    if (!user) return;
    if (params.roomId) {
      if (room && room.code === params.roomId) return;

      joinRoom(params.roomId);
      getUserMenu();
    }
  }, [params, room, user]);

  /**
   * Listeners
   */
  useEffect(() => {
    if (!user || !room) return;

    ws.on('user-joined', onUserJoined);
    ws.on('receive-message', onReceiveMessage);

    getRoomMessages(room.id);

    return () => {
      ws.off('user-joined');
      ws.off('receive-message');
    };
  }, [room, user]);

  /**
   * Scroll Down
   */
  useEffect(() => {
    scrollDown();
  }, [messages]);

  return (
    <ChatContext.Provider
      value={{
        getUserMenu,
        joinRoomController,
        filter,
        setFilter,
        room,
        messages,
        loadingMessages,
        rooms,
        loadingRooms,
        sendMessage,
        messagesEndRef,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}
