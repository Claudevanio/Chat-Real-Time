import { api } from '../../services/api';
import { useToast } from '@chakra-ui/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const initialErrors = {
  email: '',
  password: '',
};

export function useLoginLogic() {
  const [errors, setErrors] = useState(initialErrors);
  const toast = useToast({ position: 'top' });
  const navigate = useNavigate();
  const { setData } = useAuth();

  async function handleSubmit(event) {
    event.preventDefault();
    const { elements } = event.target;

    const data = {
      email: elements.email.value,
      password: elements.password.value,
    };

    const validateErrors = {};

    if (!data.email) validateErrors.email = 'O campo email é obrigatório';
    if (!data.password) validateErrors.password = 'O campo senha é obrigatório';

    if (Object.keys(validateErrors).length > 0)
      return setErrors(validateErrors);

    setErrors(initialErrors);

    try {
      const { data: response } = await api.post('/users/login', {
        email: data.email,
        password: data.password,
      });

      if (!response.token) {
        return toast({ title: 'Houve um erro na autenticação de login' });
      }


      toast({ title: 'Login realizado com sucesso!', status: 'success' });
      
      setData(response.user, response.token);
      navigate('/');
    } catch (error) {
      return toast({ title: error.response.data.msg, status: 'error' });
    }
  }

  return { errors, handleSubmit };
}
