import { useState } from 'react';
import Swal from 'sweetalert2';
import api from '../../../services/api';

export const useUpdateData = () => {
    const [isUpdating, setIsUpdating] = useState(false);
    const [updateError, setUpdateError] = useState(null);

    const updateData = async (id, data, setBackendErrors,callback) => {
        setIsUpdating(true);
        setUpdateError(null);
        
        try {
            await api.put(`articulos/actualizar/${id}/`, data);

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
                title: "Datos actualizados correctamente",
            });
            if (callback) callback();
        } catch (err) {
            setUpdateError(err.message || 'Error al actualizar el registro');
            if (err.response?.data && typeof setBackendErrors === 'function') {
                setBackendErrors(err.response.data);
            }
        } finally {
            setIsUpdating(false);
        }
    };

    return { updateData, isUpdating, updateError };
};
