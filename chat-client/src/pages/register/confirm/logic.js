import { useEffect, useState } from 'react';
import { useToast } from '@chakra-ui/react';
import { CONFIRM_CODE_SIZE } from '../../../data/config';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { api } from '../../../services/api';
import { useAuth } from '../../../contexts/AuthContext';

export function useConfirmRegisterLogic() {
  const [code, setCode] = useState('');
  const toast = useToast();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { setData } = useAuth();

  async function confirmCode(code) {
    if (code.length !== CONFIRM_CODE_SIZE) {
      toast({ title: 'Digite o código' });
      return;
    }

    try {
      const { data: response } = await api.post('/users/confirm-register', {
        email: searchParams.get('email'),
        code,
      });

      if (!response.token)
        return toast({ title: 'Houve um erro na confirmação do cadastro' });

      toast({ title: 'Cadastro confirmado!' });

      setData(response.user, response.token);
      navigate('/');
    } catch (error) {
      console.error(error);
      toast({ title: error.response.data.msg });
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();

    confirmCode(code);
  }

  useEffect(() => {
    const email = searchParams.get('email');

    if (!email) {
      navigate('/register');
      return;
    }

    const code = searchParams.get('code');

    if (code) {
      confirmCode(code);
      return;
    }
  }, []);

  return { code, handleSubmit, setCode };
}
