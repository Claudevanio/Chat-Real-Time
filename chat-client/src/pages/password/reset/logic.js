import { useToast } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { api } from '../../../services/api';

export function useResetPassLogic() {
  const [errors, setErrors] = useState({});
  const toast = useToast();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    const { elements } = event.target;

    const data = {
      password: elements.password.value,
      confirmPassword: elements.confirmPassword.value,
    };

    const validateErrors = {};

    if (!data.password) validateErrors.password = 'O campo senha é obrigatório';
    if (!data.confirmPassword)
      validateErrors.confirmPassword = 'O campo confirmar senha é obrigatório';
    if (data.password !== data.confirmPassword)
      validateErrors.confirmPassword = 'Confirme a senha por favor';
    if (Object.keys(validateErrors).length > 0) {
      setErrors(validateErrors);
      return;
    }

    try {
      const { data: response } = await api.post('/users/reset-password', {
        token: searchParams.get('token'),
        password: data.password,
      });

      if (response) {
        toast({ title: 'Senha alterada com sucesso!', status: 'success' });
        navigate('/login');
      }
    } catch (error) {
      toast({ title: error.response.data.msg, status: 'error' });
    }
  }

  useEffect(() => {
    if (!searchParams.get('token')) {
      navigate('/login');
      return;
    }
  }, []);

  return { handleSubmit, errors };
}
