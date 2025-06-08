import { useState } from 'react';
import api from '../../../services/api';
import Swal from 'sweetalert2';

export function useCreateData() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [backendErrors, setBackendErrors] = useState({});

    const createData = async (data, setBackendErrors) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await api.post('/movimientos/crear/', {
                articulo: data.articulo,
                tipo: data.tipo,
                cantidad_total: data.cantidad_total,
                descripcion: data.descripcion,
                ...(data.tipo === 'SALIDA' && {
                    cedula_cliente: data.cedula_cliente,
                    nombre_cliente: data.nombre_cliente
                })
            });

            if (response.status !== 201) {
                throw new Error('Error al crear el movimiento');
            }

            Swal.fire({
                icon: "success",
                title: "Movimiento registrado correctamente",
                toast: true,
                position: "top-right",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true
            });

            return response.data;
        } catch (err) {
            setError(err.message);
            if (err.response?.data && typeof setBackendErrors === 'function') {
                setBackendErrors(err.response.data);
            }
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    return { createData, isLoading, error, backendErrors };
}
