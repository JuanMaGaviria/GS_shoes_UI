// FormularioArticulo.jsx
import React, { useState, useEffect } from 'react';
import { useValidation } from '../../core/Validation/hooks/useValidation.jsx';


const Formulario = ({ formData, setFormData, modalData}) => {

    const validations = {
        nombre: (value) => {
            if (!value) return 'El nombre es obligatorio.';
            if (value.length < 3) return 'El nombre debe tener al menos 3 caracteres.';
            return null;
        },
        cantidad: (value) => {
            if (!value) return 'La cantidad es obligatoria.';
            if (isNaN(value)) return 'La cantidad debe ser un número.';
            if (value <= 0) return 'La cantidad debe ser mayor que cero.';
            return null;
        },
        precio: (value) => {
            if (!value) return 'El precio es obligatorio.';
            if (isNaN(value)) return 'El precio debe ser un número.';
            if (value <= 0) return 'El precio debe ser mayor que cero.';
            return null;
        },
        descripcion: (value) => {
            if (!modalData && !value) return 'La descripción es obligatoria.'; // Solo obligatorio en modo creación
            if (value && value.length < 4) return 'La descripción debe tener al menos 4 caracteres.';
            return null;
        }
      
       
    };

    const { errors, validate, validateAll, clearError } = useValidation(validations);


    return (
        <>
            <div className="flex" style={{ marginBottom: '10px', marginTop: '10px' }}>
                <div className="flex flex-col w-full">
                    <label className="text-zinc-800 text-sm mt-7" htmlFor="nombre">
                        Nombre del articulo <span className="font-bold text-red-700">*</span>
                    </label>
                    <input
                        type="text"
                        id="nombre"
                        placeholder="Ingrese el nombre del articulo"
                        className={`campo block w-full rounded-md border py-1.5 pl-2 pr-1 mt-1 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset sm:text-sm sm:leading-6 ${errors.nombre ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-green-500'}`}
                        value={formData.nombre}
                        onChange={(e) => {
                            setFormData({ ...formData, nombre: e.target.value });
                            validate('nombre', e.target.value);
                        }}
                        onBlur={() => validate('nombre', formData.nombre)}
                    />
                    {errors.nombre && <small className="text-red-500">{errors.nombre}</small>}
                </div>

                
            </div>

        
            <div className="flex" style={{ marginBottom: '10px', marginTop: '10px' }}>
                <div className="flex flex-col w-full" style={{ marginRight: '10px' }}>
                    <label className="text-zinc-800 text-sm mt-7" htmlFor="cantidad">
                        Cantidad <span className="font-bold text-red-700">*</span>
                    </label>
                    <input
                        type="text"
                        id="cantidad"
                        placeholder="Ingrese la cantidad"
                        className={`campo block w-full rounded-md border py-1.5 pl-2 pr-1 mt-1 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset sm:text-sm sm:leading-6 ${errors.cantidad ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-green-500'}`}
                        value={formData.cantidad}
                        onChange={(e) => {
                            setFormData({ ...formData, cantidad: e.target.value });
                            validate('cantidad', e.target.value);
                        }}
                        onBlur={() => validate('cantidad', formData.cantidad)}
                    />
                    {errors.cantidad && <small className="text-red-500">{errors.cantidad}</small>}
                </div>
                
           
                <div className="flex flex-col w-full">
                    <label className="text-zinc-800 text-sm mt-7" htmlFor="precio">
                        Precio del artículo <span className="font-bold text-red-700">*</span>
                    </label>
                    <input
                        type="number"
                        id="precio"
                        placeholder="Ingrese el precio"
                        className={`campo block w-full rounded-md border py-1.5 pl-2 pr-1 mt-1 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset sm:text-sm sm:leading-6 ${errors.precio ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-green-500'}`}
                        value={formData.precio}
                        onChange={(e) => {
                            setFormData({ ...formData, precio: e.target.value });
                            validate('precio', e.target.value);
                        }}
                        onBlur={() => validate('precio', formData.precio)}
                    />
                    {errors.precio && <small className="text-red-500">{errors.precio}</small>}
                </div>

            </div>
             <div className="flex" style={{ marginBottom: '10px', marginTop: '10px' }}>
                <div className="flex flex-col w-full">
                    <label className="text-zinc-800 text-sm mt-7" htmlFor="descripcion">
                        Descripcion del articulo <span className="font-bold text-red-700">*</span>
                    </label>
                    <textarea
                        id="descripcion"
                        placeholder="Ingrese la descripcion del articulo"
                        className={`campo block w-full rounded-md border py-1.5 pl-2 pr-1 mt-1 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset sm:text-sm sm:leading-6 ${errors.descripcion ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-green-500'}`}
                        value={formData.descripcion}
                        onChange={(e) => {
                            setFormData({ ...formData, descripcion: e.target.value });
                            validate('descripcion', e.target.value);
                        }}
                        onBlur={() => validate('descripcion', formData.descripcion)}
                    />
                    {errors.descripcion && <small className="text-red-500">{errors.descripcion}</small>}
                </div>

                
            </div>

        </>
    );
};

export default Formulario;
