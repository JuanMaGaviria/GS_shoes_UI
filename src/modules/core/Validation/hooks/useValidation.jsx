import { useState } from 'react';

export function useValidation(validations) {
    const [errors, setErrors] = useState({});

    const validate = (field, value) => {
        const validation = validations[field];
        if (validation) {
            const errorMessage = validation(value);
            setErrors((prevErrors) => ({
                ...prevErrors,
                [field]: errorMessage || null,
            }));
        }
    };

    const validateAll = (data) => {
        const newErrors = {};
        for (const field in validations) {
            const errorMessage = validations[field](data[field]);
            if (errorMessage) {
                newErrors[field] = errorMessage;
            }
        }
        console.log(newErrors);
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; // Retorna true si no hay errores
    };

    const clearError = (field) => {
        setErrors((prevErrors) => ({
            ...prevErrors,
            [field]: null,
        }));
    };

    const setBackendErrors = (backendErrors) => {
        const formattedErrors = {};
        for (const field in backendErrors) {
            const messages = backendErrors[field];
            if (Array.isArray(messages) && messages.length > 0) {setBackendErrors 
                formattedErrors[field] = messages[0];
            }
        }
        setErrors((prevErrors) => ({
            ...prevErrors,
            ...formattedErrors,
        }));
    };

    return { errors, validate, validateAll, clearError, setBackendErrors };
}
