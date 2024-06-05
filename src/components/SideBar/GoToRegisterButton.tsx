import { Button, Col, Row } from "rsuite";
import { AdenaService } from "../../services/adena/adena";
import { EMessageType } from "../../services/adena/adena.types";
import config from "../../config";
import { useContext } from "react";
import AccountContext from "../../context/AccountContext";

export const GoRegisterMember = () => {
    const { address } = useContext(AccountContext);


    const RegisterMember = async () => {
        if (address) {
            let response = await AdenaService.sendTransaction(
                [
                    {
                        type: EMessageType.MSG_CALL,
                        value: {
                            caller: address,
                            send: '',
                            pkg_path: config.REALM_PATH,
                            func: 'Register',
                            args: [
                            ]
                        }
                    }
                ],
                2000000
            )
            if (response !== null) {
                console.log("Answer sent!")
            }
        }
    };

    return <>
        <Row>
            <Col>
                <Button onClick={RegisterMember}>
                    Register
                </Button>
            </Col>
        </Row>
    </>
};