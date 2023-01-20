import { useToast } from '@chakra-ui/react';
import { useState } from 'react';
import { api } from '../../../services/api';

export function useForgetPassLogic() {
  const [error, setError] = useState();
  const toast = useToast({ position: 'top' });
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    const { elements } = event.target;

    const email = elements.email.value;
    if (!email) return setError(true);
    setError(false);

    setIsLoading(true);

    try {
      const { data: response } = await api.post('/users/forget-password', {
        email,
        origin: window.location.origin,
      });
      setIsLoading(false);

      if (response) {
        toast({
          title:
            'Se o e-mail existir em nossa base, enviaremos o link para recuperação!',
        });
      }
    } catch (error) {
      toast({ title: error.response.data.msg, status: 'error' });
    }

    setIsLoading(false);
  }

  return { handleSubmit, error, isLoading };
}
