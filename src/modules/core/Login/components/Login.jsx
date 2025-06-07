import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import RestablecerClave from './RestablecerClave';
// import useAuth from '../hooks/useAuth'; // COMENTADO - Backend
// import useSessionNotifications from '../hooks/useSessionNotification'; // COMENTADO - Backend
import Logo from '../../../../assets/logo.png'
import '../utils/Login.css';

const Login = () => {
  const navigate = useNavigate();
  
  // SIMULACIÓN DE ESTADO LOCAL - Reemplaza useAuth hook
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  
  // const { correo, password, errors, setCorreo, setPassword, handleLogin } = useAuth(); // COMENTADO - Backend
  const [isLogin, setIsLogin] = useState(true); // true: muestra login, false: muestra restablecimiento
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  
  // useSessionNotifications(); // COMENTADO - Backend

  const [showPassword, setShowPassword] = useState(false)

  const togglePasswordVisibility = () => setShowPassword(!showPassword)

  const handleResetToggle = () => {
    setIsLogin(false);
  };

  // SIMULACIÓN DE LOGIN - Reemplaza handleLogin del hook
  const handleLogin = (e) => {
    e.preventDefault();
    
    // Validación básica local (opcional)
    const newErrors = {};
    
    if (!correo.trim()) {
      newErrors.correo = ['El correo es requerido'];
    }
    
    if (!password.trim()) {
      newErrors.password = ['La contraseña es requerida'];
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    // Limpiar errores
    setErrors({});
    
    // SIMULACIÓN DE LOGIN EXITOSO
    console.log('Simulando login con:', { correo, password });
    
    // Aquí puedes guardar datos simulados en localStorage si necesitas persistencia
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('user', JSON.stringify({ 
      correo: correo, 
      nombre: 'Usuario Demo' 
    }));
    
    // Navegar a la página principal o dashboard
    navigate('/app/inicio'); // Cambia '/dashboard' por la ruta que necesites
    
    // CÓDIGO ORIGINAL COMENTADO - Backend
    // handleLogin(e); // Esta función venía del hook useAuth
  };

  return (
    <div className="flex items-center min-h-screen max-h-full">
      <Toaster />

      <div className='flex min-h-screen w-1/2 cont'>
        <div className="flex flex-col" style={{ padding: '140px', width: '100%' }}>
          {isLogin ? (
            <>
              <div className="space-y-1 flex flex-col items-center mb-4">
                <img src={Logo} className='w-32 mb-3' alt="" />

                <span className="justify-between items-center font-bold text-3xl" style={{ color: '#5d6364' }}>Bienvenido</span>
              </div>
              <div className="space-y-4">

                <form onSubmit={handleLogin}>
                  <div className="space-y-2" style={{ marginTop: '10px', marginBottom: '10px' }}>
                    <label className='text-sm text-gray-500' htmlFor="correo">Correo</label>
                    <input
                      type="text"
                      id="correo"
                      name="correo"
                      style={{ marginTop: '1px', marginBottom: '' }}
                      className="campo block w-full rounded-md border-0 py-1.5 pl-3 pr-1 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                      placeholder="Ingrese su correo"
                      value={correo}
                      autoComplete='off'
                      onChange={(e) => setCorreo(e.target.value)}
                    />
                    {errors.correo && <div className="error-message">{errors.correo.join(' ')}</div>}
                  </div>
                  <div className="space-y-2" style={{marginBottom: '10px'}}>
                    <label className='text-sm text-gray-500' htmlFor="password">Contraseña</label>
                    <div className="relative">
                      <input
                        id="password"
                        style={{ marginTop: '1px' }}
                        className="campo block w-full rounded-md border-0 py-1.5 pl-3 pr-1 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                        type={showPassword ? "text" : "password"}
                        placeholder="Ingrese su contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 focus:outline-none"
                        aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                      >
                        {showPassword ? <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"><path d="M3 13c3.6-8 14.4-8 18 0" /><path d="M12 17a3 3 0 1 1 0-6a3 3 0 0 1 0 6" /></g></svg> : <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 16 16"><path fill="currentColor" d="m10.12 10.827l4.026 4.027a.5.5 0 0 0 .708-.708l-13-13a.5.5 0 1 0-.708.708l3.23 3.23A6 6 0 0 0 3.2 6.182a6.7 6.7 0 0 0-1.117 1.982c-.021.061-.047.145-.047.145l-.018.062s-.076.497.355.611a.5.5 0 0 0 .611-.355l.001-.003l.008-.025l.035-.109a5.7 5.7 0 0 1 .945-1.674a5 5 0 0 1 1.124-1.014L6.675 7.38a2.5 2.5 0 1 0 3.446 3.446m-3.8-6.628l.854.854Q7.564 5 8 5c2.044 0 3.286.912 4.028 1.817a5.7 5.7 0 0 1 .945 1.674q.025.073.035.109l.008.025v.003l.001.001a.5.5 0 0 0 .966-.257v-.003l-.001-.004l-.004-.013a2 2 0 0 0-.06-.187a6.7 6.7 0 0 0-1.117-1.982C11.905 5.089 10.396 4 8.002 4c-.618 0-1.177.072-1.681.199" /></svg>}
                      </button>
                      {errors.password && <div className="error-message">{errors.password.join(' ')}</div>}
                    </div>
                  </div>
                  <span className='text-gray-600 text-sm' >¿Olvidaste tu contraseña? <a className="text-[#F09ECB] hover:underline cursor-pointer" onClick={handleResetToggle}>Recuperla</a></span>
                  <button className="mt-5 w-full sub" type="submit" style={{ marginTop: '30px' }}>Iniciar sesión</button>
                </form>
              </div>
            </>
          ) : (
            <RestablecerClave setIsLogin={setIsLogin} />
          )}

        </div>
      </div>

      <div className="fond flex flex-col z-10 justify-center w-1/2 min-h-screen " style={{ backgroundColor: '#bababa' }}>
        <div className="context">
        <h1 className="text-dark-color ml-3 text-xl font-semibold">
          <span style={{ color: "#5d6364" }}>T</span>ableros de 
          <span style={{ color: "#5d6364" }}> A</span>nálisis de 
          <span style={{ color: "#5d6364" }}> M</span>étricas
          <span style={{ color: "#5d6364" }}> E</span>scenciales
        </h1>
        <span className='nombre_app font-extrabold'>T.A.M.E</span>
        </div>

        <div className="area" >
          <ul className="circles">
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
          </ul>
        </div >
      </div>
    </div>
  );
};

export default Login;