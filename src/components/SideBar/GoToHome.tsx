import { Button } from "rsuite";
import { useNavigate } from 'react-router-dom';

export const GoToHome = () => {
    const navigate = useNavigate();

    const GoToPath = () => {
        navigate('/');
    };

    return <Button onClick={GoToPath}>
        Home
    </Button>
};