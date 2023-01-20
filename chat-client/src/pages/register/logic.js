import { useToast } from '@chakra-ui/react';
import { useState } from 'react';
import { api } from '../../services/api';
import { useNavigate } from 'react-router-dom';

const initialErrors = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
};

export function useRegisterLogic() {
  const [errors, setErrors] = useState(initialErrors);
  const toast = useToast();
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    const { elements } = event.target;

    const data = {
      name: elements.name.value,
      email: elements.email.value,
      password: elements.password.value,
      confirmPassword: elements.confirmPassword.value,
    };

    const validateErrors = {};

    if (!data.name) validateErrors.name = 'O campo nome é obrigatório';
    if (!data.email) validateErrors.email = 'O campo email é obrigatório';
    if (!data.password) validateErrors.password = 'O campo senha é obrigatório';
    if (!data.confirmPassword)
      validateErrors.confirmPassword = 'O campo confirmar senha é obrigatório';
    if (data.password !== data.confirmPassword)
      validateErrors.confirmPassword = 'Confirme a senha por favor';

    if (Object.keys(validateErrors).length > 0) {
      setErrors(validateErrors);
      return;
    }

    setErrors(initialErrors);
    //Enviando dados para API
    try {
      const { data: response } = await api.post('/users/register', {
        name: data.name,
        email: data.email,
        password: data.password,
        origin: window.location.origin,
      });


      navigate(`/register/confirm?email=${response.email}`);
    } catch (error) {
      console.error(error.response.data);
      toast({
        title: 'Houve um erro para cadastrar',
      });
    }
  }

  return { errors, handleSubmit };
}
