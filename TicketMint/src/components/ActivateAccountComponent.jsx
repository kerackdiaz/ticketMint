import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const ActivateAccountComponent = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const verifyAccount = searchParams.get('verifyAccount');

    useEffect(() => {
        const activateAccount = async () => {
            try {
                await axios.get(`http://localhost:8080/api/verifyAccount?verifyAccount=${verifyAccount}`);
                // Manejar la respuesta del back-end (éxito o error)
            } catch (error) {
                // Manejar errores de la petición
            }
        };

        if (verifyAccount) {
            activateAccount();
        }
    }, [verifyAccount]);

    return (
        <div>
            {/* Contenido del componente */}
        </div>
    );
};

export default ActivateAccountComponent;
