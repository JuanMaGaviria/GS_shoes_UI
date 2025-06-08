import React, { useEffect, useState } from "react";
import { Outlet } from 'react-router-dom';
import { useNavigate, useLocation } from 'react-router-dom';
import { Toaster } from "react-hot-toast";
import '../utils/Sidebar.css'
import logo from '../../../../assets/Logo.png';
import { useUser } from '../../../../context/userContext'; // Ajustá el path según tu estructura



export default function Sidebar() {
    const { setUser } = useUser(); // Dentro del componente donde estés usando logout
    const navigate = useNavigate();
    const location = useLocation();
    const [activeItem, setActiveItem] = useState('');
    const [isCollapsed, setCollapsed] = useState(false);
    const [isRecepcionOpen, setIsRecepcionOpen] = useState(false);
    const [isSeguimientoOpen, setIsSeguimientoOpen] = useState(false);

    useEffect(() => {
        setActiveItem(location.pathname);
    }, [location.pathname]);

    const handleLogout = async () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('user');
        localStorage.setItem('closed_session', 'true');
      
        setUser(null); // ← esto limpia el contexto global
      
        navigate('/');
      };
    const toggleCollapse = () => {
        setCollapsed(!isCollapsed);
    };
    const meses = [
        "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio",
        "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];
    const tiempoTranscurrido = Date.now();
    const hoy = new Date(tiempoTranscurrido);
    const dia = hoy.getDate();
    const mes = hoy.getMonth();
    const ano = hoy.getFullYear();
    const fecha = `${meses[mes]} ${dia}, ${ano}`;

    return (
        <>
            <div className={`navigation ${isCollapsed ? "collapsed" : ""}`}>
                <div className="navb text-right flex flex-row mb-7">
                    <div className="retraer flex">
                        <svg className="icono" onClick={toggleCollapse} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="M8.025 22L6.25 20.225L14.475 12L6.25 3.775L8.025 2l10 10z"/></svg>

                    </div>
                    
                    <div className="pe flex flex-row items-center">
                        <div className="flex flex-row items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="M6.96 2c.418 0 .756.31.756.692V4.09c.67-.012 1.422-.012 2.268-.012h4.032c.846 0 1.597 0 2.268.012V2.692c0-.382.338-.692.756-.692s.756.31.756.692V4.15c1.45.106 2.403.368 3.103 1.008c.7.641.985 1.513 1.101 2.842v1H2V8c.116-1.329.401-2.2 1.101-2.842c.7-.64 1.652-.902 3.103-1.008V2.692c0-.382.339-.692.756-.692" /><path fill="currentColor" d="M22 14v-2c0-.839-.013-2.335-.026-3H2.006c-.013.665 0 2.161 0 3v2c0 3.771 0 5.657 1.17 6.828C4.349 22 6.234 22 10.004 22h4c3.77 0 5.654 0 6.826-1.172S22 17.771 22 14" opacity=".5" /><path fill="currentColor" fillRule="evenodd" d="M14 12.25A1.75 1.75 0 0 0 12.25 14v2a1.75 1.75 0 1 0 3.5 0v-2A1.75 1.75 0 0 0 14 12.25m0 1.5a.25.25 0 0 0-.25.25v2a.25.25 0 1 0 .5 0v-2a.25.25 0 0 0-.25-.25" clipRule="evenodd" /><path fill="currentColor" d="M11.25 13a.75.75 0 0 0-1.28-.53l-1.5 1.5a.75.75 0 0 0 1.06 1.06l.22-.22V17a.75.75 0 0 0 1.5 0z" /></svg>
                            <h5 className="mx-5 fecha">{fecha}</h5>
                            {/* <img src={""} className="w-11 mr-3 rounded-md" alt="" /> */}
                        </div>
                    </div>
                </div>
                <div className="app flex flex-row items-center justify-center w-full">
                    <div className="capsula flex ">
                        <div className="flex imagen">
                            <img src={logo} alt="" />
                        </div>
                        <span className="nombre">Control de inventario</span>
                    </div>
                </div>


                <ul className="ml-4 mt-8 ">
                    <small className="seccion_titulo">General</small>
                    <li className={`list cursor-pointer ${activeItem === '/app/inicio' ? 'active' : ''}`} onClick={() => navigate('/app/inicio')}>
                        <a>

                            <svg className="ic" xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24"><path fill="currentColor" d="M3 13h1v7c0 1.103.897 2 2 2h12c1.103 0 2-.897 2-2v-7h1a1 1 0 0 0 .707-1.707l-9-9a1 1 0 0 0-1.414 0l-9 9A1 1 0 0 0 3 13m7 7v-5h4v5zm2-15.586l6 6V15l.001 5H16v-5c0-1.103-.897-2-2-2h-4c-1.103 0-2 .897-2 2v5H6v-9.586z" /></svg>
                            <span className="title">Dashboard</span>
                        </a>
                    </li>
                    <li className={`list cursor-pointer ${activeItem === '/app/usuarios' ? 'active' : ''}`} onClick={() => navigate('/app/usuarios')}>
                        <a>
                            <svg className="ic" xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 19.128a9.38 9.38 0 0 0 2.625.372a9.337 9.337 0 0 0 4.121-.952a4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0a3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0a2.625 2.625 0 0 1 5.25 0Z" /></svg>
                            <span className="title">Usuarios</span>
                        </a>
                    </li>
                    <li className={`list cursor-pointer ${activeItem === '/app/articulos' ? 'active' : ''}`} onClick={() => navigate('/app/articulos')}>
                        <a>
                            <svg className="ic"  xmlns="http://www.w3.org/2000/svg" width="25" height="22.692307692307693" viewBox="0 0 520 472"><path fill="currentColor" d="M392 195q-74 0-145-152q-2-3-3.5-6t-3-7t-2.5-6Q225 3 200 3H93Q76 3 63.5 15.5T51 45q0 86-17 116q-46 56-15 162H8v64q0 17 12.5 29.5T51 429h426q18 0 30.5-12.5T520 387v-64q0-19-6.5-39.5t-20-41t-40-34T392 195m21 44q27 6 43 26.5t18.5 34T477 323h-64zM68 186q25-31 25-141h107q1 3 4.5 9t4.5 8q0 3 4 7q-1 0-7 4l-21 21q-14 16 0 30q6 7 15 7t15-7l17-17q2 5 8.5 15.5T249 137l-21 21q-16 16 0 30q6 7 15 7q8 0 15-7l17-17q15 19 34 34l-17 17q-16 16 0 30q6 7 15 7q8 0 15-7l21-21q2-2 2-4q10 4 26 8v88H63v-7q-5-15-8.5-36T53 230.5T68 186m409 201H51v-22h426zm-320-86q28 0 46-18t18-46q0-27-18-45.5T157 173q-27 0-45.5 18.5T93 237q0 28 18.5 46t45.5 18m0-85q10 0 16 6t6 15q0 22-22 22q-9 0-15-6t-6-16q0-9 6-15t15-6"/></svg>
                            <span className="title">Artículos</span>
                        </a>
                    </li>
                    <li className={`list cursor-pointer ${activeItem === '/app/movimientos' ? 'active' : ''}`} onClick={() => navigate('/app/movimientos')}>
                        <a>
                            <svg className="ic" xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 7H3m15 3l3-3l-3-3M6 20l-3-3l3-3m-3 3h18"/></svg>
                            <span className="title" style={{fontSize: '13.4px'}}>Movimientos inventario</span>
                        </a>
                    </li>
               
                    
                    <li className="config list mt-3 cursor-pointer absolute w-full bottom-1 mb-1"onClick={() => handleLogout()} style={{width: '88%'}}>
                        <a>
                            <svg className="ic" xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"><path strokeDasharray="16" strokeDashoffset="16" d="M19 12h-13.5"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.2s" values="16;0"/></path><path strokeDasharray="10" strokeDashoffset="10" d="M5 12l5 5M5 12l5 -5"><animate fill="freeze" attributeName="stroke-dashoffset" begin="0.2s" dur="0.2s" values="10;0"/></path></g></svg>
                            <span className="title">Cerrar sesión</span>
                        </a>
                    </li>

                </ul>
            </div>
            <div className="content">
                <div className="app-content">
                    <div className="projects-section">
                        <div className="seccion_conten rounded-lg">
                            <Toaster />
                            <Outlet />
                        </div>
                    </div>

                </div>
            </div>
        </>

    )
}
