import { Button, FlexboxGrid, Input } from 'rsuite';

import 'rsuite/Divider/styles/index.css';
import 'rsuite/Heading/styles/index.css';
import FlexboxGridItem from 'rsuite/esm/FlexboxGrid/FlexboxGridItem';
import { useContext, useState } from 'react';
import AccountContext from '../context/AccountContext';
import { AdenaService } from '../services/adena/adena';
import { EMessageType } from '../services/adena/adena.types';
import config from '../config';

const AnswerQuestion = ({ qId }: { qId: string }) => {
    const { address } = useContext(AccountContext);
    const [qAnswer, setQAnswer] = useState("")
    
    const SendAnswer = async () => {
        if (address && qAnswer.length !== 0) {
            let response = await AdenaService.sendTransaction(
                [
                    {
                        type: EMessageType.MSG_CALL,
                        value: {
                            caller: address,
                            send: '',
                            pkg_path: config.REALM_PATH,
                            func: 'AnswerQuestion',
                            args: [
                                qAnswer,
                                qId,
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
    }

    return <>
        <FlexboxGrid style={{ alignItems: "center", justifyContent: "center", marginTop:"50px"}}>
            <FlexboxGridItem >
                <FlexboxGrid style={{ flexDirection: "column" }}>
                    <Input as="textarea" cols={80} rows={12} placeholder="Answer the question" value={qAnswer} onChange={value => setQAnswer(value)} />
                    <Button onClick={SendAnswer}>Answer Question</Button>
                </FlexboxGrid>
            </FlexboxGridItem>
        </FlexboxGrid>
    </>
};

export default AnswerQuestion;
