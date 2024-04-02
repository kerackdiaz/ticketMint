import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const AcceptTicketTransaction = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const verifyTransaction = searchParams.get('verifyTransaction');

    useEffect(() => {
        const acceptTransaction = async () => {
            try {
                axios.get(`http://localhost:8080/api/transactions/verifyTransaction?verifyTransaction=${verifyTransaction}`)
                .then(res => console.log(res))
                .catch(err => console.error(err))
            } catch (error) {
                console.log(error.response);
            }
        };

        if (verifyTransaction) {
            acceptTransaction();
        }
    }, [verifyTransaction]);

    return (
        <div>
            {/* Contenido del componente */}
        </div>
    );
};

export default AcceptTicketTransaction;