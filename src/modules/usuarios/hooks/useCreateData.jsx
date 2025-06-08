import { useState } from 'react';
import api from '../../../services/api'; // Comentar para usar datos ficticios
import Swal from 'sweetalert2';
import usuariosFicticios from '../data/usuariosFicticios.json';

export function useCreateData() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    // Configuración: true para usar backend, false para usar datos ficticios
    const USE_BACKEND = true; // Cambiar a true para usar backend

    const createData = async (usuario, setBackendErrors) => {
        setIsLoading(true);
        setError(null);
        try {
            let responseData;

            if (USE_BACKEND) {
                // Lógica para backend
                const response = await api.post('/usuarios/crear/', {
                    nombre_completo: usuario.nombre_completo,
                    identificacion: usuario.identificacion,
                    telefono: usuario.telefono,
                    area: usuario.area,
                    empresa: usuario.empresa,
                    perfil: usuario.perfil,
                    correo: usuario.correo,
                    password: usuario.password
                });

                if (response.status !== 201) {
                    throw new Error('Error al crear el usuario');
                }
                responseData = response.data;
            } else {
                // Simular delay de API para datos ficticios
                await new Promise(resolve => setTimeout(resolve, 800));

                // Generar nuevo ID único
                const maxId = Math.max(...usuariosFicticios.results.map(u => u.id), 0);
                const newId = maxId + 1;

                // Crear nuevo usuario con estructura completa
                const newUser = {
                    id: newId,
                    nombre_completo: usuario.nombre_completo,
                    identificacion: usuario.identificacion,
                    telefono: usuario.telefono,
                    area: usuario.area,
                    empresa: usuario.empresa,
                    perfil: parseInt(usuario.perfil), // Asegurar que sea número
                    correo: usuario.correo,
                    password: usuario.password,
                    is_active: true, // Por defecto los nuevos usuarios están activos
                    created_at: new Date().toISOString(),
                    updated_at: new Date().toISOString()
                };

                // Simular validaciones
                if (!usuario.nombre_completo || !usuario.identificacion || !usuario.correo) {
                    throw new Error('Campos obligatorios faltantes');
                }

                // Verificar si ya existe un usuario con la misma identificación o correo
                const existeIdentificacion = usuariosFicticios.results.some(
                    u => u.identificacion === usuario.identificacion
                );
                const existeCorreo = usuariosFicticios.results.some(
                    u => u.correo === usuario.correo
                );

                if (existeIdentificacion) {
                    throw new Error('Ya existe un usuario con esta identificación');
                }

                if (existeCorreo) {
                    throw new Error('Ya existe un usuario con este correo electrónico');
                }

                // Agregar al array de datos ficticios (solo en memoria)
                usuariosFicticios.results.push(newUser);
                responseData = newUser;

                // Simular posibles errores aleatorios (5% de probabilidad)
                if (Math.random() < 0.05) {
                    throw new Error('Error simulado del servidor');
                }
            }

            // Toast de éxito (común para ambos casos)
            const Toast = Swal.mixin({
                toast: true,
                position: "top-right",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.onmouseenter = Swal.stopTimer;
                    toast.onmouseleave = Swal.resumeTimer;
                }
            });
            
            Toast.fire({
                icon: "success",
                title: USE_BACKEND 
                    ? "Usuario registrado correctamente en el servidor" 
                    : "Usuario registrado correctamente (modo demo)",
            });

            return responseData;

        } catch (err) {
            setError(err.message);
            
            // Toast de error
            const Toast = Swal.mixin({
                toast: true,
                position: "top-right",
                showConfirmButton: false,
                timer: 4000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.onmouseenter = Swal.stopTimer;
                    toast.onmouseleave = Swal.resumeTimer;
                }
            });
            
            Toast.fire({
                icon: "error",
                title: "Error al crear usuario",
                text: err.message
            });
            if (err.response && err.response.data) {
                const backendErrors = err.response.data;
            
                // Llama a la función del formulario para que muestre los errores de backend
                if (typeof setBackendErrors === 'function') {
                    setBackendErrors(backendErrors);
                }
            }

            throw err;
            
        } finally {
            
            setIsLoading(false); 

        }
    };

    return { createData, isLoading, error };
}