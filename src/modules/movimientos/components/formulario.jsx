import React, { useEffect } from 'react';
import { useValidation } from '../../core/Validation/hooks/useValidation';

const Formulario = ({ formData, setFormData, modalData, backendErrors, articulos }) => {
    const validations = {
        articulo: (value) => !value ? 'Debe seleccionar un artículo.' : null,
        tipo: (value) => !value ? 'Debe seleccionar el tipo de movimiento.' : null,
        cantidad_total: (value) => {
            if (!value) return 'Debe ingresar la cantidad.';
            if (isNaN(value)) return 'La cantidad debe ser un número.';
            if (value <= 0) return 'La cantidad debe ser mayor que 0.';
            return null;
        },
        descripcion: (value) => !value ? 'Debe ingresar una descripción.' : null,
        cedula_cliente: (value) => formData.tipo === 'SALIDA' && (!value || isNaN(value)) ? 'Debe ingresar la cédula del cliente.' : null,
        nombre_cliente: (value) => formData.tipo === 'SALIDA' && !value ? 'Debe ingresar el nombre del cliente.' : null,
    };

    const { errors, validate, validateAll, clearError, setBackendErrors } = useValidation(validations);

    useEffect(() => {
        if (backendErrors) {
            setBackendErrors(backendErrors);
        }
    }, [backendErrors]);

    const handleChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        validate(field, value);
    };

    return (
        <div className="space-y-4 mt-2">

            {/* Artículo */}
            <div>
                <label className="text-sm font-medium text-gray-700">Artículo <span className="text-red-600">*</span></label>
                <select
                    className={`campo w-full mt-1 border ${errors.articulo ? 'border-red-500' : 'border-gray-300'} rounded-md p-2`}
                    value={formData.articulo || ''}
                    onChange={(e) => handleChange('articulo', e.target.value)}
                    onBlur={() => validate('articulo', formData.articulo)}
                >
                    <option value="">Seleccione un artículo</option>
                    {articulos.map(art => (
                        <option key={art.id} value={art.id}>{art.nombre}</option>
                    ))}
                </select>
                {errors.articulo && <small className="text-red-500">{errors.articulo}</small>}
            </div>

            {/* Tipo */}
            <div>
                <label className="text-sm font-medium text-gray-700">Tipo de movimiento <span className="text-red-600">*</span></label>
                <select
                    className={`campo w-full mt-1 border ${errors.tipo ? 'border-red-500' : 'border-gray-300'} rounded-md p-2`}
                    value={formData.tipo || ''}
                    onChange={(e) => handleChange('tipo', e.target.value)}
                    onBlur={() => validate('tipo', formData.tipo)}
                >
                    <option value="">Seleccione un tipo</option>
                    <option value="ENTRADA">Entrada</option>
                    <option value="SALIDA">Salida</option>
                </select>
                {errors.tipo && <small className="text-red-500">{errors.tipo}</small>}
            </div>

            {/* Cantidad */}
            <div>
                <label className="text-sm font-medium text-gray-700">Cantidad <span className="text-red-600">*</span></label>
                <input
                    type="number"
                    className={`campo w-full mt-1 border ${errors.cantidad_total ? 'border-red-500' : 'border-gray-300'} rounded-md p-2`}
                    value={formData.cantidad_total || ''}
                    onChange={(e) => handleChange('cantidad_total', e.target.value)}
                    onBlur={() => validate('cantidad_total', formData.cantidad_total)}
                />
                {errors.cantidad_total && <small className="text-red-500">{errors.cantidad_total}</small>}
            </div>

            {/* Descripción */}
            <div>
                <label className="text-sm font-medium text-gray-700">Descripción <span className="text-red-600">*</span></label>
                <textarea
                    className={`campo w-full mt-1 border ${errors.descripcion ? 'border-red-500' : 'border-gray-300'} rounded-md p-2`}
                    value={formData.descripcion || ''}
                    onChange={(e) => handleChange('descripcion', e.target.value)}
                    onBlur={() => validate('descripcion', formData.descripcion)}
                />
                {errors.descripcion && <small className="text-red-500">{errors.descripcion}</small>}
            </div>

            {/* Datos del cliente (solo si tipo = SALIDA) */}
            {formData.tipo === 'SALIDA' && (
                <>
                    <div>
                        <label className="text-sm font-medium text-gray-700">Cédula del cliente <span className="text-red-600">*</span></label>
                        <input
                            type="number"
                            className={`campo w-full mt-1 border ${errors.cedula_cliente ? 'border-red-500' : 'border-gray-300'} rounded-md p-2`}
                            value={formData.cedula_cliente || ''}
                            onChange={(e) => handleChange('cedula_cliente', e.target.value)}
                            onBlur={() => validate('cedula_cliente', formData.cedula_cliente)}
                        />
                        {errors.cedula_cliente && <small className="text-red-500">{errors.cedula_cliente}</small>}
                    </div>
                    <div>
                        <label className="text-sm font-medium text-gray-700">Nombre del cliente <span className="text-red-600">*</span></label>
                        <input
                            type="text"
                            className={`campo w-full mt-1 border ${errors.nombre_cliente ? 'border-red-500' : 'border-gray-300'} rounded-md p-2`}
                            value={formData.nombre_cliente || ''}
                            onChange={(e) => handleChange('nombre_cliente', e.target.value)}
                            onBlur={() => validate('nombre_cliente', formData.nombre_cliente)}
                        />
                        {errors.nombre_cliente && <small className="text-red-500">{errors.nombre_cliente}</small>}
                    </div>
                </>
            )}
        </div>
    );
};

export default Formulario;
