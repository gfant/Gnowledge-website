import { Button } from "rsuite";
import { useNavigate } from 'react-router-dom';

export const GoToMakeQuestion = () => {
    const navigate = useNavigate();

    const GoToPath = () => {
        navigate('/make-question');
    };

    return <Button onClick={GoToPath}>
        Make Question
    </Button>
};