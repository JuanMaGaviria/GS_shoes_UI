import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import api from '../../../services/api'; // Comentar para usar datos ficticios
import usuariosFicticios from '../data/usuariosFicticios.json'; // Datos ficticios

const useFetchData = () => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    // Estados para paginación, búsqueda y ordenamiento
    const [searchQuery, setSearchQuery] = useState('');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [orderDirection, setOrderDirection] = useState('asc');
    const [valueToOrderBy, setValueToOrderBy] = useState('nombre');

    // Configuración: true para usar backend, false para usar datos ficticios
    const USE_BACKEND = true; // Cambiar a true para usar backend

    const fetchData = async () => {
        setIsLoading(true);
        setError(null);
        try {
            let responseData;
            
            if (USE_BACKEND) {
                // Lógica para backend
                const response = await api.get('usuarios/');
                responseData = Array.isArray(response.data)
                    ? response.data
                    : response.data.results || [];

            } else {
                // Simular delay de API para datos ficticios
                await new Promise(resolve => setTimeout(resolve, 500));
                responseData = usuariosFicticios.results;
            }

            // Procesar los datos (igual para ambos casos)
            const processedData = responseData.map((item) => ({
                ...item,
                created_at: format(new Date(item.created_at || new Date()), "d 'de' MMMM 'de' yyyy, HH:mm:ss", { locale: es }),
                updated_at: format(new Date(item.updated_at || new Date()), "d 'de' MMMM 'de' yyyy, HH:mm:ss", { locale: es }),
                estadoVisual: getVisualEstado(item.is_active),
                perfilVisual: getPerfilVisual(item.perfil)
            }));
            
            setData(processedData);
        } catch (err) {
            console.error('Error fetching data:', err);
            setError(err.message || 'Error al obtener los datos');
        } finally {
            setIsLoading(false);
        }
    };

    // Función para transformar el estado en un estilo visual
    const getVisualEstado = (estado) => ({
        text: estado ? "Activo" : "Inactivo",
        style: estado ? "estado-label activo" : "estado-label inactivo",
    });

    const getPerfilVisual = (perfil) => ({
        text: perfil === 1 ? "Interno" : "Empresa",
        style: perfil === 1 ? "perfil-label interno" : "perfil-label empresa",
    });

    useEffect(() => {
        setData((prevData) =>
            [...prevData].sort((a, b) => {
                if (a[valueToOrderBy] < b[valueToOrderBy]) {
                    return orderDirection === 'asc' ? -1 : 1;
                }
                if (a[valueToOrderBy] > b[valueToOrderBy]) {
                    return orderDirection === 'asc' ? 1 : -1;
                }
                return 0;
            })
        );
        fetchData()
    }, [valueToOrderBy, orderDirection]);

    // Función de búsqueda
    const handleSearchChange = (query) => {
        setSearchQuery(query.toLowerCase());
        setPage(0);
    };

    // Función de cambio de página
    const handleChangePage = (newPage) => {
        setPage(newPage);
    };

    // Función de cambio de filas por página
    const handleChangeRowsPerPage = (rows) => {
        setRowsPerPage(rows);
        setPage(0);
    };

    // Función de ordenamiento
    const createSortHandler = (property) => {
        const isAscending = valueToOrderBy === property && orderDirection === 'asc';
        setOrderDirection(isAscending ? 'desc' : 'asc');
        setValueToOrderBy(property);
    
        setData((prevData) =>
            [...prevData].sort((a, b) => {
                if (a[property] < b[property]) {
                    return isAscending ? 1 : -1;
                }
                if (a[property] > b[property]) {
                    return isAscending ? -1 : 1;
                }
                return 0;
            })
        );
    };

    // Filtrar, ordenar y paginar los datos
    const filteredData = data.filter((usuario) => 
        usuario.nombre_completo.toLowerCase().includes(searchQuery)
    );

    const sortedData = filteredData.sort((a, b) => {
        if (a[valueToOrderBy] < b[valueToOrderBy]) {
            return orderDirection === 'asc' ? -1 : 1;
        }
        if (a[valueToOrderBy] > b[valueToOrderBy]) {
            return orderDirection === 'asc' ? 1 : -1;
        }
        return 0;
    });

    const paginatedData = sortedData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    return {
        data: paginatedData,
        setData,
        isLoading,
        error,
        totalCount: sortedData.length,
        page,
        rowsPerPage,
        orderDirection,
        valueToOrderBy,
        handleSearchChange,
        handleChangePage,
        handleChangeRowsPerPage,
        createSortHandler,
        refetch: fetchData,
        getPerfilVisual
    };
};

export default useFetchData;