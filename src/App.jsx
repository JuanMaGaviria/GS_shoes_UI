// importaciones de react
import './index.css';
import { Routes, Route } from 'react-router-dom';

// importaciones generales 
import Login from './modules/core/Login/components/Login.jsx'

import CambiarClave from './modules/Core/Login/components/CambiarClave.jsx';
import Sidebar from './modules/Core/Sidebar/components/Sidebar.jsx';
import ProtectedRoute from './modules/Core/ProtectedRoute/components/ProtectedRoute.jsx';

// importaciones de modulos
import Inicio from './modules/Inicio/components/Inicio.jsx';
import Usuarios from './modules/Usuarios/components/Usuarios.jsx';
import Articulos from './modules/Articulos/components/Articulos.jsx';
import Movimientos from './modules/movimientos/components/Movimientos.jsx';

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/restablecer-contrasena/:token" element={<CambiarClave />} />
            <Route path="/app" element={<Sidebar />}>
                <Route path="inicio" element={<Inicio />} />
                <Route path="usuarios" element={<Usuarios />} />
                <Route path="articulos" element={<Articulos />} />
                <Route path="movimientos" element={<Movimientos />} />
            </Route>
        </Routes>
    );
};

export default App;