import { useToast } from '@chakra-ui/react';
import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import { api } from '../../../services/api';
import { useChat } from './context';

const initialErrors = {
  name: '',
  code: '',
};

export function useJoinRoomModalLogic() {
  const { user } = useAuth();
  const { joinRoomController } = useChat();
  const toast = useToast({ position: 'top' });
  const [isLoadingJoin, setIsLoadingJoin] = useState(false);
  const navigate = useNavigate();

  const [errors, setErrors] = useState(initialErrors);
  const [isLoadingCreate, setIsLoadingCreate] = useState(false);

  const AddUserToRoom = useCallback(
    async (code) => {
      if (!user) return;

      try {
        const { data: response } = await api.post(
          `/users/${user.id}/join-room/${code}`,
          code
        );

        if (response) {
          toast({ title: 'Entrou na sala!', status: 'success' });
        }

        navigate(`/${code}`);
      } catch (error) {
        toast({ title: 'Houve um erro ao criar a sala!', status: 'error' });
      }
    },
    [user]
  );

  const handleCreateRoom = useCallback(
    async (event) => {
      event.preventDefault();
      if (!user) return;

      const { elements } = event.target;
      const name = elements.name.value;

      if (!name) {
        return setErrors((preventErrors) => ({
          ...preventErrors,
          name: 'O campo nome é obrigatório!',
        }));
      } else {
        setErrors((preventErrors) => ({
          ...preventErrors,
          name: '',
          code: '',
        }));
      }

      setIsLoadingCreate(true);
      const { data: response } = await api.post('/rooms', { name });
      setIsLoadingCreate(false);

      if (response && response.code) {
        await AddUserToRoom(response.code);
      }

      event.target.reset();

      joinRoomController.onClose();
    },
    [user]
  );

  const handleJoinRoom = useCallback(
    async (event) => {
      event.preventDefault();
      if (!user) return;

      const { elements } = event.target;
      const code = elements.code.value;

      if (!code) {
        return setErrors((preventErrors) => ({
          ...preventErrors,
          code: 'O código é obrigatório!',
        }));
      } else {
        setErrors((preventErrors) => ({
          ...preventErrors,
          code: '',
          name: '',
        }));
      }

      setIsLoadingJoin(true);
      await AddUserToRoom(code);
      setIsLoadingJoin(false);

      event.target.reset();
      joinRoomController.onClose();
    },
    [user]
  );

  return {
    handleCreateRoom,
    handleJoinRoom,
    errors,
    isLoadingCreate,
    isLoadingJoin,
  };
}
