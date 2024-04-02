import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const DenyTicketTransaction = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const denyTransaction = searchParams.get('denyTransaction');

    useEffect(() => {
        const denyTransactionFunction = async () => {
            try {
                await axios.get(`http://localhost:8080/api/transactions/denyTransaction?denyTransaction=${denyTransaction}`)
                .then(res => console.log(res))
                .catch(err => console.error(err))
            } catch (error) {
                console.log(error.response);
            }
        };

        if (denyTransaction) {
            denyTransactionFunction();
        }
    }, [denyTransaction]);

    return (
        <div>
            {/* Contenido del componente */}
        </div>
    );
};

export default DenyTicketTransaction;