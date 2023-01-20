import { useToast } from '@chakra-ui/react';
import { AxiosError } from 'axios';
import { useCallback, useRef, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { api } from '../../services/api';

const initialPasswordErrors = {
  oldPassword: '',
  newPassword: '',
  confirmPassword: '',
};

export function useProfileLogic() {
  const [nameError, setNameError] = useState();
  const [passwordErrors, setPasswordErrors] = useState(initialPasswordErrors);
  const { user, refreshUser } = useAuth();
  const avatarInputRef = useRef();
  const toast = useToast({ position: 'top' });

  const handleSelectAvatar = useCallback(
    async (event) => {
      if (!user) return;

      const file = event.target.files?.[0];
      if (!file) return;

      const formData = new FormData();
      formData.append('avatar', file);

      try {
        const { data: response } = await api.put(
          `/users/${user.id}/avatar`,
          formData
        );

        if (response) {
          toast({ title: 'Avatar atualizado!', status: 'success' });
        }

        await refreshUser();
      } catch (error) {
        toast({ title: 'Houve um erro!', status: 'error' });
      }
      event.target.value = '';
    },
    [user]
  );

  const handleUpdatePassword = useCallback(
    async (event) => {
      event.preventDefault();
      if (!user) return;

      const { elements } = event.target;
      const data = {
        oldPassword: elements.oldPassword.value,
        newPassword: elements.newPassword.value,
        confirmPassword: elements.confirmPassword.value,
      };

      const validateErrors = {};

      if (!data.oldPassword)
        validateErrors.oldPassword = 'O campo senha antiga é obrigatório!';
      if (!data.newPassword)
        validateErrors.newPassword = 'O campo nova senha é obrigatório!';
      if (!data.confirmPassword)
        validateErrors.confirmPassword =
          'O campo confirmar senha é obrigatório!';
      if (data.confirmPassword !== data.newPassword)
        validateErrors.confirmPassword =
          'O campo confirmar senha está diferente!';
      if (data.newPassword === data.password)
        validateErrors.newPassword = 'Nova senha não pode ser igual a antiga!';

      if (Object.keys(validateErrors).length > 0) {
        setPasswordErrors(validateErrors);
        return;
      }

      const payload = {
        oldPassword: data.oldPassword,
        newPassword: data.newPassword,
      };

      try {
        const { data: response } = await api.put(
          `/users/${user.id}/password`,
          payload
        );

        if (response) {
          toast({ title: 'Senha atualizada!', status: 'success' });
        }
      } catch (error) {
        if (error instanceof AxiosError) {
          toast({
            title: error.response.data.msg,
            description: 'Confira os dados inseridos!',
            status: 'error',
          });
        }
      }
    },
    [user]
  );

  const handleUpdateName = useCallback(
    async (event) => {
      event.preventDefault();

      const { elements } = event.target;
      const data = {
        name: elements.name.value,
      };

      if (user.name === data.name) return;
      if (!data.name) return setNameError('Nome é obrigatório!');
      setNameError(undefined);

      try {
        const { data: response } = await api.put(`/users/${user.id}`, data);

        if (response) {
          toast({ title: 'Nome atualizado!', status: 'success' });
        }

        await refreshUser();
      } catch (error) {
        toast({
          title: 'Houve um erro para atualizar o nome!',
          status: 'error',
        });
      }
    },
    [user]
  );

  return {
    nameError,
    passwordErrors,
    avatarInputRef,
    handleSelectAvatar,
    handleUpdateName,
    handleUpdatePassword,
    user,
  };
}
