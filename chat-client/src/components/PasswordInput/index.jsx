import {
  IconButton,
  InputGroup,
  Input,
  InputRightElement,
} from '@chakra-ui/react';
import { useState } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';

export function PasswordInput({ ...props }) {
  const [visible, setVisible] = useState(false);

  const toggleVisible = () => setVisible(!visible);

  return (
    <InputGroup>
      <Input {...props} type={visible ? 'text' : 'password'} />;
      <InputRightElement>
        <IconButton
          rounded={'2xl'}
          onClick={toggleVisible}
          size="sm"
          colorScheme="gray"
          aria-label="Toggle Password Visible"
          icon={visible ? <FiEyeOff /> : <FiEye />}
        />
      </InputRightElement>
    </InputGroup>
  );
}
