import { Button, Col, Row } from "rsuite";
import { useNavigate } from 'react-router-dom';

export const GoToMakeQuestion = () => {
    const navigate = useNavigate();

    const GoToPath = () => {
        navigate('/make-question');
    };

    return <>
        <Row>
            <Col>
                <Button onClick={GoToPath}>
                    Make Question
                </Button>
            </Col>
        </Row>
    </>
};