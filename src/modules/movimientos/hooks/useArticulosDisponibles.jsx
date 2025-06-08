import { useEffect, useState } from 'react';
import api from '../../../services/api';

export const useArticulosDisponibles = () => {
    const [articulos, setArticulos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchArticulos = async () => {
        setLoading(true);
        try {
            const response = await api.get('articulos/');
            setArticulos(response.data.results || []);
        } catch (err) {
            console.error('Error al cargar artículos:', err);
            setError('Error al obtener artículos');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchArticulos();
    }, []);

    return { articulos, loading, error };
};
