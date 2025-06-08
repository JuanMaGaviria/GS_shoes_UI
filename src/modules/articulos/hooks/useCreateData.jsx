import { useState } from 'react';
import api from '../../../services/api'; // Comentar para usar datos ficticios
import Swal from 'sweetalert2';
import articulosFicticios from '../data/articulosFicticios.json'; // Datos ficticios

export function useCreateData() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    // Configuración: true para usar backend, false para usar datos ficticios
    const USE_BACKEND = true; // Cambiar a true para usar backend

    const createData = async (articulo, setBackendErrors) => {
        setIsLoading(true);
        setError(null);
        try {
            let responseData;

            if (USE_BACKEND) {
                // Lógica para backend
                const response = await api.post('/articulos/crear/', {
                    nombre: articulo.nombre,
                    cantidad: articulo.cantidad,
                    precio: articulo.precio,
                    descripcion: articulo.descripcion
                });

                if (response.status !== 201) {
                    throw new Error('Error al crear el articulo');
                }
                responseData = response.data;
            } else {
                // Simular delay de API para datos ficticios
                await new Promise(resolve => setTimeout(resolve, 800));

                // Generar nuevo ID único
                const maxId = Math.max(...articulosFicticios.results.map(u => u.id), 0);
                const newId = maxId + 1;

                // Crear nuevo articulo con estructura completa
                const newArticulo = {
                    id: newId,
                    nombre: articulo.nombre,
                    cantidad: articulo.cantidad,
                    precio: articulo.precio,
                    descripcion: articulo.descripcion,
                    created_at: new Date().toISOString(),
                    updated_at: new Date().toISOString()
                };

            // Simular validaciones
            if (!articulo.nombre || !articulo.cantidad || !articulo.precio || !articulo.descripcion) {
                throw new Error('Campos obligatorios faltantes');
            }

                // Verificar si ya existe un articulo con el mismo nombre
                const existeNombre = articulosFicticios.results.some(
                    u => u.nombre === articulo.nombre
                );
             
                if (existeNombre) {
                    throw new Error('Ya existe un articulo con este nombre');
                }


                // Agregar al array de datos ficticios (solo en memoria)
                articulosFicticios.results.push(newArticulo);
                responseData = newArticulo;

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
                    ? "Articulo registrado correctamente en el servidor" 
                    : "Articulo registrado correctamente (modo demo)",
            });

            return responseData;

        } catch (err) {
            setError(err.message);

            if (err.response?.data && typeof setBackendErrors === 'function') {
                setBackendErrors(err.response.data);
            }
            
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
                title: "Error al crear articulo",
                text: err.message
            });

            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    return { createData, isLoading, error };
}