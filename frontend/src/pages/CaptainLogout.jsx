
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

function CaptainLogout() {

    const navigate = useNavigate();
    const token = localStorage.getItem('token')

    axios.get(`${import.meta.env.VITE_BASE_URL}/captains/logout`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    .then((response) => {
        if (response.status === 200) {
            localStorage.removeItem('token');
            navigate('/captain-login');
        }
    })
    .catch((error) => {
        console.error('Error logging out:', error);
    });

    return (
        <div>
            <p>Logging out...</p>
        </div>
    )
}

export default CaptainLogout
