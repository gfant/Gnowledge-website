import { useContext, useState } from 'react';
import { Button, Divider, FlexboxGrid, Heading, Input } from 'rsuite';
import 'rsuite/Divider/styles/index.css';
import 'rsuite/Heading/styles/index.css';
import FlexboxGridItem from 'rsuite/esm/FlexboxGrid/FlexboxGridItem';
import AccountContext from '../context/AccountContext';
import { AdenaService } from '../services/adena/adena';
import { EMessageType } from '../services/adena/adena.types';
import config from '../config';

const MakeQuestion = () => {
    const { address } = useContext(AccountContext);
    const [question, setQuestion] = useState("")
    const [topics, setTopics] = useState("")


    const MakeQuestion = async () => {
        if (address && question.length !== 0) {
            let response = await AdenaService.sendTransaction(
                [
                    {
                        type: EMessageType.MSG_CALL,
                        value: {
                            caller: address,
                            send: '',
                            pkg_path: config.REALM_PATH,
                            func: 'MakeQuestion',
                            args: [
                                question,
                                topics
                            ]
                        }
                    }
                ],
                2000000
            )
            if (response !== null) {
                setQuestion("")
                setTopics("")
                console.log("Question sent!")
            }
        }
    }
    return (
        <>
            <Divider />
            <Heading level={2}>Make a Question</Heading>
            <FlexboxGrid style={{ alignItems: "center", justifyContent: "center", marginTop: "50px" }}>
                <FlexboxGridItem >
                    <FlexboxGrid style={{ flexDirection: "column" }}>
                        <p>Add your question below</p>
                        <Input as="textarea" cols={80} rows={12} placeholder="My question" value={question} onChange={value => setQuestion(value)} />
                    </FlexboxGrid>
                </FlexboxGridItem>
            </FlexboxGrid>
            <FlexboxGrid style={{ alignItems: "center", justifyContent: "center", marginTop: "50px", flexDirection: "column" }}>
                <FlexboxGridItem >
                    <FlexboxGrid style={{ flexDirection: "column" }}>
                        <p>Add the topics that relate to your question. There is no need to </p>
                        <Input as="textarea" cols={80} rows={2} placeholder="code,magic,community" value={topics} onChange={value => setTopics(value)} />
                    </FlexboxGrid>
                    <Divider />
                </FlexboxGridItem>
                <FlexboxGridItem>
                    <Button onClick={MakeQuestion}>Send Question</Button>
                </FlexboxGridItem>
            </FlexboxGrid>
        </>
    )
};

export default MakeQuestion;
