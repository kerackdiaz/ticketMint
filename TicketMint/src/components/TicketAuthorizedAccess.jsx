import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const TicketAuthorizedAccess = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get('id');

    useEffect(() => {
        const verification = async () => {
            try {
                axios.get(`http://localhost:8080/api/access/verifyAccess?id=${id}`)
                .then(res => console.log(res))
                .catch(err => console.error(err))
            } catch (error) {
                console.log(error.response);
            }
        };

        if (id) {
            verification();
        }
    }, [id]);

    return (
        <div>
            {/* Contenido del componente */}
        </div>
    );
};

export default TicketAuthorizedAccess;