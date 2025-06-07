import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import api from '../../../../services/api';
import { useUser  } from '../../../../context/userContext';

const useAuth = () => {
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const location = useLocation();
  const { setUser } = useUser();

  const handleLogin = async (event) => {
    event.preventDefault();
    setErrors({});
    toast.promise(
      api.post('/usuarios/login/', { correo, password }),
      {
        loading: 'Iniciando sesión...',
        success: (response) => {
          localStorage.setItem('access_token', response.data.access_token);
          localStorage.setItem('user', JSON.stringify(response.data.user));
        
          setUser(response.data.user); // ← esto actualiza el contexto de inmediato
        
          const from = location.state?.from?.pathname || '/app/inicio';
          navigate(from);
        
          return '¡Sesión iniciada exitosamente!';
        },
        error: (error) => {
          if ("error" in error.response.data) {
            return error.response.data.error || 'Error al iniciar sesión.';
          } else {
            setErrors(error.response.data);
            return 'Error al iniciar sesión. Por favor, verifica tus credenciales.';
          }
        },
      },
      {
        style: { borderRadius: '10px', background: '#333', color: '#fff' },
        duration: 4000,
      }
    );
  };

  return {
    correo,
    password,
    errors,
    setCorreo,
    setPassword,
    handleLogin,
  };
};

export default useAuth;
