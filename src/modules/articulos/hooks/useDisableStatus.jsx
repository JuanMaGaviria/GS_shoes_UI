import { useState } from 'react';
import Swal from 'sweetalert2';
import api from '../../../services/api'; // Comentar para usar datos ficticios
import articulosFicticios from '../data/articulosFicticios.json'; // Datos ficticios

export const useDisableStatus = (setArticulos) => {
    const [isUpdating, setIsUpdating] = useState(false);
    const [updateError, setUpdateError] = useState(null);

    // Configuración: true para usar backend, false para usar datos ficticios
    const USE_BACKEND = true; // Cambiar a true para usar backend

    const toggleStatus = async (id, currentStatus) => {
        setIsUpdating(true);
        setUpdateError(null);
        
        try {
            // SweetAlert para confirmar la acción
            const result = await Swal.fire({
                title: "¿Estás seguro?",
                text: "¡El registro cambiará su estado!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#F09ECB",
                cancelButtonColor: "#E8E8E8",
                confirmButtonText: "Sí, cambiar estado",
                cancelButtonText: "Cancelar",
            });

            if (result.isConfirmed) {
                let newStatus;

                if (USE_BACKEND) {
                    // Lógica para backend
                    const response = await api.patch(`articulos/actualizar/${id}/`);
                    newStatus = response.data.is_active;
                } else {
                    // Simular delay de API para datos ficticios
                    await new Promise(resolve => setTimeout(resolve, 600));

                    // Buscar el artículo en los datos ficticios
                    const articuloIndex = articulosFicticios.results.findIndex(u => u.id === id);

                    if (articuloIndex === -1) {
                        throw new Error('Artículo no encontrado');
                    }

                    // Cambiar el estado en los datos ficticios
                    newStatus = !articulosFicticios.results[articuloIndex].is_active;
                    articulosFicticios.results[articuloIndex].is_active = newStatus;
                    articulosFicticios.results[articuloIndex].updated_at = new Date().toISOString();

                    // Simular posibles errores aleatorios (3% de probabilidad)
                    if (Math.random() < 0.03) {
                        throw new Error('Error simulado del servidor al cambiar estado');
                    }
                }

                // Actualizar el estado local con la nueva data
                setArticulos((prev) =>
                    prev.map((item) =>
                        item.id === id
                            ? {
                                ...item,
                                is_active: newStatus,
                                estadoVisual: {
                                    text: newStatus ? "Activo" : "Inactivo",
                                    style: newStatus ? "estado-label activo" : "estado-label inactivo",
                                },
                                updated_at: new Date().toLocaleDateString('es-ES', {
                                    day: 'numeric',
                                    month: 'long',
                                    year: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit',
                                    second: '2-digit'
                                })
                            }
                            : item
                    )
                );

                // SweetAlert de éxito
                Swal.fire({
                    icon: "success",
                    title: "Estado actualizado",
                    text: `El estado se ha cambiado a ${newStatus ? "Activo" : "Inactivo"}${USE_BACKEND ? '' : ' (modo demo)'}.`,
                    timer: 3000,
                    showConfirmButton: false,
                    toast: true,
                    position: "top-right",
                });
            }
        } catch (err) {
            setUpdateError(err.message || 'Error al actualizar el estado');

            // SweetAlert de error
            Swal.fire({
                icon: "error",
                title: "Error",
                text: `No se pudo actualizar el estado: ${err.message}`,
                timer: 4000,
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