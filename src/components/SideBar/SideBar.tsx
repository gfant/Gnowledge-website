import { Col, Row } from "rsuite";
import { GoRegisterMember } from "./GoToRegisterButton";
import { GoToMakeQuestion } from "./GoToMakeQuestion";
import { GoToHome } from "./GoToHome";

export const SideBar = () => {
    return <>
        <Row>
            <Col>
                <GoRegisterMember/>
                <GoToMakeQuestion/>
                <GoToHome/>
            </Col>
        </Row>
    </>
};