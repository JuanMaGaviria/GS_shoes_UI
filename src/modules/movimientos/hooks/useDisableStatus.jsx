import { useState } from 'react';
import Swal from 'sweetalert2';
import api from '../../../services/api';

export const useDisableStatus = (setData) => {
    const [isUpdating, setIsUpdating] = useState(false);
    const [updateError, setUpdateError] = useState(null);

    const toggleStatus = async (id, currentStatus) => {
        setIsUpdating(true);
        setUpdateError(null);

        try {
            const result = await Swal.fire({
                title: "¿Estás seguro?",
                text: "¡El registro cambiará su estado!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#50C277",
                cancelButtonColor: "#424242",
                confirmButtonText: "Sí, cambiar estado",
                cancelButtonText: "Cancelar",
            });

            if (!result.isConfirmed) return;

            const response = await api.patch(`movimientos/actualizar/${id}/`);
            const updated = response.data;

            const newStatus = updated.is_active ?? currentStatus;

            setData((prev) =>
                prev.map((item) =>
                    item.id === id
                        ? {
                            ...item,
                            is_active: newStatus,
                            estadoVisual: {
                                text: newStatus ? "Activo" : "Inactivo",
                                style: newStatus ? "estado-label activo" : "estado-label inactivo",
                            },
                        }
                        : item
                )
            );

            Swal.fire({
                icon: "success",
                title: "Estado actualizado",
                text: `El estado se ha cambiado a ${newStatus ? "Activo" : "Inactivo"}.`,
                timer: 3000,
                showConfirmButton: false,
                toast: true,
                position: "top-right",
            });
        } catch (err) {
            setUpdateError(err.message || 'Error al actualizar el estado');

            Swal.fire({
                icon: "error",
                title: "Error",
                text: `No se pudo actualizar el estado: ${err.message}`,
                timer: 3000,
                showConfirmButton: false,
                toast: true,
                position: "top-right",
            });

            throw err;
        } finally {
            setIsUpdating(false);
        }
    };

    return { toggleStatus, isUpdating, updateError };
};
